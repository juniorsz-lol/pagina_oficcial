import logoImg from "../assets/logoImg.png";
import logoTxt from "../assets/logoTxt.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacto" className="bg-black border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex-shrink-0">
            <div className="flex-shrink-0 flex items-center gap-2">
                          <img
                            src={logoImg}
                            alt="VaixsDev icon"
                            className="h-16 w-auto cursor-pointer"
                            onClick={() => scrollToSection('hero')}
                          />
                          <img
                            src={logoTxt}
                            alt="VaixsDev text"
                            className="h-16 w-auto cursor-pointer"
                            onClick={() => scrollToSection('hero')}
                          />
                        </div>
          </div>
            <p className="text-gray-400 mb-4">
              Transformamos ideas en soluciones digitales innovadoras que impulsan el éxito de tu negocio.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/Vaixs.bo"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => document.getElementById('hero').scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Servicios
                </button>
              </li>
              <li>
                <button onClick={() => document.getElementById('productos').scrollIntoView({ behavior: 'smooth' })} className="text-gray-400 hover:text-green-400 transition-colors duration-200">
                  Productos
                </button>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Desarrollo Web</li>
              <li className="text-gray-400">Apps Móviles</li>
              <li className="text-gray-400">Soluciones Cloud</li>
              <li className="text-gray-400">IA & ML</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <ul className="space-y-2">
              <li className="text-gray-400 flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                info@vaixs.net
              </li>
              <li className="text-gray-400 flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                + (591) 68523589
              </li>
              <li className="text-gray-400 flex items-start">
                <svg className="w-5 h-5 mr-2 mt-1 flex-shrink-0 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Cochabamba, Bolivia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} Vaixs Todos los derechos reservados.
          </p>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
              Política de Privacidad
            </a>
            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors duration-200">
              Términos de Servicio
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
