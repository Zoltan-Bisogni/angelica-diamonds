export interface Bag {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  thumbnail?: string;  // Immagine thumbnail per caricamento veloce
  blurDataURL?: string; // Blur placeholder per loading
  colors: string[];
  category: string;
  material: string;
  dimensions: string;
  inStock: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface BagCartItem {
  id: string;
  bagId: string;
  name: string;
  price: number;
  image: string;
  color: string;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
  slug: string;
  brand?: string;
  sku?: string;
  carat?: number;
  clarity?: string;
  color?: string;
  cut?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  province: string;
  zipCode: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  type: 'stripe' | 'paypal' | 'transfer';
  description: string;
  icon: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: Address;
}

export interface Address {
  street: string;
  city: string;
  postalCode: string;
  province: string;
  country: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  shippingAddress: Address;
  createdAt: Date;
}

export interface DiamondSpecs {
  carat: number;
  clarity: string;
  color: string;
  cut: string;
}
