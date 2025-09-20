import { yupResolver } from "@hookform/resolvers/yup";
import { StoreFront } from "../assets/icons";
import InputField from "../components/InputField";
import type { SignUpFormInputs } from "../models/components";
import { useForm } from "react-hook-form";
import { signupSchema } from "../validations/signupSchema";
import bcrypt from "bcryptjs";

const Signup = () => {
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
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const response = await fetch(`${USER_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          password: hashedPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to register user");
      }

      window.location.href = "/login";
    } catch (err) {
      console.error("Error creating user:", err);
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
        <h2 className="text-xl font-bold text-center text-gray-800">Signup</h2>

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
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
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
          <div>
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
            className="w-full bg-[#4DADF7] text-white font-medium py-2 rounded-md hover:bg-[#176BB5] transition-colors cursor-pointer"
          >
            Signup
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
