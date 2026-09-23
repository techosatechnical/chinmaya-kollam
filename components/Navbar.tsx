"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, Box, GraduationCap, Bot, Building, BookOpen, Book, MonitorPlay, Tablet, LayoutDashboard, Sparkles, Check, FileText, FileDown, Shield, Grid, Film, Send, FileCheck, Lock, Trophy, Map, Target, Palette, Library, Beaker, Smile, Flower2, Globe, UserCheck, Info, Flag, Users, User, Award } from "lucide-react";
import Link from "next/link";

type NavLink = {
  name: string;
  href: string;
  hasDropdown?: boolean;
  subItems?: {
    title: string;
    href: string;
    icon?: any;
    iconColor?: string;
    badge?: { text: string; classes: string };
    description?: string;
  }[];
};

const navLinks: NavLink[] = [
  { name: "HOME", href: "/" },
  {
    name: "ABOUT",
    href: "/about",
    hasDropdown: true,
    subItems: [
      { title: "OVERVIEW", href: "/about/overview", icon: Info, iconColor: "text-blue-500" },
      { title: "BEGINNING", href: "/about/beginning", icon: Flag, iconColor: "text-emerald-500" },
      { title: "MANAGEMENT", href: "/about/management", icon: Users, iconColor: "text-indigo-500" },
      { title: "PRINCIPAL DESK", href: "/about/principal-desk", icon: User, iconColor: "text-orange-500" },
      { title: "ACADEMIC", href: "/about/academic", icon: BookOpen, iconColor: "text-purple-500" },
      { title: "GENERAL INFO", href: "/about/general-info", icon: FileText, iconColor: "text-cyan-500" },
      { title: "FRONTRUNNERS", href: "/about/frontrunners", icon: Award, iconColor: "text-amber-500" }
    ]
  },
  {
    name: "ACADEMICS",
    href: "/academics",
    hasDropdown: true,
    subItems: [
      { title: "DOWNLOADS", href: "/academics/downloads", icon: FileDown, iconColor: "text-blue-500" },
      { title: "NEWS LETTER", href: "/academics/news-letter", icon: FileText, iconColor: "text-blue-500" },
      { title: "NEWS", href: "/academics/news", icon: Shield, iconColor: "text-blue-500" },
      { title: "EXAMINATION", href: "/academics/examination", icon: BookOpen, iconColor: "text-blue-500" },
      { title: "PHOTO GALLERY", href: "/academics/photo-gallery", icon: Grid, iconColor: "text-purple-500" },
      { title: "VIDEO GALLERY", href: "/academics/video-gallery", icon: Film, iconColor: "text-purple-500" },
      { title: "MENTORS", href: "/academics/mentors", icon: Check, iconColor: "text-emerald-500" },
      { title: "ACADEMIC PLANNER", href: "/academics/academic-planner", icon: Send, iconColor: "text-orange-500" },
      { title: "ACADEMIC RESULTS", href: "/academics/academic-results", icon: FileCheck, iconColor: "text-orange-500" },
      { title: "STUDENT COUNCIL", href: "/academics/student-council", icon: GraduationCap, iconColor: "text-emerald-500" },
      { title: "CHINMAYA BLOSSOMS(PRE-KG)", href: "/academics/chinmaya-blossoms", icon: Lock, iconColor: "text-slate-500" },
      { title: "NEP", href: "/academics/nep", icon: MonitorPlay, iconColor: "text-indigo-500" },
      { title: "SCHOOL SAFETY POLICY", href: "/academics/school-safety-policy", icon: Lock, iconColor: "text-slate-500" },
      { title: "CHILD PROTECTION POLICY", href: "/academics/child-protection-policy", icon: GraduationCap, iconColor: "text-emerald-500" }
    ]
  },
  {
    name: "ACTIVITIES",
    href: "/activities",
    hasDropdown: true,
    subItems: [
      { title: "SPORTS TEAM", href: "/activities/sports", icon: Trophy, iconColor: "text-orange-500" },
      { title: "SCOUTS & GUIDES", href: "/activities/scouts", icon: Map, iconColor: "text-emerald-500" },
      { title: "CO CURRICULAR ACTIVITIES", href: "/activities/co-curricular", icon: Sparkles, iconColor: "text-amber-500" },
      { title: "KARATE / CHESS", href: "/activities/karate-chess", icon: Target, iconColor: "text-red-500" },
      { title: "ARTS & CULTURE", href: "/activities/arts", icon: Palette, iconColor: "text-purple-500" }
    ]
  },
  {
    name: "FACILITIES",
    href: "/facilities",
    hasDropdown: true,
    subItems: [
      { title: "LIBRARY", href: "/facilities/library", icon: Library, iconColor: "text-blue-500" },
      { title: "SMART CLASS", href: "/facilities/smart-class", icon: MonitorPlay, iconColor: "text-indigo-500" },
      { title: "LABS", href: "/facilities/labs", icon: Beaker, iconColor: "text-emerald-500" },
      { title: "KINDERGARTEN", href: "/facilities/kindergarten", icon: Smile, iconColor: "text-amber-500" },
      { title: "SPORTS & GAMES", href: "/facilities/sports-games", icon: Trophy, iconColor: "text-orange-500" },
      { title: "CHINMAYA BLOSSOMS (PRE-KG)", href: "/facilities/chinmaya-blossoms", icon: Flower2, iconColor: "text-pink-500" }
    ]
  },
  { name: "ACCOLADES", href: "/accolades" },
  {
    name: "INNOVATION HUB",
    href: "/innovation-hub",
    hasDropdown: true,
    subItems: [
      { title: "CSRS", href: "/innovation-hub/csrs", icon: Globe, iconColor: "text-blue-500" },
      { title: "AI AND ROBOTICS CLASSES", href: "/innovation-hub/ai-robotics", icon: Bot, iconColor: "text-emerald-500" },
      { title: "AI TRAINED TEACHERS", href: "/innovation-hub/ai-teachers", icon: UserCheck, iconColor: "text-purple-500" }
    ]
  },
  { name: "CONTACT", href: "/contact" },
];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-2 md:top-11 z-50 h-0 w-full">
      <header className="w-full max-w-[98%] xl:max-w-350 mx-auto pt-2 relative z-50 flex items-center gap-2 lg:gap-4">
        <div className="flex w-full items-center justify-between rounded-full bg-white/90 backdrop-blur-md border border-slate-200/60 px-4 py-2 lg:py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
          {/* Logo outside */}
          <Link href="/" className="flex items-center shrink-0">
            <img src="/logos/CV Kollam BLACK.png" alt="Logo" className="h-14 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center justify-start gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <Link
                  href={link.href}
                  className="flex items-center gap-1 rounded-full px-1.5 py-2 text-[14px] font-bold text-slate-700 hover:text-[#FF6A00] transition-colors cursor-pointer tracking-wide"
                >
                  {link.name}
                  {link.hasDropdown && (
                    <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {link.hasDropdown && link.subItems && (
                  <div className="absolute left-0 top-full pt-4 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 ease-out z-50">
                    <div className={`bg-[#0F284A] rounded-2xl shadow-2xl border border-white/10 p-2.5 ${link.subItems.length > 5 ? 'w-195 grid grid-cols-3 gap-x-2 gap-y-0.5' : 'w-70 flex flex-col gap-0.5'}`}>
                      {link.subItems.map((sub) => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          className="flex items-center justify-between px-4 py-2 text-[14px] font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all duration-200 rounded-xl group/item"
                        >
                          <div className="flex items-center gap-3">
                            <span>{sub.title}</span>
                            {sub.badge && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sub.badge.classes} leading-none whitespace-nowrap`}>
                                {sub.badge.text}
                              </span>
                            )}
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/40 group-hover/item:text-white transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Action Buttons Removed */}
          <div className="hidden xl:flex items-center justify-end">
          </div>

          {/* Mobile Menu Toggle */}
          <div className="xl:hidden flex w-full items-center justify-end">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-100 bg-white p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8 border-b border-slate-100 pb-4">
              <img src="/logos/kollogo.png" alt="Logo" className="h-8 w-auto" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="flex flex-col space-y-2 overflow-y-auto h-full pb-20">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  <Link
                    href={link.href}
                    onClick={() => !link.hasDropdown && setIsMobileMenuOpen(false)}
                    className="group text-[15px] font-semibold text-slate-800 hover:bg-slate-50 rounded-2xl px-4 py-3 flex justify-between items-center transition-colors"
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
                    )}
                  </Link>
                  {link.hasDropdown && link.subItems && (
                    <div className="flex flex-col pl-4 mt-1 space-y-1">
                      {link.subItems.map(sub => (
                        <Link
                          key={sub.title}
                          href={sub.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block px-4 py-2.5 text-[14px] font-medium text-slate-600 hover:text-[#385EEC] hover:bg-slate-50 transition-colors rounded-xl"
                        >
                          <div className="flex items-center justify-between">
                            <span>{sub.title}</span>
                            {sub.badge && (
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${sub.badge.classes} leading-none whitespace-nowrap`}>
                                {sub.badge.text}
                              </span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}


            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
