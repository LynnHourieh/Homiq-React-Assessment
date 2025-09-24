import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../components/InputField";
import type { LoginFormInputs } from "../models/components";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/loginSchema";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import HeroSlideshow from "../components/HeroSlideShow";

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const API_URL = import.meta.env.VITE_USERS_API;

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch(`${API_URL}/users?email=${data.email}`);
      const users = await response.json();

      if (users.length === 0) {
        setLoginError("User not found. Please sign up first.");
        return;
      }

      const user = users[0];
      const isMatch = await bcrypt.compare(data.password, user.password);

      if (isMatch) {
        login({ id: user.id, email: user.email });
        navigate("/products");
      } else {
        setLoginError("Incorrect password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* 🔹 Background slideshow */}
      <div className="absolute inset-0 z-0">
        <HeroSlideshow />
      </div>

      {/* 🔹 Dark overlay for contrast */}
      <div className="absolute inset-0  z-10" />

      {/* 🔹 Transparent login form */}
      <div className="relative z-20 flex items-center justify-center h-full">
        <div className="bg-transparent backdrop-blur-md w-full max-w-md p-10 rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold text-center text-white">
            Welcome Back!
          </h1>

          {loginError && (
            <p className="text-red-400 text-sm text-center mt-2">
              {loginError}
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <InputField
              label="Email"
              type="email"
              placeholder="you@example.com"
              name="email"
              register={register}
              error={errors.email}
              labelClassName="text-white"
              className=" text-white placeholder-white/70"
            />

            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              name="password"
              register={register}
              error={errors.password}
              labelClassName="text-white"
              className=" text-white placeholder-white/70"
            />

            <button
              type="submit"
              className="w-full bg-[#4DADF7]/80 text-white font-medium py-2 rounded-md hover:bg-[#176BB5]/90 transition-colors cursor-pointer"
            >
              Login
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-gray-200">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-300 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
