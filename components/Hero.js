"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Hero() {
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // 1. Initial Reveal Animation
      tl.from(".hero-bg-video", { scale: 1.1, duration: 2, ease: "power2.out" }, 0)
        .from(".hero-eyebrow", { y: 20, opacity: 0, duration: 0.8 }, 0.3)
        .from(".hero-title-line", { y: 50, opacity: 0, duration: 1, stagger: 0.15 }, 0.4)
        .from(".hero-desc", { y: 20, opacity: 0, duration: 0.8 }, 0.8)
        .from(".hero-cta-group", { y: 20, opacity: 0, duration: 0.8 }, 1.0)
        .from(".hero-card-container", { x: 40, opacity: 0, duration: 1.2 }, 0.6);

      // 2. Mouse Parallax Effect for the Card
      const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 20; // range -10 to 10
        const y = (clientY / window.innerHeight - 0.5) * 20;

        gsap.to(cardRef.current, {
          rotateY: x,
          rotateX: -y,
          duration: 1,
          ease: "power2.out",
          transformPerspective: 1000,
        });
      };

      window.addEventListener("mousemove", handleMouseMove);

      // 3. Scroll Parallax
      gsap.to(".hero-bg-video", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-madera text-crema flex items-center"
    >
      {/* --- Background Layer --- */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-bg-video w-full h-[120%] object-cover opacity-50"
          src="https://cdn.coverr.co/videos/coverr-walking-by-a-wooden-wall-4608/1080p.mp4"
        />
        {/* Cinematic Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/95 via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent opacity-80" />
        {/* Noise Texture for Film Grain Feel */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay" />
      </div>

      {/* --- Main Content Grid --- */}
      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center h-full pt-20 lg:pt-0">

        {/* Left Column: Typography & CTAs */}
        <div className="space-y-10">

          {/* Eyebrow / Tag */}
          <div className="hero-eyebrow flex items-center gap-4">
            <div className="h-[1px] w-12 bg-terracota/60" />
            <span className="text-xs uppercase tracking-[0.3em] text-crema/70 font-medium">
              Arquitectura Exterior · Lima
            </span>
          </div>

          {/* Title with Split Lines for Animation */}
          <h1 ref={titleRef} className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-crema">
            <div className="overflow-hidden"><span className="hero-title-line block">Terrazas que se</span></div>
            <div className="overflow-hidden"><span className="hero-title-line block">sienten <span className="italic text-terracota font-light">hogar</span></span></div>
            <div className="overflow-hidden"><span className="hero-title-line block">desde el inicio.</span></div>
          </h1>

          {/* Description */}
          <p className="hero-desc text-lg md:text-xl text-crema/70 max-w-xl leading-relaxed font-light border-l-2 border-terracota/30 pl-6">
            Transformamos terrazas, azoteas y patios en espacios diseñados con luz cálida,
            materiales premium y arquitectura pensada para ser vivida.
          </p>

          {/* Advanced CTAs */}
          <div className="hero-cta-group flex flex-wrap gap-6 items-center pt-4">
            <a
              href="#cotiza"
              className="group relative px-10 py-5 bg-terracota overflow-hidden rounded-full transition-all hover:shadow-[0_0_50px_rgba(176,115,87,0.4)] hover:scale-105"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
              <div className="relative z-10 flex items-center gap-3">
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-white group-hover:tracking-[0.25em] transition-all duration-500">
                  Cotizar Proyecto
                </span>
                <svg
                  className="w-4 h-4 text-white transition-transform duration-300 group-hover:rotate-3 group-hover:translate-x-0.5"
                  fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </div>
            </a>

            <a
              href="https://calendly.com/"
              target="_blank"
              className="group flex items-center gap-4 px-8 py-5 rounded-full border border-crema/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-crema/30 transition-all duration-300"
            >
              <span className="text-sm font-medium uppercase tracking-[0.2em] text-crema/90">Agendar Reunión</span>
              <svg
                className="w-5 h-5 text-crema transition-transform duration-300 group-hover:rotate-6"
                fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </a>
          </div>
        </div>

        {/* Right Column: The "Portafolio Vivo" Card (Restored & Enhanced) */}
        <div className="hero-card-container hidden lg:flex justify-end perspective-[2000px]">
          <div
            ref={cardRef}
            className="relative w-full max-w-lg bg-[#1a1a1a]/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-10 shadow-2xl transform-style-3d transition-transform will-change-transform"
          >
            {/* Glossy Reflection Effect */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-10">
              {/* Header */}
              <div className="space-y-4 border-b border-white/5 pb-6">
                <div className="flex justify-between items-start">
                  <p className="text-[0.65rem] uppercase tracking-[0.25em] text-terracota font-bold">
                    Diseño + Obra Integral
                  </p>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500/80 animate-pulse" />
                    <span className="text-[0.6rem] uppercase tracking-wider text-crema/40">Active</span>
                  </div>
                </div>
                <h3 className="font-serif text-3xl leading-snug text-crema">
                  De la idea al espacio real: <br />
                  <span className="text-white/60">terrazas que venden confianza.</span>
                </h3>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-2">
                  <p className="text-3xl font-light text-crema">80+ <span className="text-lg text-crema/60">terrazas</span></p>
                  <p className="text-[0.65rem] uppercase tracking-[0.15em] text-crema/40">Construidas en Lima</p>
                  <p className="text-xs text-crema/50 italic">· Desde Miraflores hasta La Molina</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <p className="text-3xl font-light text-crema">4.9 <span className="text-terracota text-xl">★</span></p>
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-crema/40">Satisfacción</p>
                    <p className="text-[0.6rem] text-crema/50 leading-tight">Promedio en procesos completos</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-3xl font-light text-crema">12 <span className="text-lg text-crema/60">años</span></p>
                    <p className="text-[0.65rem] uppercase tracking-[0.15em] text-crema/40">Experiencia</p>
                    <p className="text-[0.6rem] text-crema/50 leading-tight">Diseñando espacios exteriores</p>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-terracota/20 backdrop-blur-md border border-white/10 flex items-center justify-center animate-spin-slow">
                <svg className="w-full h-full p-2 text-crema/30" viewBox="0 0 100 100">
                  <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                  <text fontSize="14">
                    <textPath href="#curve" className="uppercase tracking-[0.2em] fill-current">
                      • Comfort Studio • Design
                    </textPath>
                  </text>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl">↗</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
