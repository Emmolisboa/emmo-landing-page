"use client";

import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white font-fingermade">
          ABOUT
        </h2>
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
          {/* Image */}
          <div className="w-full lg:w-1/2 flex-shrink-0">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src="/images/Dropbox/DSC_0231.jpg"
                alt="Emmo performing"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
          
          {/* Text Content */}
          <div className="w-full lg:w-1/2 prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              EMMO is an Irish singer and guitarist known for delivering high-quality live music that fits the room, the moment, and the crowd. With years of experience performing across weddings, pubs, and private events, he combines strong vocals, polished guitar work, and an instinctive feel for atmosphere.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              His sets range from relaxed acoustic background music to lively, crowd-engaging performances, adapting seamlessly to ceremonies, drinks receptions, late-night bar settings, and private functions. Whether the goal is to enhance the mood or lift the energy, EMMO focuses on making the music feel effortless and appropriate rather than overpowering.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Professional, reliable, and easy to work with, EMMO prides himself on reading the room and delivering a performance that feels tailored rather than generic, helping create memorable experiences for guests and hosts alike.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
