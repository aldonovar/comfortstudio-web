import Hero from "../components/Hero";
import Servicios from "../components/Servicios";
import Proyectos from "../components/Proyectos";
import Proceso from "../components/Proceso";
import Estudio from "../components/Estudio";
import Cotiza from "../components/Cotiza";
import Contacto from "../components/Contacto";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Servicios />
      <Proyectos />
      <Proceso />
      <Estudio />
      <Cotiza />
      <Contacto />
    </>
  );
}
