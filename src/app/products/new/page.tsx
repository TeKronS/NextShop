"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { useLanguage } from '@/components/language/language-context';
import { useAuth } from '@/components/auth/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Package, Globe, Tag, Info, Battery, Ruler, LayoutGrid, Loader2, Wand2, Sparkles, RefreshCcw } from 'lucide-react';
import { generateProductDescription } from '@/ai/flows/generate-product-description';

// Datos de ejemplo para la función de autocompletado aleatorio
const SAMPLE_PRODUCTS = [
  {
    name: 'Smartphone Pro Max 2025',
    category: 'Electronics',
    subcategory: 'Smartphones',
    price: '999.99',
    stock: '50',
    description: 'El teléfono más avanzado con pantalla Super Retina XDR y triple cámara de 48MP.',
    imageUrl: 'https://picsum.photos/seed/phone1/800/600',
    weight: '210g',
    size: '16x7.5x0.8cm',
    color: 'Titanium Black',
    batteryLife: '24 hours',
    batteryCapacity: '4500mAh',
    techSpecs: 'CPU: A18 Bionic, RAM: 8GB, Storage: 256GB'
  },
  {
    name: 'Silla Gamer Ergonómica Ultra',
    category: 'Home & Garden',
    subcategory: 'Furniture',
    price: '249.50',
    stock: '15',
    description: 'Máximo confort para largas sesiones de juego con soporte lumbar ajustable y cuero premium.',
    imageUrl: 'https://picsum.photos/seed/chair2/800/600',
    weight: '18kg',
    size: '130x65x60cm',
    color: 'Neon Blue',
    batteryLife: '',
    batteryCapacity: '',
    techSpecs: 'Material: Cold-cured foam, Reclining: 155 degrees'
  },
  {
    name: 'Cámara Mirrorless 4K',
    category: 'Electronics',
    subcategory: 'Photography',
    price: '1200.00',
    stock: '5',
    description: 'Captura cada detalle con nitidez asombrosa y video cinematográfico en resolución 4K.',
    imageUrl: 'https://picsum.photos/seed/camera3/800/600',
    weight: '450g',
    size: '12x8x6cm',
    color: 'Silver Edition',
    batteryLife: '4 hours video',
    batteryCapacity: '2200mAh',
    techSpecs: 'Sensor: Full Frame, ISO: 100-51200'
  },
  {
    name: 'Smartwatch Fitness Sport',
    category: 'Electronics',
    subcategory: 'Audio',
    price: '199.00',
    stock: '100',
    description: 'Tu compañero ideal de entrenamiento con GPS integrado y monitor de frecuencia cardíaca.',
    imageUrl: 'https://picsum.photos/seed/watch4/800/600',
    weight: '45g',
    size: '4x4x1cm',
    color: 'Midnight Blue',
    batteryLife: '7 days',
    batteryCapacity: '350mAh',
    techSpecs: 'Waterproof: 50m, Screen: OLED'
  },
  {
    name: 'Auriculares Noise Cancelling',
    category: 'Electronics',
    subcategory: 'Audio',
    price: '349.99',
    stock: '25',
    description: 'Aíslate del mundo con la mejor cancelación de ruido activa y sonido de alta fidelidad.',
    imageUrl: 'https://picsum.photos/seed/audio5/800/600',
    weight: '250g',
    size: '18x15x7cm',
    color: 'Cloud White',
    batteryLife: '40 hours',
    batteryCapacity: '1000mAh',
    techSpecs: 'Bluetooth: 5.3, Codec: LDAC, aptX'
  }
];

