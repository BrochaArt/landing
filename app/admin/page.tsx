"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Segmento = { id: string; nombre: string };
type Suscriptor = { email: string; alta: string; dadoDeBaja: boolean };
type Estado = { tipo: "ok" | "error"; texto: string } | null;
type Vista = "escribir" | "lista";

const campo =
  "w-full rounded-[12px] border border-white/15 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brocha-yellow";
const boton =
  "inline-flex h-11 items-center justify-center rounded-[20px] px-6 text-[13px] font-semibold transition-opacity disabled:opacity-50";

export default function AdminPage() {
  const [sesion, setSesion] = useState<"cargando" | "fuera" | "dentro">("cargando");
  const [vista, setVista] = useState<Vista>("escribir");
  const [password, setPassword] = useState("");
  const [segmentos, setSegmentos] = useState<Segmento[]>([]);
  const [segmentId, setSegmentId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [cuerpo, setCuerpo] = useState("");
  const [destino, setDestino] = useState("");
  const [probado, setProbado] = useState(false);
  const [ocupado, setOcupado] = useState(false);
  const [estado, setEstado] = useState<Estado>(null);
  const [preview, setPreview] = useState("");
  const [previaCargando, setPreviaCargando] = useState(false);
  const [suscriptores, setSuscriptores] = useState<Suscriptor[] | null>(null);
  const [listaCargando, setListaCargando] = useState(false);
  const [listaTruncada, setListaTruncada] = useState(false);
  const [listaError, setListaError] = useState<string | null>(null);

  const cargarSegmentos = useCallback(async () => {
    const r = await fetch("/api/admin/segmentos");
    if (r.status === 401) return setSesion("fuera");

    // Autenticado: se entra aunque los segmentos fallen. Si Resend está caído
    // o mal configurado hay que poder ver el error, no quedarse en la puerta.
    setSesion("dentro");

    const d = await r.json().catch(() => ({}));
    if (!r.ok) {
      setEstado({ tipo: "error", texto: d.error ?? "No se pudieron cargar los segmentos." });
      return;
    }
    setSegmentos(d.segmentos ?? []);
    if (d.segmentos?.length === 1) setSegmentId(d.segmentos[0].id);
  }, []);

  useEffect(() => {
    void cargarSegmentos();
  }, [cargarSegmentos]);

  // Cualquier cambio en el contenido invalida la prueba: no se puede probar
  // una versión y enviar otra.
  useEffect(() => setProbado(false), [titulo, cuerpo]);

  // La vista previa se refresca sola cuando dejas de escribir. El retardo
  // evita pedirla en cada tecla; el AbortController descarta las respuestas
  // de peticiones que ya quedaron viejas.
  useEffect(() => {
    if (!titulo.trim() || !cuerpo.trim()) {
      setPreview("");
      return;
    }
    const ctrl = new AbortController();
    const t = setTimeout(async () => {
      setPreviaCargando(true);
      try {
        const r = await fetch("/api/admin/previa", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ titulo, cuerpo }),
          signal: ctrl.signal,
        });
        if (r.ok) setPreview(await r.text());
      } catch {
        // Petición cancelada por otra más reciente: no es un error.
      } finally {
        setPreviaCargando(false);
      }
    }, 500);
    return () => {
      clearTimeout(t);
      ctrl.abort();
    };
  }, [titulo, cuerpo]);

  // La lista se pide al abrir la pestaña y cada vez que cambia el segmento,
  // para que siempre muestre justo a quien le llegaría la campaña.
  useEffect(() => {
    if (sesion !== "dentro" || vista !== "lista") return;
    const ctrl = new AbortController();
    (async () => {
      setListaCargando(true);
      try {
        const r = await fetch(`/api/admin/suscriptores${segmentId ? `?segmentId=${segmentId}` : ""}`, {
          signal: ctrl.signal,
        });
        const d = await r.json();
        if (!r.ok) {
          // El error se guarda aparte y se pinta dentro de la propia pestaña:
          // el aviso general vive en la columna de escribir, que aquí no se ve.
          setListaError(d.error ?? "No se pudo cargar la lista.");
          return;
        }
        setListaError(null);
        setSuscriptores(d.suscriptores ?? []);
        setListaTruncada(Boolean(d.truncado));
      } catch (e) {
        // Abortar al cambiar de segmento es normal; el resto, no.
        if ((e as Error)?.name !== "AbortError") {
          setListaError("No se pudo conectar para cargar la lista.");
        }
      } finally {
        setListaCargando(false);
      }
    })();
    return () => ctrl.abort();
  }, [sesion, vista, segmentId]);

  async function entrar(e: React.FormEvent) {
    e.preventDefault();
    setOcupado(true);
    setEstado(null);
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const d = await r.json();
    setOcupado(false);
    if (!r.ok) return setEstado({ tipo: "error", texto: d.error ?? "No se pudo entrar." });
    setPassword("");
    void cargarSegmentos();
  }

  async function salir() {
    await fetch("/api/admin/logout", { method: "POST" });
    setSesion("fuera");
  }

  async function probar() {
    setOcupado(true);
    setEstado(null);
    const r = await fetch("/api/admin/probar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, cuerpo, destino }),
    });
    const d = await r.json();
    setOcupado(false);
    if (!r.ok) return setEstado({ tipo: "error", texto: d.error ?? "No se pudo enviar la prueba." });
    setProbado(true);
    setEstado({ tipo: "ok", texto: `Prueba enviada a ${destino}. Revísala antes de enviar a todos.` });
  }

  async function enviar() {
    const seg = segmentos.find((s) => s.id === segmentId);
    if (!confirm(`Vas a enviar "${titulo}" a todo el segmento "${seg?.nombre}".\n\nEsto no se puede deshacer. ¿Continuar?`)) return;
    setOcupado(true);
    setEstado(null);
    const r = await fetch("/api/admin/enviar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, cuerpo, segmentId, confirmacion: "ENVIAR" }),
    });
    const d = await r.json();
    setOcupado(false);
    if (!r.ok) return setEstado({ tipo: "error", texto: d.error ?? "No se pudo enviar." });
    setEstado({ tipo: "ok", texto: "Campaña enviada. Las métricas se ven en Resend." });
    setTitulo("");
    setCuerpo("");
    setProbado(false);
  }

  if (sesion === "cargando") {
    return <Marco><p className="text-white/60">Cargando…</p></Marco>;
  }

  if (sesion === "fuera") {
    return (
      <Marco>
        <h1 className="text-[28px] font-bold text-brocha-yellow">Envíos BROCHA</h1>
        <p className="mt-2 text-[14px] text-white/60">Herramienta interna.</p>
        <form onSubmit={entrar} className="mt-8 flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            autoComplete="current-password"
            className={campo}
          />
          <button type="submit" disabled={ocupado || !password} className={`${boton} bg-brocha-yellow text-black`}>
            {ocupado ? "Entrando…" : "Entrar"}
          </button>
        </form>
        <Aviso estado={estado} />
      </Marco>
    );
  }

  const listo = titulo.trim() && cuerpo.trim() && segmentId;
  const nombreSegmento = segmentos.find((s) => s.id === segmentId)?.nombre;

  return (
    <Marco ancho>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-brocha-yellow">Envíos BROCHA</h1>
          <p className="mt-1 text-[14px] text-white/60">
            El diseño lo pone la plantilla: tú escribes título y texto.
          </p>
        </div>
        <button onClick={salir} className="text-[13px] text-white/50 underline">Salir</button>
      </div>

      <div className="mt-6 flex gap-1 rounded-[14px] border border-white/10 bg-white/5 p-1">
        <Pestana activa={vista === "escribir"} onClick={() => setVista("escribir")}>
          Escribir
        </Pestana>
        <Pestana activa={vista === "lista"} onClick={() => setVista("lista")}>
          Suscriptores
          {suscriptores && (
            <span className="ml-2 rounded-full bg-white/15 px-2 py-0.5 text-[11px]">
              {suscriptores.length}
            </span>
          )}
        </Pestana>
      </div>

      {vista === "lista" ? (
        <Suscriptores
          suscriptores={suscriptores}
          cargando={listaCargando}
          truncada={listaTruncada}
          error={listaError}
          segmentId={segmentId}
          nombreSegmento={nombreSegmento}
        />
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-5">
            <label className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold text-white/70">Para quién</span>
              <select value={segmentId} onChange={(e) => setSegmentId(e.target.value)} className={campo}>
                <option value="">Elige un segmento…</option>
                {segmentos.map((s) => (
                  <option key={s.id} value={s.id} className="text-black">{s.nombre}</option>
                ))}
              </select>
              {segmentos.length === 0 && (
                <span className="text-[12px] text-white/50">
                  No hay segmentos. Crea uno en resend.com/audience/segments.
                </span>
              )}
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold text-white/70">Título (también es el asunto)</span>
              <input value={titulo} onChange={(e) => setTitulo(e.target.value)} className={campo} placeholder="Nuevos artistas en BROCHA" />
            </label>

            <label className="flex flex-col gap-2">
              <span className="text-[13px] font-semibold text-white/70">Texto</span>
              <textarea
                value={cuerpo}
                onChange={(e) => setCuerpo(e.target.value)}
                rows={10}
                className={`${campo} resize-y`}
                placeholder={"Escribe aquí.\n\nUna línea en blanco separa párrafos."}
              />
            </label>

            <div className="rounded-[14px] border border-white/10 bg-white/5 p-4">
              <p className="text-[13px] font-semibold text-white/70">1. Envía una prueba</p>
              <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  value={destino}
                  onChange={(e) => setDestino(e.target.value)}
                  placeholder="tu@correo.com"
                  className={campo}
                />
                <button
                  onClick={probar}
                  disabled={ocupado || !titulo.trim() || !cuerpo.trim() || !destino}
                  className={`${boton} shrink-0 bg-white text-black`}
                >
                  Enviar prueba
                </button>
              </div>

              <p className="mt-6 text-[13px] font-semibold text-white/70">2. Envía a todos</p>
              <button
                onClick={enviar}
                disabled={ocupado || !listo || !probado}
                className={`${boton} mt-3 w-full bg-brocha-yellow text-black`}
              >
                {ocupado ? "Enviando…" : "Enviar la campaña"}
              </button>
              {!probado && (
                <p className="mt-2 text-[12px] text-white/50">
                  Se habilita después de enviar una prueba de esta versión.
                </p>
              )}
            </div>

            <Aviso estado={estado} />
          </div>

          <div>
            <p className="mb-2 flex items-center gap-2 text-[13px] font-semibold text-white/70">
              Vista previa
              <span className={`text-[12px] font-normal text-white/40 transition-opacity ${previaCargando ? "opacity-100" : "opacity-0"}`}>
                actualizando…
              </span>
            </p>
            <iframe
              title="Vista previa del correo"
              srcDoc={preview || '<div style="font-family:system-ui;color:#999;padding:32px;text-align:center">Escribe un título y un texto para ver cómo quedará.</div>'}
              className="h-[620px] w-full rounded-[14px] border border-white/10 bg-white"
            />

          </div>
        </div>
      )}
    </Marco>
  );
}

