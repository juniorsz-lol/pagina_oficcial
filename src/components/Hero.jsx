import { useState, useEffect } from "react";
import hero1 from "../assets/hero1.webp";
import hero2 from "../assets/hero2.webp";
import hero3 from "../assets/hero3.webp";

const slides = [
  {
    title: (
      <>
        Transformamos <span className="text-gradient">Ideas</span>
      </>
    ),
    subtitle: (
      <>
        en <span className="text-gradient">Soluciones Digitales</span>
      </>
    ),
    description:
      "Convertimos tu visión en software funcional, innovador y alineado a los objetivos de tu negocio.",
    image: hero1,
  },
  {
    title: (
      <>
        Creamos <span className="text-gradient">Software</span>
      </>
    ),
    subtitle: (
      <>
        que <span className="text-gradient">Escala</span>
      </>
    ),
    description:
      "Desarrollamos aplicaciones web, móviles y cloud robustas, seguras y listas para crecer a largo plazo.",
    image: hero2,
  },
  {
    title: (
      <>
        Potenciamos tu <span className="text-gradient">Negocio</span>
      </>
    ),
    subtitle: (
      <>
        con <span className="text-gradient">Tecnología moderna</span>
      </>
    ),
    description:
      "Automatización, sistemas a medida y soluciones modernas que optimizan procesos y mejoran resultados.",
    image: hero3,
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden gradient-green-radial"
    >
      {/* Background blur */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-float delay-1000" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LEFT: Text */}
          <div className="text-center md:text-left animate-fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
              {slide.title}
              <br />
              {slide.subtitle}
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-xl">
              {slide.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("servicios")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="gradient-green text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
              >
                Nuestros Servicios
              </button>

              <button
                onClick={() =>
                  document
                    .getElementById("productos")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="border-2 border-green-500 text-green-400 px-8 py-4 rounded-full hover:bg-green-500/10 transition"
              >
                Ver Productos
              </button>
            </div>
          </div>

          {/* RIGHT: Image */}
          <div className="flex justify-center animate-slide-up">
            <img
              src={slide.image}
              alt="Hero slide"
              className="w-full
                max-w-lg
                lg:max-w-2xl
                xl:max-w-3xl
                drop-shadow-2xl
                animate-float
                transition-transform
                duration-500"
            />
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-12 gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === current ? "bg-green-400" : "bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
