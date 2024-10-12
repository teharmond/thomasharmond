import notionLogo from "./appLogos/Notion.webp";
import LinearLogo from "./appLogos/Linear.webp";
import CursorLogo from "./appLogos/Cursor.webp";

export const appsData = [
  {
    id: "figma",
    name: "Figma",
    category: "Design",
    icon: "/icons/figma.webp",
    href: "/apps/figma",
    price: "Free",
  },
  {
    id: "cursor",
    name: "Cursor",
    category: "Development",
    icon: CursorLogo,
    href: "/apps/cursor",
    price: "Free",
  },
  {
    id: "linear",
    name: "Linear",
    category: "Project Management",
    icon: LinearLogo,
    href: "/apps/linear",
    price: "Free",
    description:
      "Linear is a project management tool that helps you manage your projects and tasks.",
  },
];
