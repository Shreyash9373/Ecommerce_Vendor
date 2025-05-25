import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    watch,
  } = useForm();

  const sendOtp = async () => {
    const email = getValues("email");
    if (!email) {
      setMessage("Please enter your email first.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/v1/admin/sendOtp`, {
        email,
      });
      setOtpSent(true);
      setMessage(res.data.message || "OTP sent to your email.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    const email = getValues("email");
    const otp = getValues("otp");

    if (!otp || !email) {
      setMessage("Please enter both email and OTP.");
      return;
    }

    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URI}/api/v1/admin/verifyOtp`, {
        email,
        otp,
      });
      setEmailVerified(true);
      setMessage(res.data.message || "Email verified. You may now reset your password.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP.");
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (data) => {
    if (!emailVerified) {
      setMessage("Please verify your email first.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/reset-password`,
        {
          email: data.email,
          otp: data.otp,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }
      );
      setMessage(res.data.message || "Password reset successfully!");
    } catch (error) {
      setMessage(error.response?.data?.message || "Reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-3 items-center justify-center min-h-screen bg-gradient-to-tr from-[#614385] via-[#516395] to-[#516395] text-white">
      <div className="w-full max-w-2xl p-8 bg-white text-gray-800 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Reset Password</h2>

        {message && (
          <p
            className={`text-center mb-4 text-sm font-medium ${
              message.toLowerCase().includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit(resetPassword)} className="space-y-6">
          {/* Email + Send OTP */}
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email is required" })}
              className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-300"
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            <button
              type="button"
              onClick={sendOtp}
              className="mt-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send OTP"}
            </button>
          </div>

          {/* OTP + Verify */}
          {otpSent && (
            <div>
              <label className="block text-sm font-semibold mb-1">OTP</label>
              <input
                type="text"
                {...register("otp", { required: "OTP is required" })}
                className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-300"
                placeholder="Enter OTP"
              />
              {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp.message}</p>}
              <button
                type="button"
                onClick={verifyOtp}
                className="mt-3 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Email"}
              </button>
            </div>
          )}

          {/* Password Fields */}
          {emailVerified && (
            <>
              <div>
                <label className="block text-sm font-semibold mb-1">New Password</label>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="New Password"
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">Confirm Password</label>
                <input
                  type="password"
                  {...register("confirmPassword", {
                    required: "Confirm your password",
                    validate: (val) => val === watch("password") || "Passwords do not match",
                  })}
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2 focus:ring-indigo-300"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold transition"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </>
          )}
        </form>
      </div>

      <div className="text-right mb-4">
        <button
          onClick={() => navigate("/")}
          className="text-base text-white hover:text-yellow-400 hover:font-semibold"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
