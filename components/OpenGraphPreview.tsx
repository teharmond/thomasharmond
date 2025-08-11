"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalLink } from "lucide-react";

interface OpenGraphData {
  title?: string;
  description?: string;
  image?: string;
  siteName?: string;
  favicon?: string;
  url: string;
}

interface OpenGraphPreviewProps {
  url: string;
  className?: string;
  title?: string;
  variant?: "full" | "compact";
}

export function OpenGraphPreview({
  url,
  className,
  title,
  variant = "full",
}: OpenGraphPreviewProps) {
  const [data, setData] = useState<OpenGraphData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `/api/opengraph?url=${encodeURIComponent(url)}`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch OpenGraph data");
        }

        const result = await response.json();

        if (result.error) {
          setError(`${result.error}: ${result.details || ""}`);
        } else {
          setData(result);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  if (loading) {
    if (variant === "compact") {
      return (
        <Card
          className={`group mx-2 transition-shadow duration-200 hover:shadow-md ${className}`}
        >
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <Skeleton className="h-4 w-4 flex-shrink-0 rounded-sm" />
              <Skeleton className="h-4 flex-1" />
              <Skeleton className="h-4 w-4 flex-shrink-0 rounded-sm" />
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card
        className={`group mx-2 transition-shadow duration-200 hover:shadow-md ${className}`}
      >
        <CardContent className="p-0">
          <div className="flex">
            <Skeleton className="h-24 w-32 flex-shrink-0 rounded-l-lg" />
            <div className="flex-1 space-y-2 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  const handleClick = () => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  if (error || !data) {
    if (variant === "compact") {
      return (
        <Card
          className={`group mx-2 cursor-pointer border transition-all duration-200 hover:border-gray-300 hover:shadow-md ${className}`}
          onClick={handleClick}
        >
          <CardContent className="p-3">
            <div className="flex items-center space-x-3">
              <div className="h-4 w-4 flex-shrink-0" />
              <span className="group-hover:text-foreground/80 flex-1 truncate text-sm font-medium transition-colors">
                {title || new URL(url).hostname}
              </span>
              <ExternalLink className="text-muted-foreground h-3 w-3 flex-shrink-0" />
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <Card
        className={`group hover:border-border/80 mx-2 cursor-pointer border transition-all duration-200 hover:shadow-md ${className}`}
        onClick={handleClick}
      >
        <CardContent className="p-4">
          <div className="text-muted-foreground flex items-center space-x-2">
            <ExternalLink className="h-4 w-4" />
            <span className="truncate text-sm">{title || url}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card
        className={`group hover:border-border/80 mx-2 cursor-pointer border transition-all duration-200 hover:shadow-md ${className}`}
        onClick={handleClick}
      >
        <CardContent className="p-3">
          <div className="flex items-center space-x-3">
            {data.favicon && (
              <img
                src={data.favicon}
                alt="Favicon"
                className="h-4 w-4 flex-shrink-0 rounded-sm object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  // Try GitHub's SVG favicon as fallback
                  if (data.url.includes("github.com")) {
                    target.src = "https://github.com/fluidicon.png";
                  } else {
                    target.style.display = "none";
                  }
                }}
              />
            )}
            <span className="group-hover:text-foreground/80 flex-1 truncate text-sm font-medium transition-colors">
              {title || data.title || new URL(url).hostname}
            </span>
            <ExternalLink className="text-muted-foreground h-3 w-3 flex-shrink-0" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`group hover:border-border/80 mx-2 cursor-pointer border transition-all duration-200 hover:shadow-md ${className}`}
      onClick={handleClick}
    >
      <CardContent className="p-0">
        <div className="flex">
          {data.image && (
            <div className="w-32 flex-shrink-0 overflow-hidden rounded-l-lg">
              <img
                src={data.image}
                alt={data.title || "Preview image"}
                className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = "none";
                }}
              />
            </div>
          )}
          <div
            className={`min-w-0 flex-1 p-4 ${
              !data.image ? "rounded-l-lg" : ""
            }`}
          >
            <div className="space-y-1">
              {(title || data.title) && (
                <h3 className="group-hover:text-foreground/80 line-clamp-2 text-sm leading-tight font-medium transition-colors">
                  {title || data.title}
                </h3>
              )}
              {data.description && (
                <p className="text-muted-foreground line-clamp-2 text-xs leading-relaxed">
                  {data.description}
                </p>
              )}
              <div className="flex items-center space-x-1 pt-1">
                <ExternalLink className="text-muted-foreground h-3 w-3" />
                <span className="text-muted-foreground truncate text-xs">
                  {data.siteName || new URL(url).hostname}
                </span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
