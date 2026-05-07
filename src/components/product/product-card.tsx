"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShoppingCart, ArrowRight } from 'lucide-react';
import { useCart } from '@/components/cart/cart-context';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your shopping cart.`,
    });
  };

  return (
    <Card className="group overflow-hidden border-none shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-muted">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          data-ai-hint={product.imageHint}
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors" />
        <div className="absolute bottom-4 left-4 right-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <Button className="w-full bg-white/90 backdrop-blur text-foreground hover:bg-white flex items-center gap-2 shadow-lg">
            View Details <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Link>
      <CardContent className="p-5">
        <div className="flex justify-between items-start mb-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {product.category}
          </p>
          <p className="font-headline font-bold text-primary">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <Link href={`/product/${product.id}`}>
          <h3 className="text-lg font-headline font-bold text-foreground group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2 leading-relaxed">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-5 pt-0">
        <Button 
          onClick={handleAddToCart}
          className="w-full bg-primary hover:bg-primary/90 text-white font-medium gap-2 group/btn"
        >
          <ShoppingCart className="h-4 w-4 group-hover/btn:animate-bounce" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}