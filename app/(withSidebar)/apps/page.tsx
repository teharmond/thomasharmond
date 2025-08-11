import Link from "next/link";
import Image from "next/image";
import React from "react";
import { appsData } from "./appData";

// Helper function to sort apps alphabetically by name
function sortApps(apps: typeof appsData) {
  return [...apps].sort((a, b) => a.name.localeCompare(b.name));
}

function groupAppsByCategory(apps: typeof appsData) {
  return apps.reduce(
    (acc, app) => {
      if (!acc[app.category]) {
        acc[app.category] = [];
      }
      acc[app.category].push(app);
      return acc;
    },
    {} as Record<string, typeof appsData>,
  );
}

export default function page() {
  const groupedApps = groupAppsByCategory(appsData);
  const sortedCategories = Object.keys(groupedApps).sort();
  return (
    <>
      <div className="bg-card flex w-full flex-col gap-4 border-r px-2 lg:hidden">
        <div className="flex items-center justify-between px-2 pt-4">
          <div className="text-lg font-medium">Apps I Use</div>
        </div>
        <div className="flex-1">
          {sortedCategories.map((category) => (
            <div key={category} className="mb-4 flex flex-col gap-1">
              <div className="text-muted-foreground px-2 text-sm">
                {category}
              </div>
              <div className="flex flex-col">
                {sortApps(groupedApps[category]).map((app) => (
                  <Link key={app.id} href={`/apps/${app.id}`}>
                    <div className="text-secondary-foreground hover:bg-muted flex w-full items-center justify-start gap-2.5 rounded-lg p-1 transition-colors">
                      <div>
                        <Image
                          src={app.icon}
                          alt={`${app.name} icon`}
                          width={48}
                          height={48}
                          className="rounded-xl"
                        />
                      </div>
                      <div>{app.name}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card hidden w-full flex-col gap-4 border-r px-2 lg:flex"></div>
    </>
  );
}
