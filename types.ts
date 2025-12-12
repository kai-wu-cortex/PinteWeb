
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
