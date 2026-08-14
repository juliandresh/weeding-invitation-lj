import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Permite probar `next dev` desde el celular en la misma red Wi-Fi
  // (ej. http://192.168.x.x:3000). Next.js bloquea por defecto los
  // recursos de desarrollo (JS/HMR) para orígenes que no sean localhost.
  // Si tu IP local cambia, agrégala aquí (el propio `next dev` la muestra
  // en un warning en consola cuando bloquea la petición).
  allowedDevOrigins: ["192.168.20.69", "192.168.20.83"],
};

export default nextConfig;
