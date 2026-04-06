import { z } from 'zod';

// Signup form validation schema
export const signupSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters' })
    .max(100, { message: 'Name must not exceed 100 characters' })
    .trim(),
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(128, { message: 'Password must not exceed 128 characters' })
    .regex(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    .regex(/[a-z]/, { message: 'Password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' })
    .regex(/[!@#$%^&*]/, { message: 'Password must contain at least one special character (!@#$%^&*)' }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type SignupFormData = z.infer<typeof signupSchema>;

// Signin form validation schema
export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: 'Please enter a valid email address' })
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(1, { message: 'Password is required' }),
});

export type SigninFormData = z.infer<typeof signinSchema>;
