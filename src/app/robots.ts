import type { MetadataRoute } from "next";

// El panel admin no debe indexarse (CLAUDE.md §6). Los links personales de
// invitado (/inv/[token]) tampoco — son privados aunque no sean secretos
// por diseño de arquitectura, no hace falta que buscadores los rastreen.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/inv"],
    },
  };
}
