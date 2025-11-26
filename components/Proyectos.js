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
  const sectionRef = useRef(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === "todos") return PROJECTS;
    return PROJECTS.filter((p) => p.type === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Parallax del fondo
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

      // Header: entra cuando la sección aparece
      const headerAnim = gsap.from(".projects-header", {
        y: 32,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 78%",
        animation: headerAnim,
        once: true,
      });

      // Filtros: stagger suave
      const filtersAnim = gsap.from(".projects-filters button", {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: 0.06,
      });

      ScrollTrigger.create({
        trigger: ".projects-filters",
        start: "top 82%",
        animation: filtersAnim,
        once: true,
      });

      // Estado inicial de las cards
      gsap.set(".project-card", {
        y: 40,
        opacity: 0,
      });

      // Cards: animación batch al entrar en viewport
      ScrollTrigger.batch(".project-card", {
        start: "top 85%",
        onEnter: (batch) => {
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.08,
            overwrite: true,
          });
        },
      });

      // Importante: refrescar para que ScrollTrigger detecte la altura final
      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [filteredProjects]);

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="relative py-20 bg-[#f7f3ee] overflow-hidden"
    >
      {/* Fondo con parallax suave */}
      <div className="projects-bg pointer-events-none absolute inset-y-[-80px] -left-32 -right-32 bg-gradient-to-br from-terracota/10 via-transparent to-madera/10 opacity-60" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-10">
        {/* Encabezado */}
        <div className="projects-header space-y-3 max-w-3xl">
          <p className="text-xs tracking-[0.32em] uppercase text-madera/50">
            Proyectos
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Casos reales de terrazas, azoteas y patios trabajados por Comfort
            Studio.
          </h2>
          <p className="text-sm md:text-base text-madera/70">
            Aquí no mostramos renders genéricos, sino tipos de casos que
            explican cómo pensamos el espacio, el uso y el nivel de detalle en
            cada proyecto.
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

        {/* Grid de proyectos */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              className="project-card group relative overflow-hidden rounded-3xl border border-madera/10 bg-white/80 shadow-sm hover:shadow-[0_22px_60px_rgba(0,0,0,0.16)] transition-shadow duration-300"
            >
              {/* Cinta superior */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2 text-[0.72rem] uppercase tracking-[0.18em] text-madera/60">
                <span>
                  {project.type === "residencial" && "Proyecto residencial"}
                  {project.type === "corporativo" && "Proyecto corporativo"}
                  {project.type === "mixto" && "Proyecto mixto"}
                </span>
                <span className="text-madera/50">{project.surface}</span>
              </div>

              {/* Cuerpo */}
              <div className="px-5 pb-5 space-y-3">
                <h3 className="text-lg font-semibold text-madera">
                  {project.name}
                </h3>
                <p className="text-[0.85rem] text-madera/70">
                  {project.location}
                </p>

                <p className="text-sm text-madera/80">{project.summary}</p>

                <div className="flex flex-wrap gap-2 pt-2 text-[0.7rem] text-madera/75">
                  <span className="inline-flex items-center rounded-full border border-madera/20 bg-madera/5 px-3 py-1">
                    {project.service}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-madera/10 bg-white px-3 py-1">
                    {project.surface}
                  </span>
                </div>

                {/* CTA pequeño */}
                <div className="pt-3 flex items-center justify-between text-[0.72rem]">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 text-madera/80 group-hover:text-madera"
                    onClick={() => {
                      const section = document.getElementById("cotiza");
                      if (section) {
                        section.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                      }
                    }}
                  >
                    <span className="uppercase tracking-[0.18em]">
                      Cotizar algo similar
                    </span>
                    <span className="text-xs translate-y-[1px] group-hover:translate-x-[1px] transition-transform">
                      ↗
                    </span>
                  </button>
                  <span className="text-madera/50 text-[0.7rem]">
                    Referencia de caso · Comfort Studio
                  </span>
                </div>
              </div>

              {/* Overlay sutil en hover */}
              <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-terracota/6 via-transparent to-madera/10" />
            </article>
          ))}
        </div>

        {/* Nota final */}
        <p className="text-[0.7rem] text-madera/60 max-w-3xl">
          Cada proyecto mostrado aquí puede ampliarse con fotos, planos,
          detalles técnicos y rangos de inversión aproximados. Para la demo
          inicial, trabajamos con descripciones claras para que el cliente
          entienda el tipo de resultados que puede esperar.
        </p>
      </div>
    </section>
  );
}
