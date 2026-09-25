"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Search, Calendar, ArrowRight, Tag } from "lucide-react";
import Link from "next/link";

const allNews = [
  {
    id: 1,
    image: "/news/infini.jpeg",
    category: "Event",
    date: "Coming Soon",
    title: "INFNI",
    excerpt: "Experience innovation and excellence at INFNI, our premier technology and cultural symposium.",
    link: "#"
  },
  {
    id: 2,
    image: "/news/tedx-cva.png",
    category: "Event",
    date: "Recent",
    title: "TED-X Chinmaya Vidyalaya",
    excerpt: "An inspiring day of 'ideas worth spreading', featuring visionary speakers and thought-provoking discussions.",
    link: "#"
  },
  {
    id: 3,
    image: "/news/arts fest.jpeg",
    category: "Culture",
    date: "Recent",
    title: "Arts Fest",
    excerpt: "A grand celebration of creativity, talent, and artistic expression by the vibrant students of our Vidyalaya.",
    link: "#"
  },
  {
    id: 4,
    image: "/news/environment day.jpeg",
    category: "Campus",
    date: "Recent",
    title: "Environment Day",
    excerpt: "Taking steps towards a greener future. Students participated in tree plantation drives and eco-awareness campaigns.",
    link: "#"
  },
  {
    id: 5,
    image: "/news/sports meet.jpg",
    category: "Sports",
    date: "Recent",
    title: "Annual Sports Meet",
    excerpt: "Students showcased exceptional athleticism and team spirit during our multi-disciplinary sports competition.",
    link: "#"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&q=80&w=800",
    category: "Academics",
    date: "Upcoming",
    title: "Science Exhibition 2026",
    excerpt: "Explore groundbreaking projects and scientific models created by our brilliant young minds.",
    link: "#"
  },

];

const categories = ["All", "Event", "Academics", "Sports", "Culture", "Campus"];

export default function NewsPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredNews = allNews.filter((news) => {
    const matchesCategory = activeCategory === "All" || news.category === activeCategory;
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <TopBar />
      <Navbar />

      {/* Page Header */}
      <div className="bg-primary py-10 md:py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight"
          >
            News <span className="text-secondary">& Updates</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 max-w-2xl mx-auto text-lg"
          >
            Stay connected with the latest happenings, events, and achievements at Chinmaya Vidyalaya.
          </motion.p>
        </div>
      </div>

      {/* Main Content Area */}
      <section className="py-8 flex-1">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Search and Filter Section */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between bg-white p-4 rounded-md shadow-sm border border-slate-100">
              
              {/* Search Bar */}
              <div className="relative w-full lg:w-[35%] xl:w-[30%] shrink-0">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search news, events..."
                  className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#385EEC]/50 transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Category Filters (Wraps to next line when out of space) */}
              <div className="w-full lg:w-[65%] xl:w-[70%] flex flex-wrap gap-2 items-center lg:justify-end">
                <Tag className="h-4 w-4 text-slate-400 mr-1 shrink-0 hidden lg:block" />
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${activeCategory === cat
                        ? "bg-[#385EEC] text-white shadow-md shadow-[#385EEC]/20"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* News Grid */}
          {filteredNews.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredNews.map((news, index) => (
                  <motion.div
                    layout
                    key={news.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-md overflow-hidden group hover:shadow-2xl hover:shadow-[#0F284A]/10 transition-all duration-300 border border-slate-100 flex flex-col"
                  >
                    <div className="relative overflow-hidden h-56 shrink-0 bg-slate-200">
                      <img
                        src={news.image}
                        alt={news.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-sm text-[#0F284A] text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">
                          {news.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium mb-3">
                        <Calendar className="w-4 h-4 text-[#FF9924]" />
                        <span>{news.date}</span>
                      </div>

                      <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#385EEC] transition-colors leading-snug">
                        <Link href={news.link}>{news.title}</Link>
                      </h3>

                      <p className="text-slate-600 text-[15px] leading-relaxed mb-6 flex-1">
                        {news.excerpt}
                      </p>

                      <div className="mt-auto pt-4 border-t border-slate-100">
                        <Link href={news.link} className="inline-flex items-center text-sm font-bold text-[#FF9924] hover:text-[#385EEC] transition-colors group/link">
                          Read Full Article
                          <ArrowRight className="w-4 h-4 ml-1.5 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-10 bg-white rounded-md border border-slate-100"
            >
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">No news found</h3>
              <p className="text-slate-500">We couldn't find any news matching your criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("All");
                }}
                className="mt-6 px-6 py-2 bg-slate-100 text-slate-700 font-semibold rounded-md hover:bg-slate-200 transition-colors"
              >
                Clear Filters
              </button>
            </motion.div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}



