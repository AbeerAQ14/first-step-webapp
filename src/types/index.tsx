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

export interface Blog {
  id: number;
  title: string;
  description: string;
  image: string;
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
  title: {
    ar: string;
    en: string;
  };
  description: {
    ar: string;
    en: string;
  };
  image: null;
}
