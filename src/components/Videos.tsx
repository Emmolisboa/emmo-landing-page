"use client";

import { useState } from "react";
import { Play, Youtube } from "lucide-react";

interface Video {
  id: string;
  title: string;
  type: "youtube" | "local";
  thumbnail?: string;
  localSrc?: string;
}

// Example videos - replace with actual video data
// For YouTube videos, use the video ID (e.g., "dQw4w9WgXcQ") or full URL
const videos: Video[] = [
  {
    id: "dQw4w9WgXcQ", // YouTube video ID
    title: "Latest Performance",
    type: "youtube",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: "dQw4w9WgXcQ", // YouTube video ID
    title: "Studio Session",
    type: "youtube",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
  },
  {
    id: "3",
    title: "Behind the Scenes",
    type: "local",
    localSrc: "/videos/behind-scenes.mp4",
  },
];

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  const getYouTubeEmbedUrl = (videoId: string) => {
    // Extract YouTube video ID from various formats
    const match = videoId.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    const id = match ? match[1] : videoId;
    return `https://www.youtube.com/embed/${id}`;
  };

  return (
    <section
      id="videos"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className="relative group cursor-pointer"
              onClick={() => setSelectedVideo(video)}
            >
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                {video.type === "youtube" && video.thumbnail ? (
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-50" />
                  </div>
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                    {video.type === "youtube" ? (
                      <Youtube className="w-8 h-8 text-red-600" />
                    ) : (
                      <Play className="w-8 h-8 text-gray-900" />
                    )}
                  </div>
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {video.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <div
            className="relative max-w-5xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
              onClick={() => setSelectedVideo(null)}
            >
              <span className="text-2xl">×</span>
            </button>
            {selectedVideo.type === "youtube" ? (
              <iframe
                src={getYouTubeEmbedUrl(selectedVideo.id) + "?autoplay=1"}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <video
                src={selectedVideo.localSrc}
                controls
                autoPlay
                className="w-full h-full rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
