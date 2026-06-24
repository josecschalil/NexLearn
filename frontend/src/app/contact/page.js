"use client";

import React, { useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import api from "../services/api";

const contactDetails = [
  { label: "Email", value: "jeeneetpulseofficial@gmail.com" },
  { label: "Phone", value: "+91 89213 03873" },
  { label: "Response Window", value: "Usually within 1-2 working days" },
];

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await api.post("/contact-us/", formData);

      if (response.status === 200) {
        setSuccessMessage(
          "Thank you for contacting us. We will get back to you shortly.",
        );
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        setError(
          response.data?.error || "Something went wrong. Please try again.",
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-white font-inter text-slate-950">
      {/* Main Content Layout (Form + Details) */}
      <section className="bg-[#f8faf9] px-5 py-10 sm:px-8 sm:py-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr] lg:gap-x-16 lg:gap-y-8 lg:items-start">
            {/* Left: Custom Form Panel */}
            <div className="rounded-2xl border border-slate-200/60 bg-white p-6 shadow-sm sm:p-10 order-2 lg:order-1 lg:col-span-1 lg:row-span-2 lg:col-start-1 lg:row-start-1">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold">
                  [ INQUIRY FORM ]
                </span>
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-950 font-jakarta">
                  Send a message
                </h2>
                <p className="mt-2 text-sm text-slate-500">
                  Fill in the fields below. A coordinator will get back to you
                  shortly.
                </p>
              </div>

              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-500">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-500">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-500">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-500">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-xs font-mono uppercase tracking-wider text-slate-500">
                    Your Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
                    rows="5"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center rounded-lg bg-orange-500 px-8 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-75 shadow-lg shadow-orange-500/10"
                  disabled={loading}
                >
                  {loading ? "Submitting inquiry..." : "Send message"}
                </button>
              </form>

              {successMessage ? (
                <div className="mt-6 rounded-lg bg-emerald-50 border border-emerald-100 px-4 py-3.5 text-sm font-medium text-emerald-800">
                  {successMessage}
                </div>
              ) : null}

              {error ? (
                <div className="mt-6 rounded-lg bg-red-50 border border-red-100 px-4 py-3.5 text-sm font-medium text-red-700">
                  {error}
                </div>
              ) : null}
            </div>

            {/* Right: Bespoke Support Guidelines (Flat Grid Child) */}
            <div className="rounded-2xl border border-slate-200/60 bg-white p-6 sm:p-8 order-3 lg:order-2 lg:col-span-1 lg:col-start-2 lg:row-start-1">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-700 font-bold block mb-4">
                [ SUPPORT GUIDELINES ]
              </span>

              <h3 className="text-xl font-bold tracking-tight text-slate-950 font-jakarta">
                Direct academic lines.
              </h3>

              <div className="mt-6 space-y-6 text-sm text-slate-600 leading-relaxed">
                <div>
                  <h4 className="font-semibold text-slate-950 mb-1">
                    Direct Contact
                  </h4>
                  <p>
                    You speak directly to academic coordinators and technical
                    developers. We do not use third-party call centers or
                    automatic chat proxies.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h4 className="font-semibold text-slate-950 mb-1">
                    Academic Consultations
                  </h4>
                  <p>
                    Shiv Narayan Vishnoi reviews syllabus questions and student
                    trajectory problems every Thursday. Indicate if you need
                    academic feedback.
                  </p>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <h4 className="font-semibold text-slate-950 mb-1">
                    Institutional Location
                  </h4>
                  <p>NexLearn Office, Rajasthan, India.</p>
                </div>
              </div>
            </div>

            {/* Right: Framed Editorial Image (Flat Grid Child) */}
            <div className="relative h-72 w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm order-1 lg:order-3 lg:col-span-1 lg:col-start-2 lg:row-start-2">
              <img
                src="/contact.jpg"
                alt="NexLearn Contact"
                className="h-full w-full object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-[#063f39]/5 mix-blend-multiply" />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContactUsPage;
