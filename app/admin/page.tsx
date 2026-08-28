"use client";

import { useCallback, useEffect, useState } from "react";

type Segmento = { id: string; nombre: string };
type Estado = { tipo: "ok" | "error"; texto: string } | null;

const campo =
  "w-full rounded-[12px] border border-white/15 bg-white/5 px-4 py-3 text-[15px] text-white placeholder:text-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brocha-yellow";
const boton =
  "inline-flex h-11 items-center justify-center rounded-[20px] px-6 text-[13px] font-semibold transition-opacity disabled:opacity-50";

export default function AdminPage() {
  const [sesion, setSesion] = useState<"cargando" | "fuera" | "dentro">("cargando");
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
                No hay segmentos. Crea uno en resend.com/segments.
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
          <p className="mb-2 text-[13px] font-semibold text-white/70">Vista previa</p>
          <iframe
            title="Vista previa del correo"
            srcDoc={preview}
            className="h-[620px] w-full rounded-[14px] border border-white/10 bg-white"
          />
          <button
            onClick={async () => {
              const r = await fetch("/api/admin/previa", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ titulo, cuerpo }),
              });
              setPreview(r.ok ? await r.text() : "<p>No se pudo generar.</p>");
            }}
            disabled={!titulo.trim() || !cuerpo.trim()}
            className={`${boton} mt-3 w-full bg-white/10 text-white`}
          >
            Actualizar vista previa
          </button>
        </div>
      </div>
    </Marco>
  );
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
