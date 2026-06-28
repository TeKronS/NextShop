
"use client";

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/components/language/language-context';
import { ArrowRight, Star, ShieldCheck, Zap, Loader2, Sparkles, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function Home() {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Traer los últimos 12 productos publicados
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(12));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setFeaturedProducts(prods);
      setLoading(false);
    }, (error) => {
      console.error("Error al cargar productos principales:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      
      <main className="flex-1">
        {/* Featured Products Section - Espaciado reducido en móvil */}
        <section className="pt-4 sm:pt-8 pb-12 container mx-auto px-4">
          <div className="flex flex-row justify-between items-center mb-6 border-b border-border/40 pb-4">
            <div className="flex items-center gap-3">
              <h2 className="text-xl md:text-2xl font-headline font-bold tracking-tight">
                {t.home.featuredTitle}
              </h2>
              <div className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest">
                <Sparkles className="h-3 w-3" />
                {t.hero.badge}
              </div>
            </div>
            <Link href="/products">
              <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 font-bold gap-1 p-0 h-auto">
                {t.home.browseAll} <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>

          {/* Featured Products Carousel */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-4">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-xs text-muted-foreground animate-pulse">{t.common.loading}</p>
            </div>
          ) : featuredProducts.length > 0 ? (
            <div className="relative px-4 sm:px-12">
              <Carousel
                opts={{
                  align: "start",
                  loop: true,
                }}
                className="w-full"
              >
                <CarouselContent>
                  {featuredProducts.map((product) => (
                    <CarouselItem key={product.id} className="basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4 p-2 sm:p-4">
                      <ProductCard product={product} />
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="hidden md:flex -left-6 h-10 w-10 border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-md" />
                <CarouselNext className="hidden md:flex -right-6 h-10 w-10 border-2 border-primary/20 text-primary hover:bg-primary hover:text-white transition-all shadow-md" />
              </Carousel>
            </div>
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-300 space-y-6">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                <ShoppingBag className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold">No hay productos aún</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto">Sé el primero en publicar un producto para que aparezca aquí.</p>
              </div>
              <Link href="/products/new">
                <Button variant="outline" className="rounded-xl">{t.nav.sell}</Button>
              </Link>
            </div>
          )}
        </section>

        {/* Features Row */}
        <section className="py-12 bg-white border-y border-border/40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex gap-4 items-center p-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xs uppercase tracking-wider">{t.features.secure}</h3>
                  <p className="text-[10px] text-muted-foreground">{t.features.secureDesc}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center p-4">
                <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xs uppercase tracking-wider">{t.features.fast}</h3>
                  <p className="text-[10px] text-muted-foreground">{t.features.fastDesc}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center p-4">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-xs uppercase tracking-wider">{t.features.quality}</h3>
                  <p className="text-[10px] text-muted-foreground">{t.features.qualityDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
