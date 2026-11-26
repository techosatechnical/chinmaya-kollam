"use client";

import React, { useState, useMemo } from "react";
import type { VideoItem } from "@/lib/types/school";

interface VideoGalleryClientProps {
  schoolName: string;
  videos: VideoItem[];
}

export function VideoGalleryClient({ schoolName, videos }: VideoGalleryClientProps) {
  const [activeYear, setActiveYear] = useState("All");
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);

  const years = useMemo(() => {
    const unique = Array.from(new Set(videos.map((v) => v.academicYear).filter(Boolean))).sort(
      (a, b) => b.localeCompare(a)
    );
    return ["All", ...unique];
  }, [videos]);

  const filteredVideos =
    activeYear === "All" ? videos : videos.filter((video) => video.academicYear === activeYear);

  return (
    <>
      <section className="relative pt-32 pb-10 md:pt-40 md:pb-10 bg-dark-surface text-white overflow-hidden flex flex-col items-center justify-center border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <img
            src="/image/vediogaller banner.jpg"
            alt="Video Gallery background"
            className="w-full h-full object-cover opacity-50"
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-sm font-medium tracking-wide text-slate-300 uppercase">
              Watch &amp; Relive
            </span>
          </div>

          <h1 className="py-2 text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-4 bg-clip-text text-transparent bg-white">
            Video Gallery
          </h1>

          <p className="text-lg md:text-2xl max-w-2xl mx-auto text-white font-medium tracking-tight">
            Experience the vibrant life, events, and milestones at {schoolName} through our video archives.
          </p>
        </div>
      </section>

      {years.length > 1 && (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-slate-200 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-2 md:gap-4 flex-wrap">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setActiveYear(year)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 cursor-pointer ${
                  activeYear === year
                    ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20 scale-105"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        {filteredVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div
                key={video.id}
                className="group relative bg-white rounded-md overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-200 cursor-pointer hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 flex flex-col"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-video overflow-hidden bg-slate-900">
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
                    }}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/20 group-hover:bg-transparent transition-colors duration-300">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white text-slate-900 transition-all duration-300 pl-1">
                      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-full">
                      {video.academicYear}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-red-600 transition-colors">
                    {video.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-white rounded-md border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-400">
              {videos.length === 0
                ? `Videos for ${schoolName} will be added soon.`
                : `No videos found for ${activeYear}`}
            </h2>
          </div>
        )}
      </section>

      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-slate-950/95 backdrop-blur-xl animate-in fade-in duration-200">
          <div className="absolute inset-0 z-0" onClick={() => setSelectedVideo(null)} />

          <button
            onClick={() => setSelectedVideo(null)}
            aria-label="Close video"
            className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-colors p-3 bg-white/10 hover:bg-white/20 rounded-full z-50 backdrop-blur-md cursor-pointer"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="relative z-10 max-w-6xl w-full flex flex-col items-center animate-in zoom-in-95 duration-300">
            <div className="w-full aspect-video bg-black rounded-md overflow-hidden shadow-2xl ring-1 ring-white/10">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            <div className="mt-6 text-center md:text-left w-full flex flex-col md:flex-row items-center justify-between gap-4 px-4">
              <h2 className="text-2xl md:text-3xl font-bold text-white">{selectedVideo.title}</h2>
              <span className="px-4 py-1.5 bg-red-600 text-white text-sm font-bold rounded-full shrink-0">
                {selectedVideo.academicYear}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
