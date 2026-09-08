"use client";

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

export default function WhySmartDrop() {
  return (
    <section
      id="why-smartdrop"
      className="mt-16 sm:mt-20 lg:mt-24"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <p className="inline-flex items-center gap-3 text-xs font-bold tracking-[0.25em] text-cyan-500">
            <span className="h-px w-6 bg-cyan-500" />
            WHY SMARTDROP
            <span className="h-px w-6 bg-cyan-500" />
          </p>

          <h2 className="mx-auto mt-5 max-w-5xl text-4xl font-extrabold leading-[1.05] tracking-tight text-zinc-900 sm:text-5xl md:text-6xl lg:text-7xl">
            Sharing files shouldn&apos;t mean{" "}
            <span className="text-cyan-500">losing control.</span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base">
            Simple file sharing with the privacy, security, and control you
            need.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden py-6 sm:py-7 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute left-0 top-0 h-px w-0 bg-cyan-500 transition-all duration-500 group-hover:w-full" />

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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}