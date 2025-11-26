"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services as servicesData } from "./serviceData";

const services = servicesData;

export default function ServiciosScrollPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  const rootRef = useRef(null);
  const wrapperRef = useRef(null);
  const cardRef = useRef(null);
  const stepRefs = useRef([]);

  // Scroll + entrada
  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Entrada del header
      gsap.from(".svc-header", {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      // Parallax suave del panel (solo y + scale)
      if (wrapperRef.current && cardRef.current) {
        gsap.fromTo(
          cardRef.current,
          { y: 26, scale: 0.97 },
          {
            y: -10,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }

      // Cada bloque de texto activa un servicio
      services.forEach((_, index) => {
        const el = stepRefs.current[index];
        if (!el) return;

        ScrollTrigger.create({
          trigger: el,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      // Aparición suave de cada bloque de servicio
      gsap.from(".svc-step", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Cambio de contenido dentro del panel
  useEffect(() => {
    if (!cardRef.current) return;
    const inner = cardRef.current.querySelector(".svc-3d-inner");
    if (!inner) return;

    gsap.fromTo(
      inner,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: "power3.out",
      }
    );
  }, [activeIndex]);

  // Tilt 3D por movimiento del mouse (solo desktop)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!cardRef.current) return;

    const el = cardRef.current;

    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 a 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(el, {
        rotateY: x * 10,
        rotateX: -y * 8,
        duration: 0.4,
        ease: "power3.out",
      });
    };

    const handleLeave = () => {
      gsap.to(el, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    // Solo sentido en pantallas grandes
    const enable = () => window.innerWidth >= 1024;

    if (enable()) {
      el.addEventListener("mousemove", handleMove);
      el.addEventListener("mouseleave", handleLeave);
    }

    const handleResize = () => {
      if (enable()) {
        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
      } else {
        el.removeEventListener("mousemove", handleMove);
        el.removeEventListener("mouseleave", handleLeave);
        gsap.set(el, { rotateX: 0, rotateY: 0 });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const activeService = services[activeIndex];

  return (
    <section
      ref={rootRef}
      className="relative min-h-screen bg-crema py-16 lg:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 space-y-10">
        {/* CABECERA */}
        <header className="svc-header max-w-3xl space-y-3">
          <p className="text-xs tracking-[0.32em] uppercase text-madera/55">
            Servicios
          </p>
          <h1 className="font-serif text-3xl md:text-4xl">
            Servicios de Comfort Studio
          </h1>
          <p className="text-sm md:text-base text-madera/75">
            Desplázate por las líneas de servicio y mira cómo cambia el panel de
            la izquierda. Cada bloque resume para quién está pensado el
            servicio, qué suele incluir y desde ahí puedes ir directo a cotizar
            o ver el detalle completo.
          </p>
        </header>

        {/* DESKTOP: panel 3D + columna de texto */}
        <div
          ref={wrapperRef}
          className="hidden lg:grid gap-10 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1.3fr)] items-start mt-4"
        >
          {/* Panel 3D sticky */}
          <div className="relative lg:h-[78vh]">
            <div className="sticky top-24 [perspective:1200px]">
              <div
                ref={cardRef}
                className="relative rounded-[32px] border border-madera/22 bg-gradient-to-br from-[#1f130e] via-[#24160f] to-[#3a2418] text-crema shadow-[0_24px_80px_rgba(0,0,0,0.7)] px-7 py-8 [transform-style:preserve-3d]"
              >
                {/* Borde interno suave */}
                <div className="pointer-events-none absolute inset-0 rounded-[30px] border border-white/10 opacity-75" />
                {/* Luces */}
                <div className="pointer-events-none absolute -top-10 right-8 h-28 w-28 rounded-full bg-terracota/40 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-14 left-0 h-32 w-32 rounded-full bg-black/45 blur-3xl" />

                <div className="svc-3d-inner relative z-10 space-y-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-[0.7rem] uppercase tracking-[0.28em] text-crema/70">
                        {activeService.category}
                      </p>
                      <h2 className="font-serif text-2xl md:text-3xl">
                        {activeService.name}
                      </h2>
                    </div>
                    <div className="flex flex-col items-end gap-1 text-[0.7rem] text-crema/70">
                      <span className="inline-flex items-center gap-2 rounded-full bg-black/40 px-3 py-1 uppercase tracking-[0.18em]">
                        Servicio {activeIndex + 1} / {services.length}
                      </span>
                      <span className="inline-flex h-8 w-8 items-center justify-center rounded-2xl bg-black/70 shadow-lg shadow-black/50 text-[0.65rem] font-semibold">
                        3D
                      </span>
                    </div>
                  </div>

                  <p className="text-sm md:text-base text-crema/92 max-w-xl">
                    {activeService.heroTagline}
                  </p>

                  <div className="grid gap-3 text-[0.82rem] text-crema/88">
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-crema/70 mb-1">
                        ¿Qué resuelve?
                      </p>
                      <p className="leading-relaxed">
                        {activeService.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-1">
                    <Link
                      href={`/servicios/${activeService.slug}`}
                      className="inline-flex items-center gap-2 rounded-full bg-crema text-madera px-5 py-2 text-[0.75rem] uppercase tracking-[0.2em] font-semibold hover:bg-white transition-colors"
                    >
                      Ver detalle del servicio
                      <span className="text-xs translate-y-[1px]">↗</span>
                    </Link>
                    <Link
                      href={`/?tipo=${encodeURIComponent(
                        activeService.name
                      )}#cotiza`}
                      className="inline-flex items-center gap-2 rounded-full border border-crema/45 bg-white/5 px-5 py-2 text-[0.75rem] uppercase tracking-[0.2em] text-crema hover:bg-crema hover:text-madera hover:border-transparent transition-colors"
                    >
                      Cotizar este servicio
                      <span className="text-xs translate-y-[1px]">↗</span>
                    </Link>
                  </div>

                  <p className="text-[0.7rem] text-crema/70 pt-2 max-w-md">
                    Este panel acompaña la presentación al cliente: mientras
                    recorres los textos de la derecha, la tarjeta refuerza la
                    idea principal de cada servicio.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna de texto (controla el scroll) */}
          <div className="space-y-16">
            {services.map((service, index) => (
              <section
                key={service.slug}
                ref={(el) => (stepRefs.current[index] = el)}
                className="svc-step"
              >
                <div className="space-y-4">
                  <p className="text-[0.75rem] uppercase tracking-[0.24em] text-madera/60">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1} ·{" "}
                    {service.category}
                  </p>
                  <h3 className="font-serif text-xl md:text-2xl text-madera">
                    {service.name}
                  </h3>

                  <p className="text-sm md:text-base text-madera/85 max-w-xl">
                    {service.longDescription}
                  </p>

                  <div className="grid gap-4 md:grid-cols-2 text-sm text-madera/80">
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-madera/60 mb-1">
                        Ideal para
                      </p>
                      <ul className="space-y-1.5">
                        {service.idealFor.slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-[6px] h-[5px] w-[5px] rounded-full bg-terracota/70" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="text-[0.72rem] uppercase tracking-[0.2em] text-madera/60 mb-1">
                        Qué suele incluir
                      </p>
                      <ul className="space-y-1.5">
                        {service.includes.slice(0, 3).map((item) => (
                          <li key={item} className="flex gap-2">
                            <span className="mt-[6px] h-[5px] w-[5px] rounded-full bg-madera/75" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <p className="text-[0.72rem] text-madera/60 max-w-md">
                    Desde aquí puedes abrir el detalle completo del servicio o
                    ir directo a cotizar con este tipo preseleccionado.
                  </p>
                </div>
              </section>
            ))}
          </div>
        </div>

        {/* MOBILE / TABLET: versión simple en cards */}
        <div className="space-y-6 lg:hidden mt-4">
          {services.map((service) => (
            <article
              key={service.slug}
              className="rounded-[24px] border border-madera/12 bg-white/90 p-5 shadow-[0_16px_50px_rgba(0,0,0,0.06)]"
            >
              <p className="text-[0.72rem] uppercase tracking-[0.24em] text-madera/60 mb-1">
                {service.category}
              </p>
              <h3 className="font-serif text-lg text-madera mb-2">
                {service.name}
              </h3>
              <p className="text-sm text-madera/80 mb-3">
                {service.shortDescription}
              </p>

              <div className="flex flex-wrap gap-2 mb-3 text-[0.8rem] text-madera/75">
                {service.idealFor.slice(0, 2).map((item) => (
                  <span
                    key={item}
                    className="inline-flex items-center rounded-full bg-madera/5 px-3 py-1"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/servicios/${service.slug}`}
                  className="inline-flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-full border border-madera/20 bg-white px-4 py-2 text-[0.78rem] uppercase tracking-[0.18em] text-madera hover:bg-madera hover:text-crema transition-colors"
                >
                  Ver detalle
                  <span className="text-xs translate-y-[1px]">↗</span>
                </Link>
                <Link
                  href={`/?tipo=${encodeURIComponent(service.name)}#cotiza`}
                  className="inline-flex flex-1 min-w-[140px] items-center justify-center gap-2 rounded-full bg-madera text-crema px-4 py-2 text-[0.78rem] uppercase tracking-[0.18em] hover:bg-madera/90 transition-colors"
                >
                  Cotizar
                  <span className="text-xs translate-y-[1px]">↗</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
