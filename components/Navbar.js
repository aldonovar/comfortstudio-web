"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const mainSections = [
  { id: "inicio", key: "inicio", label: "Inicio", href: "/inicio" },
  { id: "servicios", key: "servicios", label: "Servicios", href: "/servicios" },
  { id: "proyectos", key: "proyectos", label: "Proyectos", href: "/proyectos" },
  { id: "cotiza", key: "cotiza", label: "Cotiza", href: "/cotiza" },
  { id: "contacto", key: "contacto", label: "Contacto", href: "/contacto" },
];

// Configuración del mega-menú (INTACTA)
const megaConfig = {
  servicios: {
    eyebrow: "Portafolio de servicios",
    title: "Diseño y ejecución de terrazas según el tipo de espacio.",
    text: "Desde terrazas en departamentos hasta azoteas completas y patios interiores. Cada categoría tiene una lógica de uso, materiales y nivel de inversión distinto.",
    links: [
      { label: "Terraza de departamento", href: "/servicios/terraza-de-departamento" },
      { label: "Azotea completa", href: "/servicios/azotea-completa" },
      { label: "Patio interior", href: "/servicios/patio-interior" },
      { label: "Terraza corporativa", href: "/servicios/terraza-corporativa" },
      { label: "Proyecto integral", href: "/servicios/proyecto-integral" },
    ],
    tag: "Cada subcategoría abre una página propia con el detalle del servicio.",
  },
  proyectos: {
    eyebrow: "Portafolio vivo",
    title: "Proyectos reales en Lima que explican qué podemos lograr contigo.",
    text: "Galería de terrazas, azoteas y patios con fotos, datos técnicos y contexto del cliente. Ideal para mostrar antes/después y nivel de detalle constructivo.",
    links: [
      { label: "Ver proyectos destacados", href: "/proyectos" },
      { label: "Terrazas residenciales", href: "/proyectos?tipo=residencial" },
      { label: "Proyectos corporativos", href: "/proyectos?tipo=corporativo" },
    ],
    tag: "Sección clave para generar confianza inmediata.",
  },
  cotiza: {
    eyebrow: "Formulario inteligente",
    title: "Cotiza tu terraza en 60 segundos, directo a WhatsApp.",
    text: "Un formulario guiado que arma un resumen claro de tu espacio, rango de inversión y objetivos. El estudio recibe toda la información lista para responder.",
    links: [
      { label: "Ir al formulario de cotización", href: "/cotiza" },
      { label: "Ver cómo usamos tu información", href: "/contacto#privacidad" },
    ],
    tag: "Menos fricción, más leads listos para avanzar.",
  },
  contacto: {
    eyebrow: "Contacto y canales",
    title: "Un solo lugar para centralizar WhatsApp, correo y redes.",
    text: "Ideal para clientes que ya están convencidos y solo necesitan hablar con el estudio. Todos los canales en un mismo lugar.",
    links: [
      { label: "Ver sección de contacto", href: "/contacto" },
      { label: "Escribir por WhatsApp", href: "https://wa.me/51936230958" },
    ],
    tag: "Pensado para cerrar la decisión de contacto.",
  },
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoSrc = scrolled
    ? "/comfort-logo-dark.png"
    : "/comfort-logo-light.png";

  // CLASES MEJORADAS: Backdrop blur real y transiciones suaves
  const headerBase = "fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]";
  
  const glassEffect = scrolled
    ? "bg-crema/85 backdrop-blur-md border-b border-madera/5 shadow-[0_8px_32px_rgba(0,0,0,0.04)] py-3"
    : "bg-gradient-to-b from-black/70 via-black/30 to-transparent py-6";

  const linkBase = "relative text-[0.7rem] font-medium uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer group";

  const handleMouseLeaveHeader = () => {
    setActiveMenu(null);
  };

  return (
    <header
      className={`${headerBase} ${glassEffect}`}
      onMouseLeave={handleMouseLeaveHeader}
    >
      <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-6">
        
        {/* Logo / Marca */}
        <div className={`flex items-center gap-3 transition-colors duration-500 ${scrolled ? "text-madera" : "text-crema"}`}>
          <img
            src={logoSrc}
            alt="Comfort Studio"
            className="h-9 w-auto object-contain transition-transform duration-500 hover:scale-105"
          />
          <div className="flex flex-col leading-none">
            <span className="text-sm font-bold tracking-wide font-serif">
              Comfort Studio
            </span>
            <span className="text-[0.6rem] uppercase tracking-[0.25em] opacity-80 mt-0.5">
              Terrazas
            </span>
          </div>
        </div>

        {/* Links desktop */}
        <nav className="hidden md:flex items-center gap-8">
          {mainSections.map((item) => (
            <div
              key={item.id}
              className="relative py-2"
              onMouseEnter={() => setActiveMenu(item.key === "inicio" ? null : item.key)}
            >
              <Link
                href={item.href}
                className={`
                  ${linkBase}
                  ${scrolled ? "text-madera/70 hover:text-madera" : "text-crema/90 hover:text-white"}
                `}
              >
                {item.label}
                {/* Underline animado */}
                <span className={`absolute -bottom-1 left-0 h-[1px] w-0 bg-current transition-all duration-300 group-hover:w-full opacity-50`} />
              </Link>
            </div>
          ))}
        </nav>

        {/* CTA Cotizar (Mejorado visualmente) */}
        <Link
          href="/cotiza"
          className={
            "hidden md:inline-flex items-center px-6 py-2.5 rounded-full text-[0.68rem] font-bold uppercase tracking-[0.22em] transition-all duration-300 shadow-sm " +
            (scrolled
              ? "bg-madera text-crema hover:bg-terracota hover:shadow-lg hover:-translate-y-0.5"
              : "border border-crema/40 bg-white/10 backdrop-blur-sm text-crema hover:bg-crema hover:text-madera hover:border-crema")
          }
        >
          Cotizar proyecto
        </Link>
      </div>

      {/* MEGA MENU (Logica intacta, estilos refinados) */}
      <div className="hidden md:block">
        <div
          className={`transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            activeMenu
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          {activeMenu && megaConfig[activeMenu] && (
            <div className="border-t border-black/5">
              <div
                className={`shadow-2xl ${
                  scrolled
                    ? "bg-crema/95 backdrop-blur-xl text-madera"
                    : "bg-[#1e1713]/95 backdrop-blur-xl text-crema border-t border-white/10"
                }`}
              >
                <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-[1.5fr_1fr] gap-12">
                  
                  {/* Columna principal */}
                  <div className="space-y-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] opacity-60">
                      {megaConfig[activeMenu].eyebrow}
                    </p>
                    <h3 className="font-serif text-3xl leading-snug">
                      {megaConfig[activeMenu].title}
                    </h3>
                    <p className="text-sm opacity-80 max-w-xl font-light leading-relaxed">
                      {megaConfig[activeMenu].text}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-3">
                      {megaConfig[activeMenu].links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          className={`inline-flex items-center text-[0.7rem] px-4 py-2 rounded-full border transition-colors ${
                            scrolled 
                              ? "border-madera/10 hover:border-madera/40 hover:bg-madera/5" 
                              : "border-white/10 hover:border-white/40 hover:bg-white/5"
                          }`}
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Columna detalle / tag */}
                  <div className="flex flex-col justify-between gap-4">
                    <div className={`rounded-2xl p-6 text-[0.75rem] shadow-inner ${scrolled ? "bg-madera/5" : "bg-white/5"}`}>
                      <p className="uppercase tracking-[0.2em] opacity-65 mb-2 text-[0.65rem]">
                        Cómo se usa esta sección
                      </p>
                      <p className="leading-relaxed opacity-90">
                        {megaConfig[activeMenu].tag}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}