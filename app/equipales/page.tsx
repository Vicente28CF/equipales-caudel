"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  Search,
  Filter,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  MessageCircle,
  Grid3X3,
  List,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface Equipal {
  id: number;
  name: string;
  price: number;
  originalPrice: number | null;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  badge: string | null;
  badgeColor: string;
}

export default function EquipalesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("todos");
  const [priceRange, setPriceRange] = useState("todos");
  const [viewMode, setViewMode] = useState("grid");
  const [favorites, setFavorites] = useState<number[]>([]);

  const categories = [
    { id: "todos", name: "Todos los Equipales" },
    { id: "asientos", name: "Asientos" },
    { id: "salas", name: "Salas" },
    { id: "juegos", name: "Juegos Completos" },
    { id: "mesas", name: "Mesas" },
    { id: "personalizados", name: "Personalizados" },
  ];

  const priceRanges = [
    { id: "todos", name: "Todos los precios" },
    { id: "1000-3000", name: "$1,000 - $3,000" },
    { id: "3000-5000", name: "$3,000 - $5,000" },
    { id: "5000-8000", name: "$5,000 - $8,000" },
    { id: "8000+", name: "$8,000+" },
  ];

  const equipales: Equipal[] = [
    {
      id: 1,
      name: "Equipal Tradicional",
      price: 2500,
      originalPrice: 3000,
      image: "/equipal-presentacion.jpeg",
      category: "asientos",
      rating: 4.8,
      reviews: 24,
      description:
        "Silla equipal tradicional con estructura de sabino y piel curtida artesanalmente.",
      features: ["Piel natural", "Madera de sabino", "Resistente al clima"],
      badge: "Más vendido",
      badgeColor: "bg-orange-600",
    },
    {
      id: 2,
      name: "Equipal Premium",
      price: 4800,
      originalPrice: null,
      image: "/equipal-presentacion3.jpeg",
      category: "asientos",
      rating: 4.9,
      reviews: 18,
      description:
        "Sillón equipal de lujo con piel premium y acabados especiales.",
      features: ["Piel premium", "Cojines incluidos", "Diseño ergonómico"],
      badge: "Premium",
      badgeColor: "bg-amber-600",
    },
    {
      id: 3,
      name: "Juego Sala + Equipal",
      price: 12000,
      originalPrice: 15000,
      image: "/sala2.jpeg",
      category: "juegos",
      rating: 4.7,
      reviews: 12,
      description: "Juego completo de sala con 2 sillones y 1 silla equipal.",
      features: ["3 piezas", "Colores combinables", "Garantía 2 años"],
      badge: "Oferta",
      badgeColor: "bg-red-600",
    },
    {
      id: 4,
      name: "Silla Equipal Moderna",
      price: 3200,
      originalPrice: null,
      image: "/equipal1.jpeg",
      category: "asientos",
      rating: 4.6,
      reviews: 31,
      description:
        "Diseño moderno manteniendo la esencia tradicional del equipal.",
      features: [
        "Diseño contemporáneo",
        "Múltiples colores",
        "Fácil mantenimiento",
      ],
      badge: "Nuevo",
      badgeColor: "bg-green-600",
    },
    {
      id: 5,
      name: "Mesa Equipal Redonda",
      price: 3800,
      originalPrice: null,
      image: "/comedor1.jpeg",
      category: "mesas",
      rating: 4.5,
      reviews: 8,
      description:
        "Mesa redonda con base de equipal, perfecta para exteriores.",
      features: ["Base equipal", "Tapa de madera", "Resistente al agua"],
      badge: null,
      badgeColor: "",
    },
    {
      id: 6,
      name: "Equipal Personalizado",
      price: 5500,
      originalPrice: null,
      image: "/comedor.jpeg",
      category: "personalizados",
      rating: 5.0,
      reviews: 6,
      description:
        "Equipal hecho a medida según tus especificaciones y gustos.",
      features: ["Diseño único", "Colores a elección", "Grabado personalizado"],
      badge: "Exclusivo",
      badgeColor: "bg-purple-600",
    },
    {
      id: 7,
      name: "Equipal Tradicional",
      price: 2500,
      originalPrice: 3000,
      image: "/cantinero1.jpeg",
      category: "asientos",
      rating: 4.8,
      reviews: 24,
      description:
        "Silla equipal tradicional con estructura de sabino y piel curtida artesanalmente.",
      features: ["Piel natural", "Madera de sabino", "Resistente al clima"],
      badge: "Más vendido",
      badgeColor: "bg-orange-600",
    },
    {
      id: 8,
      name: "Sillón Equipal Premium",
      price: 4800,
      originalPrice: null,
      image: "/equipal2.jpeg",
      category: "sillones",
      rating: 4.9,
      reviews: 18,
      description:
        "Sillón equipal de lujo con piel premium y acabados especiales.",
      features: ["Piel premium", "Cojines incluidos", "Diseño ergonómico"],
      badge: "Premium",
      badgeColor: "bg-amber-600",
    },
    {
      id: 9,
      name: "Juego Sala + Equipal",
      price: 12000,
      originalPrice: 15000,
      image: "/galeria5.jpeg",
      category: "juegos",
      rating: 4.7,
      reviews: 12,
      description: "Juego completo de sala con 2 sillones y 1 silla equipal.",
      features: ["3 piezas", "Colores combinables", "Garantía 2 años"],
      badge: "Oferta",
      badgeColor: "bg-red-600",
    },
    {
      id: 10,
      name: "Silla Equipal Moderna",
      price: 3200,
      originalPrice: null,
      image: "/galeria4.jpeg",
      category: "asientos",
      rating: 4.6,
      reviews: 31,
      description:
        "Diseño moderno manteniendo la esencia tradicional del equipal.",
      features: [
        "Diseño contemporáneo",
        "Múltiples colores",
        "Fácil mantenimiento",
      ],
      badge: "Nuevo",
      badgeColor: "bg-green-600",
    },
    {
      id: 11,
      name: "Mesa Equipal Redonda",
      price: 3800,
      originalPrice: null,
      image: "/galeria1.jpeg",
      category: "mesas",
      rating: 4.5,
      reviews: 8,
      description:
        "Mesa redonda con base de equipal, perfecta para exteriores.",
      features: ["Base equipal", "Tapa de madera", "Resistente al agua"],
      badge: null,
      badgeColor: "",
    },
    {
      id: 12,
      name: "Equipal Personalizado",
      price: 5500,
      originalPrice: null,
      image: "/sala1.jpeg",
      category: "personalizados",
      rating: 5.0,
      reviews: 6,
      description:
        "Equipal hecho a medida según tus especificaciones y gustos.",
      features: ["Diseño único", "Colores a elección", "Grabado personalizado"],
      badge: "Exclusivo",
      badgeColor: "bg-purple-600",
    },
    {
      id: 13,
      name: "Silla Equipal Moderna",
      price: 3200,
      originalPrice: null,
      image: "/galeria4.jpeg",
      category: "asientos",
      rating: 4.6,
      reviews: 31,
      description:
        "Diseño moderno manteniendo la esencia tradicional del equipal.",
      features: [
        "Diseño contemporáneo",
        "Múltiples colores",
        "Fácil mantenimiento",
      ],
      badge: "Nuevo",
      badgeColor: "bg-green-600",
    },
    {
      id: 14,
      name: "Mesa Equipal Redonda",
      price: 3800,
      originalPrice: null,
      image: "/galeria1.jpeg",
      category: "mesas",
      rating: 4.5,
      reviews: 8,
      description:
        "Mesa redonda con base de equipal, perfecta para exteriores.",
      features: ["Base equipal", "Tapa de madera", "Resistente al agua"],
      badge: null,
      badgeColor: "",
    },
    {
      id: 15,
      name: "Equipal Personalizado",
      price: 5500,
      originalPrice: null,
      image: "/sala1.jpeg",
      category: "personalizados",
      rating: 5.0,
      reviews: 6,
      description:
        "Equipal hecho a medida según tus especificaciones y gustos.",
      features: ["Diseño único", "Colores a elección", "Grabado personalizado"],
      badge: "Exclusivo",
      badgeColor: "bg-purple-600",
    },
  ];

  const filteredEquipales = equipales.filter((equipal) => {
    const matchesSearch = equipal.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "todos" || equipal.category === selectedCategory;
    const matchesPrice = (() => {
      if (priceRange === "todos") return true;
      if (priceRange === "1000-3000")
        return equipal.price >= 1000 && equipal.price <= 3000;
      if (priceRange === "3000-5000")
        return equipal.price >= 3000 && equipal.price <= 5000;
      if (priceRange === "5000-8000")
        return equipal.price >= 5000 && equipal.price <= 8000;
      if (priceRange === "8000+") return equipal.price >= 8000;
      return true;
    })();
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]
    );
  };

  const handleWhatsAppQuote = (equipal: Equipal) => {
    const message = `Hola, me interesa cotizar este producto:

📦 *${equipal.name}*
💰 Precio: $${equipal.price.toLocaleString()}
🖼️ Imagen: ${window.location.origin}${equipal.image}

¿Podrían darme más información y disponibilidad?`;

    const whatsappUrl = `https://wa.me/523311491328?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-amber-800 hover:text-orange-600"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-lg">
                    C
                  </span>
                </div>
                <div>
                  <h1 className="text-xl font-serif font-bold text-amber-900">
                    Catálogo de Equipales
                  </h1>
                  <p className="text-sm text-amber-700">Tradición Artesanal</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={
                  viewMode === "grid"
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "text-amber-800"
                }
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={
                  viewMode === "list"
                    ? "bg-orange-600 hover:bg-orange-700"
                    : "text-amber-800"
                }
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="text-lg font-serif font-bold text-amber-900 mb-4 flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                Filtros
              </h3>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-amber-900 mb-2">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar equipales..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-orange-200 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-amber-900 mb-3">
                  Categorías
                </label>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 flex justify-between items-center ${
                        selectedCategory === category.id
                          ? "bg-orange-100 text-orange-700 font-medium"
                          : "text-amber-700 hover:bg-orange-50"
                      }`}
                    >
                      <span>{category.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        {}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-amber-900 mb-3">
                  Rango de Precio
                </label>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <button
                      key={range.id}
                      onClick={() => setPriceRange(range.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        priceRange === range.id
                          ? "bg-orange-100 text-orange-700 font-medium"
                          : "text-amber-700 hover:bg-orange-50"
                      }`}
                    >
                      {range.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif font-bold text-amber-900">
                Equipales Artesanales ({filteredEquipales.length})
              </h2>
            </div>

            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  : "space-y-6"
              }
            >
              {filteredEquipales.map((equipal) => (
                <Card
                  key={equipal.id}
                  className={`overflow-hidden shadow-lg border-0 group hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div
                    className={`relative ${
                      viewMode === "list" ? "w-64 flex-shrink-0" : "h-64"
                    } overflow-hidden`}
                  >
                    <img
                      src={equipal.image || "/placeholder.svg"}
                      alt={equipal.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {equipal.badge && (
                      <Badge
                        className={`absolute top-3 left-3 ${equipal.badgeColor} text-white`}
                      >
                        {equipal.badge}
                      </Badge>
                    )}
                    <button
                      onClick={() => toggleFavorite(equipal.id)}
                      className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(equipal.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button
                        size="sm"
                        className="bg-white text-amber-900 hover:bg-orange-50"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Ver detalles
                      </Button>
                    </div>
                  </div>

                  <CardContent
                    className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-serif font-bold text-amber-900 group-hover:text-orange-600 transition-colors duration-300">
                        {equipal.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-amber-700">
                          {equipal.rating}
                        </span>
                        <span className="text-xs text-amber-600">
                          ({equipal.reviews})
                        </span>
                      </div>
                    </div>

                    <p className="text-amber-800 text-sm mb-3 leading-relaxed">
                      {equipal.description}
                    </p>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {equipal.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          className="text-xs bg-orange-50 text-orange-700"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-orange-600">
                          ${equipal.price.toLocaleString()}
                        </span>
                        {equipal.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${equipal.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {equipal.originalPrice && (
                        <Badge className="bg-red-100 text-red-700">
                          -
                          {Math.round(
                            ((equipal.originalPrice - equipal.price) /
                              equipal.originalPrice) *
                              100
                          )}
                          %
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        onClick={() => handleWhatsAppQuote(equipal)}
                        className="flex-1 bg-orange-600 hover:bg-orange-700 transform hover:scale-105 transition-all duration-300"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Cotizar
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredEquipales.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-orange-600" />
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">
                  No se encontraron equipales
                </h3>
                <p className="text-amber-700 mb-4">
                  Intenta ajustar tus filtros de búsqueda
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("todos");
                    setPriceRange("todos");
                  }}
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* WhatsApp Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/523311491328?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20equipales%20artesanales"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-pulse hover:animate-none"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-bounce" />
          <span className="absolute -top-12 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
            ¡Chatea con nosotros!
          </span>
        </a>
      </div>
    </div>
  );
}
