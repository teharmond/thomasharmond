import { Suspense } from "react";
import TasksClient from "./TasksClient";

export const dynamic = "force-dynamic";

export default function TasksPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <TasksClient />
    </Suspense>
  );
}
