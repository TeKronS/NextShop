"use client";

import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/product/product-card';
import { MOCK_PRODUCTS } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useMemo } from 'react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'All');

  const categories = ['All', ...Array.from(new Set(MOCK_PRODUCTS.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold tracking-tight">Product Catalog</h1>
            <p className="text-muted-foreground">Showing {filteredProducts.length} results</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search catalog..." 
                className="pl-10 rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" className="rounded-xl flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Sort
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-8 hidden lg:block">
            <div>
              <h3 className="font-headline font-bold mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Categories
              </h3>
              <div className="flex flex-col gap-1">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                      activeCategory === cat 
                        ? 'bg-primary text-white font-medium' 
                        : 'text-muted-foreground hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-headline font-bold mb-4">Price Range</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="Min" className="rounded-lg h-9" />
                  <Input type="number" placeholder="Max" className="rounded-lg h-9" />
                </div>
                <Button className="w-full h-9 rounded-lg" variant="secondary">Apply</Button>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-4">
            {/* Mobile Categories */}
            <div className="lg:hidden flex overflow-x-auto gap-2 mb-8 pb-2 no-scrollbar">
              {categories.map(cat => (
                <Badge
                  key={cat}
                  variant={activeCategory === cat ? 'default' : 'outline'}
                  className="cursor-pointer px-4 py-2 text-sm whitespace-nowrap rounded-full"
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center space-y-4">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-headline font-bold">No products found</h3>
                <p className="text-muted-foreground max-w-xs mx-auto">
                  Try adjusting your search or category filter to find what you're looking for.
                </p>
                <Button variant="outline" onClick={() => {setSearchTerm(''); setActiveCategory('All');}}>
                  Clear all filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}