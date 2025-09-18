"use client";

import { useAuth } from "@/hooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { SubmitHandler, useForm } from "react-hook-form";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "../ui/Button";
import toast from "react-hot-toast";

const formSignIn = z.object({
  email: z.email({ message: "Email richiesta" }),
  password: z.string({ message: "Password richiesta" }),
});

type FormSignInType = z.infer<typeof formSignIn>;

export default function SignInForm() {
  const router = useRouter();
  const form = useForm<FormSignInType>({
    resolver: zodResolver(formSignIn),
  });
  const { signInMutation } = useAuth();

  const onSubmit: SubmitHandler<FormSignInType> = (data) => {
    signInMutation(data, {
      onSuccess: () => {
        router.push("/");
      },
      onError: () => {
        toast.error("Email o password non corretti");
        form.resetField("password", { defaultValue: "" });
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="border-border bg-card mx-5 flex w-full max-w-md flex-col gap-6 rounded-lg border p-5"
      >
        <div className="flex w-full justify-center">
          <Image src="/favicon.png" alt="sign in logo" width={50} height={50} />
        </div>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button role="submit" variant="default">
          Sign In
        </Button>
      </form>
    </Form>
  );
}
