"use client";
import React, { useState } from "react";

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
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch(`${apiUrl}/contact-us/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccessMessage("Thank you for contacting us! We will get back to you shortly.");
        setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "" }); // Reset form
      } else {
        const errorData = await response.json();
        setError(errorData.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="md:min-h-screen md:bg-gray-50 md:py-8 font-jakarta md:px-6">
      <div className="max-w-5xl mx-auto bg-white md:shadow-md md:rounded-2xl p-6">
        <div className="bg-white mx-auto flex flex-col md:flex-row">
          <div className="px-6 font-instSansB md:w-[50%]">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Get in Touch With Us.</h2>
            <p className="text-gray-600 font-instSansN mb-6">
              Our friendly team would love to hear from you.
            </p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-2 font-medium">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-2 font-medium">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-medium">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows="3"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white py-3 px-4 rounded-lg"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </form>
            {successMessage && (
              <p className="text-green-600 mt-3">{successMessage}</p>
            )}
            {error && <p className="text-red-600 mt-3">{error}</p>}
          </div>

          <div className="hidden md:block relative md:w-[50%] pr-6">
            <img
              src="/1 (2).avif"
              alt="Contact Us"
              className="object-cover object-right h-full w-full rounded-2xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUsPage;
