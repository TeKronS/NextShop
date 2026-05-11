"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/product/product-card';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useLanguage } from '@/components/language/language-context';
import { ArrowRight, Star, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';

export default function Home() {
  const { t } = useLanguage();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-main')?.imageUrl || '';

  useEffect(() => {
    // Traer los últimos 6 productos publicados
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'), limit(6));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setFeaturedProducts(prods);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center overflow-hidden bg-slate-900">
          <Image 
            src={heroImage} 
            alt="Hero Background" 
            fill 
            className="object-cover opacity-60" 
            data-ai-hint="tech lifestyle"
            priority
          />
          <div className="container mx-auto px-4 relative z-10 text-white">
            <div className="max-w-2xl space-y-6 animate-in fade-in slide-in-from-left-8 duration-700">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 border border-accent/30 text-accent font-medium text-sm backdrop-blur">
                <Zap className="h-4 w-4" />
                <span>{t.hero.badge}</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-headline font-bold leading-tight">
                {t.hero.title}
              </h1>
              <p className="text-lg text-slate-200 leading-relaxed max-w-xl">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <Link href="/products">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-xl h-auto">
                    {t.hero.shopNow} <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-6 text-lg rounded-xl h-auto backdrop-blur">
                    {t.hero.viewCategories}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white border-b border-border/40">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg mb-1">{t.features.secure}</h3>
                  <p className="text-sm text-muted-foreground">{t.features.secureDesc}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-accent/10 rounded-2xl text-accent">
                  <Zap className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg mb-1">{t.features.fast}</h3>
                  <p className="text-sm text-muted-foreground">{t.features.fastDesc}</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                  <Star className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-headline font-bold text-lg mb-1">{t.features.quality}</h3>
                  <p className="text-sm text-muted-foreground">{t.features.qualityDesc}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-24 container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight">{t.home.featuredTitle}</h2>
              <p className="text-muted-foreground max-w-lg">
                {t.home.featuredDesc}
              </p>
            </div>
            <Link href="/products">
              <Button variant="ghost" className="text-primary hover:text-primary hover:bg-primary/5 group">
                {t.home.browseAll} <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.length > 0 ? (
                featuredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-muted-foreground">
                  No hay productos disponibles todavía. ¡Sé el primero en vender uno!
                </div>
              )}
            </div>
          )}
        </section>

        {/* Newsletter / CTA Section */}
        <section className="py-24 bg-primary text-white overflow-hidden relative">
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-2xl mx-auto space-y-8">
              <h2 className="text-4xl font-headline font-bold">{t.home.newsletterTitle}</h2>
              <p className="text-primary-foreground/80 text-lg">
                {t.home.newsletterSubtitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder={t.home.emailPlaceholder}
                  className="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/30 backdrop-blur"
                />
                <Button className="bg-white text-primary hover:bg-slate-100 rounded-xl px-8 py-3 h-auto font-bold">
                  {t.home.subscribe}
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        </section>
      </main>

      <Footer />
    </div>
  );
}
