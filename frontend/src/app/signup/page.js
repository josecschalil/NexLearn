"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useAuthentication from "@/hooks/useAuthentication";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import api from "../services/api";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const SignUpPage = () => {

  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const { isAuthenticated, userDetails } = useAuthentication();

  const [isloading, setIsloading] = useState(false);

  useEffect(()=>{
      if(isAuthenticated){
      toast.error("Already Signed In. Sign Out to Register")
      router.push(`/`);}

  },[isAuthenticated])

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const normalizeEmail = (email) => {
    if (!email) return "";
    const [localPart, domainPart] = email.split("@");
    return domainPart ? `${localPart.toLowerCase()}@${domainPart.toLowerCase()}` : email;
  };

  const validatePassword = () => {
    const { password, confirmPassword } = formData;
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must include at least one number.";
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return "Password must include at least one special character.";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match.";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    setIsloading(true);
    e.preventDefault();

    const passwordError = validatePassword();
    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const normalizedEmail = normalizeEmail(formData.email);

      const response = await api.post(`/signup/`, {
        name: formData.name,
        email: normalizedEmail,
        password: formData.password,
        re_password: formData.password,
      });


      setIsloading(false);
      setError("");
      setMessage(
        "User registered successfully! Please check your email to verify your account."
      );
      toast.success(
        "An Email has been sent to your registered mail. Confirm to finish Sign-up."
      );
      router.push("/");

      // Reset form data
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Clear the success message after 3 seconds
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      setIsloading[false];
      const errorMsg =
        err.response?.data?.email ||
        err.response?.data?.password ||
        "Registration failed.";
      setError(errorMsg);

      // Clear the error message after 3 seconds
      setTimeout(() => {
        setError("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex sm:items-center sm:justify-center bg-gray-50">
      <div className="w-full sm:max-w-lg bg-white sm:shadow-xl sm:rounded-xl p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Sign Up
        </h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Join us to kickstart your journey for JEE or NEET preparation!
        </p>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              aria-label="Full Name"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="example@email.com"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              aria-label="Email Address"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              aria-label="Password"
              required
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              aria-label="Confirm Password"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}
          {message && <p className="text-sm text-green-600">{message}</p>}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg transition duration-300 ${
              isloading
                ? "bg-teal-400 text-white animate-pulse"
                : "bg-teal-600 text-white hover:bg-teal-700"
            }`}
            disabled={isloading} // Disable the button while loading
          >
            {isloading ? (
              <span className="flex justify-center items-center">
                <div className="w-4 h-4 border-t-2 border-white border-solid rounded-full animate-spin"></div>
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="text-sm text-center text-gray-600 mt-6">
          Already have an account?{" "}
          <a
            href="/signin"
            className="text-teal-600 font-medium hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
