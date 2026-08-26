"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ctaFinal } from "@/lib/content";

type Status = "idle" | "sending" | "ok" | "error";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as {
        error?: string;
        alreadySubscribed?: boolean;
      };

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "No pudimos guardar tu correo. Intenta de nuevo.");
        return;
      }

      setStatus("ok");
      setMessage(
        data.alreadySubscribed
          ? "Ya estabas en la lista. Te avisamos apenas abramos el acceso."
          : "¡Listo! Te avisamos apenas abramos el acceso.",
      );
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("No pudimos conectar. Revisa tu conexión e intenta de nuevo.");
    }
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 sm:flex-row sm:items-center"
      >
        <label htmlFor="email" className="sr-only">
          Correo electrónico
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={ctaFinal.placeholder}
          disabled={status === "sending"}
          className="h-[60px] w-full rounded-[20px] bg-brocha-deep px-6 font-[family-name:var(--font-display)] text-[18px] text-white placeholder:text-white/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brocha-yellow disabled:opacity-60 sm:w-[394px] lg:text-[20px]"
        />
        <Button
          type="submit"
          disabled={status === "sending"}
          className="h-[60px] w-full shrink-0 disabled:opacity-70 sm:w-[226px]"
        >
          {status === "sending" ? "Enviando…" : ctaFinal.cta}
        </Button>
      </form>

      <p
        role="status"
        aria-live="polite"
        className={`mt-4 min-h-[24px] text-[14px] font-medium ${
          status === "error" ? "text-white" : "text-brocha-yellow"
        }`}
      >
        {message}
      </p>
    </div>
  );
}
