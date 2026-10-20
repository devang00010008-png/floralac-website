import type { Product } from './product';

export interface CartItem {
  id: string; // unique key, e.g. `${product.id}-${variantId || 'default'}`
  product: Product;
  variantId?: string;
  variantName?: string;
  price: number;
  quantity: number;
}
