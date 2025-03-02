"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export const Navigation = () => {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <nav className="flex space-x-4">
      <Link href="/" className={pathname === "/" ? "font-extrabold" : ""}>
        Home
      </Link>
      <Link
        href="/products/testing"
        className={pathname === "/products/testing" ? "font-extrabold" : ""}
      >
        Products
      </Link>
      <Link
        href="/about"
        className={pathname === "/about" ? "font-extrabold" : ""}
      >
        About
      </Link>
    </nav>
  );
};
