import { Suspense } from "react";
import { BookmarksContent } from "../BookmarksContent";

function UncategorizedBookmarksContent() {
  return <BookmarksContent showUncategorized={true} />;
}

export default function UncategorizedBookmarksPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <UncategorizedBookmarksContent />
    </Suspense>
  );
}

export const dynamic = "force-dynamic";