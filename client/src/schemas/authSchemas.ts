/**
 * authSchemas.ts
 *
 * Zod validation schemas for all authentication forms.
 * Used with React Hook Form via @hookform/resolvers/zod.
 */

import { z } from 'zod';

// ─────────────────────────────────────────────────────────
// Reusable field validators
// ─────────────────────────────────────────────────────────

const emailField = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

const passwordField = z
  .string()
  .min(1, 'Password is required')
  .min(8, 'Password must be at least 8 characters');

// ─────────────────────────────────────────────────────────
// Login schema
// ─────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: emailField,
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

// ─────────────────────────────────────────────────────────
// Register schema
// ─────────────────────────────────────────────────────────

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(1, 'Full name is required')
      .min(2, 'Full name must be at least 2 characters')
      .max(100, 'Full name is too long')
      .regex(/^[a-zA-Z\s'-]+$/, 'Full name can only contain letters, spaces, hyphens, and apostrophes'),
    email: emailField,
    password: passwordField,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;

// ─────────────────────────────────────────────────────────
// Forgot password schema
// ─────────────────────────────────────────────────────────

export const forgotPasswordSchema = z.object({
  email: emailField,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// ─────────────────────────────────────────────────────────
// Reset password schema
// ─────────────────────────────────────────────────────────

export const resetPasswordSchema = z
  .object({
    password: passwordField,
    confirmPassword: z.string().min(1, 'Please confirm your new password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
