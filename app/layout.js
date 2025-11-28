"use client";

import { ReactLenis } from "@studio-freight/react-lenis";
import "./globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageTransition from "../components/PageTransition";

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <head>
        <title>Comfort Studio | Arquitectura de Terrazas</title>
        <meta
          name="description"
          content="Especialistas en diseño y ejecución de terrazas, azoteas y patios en Lima. Transformamos espacios en experiencias de vida."
        />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased bg-crema text-madera selection:bg-terracota selection:text-white">
        <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
          <Navbar />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </ReactLenis>
      </body>
    </html>
  );
}
