
import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Package, Users, BarChart3, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { label: 'Total Revenue', value: '$12,450', icon: BarChart3, trend: '+12.5%' },
    { label: 'Active Orders', value: '24', icon: Package, trend: '+4' },
    { label: 'Customers', value: '1,204', icon: Users, trend: '+85' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold tracking-tight">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage your store products, orders, and business metrics.</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat) => (
              <Card key={stat.label} className="border-none shadow-lg rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-8 flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">{stat.label}</p>
                    <p className="text-3xl font-headline font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600 font-bold">{stat.trend} from last month</p>
                  </div>
                  <div className="p-4 bg-primary/10 rounded-2xl text-primary">
                    <stat.icon className="h-8 w-8" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Core Tools */}
          <div className="grid grid-cols-1 gap-8">
            <Card className="border-none shadow-xl rounded-3xl bg-white overflow-hidden max-w-2xl">
              <CardHeader className="p-8">
                <CardTitle className="text-2xl font-headline font-bold flex items-center gap-3">
                  <Package className="h-6 w-6 text-primary" />
                  Inventory Manager
                </CardTitle>
                <CardDescription>
                  Update stock levels, add new items, and organize categories.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                <div className="space-y-4 mb-8">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border">
                    <span className="text-sm font-medium">Low Stock Alerts</span>
                    <Badge variant="destructive">5 Items</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border">
                    <span className="text-sm font-medium">Draft Products</span>
                    <Badge variant="outline">12 Items</Badge>
                  </div>
                </div>
                <Link href="/products">
                  <Button variant="outline" className="rounded-xl px-8 h-12 font-bold w-full sm:w-auto border-primary text-primary hover:bg-primary/5">
                    View Catalog <ArrowRight className="ml-2 h-4 w-4" />
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
