"use client";

import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from '@/components/language/language-context';
import { BrandConfig } from '@/lib/brand-config';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ShieldCheck, Zap, Star, Target, Users, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function AboutPage() {
  const { t } = useLanguage();
  const aboutImage = PlaceHolderImages.find(img => img.id === 'hero-main')?.imageUrl || '';

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center overflow-hidden bg-slate-900">
          <Image 
            src={aboutImage} 
            alt="About Us Background" 
            fill 
            className="object-cover opacity-50" 
            data-ai-hint="modern office workspace"
          />
          <div className="container mx-auto px-4 relative z-10 text-white text-center">
            <h1 className="text-5xl md:text-7xl font-headline font-bold mb-4">{t.about.title}</h1>
            <p className="text-xl text-slate-200 max-w-2xl mx-auto">{t.about.subtitle}</p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest">
                  <Target className="h-4 w-4" />
                  {t.about.mission}
                </div>
                <h2 className="text-3xl font-headline font-bold">{t.about.mission}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{t.about.missionText}</p>
              </div>

              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent font-bold text-xs uppercase tracking-widest">
                  <Sparkles className="h-4 w-4" />
                  {t.about.vision}
                </div>
                <h2 className="text-3xl font-headline font-bold">{t.about.vision}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{t.about.visionText}</p>
              </div>
            </div>
            
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://picsum.photos/seed/about-team/800/800" 
                alt="Our Team" 
                fill 
                className="object-cover"
                data-ai-hint="creative team working"
              />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-24 bg-white border-y border-border/40">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-4xl font-headline font-bold mb-4">Our Core Values</h2>
              <p className="text-muted-foreground">The principles that guide every decision at {BrandConfig.name}.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-none shadow-xl bg-slate-50 rounded-3xl p-8 hover:-translate-y-2 transition-transform">
                <CardContent className="p-0 space-y-4 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                    <ShieldCheck className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-headline font-bold">{t.about.values.quality}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.about.values.qualityText}</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-slate-50 rounded-3xl p-8 hover:-translate-y-2 transition-transform">
                <CardContent className="p-0 space-y-4 text-center">
                  <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto text-accent">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-headline font-bold">{t.about.values.design}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.about.values.designText}</p>
                </CardContent>
              </Card>

              <Card className="border-none shadow-xl bg-slate-50 rounded-3xl p-8 hover:-translate-y-2 transition-transform">
                <CardContent className="p-0 space-y-4 text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto text-primary">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-headline font-bold">{t.about.values.community}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{t.about.values.communityText}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
