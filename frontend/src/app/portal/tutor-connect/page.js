"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PortalShell from "../components/PortalShell";

const queryThreads = [
  {
    id: 1,
    course: "JEE Advanced 2025 Physics",
    topic: "Rotational mechanics doubt",
    status: "Active",
    updatedAt: "Today, 6:10 PM",
    messages: [
      {
        id: "m1",
        sender: "student",
        text: "I am getting stuck while identifying the correct axis in parallel axis theorem problems.",
        time: "6:00 PM",
      },
      {
        id: "m2",
        sender: "tutor",
        text: "Start from the center of mass axis first. Once that base inertia is clear, then shift to the required axis in the question.",
        time: "6:05 PM",
      },
      {
        id: "m3",
        sender: "student",
        text: "Should I always draw the body and mark the COM before solving?",
        time: "6:07 PM",
      },
    ],
  },
  {
    id: 2,
    course: "NEET Biology Masterclass",
    topic: "Revision planning",
    status: "Closed",
    updatedAt: "2 days ago",
    messages: [
      {
        id: "m4",
        sender: "student",
        text: "Can you suggest how to revise human physiology within three days before the mock test?",
        time: "4:10 PM",
      },
      {
        id: "m5",
        sender: "tutor",
        text: "Revise diagrams first, then NCERT lines, and keep one mixed question set for the end of each day.",
        time: "4:25 PM",
      },
    ],
  },
  {
    id: 3,
    course: "JEE Main Chemistry Crash Course",
    topic: "Organic chemistry backlog",
    status: "Closed",
    updatedAt: "5 days ago",
    messages: [
      {
        id: "m6",
        sender: "student",
        text: "I need help on how to catch up with reaction mechanisms before the weekend test.",
        time: "8:15 PM",
      },
      {
        id: "m7",
        sender: "tutor",
        text: "Finish named reactions first, then map mechanism families together instead of reading each chapter in isolation.",
        time: "8:32 PM",
      },
    ],
  },
];

