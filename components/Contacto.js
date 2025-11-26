"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Contacto() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Header
      const headerAnim = gsap.from(".contact-header", {
        y: 26,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 82%",
        animation: headerAnim,
        once: true,
      });

      // Columna info (izquierda)
      gsap.from(".contact-info-block", {
        y: 20,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: ".contact-grid",
          start: "top 80%",
          once: true,
        },
      });

      // Calendly / bloque derecho
      gsap.from(".contact-calendar", {
        y: 28,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".contact-calendar",
          start: "top 85%",
          once: true,
        },
      });

      // Parallax de fondo
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          gsap.to(".contact-bg", {
            y: self.progress * -30,
            ease: "none",
          });
        },
      });

      ScrollTrigger.refresh();
    }, sectionRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="contacto"
      ref={sectionRef}
      className="relative py-20 bg-crema overflow-hidden"
    >
      {/* Fondo sutil con parallax */}
      <div className="contact-bg pointer-events-none absolute inset-y-[-70px] -left-24 -right-24 bg-gradient-to-br from-madera/8 via-transparent to-terracota/12" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 space-y-10">
        {/* Header */}
        <div className="contact-header space-y-3 max-w-3xl">
          <p className="text-xs tracking-[0.32em] uppercase text-madera/50">
            Contacto
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Conversemos sobre tu terraza, con calma y con datos claros.
          </h2>
          <p className="text-sm md:text-base text-madera/70 max-w-xl">
            Puedes agendar una reunión virtual en el horario que mejor se adapte
            a tu agenda o escribirnos directamente por WhatsApp. El objetivo:
            entender qué necesitas, qué espacio tienes y qué tan lejos quieres
            llegar con tu proyecto.
          </p>
        </div>

        {/* Grid principal */}
        <div className="contact-grid grid gap-10 md:grid-cols-[1.05fr_1.1fr] items-start">
          {/* Columna izquierda: info + formas de contacto */}
          <div className="space-y-6">
            {/* Bloque 1: mensaje + WhatsApp directo */}
            <div className="contact-info-block space-y-3">
              <h3 className="text-sm md:text-base font-semibold text-madera">
                Si tienes dudas rápidas, empieza por aquí.
              </h3>
              <p className="text-sm text-madera/75 max-w-md">
                Para consultas generales, pequeños cambios o saber si tu espacio
                es viable para un proyecto, puedes escribirnos directo al
                WhatsApp del estudio. Respondemos dentro del horario de trabajo.
              </p>
              <a
                href="https://wa.me/51936230958"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-madera text-crema px-5 py-2.5 text-[0.8rem] uppercase tracking-[0.2em] hover:bg-madera/90 transition-colors"
              >
                {/* Icono simple de WhatsApp */}
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-crema/10">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-3.5 h-3.5"
                    aria-hidden="true"
                  >
                    <path
                      fill="currentColor"
                      d="M12.04 2C6.57 2 2.21 6.21 2.21 11.57c0 1.92.54 3.7 1.49 5.24L2 22l5.34-1.67a9.9 9.9 0 0 0 4.7 1.2h.01c5.47 0 9.83-4.21 9.83-9.57C21.88 6.21 17.51 2 12.04 2Zm0 17.35c-1.53 0-3.03-.41-4.34-1.2l-.31-.18-3.17.99.98-3.02-.2-.31a7.42 7.42 0 0 1-1.16-3.9c0-4.1 3.39-7.44 7.57-7.44 4.17 0 7.57 3.34 7.57 7.44 0 4.1-3.4 7.44-7.57 7.44Zm4.12-5.59c-.22-.11-1.3-.64-1.5-.71-.2-.07-.35-.11-.5.11-.15.22-.57.71-.7.86-.13.15-.26.16-.48.05-.22-.11-.93-.36-1.78-1.14-.65-.59-1.09-1.32-1.22-1.54-.13-.22-.01-.34.1-.45.1-.1.22-.26.33-.39.11-.13.15-.22.22-.37.07-.15.04-.27-.02-.38-.06-.11-.5-1.2-.69-1.64-.18-.44-.37-.38-.5-.39h-.43c-.15 0-.39.06-.59.28-.2.22-.77.75-.77 1.83 0 1.08.79 2.13.9 2.28.11.15 1.55 2.43 3.77 3.31.53.22.94.35 1.27.45.53.17 1.02.15 1.4.09.43-.06 1.3-.53 1.48-1.05.18-.52.18-.96.13-1.05-.05-.09-.2-.15-.42-.26Z"
                    />
                  </svg>
                </span>
                <span>Escribir al WhatsApp del estudio</span>
              </a>
              <p className="text-[0.7rem] text-madera/60 max-w-sm">
                Horario de respuesta: lunes a viernes de 9:00 a 18:30 (GMT-5,
                Lima). Fuera de horario puedes dejar tu mensaje y lo
                responderemos a la brevedad.
              </p>
            </div>

            {/* Bloque 2: datos de contacto en formato “ficha” */}
            <div className="contact-info-block grid grid-cols-1 sm:grid-cols-2 gap-3 text-[0.8rem]">
              <div className="rounded-2xl border border-madera/15 bg-white/85 px-4 py-3 shadow-sm">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-madera/60 mb-1">
                  Correo del estudio
                </p>
                <p className="font-medium text-madera">
                  contacto@comfortstudio.pe
                </p>
                <p className="text-[0.72rem] text-madera/60 mt-1">
                  Para documentación, planos, cotizaciones formales y seguimientos.
                </p>
              </div>
              <div className="rounded-2xl border border-madera/15 bg-white/85 px-4 py-3 shadow-sm">
                <p className="text-[0.7rem] uppercase tracking-[0.2em] text-madera/60 mb-1">
                  Zona de atención
                </p>
                <p className="font-medium text-madera">
                  Lima Metropolitana y alrededores
                </p>
                <p className="text-[0.72rem] text-madera/60 mt-1">
                  Con foco en distritos con reglamento claro para terrazas y azoteas.
                </p>
              </div>
            </div>

            {/* Bloque 3: puente hacia Cotiza */}
            <div className="contact-info-block rounded-2xl border border-madera/15 bg-white/90 px-4 py-4 text-[0.8rem] space-y-2 shadow-sm">
              <p className="text-[0.7rem] uppercase tracking-[0.22em] text-madera/60">
                ¿Proyecto más definido?
              </p>
              <p className="text-madera/80">
                Si ya tienes más claro lo que quieres — metros aproximados,
                distrito, tipo de terraza — te recomendamos completar el
                formulario de{" "}
                <button
                  type="button"
                  className="underline underline-offset-2 decoration-madera/50 hover:decoration-madera"
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
                  cotización guiada
                </button>
                . Así podemos responderte con información más aterrizada.
              </p>
            </div>
          </div>

          {/* Columna derecha: Calendly / agenda */}
          <div className="contact-calendar space-y-4">
            <h3 className="text-sm md:text-base font-semibold text-madera">
              Agendar una reunión virtual con el estudio.
            </h3>
            <p className="text-sm text-madera/75">
              Usamos un sistema de agenda para organizar mejor los tiempos del
              equipo. Puedes reservar una videollamada corta para revisar tu
              caso, mostrar fotos o planos y entender qué tipo de proyecto tendría sentido.
            </p>

            <div className="rounded-3xl border border-madera/15 bg-white/90 shadow-[0_18px_60px_rgba(0,0,0,0.12)] p-3">
              <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-madera/5 flex items-center justify-center">
                {/* Embed de Calendly (reemplazar src con el enlace real) */}
                <iframe
                  src="https://calendly.com/tu-usuario/consulta-terraza"
                  title="Agenda tu reunión con Comfort Studio"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>

              <div className="flex items-center justify-between gap-3 pt-3 text-[0.75rem] text-madera/70">
                <p className="max-w-xs">
                  Si el embed no se carga correctamente, también puedes abrir la
                  agenda en una nueva pestaña.
                </p>
                <a
                  href="https://calendly.com/tu-usuario/consulta-terraza"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-madera/25 px-4 py-1.5 uppercase tracking-[0.18em] hover:bg-madera hover:text-crema transition-colors"
                >
                  Abrir agenda
                  <span className="text-xs translate-y-[1px]">↗</span>
                </a>
              </div>
            </div>

            <p className="text-[0.7rem] text-madera/60">
              Antes de la reunión, puedes tener a la mano medidas aproximadas
              del espacio, fotos recientes y cualquier restricción del edificio
              (reglamento interno, horarios de obra, etc.). Eso nos ayuda a
              aprovechar mejor el tiempo juntos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
