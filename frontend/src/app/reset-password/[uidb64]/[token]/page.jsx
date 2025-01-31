"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();
  const { uidb64, token } = useParams(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 8) {
      setMessage("Password must be at least 8 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
        const response = await axios.post(`${apiUrl}/reset-password/${uidb64}/${token}/`, {
        password,
        confirmPassword
      });

      toast.success('Password has been reset successfully!');
      setMessage('Password reset successfully!');
      router.push(`/signin`);
    } catch (error) {
      toast.error('Failed to reset password.');
      setMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center font-jakarta bg-white sm:bg-gray-50">
    <div className="w-full sm:max-w-md bg-white sm:shadow-lg sm:rounded-xl p-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">Reset Your Password</h2>
      <p className="text-sm text-gray-600 text-center mt-2">
        Enter your new password to reset your account.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm font-medium text-gray-600">New Password</label>
          <input
            type="password"
            placeholder="Enter new password"
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600">Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full mt-1 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-lg transition duration-300 ${
            loading
              ? "bg-teal-800 text-white"
              : "bg-teal-600 text-white hover:bg-teal-700"
          }`}
          disabled={loading}
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

      <p className="text-sm text-center text-gray-600 mt-3">
        <Link href={`/signin`} className="text-teal-600 font-medium hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  </div>
  );
}
