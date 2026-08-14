# Especificación Técnica — Invitación Digital de Boda Interactiva

## 1. Resumen del proyecto

Sitio web de invitación de boda, interactivo y con panel de administración, inspirado
en el estilo visual de invitaciones digitales premium (portada con sobre animado,
cuenta regresiva, itinerario, galería, RSVP), pero con **diseño, código y assets
gráficos 100% originales** — sin reutilizar imágenes, código ni contenido de sitios
de terceros.

**Objetivo:** invitación elegante, funcional en móvil (canal principal de acceso de
los invitados), con gestión sencilla de invitados/mesas/cupos desde un panel admin,
desplegada a costo prácticamente $0 durante al menos 5 meses.

---

## 2. Stack tecnológico

| Capa | Tecnología | Notas |
|---|---|---|
| Framework | **Next.js** (React) | Frontend público + rutas API + panel admin en un solo proyecto |
| Animaciones | **Framer Motion** | Sobre animado, scroll reveals, transiciones |
| Estilos | Tailwind CSS o CSS Modules | A definir según preferencia de Claude Code |
| Base de datos | **Supabase** (Postgres, free tier) | Persistente, con RLS nativo y panel visual |
| Autenticación admin | Supabase Auth | Usuario/contraseña, solo para el panel |
| Hosting | **Vercel** (plan Hobby, gratuito) | Proyecto personal/no comercial — cumple los términos de uso |
| Imágenes | `next/image` (optimización nativa) | Compresión y formatos automáticos (WebP/AVIF) |
| Captcha RSVP | Cloudflare Turnstile o reCAPTCHA v3 | Gratuito, anti-spam en confirmación de asistencia |

**Costo estimado total (5 meses):** $0, salvo dominio propio opcional (no
indispensable, ya que los invitados son familiares/amigos y el subdominio
`.vercel.app` es aceptable).

---

## 3. Contenido multimedia (fotos y música)

### 3.1 Fotografías profesionales
- Las fotos provienen de una sesión con **fotógrafo profesional**, entregadas en
  **alta resolución** (probablemente JPEG de alta calidad o RAW convertido).
- **No se suben directo a producción sin procesar** — flujo requerido:
  1. Seleccionar las fotos finales para portada, galería y fondo de sección.
  2. Optimizar/comprimir (mantener calidad visual, reducir peso de archivo) antes de
     incorporarlas al proyecto.
  3. Servir mediante `next/image`, que genera automáticamente tamaños responsive y
     formatos modernos (WebP/AVIF) según el dispositivo del invitado.
  4. Priorizar carga rápida en móvil con datos móviles (esto es crítico: la mayoría
     de invitados abrirá el link desde el celular, posiblemente con conexión no ideal).

### 3.2 Canción de fondo
- El sitio debe incluir **audio de fondo** con la canción elegida por los novios,
  reproduciéndose mientras el invitado navega el contenido.
- Restricción técnica a tener en cuenta: los navegadores modernos **bloquean
  autoplay con sonido** sin interacción previa del usuario. Patrón recomendado (igual
  al usado en este tipo de invitaciones): el audio inicia en el momento en que el
  invitado interactúa por primera vez (ej. al hacer clic para "abrir el sobre").
- Incluir control de mute/pausa visible y accesible en todo momento.
- Formato: archivo de audio propio (comprado/con licencia, o el mismo track si los
  novios tienen los derechos/lo usan de forma personal-no comercial) servido desde el
  proyecto, en formato MP3 optimizado en peso.

### 3.3 Álbum digital con código QR (servicio de terceros)
- Se contratará un **servicio externo de álbum digital** (proveedor aún por
  definir) que permite a los invitados **subir sus propias fotos el día de la
  boda** escaneando un código QR.
- El sitio **no aloja ni procesa las fotos subidas** — solo muestra el código QR
  (imagen) y/o un botón/link que redirige al álbum del proveedor contratado.
