import { Suspense } from "react";
import ProjectsClient from "./ProjectsClient";

export const dynamic = "force-dynamic";

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <ProjectsClient />
    </Suspense>
  );
}
