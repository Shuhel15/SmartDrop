"use client";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  GraduationCap,
  Users,
} from "lucide-react";
import Image from "next/image";

const useCases = [
  {
    number: "01",
    title: "Work",
    description: "Share documents with your team.",
    icon: BriefcaseBusiness,
    featured: true,
  },
  {
    number: "02",
    title: "Students",
    description: "Share assignments and projects.",
    icon: GraduationCap,
  },
  {
    number: "03",
    title: "Developers",
    description: "Share builds, assets and files.",
    icon: Code2,
  },
  {
    number: "04",
    title: "Personal",
    description: "Send private files to friends.",
    icon: Users,
    wide: true,
  },
];

export default function UseCases() {
  return (
    <section className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-14 flex flex-col justify-between gap-8 lg:mb-16 lg:flex-row lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-10 bg-cyan-500" />

              <span className="text-sm font-bold uppercase tracking-wide text-cyan-500">
                Use Cases
              </span>
            </div>

            <h2 className="max-w-3xl text-5xl font-extrabold tracking-[-0.045em]  sm:text-7xl lg:text-8xl">
              Built for{" "}
              <span className="text-zinc-600/30">everyday sharing.</span>
            </h2>
          </div>

          <p className="max-w-md text-sm leading-7 text-slate-500 lg:text-right">
            Whether you&apos;re working with a team, building a project, or sending
            something to a friend — sharing should stay simple.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">

          <div className="grid grid-cols-2 border-l border-t border-slate-200">

            {useCases.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.number}
                  className={`
                    group relative overflow-hidden border-b border-r border-slate-200
                    bg-white transition-all duration-500
                    hover:bg-cyan-200
                    ${item.featured ? "col-span-2 min-h-70" : "min-h-57.5"}
                    ${item.wide ? "col-span-2 min-h-47.5" : ""}
                  `}
                >
                  {/* Cyan hover indicator */}
                  <div className="absolute left-0 top-0 h-0 w-1 bg-cyan-500 transition-all duration-500 group-hover:h-full" />

                  {/* Number */}
                  <span className="absolute right-6 top-5 text-xs font-medium tracking-[0.2em] text-slate-300 transition-colors duration-500 group-hover:text-slate-600">
                    {item.number}
                  </span>

                  <div className="relative flex h-full flex-col justify-between p-7 sm:p-8">

                    {/* Icon */}
                    <div className="flex h-11 w-11 items-center justify-center border border-slate-200 transition-all duration-500 group-hover:border-cyan-500 group-hover:bg-cyan-500">
                      <Icon
                        size={20}
                        strokeWidth={1.7}
                        className="text-cyan-500 transition-colors duration-500 group-hover:text-white"
                      />
                    </div>

                    {/* Content */}
                    <div className="mt-12">
                      <div className="flex items-end justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight  transition-colors duration-500 group-hover:text-white sm:text-3xl">
                            {item.title}
                          </h3>

                          <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500 transition-colors duration-500 group-hover:text-slate-400">
                            {item.description}
                          </p>
                        </div>

                        {/* Arrow */}
                        <div className="mb-1 shrink-0 opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100">
                          <ArrowUpRight
                            size={22}
                            strokeWidth={1.6}
                            className="text-cyan-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Background number */}
                  <span className="pointer-events-none absolute -bottom-8 -right-2 text-[110px] font-bold leading-none text-slate-100 transition-colors duration-500 group-hover:text-slate-900">
                    {item.number}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Right — Image */}
          <div className="relative min-h-130 overflow-hidden border border-slate-200 lg:min-h-full">

            {/* Image */}
            <Image
              src="/usecase.png"
              width={800}
              height={800}
              quality={100}
              priority
              alt="File sharing"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-[1.02]"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-slate-950/30 via-transparent to-transparent" />

            {/* Cyan corner */}
            <div className="absolute left-0 top-0 h-20 w-1 bg-cyan-500" />

            {/* Image label */}
            <div className="absolute bottom-6 left-6 flex items-center gap-3 border border-white/30 bg-slate-950/70 px-4 py-3 backdrop-blur-md">
              <span className="h-2 w-2 bg-cyan-500" />

              <span className="text-xs font-medium uppercase tracking-[0.16em] text-white">
                Share without limits
              </span>
            </div>
          </div>
        </div>

        {/* Bottom line */}
        <div className="mt-12 flex flex-col gap-4 border-t border-slate-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
            One simple link. Multiple possibilities.
          </p>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-500">
            <span className="h-1.5 w-1.5 bg-cyan-500" />
            Made for everyday sharing
          </div>
        </div>
      </div>
    </section>
  );
}

