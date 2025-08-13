import { Suspense } from "react";
import { FolderList } from "./FolderList";

export const dynamic = "force-dynamic";

export default function BookmarksPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      <FolderList />
    </Suspense>
  );
}
