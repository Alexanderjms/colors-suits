"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import type { SelectionState } from "@/lib/colors";
import { getItem } from "@/lib/colors";

interface Photo {
  id: string;
  url: string;
  alt: string;
  author: string;
  authorUrl: string;
  unsplashUrl: string;
}

type Status = "idle" | "loading" | "ready" | "error" | "no-key";

const NAME_TO_EN: Record<string, string> = {
  "blanco": "white",
  "negro": "black",
  "azul claro": "light blue",
  "azul marino": "navy blue",
  "gris claro": "light gray",
  "gris oscuro": "dark gray",
  "beige": "beige",
  "crema": "cream",
  "rosa": "pink",
  "rojo": "red",
  "burdeos": "burgundy",
  "verde oliva": "olive green",
  "mostaza": "mustard",
  "marrón": "brown",
  "marrón oscuro": "dark brown",
  "denim": "denim",
  "lavanda": "lavender",
  "coral": "coral",
  "salmón": "salmon",
  "camel": "camel",
  "celeste": "sky blue",
  "caqui": "khaki",
  "gris": "gray",
  "borgoña": "burgundy",
  "tostado": "tan",
  "coñac": "cognac",
  "grafito": "charcoal",
};

function buildQuery(selection: SelectionState): string {
  const parts: string[] = [];
  if (selection.shirt) {
    const item = getItem("shirt", selection.shirt);
    if (item) parts.push(NAME_TO_EN[item.id] ?? item.name.toLowerCase());
  }
  if (selection.pants) {
    const item = getItem("pants", selection.pants);
    if (item) parts.push(NAME_TO_EN[item.id] ?? item.name.toLowerCase());
  }
  if (selection.shoes) {
    const item = getItem("shoes", selection.shoes);
    if (item) parts.push(NAME_TO_EN[item.id] ?? item.name.toLowerCase());
  }
  return [...parts, "men outfit style"].join(" ");
}

interface ReferencePhotosProps {
  selection: SelectionState;
}

export default function ReferencePhotos({ selection }: ReferencePhotosProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const prevQueryRef = useRef("");

  const isComplete = selection.shirt && selection.pants && selection.shoes;

  const fetchPhotos = useCallback(async (query: string) => {
    try {
      const res = await fetch(`/api/unsplash?q=${encodeURIComponent(query)}`);

      if (res.status === 503) {
        setStatus("no-key");
        return;
      }

      if (!res.ok) {
        setStatus("error");
        return;
      }

      const data = await res.json();
      setPhotos(data.photos ?? []);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!isComplete) {
      setStatus("idle");
      setPhotos([]);
      prevQueryRef.current = "";
      return;
    }

    const query = buildQuery(selection);
    if (query === prevQueryRef.current) return;

    prevQueryRef.current = query;
    setStatus("loading");
    setPhotos([]);

    const timer = setTimeout(() => fetchPhotos(query), 400);

    return () => clearTimeout(timer);
  }, [isComplete, selection, fetchPhotos]);

  if (!isComplete) return null;

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-medium tracking-wide uppercase text-[var(--color-muted)]">
        Inspiración
      </h3>

      {status === "loading" && (
        <div className="grid grid-cols-3 gap-2">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] animate-pulse rounded-lg bg-[var(--color-surface)]"
            />
          ))}
        </div>
      )}

      {status === "ready" && photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {photos.slice(0, 3).map((photo) => (
            <a
              key={photo.id}
              href={photo.unsplashUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative overflow-hidden rounded-lg ring-1 ring-black/5 transition-shadow duration-200 hover:ring-2 hover:ring-[var(--color-primary)]"
            >
              <img
                src={photo.url}
                alt={photo.alt || "Inspiración de outfit"}
                className="aspect-[4/3] w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/60 to-transparent p-2 transition-transform duration-200 group-hover:translate-y-0">
                <span className="text-[10px] text-white">
                  {photo.author}
                </span>
              </div>
            </a>
          ))}
        </div>
      )}

      {status === "ready" && photos.length === 0 && (
        <p className="text-xs text-[var(--color-muted)]">
          No se encontraron fotos de referencia
        </p>
      )}

      {status === "error" && (
        <p className="text-xs text-[var(--color-muted)]">
          Error al cargar fotos de referencia
        </p>
      )}

      {status === "no-key" && (
        <p className="rounded-lg border border-dashed border-[var(--color-outline)] p-3 text-xs text-[var(--color-muted)]">
          Agregá{" "}
          <code className="rounded bg-[var(--color-surface)] px-1 py-0.5 font-mono text-[var(--color-ink)]">
            UNSPLASH_ACCESS_KEY
          </code>{" "}
          en <code className="rounded bg-[var(--color-surface)] px-1 py-0.5 font-mono text-[var(--color-ink)]">.env.local</code>
        </p>
      )}

      {status === "ready" && photos.length > 0 && (
        <p className="text-[10px] text-[var(--color-muted)]">
          Fotos via{" "}
          <a
            href="https://unsplash.com/?utm_source=combinador-outfits&utm_medium=referral"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[var(--color-ink)]"
          >
            Unsplash
          </a>
        </p>
      )}
    </section>
  );
}