export default function NewProductPage() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    stock: '',
    description: '',
    imageUrl: '',
    weight: '',
    size: '',
    color: '',
    batteryLife: '',
    batteryCapacity: '',
    techSpecs: ''
  });

  const categories = Object.keys(t.categories);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFillSampleData = () => {
    const randomProduct = SAMPLE_PRODUCTS[Math.floor(Math.random() * SAMPLE_PRODUCTS.length)];
    setFormData(randomProduct);
    toast({
      title: "¡Formulario Autocompletado!",
      description: `Se han cargado los datos de: ${randomProduct.name}`,
    });
  };

  const handleAIGenerate = async () => {
    if (!formData.name || !formData.category) {
      toast({
        variant: "destructive",
        title: "Faltan datos",
        description: "Introduce al menos el nombre y la categoría para que la IA pueda ayudarte.",
      });
      return;
    }

    setIsGeneratingAI(true);
    try {
      const result = await generateProductDescription({
        productName: formData.name,
        category: formData.category,
        shortDescription: `Un producto de alta calidad en la categoría ${formData.category}.`,
        keyFeatures: [
          formData.color ? `Color: ${formData.color}` : '',
          formData.size ? `Tamaño: ${formData.size}` : '',
          formData.techSpecs ? `Specs: ${formData.techSpecs}` : ''
        ].filter(f => f !== ''),
      });

      setFormData(prev => ({ ...prev, description: result.description }));
      toast({
        title: "¡Magia de IA completada!",
        description: "Se ha generado una descripción profesional para tu producto.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Error de IA",
        description: "No se pudo generar la descripción en este momento.",
      });
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({ variant: "destructive", title: "Auth Required", description: "Please log in to sell products." });
      return;
    }

    if (!formData.name || !formData.category || !formData.price || !formData.imageUrl) {
      toast({ variant: "destructive", title: "Missing Data", description: "Please fill required fields." });
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'products'), {
        name: formData.name,
        category: formData.category,
        subcategory: formData.subcategory,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock) || 0,
        description: formData.description,
        imageUrl: formData.imageUrl,
        imageHint: formData.name.toLowerCase(),
        specifications: {
          weight: formData.weight,
          size: formData.size,
          color: formData.color,
          batteryLife: formData.batteryLife,
          batteryCapacity: formData.batteryCapacity,
          techSpecs: formData.techSpecs
        },
        sellerId: user.uid,
        createdAt: serverTimestamp()
      });

      toast({ title: t.sell.success, description: t.sell.successDesc });
      router.push('/my-products');
    } catch (error: any) {
      console.error(error);
      toast({ variant: "destructive", title: t.sell.error, description: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-headline font-bold">{t.sell.title}</h1>
              <p className="text-muted-foreground">{t.sell.subtitle}</p>
            </div>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleFillSampleData}
              className="rounded-xl gap-2 border-primary text-primary hover:bg-primary/5 h-12 shadow-sm"
            >
              <RefreshCcw className="h-4 w-4" />
              Autocompletar con Ejemplo
            </Button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Info */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-primary/5 p-8 border-b border-primary/10">
                <CardTitle className="flex items-center gap-3">
                  <Info className="h-5 w-5 text-primary" />
                  {t.sell.basicInfo}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">{t.sell.productName} *</Label>
                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} className="rounded-xl" required />
                </div>
                
                <div className="space-y-2">
                  <Label>{t.sell.category} *</Label>
                  <Select 
                    onValueChange={(val) => handleSelectChange('category', val)} 
                    value={formData.category}
                  >
                    <SelectTrigger className="rounded-xl">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(cat => (
                        <SelectItem key={cat} value={t.categories[cat].name}>{t.categories[cat].name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>{t.sell.subcategory}</Label>
                  <Input name="subcategory" value={formData.subcategory} onChange={handleInputChange} className="rounded-xl" placeholder="e.g. Laptops" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">{t.sell.price} *</Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                    <Input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} className="rounded-xl pl-7" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">{t.sell.stock}</Label>
                  <Input id="stock" name="stock" type="number" value={formData.stock} onChange={handleInputChange} className="rounded-xl" />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <div className="flex justify-between items-end mb-2">
                    <Label htmlFor="description">{t.sell.description}</Label>
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="sm" 
                      onClick={handleAIGenerate} 
                      disabled={isGeneratingAI}
                      className="text-xs h-8 gap-1.5 border-accent text-accent hover:bg-accent/5 rounded-full"
                    >
                      {isGeneratingAI ? <Loader2 className="h-3 w-3 animate-spin" /> : <Sparkles className="h-3 w-3" />}
                      {isGeneratingAI ? "Generando..." : "Ayuda de IA"}
                    </Button>
                  </div>
                  <Textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className="rounded-xl min-h-[150px]" placeholder="Describe los beneficios y detalles de tu producto..." />
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-accent/5 p-8 border-b border-accent/10">
                <CardTitle className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-accent" />
                  {t.sell.media}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl">{t.sell.imageUrl} *</Label>
                  <Input id="imageUrl" name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} placeholder="https://..." className="rounded-xl" required />
                  <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{t.sell.imageDesc}</p>
                </div>
                {formData.imageUrl && (
                  <div className="mt-4 relative aspect-video w-full max-w-sm mx-auto rounded-2xl overflow-hidden border">
                    <img src={formData.imageUrl} alt="Preview" className="object-cover w-full h-full" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Specs */}
            <Card className="border-none shadow-xl rounded-3xl overflow-hidden">
              <CardHeader className="bg-slate-50 p-8 border-b border-slate-200">
                <CardTitle className="flex items-center gap-3">
                  <LayoutGrid className="h-5 w-5 text-slate-400" />
                  {t.sell.specs}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Tag className="h-3 w-3" /> {t.sell.weight}</Label>
                  <Input name="weight" value={formData.weight} onChange={handleInputChange} placeholder="e.g. 1.2kg" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Ruler className="h-3 w-3" /> {t.sell.size}</Label>
                  <Input name="size" value={formData.size} onChange={handleInputChange} placeholder="e.g. 30x20x2cm" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>{t.sell.color}</Label>
                  <Input name="color" value={formData.color} onChange={handleInputChange} placeholder="e.g. Space Gray" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2"><Battery className="h-3 w-3" /> {t.sell.batteryDuration}</Label>
                  <Input name="batteryLife" value={formData.batteryLife} onChange={handleInputChange} placeholder="e.g. 15 hours" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>{t.sell.batteryCapacity}</Label>
                  <Input name="batteryCapacity" value={formData.batteryCapacity} onChange={handleInputChange} placeholder="e.g. 5000mAh" className="rounded-xl" />
                </div>
                <div className="space-y-2 md:col-span-3">
                  <Label>{t.sell.techSpecs}</Label>
                  <Textarea name="techSpecs" value={formData.techSpecs} onChange={handleInputChange} placeholder="CPU: i7, RAM: 16GB, SSD: 512GB..." className="rounded-xl" />
                </div>
              </CardContent>
            </Card>

            <Button type="submit" disabled={loading} className="w-full bg-primary hover:bg-primary/90 py-8 text-xl rounded-2xl h-auto shadow-2xl gap-3">
              {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Package className="h-6 w-6" />}
              {t.sell.publish}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}
