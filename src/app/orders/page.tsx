"use client";

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, ChevronRight, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

// Mock orders for UI demonstration
const MOCK_ORDERS = [
  {
    id: 'ORD-82731',
    date: '2025-02-15',
    total: 499.98,
    status: 'Delivered',
    items: [
      { name: 'Modern Minimalist Watch', price: 199.99, qty: 1 },
      { name: 'Wireless Headphones', price: 299.99, qty: 1 }
    ]
  },
  {
    id: 'ORD-91022',
    date: '2025-02-28',
    total: 129.99,
    status: 'Shipped',
    items: [
      { name: 'Smart Home Speaker', price: 129.99, qty: 1 }
    ]
  }
];

export default function OrdersPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-1">
              <h1 className="text-4xl font-headline font-bold tracking-tight">Your Orders</h1>
              <p className="text-muted-foreground">Manage and track your recent purchases.</p>
            </div>
          </div>

          <div className="space-y-6">
            {MOCK_ORDERS.length > 0 ? (
              MOCK_ORDERS.map((order) => (
                <Card key={order.id} className="border-none shadow-lg bg-white rounded-3xl overflow-hidden hover:shadow-xl transition-shadow group">
                  <div className="bg-slate-50 p-6 flex flex-wrap justify-between items-center gap-4 border-b">
                    <div className="flex gap-6">
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Order ID</p>
                        <p className="font-mono text-sm font-bold">{order.id}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Date Placed</p>
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-3 w-3 text-muted-foreground" />
                          <span>{new Date(order.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Total</p>
                        <p className="text-sm font-bold text-primary">${order.total.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge className={
                        order.status === 'Delivered' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 
                        order.status === 'Shipped' ? 'bg-blue-100 text-blue-700 hover:bg-blue-100' : 
                        'bg-slate-100 text-slate-700 hover:bg-slate-100'
                      }>
                        {order.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="group-hover:translate-x-1 transition-transform">
                        Details <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-6">
                      <div className="p-4 bg-slate-100 rounded-2xl">
                        <Package className="h-8 w-8 text-slate-400" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-headline font-bold">
                          {order.items.length} item{order.items.length > 1 ? 's' : ''}
                        </p>
                        <p className="text-sm text-muted-foreground truncate max-w-md">
                          {order.items.map(item => item.name).join(', ')}
                        </p>
                      </div>
                      <div className="hidden sm:block">
                        <Button variant="outline" className="rounded-xl">Track Shipment</Button>
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
                  <h3 className="text-2xl font-headline font-bold">No orders yet</h3>
                  <p className="text-muted-foreground">When you make a purchase, it will appear here.</p>
                </div>
                <Link href="/products">
                  <Button className="bg-primary rounded-xl px-8 h-12">Start Shopping <ArrowRight className="ml-2 h-4 w-4" /></Button>
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