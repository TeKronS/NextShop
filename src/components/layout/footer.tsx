import Link from 'next/link';
import { Rocket, ShoppingBag, Zap, Package, Twitter, Instagram, Github, LucideIcon } from 'lucide-react';
import { useLanguage } from '@/components/language/language-context';
import { BrandConfig } from '@/lib/brand-config';

const iconMap: Record<string, LucideIcon> = {
  Rocket,
  ShoppingBag,
  Zap,
  Package
};

export function Footer() {
  const { t } = useLanguage();
  const LogoIcon = iconMap[BrandConfig.logo.iconName] || Rocket;

  return (
    <footer className="bg-white border-t border-border/40 mt-auto py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <LogoIcon className="h-6 w-6 text-primary" />
              <span className="text-xl font-headline font-bold text-foreground">{BrandConfig.name}</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.desc}
            </p>
            <div className="flex gap-4">
              <a href={BrandConfig.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href={BrandConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href={BrandConfig.socials.github} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
            <div className="pt-4 text-xs text-muted-foreground space-y-1">
              <p>{BrandConfig.contact.address}</p>
              <p>{BrandConfig.contact.phone}</p>
              <p>{BrandConfig.contact.email}</p>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline font-bold text-sm mb-4 uppercase tracking-widest">{t.footer.shop}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="text-muted-foreground hover:text-primary transition-colors">{t.nav.shop}</Link></li>
              <li><Link href="/products?category=Electronics" className="text-muted-foreground hover:text-primary transition-colors">{t.nav.electronics}</Link></li>
              <li><Link href="/products?category=Accessories" className="text-muted-foreground hover:text-primary transition-colors">{t.nav.accessories}</Link></li>
              <li><Link href="/products?category=Photography" className="text-muted-foreground hover:text-primary transition-colors">{t.nav.photography}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-sm mb-4 uppercase tracking-widest">{t.footer.company}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">{t.footer.aboutUs}</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t.footer.contact}</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t.footer.careers}</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t.footer.privacy}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-headline font-bold text-sm mb-4 uppercase tracking-widest">{t.footer.support}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t.footer.shipping}</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t.footer.returns}</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary transition-colors">{t.footer.faq}</Link></li>
              <li><Link href="/admin" className="text-muted-foreground hover:text-primary transition-colors">{t.footer.adminPortal}</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border/40 mt-12 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} {BrandConfig.name}. {t.footer.allRights}
        </div>
      </div>
    </footer>
  );
}
