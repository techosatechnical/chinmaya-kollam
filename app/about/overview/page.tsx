"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TopBar } from "@/components/TopBar";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Leaf, BookOpen, MonitorPlay, History } from "lucide-react";
import WarpText from "@/components/WarpText";

const sections = [
  {
    id: "nature",
    title: "In the Lap of Nature",
    icon: Leaf,
    content: "CHINMAYA VIDYALAYA, CHANDANATHOPE, KOLLAM – the temple of learning, located in the serene lap of nature. Golden sunrises and crimson sunsets welcome flocks of birds to the Vidyalaya campus to add mesmerizing sights and sounds. It is greenery all around, creating a highly conducive and peaceful learning atmosphere.",
    image: "/image/about1.avif",
    color: "from-emerald-500/20 to-teal-500/5",
    iconColor: "text-emerald-500",
  },
  {
    id: "vision",
    title: "Vision of Education",
    icon: BookOpen,
    content: "The education imparted in the Vidyalaya fulfills Pujya Gurudev Swami Chinmayananda’s Vision of Education. It enables all Chinmaya kids to bloom with bright hues and spread the fragrance. The presence of Chinmaya Mission Acharya and the Ashram gives the Vidyalaya a spiritual ambience. The holy shrine of Lord Ganesha provides a peaceful environment. Chinmaya Blossom, the play school, is a feather in our cap. The school is affiliated up to classes XII.",
    image: "/image/about4.jpg",
    color: "from-orange-500/20 to-amber-500/5",
    iconColor: "text-orange-500",
  },
  {
    id: "technology",
    title: "Modern & Values-Driven",
    icon: MonitorPlay,
    content: "The Vidyalaya is equipped with the latest technology – hybrid teaching and learning and smart classrooms. Values are inculcated in young minds with the text 'Life, An Aradhana' and the Chinmaya Vision Programme. The curriculum includes the enrichment of communication and language skills, Yoga, and a plethora of co-curricular activities.",
    image: "/image/about3.webp",
    color: "from-blue-500/20 to-cyan-500/5",
    iconColor: "text-blue-500",
  },
  {
    id: "history",
    title: "Our Historic Journey",
    icon: History,
    content: "The Vidyalaya was a long pending dream of the people of Kollam. It was first established on 23rd Oct 1985 at Manayilkulangara, Kollam. The Vidyalaya attained its gradual growth and as classes up to VII started functioning, it was shifted to its new sprawling location at Chandanathope in 1996 under the visionary leadership of Chinmaya Educational Trust, Thiruvananthapuram.",
    image: "/image/about3.webp",
    color: "from-purple-500/20 to-fuchsia-500/5",
    iconColor: "text-purple-500",
  }
];

export default function AboutOverview() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-[#385EEC] selection:text-white">
      <TopBar />
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-10 lg:pt-40 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/image/about2.webp"
            alt="School Campus"
            fill
            sizes="100vw"
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-b from-slate-50/80 via-slate-50/95 to-slate-50" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="h-30 md:h-40 relative -mt-4 mb-4"
            >
              <WarpText
                text="ABOUT  US"
                color="#004B87"
                warpStrength={0.06}
                warpScale={1.5}
                speed={0.4}
                fontSize="clamp(4rem, 12vw, 8rem)"
                fontWeight={900}
                className="w-full h-full drop-shadow-xl"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg md:text-2xl text-slate-600 font-medium leading-relaxed max-w-3xl mx-auto"
            >
              Discover the temple of learning where spirituality meets modern education, nestled in the serene lap of nature.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Interactive Story Timeline */}
      <section className=" bg-slate-50 relative">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="space-y-32">
            {sections.map((section, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={section.id} className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}>

                  {/* Image Side */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -50 : 50, rotateY: isEven ? -15 : 15 }}
                    whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
                    className="w-full lg:w-1/2 relative perspective-1000"
                  >
                    <div className="relative aspect-4/3 rounded-4xl overflow-hidden shadow-2xl shadow-slate-300/50 group">
                      <Image
                        src={section.image}
                        alt={section.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                    {/* Decorative blobs */}
                    <div className={`absolute -z-10 w-full h-full top-4 ${isEven ? '-right-4' : '-left-4'} bg-linear-to-br ${section.color} rounded-[2.5rem] blur-xl opacity-60`} />
                  </motion.div>

                  {/* Content Side */}
                  <div className="w-full lg:w-1/2">
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                    >
                      <div className={`w-16 h-16 rounded-md bg-white shadow-lg flex items-center justify-center mb-8 border border-slate-100 ${section.iconColor}`}>
                        <section.icon className="w-8 h-8" />
                      </div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 leading-tight">
                        {section.title}
                      </h2>
                      <p className="text-lg text-slate-600 leading-relaxed font-medium">
                        {section.content}
                      </p>

                      <div className="mt-10 pt-10 border-t border-slate-200/60">
                        <div className="flex items-center gap-4">
                          <span className="w-8 h-1 bg-[#FF6A00] rounded-full" />
                          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Chinmaya Vidyalaya</span>
                        </div>
                      </div>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="py-8 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-4xl font-black text-slate-800 mb-4">Glimpses of Our Campus</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Experience the vibrant life and beautiful surroundings of Chinmaya Vidyalaya.</p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {[
              { src: "/image/about4.jpg", colSpan: "col-span-2", rowSpan: "row-span-2" },
              { src: "/image/about1.avif", colSpan: "col-span-2 md:col-span-1", rowSpan: "row-span-1" },
              { src: "/image/school.jpeg", colSpan: "col-span-2 md:col-span-1", rowSpan: "row-span-1" },
              { src: "/image/about3.webp", colSpan: "col-span-2", rowSpan: "row-span-1" }
            ].map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-md overflow-hidden shadow-md group ${img.colSpan} ${img.rowSpan} min-h-62.5`}
              >
                <Image
                  src={img.src}
                  alt="Gallery Image"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300 mix-blend-overlay" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}



