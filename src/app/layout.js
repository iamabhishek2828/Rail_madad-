// src/app/layout.js
"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider, useAuth } from "../context/AuthContext";
import LandingPage from "@/components/landingpage"; // Corrected component import
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

function AuthLayout({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // Don't redirect while loading

    if (user) {
      // Redirect to home page if signed in
      if (
        router.pathname === "/" ||
        router.pathname === "/signup" ||
        router.pathname === "/signin"
      ) {
        router.push("/home");
      }
    } else {
      // Redirect to landing page if not signed in and trying to access the home page
      if (router.pathname === "/home") {
        router.push("/");
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>; // Optional: Replace with a spinner or loading component
  }

  return <>{children}</>;
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <AuthLayout>{children}</AuthLayout>
        </body>
      </html>
    </AuthProvider>
  );
}