export default function PortalTutorConnectPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [selectedThreadId, setSelectedThreadId] = useState(1);
  const [draftMessage, setDraftMessage] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("portal_auth")) {
      router.push("/portal/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  const selectedThread = useMemo(
    () =>
      queryThreads.find((thread) => thread.id === selectedThreadId) ||
      queryThreads[0],
    [selectedThreadId]
  );

  const activeThread = useMemo(
    () => queryThreads.find((thread) => thread.status === "Active") || queryThreads[0],
    []
  );

  const archivedThreads = useMemo(
    () => queryThreads.filter((thread) => thread.status === "Closed"),
    []
  );

  if (loading) return null;

  return (
    <PortalShell activeMenu="tutorconnect">
      <div className="min-h-screen bg-[#f6f8f7]">
        <div className="border-b border-slate-200/60 bg-[#f8faf9]/60 px-5 py-8 sm:px-8 lg:py-10">
          <div className="mx-auto max-w-6xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              Tutor Connect
            </p>
            <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 font-jakarta md:text-5xl">
                  Direct support with your course tutor.
                </h1>
                <p className="mt-3 text-base leading-relaxed text-slate-500">
                  Keep one active query open like a chat, and revisit earlier
                  resolved conversations from the archive.
                </p>
              </div>
              <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                1 active / {archivedThreads.length} archived
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto grid max-w-6xl gap-6 px-5 py-6 sm:px-8 sm:py-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <section className="flex h-[calc(100vh-13rem)] min-h-[560px] flex-col overflow-hidden rounded-[1.9rem] border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 sm:px-6 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {selectedThread.status === "Active" ? "Active query" : "Archived query"}
                </p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {selectedThread.topic}
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  {selectedThread.course} / Updated {selectedThread.updatedAt}
                </p>
              </div>

              {selectedThread.status === "Active" ? (
                <button
                  type="button"
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Close query
                </button>
              ) : (
                <span className="inline-flex min-h-11 items-center justify-center rounded-full bg-slate-100 px-4 text-sm font-semibold text-slate-500">
                  Closed
                </span>
              )}
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto bg-[#fbfcfb] px-5 py-4 sm:px-6 sm:py-5">
              {selectedThread.messages.map((message) => {
                const isStudent = message.sender === "student";

                return (
                  <div
                    key={message.id}
                    className={`flex ${isStudent ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[82%] rounded-[1.2rem] px-3.5 py-2.5 text-sm leading-5 shadow-sm sm:max-w-[68%] ${
                        isStudent
                          ? "rounded-br-md border border-[#d7e6df] bg-[#edf4f1] text-slate-700"
                          : "rounded-bl-md border border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      <p>{message.text}</p>
                      <p
                        className={`mt-2 text-[11px] ${
                          isStudent ? "text-slate-400" : "text-slate-400"
                        }`}
                      >
                        {message.time}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-100 bg-white px-5 py-5 sm:px-6">
              <div className="rounded-[1.3rem] border border-slate-200 bg-[#fcfcfb] p-3">
                <textarea
                  value={draftMessage}
                  onChange={(event) => setDraftMessage(event.target.value)}
                  rows={2}
                  placeholder={
                    selectedThread.status === "Active"
                      ? "Type your follow-up message to the tutor..."
                      : "Closed queries are view-only."
                  }
                  disabled={selectedThread.status !== "Active"}
                  className="w-full resize-none bg-transparent text-sm leading-5 text-slate-700 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed disabled:text-slate-400"
                />
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-200 pt-3">
                  <p className="text-xs text-slate-400">
                    {selectedThread.status === "Active"
                      ? "Replies stay attached to this query thread."
                      : "This query is already resolved and kept in archive."}
                  </p>
                  <button
                    type="button"
                    disabled={selectedThread.status !== "Active"}
                    className="inline-flex min-h-10 items-center justify-center rounded-full bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </section>

          <aside className="rounded-[1.9rem] border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="border-b border-slate-100 pb-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                Archive
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                Past queries
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Open any earlier concern and review it in the same chat layout.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedThreadId(activeThread.id)}
              className={`mt-5 w-full rounded-[1.3rem] border p-4 text-left transition ${
                selectedThread.id === activeThread.id
                  ? "border-slate-900 bg-slate-950 text-white"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                      selectedThread.id === activeThread.id
                        ? "text-slate-300"
                        : "text-slate-400"
                    }`}
                  >
                    Current conversation
                  </p>
                  <h3 className="mt-2 text-base font-semibold leading-6">
                    {activeThread.topic}
                  </h3>
                </div>
                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                    selectedThread.id === activeThread.id
                      ? "bg-white/10 text-white"
                      : "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100"
                  }`}
                >
                  Active
                </span>
              </div>
            </button>

            <div className="mt-5 space-y-3">
              {archivedThreads.map((thread) => {
                const isSelected = thread.id === selectedThread.id;

                return (
                  <button
                    key={thread.id}
                    type="button"
                    onClick={() => setSelectedThreadId(thread.id)}
                    className={`w-full rounded-[1.3rem] border p-4 text-left transition ${
                      isSelected
                        ? "border-slate-900 bg-slate-950 text-white"
                        : "border-slate-200 bg-[#fcfcfb] hover:border-slate-300 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p
                          className={`text-[10px] font-semibold uppercase tracking-[0.16em] ${
                            isSelected ? "text-slate-300" : "text-slate-400"
                          }`}
                        >
                          {thread.course}
                        </p>
                        <h3 className="mt-2 text-base font-semibold leading-6">
                          {thread.topic}
                        </h3>
                      </div>
                      <span
                        className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                          isSelected
                            ? "bg-white/10 text-white"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {thread.status}
                      </span>
                    </div>
                    <p
                      className={`mt-3 text-xs ${
                        isSelected ? "text-slate-300" : "text-slate-400"
                      }`}
                    >
                      {thread.updatedAt}
                    </p>
                  </button>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    </PortalShell>
  );
}
