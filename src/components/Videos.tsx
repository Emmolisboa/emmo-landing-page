"use client";

import { useState, useEffect, useRef } from "react";
import { Play, ChevronLeft, ChevronRight, X, ChevronUp } from "lucide-react";
import * as SimpleIcons from "simple-icons";
import Image from "next/image";

interface Video {
  id: string;
  title: string;
  type: "youtube" | "local";
  thumbnail?: string;
  localSrc?: string;
}

// Videos - mix of YouTube and local videos
const videos: Video[] = [
  // YouTube videos
  {
    id: "l2m3Ic2CSf8",
    title: "Emmo Performance",
    type: "youtube",
  },
  {
    id: "emmo8",
    title: "Emmo 8",
    type: "local",
    localSrc: "/videos/Emmo 8.mp4",
  },
  {
    id: "AYx653hkEcs",
    title: "Emmo Performance",
    type: "youtube",
  },
  {
    id: "emmo4",
    title: "Emmo 4",
    type: "local",
    localSrc: "/videos/Emmo 4.mp4",
  },
  {
    id: "emmo7",
    title: "Emmo 7",
    type: "local",
    localSrc: "/videos/Emmo 7.mp4",
  },

  {
    id: "emmo3",
    title: "Emmo 3",
    type: "local",
    localSrc: "/videos/Emmo 3.mp4",
  },
  // Local videos from /public/videos directory
  {
    id: "emmo12",
    title: "Emmo 12",
    type: "local",
    localSrc: "/videos/Emmo 12.mp4",
  },
  {
    id: "emmo13",
    title: "Emmo 13",
    type: "local",
    localSrc: "/videos/Emmo 13.mp4",
  },
  {
    id: "emmo2",
    title: "Emmo 2",
    type: "local",
    localSrc: "/videos/Emmo 2.mp4",
  },
  {
    id: "emmo6",
    title: "Emmo 6",
    type: "local",
    localSrc: "/videos/Emmo 6.mp4",
  },

  {
    id: "emmo9",
    title: "Emmo 9",
    type: "local",
    localSrc: "/videos/Emmo 9.mp4",
  },
  {
    id: "emmo10",
    title: "Emmo 10",
    type: "local",
    localSrc: "/videos/Emmo 10.mp4",
  },
  {
    id: "emmo11",
    title: "Emmo 11",
    type: "local",
    localSrc: "/videos/Emmo 11.mp4",
  },
  {
    id: "emmo1",
    title: "Emmo 1",
    type: "local",
    localSrc: "/videos/Emmo1.mp4",
  },
 
  {
    id: "6iizayAOGb0",
    title: "Emmo Performance",
    type: "youtube",
  },
  
  {
    id: "-gWNkLsX_dA",
    title: "Emmo Performance",
    type: "youtube",
  },
];

