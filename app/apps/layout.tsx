import Link from "next/link";
import Image from "next/image";
import React from "react";
import { appsData } from "./appData";
import notionLogo from "./appLogos/Notion.webp";
import LinearLogo from "./appLogos/Linear.webp";
import CursorLogo from "./appLogos/Cursor.webp";
import { StaticImageData } from "next/image";

// Helper function to sort apps alphabetically by name
function sortApps(apps: typeof appsData) {
  return [...apps].sort((a, b) => a.name.localeCompare(b.name));
}

// Helper function to group apps by category
function groupAppsByCategory(apps: typeof appsData) {
  return apps.reduce((acc, app) => {
    if (!acc[app.category]) {
      acc[app.category] = [];
    }
    acc[app.category].push(app);
    return acc;
  }, {} as Record<string, typeof appsData>);
}

// Updated helper function
function getAppIcon(icon: string | StaticImageData): string | StaticImageData {
  const iconMap: Record<string, StaticImageData> = {
    notionLogo,
    LinearLogo,
    CursorLogo,
  };

  if (typeof icon === "string") {
    return iconMap[icon] || icon;
  }

  return icon;
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const groupedApps = groupAppsByCategory(appsData);
  const sortedCategories = Object.keys(groupedApps).sort();

  return (
    <div className="h-screen flex">
      <div className="flex flex-col gap-4 h-screen w-[350px] bg-card border-r overflow-hidden px-2">
        <div className="flex justify-between items-center pt-4 px-2">
          <div className="text-lg font-medium">Apps I Use</div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sortedCategories.map((category) => (
            <div key={category} className="flex flex-col gap-1 mb-4">
              <div className="text-sm text-muted-foreground px-2">
                {category}
              </div>
              {sortApps(groupedApps[category]).map((app) => (
                <Link key={app.id} href={app.href}>
                  <div className="h-16 flex items-center justify-start p-2 w-full gap-2 hover:bg-muted rounded-lg transition-colors">
                    <div>
                      <Image
                        src={getAppIcon(app.icon)}
                        alt={`${app.name} icon`}
                        width={48}
                        height={48}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <div className="text-sm font-medium">{app.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {app.price}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
