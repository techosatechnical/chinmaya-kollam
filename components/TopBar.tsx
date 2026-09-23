import { Mail, Phone } from "lucide-react";

export function TopBar() {
  return (
    <div className="hidden md:block bg-black text-white text-sm py-2 sticky top-0 z-[60] w-full border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-6">

          {/* Left: Contact Info */}
          <div className="flex items-center space-x-6 shrink-0">
            {/* <a href="mailto:info@gmail.com" className="flex items-center space-x-2 hover:text-[#FF6A00] transition-colors">
              <Mail className="w-4 h-4" />
              <span>chin_kollam@chintvm.edu.in</span>
            </a>
            <a href="tel:+0082569854" className="flex items-center space-x-2 hover:text-[#FF6A00] transition-colors">
              <Phone className="w-4 h-4" />
              <span>0474 2712571</span>
            </a> */}
          </div>

          {/* Middle: Scrolling Announcements Marquee */}
          <div className="flex-1 overflow-hidden mx-6 relative flex items-center mask-image-gradient">
            <div className="animate-marquee whitespace-nowrap flex items-center hover:[animation-play-state:paused] cursor-pointer">
              <span className="mx-6 text-emerald-400 font-medium tracking-wide">✨ Admission open for 2026-27 ✨</span>
              <span className="mx-6 text-[#FF9924] font-medium tracking-wide">🔥 Upcoming Event: INFNI Tech Fest 🔥</span>
              <span className="mx-6 text-[#385EEC] font-medium tracking-wide">📅 Annual Arts Fest starting next week 📅</span>
            </div>
          </div>

          {/* Right: Auth Links Removed */}
          <div className="flex items-center space-x-4 shrink-0">
          </div>
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(80vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
        .mask-image-gradient {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
    </div>
  );
}
