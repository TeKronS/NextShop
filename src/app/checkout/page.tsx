"use client";

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useCart } from '@/components/cart/cart-context';
import { useLanguage } from '@/components/language/language-context';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardTitle } from '@/components/ui/card';
import { CheckCircle, CreditCard, Truck, ShieldCheck, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { t } = useLanguage();
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleCheckoutComplete = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Inicia sesión",
        description: "Debes estar identificado para realizar una compra.",
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Guardar el pedido en Firestore
      await addDoc(collection(db, 'orders'), {
        userId: user.uid,
        items: cart.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          imageUrl: item.imageUrl
        })),
        total: cartTotal,
        status: 'Processing',
        createdAt: serverTimestamp()
      });

      toast({
        title: t.checkout.orderPlaced,
        description: t.checkout.orderSuccessDesc,
      });
      clearCart();
      router.push('/orders');
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error al procesar",
        description: "No pudimos completar tu pedido en este momento.",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4">
          <p className="text-lg mb-4">{t.cart.empty}</p>
          <Link href="/products">
            <Button>{t.cart.startShopping}</Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 -z-10" />
            <div className={`flex flex-col items-center gap-2 bg-[#f8fafc] px-4 ${step >= 1 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 1 ? 'border-primary bg-primary text-white' : 'border-muted bg-white'}`}>
                1
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">{t.checkout.shipping}</span>
            </div>
            <div className={`flex flex-col items-center gap-2 bg-[#f8fafc] px-4 ${step >= 2 ? 'text-primary' : 'text-muted-foreground'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${step >= 2 ? 'border-primary bg-primary text-white' : 'border-muted bg-white'}`}>
                2
              </div>
              <span className="text-xs font-bold uppercase tracking-wider">{t.checkout.payment}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {step === 1 && (
                <Card className="border-none shadow-xl bg-white rounded-3xl p-8">
                  <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
                    <Truck className="h-6 w-6 text-primary" />
                    {t.checkout.shippingInfo}
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t.checkout.firstName}</Label>
                        <Input className="rounded-xl" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label>{t.checkout.lastName}</Label>
                        <Input className="rounded-xl" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>{t.checkout.address}</Label>
                      <Input className="rounded-xl" placeholder="123 Modern Ave" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t.checkout.city}</Label>
                        <Input className="rounded-xl" placeholder="Design City" />
                      </div>
                      <div className="space-y-2">
                        <Label>{t.checkout.zip}</Label>
                        <Input className="rounded-xl" placeholder="10101" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>{t.checkout.phone}</Label>
                      <Input className="rounded-xl" placeholder="+1 (555) 000-0000" />
                    </div>
                    <Button 
                      className="w-full bg-primary py-6 rounded-xl h-auto text-lg gap-2"
                      onClick={() => setStep(2)}
                    >
                      {t.checkout.continuePayment} <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </Card>
              )}

              {step === 2 && (
                <Card className="border-none shadow-xl bg-white rounded-3xl p-8">
                  <h2 className="text-2xl font-headline font-bold mb-6 flex items-center gap-2">
                    <CreditCard className="h-6 w-6 text-primary" />
                    {t.checkout.paymentDetails}
                  </h2>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label>{t.checkout.cardName}</Label>
                      <Input className="rounded-xl" placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label>{t.checkout.cardNumber}</Label>
                      <Input className="rounded-xl" placeholder="0000 0000 0000 0000" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>{t.checkout.expiry}</Label>
                        <Input className="rounded-xl" placeholder="MM/YY" />
                      </div>
                      <div className="space-y-2">
                        <Label>{t.checkout.cvc}</Label>
                        <Input className="rounded-xl" placeholder="123" />
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button 
                        variant="outline" 
                        className="flex-1 py-6 rounded-xl h-auto gap-2"
                        disabled={isProcessing}
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft className="h-4 w-4" /> {t.checkout.back}
                      </Button>
                      <Button 
                        className="flex-[2] bg-primary py-6 rounded-xl h-auto text-lg gap-2"
                        disabled={isProcessing}
                        onClick={handleCheckoutComplete}
                      >
                        {isProcessing ? <Loader2 className="h-5 w-5 animate-spin" /> : <CheckCircle className="h-5 w-5" />}
                        {isProcessing ? "Procesando..." : t.checkout.placeOrder}
                      </Button>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            {/* Side summary */}
            <div className="space-y-6">
              <Card className="border-none shadow-xl bg-white rounded-3xl p-6">
                <CardTitle className="font-headline font-bold mb-4">{t.cart.summary}</CardTitle>
                <div className="space-y-4 max-h-[300px] overflow-auto pr-2 mb-6">
                  {cart.map(item => (
                    <div key={item.id} className="flex gap-3 text-sm">
                      <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden shrink-0 relative">
                        <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{item.name}</p>
                        <p className="text-muted-foreground">{t.common.qty}: {item.quantity}</p>
                      </div>
                      <p className="font-bold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.cart.subtotal}</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t.cart.shipping}</span>
                    <span className="text-green-600">{t.cart.free}</span>
                  </div>
                  <div className="flex justify-between text-xl font-headline font-bold text-primary pt-2">
                    <span>{t.cart.total}</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
              </Card>

              <div className="bg-slate-100/50 p-6 rounded-2xl border border-slate-200 flex gap-4 items-center">
                <ShieldCheck className="h-8 w-8 text-primary shrink-0" />
                <p className="text-[10px] text-muted-foreground leading-relaxed uppercase tracking-widest font-bold">
                  {t.checkout.secureCheckout}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}