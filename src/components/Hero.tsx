import { ArrowDown, ArrowRight, LockIcon, Timer, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative mt-10 grid grid-cols-1 items-center gap-8 py-16  lg:grid-cols-2 lg:gap-12  lg:py-24"
    >
      <div>
        <div>
          <p className="text-xs tracking-widest font-bold text-cyan-500 flex flex-row items-center gap-2">
            <span className="w-5 h-0.5 bg-cyan-500" />
            SMART FILE SHARING
          </p>
          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight text-zinc-900 text-shadow-lg text-shadow-black/20">
            Share it.
            <span className="text-zinc-500/40 text-shadow-none">
              {" "}
              Control it.{" "}
            </span>
            <span className="text-cyan-500 ">Drop it.</span>
          </h1>
          <p className="text-sm italic text-zinc-500 mt-10">
            Send files securely with smart, temporary links. Choose who gets
            access, control how long it stays available, and let your data
            disappear when you’re done.
          </p>
          <Link
            href="/"
            className="group mt-8 inline-flex items-center gap-2 bg-cyan-500  px-4  py-3 text-lg font-semibold text-white shadow-lg shadow-zinc-500/30 hover:-translate-y-2 hover:bg-cyan-600 active:scale-95 duration-300 transition-all ease-in-out"
          >
            Get Started{" "}
            <ArrowRight
              size={18}
              className="group-hover:transition-transform group-hover:translate-x-1"
            />
          </Link>
          <Link
            href="#how-it-works"
            className="group mt-8 ml-4 inline-flex items-center gap-2 px-4  py-3 text-lg font-semibold text-zinc-900 shadow-lg shadow-zinc-500/30 hover:-translate-y-2 hover:bg-zinc-100 active:scale-95 duration-300 transition-all ease-in-out"
          >
            How it works{" "}
            <ArrowDown
              size={20}
              className="group-hover:transition-transform group-hover:translate-y-1"
            />
          </Link>
          <div className="mt-8 flex w-full flex-row items-center gap-2 sm:gap-4">
            <div className="min-w-0 flex-1 border-r border-black/30 px-2 sm:px-4">
              <h1 className="flex items-center gap-1 text-sm font-semibold sm:gap-2 sm:text-base">
                <LockIcon size={16} className="shrink-0 sm:h-4.5 sm:w-4.5" />
                <span>Secure Sharing</span>
              </h1>

              <p className="mt-1 text-xs text-black/50 sm:text-sm">
                Protected file sharing.
              </p>
            </div>

            <div className="min-w-0 flex-1 border-r border-black/30 px-2 sm:px-4">
              <h1 className="flex items-center gap-1 text-sm font-semibold sm:gap-2 sm:text-base">
                <Zap size={16} className="shrink-0 sm:h-4.5 sm:w-4.5" />
                <span>Full Control</span>
              </h1>

              <p className="mt-1 text-xs text-black/50 sm:text-sm">
                You decide who gets access.
              </p>
            </div>

            <div className="min-w-0 flex-1 px-2 sm:px-4">
              <h1 className="flex items-center gap-1 text-sm font-semibold sm:gap-2 sm:text-base">
                <Timer size={16} className="shrink-0 sm:h-4.5 sm:w-4.5" />
                <span>Auto Expiry</span>
              </h1>

              <p className="mt-1 text-xs text-black/50 sm:text-sm">
                Links expire automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-auto md:w-175 md:h-full">
        <Image
          src="/hero.png"
          alt="Hero Image"
          priority
          width={1000}
          height={1000}
          className="w-full h-auto object-contain transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
        />
      </div>
    </section>
  );
}
