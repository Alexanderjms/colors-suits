"use client";

import { useEffect, useState, useCallback } from "react";

interface Photo {
  id: string;
  url: string;
  alt: string;
  author: string;
  authorUrl: string;
  unsplashUrl: string;
}

type Status = "idle" | "loading" | "ready" | "error" | "no-key";

const QUERIES = [
  "men business suit style",
  "men formal attire style",
  "men elegant outfit smart",
];

const CACHE_KEY = "inspiration-photos";
const CACHE_DURATION_MS = 3 * 60 * 60 * 1000; // 3 hours

interface CacheEntry {
  photos: Photo[];
  timestamp: number;
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as CacheEntry;
  } catch {
    return null;
  }
}

function writeCache(photos: Photo[]) {
  try {
    localStorage.setItem(
      CACHE_KEY,
      JSON.stringify({ photos, timestamp: Date.now() }),
    );
  } catch {
    // ignore
  }
}

function pickQuery(): string {
  const dayIndex = Math.floor(Date.now() / CACHE_DURATION_MS);
  return QUERIES[dayIndex % QUERIES.length];
}

interface ReferencePhotosProps {
  selection?: { shirt: string | null; pants: string | null; shoes: string | null };
}

export default function ReferencePhotos(_props: ReferencePhotosProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const fetchPhotos = useCallback(async (useCache: boolean) => {
    if (useCache) {
      const cache = readCache();
      if (cache && Date.now() - cache.timestamp < CACHE_DURATION_MS) {
        setPhotos(cache.photos);
        setStatus("ready");
        return;
      }
    }

    const query = pickQuery();

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
      const newPhotos: Photo[] = data.photos ?? [];

      setPhotos(newPhotos);
      setStatus("ready");
      writeCache(newPhotos);
    } catch {
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    setStatus("loading");
    fetchPhotos(true);
  }, [fetchPhotos]);

  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-sm font-medium tracking-wide uppercase text-[var(--color-muted)]">
        Inspiración
      </h3>

      {status === "loading" && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="aspect-[4/3] animate-pulse rounded-lg bg-[var(--color-surface)]"
            />
          ))}
        </div>
      )}

      {status === "ready" && photos.length > 0 && (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {photos.map((photo) => (
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
                <span className="text-[10px] text-white">{photo.author}</span>
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
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {["#2C3E50", "#34495E", "#1A1A2E"].map((bg, i) => (
            <div
              key={i}
              className="flex aspect-[4/3] items-center justify-center rounded-lg"
              style={{ backgroundColor: bg }}
            >
              <svg
                viewBox="0 0 200 240"
                className="h-16 w-16 opacity-20"
                stroke="currentColor"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              >
                <path d="M 100,48 C 82,48 68,34 62,34 C 50,34 32,40 22,48 L 6,80 C 4,84 8,90 14,88 L 32,80 C 36,78 38,82 38,86 L 42,212 C 42,218 48,222 56,222 L 144,222 C 152,222 158,218 158,212 L 162,86 C 162,82 164,78 168,80 L 186,88 C 192,90 196,84 194,80 L 178,48 C 168,40 150,34 138,34 C 132,34 118,48 100,48 Z" />
                <path d="M 62,34 L 100,60 L 138,34" />
              </svg>
            </div>
          ))}
        </div>
      )}

      {status === "no-key" && (
        <p className="rounded-lg border border-dashed border-[var(--color-outline)] p-3 text-xs text-[var(--color-muted)]">
          Agregá{" "}
          <code className="rounded bg-[var(--color-surface)] px-1 py-0.5 font-mono text-[var(--color-ink)]">
            UNSPLASH_ACCESS_KEY
          </code>{" "}
          en{" "}
          <code className="rounded bg-[var(--color-surface)] px-1 py-0.5 font-mono text-[var(--color-ink)]">
            .env.local
          </code>{" "}
          para ver fotos reales
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
