import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import slugify from "slugify";
import {
  AuthorizedPerson,
  Child,
  ChildAllergyDetail,
  ParentRegisterFormDataInput,
  ParentRegisterPayload,
} from "@/types";

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
  "invalid-date": {
    ar: "يرجى إدخال تاريخ صحيح",
    en: "Please enter a valid date",
  },
  "invalid-time": {
    ar: "يرجى إدخال وقت صحيح",
    en: "Please enter a valid time",
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
  "image-type": {
    ar: "يُسمح فقط بملفات JPG, JPEG, PNG",
    en: "Only JPG, JPEG, PNG files are accepted",
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
  const arabicOrdinals = ["الأولى", "الثانية"];
  return arabicOrdinals[index] || `${index + 1}`;
};

const getEnglishOrdinal = (index: number) => {
  const englishOrdinals = ["first", "second"];
  return englishOrdinals[index] || `${index + 1}`;
};

export const getMealTitle = (index: number, lang: string) => {
  if (lang === "ar") {
    return `الفترة ${getArabicOrdinal(index)}`;
  }
  return `${getEnglishOrdinal(index)} Period`;
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

// Transform parent Signup FormData to Expected Payload
export function transformParentDataToExpectedPayload(
  formData: ParentRegisterFormDataInput
): ParentRegisterPayload {
  // --- Child Data Processing ---

  // 1. Handle Chronic Diseases
  const hasDisease = formData.chronicDiseases?.hasDiseases === "yes";
  const firstDisease =
    hasDisease &&
    formData.chronicDiseases?.diseases &&
    formData.chronicDiseases.diseases.length > 0
      ? formData.chronicDiseases.diseases[0]
      : null;

  // 2. Handle Allergies
  const hasAllergy = formData.allergies?.hasAllergies === "yes";
  const firstAllergySource =
    hasAllergy &&
    formData.allergies?.allergies &&
    formData.allergies.allergies.length > 0
      ? formData.allergies.allergies[0]
      : null;

  // Map detailed allergies array
  const allergiesTransformed: ChildAllergyDetail[] =
    hasAllergy && formData.allergies?.allergies
      ? formData.allergies.allergies.map((allergy) => ({
          name: allergy.allergyTypes,
          // Wrap the allergyFoods string into an array as expected
          allergy_causes: allergy.allergyFoods ? [allergy.allergyFoods] : [],
          allergy_emergency: allergy.allergyProcedures,
        }))
      : []; // Return empty array if no allergies or data missing

  // 3. Format Birthday Date (Extract YYYY-MM-DD)
  let formattedBirthday: string | null = null;
  if (formData.birthDate) {
    try {
      // Get the date part (YYYY-MM-DD) from the ISO string
      formattedBirthday = new Date(formData.birthDate)
        .toISOString()
        .split("T")[0];
    } catch (e) {
      console.error("Could not parse birthDate:", formData.birthDate, e);
      // formattedBirthday remains null if parsing fails
    }
  }

  // 4. Map Gender
  let childGender: "girl" | "boy" | string;
  if (formData.gender === "female") {
    childGender = "girl";
  } else if (formData.gender === "male") {
    childGender = "boy";
  } else {
    childGender = formData.gender; // Keep original if not male/female
  }

  // 5. Map Authorized Persons (Rename idNumber to cin)
  const authorizedPersonsTransformed: AuthorizedPerson[] = (
    formData.authorizedPersons || []
  ).map((person) => ({
    name: person.name,
    cin: person.idNumber, // Renaming idNumber to cin
  }));

  // 6. Combine descriptive fields for recommendations
  const recommendations = formData.recommendations || undefined;
  const description_3_words = formData.childDescription || "";
  const things_child_likes = formData.favoriteThings || "";
  const notes = formData.comments || undefined;

  // 7. Construct the Child object
  const childData: Child = {
    child_name: formData.childName,
    birthday_date: formattedBirthday, // Use the formatted date (or null)
    gender: childGender,
    disease: hasDisease,
    disease_name: firstDisease ? firstDisease.name : null,
    medicament_disease: firstDisease ? firstDisease.medication : null,
    disease_emergency: firstDisease ? firstDisease.procedures : null,
    allergy: hasAllergy,
    // Use the type from the first allergy as the primary allergy_name
    allergy_name: firstAllergySource ? firstAllergySource.allergyTypes : null,
    parent_name: formData.fatherName,
    mother_name: formData.motherName,
    kinship: formData.kinship,
    recommendations,
    description_3_words,
    things_child_likes,
    notes, // Use the combined text
    authorized_persons: authorizedPersonsTransformed,
    allergies: allergiesTransformed, // Use the transformed detailed allergies
  };

  // --- Construct Final Payload ---
  const expectedPayload: ParentRegisterPayload = {
    name: formData.name,
    email: formData.email,
    password: formData.password, // Directly mapped
    address: "123 Main Street, Anytown, ST 12345", // Address is not present in the source formData
    national_number: formData.national_number,
    phone: formData.phone,
    children: [childData], // Place the constructed child object into an array
  };

  return expectedPayload;
}

// to 24-hour format
export function formatTime(timeString: string) {
  if (!timeString) return "";

  // If it's already in HH:mm:ss, return it
  if (/^\d{2}:\d{2}:\d{2}$/.test(timeString)) return timeString;

  // If it's in HH:mm, add :00
  if (/^\d{2}:\d{2}$/.test(timeString)) return `${timeString}:00`;

  return ""; // fallback if format is unexpected
}

// Helper to get image dimensions
export async function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.width, height: img.height });
    img.src = URL.createObjectURL(file);
  });
}

export function mapOptions<T extends readonly string[]>(
  ids: T,
  translationPrefix: string,
  t: (key: string) => string
): { id: T[number]; label: string }[] {
  return ids.map((id) => ({
    id,
    label: t(`${translationPrefix}.${id}`),
  }));
}
