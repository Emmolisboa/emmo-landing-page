"use client";

import * as SimpleIcons from "simple-icons";

export default function InstagramWidget() {
  // Instagram post/reel URLs
  const instagramPosts = [
    "https://www.instagram.com/reel/CreKSLhuKib/",
    "https://www.instagram.com/reel/C404lyPNxTK/",
    "https://www.instagram.com/reel/CrbmKlGOmH8/",
  ];

  const instagramUsername = "emmomusic"; // Your Instagram username

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          {(SimpleIcons as any).siInstagram && (
            <svg
              role="img"
              viewBox="0 0 24 24"
              width={48}
              height={48}
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <title>Instagram</title>
              <path d={(SimpleIcons as any).siInstagram.path} />
            </svg>
          )}
              <h2 className="text-4xl md:text-5xl font-bold text-white font-fingermade">
                FOLLOW ON INSTAGRAM
              </h2>
        </div>

        {instagramPosts.length > 0 ? (
          // Display embedded posts in a grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {instagramPosts.map((postUrl, index) => (
              <div key={index} className="flex justify-center">
                <iframe
                  src={`${postUrl}embed`}
                  width="100%"
                  height="600"
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency
                  allow="encrypted-media"
                  className="rounded-lg max-w-sm"
                  style={{ minHeight: "600px" }}
                ></iframe>
              </div>
            ))}
          </div>
        ) : (
          // Fallback: Link to Instagram profile with follow button
          <div className="text-center">
            <p className="text-white text-xl mb-8">
              Follow <span className="font-bold">@{instagramUsername}</span> on Instagram
            </p>
            <a
              href={`https://www.instagram.com/${instagramUsername}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 bg-white text-pink-600 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Follow on Instagram
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
