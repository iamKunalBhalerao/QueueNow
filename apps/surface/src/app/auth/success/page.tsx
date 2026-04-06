"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Success() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard/platforms/linkedin");
    }, 3000);
  }, []);
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-6 flex justify-center">
            <div className="relative w-24 h-24">
              <div className="absolute inset-0 bg-green-400 rounded-full opacity-20 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-2">Success!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Your request has been completed successfully.
          </p>
{/* 
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-lg transition duration-200 shadow-lg hover:shadow-xl">
            Continue
          </button> */}
        </div>
      </div>
    </>
  );
}
