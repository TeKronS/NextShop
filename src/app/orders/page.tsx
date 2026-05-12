"use client";

import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from '@/components/language/language-context';
import { useAuth } from '@/components/auth/auth-context';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, ChevronRight, Calendar, ShoppingBag, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function OrdersPage() {
  const { t } = useLanguage();
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, 'orders'), 
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(fetchedOrders);
      setLoading(false);
    }, (error) => {
      console.error("Error en el escuchador de pedidos:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

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
      <div className="flex flex-col min-h-screen bg-[#f8fafc]">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4 py-24 text-center space-y-6">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-300">
            <ShoppingBag className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-headline font-bold">Identificación necesaria</h1>
          <p className="text-muted-foreground max-w-sm mx-auto">Debes iniciar sesión para ver tu historial de pedidos.</p>
          <Link href="/login">
            <Button className="px-8 rounded-xl">{t.auth.loginButton}</Button>
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
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-1">
              <h1 className="text-4xl font-headline font-bold tracking-tight">{t.orders.title}</h1>
              <p className="text-muted-foreground">{t.orders.subtitle}</p>
            </div>
          </div>

          <div className="space-y-6">
            {orders.length > 0 ? (
              orders.map((order) => (
                <Card key={order.id} className="border-none shadow-lg bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="bg-slate-50 p-6 flex flex-wrap justify-between items-center gap-4 border-b">
                    <div className="flex gap-6">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{t.orders.orderId}</p>
                        <p className="font-mono text-xs font-bold truncate max-w-[100px]">{order.id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{t.orders.datePlaced}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{order.createdAt?.toDate().toLocaleDateString() || 'N/A'}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">{t.orders.total}</p>
                        <p className="text-sm font-bold text-primary">${order.total?.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                        order.status === 'Processing' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : 
                        'bg-slate-100 text-slate-700 hover:bg-slate-100'
                      }>
                        {order.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                        {t.orders.details} <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-slate-100 rounded-2xl shrink-0">
                        <Package className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="flex-1 space-y-1 min-w-0">
                        <p className="font-headline font-bold">
                          {order.items?.length || 0} {t.common.qty}
                        </p>
                        <p className="text-sm text-muted-foreground truncate max-w-md">
                          {order.items?.map((item: any) => item.name).join(', ')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-24 bg-white rounded-3xl shadow-sm space-y-6">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="h-10 w-10 text-slate-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold">{t.orders.noOrders}</h3>
                  <p className="text-muted-foreground">{t.orders.noOrdersDesc}</p>
                </div>
                <Link href="/products">
                  <Button className="bg-primary rounded-xl px-8 h-12">{t.cart.startShopping} <ArrowRight className="ml-2 h-4 w-4" /></Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}