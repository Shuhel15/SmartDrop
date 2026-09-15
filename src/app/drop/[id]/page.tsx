"use client";

import {
  AlertCircle,
  CheckCircle2,
  Download,
  Eye,
  File,
  Lock,
  ShieldCheck,
  Timer,
} from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loader from "@/components/loader";

type Drop = {
  dropId: string;
  fileName: string;
  fileSize: number;
  expiresAt: string;
  createdAt: string;
};

function formatFileSize(bytes: number) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function getTimeRemaining(expiresAt: string) {
  const difference = new Date(expiresAt).getTime() - Date.now();

  if (difference <= 0) {
    return "Expired";
  }

  const hours = Math.floor(difference / (1000 * 60 * 60));

  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) {
    return `${hours}h ${minutes}m remaining`;
  }

  return `${minutes}m remaining`;
}

export default function DropPage() {
  const params = useParams();
  const dropId = params.id as string;
  const [drop, setDrop] = useState<Drop | null>(null);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState("");
  const [attemptsRemaining, setAttemptsRemaining] = useState<number | null>(
    null,
  );

  useEffect(() => {
    async function fetchDrop() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/auth/drop/${dropId}`);

        const data = await response.json();

        if (!response.ok) {
          setError(data.message || "Drop not found.");
          return;
        }

        setDrop(data.drop);
      } catch (error) {
        console.error("Error fetching drop:", error);

        setError("Unable to load this drop.");
      } finally {
        setLoading(false);
      }
    }

    if (dropId) {
      fetchDrop();
    }
  }, [dropId]);

  async function handleUnlock() {
    if (!password.trim()) {
      setError("Please enter the password.");
      return;
    }

    try {
      setVerifying(true);
      setError("");

      const response = await fetch(`/api/auth/drop/${dropId}/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Incorrect password.");

        if (typeof data.attemptsRemaining === "number") {
          setAttemptsRemaining(data.attemptsRemaining);
        }

        return;
      }

      setUnlocked(true);
      setAttemptsRemaining(null);
    } catch (error) {
      console.error("Error verifying password:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setVerifying(false);
    }
  }

  if (loading) {
    return <Loader />;
  }

  if (error && !drop) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md border border-slate-200 bg-white p-8 text-center shadow-xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center bg-red-500/10 text-red-500">
            <AlertCircle size={28} />
          </div>

          <h1 className="text-2xl font-bold text-slate-900">
            Drop unavailable
          </h1>

          <p className="mt-2 text-sm text-slate-500">{error}</p>
        </div>
      </main>
    );
  }

  if (!drop) {
    return null;
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden  px-4 py-24">
      <div className="relative w-full max-w-2xl">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-cyan-500/10 text-cyan-500">
            <ShieldCheck size={30} />
          </div>

          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-600">
            SmartDrop
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Secure Drop
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Someone shared a protected file with you.
          </p>
        </div>
        <div className="border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-200/50 sm:p-8">
          {!unlocked ? (
            <>
              <div className="mb-7 flex items-center gap-4 border border-slate-200 bg-slate-50 p-5">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-cyan-500/10 text-cyan-500">
                  <File size={24} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-slate-900">
                    {drop.fileName}
                  </p>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span>{formatFileSize(drop.fileSize)}</span>

                    <span className="h-1 w-1 rounded-full bg-slate-300" />

                    <span className="flex items-center gap-1">
                      <Timer size={13} />
                      {getTimeRemaining(drop.expiresAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-800"
                >
                  <Lock size={16} className="text-cyan-500" />
                  Enter password
                </label>

                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnlock();
                    }
                  }}
                  placeholder="Enter the password"
                  disabled={verifying}
                  className="h-12 w-full border border-slate-200 bg-white px-4 text-sm outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10 disabled:bg-slate-100"
                />

                {error && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-red-500">
                    <AlertCircle size={16} />

                    <span>{error}</span>
                  </div>
                )}

                {attemptsRemaining !== null && (
                  <p className="mt-2 text-xs text-slate-400">
                    {attemptsRemaining} attempts remaining
                  </p>
                )}
              </div>

              <button
                type="button"
                onClick={handleUnlock}
                disabled={verifying}
                className="mt-6 flex h-12 w-full items-center justify-center gap-2 bg-cyan-500 font-semibold text-white shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-400 active:scale-95 duration-200"
              >
                <Lock size={18} />

                {verifying ? "Verifying..." : "Unlock File"}
              </button>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                <ShieldCheck size={14} />
                Password protected by SmartDrop
              </div>
            </>
          ) : (
            <>
              <div className="mb-7 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center bg-green-500/10 text-green-500">
                  <CheckCircle2 size={30} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Access granted
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  You can now view or download this file.
                </p>
              </div>

              <div className="border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-cyan-500/10 text-cyan-500">
                    <File size={24} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900">
                      {drop.fileName}
                    </p>

                    <p className="mt-1 text-sm text-slate-400">
                      {formatFileSize(drop.fileSize)}
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => {
                      window.open(`/api/auth/drop/${dropId}/file`, "_blank");
                    }}
                    className="flex h-11 items-center justify-center gap-2 border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition-all hover:border-cyan-500 hover:text-cyan-600 active:scale-95 duration-200"
                  >
                    <Eye size={17} />
                    View File
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      window.open(
                        `/api/auth/drop/${dropId}/file?download=true`,
                        "_blank",
                      );
                    }}
                    className="group flex h-11 items-center justify-center gap-2 bg-cyan-500 text-sm font-semibold text-white transition-all hover:bg-cyan-600 active:scale-95 duration-200"
                  >
                    <Download
                      size={17}
                      className="group-hover:transition-transform group-hover:translate-y-1 duration-200"
                    />
                    Download
                  </button>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Timer size={14} />

                {getTimeRemaining(drop.expiresAt)}
              </div>
            </>
          )}
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Securely shared with SmartDrop
        </p>
      </div>
    </main>
  );
}
