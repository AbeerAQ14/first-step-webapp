// Define the structure for an authorized person within a child's details
export interface AuthorizedPerson {
  name: string;
  cin: string; // Corresponds to ID Number / CIN
}

// Define the structure for a specific allergy detail within a child's details
export interface ChildAllergyDetail {
  name: string; // The name/type of the allergy (e.g., "Peanuts")
  allergy_causes: string[]; // List of specific causes/triggers (e.g., ["Peanut butter", "Cookies"])
  allergy_emergency: string; // Emergency procedures (e.g., "Administer EpiPen")
}

// Define the structure for a single child
export interface Child {
  child_name: string;
  birthday_date: string | null; // Format: "YYYY-MM-DD"
  gender: "girl" | "boy" | string; // Typically 'girl' or 'boy', allow string for flexibility
  disease: boolean; // Does the child have a chronic disease?
  disease_name: string | null; // Name of the disease if applicable
  medicament_disease: string | null; // Medication/treatment for the disease if applicable
  disease_emergency: string | null; // Emergency procedures for the disease if applicable
  allergy: boolean; // Does the child have any allergies?
  allergy_name: string | null; // Name of the primary allergy, if applicable
  parent_name: string; // Father's name in the source example
  mother_name: string;
  kinship: string;
  recommendations?: string; // General recommendations or important notes
  description_3_words: string;
  things_child_likes: string;
  notes?: string;
  authorized_persons: AuthorizedPerson[]; // Array of people authorized to pick up/interact
  allergies: ChildAllergyDetail[]; // Array detailing specific allergies
}

// Define the main structure for the expected form payload
export interface ParentRegisterPayload {
  name: string; // User/Account name
  email: string;
  password?: string; // Password might be optional depending on context (e.g., update vs create)
  address: string | null; // User's address
  children: Child[]; // Array of children associated with the user/account
}

// Define an interface for the input object for better type checking
export interface ParentRegisterFormDataInput {
  name: string;
  phone: string; // Not used in output, but part of input structure
  email: string;
  relation: string; // Not used in output
  password: string;
  confirmPassword?: string; // Not used in output
  childName: string;
  birthDate: string; // Expecting ISO String like "YYYY-MM-DDTHH:mm:ss.sssZ"
  fatherName: string;
  motherName: string;
  kinship: string;
  gender: "male" | "female" | string;
  chronicDiseases?: {
    // Use optional properties for safety
    hasDiseases: "yes" | "no";
    diseases?: Array<{ name: string; medication: string; procedures: string }>;
  };
  allergies?: {
    // Use optional properties for safety
    hasAllergies: "yes" | "no";
    allergies?: Array<{
      allergyTypes: string;
      allergyFoods: string;
      allergyProcedures: string;
    }>;
  };
  childDescription?: string; // Optional text fields
  favoriteThings?: string;
  recommendations?: string;
  authorizedPersons?: Array<{ name: string; idNumber: string }>;
  comments?: string;
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
  // comments: string;
}

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

// child info types

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

export interface ParentData {
  name: string;
  phone: string;
  email: string;
  relation: string;
}

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

export type ReservationStatus =
  | "confirmed"
  | "waitingForPayment"
  | "waitingForConfirmation"
  | "rejected";
