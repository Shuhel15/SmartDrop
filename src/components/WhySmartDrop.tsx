"use client";

import { motion, type Variants } from "framer-motion";
import { Hourglass, LockKeyhole, UserShield, Zap } from "lucide-react";

const features = [
  {
    icon: <LockKeyhole />,
    title: "Password Protected",
    description: "Keep your files secure with a password only you choose.",
  },
  {
    icon: <Hourglass />,
    title: "Temporary Links",
    description: "Set links to expire automatically when you want.",
  },
  {
    icon: <UserShield />,
    title: "Access Control",
    description: "Decide exactly who can access your shared files.",
  },
  {
    icon: <Zap />,
    title: "Instant Sharing",
    description: "Upload your files and share them in just a few seconds.",
  },
];

const reveal: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const featureGrid: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardReveal: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhySmartDrop() {
  return (
    <section
      id="why-smartdrop"
      className="mt-16 sm:mt-20 lg:mt-24"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          className="text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.35 }}
          variants={reveal}
        >
          <motion.p
            className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-cyan-500"
            variants={reveal}
          >
            <span className="h-px w-6 bg-cyan-500" />
            WHY SMARTDROP
            <span className="h-px w-6 bg-cyan-500" />
          </motion.p>

          <motion.h2
            className="mx-auto mt-5 max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl"
            variants={reveal}
          >
            Sharing files shouldn&apos;t mean{" "}
            <span className="text-cyan-500">losing control.</span>
          </motion.h2>

          <motion.p
            className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base"
            variants={reveal}
          >
            Simple file sharing with the privacy, security, and control you
            need.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={featureGrid}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="group relative overflow-hidden py-6 sm:py-7 transition-all duration-300 hover:-translate-y-1"
              variants={cardReveal}
              whileHover={{ y: -6 }}
            >
              <motion.div
                className="absolute left-0 top-0 h-px w-full origin-left bg-cyan-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.12 + 0.3 }}
              />

              <div className="flex h-12 w-12 items-center justify-center bg-cyan-500/10 text-cyan-500 transition-all duration-300 group-hover:bg-cyan-500 group-hover:text-white">
                {feature.icon}
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold tracking-tight text-zinc-900">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {feature.description}
                </p>
              </div>

              <span className="absolute bottom-0 left-0 h-px w-8 bg-zinc-200 transition-all duration-300 group-hover:w-full group-hover:bg-cyan-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}