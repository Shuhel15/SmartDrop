"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password. Please try again.");
        return;
      }

      toast.success("Login successful!");
      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.main className="mt-40 flex justify-center items-center " initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      
      <motion.section className="relative grid w-full max-w-4xl overflow-hidden border border-white/10 bg-white shadow-2xl shadow-cyan-950/30 lg:grid-cols-2" initial={{ opacity: 0, y: 28, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
        <div className="hidden flex-col justify-between bg-linear-to-br from-cyan-500 to-blue-700 p-10 text-white lg:flex">
          
          <div>
            <div className="mb-16 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center border rounded-lg justify-center bg-white/20 text-lg font-bold">
                S
              </span>
              <span className="text-xl font-bold">
                Smart<span className="text-black/70">Drop</span>
              </span>
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">
              Welcome back
            </p>
            <h2 className="max-w-sm text-4xl font-bold leading-tight">
              Your files. Your links. Your control.
            </h2>
          </div>
          <p className="text-sm text-cyan-100 italic">
            Share what matters with secure, temporary links that give you
            complete control.
          </p>
        </div>

        <div className="p-7 sm:p-10">
          <div className="mb-8 lg:hidden">
            <p className="text-xl font-bold text-cyan-600">Smart<span className="text-black/70">Drop</span></p>
          </div>
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-600">
              Sign in
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-slate-500 italic">
              Sign in to manage your drops and securely share your files and
              data.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center bg-cyan-500 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 
            disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none active:scale-95 duration-200 transition-all"
            >
              {loading ? "Signing you in..." : "Sign in"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/registration"
              className="font-semibold text-cyan-600 hover:text-cyan-700"
            >
              Create one
            </Link>
          </p>
        </div>
      </motion.section>
    </motion.main>
  );
}
