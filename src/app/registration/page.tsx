"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";

export default function RegistrationPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const contentType = response.headers.get("content-type") ?? "";
      const data = contentType.includes("application/json")
        ? await response.json()
        : { message: "The server returned an unexpected response." };
      if (!response.ok) {
        setError(data.message || "Something went wrong");
        return;
      }
      toast.success("Registration successful! Please verify your email.");
      router.push(`/verify-email?email=${encodeURIComponent(email)}`);
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("An unexpected error occurred. Please try again.");
      // setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className="mt-40 flex justify-center items-center ">
      <section className="relative grid w-full max-w-4xl overflow-hidden border border-white/10 bg-white shadow-2xl shadow-cyan-950/30 lg:grid-cols-2">
        <div className="hidden flex-col justify-between bg-linear-to-br from-cyan-500 to-blue-700 p-10 text-white lg:flex">
          <div>
            <div className="mb-16 flex items-center gap-3">
              <span className="flex h-10 w-10 border rounded-lg items-center justify-center bg-white/20 text-lg font-bold">
                S
              </span>
              <span className="text-xl tracking-tight font-bold">
                Smart<span className="text-black/70">Drop</span>
              </span>
            </div>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-100">
              Join SmartDrop
            </p>
            <h2 className="max-w-sm text-4xl font-bold leading-tight">
              Share. Protect. Disappear.
            </h2>
          </div>
          <p className="text-sm text-cyan-100 italic">
            Create an account to securely share your files and data..
          </p>
        </div>

        <div className="p-7 sm:p-10">
          <div className="mb-8 lg:hidden">
            <p className="text-xl font-bold text-cyan-600">Smart<span className="text-black/70">Drop</span></p>
          </div>
          <div className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-cyan-600">
              Get started
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Create your account
            </h1>
            <p className="mt-2 text-sm text-slate-500 italic">
              {" "}
              Join us today. It only takes a minute.
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Full name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Johnson"
                required
                className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400
                 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500
                 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your password"
                  required
                  className="w-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition 
                  placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white focus:ring-4 focus:ring-cyan-500/10"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className=" bg-red-50 px-3 py-2 text-sm text-red-600"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center  bg-cyan-500 px-4 py-3 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all
               hover:bg-cyan-600 focus:outline-none focus:ring-4 focus:ring-cyan-500/30 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none 
               active:scale-95"
            >
              {loading ? "Creating your account..." : "Create account"}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-semibold text-cyan-600 hover:text-cyan-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
