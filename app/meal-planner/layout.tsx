"use client";

import { usePathname, useRouter } from "next/navigation";
import { BookOpen, Calendar, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton } from "@clerk/nextjs";

const tabs = [
  { name: "Recipes", href: "/meal-planner", icon: BookOpen },
  { name: "Plan", href: "/meal-planner/plan", icon: Calendar },
  { name: "Shopping", href: "/meal-planner/shopping", icon: ShoppingCart },
];

export default function MealPlannerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    if (href === "/meal-planner") {
      return pathname === "/meal-planner" || pathname.startsWith("/meal-planner/recipes");
    }
    return pathname.startsWith(href);
  };

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex h-14 items-center justify-between px-4">
          <h1 className="text-lg font-semibold">Meal Planner</h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </header>

      {/* Main content with padding for bottom nav */}
      <main className="flex-1 overflow-auto pb-20">{children}</main>

      {/* Bottom tab navigation - Mobile first */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 safe-area-pb">
        <div className="mx-auto max-w-lg">
          <div className="flex h-16 items-center justify-around">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const active = isActive(tab.href);
              return (
                <button
                  key={tab.name}
                  onClick={() => router.push(tab.href)}
                  className={cn(
                    "flex flex-1 flex-col items-center justify-center gap-1 py-2 transition-colors",
                    active
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className={cn("h-5 w-5", active && "stroke-[2.5]")} />
                  <span className="text-xs font-medium">{tab.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
