import { RESERVATION_STATUS_IDS } from "@/lib/options";

// ===== Common Types =====
export type ReservationStatus = (typeof RESERVATION_STATUS_IDS)[number];

// ===== Child Related Types =====
export interface AuthorizedPerson {
  name: string;
  cin: string; // ID Number / CIN
}

export interface ChildAllergyDetail {
  name: string;
  allergy_causes: string[];
  allergy_emergency: string;
}

export interface ChronicDisease {
  name?: string;
  medication?: string;
  procedures?: string;
}

export interface Allergy {
  allergyTypes?: string;
  allergyFoods?: string;
  allergyProcedures?: string;
}

export interface Child {
  id: number;
  child_name: string;
  birthday_date: string | null;
  gender: "girl" | "boy" | string;
  disease: boolean;
  disease_details: Array<{
    disease_name: string;
    medicament: string;
    emergency: string;
  }>;
  allergy: boolean;
  allergy_name: string | null;
  parent_name: string;
  mother_name: string;
  kinship: string;
  recommendations?: string;
  description_3_words: string;
  things_child_likes: string;
  notes?: string;
  authorized_persons: AuthorizedPerson[];
  allergies: ChildAllergyDetail[];
}

// ===== Parent Related Types =====
export interface ParentData {
  name: string;
  phone: string;
  email: string;
  relation: string;
}

export interface ParentRegisterPayload {
  name: string;
  email: string;
  national_number: string;
  phone: string;
  password?: string;
  address: string | null;
  children: Child[];
}

export interface ParentRegisterFormDataInput {
  name: string;
  phone: string;
  email: string;
  relation: string;
  national_number: string;
  address: string;
  password: string;
  confirmPassword?: string;
  childName: string;
  birthDate: string;
  fatherName: string;
  motherName: string;
  kinship: string;
  gender: "male" | "female" | string;
  chronicDiseases?: {
    hasDiseases: "yes" | "no";
    diseases?: Array<{ name: string; medication: string; procedures: string }>;
  };
  allergies?: {
    hasAllergies: "yes" | "no";
    allergies?: Array<{
      allergyTypes: string;
      allergyFoods: string;
      allergyProcedures: string;
    }>;
  };
  childDescription?: string;
  favoriteThings?: string;
  recommendations?: string;
  authorizedPersons?: Array<{ name: string; idNumber: string }>;
  comments?: string;
}

// ===== Center Related Types =====
export interface Meal {
  meal_name?: string;
  juice?: string;
  components?: string;
}

export interface Pricing {
  enrollment_type: string;
  response_speed: string;
  price_amount: number;
}

export interface CenterRegisterPayload {
  name: string;
  email: string;
  password: string;
  address: string;
  phone: string;
  nursery_type: string[];
  additional_service?: string;
  work_days_from: string;
  work_days_to: string;
  work_hours_from: string;
  work_hours_to: string;
  time_of_first_period?: string;
  time_of_second_period?: string;
  first_meals?: Meal[];
  second_meals?: Meal[];
  emergency_contact: boolean;
  special_needs: boolean;
  nursery_name: string;
  location: string;
  city: string;
  neighborhood: string;
  services: string[];
  communication_methods: string[];
  provides_food: boolean;
  accepted_ages: string[];
  pricing: Pricing[];
  logo: File;
  license_path: File;
  commercial_record_path: File;
}

// ===== Child Info Form Types =====
export interface ChildData {
  childName: string;
  birthDate: string;
  fatherName: string;
  motherName: string;
  gender: string;
}

export interface DiseasesData {
  diseases: ChronicDisease[];
}

export interface AllergiesData {
  allergies: Allergy[];
}

export interface RecommedationsData {
  childDescription: string;
  favoriteThings: string;
  recommendations: string;
}

export interface AuthorizedData {
  authorizedPersons: AuthorizedPerson[];
  comments: string;
}

export interface ChildInfoData {
  parentData: ParentData;
  childData: ChildData;
  diseasesData: DiseasesData;
  allergiesData: AllergiesData;
  recommedationsData: RecommedationsData;
  authorizedData: AuthorizedData;
}

// ===== Content Types =====
export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
  author?: string;
  created_at: string;
  published_at: string;
}

export interface AdSlide {
  id: number;
  title: string;
  image: string;
  created_at: string;
  published_at: string;
}

export interface CommonQuestion {
  id: number;
  question: string;
  answer: string;
  created_at: string;
  published_at: string;
}

export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  published_at: string;
}

export interface Value {
  key: string;
  title: string;
  description: string;
  image: string;
}
