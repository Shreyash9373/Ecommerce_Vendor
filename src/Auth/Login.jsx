import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setVendor } from "../redux/slices/vendorSlice.js";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isDisabled, setIsDisabled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    // console.log("Form data", data);
    setIsDisabled(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/vendor/login`,
        data,
        { withCredentials: true }
      );

      // console.log("Response", response);

      if (response.data) {
        toast.success(response.data.message || "Login Successful");

        // Dispatch admin data to Redux store
        dispatch(setVendor(response.data.data.vendor));

        // Redirect to dashboard after login
        navigate("/dashboard");
      }
      setIsDisabled(false);
    } catch (error) {
      setIsDisabled(false);
      toast.error(error.response?.data?.message || "Failed to Login");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F0F8FF]">
      <div className="relative bg-white shadow-lg rounded-2xl w-96 overflow-hidden">
        {/*  Header */}
        <div className="relative bg-blue-500 p-10 text-white text-center">
          <div className="z-10">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-sm">Please sign-in to continue!</p>
          </div>
        </div>

        {/* Login Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">Email</label>
              <input
                type="email"
                {...register("email", { required: "Email is required" })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">Password</label>
              <input
                type="password"
                autoComplete="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="text-right mb-4">
              <button
                onClick={() => navigate("/reset")}
                className="text-sm text-gray-500 hover:text-blue-500"
              >
                Forgot your password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isDisabled}
              className={`w-full text-white font-bold p-3 rounded-lg transition 
                ${isDisabled ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"}`}
            >
              {isDisabled ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
