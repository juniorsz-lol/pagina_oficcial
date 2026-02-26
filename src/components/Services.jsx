import { useEffect, useRef, useState } from 'react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const services = [
    {
      icon: '💻',
      title: 'Desarrollo Web',
      description: 'Creamos sitios web modernos, responsivos y optimizados para SEO que convierten visitantes en clientes.',
    },
    {
      icon: '📱',
      title: 'Apps Móviles',
      description: 'Desarrollamos aplicaciones nativas y multiplataforma para iOS y Android con experiencias excepcionales.',
    },
    {
      icon: '☁️',
      title: 'Soluciones Cloud',
      description: 'Implementamos infraestructura en la nube escalable y segura con AWS, Azure y Google Cloud.',
    },
    {
      icon: '🤖',
      title: 'IA & Machine Learning',
      description: 'Integramos inteligencia artificial y aprendizaje automático para automatizar y optimizar procesos.',
    },
    {
      icon: '🎨',
      title: 'UI/UX Design',
      description: 'Diseñamos interfaces intuitivas y atractivas centradas en la experiencia del usuario.',
    },
    {
      icon: '🔧',
      title: 'Consultoría Tech',
      description: 'Asesoramos en arquitectura de software, transformación digital y mejores prácticas de desarrollo.',
    },
  ];

  return (
    <section id="servicios" ref={sectionRef} className="py-20 md:py-32 bg-black relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}`}>
            Lo Que <span className="text-gradient">Hacemos</span>
          </h2>
          <p className={`text-xl text-gray-400 max-w-3xl mx-auto ${isVisible ? 'animate-fade-in' : 'opacity-0'}`} style={{ animationDelay: '0.2s' }}>
            Ofrecemos servicios de desarrollo de software profesional para empresas de todos los tamaños
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl border border-gray-800 hover:border-green-500 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/20 hover:scale-105 ${
                isVisible ? 'animate-slide-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-gradient transition-all duration-300">
                {service.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {service.description}
              </p>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/10 to-transparent"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
