
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

// 60 Productos de ejemplo para autocompletado rápido
const SAMPLE_PRODUCTS = [
  { name: 'Smartphone Pro Max 2025', category: 'Electronics', subcategory: 'Smartphones', price: '999.99', stock: '50', description: 'El teléfono más avanzado con pantalla Super Retina XDR y triple cámara de 48MP.', imageUrl: 'https://picsum.photos/seed/phone1/800/600', weight: '210g', size: '16x7.5x0.8cm', color: 'Titanium Black', batteryLife: '24 hours', batteryCapacity: '4500mAh', techSpecs: 'CPU: A18 Bionic, RAM: 8GB, Storage: 256GB' },
  { name: 'Silla Gamer Ergonómica Ultra', category: 'Home & Garden', subcategory: 'Furniture', price: '249.50', stock: '15', description: 'Máximo confort para largas sesiones de juego con soporte lumbar ajustable.', imageUrl: 'https://picsum.photos/seed/chair2/800/600', weight: '18kg', size: '130x65x60cm', color: 'Neon Blue', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: Cold-cured foam, Reclining: 155 degrees' },
  { name: 'Cámara Mirrorless 4K', category: 'Electronics', subcategory: 'Photography', price: '1200.00', stock: '5', description: 'Captura cada detalle con nitidez asombrosa y video cinematográfico.', imageUrl: 'https://picsum.photos/seed/camera3/800/600', weight: '450g', size: '12x8x6cm', color: 'Silver Edition', batteryLife: '4 hours video', batteryCapacity: '2200mAh', techSpecs: 'Sensor: Full Frame, ISO: 100-51200' },
  { name: 'Smartwatch Fitness Sport', category: 'Electronics', subcategory: 'Audio', price: '199.00', stock: '100', description: 'Tu compañero ideal de entrenamiento con GPS integrado.', imageUrl: 'https://picsum.photos/seed/watch4/800/600', weight: '45g', size: '4x4x1cm', color: 'Midnight Blue', batteryLife: '7 days', batteryCapacity: '350mAh', techSpecs: 'Waterproof: 50m, Screen: OLED' },
  { name: 'Auriculares Noise Cancelling', category: 'Electronics', subcategory: 'Audio', price: '349.99', stock: '25', description: 'Aíslate del mundo con la mejor cancelación de ruido activa.', imageUrl: 'https://picsum.photos/seed/audio5/800/600', weight: '250g', size: '18x15x7cm', color: 'Cloud White', batteryLife: '40 hours', batteryCapacity: '1000mAh', techSpecs: 'Bluetooth: 5.3, Codec: LDAC' },
  { name: 'Tablet Pro 12.9"', category: 'Electronics', subcategory: 'Tablets', price: '1099.00', stock: '30', description: 'Potencia de laptop en un diseño ultradelgado.', imageUrl: 'https://picsum.photos/seed/tablet6/800/600', weight: '680g', size: '28x21x0.6cm', color: 'Space Gray', batteryLife: '10 hours', batteryCapacity: '9700mAh', techSpecs: 'Chip: M2, Screen: Liquid Retina XDR' },
  { name: 'Drone 4K Explorer', category: 'Electronics', subcategory: 'Gadgets', price: '799.00', stock: '12', description: 'Vuela más lejos y captura tomas aéreas impresionantes.', imageUrl: 'https://picsum.photos/seed/drone7/800/600', weight: '249g', size: '14x9x5cm', color: 'Orange Pulse', batteryLife: '31 min flight', batteryCapacity: '2250mAh', techSpecs: 'Max Altitude: 4000m, Signal: OcuSync 3.0' },
  { name: 'Cafetera Espresso Pro', category: 'Home & Garden', subcategory: 'Appliances', price: '599.00', stock: '8', description: 'Café de especialidad en la comodidad de tu hogar.', imageUrl: 'https://picsum.photos/seed/coffee8/800/600', weight: '9kg', size: '30x30x40cm', color: 'Stainless Steel', batteryLife: '', batteryCapacity: '', techSpecs: 'Pressure: 15 bar, Tank: 2L' },
  { name: 'Robot Aspirador Inteligente', category: 'Home & Garden', subcategory: 'Appliances', price: '399.00', stock: '20', description: 'Limpia tu casa sin mover un dedo, con mapeo láser.', imageUrl: 'https://picsum.photos/seed/vacuum9/800/600', weight: '3.5kg', size: '35x35x9cm', color: 'Piano Black', batteryLife: '120 min', batteryCapacity: '5200mAh', techSpecs: 'Suction: 4000Pa, LiDAR navigation' },
  { name: 'Purificador de Aire HEPA', category: 'Home & Garden', subcategory: 'Appliances', price: '180.00', stock: '40', description: 'Elimina el 99.9% de las partículas en el aire.', imageUrl: 'https://picsum.photos/seed/air10/800/600', weight: '4kg', size: '25x25x50cm', color: 'White Pearl', batteryLife: '', batteryCapacity: '', techSpecs: 'CADR: 300m3/h, Filter: True HEPA' },
  { name: 'Teclado Mecánico RGB', category: 'Electronics', subcategory: 'Gaming', price: '159.00', stock: '60', description: 'Interruptores premium para una respuesta táctil superior.', imageUrl: 'https://picsum.photos/seed/kb11/800/600', weight: '1.1kg', size: '44x13x3cm', color: 'Graphite', batteryLife: '', batteryCapacity: '', techSpecs: 'Switches: Cherry MX Blue, RGB: 16.8M colors' },
  { name: 'Monitor Ultrawide 34"', category: 'Electronics', subcategory: 'Laptops', price: '499.00', stock: '15', description: 'Productividad inmersiva con resolución QHD.', imageUrl: 'https://picsum.photos/seed/mon12/800/600', weight: '7kg', size: '82x36x12cm', color: 'Matte Black', batteryLife: '', batteryCapacity: '', techSpecs: 'Refresh: 144Hz, Panel: IPS' },
  { name: 'SSD Portátil 2TB', category: 'Electronics', subcategory: 'Gadgets', price: '189.00', stock: '100', description: 'Velocidad de transferencia ultra rápida en tu bolsillo.', imageUrl: 'https://picsum.photos/seed/ssd13/800/600', weight: '50g', size: '10x5x1cm', color: 'Rugged Blue', batteryLife: '', batteryCapacity: '', techSpecs: 'Speed: 2000MB/s, Interface: USB-C 3.2' },
  { name: 'Tira LED Inteligente', category: 'Home & Garden', subcategory: 'Decor', price: '45.00', stock: '200', description: 'Ambienta tu habitación con millones de colores.', imageUrl: 'https://picsum.photos/seed/led14/800/600', weight: '200g', size: '5m length', color: 'RGB', batteryLife: '', batteryCapacity: '', techSpecs: 'App: iOS/Android, Voice: Alexa/Google' },
  { name: 'Escritorio Elevable Pro', category: 'Home & Garden', subcategory: 'Furniture', price: '450.00', stock: '10', description: 'Cambia entre estar sentado o de pie con un solo botón.', imageUrl: 'https://picsum.photos/seed/desk15/800/600', weight: '35kg', size: '140x70x(70-120)cm', color: 'Oak/White', batteryLife: '', batteryCapacity: '', techSpecs: 'Motor: Dual, Load: 120kg' },
  { name: 'Mouse Ergonómico Vertical', category: 'Electronics', subcategory: 'Gadgets', price: '89.00', stock: '55', description: 'Reduce la tensión en la muñeca con su diseño natural.', imageUrl: 'https://picsum.photos/seed/mouse16/800/600', weight: '130g', size: '12x7x7cm', color: 'Soft Gray', batteryLife: '4 months', batteryCapacity: '500mAh', techSpecs: 'DPI: 4000, Bluetooth + USB' },
  { name: 'Mat de Yoga Ecológico', category: 'Sports & Outdoors', subcategory: 'Fitness', price: '65.00', stock: '80', description: 'Grip superior y materiales 100% biodegradables.', imageUrl: 'https://picsum.photos/seed/yoga17/800/600', weight: '2kg', size: '183x61x0.5cm', color: 'Forest Green', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: Natural Rubber, Anti-slip' },
  { name: 'Pistola de Masaje Pro', category: 'Beauty & Health', subcategory: 'Wellness', price: '129.00', stock: '45', description: 'Recuperación muscular profunda para deportistas.', imageUrl: 'https://picsum.photos/seed/massage18/800/600', weight: '900g', size: '25x18x6cm', color: 'Carbon', batteryLife: '6 hours', batteryCapacity: '2600mAh', techSpecs: 'Speeds: 30 levels, Heads: 6 included' },
  { name: 'Cepillo Sónico Dental', category: 'Beauty & Health', subcategory: 'Wellness', price: '75.00', stock: '120', description: '40,000 vibraciones por minuto para una limpieza total.', imageUrl: 'https://picsum.photos/seed/brush19/800/600', weight: '150g', size: '22cm length', color: 'Matte Pink', batteryLife: '30 days', batteryCapacity: '800mAh', techSpecs: 'Modes: 5, Waterproof: IPX7' },
  { name: 'Mochila de Cuero Minimal', category: 'Fashion', subcategory: 'Accessories', price: '145.00', stock: '35', description: 'Elegancia y funcionalidad para el profesional moderno.', imageUrl: 'https://picsum.photos/seed/bag20/800/600', weight: '1.2kg', size: '42x30x12cm', color: 'Cognac', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: Top-grain Leather, Laptop: up to 15"' },
  { name: 'Gafas de Sol Polarizadas', category: 'Fashion', subcategory: 'Accessories', price: '120.00', stock: '90', description: 'Protección UV400 con diseño atemporal.', imageUrl: 'https://picsum.photos/seed/glass21/800/600', weight: '30g', size: 'Standard', color: 'Tortoise Shell', batteryLife: '', batteryCapacity: '', techSpecs: 'Lens: Polarized, Frame: Acetate' },
  { name: 'Billetera RFID Slim', category: 'Fashion', subcategory: 'Accessories', price: '45.00', stock: '150', description: 'Protege tus tarjetas con estilo ultradelgado.', imageUrl: 'https://picsum.photos/seed/wallet22/800/600', weight: '40g', size: '10x7x0.5cm', color: 'Midnight Black', batteryLife: '', batteryCapacity: '', techSpecs: 'Protection: RFID Blocking, Cards: 8' },
  { name: 'Bicicleta de Montaña 29"', category: 'Sports & Outdoors', subcategory: 'Cycling', price: '850.00', stock: '6', description: 'Conquista cualquier terreno con suspensión de aire.', imageUrl: 'https://picsum.photos/seed/bike23/800/600', weight: '14kg', size: 'L frame', color: 'Electric Yellow', batteryLife: '', batteryCapacity: '', techSpecs: 'Gears: 1x12 Shimano, Brakes: Hydraulic' },
  { name: 'Tienda de Campaña 4 Personas', category: 'Sports & Outdoors', subcategory: 'Camping', price: '220.00', stock: '15', description: 'Impermeable y fácil de armar en 5 minutos.', imageUrl: 'https://picsum.photos/seed/tent24/800/600', weight: '4.5kg', size: '240x210x130cm', color: 'Deep Green', batteryLife: '', batteryCapacity: '', techSpecs: 'Water column: 3000mm, Poles: Fiberglass' },
  { name: 'Botas de Senderismo Pro', category: 'Sports & Outdoors', subcategory: 'Camping', price: '165.00', stock: '30', description: 'Membrana Gore-Tex para mantenerte seco.', imageUrl: 'https://picsum.photos/seed/boots25/800/600', weight: '600g (each)', size: '42 EU', color: 'Brown/Black', batteryLife: '', batteryCapacity: '', techSpecs: 'Sole: Vibram, Material: Nubuck' },
  { name: 'Power Bank 20,000mAh', category: 'Electronics', subcategory: 'Gadgets', price: '55.00', stock: '200', description: 'Carga tu laptop y teléfono simultáneamente.', imageUrl: 'https://picsum.photos/seed/pb26/800/600', weight: '400g', size: '15x7x2cm', color: 'Space Grey', batteryLife: '5 full charges', batteryCapacity: '20000mAh', techSpecs: 'Output: PD 65W, Ports: 2 USB-C' },
  { name: 'Altavoz Bluetooth Waterproof', category: 'Electronics', subcategory: 'Audio', price: '110.00', stock: '65', description: 'Sonido 360 grados y resistencia al agua IPX7.', imageUrl: 'https://picsum.photos/seed/spk27/800/600', weight: '500g', size: '18x7x7cm', color: 'Ocean Blue', batteryLife: '20 hours', batteryCapacity: '4800mAh', techSpecs: 'Output: 20W, Bluetooth: 5.1' },
  { name: 'Anillo Inteligente V2', category: 'Electronics', subcategory: 'Gadgets', price: '299.00', stock: '40', description: 'Monitoriza tu salud desde tu dedo con precisión.', imageUrl: 'https://picsum.photos/seed/ring28/800/600', weight: '4g', size: 'Size 10', color: 'Silver', batteryLife: '4 days', batteryCapacity: '25mAh', techSpecs: 'Sensors: Heart, SpO2, Sleep' },
  { name: 'E-Reader Paperwhite', category: 'Electronics', subcategory: 'Tablets', price: '139.00', stock: '50', description: 'Lleva miles de libros en una pantalla que parece papel.', imageUrl: 'https://picsum.photos/seed/eread29/800/600', weight: '180g', size: '17x12x0.8cm', color: 'Black', batteryLife: '10 weeks', batteryCapacity: '1500mAh', techSpecs: 'Screen: E-Ink 300ppi, IPX8' },
  { name: 'Gafas VR Standalone', category: 'Electronics', subcategory: 'Gaming', price: '399.00', stock: '25', description: 'Realidad virtual sin cables con procesador potente.', imageUrl: 'https://picsum.photos/seed/vr30/800/600', weight: '500g', size: 'Adjustable', color: 'White', batteryLife: '2.5 hours', batteryCapacity: '3600mAh', techSpecs: 'Resolution: 2K per eye, RAM: 6GB' },
  { name: 'Tarjeta Gráfica RTX 5080', category: 'Electronics', subcategory: 'Gaming', price: '899.00', stock: '5', description: 'El pináculo del rendimiento gráfico para 4K.', imageUrl: 'https://picsum.photos/seed/gpu31/800/600', weight: '1.8kg', size: '33x14cm', color: 'RGB Edition', batteryLife: '', batteryCapacity: '', techSpecs: 'VRAM: 16GB GDDR7, Bus: 256-bit' },
  { name: 'Sofá de Terciopelo Moderno', category: 'Home & Garden', subcategory: 'Furniture', price: '1200.00', stock: '3', description: 'Diseño mid-century con terciopelo de alta calidad.', imageUrl: 'https://picsum.photos/seed/sofa32/800/600', weight: '45kg', size: '210x90x85cm', color: 'Emerald Green', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: Wood frame, Velvet fabric' },
  { name: 'Set de Macetas de Cerámica', category: 'Home & Garden', subcategory: 'Decor', price: '85.00', stock: '40', description: 'Tres tamaños con acabado artesanal.', imageUrl: 'https://picsum.photos/seed/pot33/800/600', weight: '3kg', size: 'L, M, S sizes', color: 'Sand White', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: Ceramic, Drainage included' },
  { name: 'Molinillo de Café Burr', category: 'Home & Garden', subcategory: 'Appliances', price: '120.00', stock: '25', description: 'Molienda uniforme para el mejor espresso.', imageUrl: 'https://picsum.photos/seed/grind34/800/600', weight: '2.5kg', size: '20x15x30cm', color: 'Matte Black', batteryLife: '', batteryCapacity: '', techSpecs: 'Settings: 40 levels, Burrs: Conical' },
  { name: 'Placa de Inducción Portátil', category: 'Home & Garden', subcategory: 'Appliances', price: '95.00', stock: '35', description: 'Cocina rápido y seguro en cualquier lugar.', imageUrl: 'https://picsum.photos/seed/cook35/800/600', weight: '2kg', size: '30x30x6cm', color: 'Glass Black', batteryLife: '', batteryCapacity: '', techSpecs: 'Power: 2000W, Controls: Touch' },
  { name: 'Termostato Inteligente', category: 'Home & Garden', subcategory: 'Appliances', price: '249.00', stock: '20', description: 'Ahorra energía controlando el clima desde tu móvil.', imageUrl: 'https://picsum.photos/seed/therm36/800/600', weight: '300g', size: '8x8cm', color: 'Copper', batteryLife: '2 years', batteryCapacity: '', techSpecs: 'WIFI: 2.4/5GHz, Matter support' },
  { name: 'Aro de Luz 18" Pro', category: 'Electronics', subcategory: 'Photography', price: '110.00', stock: '60', description: 'Iluminación perfecta para streaming y video.', imageUrl: 'https://picsum.photos/seed/light37/800/600', weight: '2kg', size: '45cm diameter', color: 'White/Black', batteryLife: '', batteryCapacity: '', techSpecs: 'Temp: 3200-5600K, Power: 55W' },
  { name: 'Objetivo 50mm f/1.8', category: 'Electronics', subcategory: 'Photography', price: '299.00', stock: '15', description: 'El bokeh perfecto para retratos profesionales.', imageUrl: 'https://picsum.photos/seed/lens38/800/600', weight: '160g', size: '6x4cm', color: 'Black', batteryLife: '', batteryCapacity: '', techSpecs: 'Mount: E-Mount, Aperture: 7 blades' },
  { name: 'Estabilizador Gimbal 3 Ejes', category: 'Electronics', subcategory: 'Photography', price: '159.00', stock: '20', description: 'Videos fluidos con tu smartphone como nunca antes.', imageUrl: 'https://picsum.photos/seed/gimbal39/800/600', weight: '400g', size: 'Foldable', color: 'Space Grey', batteryLife: '15 hours', batteryCapacity: '2600mAh', techSpecs: 'App: Object Tracking, Time-lapse' },
  { name: 'Chaqueta Impermeable Tech', category: 'Fashion', subcategory: 'Accessories', price: '185.00', stock: '25', description: 'Diseño urbano con protección contra tormentas.', imageUrl: 'https://picsum.photos/seed/jacket40/800/600', weight: '450g', size: 'L', color: 'Obsidian', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: 3-layer Gore-Tex Shell' },
  { name: 'Pañuelo de Seda Natural', category: 'Fashion', subcategory: 'Accessories', price: '65.00', stock: '40', description: 'Suavidad extrema y estampado artesanal.', imageUrl: 'https://picsum.photos/seed/silk41/800/600', weight: '20g', size: '90x90cm', color: 'Abstract Blue', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: 100% Mulberry Silk' },
  { name: 'Zapatillas Running Carbon', category: 'Sports & Outdoors', subcategory: 'Fitness', price: '250.00', stock: '20', description: 'Placa de carbono para máxima reactividad.', imageUrl: 'https://picsum.photos/seed/run42/800/600', weight: '200g', size: '42 EU', color: 'Sonic White', batteryLife: '', batteryCapacity: '', techSpecs: 'Midsole: PEBA foam, Plate: Full carbon' },
  { name: 'Mancuernas Ajustables', category: 'Sports & Outdoors', subcategory: 'Fitness', price: '320.00', stock: '10', description: 'Todo tu gimnasio en un solo par (2-24kg).', imageUrl: 'https://picsum.photos/seed/dumb43/800/600', weight: '48kg total', size: 'Compact', color: 'Black/Red', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: Steel/ABS, Increments: 2kg' },
  { name: 'Kettlebell 16kg Comp', category: 'Sports & Outdoors', subcategory: 'Fitness', price: '85.00', stock: '15', description: 'Peso estándar de competición en acero.', imageUrl: 'https://picsum.photos/seed/kb44/800/600', weight: '16kg', size: 'Standard', color: 'Yellow', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: Hollow Core Steel' },
  { name: 'Patinete Eléctrico Pro', category: 'Sports & Outdoors', subcategory: 'Cycling', price: '650.00', stock: '12', description: 'Tu solución de última milla con 45km de autonomía.', imageUrl: 'https://picsum.photos/seed/scoot45/800/600', weight: '14.2kg', size: 'Folded: 110cm', color: 'Matte Grey', batteryLife: '45km range', batteryCapacity: '12800mAh', techSpecs: 'Max Speed: 25km/h, Motor: 600W' },
  { name: 'Set de Skincare Completo', category: 'Beauty & Health', subcategory: 'Cuidado de la piel', price: '95.00', stock: '30', description: 'Rutina de 5 pasos para una piel perfecta.', imageUrl: 'https://picsum.photos/seed/skin46/800/600', weight: '500g', size: '5 items', color: 'White Box', batteryLife: '', batteryCapacity: '', techSpecs: 'Organic, Vegan, Paraben-free' },
  { name: 'Secador Profesional Ion', category: 'Beauty & Health', subcategory: 'Cuidado del cabello', price: '160.00', stock: '20', description: 'Secado ultra rápido sin dañar el cabello.', imageUrl: 'https://picsum.photos/seed/dry47/800/600', weight: '550g', size: 'Pro', color: 'Midnight Purple', batteryLife: '', batteryCapacity: '', techSpecs: 'Motor: Brushless, Tech: Negative Ion' },
  { name: 'Difusor de Aceites Esenciales', category: 'Beauty & Health', subcategory: 'Wellness', price: '45.00', stock: '50', description: 'Ambiente relajante con aromaterapia y luz LED.', imageUrl: 'https://picsum.photos/seed/diff48/800/600', weight: '400g', size: '500ml', color: 'Light Wood', batteryLife: '12 hours', batteryCapacity: '', techSpecs: 'Ultrasonic, Auto-shutoff' },
  { name: 'Soporte de Laptop Aluminio', category: 'Electronics', subcategory: 'Gadgets', price: '35.00', stock: '100', description: 'Mejora tu postura con este soporte regulable.', imageUrl: 'https://picsum.photos/seed/stand49/800/600', weight: '200g', size: 'Foldable', color: 'Silver', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: CNC Aluminum, Anti-slip' },
  { name: 'Desk Mat de Fieltro', category: 'Home & Garden', subcategory: 'Decor', price: '29.00', stock: '120', description: 'Organiza tu escritorio con estilo nórdico.', imageUrl: 'https://picsum.photos/seed/mat50/800/600', weight: '100g', size: '90x40cm', color: 'Dark Grey', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: Recycled PET Felt' },
  { name: 'Báscula Inteligente Pro', category: 'Beauty & Health', subcategory: 'Wellness', price: '55.00', stock: '70', description: 'Mide grasa corporal, músculo y más (13 métricas).', imageUrl: 'https://picsum.photos/seed/scale51/800/600', weight: '1.5kg', size: '30x30cm', color: 'Glass White', batteryLife: '1 year', batteryCapacity: '', techSpecs: 'Connectivity: Bluetooth/WiFi, App sync' },
  { name: 'Tensiómetro de Brazo Tech', category: 'Beauty & Health', subcategory: 'Wellness', price: '65.00', stock: '40', description: 'Precisión médica con sincronización al móvil.', imageUrl: 'https://picsum.photos/seed/bp52/800/600', weight: '400g', size: 'Universal cuff', color: 'White/Grey', batteryLife: '6 months', batteryCapacity: '', techSpecs: 'FDA Cleared, Multi-user' },
  { name: 'Espejo Inteligente LED', category: 'Home & Garden', subcategory: 'Decor', price: '280.00', stock: '10', description: 'Muestra clima y noticias mientras te arreglas.', imageUrl: 'https://picsum.photos/seed/mir53/800/600', weight: '8kg', size: '60x80cm', color: 'Mirror', batteryLife: '', batteryCapacity: '', techSpecs: 'Display: 10" Hidden, Voice Control' },
  { name: 'Cargador Inalámbrico Trio', category: 'Electronics', subcategory: 'Gadgets', price: '89.00', stock: '80', description: 'Carga iPhone, Watch y AirPods a la vez.', imageUrl: 'https://picsum.photos/seed/chrg54/800/600', weight: '300g', size: 'Folding', color: 'Soft Touch Black', batteryLife: '', batteryCapacity: '', techSpecs: 'Input: 30W USB-C, MagSafe compatible' },
  { name: 'Trípode de Viaje Carbon', category: 'Electronics', subcategory: 'Photography', price: '199.00', stock: '20', description: 'Ligero como una pluma, estable como una roca.', imageUrl: 'https://picsum.photos/seed/trip55/800/600', weight: '900g', size: '35cm (folded)', color: 'Carbon Weave', batteryLife: '', batteryCapacity: '', techSpecs: 'Max Height: 155cm, Load: 8kg' },
  { name: 'Prismáticos 10x42 HD', category: 'Sports & Outdoors', subcategory: 'Camping', price: '125.00', stock: '25', description: 'Visión nítida para observación de aves y naturaleza.', imageUrl: 'https://picsum.photos/seed/binoc56/800/600', weight: '700g', size: 'Standard', color: 'Deep Green', batteryLife: '', batteryCapacity: '', techSpecs: 'Lens: Bak-4 Prism, Nitrogen filled' },
  { name: 'Tabla de Surf Hybrid', category: 'Sports & Outdoors', subcategory: 'Team Sports', price: '450.00', stock: '5', description: 'Perfecta para olas medias y progresión rápida.', imageUrl: 'https://picsum.photos/seed/surf57/800/600', weight: '4kg', size: '6\'4"', color: 'Teal Fade', batteryLife: '', batteryCapacity: '', techSpecs: 'Material: Epoxy, Volume: 38L' },
  { name: 'Raqueta de Tenis Pro', category: 'Sports & Outdoors', subcategory: 'Team Sports', price: '220.00', stock: '20', description: 'Potencia y control usados en el circuito pro.', imageUrl: 'https://picsum.photos/seed/ten58/800/600', weight: '300g', size: 'Grip 3', color: 'Black/Gold', batteryLife: '', batteryCapacity: '', techSpecs: 'String Pattern: 16x19, Material: Graphite' },
  { name: 'Teclado MIDI 49 Teclas', category: 'Electronics', subcategory: 'Audio', price: '185.00', stock: '30', description: 'Crea música con controles dedicados y pads.', imageUrl: 'https://picsum.photos/seed/midi59/800/600', weight: '2.5kg', size: '80x25cm', color: 'Pro White', batteryLife: '', batteryCapacity: '', techSpecs: 'Connectivity: USB-MIDI, Pads: 8 RGB' },
  { name: 'Monitor de Sueño Inteligente', category: 'Beauty & Health', subcategory: 'Wellness', price: '149.00', stock: '40', description: 'Analiza tu descanso sin usar nada puesto.', imageUrl: 'https://picsum.photos/seed/sleep60/800/600', weight: '200g', size: 'Mat', color: 'Gray Fabric', batteryLife: '', batteryCapacity: '', techSpecs: 'Sensor: Ballistocardiography, WiFi' }
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
