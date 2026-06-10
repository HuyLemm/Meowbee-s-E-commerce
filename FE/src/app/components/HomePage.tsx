import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  LogOut,
  User,
  Settings,
} from "lucide-react";

import meowbeeImage from "../images/meowbee.jpg";

interface HomePageProps {
  username: string;
  onLogout: () => void;
}

export function HomePage({ username, onLogout }: HomePageProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: "'DM Sans', sans-serif", background: "#fafaf8" }}
    >
      {/* HEADER */}
      <header
        className="sticky top-0 z-50 shadow-sm"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center"
              style={{ background: "linear-gradient(135deg, #f5a623, #f7c948)" }}
            >
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <ellipse cx="14" cy="16" rx="7" ry="9" fill="#1a1a1a" />
                <ellipse cx="14" cy="14" rx="7" ry="2.5" fill="#f5a623" />
                <ellipse cx="14" cy="19" rx="7" ry="2.5" fill="#f5a623" />
                <circle cx="14" cy="7" r="4" fill="#1a1a1a" />
                <ellipse cx="7" cy="12" rx="4.5" ry="2.5" fill="white" fillOpacity="0.85" transform="rotate(-20 7 12)" />
                <ellipse cx="21" cy="12" rx="4.5" ry="2.5" fill="white" fillOpacity="0.85" transform="rotate(20 21 12)" />
              </svg>
            </div>
            <span
              className="text-xl"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "white" }}
            >
              Meow<span style={{ color: "#f5a623" }}>Bee</span>
            </span>
          </div>

          {/* User dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setUserMenuOpen((v) => !v)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
              style={{ background: "rgba(255,255,255,0.08)" }}
            >
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #f5a623, #f7c948)" }}
              >
                <span className="text-xs" style={{ fontWeight: 700, color: "#1a1a1a" }}>
                  {username[0].toUpperCase()}
                </span>
              </div>
              <span className="text-sm text-white" style={{ fontWeight: 500 }}>
                {username}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
            </button>

            {userMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-48 rounded-xl overflow-hidden shadow-xl z-50"
                style={{ background: "white", border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <div className="px-4 py-3 border-b" style={{ borderColor: "rgba(0,0,0,0.06)" }}>
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #f5a623, #f7c948)" }}
                    >
                      <span className="text-xs" style={{ fontWeight: 700, color: "#1a1a1a" }}>
                        {username[0].toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm" style={{ fontWeight: 600, color: "#1a1a1a" }}>{username}</p>
                      <p className="text-xs" style={{ color: "#9ca3af" }}>MeowBee member</p>
                    </div>
                  </div>
                </div>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-50"
                  style={{ color: "#4b5563" }}
                >
                  <User className="w-4 h-4" />
                  Profile
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-gray-50"
                  style={{ color: "#4b5563" }}
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <div className="border-t" style={{ borderColor: "rgba(0,0,0,0.06)" }} />
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors hover:bg-red-50"
                  style={{ color: "#ef4444" }}
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "1.5rem",
              color: "#1a1a1a",
            }}
          >
            Welcome back to MeowBee, {username}! 🐝
          </h2>
          <p className="text-sm mt-0.5" style={{ color: "#6b7280" }}>
            Here's what's buzzing today
          </p>
        </div>

        {/* About MeowBee Team */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{ background: "white", border: "1px solid rgba(0,0,0,0.06)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
        >
          <div className="relative overflow-hidden" style={{ height: 320 }}>
            <img
              src={meowbeeImage}
              alt="MeowBee team of 5"
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, rgba(26,26,26,0.85) 0%, rgba(26,26,26,0.2) 60%, transparent 100%)" }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-3"
                style={{ background: "rgba(245,166,35,0.2)", border: "1px solid rgba(245,166,35,0.4)" }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                <span className="text-xs" style={{ color: "#f5a623", fontWeight: 600 }}>MeowBee Group · 5 members</span>
              </div>
              <h3
                className="text-white"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: "1.75rem" }}
              >
                Welcome to MeowBee!! 🐝
              </h3>
            </div>
          </div>
          <div className="p-8">
            <div className="max-w-2xl mx-auto text-center space-y-4">
              <p className="leading-relaxed" style={{ color: "#4b5563", fontSize: "1rem" }}>
                <strong style={{ color: "#1a1a1a" }}>MeowBee</strong> This is an e-commerce project built by a team of 5 tech-savvy members. We offer a fast, convenient, and enjoyable online shopping experience — as fast as a bee!
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-14">
                {["Dung Ta", "Huy Lam", "Minh Le", "Tam Ho", "Anh Nguyen"].map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-2 px-4 py-2 rounded-full"
                    style={{ background: "#fff8e6", border: "1px solid #fde68a" }}
                  >
                    <div
                      className="w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: "linear-gradient(135deg, #f5a623, #f7c948)" }}
                    >
                      <span className="text-[10px]" style={{ fontWeight: 700, color: "#1a1a1a" }}>
                        {name.trim()[0]}                      
                      </span>
                    </div>
                    <span className="text-sm" style={{ fontWeight: 500, color: "#92400e" }}>{name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="mt-16 border-t"
        style={{ borderColor: "rgba(0,0,0,0.08)", background: "white" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #f5a623, #f7c948)" }}
              >
                <svg width="16" height="16" viewBox="0 0 28 28" fill="none">
                  <ellipse cx="14" cy="16" rx="7" ry="9" fill="#1a1a1a" />
                  <ellipse cx="14" cy="14" rx="7" ry="2.5" fill="#f5a623" />
                  <ellipse cx="14" cy="19" rx="7" ry="2.5" fill="#f5a623" />
                  <circle cx="14" cy="7" r="4" fill="#1a1a1a" />
                </svg>
              </div>
              <span
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: "#1a1a1a" }}
              >
                Meow<span style={{ color: "#f5a623" }}>Bee</span>
              </span>
            </div>
            <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              {["About", "Contact", "Help Center", "Privacy Policy"].map((link) => (
                <button
                  key={link}
                  className="text-sm transition-colors hover:text-yellow-500"
                  style={{ color: "#6b7280" }}
                >
                  {link}
                </button>
              ))}
            </nav>
            <p className="text-xs" style={{ color: "#9ca3af" }}>
              © 2026 MeowBee. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
