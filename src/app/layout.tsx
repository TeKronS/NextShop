import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from '@/components/cart/cart-context';
import { LanguageProvider } from '@/components/language/language-context';
import { AuthProvider } from '@/components/auth/auth-context';
import { BrandConfig } from '@/lib/brand-config';

export const metadata: Metadata = {
  title: {
    default: `${BrandConfig.name} | Premium AI-Powered E-commerce`,
    template: `%s | ${BrandConfig.name}`
  },
  description: BrandConfig.description,
  keywords: ["Next.js", "React", "E-commerce", "AI", "Genkit", "TailwindCSS", "Firebase"],
  authors: [{ name: "NextShop Team" }],
  creator: "NextShop Professional Platform",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://nextshop-demo.vercel.app",
    title: BrandConfig.name,
    description: BrandConfig.description,
    siteName: BrandConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: BrandConfig.name,
    description: BrandConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Grotesk:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen">
        <LanguageProvider>
          <AuthProvider>
            <CartProvider>
              {children}
              <Toaster />
            </CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
