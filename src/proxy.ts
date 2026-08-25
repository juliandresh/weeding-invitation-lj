import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Protege /cheladmin/*: redirige a /cheladmin/login si no hay sesión, y de
// vuelta a /cheladmin si ya hay sesión y se intenta ver /cheladmin/login. La
// seguridad real de las operaciones de escritura la da RLS (política
// `authenticated` en Supabase) — esto es solo la redirección de UX, ver
// CLAUDE.md §6-7. La ruta se llama "/cheladmin" (no "/admin") a propósito,
// para no ser un blanco obvio de escaneo automático.
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const esLogin = request.nextUrl.pathname === "/cheladmin/login";

  if (!user && !esLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/cheladmin/login";
    return NextResponse.redirect(url);
  }

  if (user && esLogin) {
    const url = request.nextUrl.clone();
    url.pathname = "/cheladmin";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/cheladmin/:path*"],
};
