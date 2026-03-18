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

export type SignUpRequest = Request<{}, {}, SignUp>;
export type SignInRequest = Request<{}, {}, SignIn>;
