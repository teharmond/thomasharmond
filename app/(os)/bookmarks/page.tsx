import { Suspense } from "react";
import { BookmarksContent } from "./BookmarksContent";

export const dynamic = "force-dynamic";

export default function BookmarksPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <BookmarksContent />
    </Suspense>
  );
}