"use client";

import { useAuth } from "@/hooks";
import { SignIn } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { SubmitHandler, useForm } from "react-hook-form";

export default function SignInForm() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<SignIn>();
  const { signInMutation } = useAuth();

  const onSubmit: SubmitHandler<SignIn> = (data) => {
    signInMutation(data, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-5 flex w-full max-w-lg flex-col items-start gap-2 rounded-lg border border-neutral-600 bg-neutral-800 p-6"
    >
      <div className="flex w-full justify-center">
        <Image src="/favicon.png" alt="form logo" width={60} height={60} />
      </div>
      <label>Email</label>
      <input
        type="email"
        className="w-full rounded-md border border-neutral-600 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-400 transition outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
        {...register("email", { required: true })}
      />
      <label>Password</label>
      <input
        type="password"
        className="w-full rounded-md border border-neutral-600 bg-neutral-800 px-4 py-2 text-white placeholder-neutral-400 transition outline-none focus:border-yellow-400 focus:ring focus:ring-yellow-400/30"
        {...register("password", { required: true })}
      />
      <button
        type="submit"
        className="mt-6 w-full cursor-pointer rounded-md border border-neutral-600 bg-neutral-800 px-4 py-2 transition-colors duration-300 hover:border-yellow-400"
      >
        Sign In
      </button>
    </form>
  );
}
