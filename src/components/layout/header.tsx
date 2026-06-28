"use client";

import Link from 'next/link';
import { ShoppingCart, User, Search, Menu, X, Globe, LucideIcon, Rocket, ShoppingBag, Zap, Package, LogOut, PackageSearch, LogIn, PlusCircle, LayoutGrid } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '@/components/cart/cart-context';
import { useLanguage } from '@/components/language/language-context';
import { useAuth } from '@/components/auth/auth-context';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { BrandConfig } from '@/lib/brand-config';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  ShoppingBag,
  Zap,
  Package
};

export function Header() {
  const router = useRouter();
  const { cartCount } = useCart();
  const { language, setLanguage, t } = useLanguage();
  const { user, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  
  const LogoIcon = iconMap[BrandConfig.logo.iconName] || Rocket;

  const getUserInitials = () => {
    if (!user?.displayName) return 'U';
    return user.displayName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsMobileSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        {/* Mobile Menu & Logo Container */}
        <div className="flex items-center gap-2">
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
                    <LogoIcon className="h-6 w-6 text-primary" />
                    {BrandConfig.name}
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-8">
                  <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">{t.nav.home}</Link>
                  <Link href="/products" className="text-lg font-medium hover:text-primary transition-colors">{t.nav.shop}</Link>
                  <Link href="/products/new" className="text-lg font-medium hover:text-primary transition-colors font-bold text-accent">{t.nav.sell}</Link>
                  <Link href="/orders" className="text-lg font-medium hover:text-primary transition-colors">{t.nav.orders}</Link>
                  {user && <Link href="/my-products" className="text-lg font-medium hover:text-primary transition-colors">{t.nav.myProducts}</Link>}
                  {!user && (
                    <>
                      <Link href="/login" className="text-lg font-medium hover:text-primary transition-colors">{t.auth.loginTitle}</Link>
                      <Link href="/register" className="text-lg font-medium hover:text-primary transition-colors">{t.auth.registerTitle}</Link>
                    </>
                  )}
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <div className="bg-primary p-2 rounded-xl group-hover:rotate-12 transition-transform shadow-sm">
              <LogoIcon className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-headline font-bold text-foreground tracking-tight hidden lg:block">
              {BrandConfig.name}
            </span>
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 shrink-0">
          <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">{t.nav.shop}</Link>
          <Link href="/products/new" className="flex items-center gap-2 text-sm font-bold text-accent hover:text-accent/80 transition-colors">
            <PlusCircle className="h-4 w-4" />
            <span className="hidden lg:inline">{t.nav.sell}</span>
          </Link>
        </nav>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.catalog.search} 
            className="w-full pl-10 bg-slate-50 border border-slate-200 focus-visible:ring-primary rounded-xl shadow-sm transition-all focus:bg-white"
          />
        </form>

        {/* Actions */}
        <div className="flex items-center gap-1 sm:gap-4 shrink-0">
          {/* Mobile Search Icon */}
          <div className="sm:hidden">
            <Sheet open={isMobileSearchOpen} onOpenChange={setIsMobileSearchOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <Search className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="top" className="h-20 flex items-center px-4 border-b">
                <form onSubmit={handleSearchSubmit} className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t.catalog.search} 
                    className="w-full pl-10 bg-slate-50 border border-slate-200 rounded-xl focus-visible:ring-primary"
                    autoFocus
                  />
                </form>
              </SheetContent>
            </Sheet>
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

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full border border-border/50">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-white text-xs">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 shadow-2xl border-none">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-bold leading-none">{user.displayName || user.email}</p>
                    <p className="text-[10px] leading-none text-muted-foreground truncate">{user.email}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="cursor-pointer rounded-xl p-3">
                    <PackageSearch className="mr-2 h-4 w-4 text-primary" />
                    <span>{t.nav.orders}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/my-products" className="cursor-pointer rounded-xl p-3">
                    <LayoutGrid className="mr-2 h-4 w-4 text-primary" />
                    <span>{t.nav.myProducts}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/products/new" className="cursor-pointer text-accent font-bold rounded-xl p-3">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>{t.nav.sell}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => logout()} className="text-destructive focus:text-destructive cursor-pointer rounded-xl p-3">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{t.auth.logout}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="ghost" size="icon" className="group rounded-full bg-slate-50 hover:bg-primary hover:text-white transition-all border border-slate-200 shadow-sm">
                <LogIn className="h-5 w-5 group-hover:scale-110" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
