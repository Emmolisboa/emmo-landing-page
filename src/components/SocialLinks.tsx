"use client";

import React from "react";
import Link from "next/link";
import {
  siInstagram,
  siYoutube,
  siSpotify,
} from "simple-icons/icons";
import { Mail } from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  iconSlug: string;
  color: string;
  isEmail?: boolean; // Flag to identify email link
}

// Update these with actual social media links
const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/emmomusic",
    iconSlug: "instagram",
    color: "hover:text-pink-600",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@Emmo-Music",
    iconSlug: "youtube",
    color: "hover:text-red-600",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/0DljNpPOcPkXDWmHwjdLYT",
    iconSlug: "spotify",
    color: "hover:text-green-500",
  },
  {
    name: "Email",
    url: "/contact",
    iconSlug: "mail", // Will use Lucide icon for email
    color: "hover:text-gray-600",
    isEmail: true,
  },
];

export default function SocialLinks() {
  return (
    <section
      id="social"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 font-fingermade">CONNECT</h2>
        <p className="text-xl text-gray-300 mb-12">
          Follow along and stay connected across all platforms
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => {
            // Map icon slugs to Simple Icons
            const iconMap: Record<string, { path: string; title: string }> = {
              instagram: siInstagram,
              youtube: siYoutube,
              spotify: siSpotify,
            };
            
            const icon = iconMap[link.iconSlug];

            // Use Link for email (internal route), anchor for external links
            const LinkComponent = link.isEmail ? Link : "a";
            const linkProps = link.isEmail
              ? { href: link.url }
              : {
                  href: link.url,
                  target: "_blank",
                  rel: "noopener noreferrer",
                };

            return (
              <LinkComponent
                key={link.name}
                {...linkProps}
                className={`flex flex-col items-center justify-center gap-2 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all hover:bg-white/20 hover:scale-110 hover:shadow-xl hover:-translate-y-2 ${link.color} w-32 h-32`}
              >
                <div className="text-white flex items-center justify-center">
                  {link.iconSlug === "mail" ? (
                    <Mail size={24} />
                  ) : icon && icon.path ? (
                    <svg
                      role="img"
                      viewBox="0 0 24 24"
                      width={24}
                      height={24}
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <title>{icon.title}</title>
                      <path d={icon.path} />
                    </svg>
                  ) : (
                    <span className="text-xs">{link.name[0]}</span>
                  )}
                </div>
                <span className="text-sm font-medium text-center">{link.name}</span>
              </LinkComponent>
            );
          })}
        </div>
        <div className="mt-16 pt-8 border-t border-white/20">
          <p className="text-gray-400">
            For bookings and inquiries, please reach out via email or social
            media.
          </p>
        </div>
      </div>
    </section>
  );
}
