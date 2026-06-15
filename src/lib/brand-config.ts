/**
 * Archivo de configuración centralizado para la personalización de la empresa.
 * Aquí puedes cambiar el nombre, descripción, contacto y redes sociales.
 */
export const BrandConfig = {
  name: "NextShop",
  fullName: "NextShop E-commerce S.L.",
  description: "Productos tecnológicos y de estilo de vida premium seleccionados para el profesional moderno.",
  contact: {
    email: "hello@nextshop.com",
    phone: "+1 (555) 000-0000",
    address: "123 Modern Ave, Design City, 10101"
  },
  socials: {
    twitter: "https://twitter.com/nextshop",
    instagram: "https://instagram.com/nextshop",
    github: "https://github.com/nextshop"
  },
  // Configuración visual
  logo: {
    // Puedes cambiar el nombre del icono de lucide-react (ej: ShoppingBag, Zap, Rocket)
    iconName: "Rocket" as const, 
  }
};
