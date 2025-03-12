"use client";
import React, { useState } from "react";
import api from "../services/api";
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
      const response = await api.post(`/contact-us/`, formData); // Changed to api.post()
  
      if (response.status === 200) { // Check if the status code is 200
        setSuccessMessage("Thank you for contacting us! We will get back to you shortly.");
        setFormData({ firstName: "", lastName: "", phone: "", email: "", message: "" }); // Reset form
      } else {
        const errorData = response.data;
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
          <div className="sm:px-6 font-instSansB md:w-[50%]">
            <h2 className="max-xs:text-lg text-2xl font-bold font-inter text-gray-800 mb-2">Get in Touch With Us</h2>
            <hr className="mt-2 md:hidden -mr-[40vw] mb-6 md:mb-8"></hr>
            <p className="text-gray-600 hidden md:block font-instSansN mb-6 max-xs:text-sm">
              Our team would love to hear from you.
            </p>
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-gray-700 mb-2 font-instSansN max-xs:text-sm">First Name</label>
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
                  <label className="block text-gray-700 mb-2 font-instSansN max-xs:text-sm">Last Name</label>
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
                <label className="block text-gray-700 mb-2 font-instSansN max-xs:text-sm">Phone</label>
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
                <label className="block text-gray-700 mb-2 font-instSansN max-xs:text-sm">Email</label>
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
                <label className="block text-gray-700 mb-2 font-instSansN max-xs:text-sm">Your Message</label>
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
                className="w-full bg-teal-600 font-inter font-semibold max-xs:text-sm text-white py-3 px-4 rounded-lg"
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
              src="/contact.jpg"
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
