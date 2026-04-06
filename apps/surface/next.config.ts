import type { NextConfig } from "next";

// ── Env validation ────────────────────────────────────────────────────────────
// Fail fast at build / dev-server start when required variables are missing.
const requiredEnvVars = ["NEXT_PUBLIC_API_URL"] as const;

for (const key of requiredEnvVars) {
  if (!process.env[key]) {
    throw new Error(
      `[surface] Missing required environment variable: ${key}\n` +
        `Make sure you have a .env file with this variable set.\n` +
        `See .env.example for reference.`,
    );
  }
}
// ─────────────────────────────────────────────────────────────────────────────

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Expose validated env vars explicitly — makes the contract visible.
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL!,
  },
};

export default nextConfig;

