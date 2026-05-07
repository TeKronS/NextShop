"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from '@/components/language/language-context';
import { BrandConfig } from '@/lib/brand-config';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      toast({
        title: t.contact.success,
        description: t.contact.successDesc,
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* Hero Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">{t.contact.title}</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card className="border-none shadow-xl bg-primary text-white rounded-3xl overflow-hidden relative">
                <CardHeader className="p-8 pb-4">
                  <CardTitle className="text-2xl font-headline font-bold">{t.contact.infoTitle}</CardTitle>
                  <CardDescription className="text-primary-foreground/70">{t.contact.infoDesc}</CardDescription>
                </CardHeader>
                <CardContent className="p-8 space-y-8 relative z-10">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl">
                      <Mail className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold tracking-widest text-primary-foreground/50 mb-1">{t.contact.email}</p>
                      <p className="font-medium">{BrandConfig.contact.email}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl">
                      <Phone className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold tracking-widest text-primary-foreground/50 mb-1">{t.checkout.phone}</p>
                      <p className="font-medium">{BrandConfig.contact.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-white/10 rounded-2xl">
                      <MapPin className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase font-bold tracking-widest text-primary-foreground/50 mb-1">{t.checkout.address}</p>
                      <p className="font-medium">{BrandConfig.contact.address}</p>
                    </div>
                  </div>
                </CardContent>
                {/* Decorative circle */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              </Card>

              <div className="p-8 bg-white rounded-3xl shadow-sm border space-y-4">
                <h3 className="font-headline font-bold text-lg">Social Connect</h3>
                <p className="text-sm text-muted-foreground">Follow us for updates and tech news.</p>
                <div className="flex gap-4">
                  {/* These could be mapped from BrandConfig.socials */}
                  <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer">
                    <span className="sr-only">Social</span>
                    <div className="w-5 h-5 bg-current mask-twitter" />
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-none shadow-xl bg-white rounded-3xl p-8 md:p-12">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t.contact.name}</Label>
                        <Input id="name" placeholder={t.contact.placeholderName} required className="rounded-xl h-12 bg-slate-50 border-none" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">{t.contact.email}</Label>
                        <Input id="email" type="email" placeholder={t.contact.placeholderEmail} required className="rounded-xl h-12 bg-slate-50 border-none" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t.contact.subject}</Label>
                      <Input id="subject" placeholder={t.contact.placeholderSubject} required className="rounded-xl h-12 bg-slate-50 border-none" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t.contact.message}</Label>
                      <Textarea id="message" placeholder={t.contact.placeholderMessage} required className="rounded-xl min-h-[150px] bg-slate-50 border-none resize-none" />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90 py-6 text-lg rounded-xl h-auto gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? t.common.loading : <><Send className="h-5 w-5" /> {t.contact.send}</>}
                    </Button>
                  </form>
                ) : (
                  <div className="text-center py-12 space-y-6">
                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="h-10 w-10" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="text-3xl font-headline font-bold">{t.contact.success}</h2>
                      <p className="text-muted-foreground">{t.contact.successDesc}</p>
                    </div>
                    <Button variant="outline" onClick={() => setSubmitted(false)} className="rounded-xl">
                      Send another message
                    </Button>
                  </div>
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
