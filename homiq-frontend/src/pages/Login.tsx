import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../components/InputField";
import type { LoginFormInputs } from "../models/components";
import {  useForm } from "react-hook-form";
import { loginSchema } from "../validations/loginSchema";
import bcrypt from "bcryptjs";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import HeroSlideshow from "../components/HeroSlideShow";
import LaptopImg from "../assets/images/products/laptop.jpg";
import DesktopImg from "../assets/images/products/desktop.jpg";
import ChairImg from "../assets/images/products/chair.jpg";
import RoomImg from "../assets/images/products/room.jpg";
import PaletteImg from "../assets/images/products/palette.jpg";
const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
      const response = await fetch(`${API_URL}/users?email=${data.email}`);
      const users = await response.json();

      if (users.length === 0) {
        setIsLoading(false);
        setLoginError("User not found. Please sign up first.");
        return;
      }

      const user = users[0];
      const isMatch = await bcrypt.compare(data.password, user.password);

      if (isMatch) {
        setIsLoading(false);
        login({ id: user.id, email: user.email });
        navigate("/products");
      } else {
        setIsLoading(false);
        setLoginError("Incorrect password");
      }
    } catch (err) {
      setIsLoading(false);
      console.error("Login error:", err);
      setLoginError("Something went wrong. Try again.");
    }
  };
  const slides = [LaptopImg, ChairImg, DesktopImg, RoomImg, PaletteImg];

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* 🔹 Background slideshow */}
      <div className="absolute inset-0 z-0">
        <HeroSlideshow slides={slides} />
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
              className="w-full bg-[#F9D03F] text-black font-medium py-2 rounded-md hover:bg-[#F0B100] transition-colors cursor-pointer"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2 gap-2 ">
                  Logging in...
                  <div className="w-4 h-4 border-4 border-white-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                "Login"
              )}
            </button>
          </form>

          <p className="text-sm text-center mt-6 text-white">
            Don’t have an account?{" "}
            <a
              href="/signup"
              className="text-[#F9D03F] hover:underline"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
