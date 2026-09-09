"use client";

import { motion, type Variants } from "framer-motion";
import { ShieldCheck, Zap, Lock, ArrowUpRight } from "lucide-react";
import Link from "next/link";

const reveal: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden bg-zinc-50/50 border-y border-zinc-200/60">
      <div className="mx-auto max-w-7xl ">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <motion.div
            className="lg:col-span-7 flex flex-col justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={reveal}
          >
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.25em] text-cyan-500 mb-4">
              <span className="w-5 h-0.5 bg-cyan-500" />
              ABOUT SMARTDROP
            </div>

            <h2 className="text-6xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-zinc-900 leading-[1.1]">
              Secure Drop, <br />
              <span className="text-cyan-500">Absolute Privacy.</span>
            </h2>

            <p className="mt-6 text-zinc-600 text-base sm:text-lg leading-relaxed">
              In an era where digital footprints persist forever, SmartDrop was built on a simple premise: data should only exist as long as it needs to. We combine high-performance caching via Redis with encrypted metadata storage in MongoDB to give you total command over your shared assets.
            </p>

            <p className="italic mt-4 text-zinc-500 text-sm sm:text-base leading-relaxed">
              Whether you are transmitting sensitive source code, client deliverables, or private documents, SmartDrop guarantees cryptographic protection, strict expiration windows, and instant self-destruction once your time limit elapses.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/drop"
                className="group inline-flex items-center gap-2 bg-zinc-900 text-white px-6 py-3.5 font-semibold hover:bg-cyan-600 duration-300 active:scale-95 shadow-lg shadow-zinc-500/30 hover:-translate-y-1 transition-all"
              >
                Create a Drop <ArrowUpRight size={16} className="group-hover: transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 bg-white border border-zinc-300 text-zinc-800 px-6 py-3.5 font-semibold hover:border-zinc-400 hover:bg-zinc-100 duration-300 active:scale-95 shadow-lg shadow-zinc-500/30 hover:-translate-y-1 transition-all"
              >
                Explore Workflow
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Visual Stat / Highlight Cards */}
          <motion.div
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.15 } },
            }}
          >
            <motion.div
              variants={reveal}
              className="p-6 bg-white border border-zinc-200/80 shadow-sm hover:border-cyan-500/50 transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-3 bg-cyan-500/10 text-cyan-600 shrink-0">
                <Lock size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Zero Residual Storage</h3>
                <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                  Automated Redis TTL purges metadata instantly upon expiration so files vanish completely.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={reveal}
              className="p-6 bg-white border border-zinc-200/80 shadow-sm hover:border-cyan-500/50 transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-3 bg-cyan-500/10 text-cyan-600 shrink-0">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Lightning-Fast Transfers</h3>
                <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                  Optimized pipelines built on modern web standards ensure near-instant generation and retrieval.
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={reveal}
              className="p-6 bg-white border border-zinc-200/80 shadow-sm hover:border-cyan-500/50 transition-all duration-300 flex items-start gap-4"
            >
              <div className="p-3 bg-cyan-500/10 text-cyan-600 shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-zinc-900">Enterprise Security Standards</h3>
                <p className="mt-1 text-sm text-zinc-500 leading-relaxed">
                  Secured with password hashing, multi-factor verification workflows, and strict access gating.
                </p>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
