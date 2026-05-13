# NextShop - Premium E-commerce Platform

NextShop is a modern, high-performance e-commerce marketplace built with a cutting-edge tech stack. It offers a seamless experience for both buyers and sellers, featuring AI-powered tools and real-time inventory management.

## 🚀 Key Features

### 🛒 For Buyers
- **Dynamic Product Catalog**: Real-time listing with advanced filtering by price, category, and intelligent search.
- **Interactive Product Details**: Deep-dive into specifications, high-quality image previews, and seller reputation tracking.
- **Social Proof**: Real-time review and rating system integrated with individual products.
- **Seamless Checkout**: Multi-step, secure checkout process with simulated payment processing and order tracking.
- **Multi-language Support**: Full internationalization (English/Spanish) for a global shopping experience.

### 💼 For Sellers
- **Simplified Publishing**: Easy-to-use interface to list products with detailed technical specifications.
- **AI Description Assistant**: Integration with Google Gemini (Genkit) to automatically generate professional, SEO-friendly product descriptions from basic features.
- **Inventory Management**: Real-time dashboard to track published items, stock levels, and sales performance.
- **Admin Dashboard**: Centralized hub for sellers to monitor metrics and manage their catalog.

## 🛠 Tech Stack

- **Frontend**: [Next.js 15](https://nextjs.org/) (App Router), [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [ShadCN UI](https://ui.shadcn.com/)
- **Backend/Database**: [Firebase](https://firebase.google.com/) (Firestore for real-time data, Firebase Auth for secure login)
- **Generative AI**: [Google Genkit](https://firebase.google.com/docs/genkit) (Gemini 2.5 Flash)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

- `src/app/`: Next.js App Router pages and layouts.
- `src/components/`: Reusable UI components (ShadCN) and layout elements (Header, Footer).
- `src/ai/`: Genkit flow definitions and AI prompt configurations.
- `src/lib/`: Core utilities, Firebase configuration, and global translation dictionaries.
- `src/hooks/`: Custom React hooks for state management and UI interactions.

## 🚦 Getting Started

1. **Clone the repository**
2. **Install dependencies**: `npm install`
3. **Configure environment variables**: Create a `.env` file with your Firebase and Google AI API keys.
4. **Run the development server**: `npm run dev`
5. **Open [http://localhost:9002](http://localhost:9002)** in your browser.

---
© 2025 NextShop E-commerce S.L. All rights reserved.