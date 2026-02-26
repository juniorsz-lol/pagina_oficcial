import { useState, useEffect } from "react";
import logoImg from "../assets/logoImg.webp";
import logoTxt from "../assets/logoTxt.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // ✅ por si ya carga scrolleado
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Bloquear scroll + cerrar con ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isMobileMenuOpen]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* ✅ NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-300 animate-slide-down ${
          isScrolled
            ? "bg-black/90 backdrop-blur-md shadow-lg shadow-green-500/10"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <img
                src={logoImg}
                alt="VaixsDev icon"
                className="h-16 w-auto cursor-pointer"
                onClick={() => scrollToSection("hero")}
              />
              <img
                src={logoTxt}
                alt="VaixsDev text"
                className="h-16 w-auto cursor-pointer"
                onClick={() => scrollToSection("hero")}
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("hero")}
                className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Inicio
              </button>
              <button
                onClick={() => scrollToSection("servicios")}
                className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Servicios
              </button>
              <button
                onClick={() => scrollToSection("productos")}
                className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
              >
                Productos
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="gradient-green text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300"
              >
                Contacto
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                className="text-gray-300 hover:text-green-400 focus:outline-none relative z-[1001]"
                aria-label="Abrir menú"
                aria-expanded={isMobileMenuOpen}
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ✅ OVERLAY (FUERA DEL NAV para que aplique en toda la web) */}
      <div
        className={`fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        style={{ zIndex: 1000 }}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* ✅ MENÚ LATERAL (FUERA DEL NAV para que aplique en toda la web) */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 bg-black/95 backdrop-blur-md shadow-2xl transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ zIndex: 1001 }}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="p-6 pt-24 flex flex-col space-y-4">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-left py-2"
          >
            Inicio
          </button>
          <button
            onClick={() => scrollToSection("servicios")}
            className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-left py-2"
          >
            Servicios
          </button>
          <button
            onClick={() => scrollToSection("productos")}
            className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-left py-2"
          >
            Productos
          </button>
          <button
            onClick={() => scrollToSection("contacto")}
            className="gradient-green text-white px-6 py-2 rounded-full font-semibold text-left"
          >
            Contacto
          </button>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
