import { Suspense } from "react";
import NotesClient from "./NotesClient";

export const dynamic = "force-dynamic";

export default function NotesPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <NotesClient />
    </Suspense>
  );
}