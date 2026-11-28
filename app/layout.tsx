import type { Metadata } from "next";
import "./globals.css";
import { CustomCursor } from "@/components/CustomCursor";
import { getResolvedSchoolId } from "@/lib/tenant";
import { getSchoolConfig } from "@/lib/data/school-repository";
import { getThemeCssVariables } from "@/lib/theme";

export async function generateMetadata(): Promise<Metadata> {
  const schoolId = await getResolvedSchoolId();
  if (!schoolId) {
    return {
      title: "School Not Found",
      robots: { index: false, follow: false },
    };
  }

  const school = await getSchoolConfig(schoolId);
  if (!school) {
    return {
      title: "Site Unavailable",
      robots: { index: false, follow: false },
    };
  }

  const baseUrl = `https://${school.primaryDomain}`;
  const ogImages = school.seo.ogImage ? [{ url: school.seo.ogImage }] : undefined;

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: school.seo.defaultTitle,
      template: school.seo.titleTemplate,
    },
    description: school.seo.defaultDescription,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      siteName: school.name,
      title: school.seo.defaultTitle,
      description: school.seo.defaultDescription,
      url: baseUrl,
      images: ogImages,
    },
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const schoolId = await getResolvedSchoolId();
  const school = schoolId ? await getSchoolConfig(schoolId) : null;
  const themeVars = getThemeCssVariables(school?.theme);

  return (
    <html
      lang="en"
      style={themeVars}
      className="h-full antialiased"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;500;600;700;800&family=Urbanist:wght@200;300;400;500;600;700;800;900&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans text-body">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
