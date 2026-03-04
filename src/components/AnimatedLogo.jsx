import { useEffect, useRef } from 'react';

// Configuración (misma que en Angular)
const LENGUAJES = [
  'JavaScript', 'Python', 'Java', 'TypeScript',
  'C#', 'PHP', 'Ruby', 'MongoDB',
  'React', 'Angular', 'MySQL', 'C++'
];

const TAMAÑOS_LOGO = { min: 16, max: 30 }; // Ajusta según prefieras
const CONFIGURACION = {
  cantidad: 12,
  velocidadBase: 1.3,
  radioActivacion: 1400
};

const aleatorio = (a, b) => a + Math.random() * (b - a);
const aleatorioInt = (a, b) => Math.floor(aleatorio(a, b + 1));

const AnimatedLogo = ({ showMainLogo = false, animate = true }) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const animationRef = useRef(null);
  const poolRef = useRef([]);
  const dimensionsRef = useRef({ width: 0, height: 0, logoY: 0, logoX: 0 });

  // Inicializar pool
  const crearPool = (cantidad) => {
    return Array.from({ length: cantidad }, () => ({
      x: 0,
      y: 0,
      nombre: LENGUAJES[aleatorioInt(0, LENGUAJES.length - 1)],
      tamaño: aleatorio(TAMAÑOS_LOGO.min, TAMAÑOS_LOGO.max),
      velocidad: 1,
      alpha: 1,
      activo: true,
      xMax: 0,
      xMin: 0,
      rotacion: 0,
    }));
  };

  const reiniciar = (d, width, height) => {
    d.nombre = LENGUAJES[aleatorioInt(0, LENGUAJES.length - 1)];
    d.tamaño = aleatorio(TAMAÑOS_LOGO.min, TAMAÑOS_LOGO.max);
    d.rotacion = aleatorio(1, 0.5);
    d.alpha = aleatorio(0.4, 0.9);
    d.y = aleatorio(0, height);
    d.velocidad = aleatorio(0.8, 3.5) * CONFIGURACION.velocidadBase;
    d.x = -d.tamaño;
    d.xMax = width + d.tamaño + 20;
    d.xMin = -d.tamaño - 20;
  };

  const dibujar = (ctx, d) => {
    ctx.save();
    ctx.globalAlpha = d.alpha;

    if (d.rotacion !== 0) {
      ctx.translate(d.x + d.tamaño / 2, d.y);
      ctx.rotate((d.rotacion * Math.PI) / 180);
      ctx.translate(-(d.x + d.tamaño / 2), -d.y);
    }

    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;

    ctx.fillStyle = `rgba(255,255,255,${d.alpha})`;
    ctx.font = `bold ${d.tamaño}px 'Courier New', monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(d.nombre, d.x + d.tamaño / 2, d.y);

    ctx.restore();
  };

  const iniciarCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = containerRef.current;
    const dpr = window.devicePixelRatio || 1;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    dimensionsRef.current.width = width;
    dimensionsRef.current.height = height;

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.scale(dpr, dpr);

    // Posición del logo principal (si se muestra)
    if (showMainLogo && logoRef.current) {
      const logoRect = logoRef.current.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      dimensionsRef.current.logoY = logoRect.top - canvasRect.top;
      dimensionsRef.current.logoX = logoRect.left - canvasRect.left + logoRect.width / 2;
    } else {
      dimensionsRef.current.logoY = height / 2;
      dimensionsRef.current.logoX = width / 2;
    }

    // Crear pool si no existe
    if (poolRef.current.length === 0) {
      poolRef.current = crearPool(CONFIGURACION.cantidad);
    }

    // Reiniciar cada elemento con las nuevas dimensiones
    poolRef.current.forEach(d => {
      reiniciar(d, width, height);
      d.x = aleatorio(-d.tamaño, width + d.tamaño);
    });
  };

  const bucle = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = dimensionsRef.current;

    ctx.clearRect(0, 0, width, height);

    for (const d of poolRef.current) {
      dibujar(ctx, d);
      d.x += d.velocidad;
      if (d.x > d.xMax || d.x + d.tamaño < d.xMin) {
        reiniciar(d, width, height);
      }
    }

    animationRef.current = requestAnimationFrame(bucle);
  };

  const manejarMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    for (const d of poolRef.current) {
      const distancia = Math.sqrt(
        Math.pow(mouseX - (d.x + d.tamaño / 2), 2) +
        Math.pow(mouseY - d.y, 2)
      );
      if (distancia < CONFIGURACION.radioActivacion) {
        d.velocidad *= 1.05;
      }
    }
  };

  useEffect(() => {
    if (!animate) return;

    iniciarCanvas();

    const observer = new ResizeObserver(() => {
      cancelAnimationFrame(animationRef.current);
      iniciarCanvas();
      bucle();
    });
    observer.observe(containerRef.current);

    const onMouseMove = manejarMouseMove;
    containerRef.current.addEventListener('mousemove', onMouseMove);

    bucle();

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
      containerRef.current?.removeEventListener('mousemove', onMouseMove);
    };
  }, [animate, showMainLogo]);

  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[400px]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
          maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
        }}
      />
      {showMainLogo && (
        <img
          ref={logoRef}
          src="/src/assets/img/logo.png" // Ajusta la ruta según tu estructura
          alt="Vaixs logo"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 max-w-[350px] w-auto h-auto pointer-events-none"
          style={{
            filter: 'drop-shadow(0 0 6px rgba(76, 235, 91, 0.55)) drop-shadow(0 0 18px rgba(76, 235, 91, 0.25))'
          }}
        />
      )}
    </div>
  );
};

export default AnimatedLogo;