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

export type TabId = "entrevistas" | "resenas" | "casos";

export interface StudentInterview {
  id: number;
  name: string;
  role: string;
  avatarInitials: string;
  avatarImage?: string;
  quote: string;
  rating: number;
  date: string;
  platform?: string;
}

export interface WrittenReview {
  id: number;
  name: string;
  role: string;
  avatarInitials: string;
  avatarImage?: string;
  review: string;
  rating: number;
  date: string;
  source?: string;
}

export interface CaseStudy {
  id: number;
  name: string;
  brandName: string;
  avatarInitials: string;
  avatarImage?: string;
  result: string;
  story: string;
  metrics?: { label: string; value: string }[];
  date: string;
  category?: string;
}
