import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// form error messages en and ar
const ERRORMESSAGES = {
  "general-answer-required": {
    ar: "يرجى الإجابة على هذا السؤال",
    en: "Please answer this question",
  },
  "general-field-required": {
    ar: "هذا الحقل مطلوب",
    en: "This field is required",
  },
  "invalid-email": {
    ar: "يرجى إدخال بريد إلكتروني صحيح",
    en: "Please enter a valid email address",
  },
  "invalid-phone": {
    ar: "يرجى إدخال رقم هاتف صحيح",
    en: "Please enter a valid phone number",
  },
  "invalid-subject": {
    ar: "يرجى اختيار موضوع",
    en: "Please select a subject",
  },
  "message-min": {
    ar: "الرسالة يجب أن تكون على الأقل {min} أحرف",
    en: "Message must be at least {min} characters",
  },
  "password-min": {
    ar: "يجب أن تحتوي كلمة المرور على {min} أحرف على الأقل",
    en: "Password must be at least {min} characters",
  },
  "password-match": {
    ar: "كلمات المرور غير متطابقة",
    en: "Passwords do not match",
  },
  "invalid-otp": {
    ar: "يرجى إدخال الكود بشكل صحيح",
    en: "Please enter the code correctly",
  },
  "disease-one-required": {
    ar: "يجب إدخال مرض واحد على الأقل",
    en: "At least one disease must be entered",
  },
  "allergy-one-required": {
    ar: "يجب إدخال نوع حساسية واحد على الأقل",
    en: "At least one allergy type must be entered",
  },
  "authorized-one-required": {
    ar: "يجب إضافة شخص مفوض واحد على الأقل",
    en: "At least one authorized person must be added",
  },
  "services-one-required": {
    ar: "يجب اختيار خدمة واحدة على الأقل",
    en: "At least one service must be selected",
  },
  "age-groups-one-required": {
    ar: "يجب اختيار فئة عمرية واحدة على الأقل",
    en: "At least one age group must be selected",
  },
  "communication-methods-one-required": {
    ar: "يجب اختيار طريقة تواصل واحدة على الأقل",
    en: "At least one communication method must be selected",
  },
  "file-size": {
    ar: "يجب أن يكون حجم الملف أقل من 3 ميغابايت",
    en: "File size must be less than 3MB",
  },
  "pdf-type": {
    ar: "يُسمح فقط بملفات PDF",
    en: "Only PDF files are accepted",
  },
};

// get error message helpre function
export const getErrorMessage = (
  errorKey: keyof typeof ERRORMESSAGES,
  locale: "ar" | "en",
  replacements?: Record<string, string | number>
) => {
  let message = ERRORMESSAGES[errorKey][locale];

  if (replacements) {
    Object.entries(replacements).forEach(([key, value]) => {
      message = message.replace(`{${key}}`, String(value));
    });
  }

  return message;
};

// get meal title
const getArabicOrdinal = (index: number) => {
  const arabicOrdinals = [
    "الأولى",
    "الثانية",
    "الثالثة",
    "الرابعة",
    "الخامسة",
    "السادسة",
    "السابعة",
    "الثامنة",
    "التاسعة",
    "العاشرة",
  ];
  return arabicOrdinals[index] || `${index + 1}`;
};

const getEnglishOrdinal = (index: number) => {
  const englishOrdinals = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
  ];
  return englishOrdinals[index] || `${index + 1}`;
};

export const getMealTitle = (index: number, lang: string) => {
  if (lang === "ar") {
    return `الوجبة ${getArabicOrdinal(index)}`;
  }
  return `${getEnglishOrdinal(index)} Meal`;
};

// Create a slug from a name
export function createSlug(name: string, locale: string = "en"): string {
  const options = {
    replacement: "-",
    lower: true,
    strict: true,
    locale: locale,
  };

  return slugify(name, options);
}

// Check if a string contains Arabic characters
function containsArabic(text: string): boolean {
  const arabicPattern = /[\u0600-\u06FF]/;
  return arabicPattern.test(text);
}

// Utility function to try to reverse a slug back to a readable name
// Note: This won't perfectly restore the original, but makes it more readable
export function slugToReadableName(slug: string): string {
  // Simple replacement of hyphens with spaces
  const spacedText = slug.replace(/-/g, " ");

  // For Arabic, we don't capitalize as Arabic doesn't have the concept of uppercase/lowercase
  if (containsArabic(spacedText)) {
    return decodeURIComponent(spacedText);
  }

  // For Latin and other scripts that use capitalization
  return decodeURIComponent(
    spacedText
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
}
