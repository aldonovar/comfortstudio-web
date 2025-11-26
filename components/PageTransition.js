"use client";

import { useEffect, useState } from "react";

export default function PageTransition({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Retraso sutil para sincronizar con SmoothScroller
    const timer = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`transition-opacity duration-[900ms] ease-out ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
