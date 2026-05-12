
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/components/language/language-context';
import { ArrowRight, Star, ShieldCheck, Zap, Loader2, Sparkles, ShoppingBag } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';

export default function Home() {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Traer los últimos 12 productos publicados para dar más volumen a la principal
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
        {/* Page Title Section */}
        <section className="pt-16 pb-8 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-8 border-b border-border/40 pb-8">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest">
                <Sparkles className="h-3 w-3" />
                {t.hero.badge}
              </div>
              <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
                {t.home.featuredTitle}
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                {t.home.featuredDesc}
              </p>
            </div>
            <Link href="/products">
              <Button className="rounded-xl h-12 px-6 gap-2 shadow-lg hover:shadow-xl transition-all">
                {t.home.browseAll} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {/* Featured Products Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground animate-pulse">{t.common.loading}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-32 text-center bg-white rounded-3xl border border-dashed border-slate-300 space-y-6">
                  <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
                    <ShoppingBag className="h-10 w-10" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">No hay productos destacados</h3>
                    <p className="text-muted-foreground max-w-xs mx-auto">Sé el primero en publicar un producto para que aparezca aquí.</p>
                  </div>
                  <Link href="/products/new">
                    <Button variant="outline" className="rounded-xl">{t.nav.sell}</Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Features Row - Now placed more discreetly below products */}
        <section className="py-16 bg-white/50 border-y border-border/40 mt-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex gap-4 items-center justify-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm uppercase tracking-wider">{t.features.secure}</h3>
                  <p className="text-xs text-muted-foreground">{t.features.secureDesc}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm uppercase tracking-wider">{t.features.fast}</h3>
                  <p className="text-xs text-muted-foreground">{t.features.fastDesc}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center justify-center p-6 bg-white rounded-2xl shadow-sm">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-sm uppercase tracking-wider">{t.features.quality}</h3>
                  <p className="text-xs text-muted-foreground">{t.features.qualityDesc}</p>
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
