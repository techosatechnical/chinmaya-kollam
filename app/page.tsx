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

export default function Home() {
  return (
    <main className="min-h-screen">
      <AnnouncementModal />
      <TopBar />
      <Navbar />
      <Hero />
      <VisionMission />
      <HistoryAnnouncements />
      <LeadershipMessages />
      <Categories />
      <About />
      <RecentNews />
      <Testimonials />
      <Facilities />
      <Footer />
    </main>
  );
}
