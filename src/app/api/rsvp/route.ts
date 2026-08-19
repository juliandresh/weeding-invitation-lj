import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { verificarTurnstile } from "@/lib/turnstile";

// Rate limiting best-effort en memoria, además del captcha — ver CLAUDE.md
// §7. No es perfectamente robusto entre instancias serverless, pero es una
// capa extra sin costo ni dependencias nuevas.
const intentos = new Map<string, number[]>();
const VENTANA_MS = 10 * 60 * 1000;
const MAX_INTENTOS = 5;

function estaLimitado(clave: string) {
  const ahora = Date.now();
  const historial = (intentos.get(clave) ?? []).filter(
    (t) => ahora - t < VENTANA_MS
  );
  historial.push(ahora);
  intentos.set(clave, historial);
  return historial.length > MAX_INTENTOS;
}

type PersonaRsvp = {
  id?: string;
  asistira?: boolean;
};

type CuerpoRsvp = {
  token?: string;
  personas?: PersonaRsvp[];
  notas?: string;
  turnstileToken?: string;
};

export async function POST(request: Request) {
  let body: CuerpoRsvp;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { token, personas, notas, turnstileToken } = body;

  if (
    typeof token !== "string" ||
    !Array.isArray(personas) ||
    personas.some((p) => typeof p.id !== "string" || typeof p.asistira !== "boolean") ||
    typeof turnstileToken !== "string"
  ) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }

  if (estaLimitado(token)) {
    return NextResponse.json(
      { error: "Demasiados intentos. Espera unos minutos e inténtalo de nuevo." },
      { status: 429 }
    );
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const captchaValido = await verificarTurnstile(turnstileToken, ip);
  if (!captchaValido) {
    return NextResponse.json(
      { error: "No se pudo verificar que eres una persona. Intenta de nuevo." },
      { status: 400 }
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.rpc("confirmar_asistencia", {
    p_token: token,
    p_personas: personas,
    p_notas: notas || null,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
