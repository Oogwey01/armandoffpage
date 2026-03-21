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
