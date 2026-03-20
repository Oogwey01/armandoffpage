export interface FormData {
  // Step 1
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  // Step 2
  businessStage: string;
  industry: string;
  businessType: string;
  // Step 3
  challenges: string[];
  marketingBudget: string;
  roas: string;
  conversionRate?: string;
  // Step 4
  availability: string;
  goals: string;
  hasMentor: string;
  committed: string;
  referralSource: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface Service {
  title: string;
  description: string;
  image: string;
  badge?: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface Pillar {
  icon: string;
  title: string;
  description: string;
}
