import Link from 'next/link';
import { Rocket, Twitter, Instagram, Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-white border-t border-border/40 mt-auto py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Rocket className="h-6 w-6 text-primary" />
              <span className="text-xl font-headline font-bold text-foreground">NextShop</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium tech and lifestyle products curated for the modern professional. Built with reliability and elegance.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram className="h-5 w-5" /></Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors"><Github className="h-5 w-5" /></Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-sm mb-4 uppercase tracking-widest">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/products?category=Electronics" className="text-muted-foreground hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=Accessories" className="text-muted-foreground hover:text-primary transition-colors">Accessories</Link></li>
              <li><Link href="/products?category=Photography" className="text-muted-foreground hover:text-primary transition-colors">Photography</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-sm mb-4 uppercase tracking-widest">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-sm mb-4 uppercase tracking-widest">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Returns</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQ</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">Admin Portal</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 mt-12 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} NextShop. All rights reserved. Professional E-commerce Platform.
        </div>
      </div>
    </footer>
  );
}