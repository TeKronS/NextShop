"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useCart } from '@/components/cart/cart-context';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-12 rounded-3xl shadow-sm text-center max-w-md w-full space-y-6">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="h-10 w-10 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-headline font-bold">Your cart is empty</h1>
              <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
            </div>
            <Link href="/products" className="block">
              <Button className="w-full bg-primary py-6 text-lg rounded-xl h-auto">
                Start Shopping
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <h1 className="text-3xl font-headline font-bold mb-8">Your Shopping Cart ({cartCount} items)</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-border/40 overflow-hidden">
              {cart.map((item, idx) => (
                <div key={item.id}>
                  <div className="p-6 flex gap-6 items-center">
                    <div className="relative w-24 h-24 bg-muted rounded-xl overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                        data-ai-hint={item.imageHint}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors">
                        <h3 className="font-headline font-bold text-lg truncate">{item.name}</h3>
                      </Link>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border rounded-lg bg-slate-50">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-headline font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} each</p>
                    </div>
                  </div>
                  {idx < cart.length - 1 && <Separator />}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-border/40 space-y-6">
              <h2 className="text-xl font-headline font-bold">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-headline font-bold">
                  <span>Total</span>
                  <span className="text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 py-6 text-lg rounded-xl h-auto gap-2">
                  Checkout Now <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-dashed border-muted flex gap-4 items-center">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <ShieldCheck className="h-6 w-6 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your data is protected by industry-standard encryption. Shop with confidence.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ShieldCheck(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.5 3.8 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}