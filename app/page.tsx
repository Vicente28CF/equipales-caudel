"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Award,
  Users,
  Clock,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Palette,
  Sparkles,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState({
    video1: false,
    video2: false,
  });
  const video1Ref = useRef<HTMLVideoElement>(null);
  const video2Ref = useRef<HTMLVideoElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "Equipales individuales",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentImageIndex(
        currentImageIndex < galleryImages.length - 1 ? currentImageIndex + 1 : 0
      );
    }
    if (isRightSwipe) {
      setCurrentImageIndex(
        currentImageIndex > 0 ? currentImageIndex - 1 : galleryImages.length - 1
      );
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const galleryImages = [
    {
      src: "/equipal-presentacion3.jpeg?height=300&width=400&query=Mexican equipal individual chair traditional leather handcrafted artisan quality",
      alt: "Equipal Individual",
    },
    {
      src: "/galeria4.jpeg?height=300&width=400&query=Mexican equipal armchair with arms traditional leather upholstery wooden frame",
      alt: "Comedor con 10 Equipales Tradicionales",
    },
    {
      src: "/galeria1.jpeg?height=300&width=400&query=Complete Mexican equipal living room set multiple chairs traditional furniture",
      alt: "Comedor con 6 Equipales Tradicionales",
    },
    {
      src: "/galeria5.jpeg?height=300&width=400&query=Mexican equipal rocking chair traditional handcrafted leather seat wooden frame",
      alt: "Banco forrado con piel de res",
    },
    {
      src: "/galeria2.jpeg?height=300&width=400&query=Mexican equipal bar stool high chair traditional leather seat wooden frame",
      alt: "Periqueras",
    },
    {
      src: "/galeria6.jpeg?height=300&width=400&query=Mexican equipal love seat two person bench traditional leather upholstery",
      alt: "Paquete de Comedores para negocio",
    },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        window.location.href = result.mailtoLink;

        setSubmitMessage(
          "¡Perfecto! Se ha abierto tu cliente de email con la cotización lista para enviar."
        );
        setFormData({
          name: "",
          phone: "",
          email: "",
          interest: "Equipales individuales",
          message: "",
        });
      } else {
        setSubmitMessage(
          "Hubo un error al procesar tu solicitud. Por favor intenta de nuevo."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmitMessage(
        "Error de conexión. Por favor verifica tu internet e intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in-up");
        }
      });
    }, observerOptions);

    const slideUpObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-up-visible");
        }
      });
    }, observerOptions);

    const slideInObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slide-in-visible");
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".animate-on-scroll");
    const slideUpElements = document.querySelectorAll(
      ".animate-on-scroll-slide-up"
    );
    const slideInElements = document.querySelectorAll(
      ".animate-slide-in-right"
    );

    animatedElements.forEach((el) => observer.observe(el));
    slideUpElements.forEach((el) => slideUpObserver.observe(el));
    slideInElements.forEach((el) => slideInObserver.observe(el));

    return () => {
      observer.disconnect();
      slideUpObserver.disconnect();
      slideInObserver.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-orange-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                <img
                  src="/logo-equipales-caudel2.png"
                  alt="Logo Equipales Caudel"
                  className="w-24 h-24 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold text-amber-900">
                  Equipales Caudel
                </h1>
                <p className="text-sm text-amber-700">Tradición Artesanal</p>
              </div>
            </div>

            <nav className="hidden md:flex space-x-8">
              <button
                onClick={() => scrollToSection("productos")}
                className="text-amber-800 hover:text-orange-600 font-medium transition-colors duration-300 hover:scale-105"
              >
                Productos
              </button>
              <button
                onClick={() => scrollToSection("tradicion")}
                className="text-amber-800 hover:text-orange-600 font-medium transition-colors duration-300 hover:scale-105"
              >
                Nuestra Historia
              </button>
              <button
                onClick={() => scrollToSection("galeria")}
                className="text-amber-800 hover:text-orange-600 font-medium transition-colors duration-300 hover:scale-105"
              >
                Galería
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="text-amber-800 hover:text-orange-600 font-medium transition-colors duration-300 hover:scale-105"
              >
                Contacto
              </button>
            </nav>

            <button
              className="md:hidden p-2 rounded-lg hover:bg-orange-50 transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-amber-800" />
              ) : (
                <Menu className="w-6 h-6 text-amber-800" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-orange-100 animate-fade-in">
              <nav className="flex flex-col space-y-4">
                <button
                  onClick={() => scrollToSection("productos")}
                  className="text-left text-amber-800 hover:text-orange-600 font-medium transition-colors duration-300 py-2"
                >
                  Productos
                </button>
                <button
                  onClick={() => scrollToSection("tradicion")}
                  className="text-left text-amber-800 hover:text-orange-600 font-medium transition-colors duration-300 py-2"
                >
                  Nuestra Historia
                </button>
                <button
                  onClick={() => scrollToSection("galeria")}
                  className="text-left text-amber-800 hover:text-orange-600 font-medium transition-colors duration-300 py-2"
                >
                  Galería
                </button>
                <button
                  onClick={() => scrollToSection("contacto")}
                  className="text-left text-amber-800 hover:text-orange-600 font-medium transition-colors duration-300 py-2"
                >
                  Contacto
                </button>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 animate-on-scroll bg-gradient-to-r from-amber-100 to-orange-100 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll">
              <Badge className="mb-4 bg-orange-100 text-orange-800 hover:bg-orange-200 transform hover:scale-105 transition-all duration-300">
                Más de 20 años de tradición
              </Badge>
              <h2 className="text-5xl lg:text-6xl font-serif font-bold text-amber-900 mb-6 leading-tight">
                Equipales Artesanales de
                <span className="text-orange-600"> Jalisco</span>
              </h2>
              <p className="text-xl text-amber-800 mb-8 leading-relaxed">
                Equipales Caudel es fabricante especializado en equipales
                artesanales tradicionales de Jalisco. Creamos Equipales,
                comedores y salas únicos con estructura de madera de palo dulce,
                palo de rosa y tapizados con piel curtida artesanalmente,
                garantizando durabilidad, excelente acabado y precios directos
                de fábrica.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                  onClick={() => scrollToSection("productos")}
                >
                  Ver Catálogo
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50 px-8 py-3 bg-transparent transform hover:scale-105 transition-all duration-300 hover:shadow-lg"
                  onClick={() =>
                    window.open(
                      "https://maps.app.goo.gl/u8xipkfahEuzYm75A",
                      "_blank"
                    )
                  }
                >
                  Visitar Taller
                </Button>
              </div>
            </div>
            <div className="relative animate-on-scroll">
              <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl p-8">
                <img
                  src="/equipal-caudel.png"
                  alt="Equipal artesanal tradicional de Jalisco"
                  className="w-full transform hover:scale-105 transition-transform duration-500 animate-slide-in-right"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg animate-bounce-slow">
                <div className="flex items-center space-x-2">
                  <Award className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="font-semibold text-amber-900">
                      100% Artesanal
                    </p>
                    <p className="text-sm text-amber-700">Hecho a mano</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Clock, number: "20+", text: "Años de experiencia" },
              { icon: Users, number: "1000+", text: "Clientes satisfechos" },
              { icon: Award, number: "100%", text: "Artesanal" },
              { icon: Star, number: "5★", text: "Calidad premium" },
            ].map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:transform hover:scale-110 transition-all duration-300"
              >
                <div className="flex justify-center mb-3">
                  <stat.icon className="w-8 h-8 text-orange-600 group-hover:animate-pulse" />
                </div>
                <p className="text-3xl font-bold text-amber-900 group-hover:text-orange-600 transition-colors duration-300">
                  {stat.number}
                </p>
                <p className="text-amber-700">{stat.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section
        id="productos"
        className="py-20 bg-gradient-to-b from-orange-50 to-amber-50 animate-on-scroll"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h3 className="text-4xl font-serif font-bold text-amber-900 mb-4">
              Nuestros Equipales
            </h3>
            <p className="text-xl text-amber-800 max-w-3xl mx-auto">
              Cada equipal es una obra de arte funcional, creada con técnicas
              tradicionales y materiales de la más alta calidad.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="overflow-hidden shadow-xl border-0 group hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 animate-on-scroll">
              <div className="relative h-80 overflow-hidden">
                <img
                  src="/equipal-presentacion2.jpeg"
                  alt="Equipales Tradicionales"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <Badge className="absolute top-4 left-4 bg-orange-600 text-white">
                  Especialidad
                </Badge>
              </div>
              <CardContent className="p-8">
                <h4 className="text-2xl font-serif font-bold text-amber-900 mb-3 group-hover:text-orange-600 transition-colors duration-300">
                  Equipales Tradicionales
                </h4>
                <p className="text-amber-800 mb-6 leading-relaxed">
                  Equipales, comedores y salas hechos con estructura de madera
                  de palo rosa, palo dulce y tapizados con piel curtida
                  artesanalmente. Perfectos para interiores y exteriores, cada
                  pieza refleja la auténtica tradición jalisciense.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-center text-amber-700">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                    Equipales individuales y juegos completos
                  </li>
                  <li className="flex items-center text-amber-700">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                    Resistentes al clima
                  </li>
                  <li className="flex items-center text-amber-700">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                    Diseños personalizables
                  </li>
                  <li className="flex items-center text-amber-700">
                    <span className="w-2 h-2 bg-orange-600 rounded-full mr-3"></span>
                    Madera de alta calidad
                  </li>
                </ul>
                <Button
                  className="w-full bg-orange-600 hover:bg-orange-700 transform hover:scale-105 transition-all duration-300"
                  onClick={() => {
                    window.location.href = "/equipales";
                  }}
                >
                  Ver Catálogo de Equipales
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Tradition Section */}
      <section id="tradicion" className="py-20 bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <h3 className="text-4xl font-serif font-bold text-amber-900 mb-6">
                Tradición Familiar de Más de 20 Años
              </h3>
              <p className="text-lg text-amber-800 mb-6 leading-relaxed">
                Nuestra historia comenzó hace más de 20 años en el corazón de
                Zacoalco de Torres, Jalisco, donde tras años de experiencia en
                el curtido de cuero, aprendió el arte ancestral de crear
                equipales auténticos de la mano de maestros artesanos. Cada
                pieza es el reflejo de tradición, pasión y calidad.
              </p>
              <p className="text-lg text-amber-800 mb-8 leading-relaxed">
                Hoy, dos generaciones después, seguimos preservando estas
                técnicas tradicionales, combinando la sabiduría ancestral con la
                innovación moderna para crear muebles que duran toda la vida.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-300 hover:transform hover:scale-105 animate-on-scroll">
                  <p className="text-2xl font-bold text-orange-600">2</p>
                  <p className="text-amber-800">Generaciones</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors duration-300 hover:transform hover:scale-105 animate-on-scroll">
                  <p className="text-2xl font-bold text-orange-600">100%</p>
                  <p className="text-amber-800">Hecho a mano</p>
                </div>
              </div>
            </div>
            <div className="relative animate-on-scroll">
              <img
                src="/equipal-craftsman.png"
                alt="Artesano trabajando en equipal tradicional"
                className="rounded-2xl shadow-2xl w-full hover:transform hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute -top-6 -right-6 bg-orange-600 text-white p-4 rounded-xl shadow-lg animate-pulse">
                <p className="font-bold">Zacoalco de Torres</p>
                <p className="text-sm opacity-90">Cuna del equipal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section
        id="galeria"
        className="py-20 bg-gradient-to-b from-amber-50 to-orange-50 animate-on-scroll"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h3 className="text-4xl font-serif font-bold text-amber-900 mb-4">
              Galería de Trabajos
            </h3>
            <p className="text-xl text-amber-800">
              Algunos de nuestros equipales más representativos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg cursor-pointer hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-105 animate-on-scroll active:scale-95"
                onClick={() => {
                  setCurrentImageIndex(index);
                  setIsModalOpen(true);
                }}
              >
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-semibold">{image.alt}</p>
                    <p className="text-sm opacity-90">Hecho a mano</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal with touch gesture support for mobile */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-orange-300 z-10 bg-black bg-opacity-50 rounded-full p-2 transition-colors duration-300 active:scale-95"
            >
              <X className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setCurrentImageIndex(
                  currentImageIndex > 0
                    ? currentImageIndex - 1
                    : galleryImages.length - 1
                )
              }
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-300 bg-black bg-opacity-50 rounded-full p-2 transition-colors duration-300 active:scale-95"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={() =>
                setCurrentImageIndex(
                  currentImageIndex < galleryImages.length - 1
                    ? currentImageIndex + 1
                    : 0
                )
              }
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-orange-300 bg-black bg-opacity-50 rounded-full p-2 transition-colors duration-300 active:scale-95"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <img
              src={galleryImages[currentImageIndex].src || "/placeholder.svg"}
              alt={galleryImages[currentImageIndex].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />

            {/* Swipe indicator for mobile users */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-3 py-1 rounded-full md:hidden">
              Desliza para navegar
            </div>
          </div>
        </div>
      )}

      {/* Custom Equipales Section */}
      <section className="py-20 bg-gradient-to-br from-amber-900 via-orange-800 to-amber-900 relative overflow-hidden animate-on-scroll">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-orange-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-amber-300 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-orange-400 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <Badge className="mb-6 bg-orange-100 text-orange-800 hover:bg-orange-200 transform hover:scale-105 transition-all duration-300 px-6 py-2 text-lg">
              <Sparkles className="w-5 h-5 mr-2" />
              Servicio Exclusivo
            </Badge>
            <h3 className="text-5xl lg:text-6xl font-serif font-bold text-white mb-6 leading-tight">
              Equipales
              <span className="text-orange-300"> Personalizados</span>
            </h3>
            <p className="text-xl text-orange-100 max-w-4xl mx-auto leading-relaxed">
              Creamos equipales únicos adaptados a tus gustos, espacios y
              necesidades. Desde diseños tradicionales hasta interpretaciones
              modernas, cada pieza es una obra de arte personalizada que refleja
              tu estilo.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Custom features */}
            <div className="animate-on-scroll space-y-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-300/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Palette className="w-8 h-8 text-orange-300 mr-4" />
                  <h4 className="text-2xl font-serif font-bold text-white">
                    Diseño a Medida
                  </h4>
                </div>
                <p className="text-orange-100 leading-relaxed">
                  Trabajamos contigo para crear el equipal perfecto. Elige
                  colores de piel, tipos de madera, dimensiones y detalles
                  decorativos que se adapten perfectamente a tu espacio.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-300/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Award className="w-8 h-8 text-orange-300 mr-4" />
                  <h4 className="text-2xl font-serif font-bold text-white">
                    Calidad Premium
                  </h4>
                </div>
                <p className="text-orange-100 leading-relaxed">
                  Utilizamos únicamente materiales de primera calidad: madera
                  selecta de palo dulce y palo de rosa, piel curtida
                  artesanalmente y herrajes de alta durabilidad.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-300/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Clock className="w-8 h-8 text-orange-300 mr-4" />
                  <h4 className="text-2xl font-serif font-bold text-white">
                    Proceso Artesanal
                  </h4>
                </div>
                <p className="text-orange-100 leading-relaxed">
                  Cada equipal personalizado requiere de 7 a 15 días de trabajo
                  artesanal, dependiendo de la complejidad del diseño y los
                  acabados especiales solicitados.
                </p>
              </div>
            </div>

            {/* Right side - Custom equipales images */}
            <div className="animate-on-scroll">
              <div className="grid grid-cols-1 gap-8">
                {/* First custom equipal */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Card className="relative overflow-hidden shadow-2xl border-0 group-hover:shadow-3xl transition-all duration-500 transform hover:scale-105 bg-white/95 backdrop-blur-sm">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src="/poster1.jpeg"
                        alt="Equipal personalizado con diseño único"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-orange-600 text-white">
                        Personalizado
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="font-semibold">Equipal</p>
                          <p className="text-sm opacity-90">
                            Diseño moderno con detalles tradicionales
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Second custom equipal */}
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <Card className="relative overflow-hidden shadow-2xl border-0 group-hover:shadow-3xl transition-all duration-500 transform hover:scale-105 bg-white/95 backdrop-blur-sm">
                    <div className="relative h-80 overflow-hidden">
                      <img
                        src="/poster2.jpeg"
                        alt="Juego de equipales personalizados para sala"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <Badge className="absolute top-4 left-4 bg-amber-600 text-white">
                        Personalizado
                      </Badge>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="font-semibold">Equipal</p>
                          <p className="text-sm opacity-90">
                            Equipal con acabado especial
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-16 animate-on-scroll">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-orange-300/20 max-w-4xl mx-auto">
              <h4 className="text-2xl font-serif font-bold text-white mb-4">
                ¿Tienes una idea en mente?
              </h4>
              <p className="text-orange-100 mb-6 leading-relaxed">
                Nuestro equipo de artesanos expertos puede convertir tu visión
                en realidad. Desde bocetos hasta la pieza terminada, te
                acompañamos en todo el proceso de creación.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 transform hover:scale-105 transition-all duration-300 active:scale-95"
                  onClick={() => scrollToSection("contacto")}
                >
                  Solicitar Cotización Personalizada
                </Button>
                <Button
                  variant="outline"
                  className="border-orange-300 text-orange-100 hover:bg-orange-100 hover:text-orange-800 px-8 py-3 bg-transparent transform hover:scale-105 transition-all duration-300 active:scale-95"
                  onClick={() => {
                    window.open(
                      "https://wa.me/523311491328?text=Hola,%20me%20interesa%20un%20equipal%20personalizado",
                      "_blank"
                    );
                  }}
                >
                  Consultar por WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white animate-on-scroll">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h3 className="text-4xl font-serif font-bold text-amber-900 mb-4">
              Visítanos o Contáctanos
            </h3>
            <p className="text-xl text-amber-800">
              Estamos listos para crear el equipal perfecto para ti, utilizando
              técnicas tradicionales que garantizan belleza, resistencia y
              autenticidad en cada pieza artesanal.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div className="animate-on-scroll">
              <h4 className="text-2xl font-serif font-bold text-amber-900 mb-6">
                Información de Contacto
              </h4>
              <div className="space-y-6">
                <div className="flex items-start space-x-4 group hover:transform hover:scale-105 transition-all duration-300">
                  <MapPin className="w-6 h-6 text-orange-600 mt-1 group-hover:animate-bounce" />
                  <div>
                    <p className="font-semibold text-amber-900">Taller</p>
                    <p className="text-amber-800">
                      Calle Prisciliano Sánchez #266, Zacoalco de Torres Centro.
                      <br />
                      Jalisco, México
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group hover:transform hover:scale-105 transition-all duration-300">
                  <Phone className="w-6 h-6 text-orange-600 group-hover:animate-pulse" />
                  <div>
                    <p className="font-semibold text-amber-900">Teléfono</p>
                    <p className="text-amber-800">+52 33 1149 1328 </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 group hover:transform hover:scale-105 transition-all duration-300">
                  <Mail className="w-6 h-6 text-orange-600 group-hover:animate-bounce" />
                  <div>
                    <p className="font-semibold text-amber-900">Email</p>
                    <p className="text-amber-800">caudellesly@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors duration-300">
                <h5 className="font-bold text-amber-900 mb-3">
                  Horarios de Atención
                </h5>
                <div className="space-y-2 text-amber-800">
                  <p>
                    <span className="font-medium">Lunes - Sábado:</span> 9:00 AM
                    - 7:00 PM
                  </p>
                  <p>
                    <span className="font-medium">Domingos:</span> Cerrado
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h5 className="font-bold text-amber-900 mb-4">
                  Ubicación del Taller
                </h5>
                <div className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3738.8!2d-103.4647!3d20.3547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842f4b8b8b8b8b8b%3A0x8b8b8b8b8b8b8b8b!2sPrisciliano%20S%C3%A1nchez%20266%2C%20Zacoalco%20de%20Torres%2C%20Jal.%2C%20Mexico!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full"
                  ></iframe>
                </div>
                <p className="text-sm text-amber-700 mt-2 text-center">
                  Haz clic en el mapa para obtener direcciones detalladas
                </p>
              </div>
            </div>

            <div className="animate-on-scroll">
              <Card className="shadow-xl border-0 hover:shadow-2xl transition-shadow duration-500">
                <CardContent className="p-8">
                  <h4 className="text-2xl font-serif font-bold text-amber-900 mb-6">
                    Solicita una Cotización
                  </h4>

                  {submitMessage && (
                    <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 animate-fade-in">
                      {submitMessage}
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                        placeholder="Tu nombre"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                        placeholder="Tu teléfono"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                        placeholder="tu@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        ¿Qué te interesa?
                      </label>
                      <select
                        name="interest"
                        value={formData.interest}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                      >
                        <option>Equipales individuales</option>
                        <option>Juegos de sala</option>
                        <option>Diseño personalizado</option>
                        <option>Visita al taller</option>
                        <option>Otro</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-amber-900 mb-2">
                        Mensaje
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full px-4 py-3 border border-orange-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300 hover:border-orange-300"
                        placeholder="Cuéntanos sobre tu proyecto de equipales..."
                      ></textarea>
                    </div>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-amber-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="animate-on-scroll">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center hover:scale-110 transition-transform duration-300">
                  <img
                    src="/logo-equipales-caudel2.png"
                    alt="Logo Equipales Caudel"
                    className="w-20 h-20 object-contain"
                  />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-xl">
                    Equipales Caudel
                  </h5>
                  <p className="text-orange-200 text-sm">Tradición Artesanal</p>
                </div>
              </div>
              <p className="text-orange-100 leading-relaxed">
                Preservando la tradición artesanal mexicana desde hace más de 20
                años. Cada equipal cuenta una historia de dedicación y maestría
                en la creación de muebles únicos.
              </p>
            </div>

            <div className="animate-on-scroll">
              <h6 className="font-bold text-lg mb-4">Enlaces Rápidos</h6>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("productos")}
                    className="text-orange-200 hover:text-white transition-colors duration-300 hover:scale-105 transform"
                  >
                    Productos
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("tradicion")}
                    className="text-orange-200 hover:text-white transition-colors duration-300 hover:scale-105 transform"
                  >
                    Nuestra Historia
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("galeria")}
                    className="text-orange-200 hover:text-white transition-colors duration-300 hover:scale-105 transform"
                  >
                    Galería
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contacto")}
                    className="text-orange-200 hover:text-white transition-colors duration-300 hover:scale-105 transform"
                  >
                    Contacto
                  </button>
                </li>
              </ul>
            </div>

            <div className="animate-on-scroll">
              <h6 className="font-bold text-lg mb-4">Síguenos</h6>
              <p className="text-orange-200 mb-4">
                Mantente al día con nuestros últimos trabajos y promociones
                especiales.
              </p>
              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-600 text-orange-200 hover:bg-orange-600 hover:text-white bg-transparent transform hover:scale-110 transition-all duration-300"
                >
                  Facebook
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-orange-600 text-orange-200 hover:bg-orange-600 hover:text-white bg-transparent transform hover:scale-110 transition-all duration-300"
                >
                  Instagram
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t border-orange-800 mt-8 pt-8 text-center">
            <p className="text-orange-200">
              © 2025 Equipales Caudel. Todos los derechos reservados. | Hecho
              con ❤️ en Jalisco, México
            </p>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/523311491328?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20equipales%20artesanales"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 flex items-center justify-center group animate-pulse hover:animate-none active:scale-95"
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
