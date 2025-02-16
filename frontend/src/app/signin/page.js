"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';
import useAuthCheck from "@/hooks/useAuthCheck";  // Import your custom authentication hook

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;


const SignInPage = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthCheck();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      toast.error("You are already signed in.");
      router.push(`/`);
    }
  }, [isAuthenticated, router]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please fill in both fields.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const normalizedEmail = formData.email.toLowerCase();
      const response = await axios.post(`${apiUrl}auth/token/`, {
        
        email: normalizedEmail,
        password: formData.password,
      });

      const { access, refresh } = response.data;
      const decodedToken = jwtDecode(access);
      const userId = decodedToken.user_id;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      localStorage.setItem("user_id", userId);

      toast.success("User logged in successfully.");
      router.push(`/`);

    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[88vh] flex items-center justify-center">
      <div className="w-full sm:max-w-sm bg-white md:border border-gray-300 sm:rounded-3xl p-6">
        <h2 className="text-2xl font-bold text-center font-instSansB text-gray-800">Sign In</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Welcome back! Please enter your details.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              required
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <div className="flex items-center justify-between">
           
            <a href="/reset-password" className="text-sm text-teal-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition duration-300"
            disabled={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

  

        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-teal-600 font-medium hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
