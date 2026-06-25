"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PortalLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({ studentId: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!formData.studentId || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("portal_auth", "true");
      router.push("/portal");
    }, 700);
  };

  return (
    <div className="min-h-screen flex font-inter bg-white">

      {/* Left Brand Panel */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-between bg-[#063f39] p-14 relative overflow-hidden">
        {/* Background texture lines */}
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "repeating-linear-gradient(0deg, #fff, #fff 1px, transparent 1px, transparent 60px), repeating-linear-gradient(90deg, #fff, #fff 1px, transparent 1px, transparent 60px)"
        }} />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center bg-white text-[#063f39] font-black text-xl font-jakarta">
            N
          </div>
          <div>
            <span className="font-jakarta font-extrabold text-white text-lg tracking-tight">NexLearn</span>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-400 font-bold">Portal</p>
          </div>
        </div>

        {/* Brand Copy */}
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-400 font-bold mb-6">Student Workspace</p>
          <h2 className="text-5xl font-extrabold font-jakarta text-white leading-tight max-w-xs">
            Your entire academic world, in one place.
          </h2>
          <p className="mt-6 text-base text-emerald-100/70 leading-relaxed max-w-xs">
            Access lectures, track progress, attend exams and manage your study materials.
          </p>
        </div>

        {/* Footer Note */}
        <div className="relative">
          <p className="text-xs text-emerald-500/60 font-medium">
            © {new Date().getFullYear()} NexLearn. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 sm:px-12 lg:px-20 bg-white">

        {/* Mobile Logo */}
        <div className="flex lg:hidden items-center gap-3 mb-12 self-start">
          <div className="flex h-9 w-9 items-center justify-center bg-[#063f39] text-white font-black font-jakarta text-lg">N</div>
          <span className="font-jakarta font-extrabold text-slate-900 text-lg tracking-tight">NexLearn Portal</span>
        </div>

        <div className="w-full max-w-sm">
          <div className="mb-10">
            <h1 className="text-3xl font-extrabold font-jakarta text-slate-900 tracking-tight">
              Sign in
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Enter your student credentials to continue.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2.5">
                Student ID
              </label>
              <input
                type="text"
                required
                className="w-full border border-slate-200 bg-[#f8faf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white placeholder:text-slate-400"
                placeholder="e.g. STU-2026-001"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
              />
            </div>

            <div>
              <label className="block font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mb-2.5">
                Password
              </label>
              <input
                type="password"
                required
                className="w-full border border-slate-200 bg-[#f8faf9] px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:bg-white placeholder:text-slate-400"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>

            {error && (
              <p className="text-xs font-semibold text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#063f39] px-4 py-3.5 text-sm font-bold text-white transition hover:bg-[#042d28] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              ) : (
                <>
                  Access Portal
                  <span className="text-emerald-400">→</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-200/60">
            <Link href="/" className="text-xs font-semibold text-slate-400 hover:text-slate-900 transition flex items-center gap-2">
              <span>←</span> Return to main website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

