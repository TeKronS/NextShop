"use client";

import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useCart } from '@/components/cart/cart-context';
import { useLanguage } from '@/components/language/language-context';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, cartTotal, cartCount } = useCart();
  const { t } = useLanguage();

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
              <h1 className="text-2xl font-headline font-bold">{t.cart.empty}</h1>
              <p className="text-muted-foreground">{t.cart.emptyDesc}</p>
            </div>
            <Link href="/products" className="block">
              <Button className="w-full bg-primary py-6 text-lg rounded-xl h-auto">
                {t.cart.startShopping}
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
        <h1 className="text-3xl font-headline font-bold mb-8">
          {t.cart.title} ({t.cart.itemsCount.replace('{count}', cartCount.toString())})
        </h1>
        
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
                          {t.cart.remove}
                        </Button>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-headline font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-xs text-muted-foreground">${item.price.toFixed(2)} {t.common.qty}</p>
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
              <h2 className="text-xl font-headline font-bold">{t.cart.summary}</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.cart.subtotal}</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.cart.shipping}</span>
                  <span className="text-green-600 font-medium">{t.cart.free}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.cart.tax}</span>
                  <span className="font-medium">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-headline font-bold">
                  <span>{t.cart.total}</span>
                  <span className="text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 py-6 text-lg rounded-xl h-auto gap-2">
                  {t.cart.checkout} <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
