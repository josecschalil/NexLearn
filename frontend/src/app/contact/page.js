"use client";

import React, { useState } from "react";
import Footer from "../components/Footer";
import { MarketingPage, SectionHeading } from "../components/marketing/PageScaffold";
import api from "../services/api";

const contactDetails = [
  { label: "Email", value: "jeeneetpulseofficial@gmail.com" },
  { label: "Phone", value: "+91 89213 03873" },
  { label: "Response", value: "Usually within 1-2 working days" },
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
          "Thank you for contacting us. We will get back to you shortly."
        );
        setFormData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          message: "",
        });
      } else {
        setError(response.data?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MarketingPage
      eyebrow="Contact"
      title="Reach out without leaving the same calm, focused experience."
      description="Whether you have a question about courses, resources, or student access, this page now matches the home page style while keeping the existing contact form behavior intact."
      accent="orange"
      actions={[
        { href: "/courses", label: "Explore courses" },
        { href: "/about", label: "Learn about us", variant: "secondary" },
      ]}
      stats={contactDetails.map((detail) => ({
        value: detail.label,
        label: detail.value,
      }))}
      footer={<Footer />}
    >
      <section className="pt-4 sm:pt-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <SectionHeading
              eyebrow="Send a message"
              title="Tell us what you need help with."
              description="The form logic is unchanged. Only the interface has been refreshed to align with the home page."
            />

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    First name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Last name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white"
                    required
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Your message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-300 focus:bg-white"
                  rows="5"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-emerald-500 px-7 text-sm font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Send message"}
              </button>
            </form>

            {successMessage ? (
              <p className="mt-4 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                {successMessage}
              </p>
            ) : null}

            {error ? (
              <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                {error}
              </p>
            ) : null}
          </div>

          <div className="rounded-[2rem] bg-[#063f39] p-6 text-white shadow-[0_24px_60px_rgba(6,78,69,.2)] sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
              Contact details
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
              We are here to help you move forward.
            </h2>
            <p className="mt-4 text-sm leading-7 text-emerald-100/75">
              Share your question and we will route it to the right place. This
              panel mirrors the home page's bold CTA styling to keep the overall
              experience consistent.
            </p>

            <div className="mt-8 space-y-3">
              {contactDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="rounded-[1.4rem] border border-white/10 bg-white/10 px-4 py-4"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-emerald-200">
                    {detail.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white">
                    {detail.value}
                  </p>
                </div>
              ))}
            </div>

            <img
              src="/contact.jpg"
              alt="Contact us"
              className="mt-8 h-64 w-full rounded-[1.6rem] object-cover"
            />
          </div>
        </div>
      </section>
    </MarketingPage>
  );
};

export default ContactUsPage;
