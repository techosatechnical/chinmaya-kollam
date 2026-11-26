import type { CSSProperties } from "react";
import { SchoolThemeSchema, type SchoolTheme } from "@/lib/types/school";

export const DEFAULT_KOLLAM_THEME: SchoolTheme = {
  primary: "#0F284A",
  secondary: "#FF9924",
  accent: "#FF6A00",
  accentAlt: "#385EEC",
  brandBlue: "#004B87",
  brandBlueDeep: "#1A457B",
  darkSurface: "#0B1121",
  navySurface: "#02133a",
  logoBadgeBg: "#DE7129",
  primaryContrast: "#ffffff",
  secondaryContrast: "#121214",
  accentContrast: "#ffffff",
};

export function getThemeCssVariables(theme?: Partial<SchoolTheme> | null): CSSProperties {
  const parsed = SchoolThemeSchema.safeParse({
    ...DEFAULT_KOLLAM_THEME,
    ...(theme ?? {}),
  });
  const safeTheme = parsed.success ? parsed.data : DEFAULT_KOLLAM_THEME;

  return {
    "--school-primary": safeTheme.primary,
    "--school-secondary": safeTheme.secondary,
    "--school-accent": safeTheme.accent,
    "--school-accent-alt": safeTheme.accentAlt,
    "--school-brand-blue": safeTheme.brandBlue,
    "--school-brand-blue-deep": safeTheme.brandBlueDeep,
    "--school-dark-surface": safeTheme.darkSurface,
    "--school-navy-surface": safeTheme.navySurface,
    "--school-logo-badge-bg": safeTheme.logoBadgeBg,
    "--school-primary-contrast": safeTheme.primaryContrast,
    "--school-secondary-contrast": safeTheme.secondaryContrast,
    "--school-accent-contrast": safeTheme.accentContrast,
  } as CSSProperties;
}