export default function Videos() {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState(false);
  const [thumbnails, setThumbnails] = useState<Record<string, string>>({});
  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const thumbnailRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const videoContainerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndexRef = useRef<number>(-1);
  const isScrollingProgrammatically = useRef<boolean>(false);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const touchEndY = useRef<number>(0);

  const getYouTubeEmbedUrl = (videoId: string) => {
    // Extract YouTube video ID from various formats
    const match = videoId.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    const id = match ? match[1] : videoId;
    return `https://www.youtube.com/embed/${id}`;
  };

  const getYouTubeThumbnail = (videoId: string, quality: "maxresdefault" | "hqdefault" = "maxresdefault") => {
    // Extract YouTube video ID from various formats
    const match = videoId.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/
    );
    const id = match ? match[1] : videoId;
    return `https://img.youtube.com/vi/${id}/${quality}.jpg`;
  };

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show 6 previews on desktop, 4 on mobile
  const previewVideos = videos.slice(0, isMobile ? 4 : 6);

  // Generate thumbnails from videos
  useEffect(() => {
    const generateThumbnails = () => {
      thumbnailRefs.current.forEach((video, index) => {
        if (video && videos[index] && videos[index].type === "local") {
          const handleLoadedData = () => {
            try {
              const canvas = document.createElement("canvas");
              canvas.width = video.videoWidth || 640;
              canvas.height = video.videoHeight || 360;
              const ctx = canvas.getContext("2d");
              if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
                const thumbnailUrl = canvas.toDataURL("image/jpeg", 0.8);
                setThumbnails((prev) => ({
                  ...prev,
                  [videos[index].id]: thumbnailUrl,
                }));
                video.removeEventListener("loadeddata", handleLoadedData);
              }
            } catch (error) {
              console.error("Error generating thumbnail:", error);
            }
          };

          video.addEventListener("loadeddata", handleLoadedData);
          
          // Seek to 0.5 second to get a frame (not black screen)
          video.currentTime = 0.5;
        }
      });
    };

    // Small delay to ensure video elements are rendered
    const timer = setTimeout(generateThumbnails, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleVideoClick = (video: Video, index: number) => {
    setSelectedVideo(video);
    setCurrentIndex(index);
  };

  // Update ref when currentIndex changes
  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  // Use Intersection Observer to detect which video is in view (more accurate)
  useEffect(() => {
    if (!isMobile || !selectedVideo) return;

    let observer: IntersectionObserver | null = null;

    // Wait a bit before setting up observer to avoid interference with initial scroll
    const setupTimer = setTimeout(() => {
      const newObserver = new IntersectionObserver(
        (entries) => {
          // Ignore observer callbacks if we're programmatically scrolling
          if (isScrollingProgrammatically.current) return;

          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              const index = parseInt(entry.target.getAttribute("data-index") || "-1");
              if (index >= 0 && index < videos.length && index !== currentIndexRef.current) {
                // Pause all videos first
                videoRefs.current.forEach((vid) => {
                  if (vid) {
                    vid.pause();
                  }
                });
                
                currentIndexRef.current = index;
                setCurrentIndex(index);
                setSelectedVideo(videos[index]);
                
                // Play the current video after a small delay
                setTimeout(() => {
                  const currentVideo = videoRefs.current[index];
                  if (currentVideo) {
                    currentVideo.play().catch(() => {
                      // Autoplay might be blocked
                    });
                  }
                }, 100);
              }
            }
          });
        },
        {
          threshold: [0.5], // Video must be at least 50% visible
          rootMargin: "0px",
        }
      );

      observer = newObserver;

      // Observe all video containers
      videoContainerRefs.current.forEach((container) => {
        if (container && newObserver) {
          newObserver.observe(container);
        }
      });
    }, 500); // Wait 500ms after modal opens before enabling observer

    return () => {
      clearTimeout(setupTimer);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [isMobile, selectedVideo]);

  // Show swipe hint when modal opens or when user navigates to a new video
  useEffect(() => {
    if (isMobile && selectedVideo && currentIndex >= 0) {
      // Show hint when video changes - keep it visible
      setShowSwipeHint(true);
    }
  }, [selectedVideo, isMobile, currentIndex]);

  // Initial scroll to selected video when modal opens on mobile
  useEffect(() => {
    if (isMobile && scrollContainerRef.current && selectedVideo && currentIndex >= 0) {
      // Set flag to prevent Intersection Observer from interfering
      isScrollingProgrammatically.current = true;
      
      setTimeout(() => {
        const videoElement = videoContainerRefs.current[currentIndex];
        if (videoElement) {
          videoElement.scrollIntoView({ behavior: "auto", block: "start" });
          
          // Re-enable Intersection Observer after scroll completes
          setTimeout(() => {
            isScrollingProgrammatically.current = false;
          }, 300);
        } else {
          isScrollingProgrammatically.current = false;
        }
      }, 100);
    }
  }, [selectedVideo, isMobile, currentIndex]);

  // Keep swipe hint visible - removed auto-hide functionality

  // Handle swipe gestures - horizontal swipes close modal, vertical swipes scroll
  const handleSwipeGesture = () => {
    if (!isMobile || !selectedVideo) return;

    const deltaX = touchEndX.current - touchStartX.current;
    const deltaY = touchEndY.current - touchStartY.current;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Minimum swipe distance
    const minSwipeDistance = 50;

    // If horizontal swipe is more dominant than vertical, close modal
    if (absDeltaX > minSwipeDistance && absDeltaX > absDeltaY) {
      setSelectedVideo(null);
      setCurrentIndex(-1);
      setShowSwipeHint(false);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setSelectedVideo(videos[newIndex]);
    }
  };

  const goToNext = () => {
    if (currentIndex < videos.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setSelectedVideo(videos[newIndex]);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    if (selectedVideo === null) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        const newIndex = currentIndex - 1;
        setCurrentIndex(newIndex);
        setSelectedVideo(videos[newIndex]);
      } else if (e.key === "ArrowRight" && currentIndex < videos.length - 1) {
        const newIndex = currentIndex + 1;
        setCurrentIndex(newIndex);
        setSelectedVideo(videos[newIndex]);
      } else if (e.key === "Escape") {
        setSelectedVideo(null);
        setCurrentIndex(-1);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedVideo, currentIndex]);

  return (
    <section
      id="videos"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white font-fingermade">
          VIDEOS
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {previewVideos.map((video, index) => (
            <div
              key={video.id}
              className="relative group cursor-pointer"
              onClick={() => handleVideoClick(video, index)}
            >
              <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                {video.type === "youtube" ? (
                  <Image
                    src={video.thumbnail || getYouTubeThumbnail(video.id)}
                    alt={video.title}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : thumbnails[video.id] ? (
                  <Image
                    src={thumbnails[video.id]}
                    alt={video.title}
                    fill
                    className="object-cover"
                    unoptimized
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                    <Play className="w-16 h-16 text-white opacity-50" />
                  </div>
                )}
                {/* Hidden video element for thumbnail generation */}
                {video.type === "local" && (
                  <video
                    ref={(el) => {
                      thumbnailRefs.current[index] = el;
                    }}
                    src={video.localSrc}
                    className="hidden"
                    preload="metadata"
                    muted
                    playsInline
                  />
                )}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-colors flex items-center justify-center">
                  <div className="bg-white/90 rounded-full p-4 group-hover:scale-110 transition-transform">
                    {video.type === "youtube" ? (
                      (() => {
                        const youtubeIcon = (SimpleIcons as any).siYoutube;
                        if (youtubeIcon && youtubeIcon.path) {
                          return (
                            <svg
                              role="img"
                              viewBox="0 0 24 24"
                              width={32}
                              height={32}
                              fill="#FF0000"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <title>YouTube</title>
                              <path d={youtubeIcon.path} />
                            </svg>
                          );
                        }
                        // Fallback to a simple play icon if Simple Icons fails
                        return <Play className="w-8 h-8 text-red-600" />;
                      })()
                    ) : (
                      <Play className="w-8 h-8 text-gray-900" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {videos.length > previewVideos.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => handleVideoClick(videos[0], 0)}
              className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              View All {videos.length} Videos
            </button>
          </div>
        )}
      </div>

      {/* Video Modal */}
      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 bg-black"
          onClick={() => {
            setSelectedVideo(null);
            setCurrentIndex(-1);
          }}
        >
          {/* Mobile: Vertical Scrollable Feed */}
          {isMobile ? (
            <div className="relative h-full w-full">
              {/* Swipe Up Hint Overlay - Fixed to viewport */}
              {showSwipeHint && (
                <div className="fixed bottom-20 left-0 right-0 flex justify-center z-50 pointer-events-none" style={{ position: 'fixed' }}>
                  <div className="bg-black/90 backdrop-blur-md rounded-full px-6 py-4 flex flex-col items-center gap-2 shadow-2xl border border-white/20 animate-bounce">
                    <ChevronUp className="w-8 h-8 text-white animate-pulse" />
                    <p className="text-white text-sm font-semibold whitespace-nowrap">
                      Swipe up for more
                    </p>
                  </div>
                </div>
              )}
              <div
                ref={scrollContainerRef}
                className="h-full w-full overflow-y-scroll"
                style={{
                  scrollSnapType: "y mandatory",
                  WebkitOverflowScrolling: "touch",
                  scrollBehavior: "smooth",
                }}
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                  touchStartY.current = e.touches[0].clientY;
                }}
                onTouchEnd={(e) => {
                  touchEndX.current = e.changedTouches[0].clientX;
                  touchEndY.current = e.changedTouches[0].clientY;
                  handleSwipeGesture();
                }}
              >
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  ref={(el) => {
                    videoContainerRefs.current[index] = el;
                  }}
                  data-index={index}
                  className="h-screen w-full flex items-center justify-center relative"
                  style={{ scrollSnapAlign: "start", scrollSnapStop: "always" }}
                >
                  {/* Close Button */}
                  <button
                    className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedVideo(null);
                      setCurrentIndex(-1);
                    }}
                  >
                    <X size={24} />
                  </button>

                  {/* Video Counter */}
                  <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                    {index + 1} / {videos.length}
                  </div>

                  {/* Video Player */}
                  {video.type === "youtube" ? (
                    <iframe
                      key={`${video.id}-${index === currentIndex}`}
                      src={getYouTubeEmbedUrl(video.id) + (index === currentIndex ? "?autoplay=1&mute=0" : "?mute=1")}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                        // Pause video if it's not the current one
                        if (el && index !== currentIndex) {
                          el.pause();
                        }
                      }}
                      src={video.localSrc}
                      controls
                      autoPlay={false}
                      playsInline
                      muted={index !== currentIndex}
                      className="w-full h-full object-contain"
                      onPlay={() => {
                        // Pause all other videos when one plays
                        videoRefs.current.forEach((vid, i) => {
                          if (i !== index && vid) {
                            vid.pause();
                            vid.currentTime = 0;
                          }
                        });
                      }}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                ))}
              </div>
            </div>
          ) : (
            /* Desktop: Modal with Navigation Buttons */
            <div
              className="flex items-center justify-center h-full p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-w-5xl w-full aspect-video">
                {/* Close Button */}
                <button
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
                  onClick={() => {
                    setSelectedVideo(null);
                    setCurrentIndex(-1);
                  }}
                >
                  <span className="text-2xl">×</span>
                </button>

                {/* Previous Button */}
                {currentIndex > 0 && (
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToPrevious();
                    }}
                    aria-label="Previous video"
                  >
                    <ChevronLeft size={24} />
                  </button>
                )}

                {/* Next Button */}
                {currentIndex < videos.length - 1 && (
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToNext();
                    }}
                    aria-label="Next video"
                  >
                    <ChevronRight size={24} />
                  </button>
                )}

                {/* Video Counter */}
                <div className="absolute -top-12 left-0 text-white text-sm">
                  {currentIndex + 1} / {videos.length}
                </div>

                {/* Video Player */}
                {selectedVideo.type === "youtube" ? (
                  <iframe
                    key={selectedVideo.id}
                    src={getYouTubeEmbedUrl(selectedVideo.id) + "?autoplay=1"}
                    className="w-full h-full rounded-lg"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <video
                    key={selectedVideo.id}
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
        </div>
      )}
    </section>
  );
}
