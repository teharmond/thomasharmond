import { Suspense } from "react";
import TasksClient from "./tasks-client";

export default function TasksPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <TasksClient />
    </Suspense>
  );
}
