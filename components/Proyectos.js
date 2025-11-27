"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const PROJECTS = [
  {
    id: "azotea-barranco",
    name: "Azotea social en Barranco",
    type: "residencial",
    service: "Diseño y ejecución de proyecto de terraza",
    surface: "48 m²",
    location: "Barranco, Lima",
    summary:
      "Rooftop con barra, comedor exterior y techo sol y sombra pensado para reuniones nocturnas frecuentes.",
    mood: "Reuniones nocturnas · Vista urbana · Iluminación cálida",
  },
  {
    id: "terraza-miraflores",
    name: "Terraza de departamento en Miraflores",
    type: "residencial",
    service: "Techo sol y sombra",
    surface: "22 m²",
    location: "Miraflores, Lima",
    summary:
      "Terraza compacta con control de luz, iluminación cálida y mobiliario integrado para uso diario.",
    mood: "Uso diario · Espacio compacto · Rutina cómoda",
  },
  {
    id: "terraza-corporativa-san-isidro",
    name: "Terraza corporativa en San Isidro",
    type: "corporativo",
    service: "Otro tipo de proyecto al aire libre",
    surface: "95 m²",
    location: "San Isidro, Lima",
    summary:
      "Espacio al aire libre para after office, eventos internos y reuniones informales del equipo.",
    mood: "After office · Eventos internos · Equipo",
  },
  {
    id: "estacion-parrilla-la-molina",
    name: "Estación de parrilla en La Molina",
    type: "residencial",
    service: "Proyecto estación de parrilla",
    surface: "18 m²",
    location: "La Molina, Lima",
    summary:
      "Parrilla empotrada, barra y apoyo de cocina exterior para fines de semana en familia.",
    mood: "Fines de semana · Familia · Cocina exterior",
  },
  {
    id: "rooftop-mixto",
    name: "Rooftop mixto residencial + eventos",
    type: "mixto",
    service: "Diseño y ejecución de proyecto de terraza",
    surface: "120 m²",
    location: "Surco, Lima",
    summary:
      "Rooftop pensado para uso familiar y eventos, con zonificación clara de estar, comedor y parrilla.",
    mood: "Uso mixto · Eventos · Zonas definidas",
  },
];

const FILTERS = [
  { id: "todos", label: "Todos" },
  { id: "residencial", label: "Residenciales" },
  { id: "corporativo", label: "Corporativos" },
  { id: "mixto", label: "Mixtos" },
];

