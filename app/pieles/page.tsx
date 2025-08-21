"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
  Package,
} from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export default function PielesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("todos")
  const [selectedColor, setSelectedColor] = useState("todos")
  const [viewMode, setViewMode] = useState("grid")
  const [favorites, setFavorites] = useState<number[]>([])

  const categories = [
    { id: "todos", name: "Todas las Pieles", count: 18 },
    { id: "cerdo", name: "Piel de Cerdo", count: 5 },
    { id: "res", name: "Vaqueta de Res", count: 4 },
    { id: "borrego", name: "Piel de Borrego", count: 3 },
    { id: "carnaza", name: "Carnaza", count: 3 },
    { id: "pelo", name: "Piel con Pelo", count: 3 },
  ]

  const colors = [
    { id: "todos", name: "Todos los colores" },
    { id: "natural", name: "Natural" },
    { id: "negro", name: "Negro" },
    { id: "marron", name: "Marrón" },
    { id: "rojo", name: "Rojo" },
    { id: "verde", name: "Verde" },
    { id: "azul", name: "Azul" },
  ]

  const pieles = [
    {
      id: 1,
      name: "Piel de Cerdo Natural",
      price: 450,
      unit: "por m²",
      originalPrice: null,
      image: "/placeholder-kef6x.png",
      category: "cerdo",
      color: "natural",
      rating: 4.8,
      reviews: 32,
      description: "Piel de cerdo curtida tradicionalmente, ideal para equipales y tapicería.",
      features: ["Curtido tradicional", "Textura suave", "Resistente"],
      badge: "Más vendida",
      badgeColor: "bg-orange-600",
      thickness: "2-3mm",
      availability: "En stock",
    },
    {
      id: 2,
      name: "Vaqueta de Res Premium",
      price: 680,
      unit: "por m²",
      originalPrice: 750,
      image: "/brown-vaqueta-leather.png",
      category: "res",
      color: "marron",
      rating: 4.9,
      reviews: 28,
      description: "Vaqueta de res de alta calidad, perfecta para muebles de lujo.",
      features: ["Calidad premium", "Acabado perfecto", "Larga duración"],
      badge: "Premium",
      badgeColor: "bg-amber-600",
      thickness: "3-4mm",
      availability: "En stock",
    },
    {
      id: 3,
      name: "Piel de Borrego Negra",
      price: 520,
      unit: "por m²",
      originalPrice: null,
      image: "/placeholder-ww7sl.png",
      category: "borrego",
      color: "negro",
      rating: 4.7,
      reviews: 19,
      description: "Piel de borrego suave y flexible, ideal para tapicería fina.",
      features: ["Muy suave", "Flexible", "Elegante"],
      badge: "Exclusiva",
      badgeColor: "bg-purple-600",
      thickness: "1.5-2mm",
      availability: "Limitada",
    },
    {
      id: 4,
      name: "Carnaza Reforzada",
      price: 320,
      unit: "por m²",
      originalPrice: null,
      image: "/carnaza-leather-hide.png",
      category: "carnaza",
      color: "natural",
      rating: 4.5,
      reviews: 24,
      description: "Carnaza reforzada para estructuras y bases de equipales.",
      features: ["Muy resistente", "Económica", "Versátil"],
      badge: "Económica",
      badgeColor: "bg-green-600",
      thickness: "4-5mm",
      availability: "En stock",
    },
    {
      id: 5,
      name: "Piel con Pelo Natural",
      price: 890,
      unit: "por m²",
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      category: "pelo",
      color: "natural",
      rating: 4.6,
      reviews: 15,
      description: "Piel con pelo natural, perfecta para decoración rústica.",
      features: ["Pelo natural", "Única", "Decorativa"],
      badge: "Especial",
      badgeColor: "bg-blue-600",
      thickness: "3-4mm",
      availability: "Por pedido",
    },
    {
      id: 6,
      name: "Piel de Cerdo Roja",
      price: 480,
      unit: "por m²",
      originalPrice: null,
      image: "/placeholder.svg?height=300&width=300",
      category: "cerdo",
      color: "rojo",
      rating: 4.4,
      reviews: 21,
      description: "Piel de cerdo teñida en rojo vibrante, para diseños únicos.",
      features: ["Color vibrante", "Teñido artesanal", "Resistente al sol"],
      badge: null,
      badgeColor: "",
      thickness: "2-3mm",
      availability: "En stock",
    },
  ]

  const filteredPieles = pieles.filter((piel) => {
    const matchesSearch = piel.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "todos" || piel.category === selectedCategory
    const matchesColor = selectedColor === "todos" || piel.color === selectedColor
    return matchesSearch && matchesCategory && matchesColor
  })

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="text-amber-800 hover:text-orange-600">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Volver
                </Button>
              </Link>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-amber-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-serif font-bold text-lg">C</span>
                </div>
                <div>
                  <h1 className="text-xl font-serif font-bold text-amber-900">Catálogo de Pieles</h1>
                  <p className="text-sm text-amber-700">Materia Prima de Calidad</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className={viewMode === "grid" ? "bg-orange-600 hover:bg-orange-700" : "text-amber-800"}
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className={viewMode === "list" ? "bg-orange-600 hover:bg-orange-700" : "text-amber-800"}
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
                <label className="block text-sm font-medium text-amber-900 mb-2">Buscar</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-600 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Buscar pieles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-orange-200 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-amber-900 mb-3">Tipo de Piel</label>
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
                        {category.count}
                      </Badge>
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-amber-900 mb-3">Color</label>
                <div className="space-y-2">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors duration-200 ${
                        selectedColor === color.id
                          ? "bg-orange-100 text-orange-700 font-medium"
                          : "text-amber-700 hover:bg-orange-50"
                      }`}
                    >
                      {color.name}
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
                Pieles de Alta Calidad ({filteredPieles.length})
              </h2>
            </div>

            <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}>
              {filteredPieles.map((piel) => (
                <Card
                  key={piel.id}
                  className={`overflow-hidden shadow-lg border-0 group hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div className={`relative ${viewMode === "list" ? "w-64 flex-shrink-0" : "h-64"} overflow-hidden`}>
                    <img
                      src={piel.image || "/placeholder.svg"}
                      alt={piel.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {piel.badge && (
                      <Badge className={`absolute top-3 left-3 ${piel.badgeColor} text-white`}>{piel.badge}</Badge>
                    )}
                    <button
                      onClick={() => toggleFavorite(piel.id)}
                      className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors duration-200"
                    >
                      <Heart
                        className={`w-4 h-4 ${
                          favorites.includes(piel.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        }`}
                      />
                    </button>
                    <div className="absolute bottom-3 left-3">
                      <Badge
                        className={`${
                          piel.availability === "En stock"
                            ? "bg-green-600"
                            : piel.availability === "Limitada"
                              ? "bg-yellow-600"
                              : "bg-red-600"
                        } text-white`}
                      >
                        <Package className="w-3 h-3 mr-1" />
                        {piel.availability}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <Button size="sm" className="bg-white text-amber-900 hover:bg-orange-50">
                        <Eye className="w-4 h-4 mr-2" />
                        Ver detalles
                      </Button>
                    </div>
                  </div>

                  <CardContent className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-serif font-bold text-amber-900 group-hover:text-orange-600 transition-colors duration-300">
                        {piel.name}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm text-amber-700">{piel.rating}</span>
                        <span className="text-xs text-amber-600">({piel.reviews})</span>
                      </div>
                    </div>

                    <p className="text-amber-800 text-sm mb-3 leading-relaxed">{piel.description}</p>

                    <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                      <div className="bg-orange-50 p-2 rounded">
                        <span className="font-medium text-amber-900">Grosor:</span>
                        <br />
                        <span className="text-amber-700">{piel.thickness}</span>
                      </div>
                      <div className="bg-orange-50 p-2 rounded">
                        <span className="font-medium text-amber-900">Color:</span>
                        <br />
                        <span className="text-amber-700 capitalize">{piel.color}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {piel.features.map((feature, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-orange-50 text-orange-700">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-orange-600">${piel.price}</span>
                        <span className="text-sm text-amber-700">{piel.unit}</span>
                        {piel.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">${piel.originalPrice}</span>
                        )}
                      </div>
                      {piel.originalPrice && (
                        <Badge className="bg-red-100 text-red-700">
                          -{Math.round(((piel.originalPrice - piel.price) / piel.originalPrice) * 100)}%
                        </Badge>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Button className="flex-1 bg-orange-600 hover:bg-orange-700 transform hover:scale-105 transition-all duration-300">
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

            {filteredPieles.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-orange-600" />
                </div>
                <h3 className="text-xl font-serif font-bold text-amber-900 mb-2">No se encontraron pieles</h3>
                <p className="text-amber-700 mb-4">Intenta ajustar tus filtros de búsqueda</p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("todos")
                    setSelectedColor("todos")
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
          href="https://wa.me/523314364163?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20pieles%20de%20alta%20calidad"
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
  )
}
