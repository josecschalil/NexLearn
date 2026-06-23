"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "gsap";
import { toast } from "sonner";
import useAuthentication from "@/hooks/useAuthentication";

const navLinks = [
  ["Home", "/"],
  ["Portal", "/student-portal"],
  ["Courses", "/courses"],
  ["Resources", "/featured"],
  ["About", "/about"],
  ["Contact", "/contact"],
];

const isActiveRoute = (pathname, href) => {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
};

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isAuthenticated, userDetails } = useAuthentication();

  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(true);

  const navbarRef = useRef(null);
  const menuRef = useRef(null);
  const accountRef = useRef(null);

  const isHomePage = pathname === "/";

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  const isTestPage =
    pathname.startsWith("/tests/custom/exams/") ||
    pathname.startsWith("/tests/proctored/exams/");

  useEffect(() => {
    const context = gsap.context(() => {
      gsap.from(navbarRef.current, {
        y: -22,
        opacity: 0,
        duration: 0.65,
        ease: "power3.out",
      });
    });

    return () => context.revert();
  }, []);

  useEffect(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      gsap.fromTo(
        menuRef.current,
        { opacity: 0, y: -10, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.22, ease: "power3.out" },
      );
    }
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProfileRedirect = () => {
    const userId = localStorage.getItem("user_id");

    if (userId) {
      router.push(`/profile/${userId}`);
    } else {
      toast.error("Log in to access your Profile.");
    }

    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    window.location.replace("/");
  };

  if (isTestPage) return null;

  return (
    <>
      <nav
        ref={navbarRef}
        className={`sticky top-0 z-50 font-inter transition-all duration-300 ease-in-out ${
          isHomePage && !isScrolled && !menuOpen
            ? "border-b border-white/0 bg-white/0 shadow-none backdrop-blur-none"
            : "border-b border-white/70 bg-white/75 shadow-[0_1px_0_rgba(15,23,42,.04)] backdrop-blur-2xl"
        }`}
      >
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[auto_auto] items-center gap-4 px-5 sm:px-8 md:grid-cols-[auto_1fr] lg:grid-cols-[auto_1fr_auto]">
          <Link
            href="/"
            className="flex shrink-0 items-center"
            aria-label="JeeNeetPulse home"
          >
            <img
              src="/logo.svg"
              className="h-4 w-auto sm:h-[px]"
              alt="JeeNeetPulse"
            />
          </Link>

          <div className="hidden min-w-0 justify-center md:flex">
            <div className="flex max-w-full items-center px-5 py-2 rounded-full border border-slate-200/75 bg-white/90 p-1 shadow-[0_10px_30px_rgba(15,23,42,.06)] backdrop-blur-xl">
              {navLinks.map(([text, href]) => {
                const active = isActiveRoute(pathname, href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12px] font-semibold transition xl:px-3.5 xl:py-2 xl:text-[13px] ${
                      active
                        ? "bg-slate-950 text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                    }`}
                  >
                    {text}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {!isAuthenticated ? (
              <>
                <Link
                  href="/signin"
                  className="rounded-full px-3.5 py-2 text-sm font-semibold text-slate-700 transition hover:bg-white hover:text-slate-950"
                >
                  Sign in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white  transition hover:-translate-y-0.5 hover:bg-orange-600 xl:px-5 xl:py-2.5"
                >
                  <span className="hidden xl:inline">Get started</span>
                  <span className="xl:hidden">Start</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </>
            ) : (
              <div ref={accountRef} className="relative">
                <button
                  type="button"
                  onClick={() => setDropdownOpen((open) => !open)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/90 py-1.5 pl-2 pr-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-emerald-200 hover:bg-emerald-50/50"
                  aria-expanded={dropdownOpen}
                  aria-haspopup="menu"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-700 text-xs font-bold uppercase text-white">
                    {userDetails?.name?.charAt(0) || "J"}
                  </span>
                  <span className="max-w-32 truncate">
                    {userDetails?.name || "Student"}
                  </span>
                  <svg
                    viewBox="0 0 20 20"
                    fill="none"
                    className={`h-4 w-4 text-slate-500 transition ${dropdownOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  >
                    <path
                      d="m5 8 5 5 5-5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div
                    className="absolute right-0 mt-3 w-56 overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-[0_22px_60px_rgba(15,23,42,.16)]"
                    role="menu"
                  >
                    <button
                      type="button"
                      onClick={handleProfileRedirect}
                      className="flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Profile <span className="text-slate-300">→</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-1 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Sign out <span className="text-red-200">→</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-11 w-11 justify-self-end items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:bg-slate-50 md:hidden"
          >
            <span className="sr-only">Menu</span>
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "translate-y-[7px] rotate-45" : ""}`}
              />
              <span
                className={`absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute left-0 top-[14px] h-0.5 w-5 rounded-full bg-current transition ${menuOpen ? "-translate-y-[7px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      {menuOpen && (
        <div className="fixed inset-x-0 top-16 z-40 px-4 md:hidden">
          <div
            ref={menuRef}
            className="mx-auto max-w-7xl overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/95 p-3 font-inter shadow-[0_24px_70px_rgba(15,23,42,.18)] backdrop-blur-2xl"
          >
            <div className="mb-2 rounded-3xl bg-gradient-to-br from-emerald-50 to-orange-50 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-800">
                JeeNeetPulse
              </p>
              <p className="mt-1 text-sm font-medium text-slate-600">
                Your lessons, practice, and progress in one focused workspace.
              </p>
            </div>
            <div className="grid gap-1">
              {navLinks.map(([text, href]) => {
                const active = isActiveRoute(pathname, href);

                return (
                  <Link
                    key={href}
                    href={href}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                      active
                        ? "bg-emerald-50 text-emerald-800"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {text}
                    <span className="text-slate-300">→</span>
                  </Link>
                );
              })}
            </div>

            <div className="mt-3 border-t border-slate-100 pt-3">
              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-2">
                  <Link
                    href="/signin"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 text-sm font-semibold text-slate-800"
                  >
                    Sign in
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-orange-500 text-sm font-semibold text-white"
                  >
                    Get started
                  </Link>
                </div>
              ) : (
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={handleProfileRedirect}
                    className="inline-flex min-h-11 items-center justify-center rounded-full bg-emerald-700 text-sm font-semibold text-white"
                  >
                    Open profile
                  </button>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-red-100 bg-red-50 text-sm font-semibold text-red-600"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
