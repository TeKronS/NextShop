
"use client";

import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ProductCard } from '@/components/product/product-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Filter, SlidersHorizontal, Search, Loader2, X, ArrowUpDown } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/components/language/language-context';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';
import { Slider } from '@/components/ui/slider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type SortOption = 'newest' | 'price-asc' | 'price-desc' | 'name-asc';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category');
  const initialSearch = searchParams.get('search');
  
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState(initialSearch || '');
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);

  // Sincronizar búsqueda desde la URL
  useEffect(() => {
    const s = searchParams.get('search');
    if (s !== null) setSearchTerm(s);
    const c = searchParams.get('category');
    if (c !== null) setActiveCategory(c);
  }, [searchParams]);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Product[];
      setProducts(prods);
      setLoading(false);
      
      // Ajustar rango de precio máximo basado en productos reales
      if (prods.length > 0) {
        const maxPrice = Math.max(...prods.map(p => p.price));
        setPriceRange(prev => [prev[0], Math.ceil(maxPrice)]);
      }
    }, (error) => {
      console.error("Error al cargar productos:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const categories = useMemo(() => {
    const cats = ['All', ...Array.from(new Set(products.map(p => p.category)))];
    return cats;
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesCategory && matchesSearch && matchesPrice;
    });

    // Aplicar ordenamiento
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        // Ya vienen ordenados por fecha desde Firestore, pero por si acaso:
        // result.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
        break;
    }

    return result;
  }, [activeCategory, searchTerm, priceRange, sortBy, products]);

  const resetFilters = () => {
    setSearchTerm('');
    setActiveCategory('All');
    setSortBy('newest');
    const maxPrice = products.length > 0 ? Math.max(...products.map(p => p.price)) : 2000;
    setPriceRange([0, Math.ceil(maxPrice)]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Top bar with stats and sorting */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div className="space-y-1">
            <h1 className="text-4xl font-headline font-bold tracking-tight">{t.catalog.title}</h1>
            <p className="text-muted-foreground text-sm">
              {loading ? t.common.loading : t.catalog.results.replace('{count}', filteredAndSortedProducts.length.toString())}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            <div className="relative flex-1 sm:flex-none sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder={t.catalog.search} 
                className="pl-10 rounded-xl bg-white border-none shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="rounded-xl flex items-center gap-2 bg-white border-none shadow-sm h-10 px-4">
                  <ArrowUpDown className="h-4 w-4 text-primary" />
                  <span className="hidden sm:inline">{t.catalog.sortBy}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-xl shadow-xl border-none p-2">
                <DropdownMenuLabel className="text-xs uppercase tracking-widest text-muted-foreground">Opciones de Orden</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={sortBy} onValueChange={(val) => setSortBy(val as SortOption)}>
                  <DropdownMenuRadioItem value="newest" className="rounded-lg">Más recientes</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-asc" className="rounded-lg">Precio: Menor a Mayor</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="price-desc" className="rounded-lg">Precio: Mayor a Menor</DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="name-asc" className="rounded-lg">Nombre: A-Z</DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar Filters */}
          <aside className="lg:col-span-1 space-y-10">
            {/* Category Filter */}
            <div className="space-y-6">
              <h3 className="font-headline font-bold text-lg flex items-center gap-2">
                <Filter className="h-4 w-4 text-primary" />
                {t.catalog.categories}
              </h3>
              <div className="flex flex-wrap lg:flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-left px-4 py-2.5 rounded-xl text-sm transition-all shadow-sm ${
                      activeCategory === cat 
                        ? 'bg-primary text-white font-bold' 
                        : 'bg-white text-muted-foreground hover:bg-slate-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Filter */}
            <div className="space-y-6 pt-6 border-t">
              <div className="flex justify-between items-center">
                <h3 className="font-headline font-bold text-lg">{t.catalog.priceRange}</h3>
                <Badge variant="outline" className="rounded-lg bg-white border-none shadow-sm">
                  ${priceRange[0]} - ${priceRange[1]}
                </Badge>
              </div>
              <div className="px-2">
                <Slider
                  defaultValue={[0, priceRange[1]]}
                  max={Math.max(...products.map(p => p.price), 2000)}
                  step={10}
                  value={[priceRange[0], priceRange[1]]}
                  onValueChange={(val) => setPriceRange(val as [number, number])}
                  className="py-4"
                />
              </div>
            </div>

            {/* Clear Filters Button */}
            <Button 
              variant="ghost" 
              onClick={resetFilters}
              className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-xl gap-2 h-12"
            >
              <X className="h-4 w-4" />
              {t.catalog.clearFilters}
            </Button>
          </aside>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground animate-pulse">{t.common.loading}</p>
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-white rounded-3xl shadow-sm border border-dashed border-slate-300 space-y-6">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                  <Search className="h-8 w-8" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-headline font-bold">{t.catalog.noProducts}</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    No hay productos que coincidan con tus filtros actuales. Prueba ajustando el precio o la categoría.
                  </p>
                </div>
                <Button variant="outline" onClick={resetFilters} className="rounded-xl border-primary text-primary hover:bg-primary/5">
                  {t.catalog.clearFilters}
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