export default function Proyectos() {
  const [activeFilter, setActiveFilter] = useState("todos");
  const [activeId, setActiveId] = useState(PROJECTS[0].id);

  const sectionRef = useRef(null);
  const stickyRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "todos") return PROJECTS;
    const filtered = PROJECTS.filter((p) => p.type === activeFilter);
    // si el proyecto activo no está en el filtro, reseteamos al primero
    if (!filtered.some((p) => p.id === activeId) && filtered.length > 0) {
      setActiveId(filtered[0].id);
    }
    return filtered;
  }, [activeFilter, activeId]);

  const activeProject =
    PROJECTS.find((p) => p.id === activeId) ?? PROJECTS[0];

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax de fondo
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(".projects-bg", {
            y: self.progress * -40,
            ease: "none",
          });
        },
      });

      // Header
      gsap.from(".projects-header", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      });

      // Filtros
      gsap.from(".projects-filters button", {
        y: 18,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".projects-filters",
          start: "top 85%",
          once: true,
        },
      });

      // Lista de proyectos
      gsap.from(".project-list-item", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
        scrollTrigger: {
          trigger: ".projects-body",
          start: "top 80%",
          once: true,
        },
      });

      // Card sticky inicial
      if (stickyRef.current) {
        gsap.from(stickyRef.current, {
          y: 32,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".projects-body",
            start: "top 78%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const handleClickProject = (id) => {
    setActiveId(id);
    if (stickyRef.current && window.innerWidth < 1024) {
      // en mobile, scroll suave hacia el panel
      stickyRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const scrollToCotiza = () => {
    const section = document.getElementById("cotiza");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="relative py-20 bg-[#f7f3ee] overflow-hidden"
    >
      {/* Fondo con parallax suave */}
      <div className="projects-bg pointer-events-none absolute inset-y-[-80px] -left-32 -right-32 bg-gradient-to-br from-terracota/12 via-transparent to-madera/16 opacity-70" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-10">
        {/* Encabezado */}
        <div className="projects-header space-y-3 max-w-3xl">
          <p className="text-xs tracking-[0.32em] uppercase text-madera/50">
            Proyectos
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Un portafolio vivo para explicar qué podemos construir contigo.
          </h2>
          <p className="text-sm md:text-base text-madera/70">
            En lugar de renders genéricos, mostramos casos reales: tipo de
            espacio, metros, ubicación y para qué se diseñó cada terraza.
          </p>
        </div>

        {/* Filtros */}
        <div className="projects-filters flex flex-wrap gap-3 text-[0.75rem]">
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              type="button"
              onClick={() => setActiveFilter(filter.id)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 uppercase tracking-[0.18em] transition-colors ${
                activeFilter === filter.id
                  ? "bg-madera text-crema border-madera shadow-md shadow-madera/30"
                  : "bg-white text-madera/75 border-madera/20 hover:border-madera/50"
              }`}
            >
              <span>{filter.label}</span>
              {activeFilter === filter.id && (
                <span className="text-[0.65rem]">●</span>
              )}
            </button>
          ))}
        </div>

        {/* Cuerpo: lista + panel sticky */}
        <div className="projects-body grid gap-8 lg:grid-cols-[1.1fr_1.2fr] items-start">
          {/* Lista de proyectos */}
          <div className="space-y-3">
            {filteredProjects.map((project) => {
              const isActive = project.id === activeId;
              return (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => handleClickProject(project.id)}
                  className={`project-list-item w-full text-left rounded-2xl border px-4 py-3 md:px-5 md:py-4 transition-all duration-250 ${
                    isActive
                      ? "bg-white shadow-[0_18px_48px_rgba(0,0,0,0.12)] border-madera/35"
                      : "bg-white/80 border-madera/15 hover:border-madera/35 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <p className="text-[0.72rem] uppercase tracking-[0.2em] text-madera/60">
                      {project.type === "residencial" && "Proyecto residencial"}
                      {project.type === "corporativo" &&
                        "Proyecto corporativo"}
                      {project.type === "mixto" && "Proyecto mixto"}
                    </p>
                    <span className="text-[0.7rem] text-madera/60">
                      {project.surface}
                    </span>
                  </div>
                  <h3 className="text-sm md:text-base font-semibold text-madera">
                    {project.name}
                  </h3>
                  <p className="text-[0.82rem] text-madera/70">
                    {project.location}
                  </p>
                  <p className="mt-1 text-xs md:text-[0.8rem] text-madera/75">
                    {project.summary}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Panel sticky / preview del proyecto activo */}
          <div ref={stickyRef} className="lg:sticky lg:top-24">
            <div className="relative overflow-hidden rounded-[32px] bg-madera text-crema shadow-[0_26px_80px_rgba(0,0,0,0.65)] border border-black/40">
              {/* Borde interior y pestaña */}
              <div className="absolute inset-0 pointer-events-none border border-white/5 rounded-[30px]" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-3 h-6 w-28 rounded-full bg-black/80 border border-white/10" />

              {/* “Imagen” / moodboard abstracto (placeholder para fotos reales) */}
              <div className="relative h-48 md:h-56 overflow-hidden rounded-t-[30px] bg-gradient-to-br from-terracota/50 via-black/40 to-madera/90">
                <div className="absolute inset-0 opacity-[0.12] bg-[url('/noise.png')] mix-blend-soft-light" />
                <div className="absolute inset-0 flex items-end justify-between px-6 pb-5">
                  <div>
                    <p className="text-[0.7rem] uppercase tracking-[0.26em] text-crema/70">
                      {activeProject.location}
                    </p>
                    <p className="text-lg md:text-xl font-serif leading-snug">
                      {activeProject.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1 text-[0.7rem]">
                    <span className="inline-flex px-3 py-1 rounded-full bg-black/60 border border-white/10 uppercase tracking-[0.18em]">
                      {activeProject.surface}
                    </span>
                    <span className="inline-flex px-3 py-1 rounded-full bg-black/50 border border-white/10 text-[0.68rem]">
                      {activeProject.service}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contenido descriptivo */}
              <div className="relative px-6 py-6 space-y-4">
                <p className="text-[0.75rem] text-crema/80 leading-relaxed">
                  {activeProject.summary}
                </p>

                <div className="rounded-2xl bg-black/40 border border-white/10 px-4 py-3 space-y-2 text-[0.75rem]">
                  <p className="text-[0.68rem] uppercase tracking-[0.24em] text-crema/65">
                    Clima del proyecto
                  </p>
                  <p className="text-crema/85">{activeProject.mood}</p>
                </div>

                <div className="flex flex-wrap gap-3 text-[0.72rem] pt-1">
                  <button
                    type="button"
                    onClick={scrollToCotiza}
                    className="inline-flex items-center gap-2 rounded-full bg-crema text-madera px-5 py-1.5 uppercase tracking-[0.18em] hover:bg-white transition-colors"
                  >
                    Cotizar algo similar
                    <span className="text-xs translate-y-[1px]">↗</span>
                  </button>
                  <span className="inline-flex items-center rounded-full border border-crema/30 px-4 py-1.5 text-crema/80">
                    Referencia de caso · Comfort Studio
                  </span>
                </div>

                <p className="text-[0.68rem] text-crema/65 pt-2">
                  Durante la presentación, puedes usar este panel como si fuera
                  una “maqueta digital” de cada proyecto: qué era el espacio,
                  cómo se usa ahora y qué nivel de detalle se trabajó.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Nota final */}
        <p className="text-[0.7rem] text-madera/60 max-w-3xl">
          Más adelante, cada proyecto puede ampliarse con fotos reales,
          planos y rangos de inversión. Para esta demo, el objetivo es que el
          cliente entienda rápidamente qué tipo de terrazas trabaja Comfort
          Studio y pueda decir: “quiero algo parecido a este caso”.
        </p>
      </div>
    </section>
  );
}
