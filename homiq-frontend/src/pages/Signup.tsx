import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../components/InputField";
import type { SignUpFormInputs } from "../models/components";
import {  useForm } from "react-hook-form";
import { signupSchema } from "../validations/signupSchema";
import bcrypt from "bcryptjs";
import { useNavigate } from "react-router-dom";
import HeroSlideshow from "../components/HeroSlideShow";
 import LaptopImg from "../assets/images/products/laptop.jpg";
import DesktopImg from "../assets/images/products/desktop.jpg";
import ChairImg from "../assets/images/products/chair.jpg";
import RoomImg from "../assets/images/products/room.jpg";
import PaletteImg from "../assets/images/products/palette.jpg";
import { useState } from "react";

const Signup = () => {
  const navigate = useNavigate();
 const [isLoading,setIsLoading]=useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormInputs>({
    resolver: yupResolver(signupSchema),
  });
  const USER_URL = import.meta.env.VITE_USERS_API;
  const onSubmit = async (data: SignUpFormInputs) => {
    try {
      setIsLoading(true);
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const response = await fetch(`${USER_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hashedPassword,
        }),
      });

      if (!response.ok) {
        setIsLoading(false);
        throw new Error("Failed to register user");
      }
      setIsLoading(false);
      navigate("/login");
    } catch (err) {
      console.error("Error creating user:", err);
    }
  };


const slides = [LaptopImg, ChairImg, DesktopImg, RoomImg, PaletteImg];


  return (
    <div className="flex h-screen overflow-hidden  bg-gradient-to-b from-[#322C1B] to-[#171616] backdrop-blur-md text-[#FFFF]">
      <div className="hidden md:block w-1/2 h-full">
        <HeroSlideshow slides={slides}/>
      </div>

      <div className="flex w-full md:w-1/2 items-center justify-center p-8 animate-slideIn">
        <div className="w-full max-w-md bg-[#383322] shadow-lg rounded-xl p-8">
          <h2 className="text-3xl font-bold  mb-2 text-center">
            Create an Account
          </h2>
          <p className=" mb-6 text-center">
            Sign up with your email and password
          </p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <InputField
                  label="First Name"
                  type="text"
                  name="firstName"
                  register={register}
                  placeholder="First Name"
                />
                {errors.firstName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <InputField
                  label="Last Name"
                  type="text"
                  name="lastName"
                  register={register}
                  placeholder="Last Name"
                />
                {errors.lastName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <InputField
                label="Email"
                type="email"
                name="email"
                register={register}
                placeholder="user@example.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <InputField
                label="Password"
                type="password"
                name="password"
                register={register}
                placeholder="••••••••"
              
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <InputField
                label="Confirm Password"
                type="password"
                placeholder="••••••••"
                name="confirmPassword"
                register={register}
                error={errors.confirmPassword}
              />
            </div>

            <button
        type="submit"
        disabled={isLoading}
        className={`w-full flex items-center justify-center bg-[#F9D03F] text-black py-2 rounded-md transition 
          ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#F0B100]"}`}
      >
        {isLoading ? (
          <div className="flex items-center space-x-2">
          
                Signing Up... 
                            <div className="w-4 h-4 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            
          </div>
        ) : (
          "Sign Up"
        )}
      </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300"></div>
            <span className="px-2 text-gray-500 text-sm">or</span>
            <div className="flex-grow h-px bg-gray-300"></div>
          </div>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a href="/login" className="text-[#F9D03F] hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
