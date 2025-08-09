import { BookmarksContent } from "../BookmarksContent";

export default function BookmarksFolderPage({
  params,
}: {
  params: { folderId: string };
}) {
  return <BookmarksContent folderId={params.folderId} />;
}