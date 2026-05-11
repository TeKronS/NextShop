export interface ProductSpecifications {
  weight?: string;
  size?: string;
  color?: string;
  batteryLife?: string;
  batteryCapacity?: string;
  techSpecs?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  imageUrl: string;
  imageHint: string;
  stock: number;
  specifications?: ProductSpecifications;
  sellerId?: string;
  createdAt?: any;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  createdAt: string;
  shippingAddress: {
    name: string;
    street: string;
    city: string;
    zipCode: string;
  };
}
