"use client";

import { useState } from "react";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useAuth } from "@/components/AuthProvider";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <section className="mx-auto max-w-sm space-y-4">
      <h1 className="text-2xl font-bold">Create account</h1>
      <form
        className="space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          await register({ name, email, password });
          setLoading(false);
          router.push("/");
        }}
      >
        <div>
          <label htmlFor="name" className="text-sm font-medium">Name</label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1" />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1" />
        </div>
        <Button type="submit" isLoading={loading} className="w-full">Create account</Button>
      </form>
      <p className="text-sm">Already have an account? <a className="underline" href="/auth/login">Sign in</a>.</p>
    </section>
  );
}


