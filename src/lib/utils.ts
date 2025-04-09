import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// form error messages en and ar
const ERRORMESSAGES = {
  "name-required": {
    ar: "الاسم مطلوب",
    en: "Name is required",
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
