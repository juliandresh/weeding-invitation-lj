"use client";

import { useState } from "react";

export function BotonCopiar({ token }: { token: string }) {
  const [copiado, setCopiado] = useState(false);

  return (
    <button
      type="button"
      onClick={() => {
        const url = `${window.location.origin}/inv/${token}`;
        navigator.clipboard.writeText(url);
        setCopiado(true);
        window.setTimeout(() => setCopiado(false), 1500);
      }}
      className="text-xs uppercase tracking-[0.08em] text-gold underline underline-offset-2 hover:opacity-80"
    >
      {copiado ? "Copiado" : "Copiar link"}
    </button>
  );
}
