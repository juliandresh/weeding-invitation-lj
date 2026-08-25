import type { MetadataRoute } from "next";

// Los links personales de invitado (/inv/[token]) no deben indexarse — son
// privados aunque no sean secretos por diseño de arquitectura, no hace
// falta que buscadores los rastreen.
//
// El panel admin (/cheladmin) NO se lista aquí a propósito: robots.txt es
// público, y listar la ruta ahí sería anunciarla exactamente a los mismos
// bots/escáneres de los que se quiere evitar que la encuentren fácilmente
// (CLAUDE.md §6). No estar indexado por Google no depende de robots.txt —
// nadie enlaza a esa ruta públicamente, así que no hay como la encuentren
// por ahí; la protección real sigue siendo el login + RLS.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/inv"],
    },
  };
}
