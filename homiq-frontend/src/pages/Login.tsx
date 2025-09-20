import { yupResolver } from "@hookform/resolvers/yup";
import { StoreFront } from "../assets/icons";
import InputField from "../components/InputField";
import type { LoginFormInputs } from "../models/components";
import { useForm } from "react-hook-form";
import { loginSchema } from "../validations/loginSchema";
import bcrypt from "bcryptjs";
import { useState } from "react";

const Login = () => {
  const [loginError, setLoginError] = useState<string | null>(null);
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

      // compare hashed password
      const isMatch = await bcrypt.compare(data.password, user.password);

      if (isMatch) {
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "/products";
      } else {
        setLoginError("Incorrect password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setLoginError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="grid place-items-center h-screen ">
      <div className="bg-white w-full max-w-[380px] p-10 rounded-2xl shadow-lg flex flex-col gap-4 ">
        <div className="flex items-center justify-center">
          <StoreFront className="w-[50px] h-[50px] fill-[#4DADF7]" />
        </div>
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Homiq Shop
        </h1>
        <h2 className="text-xl font-bold text-center text-gray-800">Login</h2>
        {loginError && (
          <p className="text-red-500 text-sm text-center">{loginError}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <InputField
              label="Email"
              type="email"
              placeholder="you@example.com"
              name="email"
              register={register}
              error={errors.email}
            />
            
          </div>

          <div>
            <InputField
              label="Password"
              type="password"
              placeholder="••••••••"
              name="password"
              register={register}
              error={errors.password}
            />
            
          </div>

          <button
            type="submit"
            className="w-full bg-[#4DADF7] text-white font-medium py-2 rounded-md hover:bg-[#176BB5] transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
