import axios from "axios";

// NEXT_PUBLIC_API_URL is validated at startup in next.config.ts.
// This assertion is a second line of defence for non-Next.js test runners.
const API_URL = process.env.NEXT_PUBLIC_API_URL;
if (!API_URL) {
  throw new Error(
    "[surface/api] NEXT_PUBLIC_API_URL is not defined. " +
      "Add it to your .env file (see .env.example).",
  );
}

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request for SignUp
export async function signup(data: {
  name: string;
  email: string;
  password: string;
}) {
  const response = await api.post("/auth/signup", data);
  return response.data;
}

// Request for SignIn
export async function signin(data: { email: string; password: string }) {
  const response = await api.post("/auth/signin", data);
  return response.data;
}

// Request for Getting LinkedIn Status
export async function getLinkedInStatus() {
  const response = await api.get("/auth/linkedin/status");
  return response.data;
}

export async function IsAuthenticated(token?: string) {

  const headers = token ? { Cookie: `accessToken=${token}` } : undefined;
  const response = await api.get("/auth/is-authenticated", { headers });

  return response.data;
}

export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function handleApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    switch (error.response?.status) {
      case 400:
        return "Invalid input. Please check your details.";
      case 409:
        return "Email already registered. Please use a different email.";
      case 500:
        return "Server error. Please try again later.";
      default:
        return error.message || "An error occurred. Please try again.";
    }
  }

  if (error instanceof Error) {
    return error.message;
  }

  return "An unexpected error occurred.";
}

export default api;
