"use client";
import { useState } from "react";
import axios from "axios";
import showPopup from "../components/Toast";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ResetRequest() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(""); 
  const [isSubmitted, setIsSubmitted] = useState(false); 
  const [loading, setloading] = useState(false); 

  const handleSubmit = (e) => {
    e.preventDefault();

    setloading(true); 

    axios
      .post(`${apiUrl}/reset-password/`, {
        email: email,
      })
      .then((res) => {
        setIsSubmitted(true);
        setMessage(`An email has been sent to ${email} with instructions to reset your password.`);
      })
      .catch((error) => {
        if (error.response) {
          setMessage(error.response.data.detail || "Something went wrong. Please try again.");
        } else if (error.request) {
          setMessage("No response from the server. Please check your internet connection.");
        } else {
          setMessage("An error occurred. Please try again.");
        }
      })
      .finally(() => {
        setloading(false);
        if (!isSubmitted) {
          setTimeout(() => {
            setMessage(""); 
          }, 3000);
        }
      });
  };

  return (
    <div className="h-[90vh] flex items-center justify-center font-jakarta bg-white sm:bg-gray-50">
      <div className="w-full sm:max-w-md bg-white sm:shadow-lg sm:rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">Reset Your Password</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Enter your email address to receive a password reset link.
        </p>

        {!isSubmitted ? (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="text-sm font-medium text-gray-600">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                required
              />
            </div>

            <button
            type="submit"
            className={`w-full py-3 rounded-lg transition duration-300 ${
              loading
                ? "bg-teal-800 text-white "
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
            disabled={loading} // Disable the button while loading
          >
            {loading ? (
              <span className="flex justify-center items-center">
                <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin"></div>
              </span>
            ) : (
              "Reset Password"
            )}
          </button>
          </form>
        ) : (
          showPopup(message)
        )}

      


        <p className="text-sm text-center text-gray-600 mt-3">
          <Link href={ `/signin`} className="text-teal-600 font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
