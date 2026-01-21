"use client";

import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  src: string;
  alt: string;
}

// Images from /public/images/Dropbox directory
const galleryImages: GalleryImage[] = [
  {
    src: "/images/Dropbox/_DSC3531.jpg",
    alt: "Emmo performance photo",
  },
  {
    src: "/images/Dropbox/0E8A1180.jpg",
    alt: "Emmo performance photo",
  },
  {
    src: "/images/Dropbox/46927169-B421-4C6A-A7E4-666FFDFB94E7_4_5005_c.jpeg",
    alt: "Emmo photo",
  },
  {
    src: "/images/Dropbox/67272F3F-00DA-4DE2-8530-18DC18DC5200_4_5005_c.jpeg",
    alt: "Emmo photo",
  },
  {
    src: "/images/Dropbox/7C75B210-5A21-46F6-A5D1-EB187800DCBC_4_5005_c.jpeg",
    alt: "Emmo photo",
  },
  {
    src: "/images/Dropbox/91A1941D-00F1-4EA6-8582-EBA609399CEF_4_5005_c.jpeg",
    alt: "Emmo photo",
  },
  {
    src: "/images/Dropbox/91AAF1D6-6DB7-4047-B395-A53369B5F0E7_4_5005_c.jpeg",
    alt: "Emmo photo",
  },
  {
    src: "/images/Dropbox/A77346B2-EE04-4296-B56E-53C822EC5F41_4_5005_c.jpeg",
    alt: "Emmo photo",
  },
  {
    src: "/images/Dropbox/B - CorkBeo Write Up & Vid of BBC ICSYV.png",
    alt: "CorkBeo Write Up & Vid of BBC ICSYV",
  },
  {
    src: "/images/Dropbox/B - Support Stephanie Rainey Post.png",
    alt: "Support Stephanie Rainey Post",
  },
  {
    src: "/images/Dropbox/DSC_0231.jpg",
    alt: "Emmo performance photo",
  },
  {
    src: "/images/Dropbox/DSC_0470.jpg",
    alt: "Emmo performance photo",
  },
  {
    src: "/images/Dropbox/Emmo GIG 1.png",
    alt: "Emmo GIG 1",
  },
  {
    src: "/images/Dropbox/EMMO GIG 2.png",
    alt: "EMMO GIG 2",
  },
  {
    src: "/images/Dropbox/EMMO Spotify Profile.png",
    alt: "EMMO Spotify Profile",
  },
  {
    src: "/images/Dropbox/EmmoICSYV.jpeg",
    alt: "Emmo ICSYV",
  },
  {
    src: "/images/Dropbox/IMG_20191001_190726_153.jpg",
    alt: "Emmo photo",
  },
  {
    src: "/images/Dropbox/IMG_20191017_102841_228.jpg",
    alt: "Emmo photo",
  },
];

export default function Gallery() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [isMobile, setIsMobile] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

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
  const previewImages = galleryImages.slice(0, isMobile ? 4 : 6);

  // Scroll to selected image when carousel opens
  useEffect(() => {
    if (selectedImageIndex !== null && carouselRef.current) {
      const imageElement = carouselRef.current.children[
        selectedImageIndex
      ] as HTMLElement;
      if (imageElement) {
        imageElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [selectedImageIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedImageIndex === null) return;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && selectedImageIndex > 0) {
        setSelectedImageIndex(selectedImageIndex - 1);
      } else if (
        e.key === "ArrowRight" &&
        selectedImageIndex < galleryImages.length - 1
      ) {
        setSelectedImageIndex(selectedImageIndex + 1);
      } else if (e.key === "Escape") {
        setSelectedImageIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [selectedImageIndex]);

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (Math.abs(swipeDistance) > minSwipeDistance && selectedImageIndex !== null) {
      if (swipeDistance > 0 && selectedImageIndex < galleryImages.length - 1) {
        // Swipe left - next image
        setSelectedImageIndex(selectedImageIndex + 1);
      } else if (swipeDistance < 0 && selectedImageIndex > 0) {
        // Swipe right - previous image
        setSelectedImageIndex(selectedImageIndex - 1);
      }
    }
  };

  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  const goToNext = () => {
    if (
      selectedImageIndex !== null &&
      selectedImageIndex < galleryImages.length - 1
    ) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <section
      id="gallery"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white font-fingermade">
          GALLERY
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {previewImages.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
            </div>
          ))}
        </div>
        {galleryImages.length > previewImages.length && (
          <div className="text-center mt-8">
            <button
              onClick={() => handleImageClick(0)}
              className="px-8 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
            >
              View All {galleryImages.length} Photos
            </button>
          </div>
        )}
      </div>

      {/* Carousel Modal */}
      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black"
          onClick={() => setSelectedImageIndex(null)}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full p-2 text-white hover:bg-black/70 transition-colors"
            onClick={() => setSelectedImageIndex(null)}
          >
            <X size={24} />
          </button>

          {/* Image Counter */}
          <div className="absolute top-4 left-4 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
            {selectedImageIndex + 1} / {galleryImages.length}
          </div>

          {/* Previous Button */}
          {selectedImageIndex > 0 && (
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all hidden md:block"
              onClick={(e) => {
                e.stopPropagation();
                goToPrevious();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Next Button */}
          {selectedImageIndex < galleryImages.length - 1 && (
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 text-white transition-all hidden md:block"
              onClick={(e) => {
                e.stopPropagation();
                goToNext();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Horizontal Scrollable Carousel */}
          <div
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="h-full w-full overflow-x-scroll snap-x snap-mandatory flex"
            style={{
              scrollSnapType: "x mandatory",
              WebkitOverflowScrolling: "touch",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="h-full w-full flex-shrink-0 flex items-center justify-center relative"
                style={{ scrollSnapAlign: "center" }}
              >
                <div className="relative max-w-7xl max-h-[90vh] w-full h-full px-4 md:px-8">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority={index === selectedImageIndex}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
