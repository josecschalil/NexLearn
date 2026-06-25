"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const menuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/portal",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
        />
      </svg>
    ),
  },
  {
    id: "courses",
    label: "My Classes",
    href: "/portal/courses",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
        />
      </svg>
    ),
  },
  {
    id: "exams",
    label: "Exams",
    href: "/portal/exams",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
        />
      </svg>
    ),
  },
  {
    id: "documents",
    label: "Study Materials",
    href: "/portal/documents",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.8}
        stroke="currentColor"
        className="h-5 w-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
  },
];

const PortalShell = ({
  children,
  activeMenu = "dashboard",
  sidebarContent = null,
  sidebarWidthClass = "w-72 md:w-72",
  mobileTitle = "NexLearn",
  mobileEyebrow = "Student Portal",
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const hasCustomSidebar = Boolean(sidebarContent);

  const handleLogout = () => {
    localStorage.removeItem("portal_auth");
    router.push("/portal/login");
  };

  return (
    <div className="min-h-screen bg-[#f6f8f7] font-inter text-slate-950 lg:flex">
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex ${sidebarWidthClass} flex-col border-r border-slate-200/80 bg-white/95 shadow-[0_24px_80px_rgba(15,23,42,.12)] backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {hasCustomSidebar ? (
          sidebarContent
        ) : (
          <>
            <div className="flex items-center justify-between border-b border-slate-200/80 px-6 py-5 lg:justify-start">
              <Link href="/portal" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#063f39] text-sm font-black text-white shadow-[0_12px_24px_rgba(6,63,57,.2)]">
                  N
                </div>
                <div className="leading-tight">
                  <p className="text-[15px] font-extrabold tracking-tight text-slate-950">
                    NexLearn
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                    Student Portal
                  </p>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 lg:hidden"
                aria-label="Close menu"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Navigation
              </p>
              <div className="mt-3 space-y-1.5">
                {menuItems.map((item) => {
                  const isActive =
                    activeMenu === item.id || pathname === item.href;

                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 rounded-2xl px-3.5 py-3 text-sm transition ${
                        isActive
                          ? "bg-slate-950 text-white shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                      }`}
                    >
                      <span
                        className={
                          isActive ? "text-emerald-300" : "text-slate-400"
                        }
                      >
                        {item.icon}
                      </span>
                      <span className="font-semibold">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </nav>

            <div className="border-t border-slate-200/80 bg-[#fbfcfb] px-4 py-4">
              <div className="rounded-[1.5rem] border border-slate-200 bg-white p-3 shadow-sm">
                <div className="flex items-center gap-3 px-1">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#063f39] text-xs font-bold uppercase text-white">
                    JD
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      John Doe
                    </p>
                    <p className="truncate text-xs text-slate-500">
                      STU-2026-001
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-3 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                    />
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          </>
        )}
      </aside>

      {mobileOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/20 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                {mobileEyebrow}
              </p>
              <p className="mt-1 text-base font-semibold tracking-tight text-slate-950">
                {mobileTitle}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm"
              aria-label="Open menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </header>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
};

export default PortalShell;
