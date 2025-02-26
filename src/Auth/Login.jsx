import React from "react";
import { useForm } from "react-hook-form";

const Login = ({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative bg-white shadow-lg rounded-2xl w-96 overflow-hidden">
        {/*  Header */}
        <div className="relative bg-yellow-500 p-10 text-white text-center">
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
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600 font-medium mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: "Password is required" })}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>

            <div className="text-right mb-4">
              <a href="#" className="text-sm text-gray-500 hover:text-yellow-500">
                Forgot your password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold p-3 rounded-lg transition"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
