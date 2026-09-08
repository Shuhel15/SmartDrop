"use client";

import { motion } from "framer-motion";

type DashboardContentProps = {
  name?: string | null;
  email?: string | null;
  role?: string | null;
};

export default function DashboardContent({
  name,
  email,
  role,
}: DashboardContentProps) {
  return (
    <motion.main
      className="mx-auto max-w-5xl px-6 py-32"
      initial="hidden"
      animate="visible"
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
      >
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">
          Your workspace
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-zinc-900">
          SmartDrop Dashboard
        </h1>
      </motion.div>

      <motion.div
        className="mt-8 grid gap-4 sm:grid-cols-3"
        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
      >
        {[
          ["Welcome", name ?? "SmartDrop user"],
          ["Email", email ?? "—"],
        ].map(([label, value]) => (
          <motion.div
            key={label}
            className="border border-zinc-200 bg-white p-6 shadow-sm"
            variants={{ hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -4, borderColor: "#06b6d4" }}
          >
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
              {label}
            </p>
            <p className="mt-3 truncate text-lg font-semibold text-zinc-900">
              {value}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.main>
  );
}