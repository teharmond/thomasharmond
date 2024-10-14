import Link from "next/link";
import Image from "next/image";
import React from "react";
import { appsData } from "./appData";

// Helper function to sort apps alphabetically by name
function sortApps(apps: typeof appsData) {
  return [...apps].sort((a, b) => a.name.localeCompare(b.name));
}

function groupAppsByCategory(apps: typeof appsData) {
  return apps.reduce((acc, app) => {
    if (!acc[app.category]) {
      acc[app.category] = [];
    }
    acc[app.category].push(app);
    return acc;
  }, {} as Record<string, typeof appsData>);
}

export default function page() {
  const groupedApps = groupAppsByCategory(appsData);
  const sortedCategories = Object.keys(groupedApps).sort();
  return (
    <>
      <div className=" flex-col gap-4 w-full bg-card border-r  px-2 flex lg:hidden">
        <div className="flex justify-between items-center pt-4 px-2">
          <div className="text-lg font-medium">Apps I Use</div>
        </div>
        <div className="flex-1">
          {sortedCategories.map((category) => (
            <div key={category} className="flex flex-col gap-1 mb-4">
              <div className="text-sm text-muted-foreground px-2">
                {category}
              </div>
              <div className="flex flex-col ">
                {sortApps(groupedApps[category]).map((app) => (
                  <Link key={app.id} href={`/apps/${app.id}`}>
                    <div className="p-1 flex items-center justify-start w-full gap-2.5 text-secondary-foreground hover:bg-muted rounded-lg transition-colors">
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
      <div className="flex-col gap-4 w-full bg-card border-r  px-2 hidden lg:flex"></div>
    </>
  );
}
