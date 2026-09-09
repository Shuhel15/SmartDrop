"use client";
import {
  File,
  Lock,
  Timer,
  Upload,
  X,
  ShieldCheck,
  Link as LinkIcon,
} from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, useEffect, useState } from "react";
import Loader from "@/components/loader";
import { toast } from "sonner";
import {motion} from "framer-motion";

const expiryOptions = [
  { label: "1 Hour", value: "1h" },
  { label: "6 Hours", value: "6h" },
  { label: "12 Hours", value: "12h" },
  { label: "24 Hours", value: "24h" },
  { label: "3 Days", value: "3d" },
  { label: "7 Days", value: "7d" },
];

export default function DropPage() {
  const { status } = useSession();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState("");
  const [expiry, setExpiry] = useState("24h");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    //if user is not loggedin then redirect to login page
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return <Loader />;
  }
  //if user is not logged in
  if (status === "unauthenticated") {
    return null;
  }

  const handleFile = (selectedFile: File) => {
    setFile(selectedFile);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      handleFile(selectedFile);
    }
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files?.[0];

    if (droppedFile) {
      handleFile(droppedFile);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));

    return `${(bytes / Math.pow(1024, i)).toFixed(1)} ${units[i]}`;
  };

  const handleGenerate = () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    console.log({
      file,
      password,
      expiry,
    });

    toast.error("Drop generation will be connected next.");
  };

  return (
    <main className="min-h-screen px-4 py-24 text-slate-900 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto w-full max-w-3xl"
      >
        {/* Header */}
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2  border border-cyan-500/20 bg-cyan-500/5 px-4 py-2 text-sm font-medium text-cyan-600">
            <ShieldCheck size={16} />
            Secure file sharing
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Create your drop.
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Upload a file, protect it with a password, and choose how long your
            secure link should remain available.
          </p>
        </div>

        {/* Main Card */}
        <div className="border border-slate-200 bg-white p-5 shadow-xl shadow-slate-200/50 sm:p-8">
          {/* Upload Area */}
          {!file ? (
            <label
              htmlFor="file-upload"
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              className={`group flex min-h-72 cursor-pointer flex-col items-center justify-center border-2 border-dashed px-6 text-center transition-all duration-300 ${
                isDragging
                  ? "border-cyan-500 bg-cyan-500/5"
                  : "border-slate-200 hover:border-cyan-400 hover:bg-slate-50"
              }`}
            >
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="mb-5 flex h-16 w-16 items-center justify-cente text-cyan-500 transition-transform duration-300 group-hover:-translate-y-1">
                <Upload size={30} strokeWidth={1.8} />
              </div>

              <h2 className="text-lg font-semibold">Drop your file here</h2>

              <p className="mt-2 text-sm text-slate-500">
                or{" "}
                <span className="font-semibold text-cyan-600">
                  browse files
                </span>
              </p>

              <p className="mt-5 text-xs text-slate-400">
                Upload one file • Maximum size 100MB
              </p>
            </label>
          ) : (
            /* Selected File */
            <div className="border border-cyan-500/20 bg-cyan-500/5 p-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-500">
                  <File size={24} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{file.name}</p>

                  <p className="mt-1 text-sm text-slate-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={removeFile}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-red-50 hover:text-red-500"
                  aria-label="Remove file"
                >
                  <X size={19} />
                </button>
              </div>
            </div>
          )}

          {/* Options */}
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 flex items-center gap-2 text-sm font-semibold"
              >
                <Lock size={16} className="text-cyan-500" />
                Password
              </label>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter a password"
                className="h-12 w-full border border-slate-200 bg-white px-4 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10"
              />

              <p className="mt-2 text-xs text-slate-400">
                Protect your file with a password.
              </p>
            </div>

            {/* Expiry */}
            <div>
              <label
                htmlFor="expiry"
                className="mb-2 flex items-center gap-2 text-sm font-semibold"
              >
                <Timer size={16} className="text-cyan-500" />
                Link expires
              </label>

              <select
                id="expiry"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="h-12 w-full border border-slate-200 bg-white px-4 text-sm outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10"
              >
                {expiryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              <p className="mt-2 text-xs text-slate-400">
                Your link becomes unavailable after this time.
              </p>
            </div>
          </div>

          {/* Generate Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={!file}
            className="group relative mt-8 flex h-13 w-full items-center justify-center gap-2 overflow-hidden bg-cyan-500 px-6 font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:bg-cyan-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            <span className="absolute inset-0 origin-bottom scale-y-0 bg-cyan-500 transition-transform duration-300 group-hover:scale-y-100" />

            <span className="group relative z-10 flex items-center gap-2">
              <LinkIcon
                size={18}
                className="group-hover:transition-transform group-hover:rotate-45 duration-300"
              />
              Generate Secure Link
            </span>
          </button>

          {/* Bottom Info */}
          <div className="mt-5 flex items-center justify-center gap-2 text-xs text-slate-400">
            <ShieldCheck size={14} />
            Your files are protected with SmartDrop.
          </div>
        </div>
      </motion.div>
    </main>
  );
}
