import { Portada } from "@/components/portada/portada";
import { Historia } from "@/components/historia/historia";
import { Countdown } from "@/components/countdown/countdown";
import { Itinerario } from "@/components/itinerario/itinerario";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Portada />
      <Historia />
      <Countdown />
      <Itinerario />
    </main>
  );
}
