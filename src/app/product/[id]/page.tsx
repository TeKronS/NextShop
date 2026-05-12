"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc, collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product } from '@/lib/types';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from '@/components/language/language-context';
import { useCart } from '@/components/cart/cart-context';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingCart, 
  ArrowLeft, 
  Loader2, 
  ShieldCheck, 
  Truck, 
  RotateCcw,
  Info,
  Battery,
  Ruler,
  Tag,
  LayoutGrid,
  Star,
  User,
  MessageSquare,
  Send,
  ThumbsUp,
  UserCheck
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

export default function ProductDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [seller, setSeller] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState('');
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);

  useEffect(() => {
    async function fetchProductData() {
      if (!id) return;
      try {
        const docRef = doc(db, 'products', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const productData = { id: docSnap.id, ...docSnap.data() } as Product;
          setProduct(productData);

          // Fetch Seller Data
          if (productData.sellerId) {
            const sellerRef = doc(db, 'users', productData.sellerId);
            const sellerSnap = await getDoc(sellerRef);
            if (sellerSnap.exists()) {
              setSeller(sellerSnap.data());
            } else {
              setSeller({ 
                displayName: "Vendedor Verificado", 
                reputation: 4.8, 
                salesCount: 154,
                joinedDate: "Enero 2024" 
              });
            }
          }
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProductData();

    // Real-time reviews
    if (id) {
      const reviewsQuery = query(
        collection(db, 'products', id as string, 'reviews'),
        orderBy('createdAt', 'desc')
      );
      const unsubscribe = onSnapshot(reviewsQuery, (snapshot) => {
        setReviews(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      }, (error) => {
        console.error("Error al obtener comentarios:", error);
      });
      return () => unsubscribe();
    }
  }, [id]);

  const isOwner = user && product?.sellerId === user.uid;

  const handleAddToCart = () => {
    if (product) {
      if (isOwner) {
        toast({
          variant: "destructive",
          title: "Acción no permitida",
          description: "No puedes comprar tus propios productos.",
        });
        return;
      }

      addToCart(product);
      toast({
        title: t.common.addedToCart,
        description: t.common.addedToCartDesc.replace('{name}', product.name),
      });
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ variant: "destructive", title: "Error", description: "Debes iniciar sesión para comentar." });
      return;
    }
    if (!newReview.trim()) return;

    setIsSubmittingReview(true);
    try {
      await addDoc(collection(db, 'products', id as string, 'reviews'), {
        userId: user.uid,
        userName: user.displayName || user.email,
        text: newReview,
        createdAt: serverTimestamp(),
        rating: 5 
      });
      setNewReview('');
      toast({ title: "Comentario publicado", description: "¡Gracias por tu opinión!" });
    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "No se pudo publicar el comentario." });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-primary" />
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 flex flex-col items-center justify-center p-4 gap-4">
          <h1 className="text-2xl font-bold">Producto no encontrado</h1>
          <Link href="/products">
            <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Volver al catálogo</Button>
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
        <Link href="/products" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
          <div className="lg:col-span-2 space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white shadow-xl border border-white">
                <Image 
                  src={product.imageUrl} 
                  alt={product.name} 
                  fill 
                  className="object-cover"
                  data-ai-hint={product.imageHint || "product image"}
                />
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-none rounded-full px-4 py-1">
                    {product.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-headline font-bold leading-tight">{product.name}</h1>
                  <div className="flex items-center gap-4">
                    <p className="text-3xl font-headline font-bold text-primary">${product.price.toFixed(2)}</p>
                    {product.stock > 0 ? (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">En Stock ({product.stock})</Badge>
                    ) : (
                      <Badge variant="destructive">Agotado</Badge>
                    )}
                  </div>
                </div>
                
                <Separator />
                
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {product.description}
                </p>

                <Button 
                  onClick={handleAddToCart}
                  size="lg" 
                  className={`w-full py-8 text-xl rounded-2xl h-auto gap-3 shadow-xl ${
                    isOwner 
                    ? 'bg-slate-100 text-slate-400 cursor-not-allowed hover:bg-slate-100' 
                    : 'bg-primary hover:bg-primary/90 text-white'
                  }`}
                  disabled={product.stock <= 0 || isOwner}
                >
                  {isOwner ? (
                    <>
                      <UserCheck className="h-6 w-6" />
                      Es Tu Producto
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="h-6 w-6" />
                      {t.common.addToCart}
                    </>
                  )}
                </Button>
              </div>
            </div>

            {product.specifications && Object.values(product.specifications).some(v => !!v) && (
              <div className="space-y-6">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                  <LayoutGrid className="h-6 w-6 text-primary" />
                  Especificaciones del Producto
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.specifications.weight && (
                    <div className="p-4 bg-white rounded-2xl border flex items-center gap-4">
                      <Tag className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Peso</p>
                        <p className="font-bold">{product.specifications.weight}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.size && (
                    <div className="p-4 bg-white rounded-2xl border flex items-center gap-4">
                      <Ruler className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Tamaño</p>
                        <p className="font-bold">{product.specifications.size}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.color && (
                    <div className="p-4 bg-white rounded-2xl border flex items-center gap-4">
                      <LayoutGrid className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Color</p>
                        <p className="font-bold">{product.specifications.color}</p>
                      </div>
                    </div>
                  )}
                  {product.specifications.batteryLife && (
                    <div className="p-4 bg-white rounded-2xl border flex items-center gap-4">
                      <Battery className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Batería</p>
                        <p className="font-bold">{product.specifications.batteryLife}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            <div className="space-y-8 pt-8 border-t">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-headline font-bold flex items-center gap-2">
                  <MessageSquare className="h-6 w-6 text-primary" />
                  Reseñas y Comentarios ({reviews.length})
                </h2>
              </div>

              <Card className="border-none shadow-sm rounded-3xl overflow-hidden bg-white">
                <CardContent className="p-6">
                  {user ? (
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10 shrink-0">
                          <AvatarFallback className="bg-primary text-white">
                            {user.displayName?.[0] || user.email?.[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-4">
                          <Textarea 
                            placeholder="¿Qué te pareció este producto?" 
                            className="rounded-2xl min-h-[100px] bg-slate-50 border-none resize-none focus-visible:ring-primary"
                            value={newReview}
                            onChange={(e) => setNewReview(e.target.value)}
                          />
                          <Button 
                            disabled={isSubmittingReview || !newReview.trim()} 
                            className="rounded-xl px-8 h-12 gap-2"
                          >
                            {isSubmittingReview ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                            Publicar Comentario
                          </Button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground text-sm mb-4">Inicia sesión para compartir tu experiencia con este producto.</p>
                      <Link href="/login">
                        <Button variant="outline" className="rounded-xl">Iniciar Sesión</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="space-y-4">
                {reviews.length > 0 ? (
                  reviews.map((review) => (
                    <div key={review.id} className="p-6 bg-white rounded-3xl border border-border/40 space-y-4 shadow-sm">
                      <div className="flex justify-between items-start">
                        <div className="flex gap-4 items-center">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback className="bg-slate-200 text-slate-600">
                              {review.userName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-bold text-sm">{review.userName}</p>
                            <p className="text-[10px] text-muted-foreground">{review.createdAt?.toDate().toLocaleDateString()}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`h-3 w-3 ${i < review.rating ? 'fill-current' : 'text-slate-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed italic">"{review.text}"</p>
                      <div className="flex items-center gap-4 pt-2">
                        <Button variant="ghost" size="sm" className="h-8 text-[10px] gap-2 rounded-full hover:bg-primary/10 hover:text-primary">
                          <ThumbsUp className="h-3 w-3" />
                          Útil
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
                    <p className="text-muted-foreground text-sm">Aún no hay reseñas para este producto. ¡Sé el primero!</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-xl bg-white rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary/5 p-6 border-b border-primary/10">
                <CardTitle className="text-lg font-headline font-bold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Información del Vendedor
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-14 w-14 border-2 border-primary/20">
                    <AvatarFallback className="bg-slate-100 text-primary font-bold text-xl">
                      {seller?.displayName?.[0] || 'V'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg">{seller?.displayName || 'Vendedor Verificado'}</h3>
                    {isOwner && <Badge className="bg-accent text-white border-none text-[10px]">Eres Tú</Badge>}
                    <div className="flex items-center gap-2 text-yellow-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span className="text-sm font-bold">{seller?.reputation || '4.9'}</span>
                      <span className="text-[10px] text-muted-foreground font-normal">({seller?.salesCount || '120'}+ ventas)</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Reputación</span>
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Excelente</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                      <span>ENTREGAS A TIEMPO</span>
                      <span>98%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[98%] rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
                      <span>ATENCIÓN AL CLIENTE</span>
                      <span>100%</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-full rounded-full" />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <Button variant="outline" className="w-full rounded-xl gap-2 border-primary text-primary hover:bg-primary/5">
                    Ver Perfil Completo
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border/40 shadow-sm">
                <div className="p-3 bg-green-50 rounded-xl text-green-600"><ShieldCheck className="h-6 w-6" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Compra Protegida</p>
                  <p className="text-[10px] text-muted-foreground">Recibe lo que esperabas o tu dinero de vuelta.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border/40 shadow-sm">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600"><Truck className="h-6 w-6" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Envíos a Todo el País</p>
                  <p className="text-[10px] text-muted-foreground">Despacho garantizado en 24/48 horas.</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-border/40 shadow-sm">
                <div className="p-3 bg-orange-50 rounded-xl text-orange-600"><RotateCcw className="h-6 w-6" /></div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider">Devolución Simple</p>
                  <p className="text-[10px] text-muted-foreground">30 días para cambios o devoluciones gratis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