- Requisito técnico: dejar este elemento como un **componente configurable** desde
  el panel de administración (campo `album_qr_url` o similar en
  `configuracion_sitio`), para poder:
  - Subir la imagen del QR y/o el link de destino sin tocar código, una vez se
    contrate el proveedor.
  - Activar/ocultar la sección mientras no se tenga el dato definitivo.
- Dato pendiente: nombre del proveedor y el QR/link definitivo (se notificará más
  adelante — ver sección 10, Pendientes).

---

## 4. Secciones del sitio (inspiradas en el patrón de invitaciones digitales, contenido y diseño originales)

1. **Portada** — nombre de los novios, mensaje de bienvenida, sobre animado (clic para abrir)
2. **Introducción** — mensaje/historia de la pareja
3. **Cuenta regresiva** — días/horas/minutos/segundos hasta el evento
4. **Itinerario** — horario del día (ceremonia, recepción, fiesta)
5. **Ceremonia y Recepción** — lugar, hora, botón "Cómo llegar" (link a Google Maps)
6. **Galería** — fotos de la sesión profesional
7. **Frase/cita** (opcional, textual propia)
8. **Dress code** — sugerencias de vestimenta
9. **Comparte tus fotos** — **código QR de acceso al álbum digital** (servicio de
    terceros contratado aparte) para que los invitados suban sus fotos del día del
    evento
10. **Sugerencias** — hoteles y sitios turísticos cercanos
11. **Confirmación de asistencia (RSVP)** — formulario conectado a Supabase, con captcha
12. **Footer** — créditos discretos

---

## 5. Modelo de datos (Supabase / Postgres)

```
tabla: invitados
- id (uuid, PK, generado automáticamente)
- token_unico (uuid, único, usado en el link individual — NO IDs secuenciales)
- titulo (text) -- "Sr.", "Sra.", "Srta.", etc.
- nombre (text)
- mesa (int, nullable)
- cupos (int)
- confirmado (boolean, default null) -- null = pendiente, true/false = respondió
- cupos_confirmados (int, nullable)
- fecha_confirmacion (timestamp, nullable)
- notas (text, nullable) -- restricciones alimentarias, etc.
- creado_en (timestamp, default now())

tabla: configuracion_sitio
- id (uuid, PK)
- clave (text) -- ej. "fecha_boda", "lugar_ceremonia", "cancion_url", "album_qr_url", "album_link"
- valor (text)
- actualizado_en (timestamp)
```

- **Row Level Security (RLS) activo desde el día uno en ambas tablas.**
- Política pública: un invitado (vía `token_unico` en la URL) solo puede **leer su
  propio registro** y **actualizar únicamente los campos de confirmación** de ese
  mismo registro. No puede leer ni modificar otros registros.
- Política admin: solo usuarios autenticados (Supabase Auth) tienen acceso completo
  de lectura/escritura a ambas tablas.
- Links de invitado con formato `tuboda.vercel.app/inv/{token_unico}` — nunca
  `?mesa=8` o IDs adivinables/secuenciales.

---

## 6. Panel de administración

Ruta protegida (ej. `/admin`), no indexable por buscadores (`robots.txt`),
autenticación obligatoria vía Supabase Auth. Funciones:

- CRUD de invitados (crear, editar, eliminar, ver estado de confirmación)
- Generación automática del link único por invitado
- Vista de resumen: total invitados, confirmados, pendientes, cupos totales
- Edición de configuración general del sitio (fecha, lugares, textos, canción,
  hashtag) sin tocar código
- Exportar lista de invitados (para respaldo o para logística del día del evento)

---

## 7. Seguridad

