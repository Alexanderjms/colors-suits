import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q");

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  const key = process.env.UNSPLASH_ACCESS_KEY;

  if (!key) {
    return NextResponse.json(
      { error: "Unsplash API key not configured" },
      { status: 503 },
    );
  }

  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=20`,
    {
      headers: {
        Authorization: `Client-ID ${key}`,
      },
    },
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Unsplash API error" },
      { status: res.status },
    );
  }

  const data = await res.json();
  const photos = data.results.map((p: Record<string, unknown>) => ({
    id: p.id,
    url: (p.urls as Record<string, string>).small,
    raw: (p.urls as Record<string, string>).raw,
    alt: (p.alt_description as string) ?? "",
    author: (p.user as Record<string, string>).name,
    authorUrl: (p.user as Record<string, string>).links + "?utm_source=combinador-outfits&utm_medium=referral",
    unsplashUrl: (p.links as Record<string, string>).html + "?utm_source=combinador-outfits&utm_medium=referral",
  }));

  return NextResponse.json({ photos });
}
