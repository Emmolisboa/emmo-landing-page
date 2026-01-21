"use client";

import * as SimpleIcons from "simple-icons";

export default function SpotifyWidget() {
  const spotifyArtistId = "0DljNpPOcPkXDWmHwjdLYT";
  const spotifyIcon = (SimpleIcons as any).siSpotify;

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#1DB954]">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-4 mb-12">
          {spotifyIcon && (
            <svg
              role="img"
              viewBox="0 0 24 24"
              width={48}
              height={48}
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <title>Spotify</title>
              <path d={spotifyIcon.path} />
            </svg>
          )}
              <h2 className="text-4xl md:text-5xl font-bold text-white font-fingermade">
                LISTEN ON SPOTIFY
              </h2>
        </div>
        <div className="flex justify-center">
          <iframe
            style={{ borderRadius: "12px" }}
            src={`https://open.spotify.com/embed/artist/${spotifyArtistId}?utm_source=generator&theme=0`}
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="max-w-2xl"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
