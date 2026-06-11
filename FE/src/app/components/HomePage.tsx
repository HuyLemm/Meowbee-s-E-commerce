import { LogOut } from "lucide-react";
import meowbeeImage from "../images/meowbee.jpg";
import { BeeLogo, Avatar, MemberBadge } from "../utils/BrandDecor";

interface HomePageProps {
  username: string;
  onLogout: () => void;
}

const members = ["Dung Ta", "Huy Lam", "Minh Le", "Tam Ho", "Anh Nguyen"];
const links = ["About", "Contact", "Help Center", "Privacy Policy"];

export function HomePage({ username, onLogout }: HomePageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-[#fafaf8] font-['DM_Sans']">
      <header className="sticky top-0 z-50 shadow-sm bg-gradient-to-r from-[#fff8e6] to-[#fff1c7] border-b border-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <BeeLogo />

          <div className="flex items-center gap-3">
            <Avatar name={username} />
            <span className="text-sm font-medium text-black">{username}</span>

            <button
              onClick={onLogout}
              className="flex items-center gap-1 text-sm text-red-400 hover:text-red-300"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-[#1a1a1a]">
            Welcome back to MeowBee, {username}! 🐝
          </h2>
          <p className="text-sm mt-1 text-gray-500">
            Here's what's buzzing today
          </p>
        </div>

        <section className="rounded-2xl overflow-hidden bg-white border shadow-md">
          <div className="relative h-80">
            <img
              src={meowbeeImage}
              alt="MeowBee team"
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block px-3 py-1.5 rounded-full mb-3 text-xs font-semibold text-[#f5a623] bg-yellow-500/20 border border-yellow-500/40">
                MeowBee Group · 5 members
              </span>

              <h3 className="text-white text-3xl font-extrabold">
                Welcome to MeowBee!! 🐝
              </h3>
            </div>
          </div>

          <div className="p-8 text-center">
            <p className="max-w-2xl mx-auto leading-relaxed text-gray-600">
              <strong className="text-[#1a1a1a]">MeowBee</strong> is an
              e-commerce project built by 5 tech-savvy members. We offer a fast,
              convenient, and enjoyable online shopping experience — as fast as
              a bee!
            </p>

            <div className="flex flex-wrap justify-center gap-3 pt-10">
              {members.map((name) => (
                <MemberBadge key={name} name={name} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <BeeLogo dark />

          <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {links.map((link) => (
              <button
                key={link}
                className="text-sm text-gray-500 hover:text-yellow-500"
              >
                {link}
              </button>
            ))}
          </nav>

          <p className="text-xs text-gray-400">
            © 2026 MeowBee. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}