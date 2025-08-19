import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notes",
  description: "Create and edit your notes",
};

export default function NotesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}