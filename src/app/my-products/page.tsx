"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from '@/components/language/language-context';
import { useAuth } from '@/components/auth/auth-context';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit3, Loader2, Package, LayoutGrid, PlusCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import Link from 'next/link';

export default function MyProductsPage() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, 'products'), where('sellerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Product[];
      setProducts(prods);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (productId: string) => {
    if (!confirm(t.myProducts.deleteConfirm)) return;

    try {
      await deleteDoc(doc(db, 'products', productId));
      toast({ title: t.myProducts.deleteSuccess });
    } catch (error: any) {
      toast({ variant: "destructive", title: "Error", description: error.message });
    }
  };

  if (authLoading || loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <h1 className="text-2xl font-bold mb-4">Auth Required</h1>
          <Link href="/login"><Button>{t.auth.loginButton}</Button></Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
                <LayoutGrid className="h-8 w-8 text-primary" />
                {t.myProducts.title}
              </h1>
              <p className="text-muted-foreground">{t.myProducts.subtitle}</p>
            </div>
            <Link href="/products/new">
              <Button className="rounded-xl gap-2 h-12 px-6 shadow-lg hover:shadow-xl transition-all">
                <PlusCircle className="h-5 w-5" />
                {t.nav.sell}
              </Button>
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl shadow-sm space-y-6">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                <Package className="h-10 w-10 text-slate-300" />
              </div>
              <p className="text-muted-foreground">{t.myProducts.noProducts}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <Card key={product.id} className="border-none shadow-lg bg-white rounded-3xl overflow-hidden group">
                  <div className="relative aspect-video bg-muted">
                    <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Badge className="bg-white/90 backdrop-blur text-primary font-bold">
                        ${product.price.toFixed(2)}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="space-y-1">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{product.category}</p>
                      <h3 className="text-lg font-bold truncate">{product.name}</h3>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <Badge variant="outline" className="rounded-lg">
                        Stock: {product.stock}
                      </Badge>
                      <div className="flex gap-2">
                        <Button size="icon" variant="ghost" className="h-10 w-10 rounded-xl text-primary hover:bg-primary/10">
                          <Edit3 className="h-4 w-4" />
                        </Button>
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
