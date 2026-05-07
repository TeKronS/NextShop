"use client";

import { useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Wand2, Copy, Check, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

export default function AIDescriptionPage() {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [generatedDesc, setGeneratedDesc] = useState('');
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    shortDescription: '',
    keyFeatures: '',
    targetAudience: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productName || !formData.category || !formData.shortDescription || !formData.keyFeatures) {
      toast({
        variant: "destructive",
        title: "Missing Information",
        description: "Please fill in all required fields to generate a description.",
      });
      return;
    }

    setLoading(true);
    try {
      const features = formData.keyFeatures.split('\n').filter(f => f.trim() !== '');
      const result = await generateProductDescription({
        productName: formData.productName,
        category: formData.category,
        shortDescription: formData.shortDescription,
        keyFeatures: features,
        targetAudience: formData.targetAudience || undefined
      });
      setGeneratedDesc(result.description);
      toast({
        title: "Description Generated",
        description: "AI has successfully created your product description.",
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: "Something went wrong while generating the description. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedDesc);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied to Clipboard",
      description: "You can now paste the description into your product catalog.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f8fafc]">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
            <div className="space-y-2">
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">Admin Tool</Badge>
              <h1 className="text-4xl font-headline font-bold flex items-center gap-3">
                AI Description Assistant
                <Sparkles className="h-8 w-8 text-accent animate-pulse" />
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Leverage generative AI to create compelling, professional, and high-converting product descriptions in seconds.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="border-none shadow-xl bg-white rounded-3xl">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="font-headline font-bold">Product Details</CardTitle>
                <CardDescription>Enter your product basics for the AI to analyze.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <form onSubmit={handleGenerate} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="productName">Product Name *</Label>
                    <Input 
                      id="productName" 
                      name="productName"
                      placeholder="e.g., Quantum X1 Headphones" 
                      value={formData.productName}
                      onChange={handleInputChange}
                      className="rounded-xl"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Input 
                        id="category" 
                        name="category"
                        placeholder="e.g., Electronics" 
                        value={formData.category}
                        onChange={handleInputChange}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="targetAudience">Target Audience</Label>
                      <Input 
                        id="targetAudience" 
                        name="targetAudience"
                        placeholder="e.g., Tech Enthusiasts" 
                        value={formData.targetAudience}
                        onChange={handleInputChange}
                        className="rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription">One-Sentence Hook *</Label>
                    <Input 
                      id="shortDescription" 
                      name="shortDescription"
                      placeholder="Briefly explain what makes it unique..." 
                      value={formData.shortDescription}
                      onChange={handleInputChange}
                      className="rounded-xl"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="keyFeatures">Key Features (One per line) *</Label>
                    <Textarea 
                      id="keyFeatures" 
                      name="keyFeatures"
                      placeholder="- 40h Battery Life&#10;- Noise Cancelling&#10;- Bluetooth 5.3" 
                      value={formData.keyFeatures}
                      onChange={handleInputChange}
                      className="rounded-xl min-h-[120px] resize-none"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 py-6 text-lg rounded-xl h-auto gap-2 group"
                    disabled={loading}
                  >
                    {loading ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Wand2 className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                    )}
                    {loading ? "Crafting Magic..." : "Generate Description"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Output Display */}
            <Card className="border-none shadow-xl bg-white rounded-3xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className={`p-2 rounded-full ${generatedDesc ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Check className="h-4 w-4" />
                </div>
              </div>
              <CardHeader className="p-8 pb-4">
                <CardTitle className="font-headline font-bold">AI Result</CardTitle>
                <CardDescription>Your polished, SEO-optimized copy.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-4 flex flex-col h-full min-h-[400px]">
                {generatedDesc ? (
                  <div className="flex flex-col h-full space-y-6">
                    <div className="flex-1 overflow-auto bg-slate-50 p-6 rounded-2xl border border-border/40 whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                      {generatedDesc}
                    </div>
                    <Button 
                      onClick={handleCopy}
                      variant="outline" 
                      className="w-full py-6 rounded-xl border-accent/20 text-accent hover:bg-accent hover:text-white transition-all gap-2"
                    >
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy Description"}
                    </Button>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center space-y-6 opacity-40">
                    <div className="p-6 bg-slate-100 rounded-full">
                      <Wand2 className="h-12 w-12 text-slate-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="font-headline font-bold text-lg">No Content Yet</p>
                      <p className="text-sm max-w-xs">Fill out the form on the left and click generate to see AI magic happen here.</p>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 p-4 bg-primary/5 rounded-2xl flex items-start gap-3 border border-primary/10">
                  <AlertCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <p className="text-xs text-primary/80 leading-relaxed">
                    <strong>Tip:</strong> Be as specific as possible with features to get a better narrative from the AI.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}