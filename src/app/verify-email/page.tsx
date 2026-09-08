"use client";
import { FormEvent, Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { motion } from "framer-motion";

function VerifyEmailForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  //Countdown timer for resend button
  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  async function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("Email is missing");
      return;
    }

    if (otp.length !== 6) {
      setError("OTP must be 6 digits");
      return;
    }
    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Invalid OTP. Please try again.");
        // setError(data.message || "Invalid OTP.Please try again");
        return;
      }
      toast.success("Email verified successfully! Redirecting to login...");
      // setMessage("Email verified successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } catch (error) {
      console.error("Error during email verification:", error);
      toast.error("An unexpected error occurred. Please try again.");
      // setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleResendOtp() {
    if (!email) {
      setError("Email is missing");
      return;
    }

    setError("");
    setMessage("");
    setResendLoading(true);

    try {
      const response = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to resend OTP. Please try again.");
        // setError(data.message || "Failed to resend OTP. Please try again.");
        return;
      }
      toast("New OTP has been sent to your email (inbox or spam).");
      // setMessage("New OTP has been sent to your email (inbox or spam).");
      setCountdown(60); // Start 60 seconds countdown for resend button
    } catch (error) {
      console.error("Error during OTP resend:", error);
      toast.error("An unexpected error occurred. Please try again.");
      // setError("An unexpected error occurred. Please try again.");
    } finally {
      setResendLoading(false);
    }
  }
  return (
    <motion.main className="flex min-h-screen items-center justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <motion.div className="w-full max-w-md border p-6" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}>
        <h1 className="mb-2 text-3xl font-bold">Verify your email</h1>

        <p className="mb-6 text-gray-500">
          We sent a 6-digit OTP to <span className="font-bold">{email}</span>
        </p>

        <form onSubmit={handleVerify} className="space-y-4">
          <div>
            <label className="mb-1 block">Enter OTP</label>

            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              placeholder="123456"
              className="w-full border border-gray-300 p-3 text-center text-2xl tracking-[0.5em]"
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          {message && <p className="text-sm text-green-500">{message}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 p-3 text-white disabled:bg-gray-400 active:scale-95 transition-transform"
          >
            {loading ? "Verifying..." : "Verify Email"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="mb-2 text-sm text-gray-500">
            Didn&apos;t receive the OTP?
          </p>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={resendLoading || countdown > 0}
            className="text-cyan-500 disabled:text-gray-400 active:scale-95 transition-transform"
          >
            {resendLoading
              ? "Sending..."
              : countdown > 0
                ? `Resend OTP in ${countdown}s`
                : "Resend OTP"}
          </button>
        </div>
      </motion.div>
    </motion.main>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md border p-6 text-center text-gray-500">
            Loading verification…
          </div>
        </main>
      }
    >
      <VerifyEmailForm />
    </Suspense>
  );
}
