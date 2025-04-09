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
      message: getErrorMessage("general-field-required", locale),
    }),
    email: z.string().email({
      message: getErrorMessage("invalid-email", locale),
    }),
    phone: z
      .string()
      .regex(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, {
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

// --Just-- Sign Up For Parents Form Schema
const createParentSchema = (locale: "ar" | "en" = "ar") =>
  z.object({
    name: z
      .string()
      .min(1, { message: getErrorMessage("general-field-required", locale) }),
    phone: z
      .string()
      .regex(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, {
        message: getErrorMessage("invalid-phone", locale),
      }),
    email: z.string().email({
      message: getErrorMessage("invalid-email", locale),
    }),
    relation: z
      .string()
      .min(1, getErrorMessage("general-field-required", locale)),
    password: z.string().min(8, {
      message: getErrorMessage("password-min", locale, { min: 8 }),
    }),
    confirmPassword: z.string(),
  });

export type JustSignUpParentFormData = z.infer<
  ReturnType<typeof createParentSchema>
>;

// Add Child Step 1
const createChildStep1Schema = (locale: "ar" | "en" = "ar") =>
  z.object({
    // Step 1: Child Information
    childName: z
      .string()
      .min(2, { message: getErrorMessage("general-field-required", locale) }),
    birthDate: z.date({
      required_error: getErrorMessage("general-field-required", locale),
    }),
    fatherName: z
      .string()
      .min(2, { message: getErrorMessage("general-field-required", locale) }),
    motherName: z
      .string()
      .min(2, { message: getErrorMessage("general-field-required", locale) }),
    gender: z.enum(["male", "female"], {
      required_error: getErrorMessage("general-answer-required", locale),
    }),
  });

export type ChildStep1FormData = z.infer<
  ReturnType<typeof createChildStep1Schema>
>;

// Add Child Step 2
const createChildStep2Schema = (locale: "ar" | "en" = "ar") =>
  z.object({
    // Step 2: Chronic Diseases and Allergies
    chronicDiseases: z
      .object({
        hasDiseases: z.enum(["yes", "no"], {
          required_error: getErrorMessage("general-field-required", locale),
        }),
        diseases: z
          .array(
            z.object({
              name: z.string().trim().optional(),
              medication: z.string().trim().optional(),
              procedures: z.string().trim().optional(),
            })
          )
          .optional(),
      })
      .superRefine((data, ctx) => {
        if (data.hasDiseases === "yes") {
          if (!data.diseases || data.diseases.length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: getErrorMessage("disease-one-required", locale),
              path: ["diseases"],
            });
          } else {
            data.diseases.forEach((disease, index) => {
              if (!disease.name || disease.name.trim() === "") {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: getErrorMessage("general-field-required", locale),
                  path: [`diseases.${index}.name`],
                });
              }
              if (!disease.medication || disease.medication.trim() === "") {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: getErrorMessage("general-field-required", locale),
                  path: [`diseases.${index}.medication`],
                });
              }
              if (!disease.procedures || disease.procedures.trim() === "") {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: getErrorMessage("general-field-required", locale),
                  path: [`diseases.${index}.procedures`],
                });
              }
            });
          }
        }
      }),

    allergies: z
      .object({
        hasAllergies: z.enum(["yes", "no"], {
          required_error: getErrorMessage("general-answer-required", locale),
        }),
        allergies: z
          .array(
            z.object({
              allergyTypes: z.string().trim().optional(),
              allergyFoods: z.string().trim().optional(),
              allergyProcedures: z.string().trim().optional(),
            })
          )
          .optional(),
      })
      .superRefine((data, ctx) => {
        if (data.hasAllergies === "yes") {
          if (!data.allergies || data.allergies.length === 0) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: getErrorMessage("allergy-one-required", locale),
              path: ["allergies"],
            });
          } else {
            data.allergies.forEach((allergy, index) => {
              if (!allergy.allergyTypes || allergy.allergyTypes.trim() === "") {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: getErrorMessage("general-field-required", locale),
                  path: [`allergies.${index}.allergyTypes`],
                });
              }
              if (!allergy.allergyFoods || allergy.allergyFoods.trim() === "") {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: getErrorMessage("general-field-required", locale),
                  path: [`allergies.${index}.allergyFoods`],
                });
              }
              if (
                !allergy.allergyProcedures ||
                allergy.allergyProcedures.trim() === ""
              ) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: getErrorMessage("general-field-required", locale),
                  path: [`allergies.${index}.allergyProcedures`],
                });
              }
            });
          }
        }
      }),
  });

export type ChildStep2FormData = z.infer<
  ReturnType<typeof createChildStep2Schema>
>;

// Add Child Step 3
const createChildStep3Schema = (locale: "ar" | "en" = "ar") =>
  z.object({
    // Step 3: Recommendations
    childDescription: z
      .string()
      .min(2, { message: getErrorMessage("general-field-required", locale) }),
    favoriteThings: z
      .string()
      .min(2, { message: getErrorMessage("general-field-required", locale) }),
    recommendations: z.string().optional(),
  });

export type ChildStep3FormData = z.infer<
  ReturnType<typeof createChildStep3Schema>
>;

// Add Child Step 4
const createChildStep4Schema = (locale: "ar" | "en" = "ar") =>
  z.object({
    // Step 4: Authorized Persons
    authorizedPersons: z
      .array(
        z.object({
          name: z
            .string()
            .min(2, {
              message: getErrorMessage("general-field-required", locale),
            }),
          idNumber: z
            .string()
            .min(2, {
              message: getErrorMessage("general-field-required", locale),
            }),
        })
      )
      .min(1, { message: getErrorMessage("general-field-required", locale) }),

    comments: z.string().optional(),
  });

