import Link from "next/link";
import Image from "next/image";
import React from "react";
import { appsData } from "./appData";

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

export default function Layout({ children }: { children: React.ReactNode }) {
  const groupedApps = groupAppsByCategory(appsData);
  const sortedCategories = Object.keys(groupedApps).sort();

  return (
    <div className="lg:h-screen flex">
      <div>
        <div className=" flex-col gap-4 h-screen w-[350px] bg-card border-r overflow-hidden px-2 hidden lg:flex">
          <div className="flex justify-between items-center pt-4 px-2">
            <div className="text-lg font-medium">Apps I Use</div>
          </div>
          <div className="flex-1 overflow-y-auto ">
            {sortedCategories.map((category) => (
              <div key={category} className="flex flex-col gap-1 mb-4">
                <div className="text-sm text-muted-foreground px-2">
                  {category}
                </div>
                <div className="flex flex-col gap-0.5">
                  {sortApps(groupedApps[category]).map((app) => (
                    <Link key={app.id} href={`/apps/${app.id}`}>
                      <div className="p-1.5 flex items-center justify-start w-full gap-2.5 text-secondary-foreground hover:bg-muted rounded-lg transition-colors">
                        <div>
                          <Image
                            src={app.icon}
                            alt={`${app.name} icon`}
                            width={44}
                            height={44}
                            className="rounded-xl "
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
      </div>
      {children}
    </div>
  );
}
