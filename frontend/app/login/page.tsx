"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    // Auto-authenticate and redirect immediately
    if (typeof window !== "undefined") {
      localStorage.setItem("auth_token", "demo_token");
      localStorage.setItem("user_email", "admin@kestrel.ai");
      localStorage.setItem("user_role", "admin");
      
      // Small delay to ensure localStorage is set
      setTimeout(() => {
        router.push("/admin/portal");
      }, 100);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogIn className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Kestrel AI</h1>
          <p className="text-gray-600 mt-2">Authenticating...</p>
        </div>
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    </div>
  );
}
