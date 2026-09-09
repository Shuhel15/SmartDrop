"use client";

import { motion, type Variants } from "framer-motion";
import { 
  ShieldCheck, 
  Timer, 
  KeyRound, 
  Share2, 
  Database, 
  Sparkles 
} from "lucide-react";

const featuresList = [
  {
    icon: <KeyRound className="w-6 h-6 text-cyan-500" />,
    title: "Secure Password Protection",
    description: "Every drop can be safeguarded with a custom cryptographic password hash, ensuring only authorized individuals can access your files.",
  },
  {
    icon: <Timer className="w-6 h-6 text-cyan-500" />,
    title: "Granular Auto-Expiry",
    description: "Choose precise expiration windows ranging from 5 minutes up to 7 days, powered by Redis TTL to permanently erase links on time.",
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-cyan-500" />,
    title: "Robust Authentication & OTP",
    description: "Multi-factor verification and secure user sessions built with NextAuth protect your account and activity logs.",
  },
  {
    icon: <Share2 className="w-6 h-6 text-cyan-500" />,
    title: "Instant Link Generation",
    description: "Generate clean, shareable drop links instantly with one-click copying and modern responsive sharing workflows.",
  },
  {
    icon: <Database className="w-6 h-6 text-cyan-500" />,
    title: "High-Performance Storage",
    description: "Seamlessly backed by MongoDB and Redis for lightning-fast retrieval, metadata indexing, and robust state persistence.",
  },
  {
    icon: <Sparkles className="w-6 h-6 text-cyan-500" />,
    title: "Sleek & Modern UI",
    description: "Crafted with Tailwind CSS and Framer Motion for buttery-smooth animations, dark/light contrast accents, and a delightful user experience.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl ">
        <div className="text-center max-w-3xl mx-auto">
          <motion.p
            className="text-xs tracking-widest font-bold text-cyan-500 flex flex-row items-center justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="w-5 h-0.5 bg-cyan-500" />
            POWERFUL CAPABILITIES
            <span className="w-5 h-0.5 bg-cyan-500" />
          </motion.p>
          <motion.h2
            className="text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-zinc-900 mt-4"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Engineered for <span className="text-zinc-600/30">Security & Speed</span>
          </motion.h2>
          <motion.p
            className="text-zinc-500 mt-4 text-base sm:text-lg"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover the core features that make SmartDrop the ultimate choice for secure, ephemeral file sharing.
          </motion.p>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {featuresList.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="group relative p-8 bg-white border border-zinc-200/80 shadow-sm hover:shadow-xl hover:border-cyan-500/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-cyan-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 tracking-tight group-hover:text-cyan-600 transition-colors duration-200">
                  {feature.title}
                </h3>
                <p className="mt-3 text-zinc-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-zinc-100 flex items-center justify-between text-xs font-semibold text-zinc-400 group-hover:text-cyan-500 transition-colors">
                <span>SmartDrop Core</span>
                <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
