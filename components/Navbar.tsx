"use client";

import { useState, useEffect, useRef } from "react";
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
      { title: "CHINMAYA BLOSSOMS", href: "/academics/chinmaya-blossoms", icon: Lock, iconColor: "text-slate-500" },
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
  const [expandedMenu, setExpandedMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpenScrolled, setIsNavOpenScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Monitor scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 80) {
        setIsScrolled(true);
      } else if (scrollY < 40) {
        setIsScrolled(false);
        setIsNavOpenScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle outside clicks and ESC key to collapse navbar when floating
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isScrolled &&
        isNavOpenScrolled &&
        navRef.current &&
        !navRef.current.contains(e.target as Node)
      ) {
        setIsNavOpenScrolled(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsNavOpenScrolled(false);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isScrolled, isNavOpenScrolled]);

  const handleLinkClick = () => {
    if (isNavOpenScrolled) {
      setIsNavOpenScrolled(false);
    }
  };

  const handleHamburgerToggle = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1280) {
      setIsMobileMenuOpen(true);
    } else {
      setIsNavOpenScrolled((prev) => !prev);
    }
  };

  const renderNavbarContent = (isFloating: boolean = false) => (
    <div
      className={`flex w-full items-center justify-between rounded-full transition-all duration-300 ${isFloating
          ? "bg-white/95 backdrop-blur-xl border border-slate-200/90 px-4 py-2 lg:py-2.5 shadow-[0_12px_40px_rgba(0,0,0,0.12)]"
          : "bg-linear-to-r from-indigo-100/50 via-sky-100/90 to-blue-100/50 backdrop-blur-md border border-slate-200/60 px-4 py-2 lg:py-2.5 shadow-[0_8px_30px_rgb(0,0,0,0.05)]"
        }`}
    >
      {/* Logo */}
      <Link href="/" onClick={handleLinkClick} className="flex items-center shrink-0 ml-4 lg:ml-6">
        <img src="/logos/CV Kollam BLACK.png" alt="Logo" className="h-16 lg:h-20 w-auto" />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden xl:flex items-center justify-start gap-1">
        {navLinks.map((link) => (
          <div key={link.name} className="relative group">
            <Link
              href={link.href}
              onClick={handleLinkClick}
              className={`flex items-center gap-1 rounded-full px-2 py-2 text-[14px] font-bold text-slate-700 hover:text-[#FF6A00] transition-colors cursor-pointer tracking-wide ${link.hasDropdown ? "ml-2" : ""
                }`}
            >
              {link.name}
              {link.hasDropdown && (
                <ChevronDown className="w-4 h-4 opacity-70 group-hover:rotate-180 transition-transform duration-300" />
              )}
            </Link>

            {/* Dropdown Menu */}
            {link.hasDropdown && link.subItems && (
              <div className="absolute left-0 top-full pt-4 opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 ease-out z-50">
                <div
                  className={`bg-white rounded-sm shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 p-3 ${link.subItems.length > 5 ? "w-180 grid grid-cols-3 gap-2.5" : "w-70 flex flex-col gap-2"
                    }`}
                >
                  {link.subItems.map((sub, index) => {
                    const themes = [
                      { text: "text-orange-500", bg: "bg-orange-50", border: "border-orange-200" },
                      { text: "text-emerald-500", bg: "bg-emerald-50", border: "border-emerald-200" },
                      { text: "text-indigo-500", bg: "bg-indigo-50", border: "border-indigo-200" },
                      { text: "text-purple-500", bg: "bg-purple-50", border: "border-purple-200" },
                      { text: "text-amber-500", bg: "bg-amber-50", border: "border-amber-200" },
                      { text: "text-blue-500", bg: "bg-blue-50", border: "border-blue-200" },
                      { text: "text-pink-500", bg: "bg-pink-50", border: "border-pink-200" },
                    ];
                    const theme = themes[index % themes.length];
                    return (
                      <Link
                        key={sub.title}
                        href={sub.href}
                        onClick={handleLinkClick}
                        className="flex items-center px-3 py-2.5 rounded-xl border border-slate-100 bg-white hover:shadow-md hover:border-slate-200 transition-all group/item relative"
                      >
                        <div className="relative shrink-0 ml-1">
                          <div
                            className={`absolute -top-2 -left-2 px-1 py-[1px] rounded-[4px] text-[9px] font-black border bg-white z-10 ${theme.border} ${theme.text}`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </div>
                          <div
                            className={`w-9 h-9 rounded-lg border flex items-center justify-center ${theme.border} ${theme.bg}`}
                          >
                            {sub.icon ? <sub.icon className={`w-4 h-4 ${theme.text}`} /> : <div className="w-4 h-4" />}
                          </div>
                        </div>
                        <div className="ml-4 flex flex-col justify-center">
                          <div className="flex items-center gap-2">
                            <span className="text-slate-800 font-bold text-[13px] leading-tight group-hover/item:text-[#385EEC] transition-colors capitalize">
                              {sub.title.toLowerCase()}
                            </span>
                            {sub.badge && (
                              <span
                                className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${sub.badge.classes} leading-none whitespace-nowrap`}
                              >
                                {sub.badge.text}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Right Action / Close Button on Desktop */}
      <div className="hidden xl:flex items-center justify-end">
        {isFloating && (
          <button
            onClick={() => setIsNavOpenScrolled(false)}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100/90 hover:bg-red-50 text-slate-700 hover:text-red-600 transition-all duration-200 font-bold text-xs tracking-wider cursor-pointer border border-slate-200 shadow-xs group ml-2"
            title="Collapse navbar"
            aria-label="Collapse navigation bar"
          >
            <X className="w-4 h-4 text-slate-600 group-hover:text-red-600 transition-colors" />
            <span>CLOSE</span>
          </button>
        )}
      </div>

      {/* Mobile Menu Toggle */}
      <div className="xl:hidden flex w-full items-center justify-end">
        <button
          onClick={() => {
            if (isFloating) {
              setIsNavOpenScrolled(false);
            } else {
              setIsMobileMenuOpen(true);
            }
          }}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
          aria-label={isFloating ? "Close navbar" : "Open mobile menu"}
        >
          {isFloating ? <X className="w-5 h-5 text-slate-600" /> : <Menu className="w-5 h-5 text-slate-600" />}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* 1. At Top of Page: Default Full Navbar */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.div
            key="top-navbar-container"
            initial={{ opacity: 1, y: 0, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{
              opacity: 0,
              x: 80,
              scale: 0.95,
              transition: { duration: 0.25, ease: "easeInOut" },
            }}
            className="sticky top-2 md:top-11 z-50 h-0 w-full pointer-events-none"
          >
            <div className="pointer-events-auto">
              <header className="w-full max-w-[98%] xl:max-w-350 mx-auto pt-2 relative z-50 flex items-center gap-2 lg:gap-4">
                {renderNavbarContent(false)}
              </header>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. When Scrolled: Floating Hamburger Button pinned to top right */}
      <AnimatePresence>
        {isScrolled && !isNavOpenScrolled && (
          <motion.div
            key="scrolled-hamburger-btn"
            initial={{ opacity: 0, scale: 0.6, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.6, x: 50 }}
            transition={{ type: "spring", stiffness: 400, damping: 28 }}
            className="fixed top-14 right-4 md:top-16 md:right-8 z-[70]"
          >
            <button
              onClick={handleHamburgerToggle}
              className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-linear-to-r from-indigo-100/90 via-sky-100/95 to-blue-100/90 backdrop-blur-md border border-slate-200/80 shadow-[0_8px_30px_rgba(0,0,0,0.12)] text-slate-800 hover:text-[#FF6A00] hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer group"
              aria-label="Open Navigation Menu"
            >
              <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-xs group-hover:bg-[#FF6A00]/10 transition-colors">
                <Menu className="w-4 h-4 text-slate-700 group-hover:text-[#FF6A00] transition-colors" />
              </div>

            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Scrolled & Expanded: Navbar animates back in across the screen */}
      <AnimatePresence>
        {isScrolled && isNavOpenScrolled && (
          <motion.div
            key="scrolled-expanded-navbar"
            ref={navRef}
            initial={{ opacity: 0, x: 80, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 80, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 350, damping: 28 }}
            className="fixed top-3 md:top-12 left-0 right-0 z-[70] w-full max-w-[98%] xl:max-w-350 mx-auto px-2 md:px-4"
          >
            <header className="w-full relative z-50 flex items-center gap-2 lg:gap-4">
              {renderNavbarContent(true)}
            </header>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed inset-0 z-[100] bg-slate-50/95 backdrop-blur-xl p-6 shadow-2xl"
          >
            <div className="flex justify-between items-center mb-8 border-b border-slate-200/60 pb-4">
              <img src="/logos/CV Kollam BLACK.png" alt="Logo" className="h-20 w-auto" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 bg-slate-100 hover:bg-slate-200 rounded-full flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            <div className="flex flex-col space-y-2 overflow-y-auto h-full pb-10">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  {link.hasDropdown ? (
                    <button
                      onClick={() => setExpandedMenu(expandedMenu === link.name ? null : link.name)}
                      className={`group font-[var(--font-heading)] tracking-wide text-[19px] font-extrabold rounded-sm px-5 py-4 flex justify-between items-center transition-all duration-300 w-full text-left cursor-pointer ${expandedMenu === link.name
                          ? "bg-white text-[#385EEC] shadow-sm border border-slate-100"
                          : "text-slate-800 hover:bg-white hover:shadow-sm border border-transparent"
                        }`}
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                      <ChevronDown
                        className={`w-5 h-5 transition-transform duration-300 ${expandedMenu === link.name ? "rotate-180 text-[#385EEC]" : "text-slate-400 group-hover:text-[#FF6A00]"
                          }`}
                      />
                    </button>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="group font-[var(--font-heading)] tracking-wide text-[19px] font-extrabold text-slate-800 hover:bg-white hover:text-[#385EEC] hover:shadow-sm border border-transparent rounded-sm px-5 py-4 flex justify-between items-center transition-all duration-300 w-full text-left"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
                    </Link>
                  )}

                  <AnimatePresence>
                    {link.hasDropdown && expandedMenu === link.name && link.subItems && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-col pl-4 mt-2 mb-2 space-y-1 border-l-2 border-slate-200/60 ml-6">
                          {link.subItems.map((sub) => (
                            <Link
                              key={sub.title}
                              href={sub.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="group/sub block px-4 py-3 text-[16px] font-medium text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-sm transition-all duration-300"
                            >
                              <div className="flex items-center gap-3">
                                {sub.icon && (
                                  <div
                                    className={`p-2 rounded-sm bg-slate-100 group-hover/sub:bg-blue-50 group-hover/sub:scale-110 transition-all duration-300 ${sub.iconColor}`}
                                  >
                                    <sub.icon className="w-4 h-4" />
                                  </div>
                                )}
                                <span className="group-hover/sub:translate-x-1 transition-transform duration-300">
                                  {sub.title}
                                </span>
                                {sub.badge && (
                                  <span
                                    className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full border ${sub.badge.classes} leading-none whitespace-nowrap`}
                                  >
                                    {sub.badge.text}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


