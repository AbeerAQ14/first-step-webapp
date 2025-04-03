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
const parentSchema = z
  .object({
    name: z.string().min(1, "يرجى إدخال الاسم"),
    phone: z
      .string()
      .regex(
        /^(009665|9665|\+9665|05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/,
        "يرجى إدخال رقم الجوال"
      ),
    email: z.string().email("يرجى إدخال بريد إلكتروني صحيح"),
    relation: z.string().min(1, "يرجى إدخال صلة القرابة"),
    password: z.string().min(8, "كلمة السر يجب أن تكون على الأقل 8 أحرف"),
    confirmPassword: z.string().min(8, "يرجى تأكيد كلمة السر"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "كلمتا السر غير متطابقتين",
    path: ["confirmPassword"],
  });

export type JustSignUpParentFormData = z.infer<typeof parentSchema>;

// Add Child Schema
export const addChildSchema = z.object({
  // Step 1: Child Information
  childName: z.string().min(2, { message: "اسم الطفل مطلوب" }),
  birthDate: z.date({ required_error: "تاريخ الميلاد مطلوب" }),
  fatherName: z.string().min(2, { message: "اسم الأب مطلوب" }),
  motherName: z.string().min(2, { message: "اسم الأم مطلوب" }),
  gender: z.enum(["male", "female"], {
    required_error: "يرجى اختيار جنس الطفل",
  }),

  // Step 2: Chronic Diseases and Allergies
  chronicDiseases: z
    .object({
      hasDiseases: z.enum(["yes", "no"], {
        required_error: "يرجى الإجابة على هذا السؤال",
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
            message: "يجب إدخال مرض واحد على الأقل",
            path: ["diseases"],
          });
        } else {
          data.diseases.forEach((disease, index) => {
            if (!disease.name || disease.name.trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "يرجى إدخال اسم المرض",
                path: [`diseases.${index}.name`],
              });
            }
            if (!disease.medication || disease.medication.trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "يرجى إدخال الدواء المستخدم",
                path: [`diseases.${index}.medication`],
              });
            }
            if (!disease.procedures || disease.procedures.trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "يرجى إدخال الإجراءات المتبعة",
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
        required_error: "يرجى الإجابة على هذا السؤال",
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
            message: "يجب إدخال نوع حساسية واحد على الأقل",
            path: ["allergies"],
          });
        } else {
          data.allergies.forEach((allergy, index) => {
            if (!allergy.allergyTypes || allergy.allergyTypes.trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "يرجى إدخال نوع الحساسية",
                path: [`allergies.${index}.allergyTypes`],
              });
            }
            if (!allergy.allergyFoods || allergy.allergyFoods.trim() === "") {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "يرجى إدخال الأطعمة المسببة للحساسية",
                path: [`allergies.${index}.allergyFoods`],
              });
            }
            if (
              !allergy.allergyProcedures ||
              allergy.allergyProcedures.trim() === ""
            ) {
              ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "يرجى إدخال إجراءات التعامل مع الحساسية",
                path: [`allergies.${index}.allergyProcedures`],
              });
            }
          });
        }
      }
    }),

  // Step 3: Recommendations
  childDescription: z.string().min(2, { message: "وصف الطفل مطلوب" }),
  favoriteThings: z.string().min(2, { message: "الأشياء المفضلة مطلوبة" }),
  recommendations: z.string().optional(),

  // Step 4: Authorized Persons
  authorizedPersons: z
    .array(
      z.object({
        name: z.string().min(2, { message: "اسم الشخص المفوض مطلوب" }),
        idNumber: z.string().min(2, { message: "رقم الهوية مطلوب" }),
      })
    )
    .min(1, { message: "يجب إضافة شخص مفوض واحد على الأقل" }),

  comments: z.string().optional(),
});

export type AddChildFormData = z.infer<typeof addChildSchema>;

// Sign Up For Parents w/ Add Child Form Schema
export const signUpParentSchema = parentSchema.and(addChildSchema);

export type SignUpParentFormData = z.infer<typeof signUpParentSchema>;
