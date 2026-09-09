"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
];

export default function NavBar() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const handleAuth = () => {
    if (session) {
      signOut();
    } else {
      router.push("/login");
    }
  };

  return (
    <motion.main className="fixed left-1/2 top-2 z-50 w-[calc(100%-1rem)] max-w-7xl -translate-x-1/2 border border-black/10 bg-white/80 shadow-lg backdrop-blur-lg" initial={{ opacity: 0, y: -24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          onClick={() => setIsOpen(false)}
          className="group relative overflow-hidden"
        >
          <div className="group relative flex h-10 w-10 items-center justify-center border-white/20 bg-cyan-500 text-xl font-bold text-white shadow-lg shadow-cyan-500/30">
            <span className="absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-cyan-600 transition-transform duration-300 ease-out group-hover:scale-y-100" />

            <span className="relative z-10 group-hover:transition-transform group-hover:rotate-180 duration-500">S</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center font-semibold text-zinc-500 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group relative overflow-hidden px-4 py-2 space-x-2 transition-colors duration-300"
            >
              <span className="absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-cyan-500/10 transition-transform duration-300 ease-out group-hover:scale-y-100" />

              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                {link.label}
              </span>
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <button
            type="button"
            onClick={handleAuth}
            className="group relative overflow-hidden bg-cyan-500 px-4 py-2 font-semibold text-white transition-colors duration-300 hover:bg-cyan-600"
          >
            <span className="absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-cyan-600 transition-transform duration-300 ease-out group-hover:scale-y-100" />

            <span className="relative z-10">
              {session ? "Logout" : "Login"}
            </span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          className=" p-2 text-zinc-600 transition-colors hover:bg-black/5 hover:text-black md:hidden border border-cyan-500"
        >
          {isOpen ? (
            <X size={24} strokeWidth={2} />
          ) : (
            <Menu size={24} strokeWidth={2} />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`overflow-hidden border-t border-white/10 transition-all duration-300 md:hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="flex flex-col p-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="group relative overflow-hidden rounded-lg px-4 py-3 font-semibold text-zinc-600 transition-colors duration-300"
            >
              <span className="absolute inset-x-0 bottom-0 h-full origin-bottom scale-y-0 bg-cyan-500/10 transition-transform duration-300 ease-out group-hover:scale-y-100" />

              <span className="relative z-10 group-hover:text-black">
                {link.label}
              </span>
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              handleAuth();
              setIsOpen(false);
            }}
            className="mt-2 bg-cyan-500 px-4 py-3 text-left font-semibold text-zinc-600 transition-all duration-300 hover:bg-cyan-500 hover:text-white"
          >
            {" "}
            {session ? "Logout" : "Login"}{" "}
          </button>
        </nav>
      </div>
    </motion.main>
  );
}


