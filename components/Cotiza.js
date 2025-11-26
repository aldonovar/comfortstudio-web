"use client";

import { useEffect, useMemo, useState } from "react";

export default function Cotiza() {
  const [projectType, setProjectType] = useState("");
  const [area, setArea] = useState("");
  const [district, setDistrict] = useState("");
  const [finishLevel, setFinishLevel] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");

  // Lee ?tipo=... de la URL y preselecciona el tipo de proyecto
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const url = new URL(window.location.href);
      const tipoParam = url.searchParams.get("tipo");
      if (tipoParam) {
        setProjectType(tipoParam);
      }
    } catch {
      // si algo falla con la URL, simplemente no hacemos nada
    }
  }, []);

  const whatsappMessage = useMemo(() => {
    const lines = [
      `Hola, soy ${name || "_____"} 👋`,
      "",
      "Me gustaría cotizar un proyecto con Comfort Studio:",
      projectType && `• Tipo de proyecto: ${projectType}`,
      area && `• Metros aproximados: ${area} m²`,
      district && `• Distrito: ${district}`,
      finishLevel && `• Nivel de acabado: ${finishLevel}`,
      budgetRange && `• Rango de inversión: ${budgetRange}`,
      notes && "",
      notes && "Notas adicionales:",
      notes && notes,
      "",
      "¿Podrían ayudarme con una propuesta y los siguientes pasos?",
    ].filter(Boolean);
    return lines.join("\n");
  }, [projectType, area, district, finishLevel, budgetRange, name, notes]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://wa.me/51936230958?text=${encodeURIComponent(
      whatsappMessage
    )}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section id="cotiza" className="py-20 bg-crema">
      <div className="max-w-6xl mx-auto px-4 grid gap-10 lg:grid-cols-[1.1fr_1.1fr]">
        <div className="space-y-4">
          <p className="text-xs tracking-[0.32em] uppercase text-madera/50">
            Cotización guiada
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Un resumen claro de tu terraza, listo para enviar por WhatsApp.
          </h2>
          <p className="text-sm md:text-base text-madera/70 max-w-xl">
            Este formulario no es un “contacto genérico”. Es una guía pensada
            para que podamos entender rápidamente tu espacio y tus objetivos,
            y devolverte una respuesta aterrizada.
          </p>

          <div className="mt-4 rounded-3xl bg-madera text-crema p-4 text-[0.72rem] space-y-2 shadow-xl">
            <p className="uppercase tracking-[0.2em] text-crema/70">
              Vista previa del mensaje
            </p>
            <pre className="whitespace-pre-wrap font-sans leading-relaxed">
              {whatsappMessage}
            </pre>
          </div>

          <p className="text-[0.7rem] text-madera/60">
            También puedes escribirnos directo al{" "}
            <a
              href="https://wa.me/51936230958"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              WhatsApp del estudio
            </a>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-madera/60">
                Tipo de proyecto
              </label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                required
                className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2"
              >
                <option value="">Selecciona una opción</option>

                {/* Nuevos servicios de la sección SERVICIOS */}
                <option>Techo sol y sombra</option>
                <option>Diseño y ejecución de proyecto de terraza</option>
                <option>Proyecto estación de parrilla</option>
                <option>Otro tipo de proyecto al aire libre</option>

                {/* Opciones originales que ya manejabas */}
                <option>Terraza de departamento</option>
                <option>Azotea completa</option>
                <option>Patio interior</option>
                <option>Terraza corporativa</option>
                <option>Proyecto integral</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-madera/60">
                Metros aproximados (m²)
              </label>
              <input
                type="number"
                min="1"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
                className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2"
                placeholder="Ej: 25"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-madera/60">
                Distrito
              </label>
              <input
                type="text"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
                className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2"
                placeholder="Ej: Miraflores, Surco, La Molina"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs uppercase tracking-[0.2em] text-madera/60">
                Nivel de acabado
              </label>
              <select
                value={finishLevel}
                onChange={(e) => setFinishLevel(e.target.value)}
                required
                className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2"
              >
                <option value="">Selecciona una opción</option>
                <option>Funcional</option>
                <option>Premium</option>
                <option>Alta gama</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-[0.2em] text-madera/60">
              Rango de inversión estimado
            </label>
            <select
              value={budgetRange}
              onChange={(e) => setBudgetRange(e.target.value)}
              required
              className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2"
            >
              <option value="">Selecciona una opción</option>
              <option value="Por definir">Por definir</option>
              <option>Hasta 5,000 USD</option>
              <option>5,000 - 12,000 USD</option>
              <option>12,000 - 25,000 USD</option>
              <option>25,000+ USD</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-[0.2em] text-madera/60">
              Nombre o empresa
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2"
              placeholder="Ej: María, Familia López, Estudio XYZ"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs uppercase tracking-[0.2em] text-madera/60">
              Cuéntanos qué te gustaría lograr
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-madera/15 bg-white/80 px-3 py-2"
              placeholder="Ej: Queremos una terraza techada con iluminación cálida, parrilla empotrada y barra para 6 personas."
            />
          </div>

          <button
            type="submit"
            className="mt-3 inline-flex items-center justify-center px-7 py-3 rounded-full bg-madera text-crema text-xs font-semibold tracking-[0.22em] uppercase hover:bg-madera/90 transition-colors"
          >
            Enviar resumen por WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
}
