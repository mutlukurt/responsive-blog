"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/Button";

export function AuthButton() {
  const { user, logout } = useAuth();
  if (!user) return <Link href="/auth/login"><Button variant="outline">Sign in</Button></Link>;
  return (
    <div className="flex items-center gap-2">
      <Image src={user.avatar ?? "/vercel.svg"} alt="" width={24} height={24} className="rounded-full" />
      <span className="text-sm">{user.name}</span>
      <Button variant="ghost" onClick={logout}>Sign out</Button>
    </div>
  );
}


