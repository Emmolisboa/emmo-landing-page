import {
  Instagram,
  Youtube,
  Twitter,
  Facebook,
  Spotify,
  Music,
  Mail,
} from "lucide-react";

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
  color: string;
}

// Update these with actual social media links
const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://instagram.com/emmo",
    icon: <Instagram size={24} />,
    color: "hover:text-pink-600",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@emmo",
    icon: <Youtube size={24} />,
    color: "hover:text-red-600",
  },
  {
    name: "Twitter",
    url: "https://twitter.com/emmo",
    icon: <Twitter size={24} />,
    color: "hover:text-blue-400",
  },
  {
    name: "Facebook",
    url: "https://facebook.com/emmo",
    icon: <Facebook size={24} />,
    color: "hover:text-blue-600",
  },
  {
    name: "Spotify",
    url: "https://open.spotify.com/artist/emmo",
    icon: <Spotify size={24} />,
    color: "hover:text-green-500",
  },
  {
    name: "Apple Music",
    url: "https://music.apple.com/artist/emmo",
    icon: <Music size={24} />,
    color: "hover:text-pink-500",
  },
  {
    name: "Email",
    url: "mailto:contact@emmo.com",
    icon: <Mail size={24} />,
    color: "hover:text-gray-600",
  },
];

export default function SocialLinks() {
  return (
    <section
      id="social"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white"
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Connect</h2>
        <p className="text-xl text-gray-300 mb-12">
          Follow along and stay connected across all platforms
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-2 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 transition-all hover:bg-white/20 hover:scale-110 ${link.color}`}
            >
              <div className="text-white">{link.icon}</div>
              <span className="text-sm font-medium">{link.name}</span>
            </a>
          ))}
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
