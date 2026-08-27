# BROCHA — Landing

Landing de acceso anticipado de [BROCHA](https://brocha-landing.vercel.app),
construida desde el diseño de Figma del archivo *BROCHA-page*.

## Correr el proyecto

```bash
npm install
npm run dev
```

Necesitas un `.env.local`. Copia `.env.example` y rellena los valores; en
Vercel ya están cargados, así que también sirve:

```bash
vercel env pull .env.local
```

## Cómo está organizado

| Ruta | Qué hay |
|---|---|
| `lib/content.ts` | **Todo el copy y los datos.** Agregar un artista o una tarjeta es añadir un objeto aquí, sin tocar JSX. |
| `components/sections/` | Una sección de la página por archivo. |
| `components/ui/` | Piezas compartidas: botón, contenedor, formulario, visor de galería. |
| `app/globals.css` | Los tokens del Figma como variables CSS. |
| `app/api/subscribe/` | Endpoint que guarda suscripciones y dispara el correo de bienvenida. |
| `supabase/migrations/` | Esquema de la tabla `subscribers`. |
| `scripts/` | Verificación automatizada con Playwright. |

## Tokens del diseño

| Variable | Valor | Uso |
|---|---|---|
| `--brocha-violet` | `#7454e8` | Violeta principal |
| `--brocha-deep` | `#371d90` | Morado oscuro |
| `--brocha-yellow` | `#fdff84` | Amarillo de titulares y botones |

Tipografías: **Montserrat** (titulares y cuerpo), **Syne** (títulos de tarjeta)
y **Lexend** (enlaces del navbar).

## Suscripciones

Los correos se guardan en Supabase. La tabla tiene RLS con una única política
de `INSERT`: la landing puede dar de alta, pero **no puede leer, modificar ni
borrar** la lista. Para consultarla se usa el dashboard de Supabase.

El correo de bienvenida sale por Resend después de responder la petición, así
que un fallo de envío nunca rompe el alta.

## Verificar antes de desplegar

```bash
npm run build && node scripts/qa-check.mjs
```

Revisa hidratación, la galería, el "Cargar más", el desbordamiento horizontal
y los errores de consola, en desktop y móvil. Con `QA_URL` apunta a producción.

## Despliegue

Cada push a `main` despliega a producción; cada Pull Request genera su preview.
