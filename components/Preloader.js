"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const overlayRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    // Animación de entrada rápida
    if (logoRef.current) {
      gsap.fromTo(
        logoRef.current,
        { opacity: 0, y: 12, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "power2.out",
        }
      );
    }

    // Espera corta y luego fade-out elegante
    const timer = setTimeout(() => {
      if (!overlayRef.current) {
        setVisible(false);
        return;
      }

      gsap.to(logoRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.4,
        ease: "power2.inOut",
      });

      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.6,
        delay: 0.1,
        ease: "power2.inOut",
        onComplete: () => setVisible(false),
      });
    }, 1100); // ~1.1s de presencia total

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-madera"
    >
      {/* Capa de textura / gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-madera/90" />
      <div className="absolute inset-0 opacity-[0.08] bg-[url('/noise.png')] mix-blend-soft-light" />

      {/* Contenido central */}
      <div
        ref={logoRef}
        className="relative z-10 flex flex-col items-center gap-3"
      >
        <div className="relative">
          {/* Glow suave */}
          <div className="absolute inset-0 blur-3xl rounded-full bg-terracota/25" />
          <div className="relative w-20 h-20 rounded-3xl bg-black/60 border border-crema/15 flex items-center justify-center shadow-2xl">
            <img
              src="/comfort-logo-light.png"
              alt="Comfort Studio"
              className="max-w-[70%] max-h-[70%] object-contain"
            />
          </div>
        </div>

        <p className="text-[0.7rem] uppercase tracking-[0.26em] text-crema/70">
          Comfort Studio
        </p>
        <p className="text-[0.7rem] text-crema/50">
          Preparando la experiencia de tu terraza…
        </p>
      </div>
    </div>
  );
}
