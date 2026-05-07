export type Language = 'en' | 'es';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      shop: 'Shop All',
      electronics: 'Electronics',
      accessories: 'Accessories',
      orders: 'Orders',
      admin: 'Admin'
    },
    hero: {
      badge: 'New Arrival 2025 Collection',
      title: 'Premium Tech for Modern Living',
      subtitle: 'Experience the perfect blend of minimalist design and high-performance technology. Hand-curated essentials for your creative workspace.',
      shopNow: 'Shop Now',
      viewCategories: 'View Categories'
    },
    features: {
      secure: 'Secure Shopping',
      secureDesc: 'Verified transactions and secure payment processing.',
      fast: 'Fast Delivery',
      fastDesc: 'Same-day processing and expedited shipping.',
      quality: 'Premium Quality',
      qualityDesc: 'Curated selection of high-quality gadgets.'
    },
    home: {
      featuredTitle: 'Featured Collections',
      featuredDesc: 'Discover our most popular products chosen by our community of innovators and creators.',
      browseAll: 'Browse All Products',
      newsletterTitle: 'Join the NextShop Community',
      newsletterSubtitle: 'Be the first to know about new product launches, exclusive deals, and tech insights.',
      emailPlaceholder: 'Enter your email',
      subscribe: 'Subscribe'
    },
    catalog: {
      title: 'Product Catalog',
      results: 'Showing {count} results',
      search: 'Search catalog...',
      categories: 'Categories',
      priceRange: 'Price Range',
      apply: 'Apply',
      noProducts: 'No products found',
      clearFilters: 'Clear all filters',
      sortBy: 'Sort'
    },
    cart: {
      title: 'Your Shopping Cart',
      itemsCount: '{count} items',
      empty: 'Your cart is empty',
      emptyDesc: "Looks like you haven't added anything to your cart yet.",
      startShopping: 'Start Shopping',
      summary: 'Order Summary',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      tax: 'Estimated Tax',
      free: 'Free',
      total: 'Total',
      checkout: 'Checkout Now',
      remove: 'Remove'
    },
    checkout: {
      shipping: 'Shipping',
      payment: 'Payment',
      confirmation: 'Confirmation',
      shippingInfo: 'Shipping Information',
      firstName: 'First Name',
      lastName: 'Last Name',
      address: 'Street Address',
      city: 'City',
      zip: 'ZIP / Postal Code',
      phone: 'Phone Number',
      continuePayment: 'Continue to Payment',
      paymentDetails: 'Payment Details',
      cardName: 'Cardholder Name',
      cardNumber: 'Card Number',
      expiry: 'Expiry Date',
      cvc: 'CVC',
      back: 'Back',
      placeOrder: 'Place Order',
      secureCheckout: 'Guaranteed safe & secure checkout',
      orderPlaced: 'Order Placed Successfully!',
      orderSuccessDesc: 'Thank you for shopping with NextShop. Your order is being processed.'
    },
    orders: {
      title: 'Your Orders',
      subtitle: 'Manage and track your recent purchases.',
      orderId: 'Order ID',
      datePlaced: 'Date Placed',
      total: 'Total',
      details: 'Details',
      track: 'Track Shipment',
      noOrders: 'No orders yet',
      noOrdersDesc: 'When you make a purchase, it will appear here.'
    },
    footer: {
      desc: 'Premium tech and lifestyle products curated for the modern professional. Built with reliability and elegance.',
      shop: 'Shop',
      company: 'Company',
      support: 'Support',
      aboutUs: 'About Us',
      contact: 'Contact',
      careers: 'Careers',
      privacy: 'Privacy Policy',
      shipping: 'Shipping Info',
      returns: 'Returns',
      faq: 'FAQ',
      adminPortal: 'Admin Portal',
      allRights: 'All rights reserved. Professional E-commerce Platform.'
    },
    common: {
      addToCart: 'Add to Cart',
      addedToCart: 'Added to cart',
      addedToCartDesc: '{name} has been added to your shopping cart.',
      viewDetails: 'View Details',
      loading: 'Loading...',
      copy: 'Copy',
      copied: 'Copied!',
      qty: 'Qty'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      shop: 'Tienda',
      electronics: 'Electrónica',
      accessories: 'Accesorios',
      orders: 'Pedidos',
      admin: 'Admin'
    },
    hero: {
      badge: 'Nueva Colección 2025',
      title: 'Tecnología Premium para la Vida Moderna',
      subtitle: 'Experimenta la mezcla perfecta de diseño minimalista y tecnología de alto rendimiento. Esenciales seleccionados para tu espacio creativo.',
      shopNow: 'Comprar Ahora',
      viewCategories: 'Ver Categorías'
    },
    features: {
      secure: 'Compra Segura',
      secureDesc: 'Transacciones verificadas y procesamiento de pago seguro.',
      fast: 'Envío Rápido',
      fastDesc: 'Procesamiento el mismo día y envío expedito.',
      quality: 'Calidad Premium',
      qualityDesc: 'Selección curada de gadgets de alta calidad.'
    },
    home: {
      featuredTitle: 'Colecciones Destacadas',
      featuredDesc: 'Descubre nuestros productos más populares elegidos por nuestra comunidad de innovadores y creadores.',
      browseAll: 'Ver todos los productos',
      newsletterTitle: 'Únete a la Comunidad NextShop',
      newsletterSubtitle: 'Sé el primero en enterarte de nuevos lanzamientos, ofertas exclusivas y novedades tecnológicas.',
      emailPlaceholder: 'Introduce tu email',
      subscribe: 'Suscribirse'
    },
    catalog: {
      title: 'Catálogo de Productos',
      results: 'Mostrando {count} resultados',
      search: 'Buscar catálogo...',
      categories: 'Categorías',
      priceRange: 'Rango de Precios',
      apply: 'Aplicar',
      noProducts: 'No se encontraron productos',
      clearFilters: 'Limpiar filtros',
      sortBy: 'Ordenar'
    },
    cart: {
      title: 'Tu Carrito de Compras',
      itemsCount: '{count} artículos',
      empty: 'Tu carrito está vacío',
      emptyDesc: 'Parece que aún no has añadido nada a tu carrito.',
      startShopping: 'Empezar a comprar',
      summary: 'Resumen del Pedido',
      subtotal: 'Subtotal',
      shipping: 'Envío',
      tax: 'Impuestos estimados',
      free: 'Gratis',
      total: 'Total',
      checkout: 'Finalizar Compra',
      remove: 'Eliminar'
    },
    checkout: {
      shipping: 'Envío',
      payment: 'Pago',
      confirmation: 'Confirmación',
      shippingInfo: 'Información de Envío',
      firstName: 'Nombre',
      lastName: 'Apellido',
      address: 'Dirección',
      city: 'Ciudad',
      zip: 'Código Postal',
      phone: 'Teléfono',
      continuePayment: 'Continuar al Pago',
      paymentDetails: 'Detalles de Pago',
      cardName: 'Nombre en la tarjeta',
      cardNumber: 'Número de tarjeta',
      expiry: 'Fecha de vencimiento',
      cvc: 'CVC',
      back: 'Volver',
      placeOrder: 'Realizar Pedido',
      secureCheckout: 'Pago garantizado seguro y protegido',
      orderPlaced: '¡Pedido realizado con éxito!',
      orderSuccessDesc: 'Gracias por comprar en NextShop. Tu pedido está siendo procesado.'
    },
    orders: {
      title: 'Tus Pedidos',
      subtitle: 'Gestiona y rastrea tus compras recientes.',
      orderId: 'ID del Pedido',
      datePlaced: 'Fecha del Pedido',
      total: 'Total',
      details: 'Detalles',
      track: 'Rastrear Envío',
      noOrders: 'Sin pedidos aún',
      noOrdersDesc: 'Cuando realices una compra, aparecerá aquí.'
    },
    footer: {
      desc: 'Productos tecnológicos y de estilo de vida premium seleccionados para el profesional moderno. Construidos con fiabilidad y elegancia.',
      shop: 'Tienda',
      company: 'Empresa',
      support: 'Soporte',
      aboutUs: 'Sobre Nosotros',
      contact: 'Contacto',
      careers: 'Carreras',
      privacy: 'Política de Privacidad',
      shipping: 'Info de Envío',
      returns: 'Devoluciones',
      faq: 'Preguntas Frecuentes',
      adminPortal: 'Portal Admin',
      allRights: 'Todos los derechos reservados. Plataforma de E-commerce Profesional.'
    },
    common: {
      addToCart: 'Añadir al carrito',
      addedToCart: 'Añadido al carrito',
      addedToCartDesc: '{name} ha sido añadido a tu carrito de compras.',
      viewDetails: 'Ver Detalles',
      loading: 'Cargando...',
      copy: 'Copiar',
      copied: '¡Copiado!',
      qty: 'Cant'
    }
  }
};