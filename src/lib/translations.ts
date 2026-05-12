import { BrandConfig } from "./brand-config";

export type Language = 'en' | 'es';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      shop: 'Shop All',
      electronics: 'Electronics',
      accessories: 'Accessories',
      photography: 'Photography',
      orders: 'Orders',
      admin: 'Admin',
      about: 'About Us',
      contact: 'Contact',
      sell: 'Sell Product',
      myProducts: 'My Inventory'
    },
    sell: {
      title: 'Sell a Product',
      subtitle: 'List your item in our marketplace and reach thousands of buyers.',
      basicInfo: 'Basic Information',
      productName: 'Product Name',
      category: 'Category',
      subcategory: 'Subcategory',
      price: 'Price (USD)',
      stock: 'Initial Stock',
      description: 'Full Description',
      media: 'Product Media',
      imageUrl: 'Image URL',
      imageDesc: 'Paste a direct link to your product image (e.g., from Unsplash or Pixabay).',
      specs: 'Specifications',
      weight: 'Weight',
      size: 'Dimensions (Size)',
      color: 'Color',
      batteryDuration: 'Battery Life',
      batteryCapacity: 'Battery Capacity',
      techSpecs: 'Technical Specs',
      publish: 'Publish Product',
      success: 'Product Published!',
      successDesc: 'Your product is now live in the catalog.',
      error: 'Error publishing product'
    },
    myProducts: {
      title: 'My Published Products',
      subtitle: 'Manage your active listings and stock.',
      noProducts: 'You haven\'t published any products yet.',
      deleteConfirm: 'Are you sure you want to delete this product?',
      deleteSuccess: 'Product deleted successfully',
      edit: 'Edit',
      delete: 'Delete'
    },
    categories: {
      electronics: {
        name: 'Electronics',
        subs: ['Laptops', 'Smartphones', 'Audio', 'Cameras', 'Tablets', 'Gaming', 'Wearables']
      },
      home: {
        name: 'Home & Kitchen',
        subs: ['Furniture', 'Decor', 'Bedding', 'Appliances', 'Cookware', 'Storage']
      },
      fashion: {
        name: 'Fashion & Apparel',
        subs: ['Men\'s Clothing', 'Women\'s Clothing', 'Kids', 'Accessories', 'Shoes', 'Jewelry']
      },
      sports: {
        name: 'Sports & Outdoors',
        subs: ['Fitness', 'Camping', 'Cycling', 'Team Sports', 'Water Sports', 'Winter Sports']
      },
      beauty: {
        name: 'Beauty & Personal Care',
        subs: ['Skincare', 'Makeup', 'Haircare', 'Fragrance', 'Wellness', 'Tools']
      },
      toys: {
        name: 'Toys & Games',
        subs: ['Action Figures', 'Board Games', 'Puzzles', 'Educational', 'Outdoor Play', 'Dolls']
      },
      books: {
        name: 'Books & Media',
        subs: ['Fiction', 'Non-Fiction', 'Education', 'Movies', 'Music', 'Video Games']
      },
      automotive: {
        name: 'Automotive',
        subs: ['Car Parts', 'Accessories', 'Tires', 'Tools', 'Motorcycles', 'Electronics']
      },
      pets: {
        name: 'Pet Supplies',
        subs: ['Dogs', 'Cats', 'Fish', 'Birds', 'Small Animals', 'Healthcare']
      },
      office: {
        name: 'Office Supplies',
        subs: ['Stationery', 'Office Furniture', 'Organization', 'Printers', 'Paper Products']
      },
      music: {
        name: 'Musical Instruments',
        subs: ['Guitars', 'Keyboards', 'Drums', 'Recording Gear', 'DJ Equipment', 'Orchestral']
      },
      art: {
        name: 'Arts & Crafts',
        subs: ['Painting', 'Sewing', 'Scrapbooking', 'Craft Kits', 'Needlework']
      },
      baby: {
        name: 'Baby Products',
        subs: ['Diapering', 'Feeding', 'Gear', 'Nursery', 'Safety', 'Toys']
      },
      industrial: {
        name: 'Industrial & Scientific',
        subs: ['Tools', 'Supplies', 'Safety', 'Janitorial', 'Education', 'Lab Gear']
      }
    },
    hero: {
      badge: 'New Arrival 2025 Collection',
      title: `Premium Tech for Modern Living at ${BrandConfig.name}`,
      subtitle: `Experience the perfect blend of minimalist design and high-performance technology. Hand-curated essentials for your creative workspace.`,
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
      featuredTitle: 'Featured Products',
      featuredDesc: 'Discover our most popular products chosen by our community of innovators and creators.',
      browseAll: 'Browse All Products',
      newsletterTitle: `Join the ${BrandConfig.name} Community`,
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
      orderSuccessDesc: `Thank you for shopping with ${BrandConfig.name}. Your order is being processed.`
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
    auth: {
      loginTitle: 'Welcome Back',
      loginDesc: 'Enter your credentials to access your account',
      loginButton: 'Sign In',
      loginSuccess: 'Login Successful',
      loginSuccessDesc: 'Welcome back to our store!',
      loginError: 'Login Failed',
      registerTitle: 'Create Account',
      registerDesc: 'Join us for a premium shopping experience',
      registerButton: 'Create Account',
      registerSuccess: 'Account Created',
      registerSuccessDesc: 'Your account has been successfully created.',
      registerError: 'Registration Failed',
      name: 'Full Name',
      email: 'Email Address',
      password: 'Password',
      logout: 'Sign Out',
      noAccount: 'Don\'t have an account?',
      registerLink: 'Sign Up',
      haveAccount: 'Already have an account?',
      loginLink: 'Sign In',
      googleLogin: 'Continue with Google',
      or: 'or continue with email'
    },
    about: {
      title: 'Our Story',
      subtitle: `Crafting excellence since 2025. Discover why ${BrandConfig.name} is the choice of modern professionals.`,
      mission: 'Our Mission',
      missionText: `At ${BrandConfig.name}, our mission is to simplify modern life through curated technology. We believe that tools should not only be functional but also aesthetically pleasing and durable.`,
      vision: 'Our Vision',
      visionText: 'To become the global destination for lifestyle technology that empowers creativity and productivity in every home and office.',
      values: {
        quality: 'Uncompromising Quality',
        qualityText: 'Every product in our catalog undergoes rigorous testing to meet our standards.',
        design: 'Thoughtful Design',
        designText: 'We prioritize minimalism and functionality in every item we select.',
        community: 'Customer Centric',
        communityText: 'Our community is at the heart of everything we do. Your feedback shapes our future.'
      }
    },
    contact: {
      title: 'Get in Touch',
      subtitle: "Have a question or feedback? We'd love to hear from you.",
      infoTitle: 'Contact Information',
      infoDesc: 'Find us at our office or reach out via phone or email.',
      formTitle: 'Send us a Message',
      formDesc: 'Fill out the form below and we will get back to you as soon as possible.',
      name: 'Full Name',
      email: 'Email Address',
      subject: 'Subject',
      message: 'Message',
      send: 'Send Message',
      success: 'Message Sent!',
      successDesc: 'Thank you for contacting us. We will respond shortly.',
      placeholderName: 'Enter your name',
      placeholderEmail: 'Enter your email',
      placeholderSubject: 'How can we help?',
      placeholderMessage: 'Type your message here...'
    },
    footer: {
      desc: BrandConfig.description,
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
      photography: 'Fotografía',
      orders: 'Pedidos',
      admin: 'Admin',
      about: 'Sobre Nosotros',
      contact: 'Contacto',
      sell: 'Vender Producto',
      myProducts: 'Mi Inventario'
    },
    sell: {
      title: 'Vender un Producto',
      subtitle: 'Publica tu artículo en nuestro mercado y llega a miles de compradores.',
      basicInfo: 'Información Básica',
      productName: 'Nombre del Producto',
      category: 'Categoría',
      subcategory: 'Subcategoría',
      price: 'Precio (USD)',
      stock: 'Stock Inicial',
      description: 'Descripción Completa',
      media: 'Multimedia',
      imageUrl: 'URL de la Imagen',
      imageDesc: 'Pega un enlace directo a la imagen de tu producto (ej. de Unsplash o Pixabay).',
      specs: 'Especificaciones',
      weight: 'Peso',
      size: 'Dimensiones (Tamaño)',
      color: 'Color',
      batteryDuration: 'Duración de Batería',
      batteryCapacity: 'Capacidad de Batería',
      techSpecs: 'Especificaciones Técnicas',
      publish: 'Publicar Producto',
      success: '¡Producto Publicado!',
      successDesc: 'Tu producto ya está disponible en el catálogo.',
      error: 'Error al publicar el producto'
    },
    myProducts: {
      title: 'Mis Productos Publicados',
      subtitle: 'Gestiona tus anuncios activos y stock.',
      noProducts: 'Aún no has publicado ningún producto.',
      deleteConfirm: '¿Estás seguro de que deseas eliminar este producto?',
      deleteSuccess: 'Producto eliminado con éxito',
      edit: 'Editar',
      delete: 'Eliminar'
    },
    categories: {
      electronics: {
        name: 'Electrónica',
        subs: ['Portátiles', 'Smartphones', 'Audio', 'Cámaras', 'Tablets', 'Gaming', 'Wearables']
      },
      home: {
        name: 'Hogar y Cocina',
        subs: ['Muebles', 'Decoración', 'Camas y Baño', 'Electrodomésticos', 'Menaje', 'Almacenamiento']
      },
      fashion: {
        name: 'Moda y Ropa',
        subs: ['Ropa Hombre', 'Ropa Mujer', 'Niños', 'Accesorios', 'Zapatos', 'Joyería']
      },
      sports: {
        name: 'Deportes y Exterior',
        subs: ['Fitness', 'Camping', 'Ciclismo', 'Deportes de Equipo', 'Deportes Acuáticos', 'Invierno']
      },
      beauty: {
        name: 'Belleza y Cuidado Personal',
        subs: ['Cuidado Piel', 'Maquillaje', 'Cuidado Cabello', 'Perfumes', 'Bienestar', 'Herramientas']
      },
      toys: {
        name: 'Juguetes y Juegos',
        subs: ['Figuras de Acción', 'Juegos de Mesa', 'Puzles', 'Educativos', 'Aire Libre', 'Muñecas']
      },
      books: {
        name: 'Libros y Multimedia',
        subs: ['Ficción', 'No Ficción', 'Educación', 'Cine', 'Música', 'Videojuegos']
      },
      automotive: {
        name: 'Automotriz',
        subs: ['Repuestos', 'Accesorios', 'Neumáticos', 'Herramientas', 'Motos', 'Electrónica']
      },
      pets: {
        name: 'Mascotas',
        subs: ['Perros', 'Gatos', 'Peces', 'Aves', 'Pequeños Animales', 'Salud']
      },
      office: {
        name: 'Oficina y Papelería',
        subs: ['Papelería', 'Muebles Oficina', 'Organización', 'Impresoras', 'Papel']
      },
      music: {
        name: 'Instrumentos Musicales',
        subs: ['Guitarras', 'Teclados', 'Baterías', 'Grabación', 'Equipos DJ', 'Orquestal']
      },
      art: {
        name: 'Arte y Manualidades',
        subs: ['Pintura', 'Costura', 'Scrapbooking', 'Kits', 'Bordado']
      },
      baby: {
        name: 'Productos para Bebé',
        subs: ['Pañales', 'Alimentación', 'Equipamiento', 'Dormitorio', 'Seguridad', 'Juguetes']
      },
      industrial: {
        name: 'Industrial y Científico',
        subs: ['Herramientas', 'Suministros', 'Seguridad', 'Limpieza', 'Educación', 'Laboratorio']
      }
    },
    hero: {
      badge: 'Nueva Colección 2025',
      title: `Tecnología Premium para la Vida Moderna en ${BrandConfig.name}`,
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
      featuredTitle: 'Productos Destacados',
      featuredDesc: 'Descubre nuestros productos más populares elegidos por nuestra comunidad de innovadores y creadores.',
      browseAll: 'Ver todos los productos',
      newsletterTitle: `Únete a la Comunidad ${BrandConfig.name}`,
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
      itemsCount: 'artículos',
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
      orderSuccessDesc: `Gracias por comprar en ${BrandConfig.name}. Tu pedido está siendo procesado.`
    },
    orders: {
      title: 'Tus Pedidos',
      subtitle: 'Gestiona y rastrea tus compras recientes.',
      orderId: 'ID del Pedido',
      datePlaced: 'Fecha del Pedido',
      total: 'Total',
      details: 'Details',
      track: 'Rastrear Envío',
      noOrders: 'Sin pedidos aún',
      noOrdersDesc: 'Cuando realices una compra, aparecerá aquí.'
    },
    auth: {
      loginTitle: 'Bienvenido de nuevo',
      loginDesc: 'Ingresa tus credenciales para acceder a tu cuenta',
      loginButton: 'Iniciar Sesión',
      loginSuccess: 'Inicio de sesión exitoso',
      loginSuccessDesc: '¡Bienvenido de nuevo a nuestra tienda!',
      loginError: 'Error al iniciar sesión',
      registerTitle: 'Crear Cuenta',
      registerDesc: 'Únete a nosotros para una experiencia de compra premium',
      registerButton: 'Crear Cuenta',
      registerSuccess: 'Cuenta Creada',
      registerSuccessDesc: 'Tu cuenta ha sido creada con éxito.',
      registerError: 'Error al registrarse',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      password: 'Contraseña',
      logout: 'Cerrar Sesión',
      noAccount: '¿No tienes una cuenta?',
      registerLink: 'Regístrate',
      haveAccount: '¿Ya tienes una cuenta?',
      loginLink: 'Inicia Sesión',
      googleLogin: 'Continuar con Google',
      or: 'o continúa con email'
    },
    about: {
      title: 'Nuestra Historia',
      subtitle: `Excelencia desde 2025. Descubre por qué ${BrandConfig.name} es la elección de los profesionales modernos.`,
      mission: 'Nuestra Misión',
      missionText: `En ${BrandConfig.name}, nuestra misión es simplificar la vida moderna a través de tecnología seleccionada. Creemos que las herramientas no solo deben ser funcionales, sino también estéticas y duraderas.`,
      vision: 'Nuestra Vision',
      visionText: 'Convertirnos en el destino global para la tecnología de estilo de vida que potencia la creatividad y productividad en cada hogar y oficina.',
      values: {
        quality: 'Calidad Sin Compromisos',
        qualityText: 'Cada producto en nuestro catálogo pasa por rigurosas pruebas para cumplir con nuestros estándares.',
        design: 'Diseño Cuidadoso',
        designText: 'Priorizamos el minimalismo y la funcionalidad en cada artículo que seleccionamos.',
        community: 'Centrados en el Cliente',
        communityText: 'Nuestra comunidad está en el corazón de todo lo que hacemos. Sus comentarios dan forma a nuestro futuro.'
      }
    },
    contact: {
      title: 'Ponte en Contacto',
      subtitle: "¿Tienes alguna pregunta o comentario? Nos encantaría escucharte.",
      infoTitle: 'Información de Contacto',
      infoDesc: 'Encuéntranos en nuestra oficina o contáctanos por teléfono o correo.',
      formTitle: 'Envíanos un Mensaje',
      formDesc: 'Completa el formulario a continuación y nos pondremos en contacto contigo lo antes posible.',
      name: 'Nombre Completo',
      email: 'Correo Electrónico',
      subject: 'Asunto',
      message: 'Message',
      send: 'Enviar Mensaje',
      success: '¡Mensaje Enviado!',
      successDesc: 'Gracias por contactarnos. Responderemos a la brevedad.',
      placeholderName: 'Introduce tu nombre',
      placeholderEmail: 'Introduce tu correo',
      placeholderSubject: '¿Cómo podemos ayudarte?',
      placeholderMessage: 'Escribe tu mensaje aquí...'
    },
    footer: {
      desc: BrandConfig.description,
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
