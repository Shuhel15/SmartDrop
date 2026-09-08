"use client";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Globe,
  Heart,
} from "lucide-react";import { FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <motion.footer className="bg-white text-black" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
      <div className="mx-auto w-full max-w-7xl  py-14 ">

        <motion.div className="flex flex-col gap-10 border-b border-black/10 pb-10 md:flex-row md:items-start md:justify-between" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7 } } }}>

          <div>
            <h2 className="text-3xl font-extrabold tracking-tight">
              Smart<span className="text-cyan-500">Drop.</span>
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-6 text-black/50">
              Simple, fast and secure file sharing.
              Upload your files, create a link and share.
            </p>
          </div>

          <div className="flex gap-10 sm:gap-16 justify-between md:gap-20 lg:gap-32">

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                Explore
              </p>

              <div className="flex flex-col gap-3 text-sm">
                <a
                  href="#home"
                  className="transition-colors text-black/50 hover:text-cyan-500"
                >
                  Home
                </a>

                <a
                  href="#how-it-works"
                  className="transition-colors text-black/50 hover:text-cyan-500"
                >
                  How it works
                </a>

                <a
                  href="#features"
                  className="transition-colors text-black/50 hover:text-cyan-500"
                >
                  Features
                </a>
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.2em] text-black/40">
                Connect
              </p>

              <div className="flex flex-col gap-3 text-sm">
                <a
                  href="https://github.com/Shuhel15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-black/50 flex items-center gap-2 transition-colors hover:text-cyan-500"
                >
                  <FaGithub size={17} />
                  GitHub
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>

                <a
                  href="https://shuhel.tech"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group text-black/50 flex items-center gap-2 transition-colors hover:text-cyan-500"
                >
                  <Globe size={17} />
                  Portfolio
                  <ArrowUpRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  />
                </a>
              </div>
            </div>
          </div>
        </motion.div>


        <motion.div className="flex flex-col items-center justify-between gap-4 pt-7 text-sm sm:flex-row" variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { delay: 0.15 } } }}>

          <p className="text-black/40">
            © {new Date().getFullYear()} Sharely. All rights reserved.
          </p>

          <p className="flex items-center gap-2 text-black/50">
            Made with

            <span className="relative flex h-5 w-5 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-cyan-500/30" />

              <Heart
                size={15}
                className="relative z-10 fill-cyan-500 text-cyan-500"
              />
            </span>

            by{" "}
            <a
              href="https://shuhel.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-black transition-colors hover:text-cyan-500"
            >
              Shuhel
            </a>
          </p>

        </motion.div>
      </div>
    </motion.footer>
  );
}