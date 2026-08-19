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

// Necesaria para que el og:image (vista previa en WhatsApp, etc.) resuelva
// a una URL absoluta real en vez de caer en localhost — actualizar si
// alguna vez se agrega un dominio propio (CLAUDE.md §2).
const SITE_URL = "https://weeding-invitation-lj.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Liliana & Julián | Nos casamos",
  description: "Invitación digital de nuestra boda",
  openGraph: {
    title: "Liliana & Julián | Nos casamos",
    description: "Invitación digital de nuestra boda",
    siteName: "Liliana & Julián",
  },
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
