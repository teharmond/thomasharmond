import ResponsiveSidebar from "@/components/sidebar/sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      <ResponsiveSidebar />
      <div className="flex-1 overflow-y-auto">
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
