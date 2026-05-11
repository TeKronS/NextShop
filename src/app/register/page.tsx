"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from '@/components/language/language-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, Loader2 } from 'lucide-react';

export default function RegisterPage() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      toast({
        title: t.auth.registerSuccess,
        description: t.auth.registerSuccessDesc,
      });
      router.push('/');
    } catch (error: any) {
      console.error(error);
      let errorMessage = error.message;
      
      if (error.code === 'auth/configuration-not-found') {
        errorMessage = "Email/Password authentication is not enabled in the Firebase Console. Please enable it under Build > Authentication > Sign-in method.";
      }

      toast({
        variant: "destructive",
        title: t.auth.registerError,
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 flex items-center justify-center p-4 py-20">
        <Card className="w-full max-w-md border-none shadow-2xl rounded-3xl overflow-hidden">
          <CardHeader className="space-y-2 text-center pt-10">
            <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mx-auto text-accent mb-4">
              <UserPlus className="h-8 w-8" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold">{t.auth.registerTitle}</CardTitle>
            <CardDescription>{t.auth.registerDesc}</CardDescription>
          </CardHeader>
          <CardContent className="p-8 space-y-6">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">{t.auth.name}</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  required 
                  className="rounded-xl h-12"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t.auth.email}</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  required 
                  className="rounded-xl h-12"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t.auth.password}</Label>
                <Input 
                  id="password" 
                  type="password" 
                  required 
                  className="rounded-xl h-12"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full py-6 rounded-xl h-auto text-lg gap-2 bg-accent hover:bg-accent/90" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <UserPlus className="h-5 w-5" />}
                {loading ? t.common.loading : t.auth.registerButton}
              </Button>
            </form>
            
            <div className="text-center text-sm">
              <span className="text-muted-foreground">{t.auth.haveAccount} </span>
              <Link href="/login" className="text-accent font-bold hover:underline">
                {t.auth.loginLink}
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}