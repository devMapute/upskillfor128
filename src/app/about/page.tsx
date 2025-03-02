"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function About() {
  const router = useRouter();
  return (
    <div>
      <button
        className="bg-amber-100 text-black rounded-2xl"
        onClick={() => router.push("/")}
      >
        <div className="p-2">Go home</div>
      </button>
    </div>
  );
}
