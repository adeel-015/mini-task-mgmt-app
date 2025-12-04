"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();
  const router = useRouter();
  const onSubmit = async (data) => {
    try {
      await login(data);
      router.push("/dashboard");
    } catch (err) {
      alert(err.message || "Login failed");
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-900">
      <form
        className="w-full max-w-md p-6 bg-white dark:bg-slate-800 rounded shadow text-gray-900 dark:text-white"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
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
          Login
        </button>
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <a href="/signup" className="text-primary underline">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}
