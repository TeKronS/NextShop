"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from '@/components/language/language-context';
import { useCart } from '@/components/cart/cart-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Loader2, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Info,
  Battery,
  Ruler,
  Tag,
  LayoutGrid
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      toast({
        title: t.common.addedToCart,
        description: t.common.addedToCartDesc.replace('{name}', product.name),
      });
    }
  };

  if (loading) {
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

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <h1 className="text-2xl font-bold">Producto no encontrado</h1>
          <Link href="/products">
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.catalog.clearFilters.split(' ')[0]} {t.catalog.title}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-xl border border-white">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                fill 
                className="object-cover"
                data-ai-hint={product.imageHint || "product image"}
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-none rounded-full px-4 py-1">
                {product.category} {product.subcategory && `/ ${product.subcategory}`}
              </Badge>
              <h1 className="text-4xl md:text-5xl font-headline font-bold leading-tight">{product.name}</h1>
              <div className="flex items-center gap-4">
                <p className="text-3xl font-headline font-bold text-primary">${product.price.toFixed(2)}</p>
                {product.stock > 0 ? (
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">En Stock ({product.stock})</Badge>
                ) : (
                  <Badge variant="destructive">Agotado</Badge>
                )}
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-lg font-bold flex items-center gap-2">
                <Info className="h-5 w-5 text-primary" />
                {t.sell.description}
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                onClick={handleAddToCart}
                size="lg" 
                className="flex-1 bg-primary hover:bg-primary/90 text-white py-8 text-xl rounded-2xl h-auto gap-3 shadow-xl"
                disabled={product.stock <= 0}
              >
                <ShoppingCart className="h-6 w-6" />
                {t.common.addToCart}
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border/40">
                <ShieldCheck className="h-5 w-5 text-green-600" />
                <span className="text-xs font-bold uppercase tracking-wider">Garantía Real</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border/40">
                <Truck className="h-5 w-5 text-blue-600" />
                <span className="text-xs font-bold uppercase tracking-wider">Envío Seguro</span>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white rounded-2xl border border-border/40">
                <RotateCcw className="h-5 w-5 text-orange-600" />
                <span className="text-xs font-bold uppercase tracking-wider">Devolución 30d</span>
              </div>
            </div>
          </div>
        </div>

        {/* Specifications Table */}
        {product.specifications && Object.values(product.specifications).some(v => !!v) && (
          <div className="mt-24 space-y-8">
            <h2 className="text-3xl font-headline font-bold border-b pb-4">{t.sell.specs}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.specifications.weight && (
                <Card className="border-none shadow-sm bg-white rounded-2xl">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-xl"><Tag className="h-5 w-5 text-slate-500" /></div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{t.sell.weight}</p>
                      <p className="font-bold">{product.specifications.weight}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {product.specifications.size && (
                <Card className="border-none shadow-sm bg-white rounded-2xl">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-xl"><Ruler className="h-5 w-5 text-slate-500" /></div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{t.sell.size}</p>
                      <p className="font-bold">{product.specifications.size}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {product.specifications.color && (
                <Card className="border-none shadow-sm bg-white rounded-2xl">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-xl"><LayoutGrid className="h-5 w-5 text-slate-500" /></div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{t.sell.color}</p>
                      <p className="font-bold">{product.specifications.color}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {product.specifications.batteryLife && (
                <Card className="border-none shadow-sm bg-white rounded-2xl">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-xl"><Battery className="h-5 w-5 text-slate-500" /></div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{t.sell.batteryDuration}</p>
                      <p className="font-bold">{product.specifications.batteryLife}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {product.specifications.batteryCapacity && (
                <Card className="border-none shadow-sm bg-white rounded-2xl">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-xl"><Battery className="h-5 w-5 text-slate-500" /></div>
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{t.sell.batteryCapacity}</p>
                      <p className="font-bold">{product.specifications.batteryCapacity}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            
            {product.specifications.techSpecs && (
              <Card className="border-none shadow-sm bg-white rounded-2xl">
                <CardContent className="p-8 space-y-4">
                  <h3 className="font-bold text-lg uppercase tracking-wider">{t.sell.techSpecs}</h3>
                  <div className="p-6 bg-slate-50 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap font-mono">
                    {product.specifications.techSpecs}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
