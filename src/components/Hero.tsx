"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Dropbox/DSC_0470.jpg"
          alt="Emmo"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="mb-6 flex justify-center animate-fade-in">
          <Image
            src="/images/Logos/EMMO logo White cropped.png"
            alt="EMMO"
            width={600}
            height={200}
            className="w-auto h-24 md:h-32 lg:h-40 drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            priority
          />
        </div>
        <p className="text-xl md:text-2xl mb-8 text-gray-300 animate-fade-in-delay">
          Musician • Artist • Creator
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
          <button
            onClick={() => {
              const element = document.getElementById("about");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-colors"
          >
            Learn More
          </button>
          <button
            onClick={() => {
              const element = document.getElementById("videos");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-8 py-3 border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 hover:scale-105 hover:shadow-lg transition-all duration-300"
          >
            Watch Videos
          </button>
          <a
            href="/contact"
            className="px-8 py-3 bg-white/20 backdrop-blur-sm border-2 border-white text-white rounded-full font-semibold hover:bg-white hover:text-gray-900 hover:scale-105 hover:shadow-lg transition-all duration-300 inline-block text-center"
          >
            Get in Touch
          </a>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>
  );
}
