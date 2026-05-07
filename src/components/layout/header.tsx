"use client";

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, Rocket, Globe } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/components/cart/cart-context';
import { useLanguage } from '@/components/language/language-context';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cartCount } = useCart();
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <Rocket className="h-6 w-6 text-primary" />
                  NextShop
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">{t.nav.home}</Link>
                <Link href="/products" className="text-lg font-medium hover:text-primary transition-colors">{t.nav.shop}</Link>
                <Link href="/orders" className="text-lg font-medium hover:text-primary transition-colors">{t.nav.orders}</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform">
            <Rocket className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-headline font-bold text-foreground tracking-tight hidden sm:block">
            NextShop
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 ml-8">
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">{t.nav.shop}</Link>
          <Link href="/products?category=Electronics" className="text-sm font-medium hover:text-primary transition-colors">{t.nav.electronics}</Link>
          <Link href="/products?category=Accessories" className="text-sm font-medium hover:text-primary transition-colors">{t.nav.accessories}</Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 sm:gap-4 flex-1 justify-end">
          <div className={`hidden sm:flex items-center relative transition-all duration-300 ${isSearchOpen ? 'w-64' : 'w-10'}`}>
            <Input 
              placeholder={t.catalog.search} 
              className={`pr-10 transition-opacity duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              {isSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1 font-bold h-10 px-2" title="Change Language">
                <Globe className="h-4 w-4" />
                <span className="text-xs uppercase">{language}</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setLanguage('en')} className={language === 'en' ? 'font-bold' : ''}>
                English {language === 'en' && '✓'}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLanguage('es')} className={language === 'es' ? 'font-bold' : ''}>
                Español {language === 'es' && '✓'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative group">
              <ShoppingCart className="h-5 w-5 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px] bg-accent">
                  {cartCount}
                </Badge>
              )}
            </Button>
          </Link>

          <Link href="/orders">
            <Button variant="ghost" size="icon" className="group">
              <User className="h-5 w-5 group-hover:scale-110 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
