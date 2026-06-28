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
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 sm:py-12">
        <h1 className="text-2xl sm:text-3xl font-headline font-bold mb-8">
          {t.cart.title} ({t.cart.itemsCount.replace('{count}', cartCount.toString())})
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl shadow-sm border border-border/40 overflow-hidden">
              {cart.map((item, idx) => (
                <div key={item.id}>
                  <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center">
                    {/* Image Container */}
                    <div className="relative w-full sm:w-24 h-48 sm:h-24 bg-muted rounded-2xl overflow-hidden flex-shrink-0">
                      <Image 
                        src={item.imageUrl} 
                        alt={item.name} 
                        fill 
                        className="object-cover" 
                        data-ai-hint={item.imageHint}
                      />
                    </div>
                    
                    {/* Content Container */}
                    <div className="flex-1 min-w-0 w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <Link href={`/product/${item.id}`} className="hover:text-primary transition-colors block">
                          <h3 className="font-headline font-bold text-lg leading-tight truncate">{item.name}</h3>
                        </Link>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{item.category}</p>
                        
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-9 w-9 hover:bg-white"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-10 text-center text-sm font-bold">{item.quantity}</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-9 w-9 hover:bg-white"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive hover:bg-destructive/10 rounded-xl px-3"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">{t.cart.remove}</span>
                          </Button>
                        </div>
                      </div>

                      <div className="sm:text-right flex flex-row sm:flex-col justify-between items-center sm:items-end flex-shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                        <p className="font-headline font-bold text-xl text-primary">${(item.price * item.quantity).toFixed(2)}</p>
                        <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">${item.price.toFixed(2)} {t.common.qty}</p>
                      </div>
                    </div>
                  </div>
                  {idx < cart.length - 1 && <Separator className="bg-slate-50" />}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-border/40 space-y-6 sticky top-24">
              <h2 className="text-xl font-headline font-bold">{t.cart.summary}</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.cart.subtotal}</span>
                  <span className="font-bold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.cart.shipping}</span>
                  <span className="text-green-600 font-bold uppercase tracking-widest text-[10px] bg-green-50 px-2 py-1 rounded-lg">{t.cart.free}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{t.cart.tax}</span>
                  <span className="font-bold">$0.00</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-headline font-bold">
                  <span>{t.cart.total}</span>
                  <span className="text-primary">${cartTotal.toFixed(2)}</span>
                </div>
              </div>
              <Link href="/checkout" className="block">
                <Button className="w-full bg-primary hover:bg-primary/90 py-6 text-lg rounded-2xl h-auto gap-2 shadow-lg shadow-primary/20">
                  {t.cart.checkout} <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <div className="text-center">
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Pago 100% Seguro Garantizado</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
