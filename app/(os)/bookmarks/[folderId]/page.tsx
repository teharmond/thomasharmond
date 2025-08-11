import { BookmarksContent } from "../BookmarksContent";

export default async function BookmarksFolderPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;
  return <BookmarksContent folderId={folderId} />;
}