| Medida | Detalle |
|---|---|
| Autenticación admin | Obligatoria, Supabase Auth, sin acceso público al panel |
| RLS en Supabase | Activo desde el inicio en todas las tablas (ver sección 5) |
| Tokens no adivinables | UUID por invitado, nunca parámetros secuenciales en URL |
| Llaves secretas | `service_role key` solo en variables de entorno del servidor (Vercel), nunca en el frontend ni en el repositorio |
| Frontend público | Usa únicamente la `anon key`, limitada por RLS |
| Anti-spam RSVP | Captcha (Turnstile/reCAPTCHA v3) + rate limiting en la ruta API |
| HTTPS | Automático vía Vercel |
| Dependencias | Mantener actualizadas (`npm audit` periódico) |
| Respaldo | Exportación manual de la base de datos desde Supabase antes del evento |

---

## 8. Flujo de trabajo de desarrollo y pruebas

1. Claude Code construye el proyecto **por secciones** (no todo de una vez):
   portada+sobre → countdown → itinerario → galería → RSVP → panel admin, etc.
2. Cada avance se sube al repositorio conectado a Vercel, lo que genera
   automáticamente un **Preview Deployment** (URL temporal única, sin afectar
   producción).
3. Se prueba cada avance en:
   - Escritorio (navegador)
   - **Celular real** (no solo emulador) — prioridad alta, ya que la mayoría de
     invitados accederá desde móvil
4. Se da feedback puntual a Claude Code sobre ajustes visuales/funcionales
   necesarios, se itera.
5. El mismo proyecto de Supabase se usa desde el inicio (no hace falta ambiente
   separado dado el bajo volumen de datos); se limpian los registros de prueba antes
   del lanzamiento real.
6. Solo cuando todas las secciones estén validadas, se promueve la versión final a
   **producción** (la URL que se comparte con los invitados).
7. Expectativa realista: el primer resultado será una base sólida, no el producto
   terminado — se espera iterar varias rondas por sección hasta lograr el pulido
   visual deseado (transiciones, espaciados, timing de animaciones).

---

## 9. Elementos decorativos y diseño visual

- **Fuentes:** Google Fonts, combinación de una fuente caligráfica/script para
  títulos (ej. Great Vibes, Parisienne, Alex Brush) y una serif elegante para texto
  (ej. Cormorant Garamond, Playfair Display, EB Garamond).
- **Gráficos decorativos** (ramos, marcos, separadores): generados originalmente
  mediante IA ajustados a la paleta de color del proyecto, complementados con
  SVG/CSS propio para separadores simples. Se evita cualquier asset descargado de
  sitios de invitaciones de terceros.
- **Paleta de colores:** a definir con los novios (pendiente de esta especificación,
  input necesario antes de iniciar el desarrollo).
- **Video/animación de fondo (si aplica):** banco de videos libres (Pexels, Pixabay,
  Coverr) para elementos genéricos tipo pétalos/brillos, o generado a medida.

---

## 10. Pendientes antes de iniciar desarrollo con Claude Code

- [ ] Definir paleta de colores exacta
- [ ] Confirmar fecha, lugar de ceremonia y recepción
- [ ] Recibir y seleccionar fotos finales del fotógrafo
- [ ] Elegir canción de fondo definitiva (y confirmar disponibilidad del archivo)
- [ ] Cargar lista inicial de invitados (nombre, título, mesa, cupos)
- [ ] Definir proveedor del álbum digital y obtener el código QR / link definitivo
- [ ] Crear cuenta en Vercel y en Supabase (gratuitas)

---

## 11. Notas de andamiaje (scaffolding)

- Proyecto inicializado con `create-next-app` (Next.js 16, App Router, TypeScript,
  Tailwind CSS, ESLint, `src/` dir, alias de importación `@/*`).
- `next dev` genera y mantiene automáticamente `AGENTS.md` con reglas específicas de
  esta versión de Next.js (puede incluir cambios respecto a versiones anteriores).
  Ese archivo se referencia abajo con `@AGENTS.md` — no editar `AGENTS.md` a mano,
  se regenera solo.

@AGENTS.md
