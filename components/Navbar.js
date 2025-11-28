"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { usePathname } from "next/navigation";

const mainSections = [
  { id: "inicio", key: "inicio", label: "Inicio", href: "/" },
  { id: "servicios", key: "servicios", label: "Servicios", href: "/servicios" },
  { id: "proyectos", key: "proyectos", label: "Proyectos", href: "/proyectos" },
  { id: "cotiza", key: "cotiza", label: "Cotiza", href: "/cotiza" },
  { id: "contacto", key: "contacto", label: "Contacto", href: "/contacto" },
];

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedMobileItem, setExpandedMobileItem] = useState(null); // For accordion
  const headerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);

    // Initial entrance animation
    gsap.fromTo(headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 }
    );

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMobileItem(null);
  }, [pathname]);

  // Mobile Menu Animation
  useEffect(() => {
    if (mobileMenuOpen) {
      gsap.to(mobileMenuRef.current, { x: "0%", duration: 0.5, ease: "power3.out" });
      gsap.fromTo(".mobile-link-item",
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.2 }
      );
    } else {
      gsap.to(mobileMenuRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  }, [mobileMenuOpen]);

  const handleMouseLeaveHeader = () => {
    setActiveMenu(null);
  };

  const toggleMobileItem = (key) => {
    setExpandedMobileItem(expandedMobileItem === key ? null : key);
  };

  // --- Dynamic Styles based on Scroll ---
  const logoSrc = scrolled || mobileMenuOpen ? "/comfort-logo-dark.png" : "/comfort-logo-light.png";
  // Always dark text on scroll OR when mobile menu is open (since mobile menu bg is light/crema)
  const textColor = scrolled || mobileMenuOpen ? "text-madera" : "text-crema";

  // Stronger background for better visibility on light sections
  const headerBg = scrolled
    ? "bg-[#f2f0e9] shadow-lg py-3" // Solid cream background for max contrast
    : "bg-gradient-to-b from-black/70 to-transparent py-6"; // Transparent on top

  // Mega Menu Background Logic
  const megaMenuBg = "bg-[#f2f0e9] text-madera border-t border-madera/10 shadow-xl";

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${headerBg}`}
        onMouseLeave={handleMouseLeaveHeader}
      >
        <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">

          {/* Logo (Image Based) */}
          <Link href="/" className="relative z-50 group flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
            <img
              src={logoSrc}
              alt="Comfort Studio"
              className="h-10 w-auto object-contain transition-all duration-500"
            />
            <div className={`flex flex-col leading-none transition-colors duration-500 ${textColor}`}>
              <span className="font-serif text-lg font-bold tracking-wide">COMFORT STUDIO</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {mainSections.map((item) => (
              <div
                key={item.id}
                className="relative py-4"
                onMouseEnter={() => setActiveMenu(item.key === "inicio" ? null : item.key)}
              >
                <Link
                  href={item.href}
                  className={`text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${activeMenu === item.key
                      ? "text-terracota"
                      : scrolled ? "text-madera/70 hover:text-madera" : "text-crema/80 hover:text-white"
                    }`}
                >
                  {item.label}
                </Link>
                {activeMenu === item.key && (
                  <span className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-terracota" />
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <Link
              href="/cotiza"
              className={`hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full transition-all duration-300 group shadow-sm ${scrolled
                  ? "bg-madera text-crema hover:bg-terracota hover:shadow-lg hover:-translate-y-0.5"
                  : "bg-white/10 border border-white/10 text-crema hover:bg-white/20"
                }`}
            >
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em]">Cotizar</span>
              <svg
                className={`w-3 h-3 transition-transform duration-300 group-hover:rotate-45 ${scrolled ? "text-crema" : "text-terracota"}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </Link>

            {/* Mobile Toggle (3-Bar Hamburger) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 w-12 h-12 flex flex-col items-center justify-center gap-1.5 p-2 rounded-full hover:bg-black/5 transition-colors"
            >
              <span className={`w-6 h-[2px] transition-all duration-300 ${textColor} ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-6 h-[2px] transition-all duration-300 ${textColor} ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-[2px] transition-all duration-300 ${textColor} ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown (Desktop) */}
        <div
          className={`absolute top-full left-0 w-full overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${activeMenu ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
        >
          {activeMenu && megaConfig[activeMenu] && (
            <div className={`${megaMenuBg}`}>
              <div className="max-w-[1600px] mx-auto px-12 py-12 grid grid-cols-[1fr_1.5fr_1fr] gap-16">
                {/* Column 1: Intro */}
                <div className="space-y-4">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-terracota font-bold">
                    {megaConfig[activeMenu].eyebrow}
                  </p>
                  <h3 className="font-serif text-2xl leading-tight text-madera">
                    {megaConfig[activeMenu].title}
                  </h3>
                </div>

                {/* Column 2: Links */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                  {megaConfig[activeMenu].links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      className="group flex items-center gap-3 p-3 rounded-xl transition-all duration-300 hover:bg-madera/5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full transition-colors bg-madera/20 group-hover:bg-terracota" />
                      <span className="text-sm transition-colors text-madera/70 group-hover:text-madera">
                        {link.label}
                      </span>
                    </Link>
                  ))}
                </div>

                {/* Column 3: Context */}
                <div className="rounded-2xl p-6 border bg-white border-madera/5 shadow-sm">
                  <p className="text-[0.65rem] uppercase tracking-[0.2em] mb-3 text-madera/40">
                    Info
                  </p>
                  <p className="text-sm leading-relaxed text-madera/70">
                    {megaConfig[activeMenu].text}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile Menu Drawer (Side Panel) */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-y-0 right-0 z-40 w-full md:w-[400px] bg-[#f2f0e9] shadow-2xl translate-x-full md:hidden flex flex-col pt-24 px-8 pb-8 overflow-y-auto"
      >
        <div className="flex-1 space-y-6">
          {mainSections.map((item) => {
            const hasSubmenu = megaConfig[item.key];
            const isExpanded = expandedMobileItem === item.key;

            return (
              <div key={item.id} className="mobile-link-item border-b border-madera/10 pb-4">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    onClick={() => !hasSubmenu && setMobileMenuOpen(false)}
                    className="font-serif text-3xl text-madera hover:text-terracota transition-colors"
                  >
                    {item.label}
                  </Link>
                  {hasSubmenu && (
                    <button
                      onClick={() => toggleMobileItem(item.key)}
                      className="p-2 text-madera/50 hover:text-terracota transition-colors"
                    >
                      <svg
                        className={`w-6 h-6 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Mobile Accordion Content */}
                {hasSubmenu && (
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[500px] opacity-100 mt-4" : "max-h-0 opacity-0"
                      }`}
                  >
                    <div className="space-y-3 pl-4 border-l-2 border-terracota/20">
                      <p className="text-xs text-madera/50 uppercase tracking-widest mb-2">
                        {megaConfig[item.key].eyebrow}
                      </p>
                      {megaConfig[item.key].links.map((link) => (
                        <Link
                          key={link.label}
                          href={link.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-sm text-madera/70 hover:text-terracota py-1"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 space-y-6">
          <Link
            href="/cotiza"
            onClick={() => setMobileMenuOpen(false)}
            className="mobile-link-item w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-terracota text-white font-bold uppercase tracking-[0.2em] shadow-lg hover:shadow-xl transition-all"
          >
            Cotizar Proyecto
          </Link>
          <div className="flex justify-center gap-8 text-madera/40">
            <a href="#" className="hover:text-terracota transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
            </a>
            <a href="#" className="hover:text-terracota transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" /></svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}