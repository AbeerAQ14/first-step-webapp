import { z } from "zod";
import { getErrorMessage } from "./utils";

// Sign In Form
export const createSignInSchema = (locale: "ar" | "en" = "ar") =>
  z.object({
    email: z.string().email({
      message: getErrorMessage("invalid-email", locale),
    }),
    password: z.string().min(8, {
      message: getErrorMessage("password-min", locale, { min: 8 }),
    }),
  });

export type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>;

// Forgot Password Form
export const createForgotPasswordSchema = (locale: "ar" | "en" = "ar") =>
  z.object({
    email: z.string().email({
      message: getErrorMessage("invalid-email", locale),
    }),
  });

export type ForgotPasswordFormData = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;

// OTP Verification Form
export const createOTPVerificationSchema = (locale: "ar" | "en" = "ar") =>
  z.object({
    otp: z.string().min(4, {
      message: getErrorMessage("invalid-otp", locale, { min: 4 }),
    }),
  });

export type OTPVerificationFormData = z.infer<
  ReturnType<typeof createOTPVerificationSchema>
>;

// Reset Password Form
export const createResetPasswordSchema = (locale: "ar" | "en" = "ar") =>
  z
    .object({
      password: z.string().min(8, {
        message: getErrorMessage("password-min", locale, { min: 8 }),
      }),
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: getErrorMessage("password-match", locale),
      path: ["confirmPassword"],
    });

export type ResetPasswordFormData = z.infer<
  ReturnType<typeof createResetPasswordSchema>
>;

// Contact Us Form
export const createContactSchema = (locale: "ar" | "en" = "ar") =>
  z.object({
    name: z.string().min(2, {
      message: getErrorMessage("name-required", locale),
    }),
    email: z.string().email({
      message: getErrorMessage("invalid-email", locale),
    }),
    phone: z.string().regex(/^\+?[0-9]{8,15}$/, {
      message: getErrorMessage("invalid-phone", locale),
    }),
    subject: z.string().min(1, {
      message: getErrorMessage("invalid-subject", locale),
    }),
    message: z.string().min(10, {
      message: getErrorMessage("message-min", locale, { min: 10 }),
    }),
  });

export type ContactFormData = z.infer<ReturnType<typeof createContactSchema>>;
