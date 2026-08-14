import { Portada } from "@/components/portada/portada";
import { Historia } from "@/components/historia/historia";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Portada />
      <Historia />
    </main>
  );
}
