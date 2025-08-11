import { NextRequest, NextResponse } from "next/server";
import { unstable_cache } from "next/cache";

// Cache for 1 day
export const revalidate = 86400;

const fetchOpenGraphDataCached = unstable_cache(
  async (url: string) => {
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; BookmarkBot/1.0)",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status}`);
    }

    const html = await response.text();

    const getMetaContent = (property: string): string | null => {
      const regex = new RegExp(
        `<meta[^>]*(?:property|name)=["'](?:og:)?${property}["'][^>]*content=["']([^"']+)["']`,
        "i",
      );
      const match = html.match(regex);
      if (match) return match[1];

      const reverseRegex = new RegExp(
        `<meta[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["'](?:og:)?${property}["']`,
        "i",
      );
      const reverseMatch = html.match(reverseRegex);
      return reverseMatch ? reverseMatch[1] : null;
    };

    const getTitleFromTag = (): string | null => {
      const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      return match ? match[1].trim() : null;
    };

    const getFavicon = (): string | null => {
      const iconRegex =
        /<link[^>]*rel=["'](?:icon|shortcut icon)["'][^>]*href=["']([^"']+)["']/i;
      const match = html.match(iconRegex);

      if (match) {
        const favicon = match[1];
        if (favicon.startsWith("http")) {
          return favicon;
        } else if (favicon.startsWith("//")) {
          return `https:${favicon}`;
        } else if (favicon.startsWith("/")) {
          const urlObj = new URL(url);
          return `${urlObj.origin}${favicon}`;
        } else {
          const urlObj = new URL(url);
          const path = urlObj.pathname.split("/").slice(0, -1).join("/");
          return `${urlObj.origin}${path}/${favicon}`;
        }
      }

      const urlObj = new URL(url);
      return `${urlObj.origin}/favicon.ico`;
    };

    const decodeHtmlEntities = (text: string): string => {
      return text
        .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
        .replace(/&#x([a-fA-F0-9]+);/g, (_, code) =>
          String.fromCharCode(parseInt(code, 16)),
        )
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&amp;/g, "&");
    };

    const rawTitle =
      getMetaContent("title") || getTitleFromTag() || new URL(url).hostname;
    const title = decodeHtmlEntities(rawTitle);
    const favicon = getFavicon();
    const image = getMetaContent("image");

    return { title, favicon, image };
  },
  ["opengraph-data"],
  {
    revalidate: 86400, // Cache for 1 day
  },
);

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    const data = await fetchOpenGraphDataCached(url);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching OpenGraph data:", error);
    return NextResponse.json(
      { error: "Failed to fetch OpenGraph data" },
      { status: 500 },
    );
  }
}
