"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Users, BarChart3, ArrowRight, Loader2 } from 'lucide-react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/components/auth/auth-context';

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [productCount, setProductCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    // Obtener el conteo real de productos del usuario
    const q = query(collection(db, 'products'), where('sellerId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProductCount(snapshot.size);
      setLoading(false);
    }, (error) => {
      console.error("Error al obtener estadísticas de productos:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const stats = [
    { label: 'Mis Ventas', value: '$0.00', icon: BarChart3, trend: '+0%' },
    { label: 'Productos Publicados', value: productCount.toString(), icon: Package, trend: 'En tiempo real' },
    { label: 'Vistas Totales', value: '452', icon: Users, trend: '+12%' },
  ];

  if (authLoading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Gestiona tus productos y visualiza el rendimiento de tus ventas.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-8 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-headline font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600 font-bold">{stat.trend}</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                    <stat.icon className="h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Core Tools */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-none shadow-xl rounded-3xl bg-white overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-headline font-bold flex items-center gap-3">
                  <Package className="h-6 w-6 text-primary" />
                  Gestión de Inventario
                </CardTitle>
                <CardDescription>
                  Añade nuevos artículos y gestiona tus publicaciones activas.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-4">
                <Link href="/products/new" className="block">
                  <Button className="w-full bg-primary hover:bg-primary/90 rounded-xl h-12 font-bold">
                    Publicar Nuevo Producto
                  </Button>
                </Link>
                <Link href="/my-products" className="block">
                  <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-primary text-primary hover:bg-primary/5">
                    Ver Mis Productos <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-none shadow-xl rounded-3xl bg-white overflow-hidden">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-headline font-bold flex items-center gap-3">
                  <Sparkles className="h-6 w-6 text-accent" />
                  Herramientas IA
                </CardTitle>
                <CardDescription>
                  Potencia tus ventas con inteligencia artificial.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0 space-y-4">
                <Link href="/admin/generate-desc" className="block">
                  <Button variant="outline" className="w-full rounded-xl h-12 font-bold border-accent text-accent hover:bg-accent/5">
                    Generador de Descripciones <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}