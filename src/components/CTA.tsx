"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function CTA() {
  return (
    <motion.section className="relative flex min-h-105 w-full items-center justify-center overflow-hidden bg-cyan-500" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.35 }}>
      <div className="pointer-events-none absolute inset-8 border-3 border-dashed border-white/40 sm:inset-10 lg:inset-12" />

      <motion.div className="relative z-10 flex flex-col items-center text-center" variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } } }}>
        <h1 className="text-5xl font-extrabold tracking-[-0.045em] text-black sm:text-7xl lg:text-8xl">
          Ready to get <span className="text-white">Started?</span>
        </h1>
        <p className="mt-6 max-w-3xl px-4 text-center text-lg italic text-black/40 sm:text-xl lg:text-2xl">
          Share your files. Send the link. Done. Fast, simple and secure file
          sharing without the hassle.
        </p>
        <Link
        href="/drop"
         className="group mt-10 flex items-center justify-center gap-2 bg-black px-6 py-3 font-semibold text-white transition-all duration-300 hover:-translate-y-1 hover:bg-gray-800 active:scale-95">
          Get Started
          <ArrowUpRight
            size={20}
            className="transition-transform duration-300 group-hover:rotate-45"
          />
        </Link>
      </motion.div>
    </motion.section>
  );
}
