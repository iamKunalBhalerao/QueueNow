import { type Request } from "express";

export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface SignIn {
  email: string;
  password: string;
}

export interface createUserInterface {
  name: string;
  email: string;
  hashedPassword: string;
}

export interface TokenPayload {
  id: string;
  email: string;
}

export interface CreateLinkedInPost {
  content: string;
  media: string[];
  scheduledAt: Date;
}

export interface CreateTwitterPost {
  content: string;
  media: string[];
  scheduledAt: Date;
}

export type SignUpRequest = Request<{}, {}, SignUp>;
export type SignInRequest = Request<{}, {}, SignIn>;
export type IsAuthenticatedRequest = Request;
export type CreateLinkedInPostRequest = Request<{}, {}, CreateLinkedInPost>;
export type CreateTwitterPostRequest = Request<{}, {}, CreateTwitterPost>;
