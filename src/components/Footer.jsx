import React from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Leaf,
  TrendingUp,
  CloudSun,
  MessageCircle,
  ArrowRight,
  Heart,
} from "lucide-react";

/* ✅ Static Tailwind-safe styles */
const SOCIAL_STYLES = {
  facebook: {
    bg: "from-blue-500 to-blue-600",
    hover: "hover:from-blue-600 hover:to-blue-700",
  },
  instagram: {
    bg: "from-pink-500 to-purple-600",
    hover: "hover:from-pink-600 hover:to-purple-700",
  },
  twitter: {
    bg: "from-sky-500 to-blue-500",
    hover: "hover:from-sky-600 hover:to-blue-600",
  },
};

const QUICK_FEATURE_STYLES = {
  Weather: "from-blue-500 to-cyan-500",
  Markets: "from-emerald-500 to-green-500",
  "AI Chat": "from-purple-500 to-violet-500",
};

const Footer = () => {

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "https://facebook.com", key: "facebook" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com", key: "instagram" },
    { name: "Twitter", icon: Twitter, href: "https://twitter.com", key: "twitter" },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 text-white">
      {/* Newsletter */}
      <div className="border-b border-emerald-800/50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-10 shadow-2xl grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-3xl font-black mb-3">Stay Updated with FarmEdge</h3>
              <p className="text-emerald-100">
                Get farming tips, weather updates, and market insights.
              </p>
            </div>
            <div className="flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-4 rounded-xl text-gray-900 font-semibold"
              />
              <button className="px-6 py-4 bg-gray-900 rounded-xl font-bold flex items-center gap-2">
                Subscribe <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="">
        {/* Social + Quick */}
        <div className="max-w-7xl mx-auto px-6 py-16 border-t border-emerald-800/50 pt-10 flex flex-col md:flex-row justify-between gap-8">
          <div>
            <h4 className="font-black mb-4">Follow Us On</h4>
            <div className="flex gap-4">
              {socialLinks.map((s) => (
                <a key={s.name} href={s.href} className="group relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${SOCIAL_STYLES[s.key].bg} blur-md opacity-0 group-hover:opacity-70 rounded-xl`}
                  />
                  <div
                    className={`relative bg-gradient-to-r ${SOCIAL_STYLES[s.key].bg} ${SOCIAL_STYLES[s.key].hover} p-4 rounded-xl`}
                  >
                    <s.icon className="w-6 h-6" />
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-4">
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
