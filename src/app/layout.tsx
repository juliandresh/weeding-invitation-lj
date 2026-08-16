import type { Metadata } from "next";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";
import { AudioProvider } from "@/components/audio/audio-context";
import { MusicToggle } from "@/components/audio/music-toggle";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import "./globals.css";

const greatVibes = Great_Vibes({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Liliana & Julián | Nos casamos",
  description: "Invitación digital de nuestra boda",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${greatVibes.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-ivory text-ink">
        <ScrollProgress />
        <AudioProvider src="/audio/miranda-perfecta.mp3">
          {children}
          <MusicToggle />
        </AudioProvider>
      </body>
    </html>
  );
}
