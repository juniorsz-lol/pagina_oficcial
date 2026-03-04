import { useState, useEffect } from "react";
import AnimatedLogo from "./AnimatedLogo";

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
  },
];

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [currentPhrase, setCurrentPhrase] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const phrases = [];

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    const handleType = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      const updatedText = isDeleting
        ? fullText.substring(0, currentPhrase.length - 1)
        : fullText.substring(0, currentPhrase.length + 1);

      setCurrentPhrase(updatedText);
      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && updatedText === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && updatedText === "") {
        setIsDeleting(false);
        setLoopNum((prev) => prev + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentPhrase, isDeleting, loopNum, typingSpeed, phrases]);

  const slide = slides[current];

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden gradient-green-radial"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>

      {/* Background blur */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-600/10 rounded-full blur-3xl animate-float delay-1000" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* LADO IZQUIERDO */}
          <div className="text-center md:text-left animate-fade-in">
            <span className="inline-block px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-green-400 text-sm mb-6">
              BIENVENIDO A VAIXS
            </span>

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
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="gradient-green text-white px-8 py-4 rounded-full font-semibold hover:scale-105 transition"
              >
                Nuestros Servicios
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("productos")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-2 border-green-500 text-green-400 px-8 py-4 rounded-full hover:bg-green-500/10 transition"
              >
                Ver Productos
              </button>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center md:justify-start mt-8 gap-3">
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

          {/* LADO DERECHO */}
          <div className="relative flex flex-col items-center justify-center min-h-[500px]">
            {/* Logo estático */}
            <div className="relative z-10 mb-6 drop-shadow-2xl">
              <img
                src="/src/assets/logo.png"
                alt="Vaixs logo"
                className="w-[280px] h-auto"
              />
            </div>

            {/* Canvas animado */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <AnimatedLogo showMainLogo={false} animate={true} />
            </div>

            {/* Frase typewriter */}
            <div className="relative z-10 mt-4 text-center">
              <p
                className="text-2xl sm:text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "'Courier New', monospace" }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                  {currentPhrase}
                </span>
                <span className="text-green-400 animate-pulse"></span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;