export type ChildStep4FormData = z.infer<
  ReturnType<typeof createChildStep4Schema>
>;

// Add Child Schema
export const createAddChildSchema = (locale: "ar" | "en" = "ar") => {
  const step1Schema = createChildStep1Schema(locale);
  const step2Schema = createChildStep2Schema(locale);
  const step3Schema = createChildStep3Schema(locale);
  const step4Schema = createChildStep4Schema(locale);

  return step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema);
};

export type AddChildFormData = z.infer<ReturnType<typeof createAddChildSchema>>;

// Sign Up For Parents w/ Add Child Form Schema
export const createSignUpParentSchema = (locale: "ar" | "en" = "ar") => {
  const parentSchema = createParentSchema(locale);
  const addChildSchema = createAddChildSchema(locale);

  return parentSchema
    .merge(addChildSchema)
    .refine((data) => data.password === data.confirmPassword, {
      message: getErrorMessage("password-match", locale),
      path: ["confirmPassword"],
    });
};

export type SignUpParentFormData = z.infer<
  ReturnType<typeof createSignUpParentSchema>
>;

// Sign Up For Centers Step 1
const createCenterStep1Schema = (locale: "ar" | "en" = "ar") =>
  z.object({
    // Step 1: Basic Information
    centerNameArabic: z
      .string()
      .min(2, { message: getErrorMessage("general-field-required", locale) }),
    centerNameEnglish: z
      .string()
      .min(2, { message: getErrorMessage("general-field-required", locale) }),
    email: z
      .string()
      .email({ message: getErrorMessage("invalid-email", locale) }),
    phone: z
      .string()
      .regex(/^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/, {
        message: getErrorMessage("invalid-phone", locale),
      }),
    city: z
      .string()
      .min(2, { message: getErrorMessage("general-field-required", locale) }),
    district: z
      .string()
      .min(2, { message: getErrorMessage("general-field-required", locale) }),
    street: z
      .string()
      .min(2, { message: getErrorMessage("general-field-required", locale) }),
    locationLink: z
      .string()
      .min(5, { message: getErrorMessage("general-field-required", locale) }),
    branches: z.string().optional(),
    centerType: z
      .array(z.string())
      .min(1, { message: getErrorMessage("general-field-required", locale) }),
    services: z
      .array(z.string())
      .min(1, { message: getErrorMessage("services-one-required", locale) }),
    additionalServices: z.string().optional(),
  });

export type CenterStep1FormData = z.infer<
  ReturnType<typeof createCenterStep1Schema>
>;

// Sign Up For Centers Step 2
const createCenterStep2Schema = (locale: "ar" | "en" = "ar") =>
  z.object({
    // Step 2: Ages and Hours
    ageGroups: z
      .array(z.string())
      .min(1, { message: getErrorMessage("age-groups-one-required", locale) }),
    additionalInfo: z.string().optional(),
    workDays: z.object({
      from: z
        .string()
        .min(1, { message: getErrorMessage("general-field-required", locale) }),
      to: z
        .string()
        .min(1, { message: getErrorMessage("general-field-required", locale) }),
    }),
    workHours: z.object({
      from: z
        .string()
        .min(1, { message: getErrorMessage("general-field-required", locale) }),
      to: z
        .string()
        .min(1, { message: getErrorMessage("general-field-required", locale) }),
    }),
  });

export type CenterStep2FormData = z.infer<
  ReturnType<typeof createCenterStep2Schema>
>;

// Sign Up For Centers Step 3
const createCenterStep3Schema = (locale: "ar" | "en" = "ar") =>
  z.object({
    // Step 3: Communication and Food
    emergencyContact: z.enum(["yes", "no"], {
      required_error: getErrorMessage("general-answer-required", locale),
    }),
    communicationMethods: z
      .array(z.string())
      .min(1, {
        message: getErrorMessage("communication-methods-one-required", locale),
      }),
    foodService: z.enum(["yes", "no"], {
      required_error: getErrorMessage("general-answer-required", locale),
    }),
    meals: z
      .array(
        z.object({
          name: z.string().optional(),
          ingredients: z.string().optional(),
          drink: z.string().optional(),
        })
      )
      .optional(),
  });

export type CenterStep3FormData = z.infer<
  ReturnType<typeof createCenterStep3Schema>
>;

const MAX_FILE_SIZE = 3 * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ["application/pdf"];

// Sign Up For Centers Step 4
const createCenterStep4Schema = (locale: "ar" | "en" = "ar") =>
  z.object({
    // Step 4: Permits
    businessLicense: z
      .instanceof(File, {
        message: getErrorMessage("general-field-required", locale),
      })
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        getErrorMessage("file-size", locale)
      )
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file.type),
        getErrorMessage("file-size", locale)
      ),
    commercialRegistration: z
      .instanceof(File, {
        message: getErrorMessage("general-field-required", locale),
      })
      .refine(
        (file) => file.size <= MAX_FILE_SIZE,
        getErrorMessage("file-size", locale)
      )
      .refine(
        (file) => ACCEPTED_FILE_TYPES.includes(file.type),
        getErrorMessage("pdf-type", locale)
      ),
    comments: z.string().optional(),
  });

export type CenterStep4FormData = z.infer<
  ReturnType<typeof createCenterStep4Schema>
>;

// Sign Up For Centers Schema
export const createSignUpCenterSchema = (locale: "ar" | "en" = "ar") => {
  const step1Schema = createCenterStep1Schema(locale);
  const step2Schema = createCenterStep2Schema(locale);
  const step3Schema = createCenterStep3Schema(locale);
  const step4Schema = createCenterStep4Schema(locale);

  return step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema);
};

export type SignUpCenterFormData = z.infer<
  ReturnType<typeof createSignUpCenterSchema>
>;
