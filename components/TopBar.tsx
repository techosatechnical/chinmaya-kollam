import type { AnnouncementItem } from "@/lib/types/school";

interface TopBarProps {
  items?: AnnouncementItem[];
}

export function TopBar({ items = [] }: TopBarProps) {
  const activeItems = items.filter((i) => i.kind === "ticker");

  return (
    <div className="hidden md:block bg-black text-white text-sm py-2 sticky top-0 z-[60] w-full border-b border-white/10">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex justify-between items-center h-6">
          {/* Left: Contact Info */}
          <div className="flex items-center space-x-6 shrink-0" />

          {/* Middle: Scrolling Announcements Marquee */}
          <div className="flex-1 overflow-hidden mx-6 relative flex items-center mask-image-gradient">
            {activeItems.length > 0 && (
              <div className="animate-marquee whitespace-nowrap flex items-center hover:[animation-play-state:paused] cursor-pointer">
                {activeItems.map((item) => (
                  <span
                    key={item.id}
                    className={`mx-6 font-medium tracking-wide ${item.colorClass || "text-emerald-400"}`}
                  >
                    {item.title}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Right: Auth Links Removed */}
          <div className="flex items-center space-x-4 shrink-0" />
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
