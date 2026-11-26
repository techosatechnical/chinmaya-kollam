import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { VisionMission } from "@/components/VisionMission";
import { HistoryAnnouncements } from "@/components/HistoryAnnouncements";
import { LeadershipMessages } from "@/components/LeadershipMessages";
import { Categories } from "@/components/Categories";
import { About } from "@/components/About";
import { RecentNews } from "@/components/RecentNews";
import { Testimonials } from "@/components/Testimonials";
import { Facilities } from "@/components/Facilities";
import { Footer } from "@/components/Footer";
import { AnnouncementModal } from "@/components/AnnouncementModal";
import { requireActiveSchool } from "@/lib/data/get-active-school";
import {
  getSchoolAnnouncements,
  getSchoolNews,
  getSchoolPeople,
} from "@/lib/data/school-repository";

export default async function Home() {
  const school = await requireActiveSchool();
  const [announcements, newsItems, testimonials] = await Promise.all([
    getSchoolAnnouncements(school.id),
    getSchoolNews(school.id, { featuredOnly: true }),
    getSchoolPeople(school.id, ["testimonial"]),
  ]);

  return (
    <main className="min-h-screen">
      <AnnouncementModal ads={announcements} />
      <TopBar items={announcements} />
      <Navbar
        schoolName={school.name}
        shortName={school.shortName}
        branding={school.branding}
        navVisibility={school.navVisibility}
      />
      <Hero hero={school.hero} schoolName={school.name} />
      <VisionMission data={school.visionMission} />
      <HistoryAnnouncements
        history={school.historySummary}
        announcements={announcements}
        brandBlueColor={school.theme.brandBlue}
      />
      <LeadershipMessages messages={school.leadershipMessages} />
      <Categories
        section={school.categoriesSection}
        accentAltColor={school.theme.accentAlt}
      />
      <About />
      <RecentNews
        enabled={school.recentNewsSection.enabled}
        eyebrow={school.recentNewsSection.eyebrow}
        items={newsItems}
      />
      <Testimonials
        enabled={school.testimonialsSection.enabled}
        badge={school.testimonialsSection.badge}
        items={testimonials}
      />
      <Facilities section={school.facilitiesSection} />
      <Footer school={school} />
    </main>
  );
}
