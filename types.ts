
export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  image?: string;
  series?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

export enum Section {
  HOME = 'home',
  SOLUTIONS = 'solutions',
  PRODUCTS = 'products',
  ABOUT = 'about',
  DISTRIBUTORS = 'distributors',
  CONTACT = 'contact',
}

export type TabType = 'hot-stamping' | 'glitter' | 'service';

export type ProductId = 'PK' | 'PC' | 'PLPY' | 'DIGITAL' | 'GLITTER';

export interface ProductDetail {
  id: ProductId;
  name: string;
  subtitle: string;
  description: string;
  heroImage: string;
  features: { title: string; desc: string; icon: any }[];
  params: { label: string; value: string }[];
  substrates: string[];
  applications: string[];
  colors: string[];
  temp: { flat: string; round: string };
}

// Updated CatalogItem for specific product pages
export interface CatalogItem {
  id: string;
  name: string; 
  subtitle?: string;
  description: string; 
  content?: string; // Long form description for the specific page
  image: string; 
  tags?: string[]; 
  // Detailed fields for the specific view
  features?: { title: string; desc: string; icon?: any }[]; 
  params?: { label: string; value: string }[];
  applications?: string[];
  temp?: { flat: string; round: string };
  detailImage?: string; // New field for the long technical image
}

export interface SolutionData {
    id: string;
    title: string;
    series: string;
    img: string;
    description: string;
    features: string[];
    painPoints?: string[];
}

export interface CulturePost {
  id: string;
  image: string;
  title: string;
  desc: string;
  date: string;
  author: string;
  avatar: string;
  likes: number;
  tags: string[];
}