export type ProductCategory = 'hair-care' | 'eco-leather' | 'jewelry';

export type ProductStatus = 'in-stock' | 'small-batch' | 'concept-testing' | 'coming-soon';

export interface ProductVariant {
  id: string;
  name: string;
  price: number; // in INR (₹)
  sizeOrVolume?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: ProductCategory;
  categoryLabel: string;
  basePrice: number;
  rating: number;
  reviewCount: number;
  image: string;
  fallbackGradient: string;
  description: string;
  materialStory: string;
  validationStatus?: string; // Honest transparency about material testing status
  variants: ProductVariant[];
  badges: string[];
  isFeatured?: boolean;
  status: ProductStatus;
  statusLabel: string;
  isOrderable: boolean;
}
