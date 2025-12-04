"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function SignupPage() {
  const { register, handleSubmit } = useForm();
  const { signup } = useAuth();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      await signup(data);
      router.push("/dashboard");
    } catch (err) {
      alert(err.message || "Signup failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <form
        className="w-full max-w-md p-6 bg-white dark:bg-slate-800 rounded shadow text-gray-900 dark:text-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <input
          className="w-full p-2 border rounded mb-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          placeholder="Name"
          {...register("name")}
        />
        <input
          className="w-full p-2 border rounded mb-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          placeholder="Email"
          {...register("email")}
        />
        <input
          type="password"
          className="w-full p-2 border rounded mb-3 bg-white dark:bg-slate-700 text-gray-900 dark:text-white"
          placeholder="Password"
          {...register("password")}
        />
        <button className="w-full bg-primary text-white p-2 rounded">
          Create Account
        </button>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <a href="/login" className="text-primary underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
