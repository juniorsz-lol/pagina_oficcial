import { useEffect, useRef, useState } from "react";

// ✅ 1) Importa tus imágenes (Vite)
import clientesImg from "../assets/clientes_deportes.jpg";
import eventosImg from "../assets/img_events.webp";
import rutaImg from "../assets/img_ruta.webp";
import ventasImg from "../assets/im_ventas.webp";

const Products = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  // ✅ 2) Agrega image y gradient a cada producto
  const products = [
    {
      title: "Vaixs Torneos",
      tagline: "Plataforma de gestión deportiva",
      description:
        "Sistema de gestión de torneos deportivos que facilita la organización, programación, seguimiento, acreditación de equipos y jugadores.",
      features: [
        "Asociaciones",
        "Torneos municipales",
        "Torneos relámpagos",
        "Campeonatos de Barrios",
        "Y otros",
      ],
      gradient: "from-green-400/30 to-emerald-600/30",
      image: clientesImg,
    },
    {
      title: "Vaixs Eventos",
      tagline: "Gestión de eventos",
      description:
        "Plataforma para gestión de eventos con control de asistentes, inscripciones, venta de entradas y reportes.",
      features: [
        "Centraliza toda la gestión de eventos",
        "Permite control en tiempo real",
        "Genera reportes claros y rápidos",
        "Se adapta a cualquier tipo de evento",
      ],
      gradient: "from-emerald-400/30 to-teal-600/30",
      image: eventosImg,
    },
    {
      title: "Sistema de Ventas",
      tagline: "Gestión empresarial",
      description:
        "Herramienta de gestión empresarial para controlar procesos, reportes y operaciones en una sola plataforma.",
      features: [
        "Control total de ventas e ingresos",
        "Reduce errores y pérdidas",
        "Gestiona clientes y productos fácilmente",
        "Genera reportes claros",
        "Escalable y adaptable",
      ],
      gradient: "from-lime-400/30 to-green-600/30",
      image: ventasImg,
    },
    {
      title: "Sistema de Correspondencia",
      tagline: "Hoja de ruta de trámites",
      description:
        "Registro y seguimiento de correspondencia con trazabilidad, derivaciones y control documental.",
      features: [
        "Centraliza toda la correspondencia y trámites",
        "Permite seguimiento en tiempo real",
        "Reduce tiempos y burocracia",
        "Mejora la transparencia y el control",
        "Se adapta a instituciones de cualquier tamaño",
      ],
      gradient: "from-green-500/30 to-emerald-500/30",
      image: rutaImg,
    },
  ];

  return (
    <section
      id="productos"
      ref={sectionRef}
      className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-green-500/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-green-600/20 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2
            className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${
              isVisible ? "animate-slide-up" : "opacity-0"
            }`}
          >
            Nuestros <span className="text-gradient">Productos</span>
          </h2>
          <p
            className={`text-xl text-gray-400 max-w-3xl mx-auto ${
              isVisible ? "animate-fade-in" : "opacity-0"
            }`}
            style={{ animationDelay: "0.2s" }}
          >
            Soluciones de software listas para usar que aceleran la
            transformación digital de tu empresa
          </p>
        </div>

        {/* Products */}
        <div className="space-y-20">
          {products.map((product, index) => (
            <div
              key={index}
              className={`flex flex-col ${
                index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
              } gap-12 items-center ${isVisible ? "animate-slide-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.2 * index}s` }}
            >
              {/* Product Visual */}
              <div className="flex-1 w-full">
                <div
                  className={`relative h-80 rounded-2xl bg-gradient-to-br ${product.gradient} p-1 
                    group hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-500`}
                >
                  {/* Card interior */}
                  <div className="h-full w-full bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center overflow-hidden">
                    {/* Imagen ocupa el card */}
                    <img
                      src={product.image}
                      alt={product.title}
                      loading="lazy"
                      className="max-h-full max-w-full object-contain 
                      group-hover:scale-105 transition-transform duration-700 p-3"
                    />
                  </div>

                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 
                    transition-opacity duration-500 animate-glow pointer-events-none"
                  ></div>
                </div>
              </div>

              {/* Product Info */}
              <div className="flex-1 w-full">
                <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  {product.title}
                  <span className="ml-3 md:text-base font-medium text-green-400">
                    {product.tagline}
                  </span>
                </h3>
                <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <ul className="space-y-3 mb-8">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-300">
                      <svg
                        className="w-6 h-6 text-green-500 mr-3 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <button className="gradient-green text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105">
                  Más Información
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
