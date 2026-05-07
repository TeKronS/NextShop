import { Product } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Modern Minimalist Watch',
    description: 'A sleek, premium timepiece crafted for the modern professional. Featuring a brushed stainless steel case and genuine leather strap.',
    price: 199.99,
    category: 'Accessories',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-1')?.imageUrl || '',
    imageHint: 'minimalist watch',
    stock: 15
  },
  {
    id: '2',
    name: 'Wireless Noise Cancelling Headphones',
    description: 'Experience pure sound with our flagship wireless headphones. Industry-leading noise cancellation and 40-hour battery life.',
    price: 299.99,
    category: 'Electronics',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-2')?.imageUrl || '',
    imageHint: 'modern headphones',
    stock: 22
  },
  {
    id: '3',
    name: 'Sleek Aluminum Laptop',
    description: 'The ultimate workhorse for creators. High-resolution display, powerful performance, and an ultra-slim aluminum body.',
    price: 1299.99,
    category: 'Electronics',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-3')?.imageUrl || '',
    imageHint: 'premium laptop',
    stock: 8
  },
  {
    id: '4',
    name: 'Smart Home Assistant Speaker',
    description: 'Control your entire home with your voice. Crystal clear audio and seamless integration with all your smart devices.',
    price: 129.99,
    category: 'Electronics',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-4')?.imageUrl || '',
    imageHint: 'smart speaker',
    stock: 30
  },
  {
    id: '5',
    name: 'Professional Mirrorless Camera',
    description: 'Capture life\'s best moments in stunning detail. Fast autofocus, 4K video capabilities, and professional-grade sensor.',
    price: 899.99,
    category: 'Photography',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-5')?.imageUrl || '',
    imageHint: 'mirrorless camera',
    stock: 5
  },
  {
    id: '6',
    name: 'Ergonomic Mechanical Keyboard',
    description: 'Precision typing for work and play. Custom switches, RGB backlighting, and a comfortable ergonomic design.',
    price: 149.99,
    category: 'Electronics',
    imageUrl: PlaceHolderImages.find(img => img.id === 'prod-6')?.imageUrl || '',
    imageHint: 'mechanical keyboard',
    stock: 12
  }
];