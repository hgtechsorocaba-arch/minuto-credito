import { LucideIcon } from 'lucide-react';

export interface ServiceItem {
  id: string; // Added ID for editing
  iconName: string; // Changed from component to string for JSON storage
  title: string;
  description: string;
  note: string;
}

export interface HeroSlide {
  id: string;
  title: string;
  text: string;
  pill: string;
  backgroundImage?: string; // URL specific for this slide
}

export interface TestimonialItem {
  text: string;
  author: string;
  location: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface StepItem {
  number: string;
  title: string;
  description: string;
}

export interface SiteConfig {
  brandName: string;
  logoText: string;
  logoImage: string | null; // URL or null
  heroBackgroundImage: string; // Default URL fallback
  whatsappNumber: string;
  slides: HeroSlide[];
  services: ServiceItem[];
}