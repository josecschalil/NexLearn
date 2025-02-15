"use client";
import axios from "axios";
import { toast} from "sonner";
import api from "../services/api";

const PaymentButton = ({ course, userId, userDetails, isAuthenticated, showPopup }) => {
  if (!course || !userId) {
    return null;
  }

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const addCourseToUser = async () => {
    try {
      const data = { user: userId, course: course.id };
      const response = await api.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}api/userCourses/`, data);
      console.log("Course added to user successfully:", response.data);
      toast.success("Course added to your account successfully!");
    } catch (error) {
      console.error("Error adding course to user:", error.response?.data || error.message);
      toast.error("Failed to add course. Please contact support.");
    }
  };

  const handlePayment = async () => {
    if (!isAuthenticated) {
      toast.error("User not logged in. Log in to enroll for courses.");
      return;
    }

    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay. Check your internet connection.");
      return;
    }

    try {
      const orderResponse = await api.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}api/create-order/`,
        {
          user_id: userId,
          course_id: course.id,
          amount: course.current_price * 100,
          currency: "INR",
          receipt: `receipt_${userId}_${course.id}`,
        }
      );

      const { id: orderId } = orderResponse.data;
      if (!orderId) {
        alert("Failed to get order ID from backend.");
        return;
      }

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: course.current_price * 100,
        currency: "INR",
        name: course.title,
        description: course.description,
        order_id: orderId,
        handler: async (response) => {
          try {
            const verifyResponse = await axios.post(
              `${process.env.NEXT_PUBLIC_API_BASE_URL}api/verify-payment/`,
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }
            );

            console.log("Payment verification successful:", verifyResponse.data);
            toast.success("Payment Successful! Course Enrolled.");
            await addCourseToUser(); 
          } catch (error) {
            console.error("Payment verification failed:", error.response?.data || error.message);
            toast.error("Payment verification failed. Please try again.");
          }
        },
        prefill: {
          name: userDetails?.name || "User",
          email: userDetails?.email || "user@example.com",
          contact: userDetails?.phone || "",
        },
        theme: { color: "#115e59" },
      };

      const rzp = new window.Razorpay(options);
      rzp.on("payment.failed", (response) => {
        console.error("Payment failed:", response);
        alert("Payment failed! Please try again.");
      });

      rzp.open();
    } catch (error) {
      console.error("Error initializing payment:", error.response?.data || error.message);
      alert("Failed to initiate payment. Please try again.");
    }
  };

  return (
    <button
      className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-900 transition"
      onClick={handlePayment}
    >
      Pay ₹{course.current_price} with Razorpay
    </button>
  );
};

export default PaymentButton;
