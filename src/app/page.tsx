import { Portada } from "@/components/portada/portada";
import { Historia } from "@/components/historia/historia";
import { Countdown } from "@/components/countdown/countdown";
import { Itinerario } from "@/components/itinerario/itinerario";
import { CeremoniaRecepcion } from "@/components/ceremonia/ceremonia-recepcion";
import { Galeria } from "@/components/galeria/galeria";
import { Frase } from "@/components/frase/frase";
import { DressCode } from "@/components/dress-code/dress-code";
import { CompartirFotos } from "@/components/compartir-fotos/compartir-fotos";
import { Sugerencias } from "@/components/sugerencias/sugerencias";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Portada />
      <Historia />
      <Countdown />
      <Itinerario />
      <CeremoniaRecepcion />
      <Galeria />
      <Frase />
      <DressCode />
      <CompartirFotos />
      <Sugerencias />
    </main>
  );
}