function Pestana({
  activa,
  onClick,
  children,
}: {
  activa: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-current={activa ? "page" : undefined}
      className={`flex-1 rounded-[11px] px-4 py-2.5 text-[13px] font-semibold transition-colors ${
        activa ? "bg-brocha-yellow text-black" : "text-white/60 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Suscriptores({
  suscriptores,
  cargando,
  truncada,
  error,
  segmentId,
  nombreSegmento,
}: {
  suscriptores: Suscriptor[] | null;
  cargando: boolean;
  truncada: boolean;
  error: string | null;
  segmentId: string;
  nombreSegmento?: string;
}) {
  const [busqueda, setBusqueda] = useState("");

  const visibles = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    if (!q) return suscriptores ?? [];
    return (suscriptores ?? []).filter((s) => s.email.toLowerCase().includes(q));
  }, [suscriptores, busqueda]);

  const activos = (suscriptores ?? []).filter((s) => !s.dadoDeBaja).length;
  const bajas = (suscriptores?.length ?? 0) - activos;

  return (
    <div className="mt-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[13px] font-semibold text-white/70">
            {segmentId ? `Segmento «${nombreSegmento ?? segmentId}»` : "Todos los contactos"}
          </p>
          <p className="mt-1 text-[13px] text-white/50">
            {cargando && suscriptores === null
              ? "Cargando…"
              : `${activos} ${activos === 1 ? "activo" : "activos"}${bajas > 0 ? ` · ${bajas} de baja` : ""}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar correo…"
            className={`${campo} w-[220px]`}
          />
          <a
            href={`/api/admin/suscriptores?formato=csv${segmentId ? `&segmentId=${segmentId}` : ""}`}
            className={`${boton} shrink-0 border border-white/15 text-white`}
          >
            Descargar CSV
          </a>
        </div>
      </div>

      {error && <Aviso estado={{ tipo: "error", texto: error }} />}

      <div className="mt-4 max-h-[560px] overflow-y-auto rounded-[14px] border border-white/10">
        <table className="w-full border-collapse text-left text-[14px]">
          <thead className="sticky top-0 bg-brocha-deep">
            <tr className="text-[12px] uppercase text-white/40">
              <th className="px-4 py-3 font-semibold">Correo</th>
              <th className="px-4 py-3 font-semibold">Se suscribió</th>
              <th className="px-4 py-3 font-semibold">Estado</th>
            </tr>
          </thead>
          <tbody>
            {visibles.map((s) => (
              <tr key={s.email} className="border-t border-white/5">
                <td className="px-4 py-3 text-white">{s.email}</td>
                <td className="px-4 py-3 text-white/60">{fecha(s.alta)}</td>
                <td className="px-4 py-3">
                  {s.dadoDeBaja ? (
                    <span className="text-white/40">De baja</span>
                  ) : (
                    <span className="text-brocha-yellow">Activo</span>
                  )}
                </td>
              </tr>
            ))}
            {visibles.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-10 text-center text-[14px] text-white/40">
                  {cargando
                    ? "Cargando…"
                    : error
                      ? "—"
                      : busqueda
                        ? "Ningún correo coincide con la búsqueda."
                        : "Todavía no hay nadie en esta lista."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {truncada && (
        <p className="mt-3 text-[12px] text-white/50">
          La vista muestra los primeros 2000 contactos. Para la lista completa, expórtala desde Resend.
        </p>
      )}
      <p className="mt-3 text-[12px] text-white/40">
        Quien se dio de baja sigue apareciendo, pero no recibe campañas.
      </p>
    </div>
  );
}

/** Fecha corta y legible; si Resend devolviera algo raro, se muestra crudo. */
function fecha(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("es", { day: "2-digit", month: "short", year: "numeric" });
}

function Marco({ children, ancho }: { children: React.ReactNode; ancho?: boolean }) {
  return (
    <main className="min-h-screen bg-brocha-deep px-6 py-16">
      <div className={`mx-auto w-full ${ancho ? "max-w-[1080px]" : "max-w-[420px]"}`}>{children}</div>
    </main>
  );
}

function Aviso({ estado }: { estado: Estado }) {
  if (!estado) return null;
  return (
    <p
      role="status"
      aria-live="polite"
      className={`mt-4 rounded-[12px] px-4 py-3 text-[14px] ${
        estado.tipo === "error" ? "bg-red-500/15 text-red-200" : "bg-brocha-yellow/15 text-brocha-yellow"
      }`}
    >
      {estado.texto}
    </p>
  );
}
