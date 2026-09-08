"use client";

import {
  Download,
  LockKeyholeIcon,
  Share2Icon,
  UploadIcon,
} from "lucide-react";

const steps = [
  {
    step: 1,
    title: "Upload your file",
    icon: <UploadIcon />,
    description:
      "Choose the file you want to share and upload it to our secure server.",
  },
  {
    step: 2,
    title: "Protect your drop",
    icon: <LockKeyholeIcon />,
    description: "Set a password and choose when your link should expire.",
  },
  {
    step: 3,
    title: "Share the link",
    icon: <Share2Icon />,
    description: "Copy your secure link and send it to anyone you trust.",
  },
  {
    step: 4,
    title: "Access & Download",
    icon: <Download />,
    description:
      "The recipient enters the password and securely downloads the file.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-8">
        {/* LEFT */}
        <div>
          <p className="flex items-center gap-2 text-xs font-bold tracking-widest text-cyan-500 m-5 ">
            <span className="h-0.5 w-5 bg-cyan-500" />
            HOW IT WORKS
          </p>

          <h1 className="text-6xl font-extrabold tracking-tight text-zinc-900   md:text-7xl lg:text-8xl">
            Three simple steps.
          </h1>

          <h1 className="text-6xl font-extrabold tracking-tight text-zinc-900/30  md:text-7xl lg:text-8xl">
            One secure{" "}
            <span className="text-cyan-500">
              drop.
            </span>
          </h1>
        </div>

        {/* RIGHT */}
        <div className="w-full">
          <div className="grid grid-cols-1">
            {steps.map((step) => (
              <div
                key={step.step}
                className="group flex gap-4 border-t border-zinc-900/10 py-7 sm:gap-6 md:py-8"
              >
                <div className="flex shrink-0 items-start gap-3 sm:gap-4">
                  <span className="pt-1 text-xs font-bold text-zinc-400 sm:text-sm">
                    {String(step.step).padStart(2, "0")}
                  </span>

                  <div className="group flex h-10 w-10 items-center justify-center text-cyan-500 transition-all duration-300 group-hover:rotate-45 sm:h-12 sm:w-12">
                    {step.icon}
                  </div>
                </div>

                <div className="min-w-0 pt-1">
                  <h3 className="text-base font-semibold text-zinc-900 sm:text-lg">
                    {step.title}
                  </h3>

                  <p className="mt-1 text-xs leading-relaxed text-zinc-500 sm:text-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
