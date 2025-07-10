"use client";

import React, { useState, useMemo } from "react";
import {
  Bookmark,
  Dices,
  ExternalLink,
  Instagram,
  Layers,
  MemoryStick,
  Newspaper,
  PenTool,
  QrCode,
  Twitter,
  Menu,
  X,
  Code,
  ImageIcon,
  Home,
  Book,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import EmailCopy from "./email-copy";

export default function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const activeLink = useMemo(() => {
    const links = [
      { href: "/", text: "Home" },
      { href: "/blog", text: "Blog" },
      { href: "/bookmarks", text: "Bookmarks" },
      { href: "/apps", text: "Apps I Use" },
      { href: "/writing-tools", text: "Writing Tools" },
      { href: "/byte", text: "Byte Counter" },
      { href: "/uuid", text: "UUID Generator" },
      { href: "/qr", text: "QR Code Generator" },
      { href: "/text-to-safe-html", text: "Text to Safe HTML" },
      { href: "/webp", text: "WebP Converter" },
    ];

    const matchedLink = links.find(
      (link) => pathname === link.href || pathname.startsWith(`${link.href}/`)
    );

    return matchedLink?.text || "Thomas Harmond";
  }, [pathname]);

  const SidebarContent = () => (
    <>
      <div className="flex gap-2 items-center justify-between">
        <div className="flex pt-3 md:pt-0 flex-col py-1.5 md:pl-1.5 pl-8 md:px-2">
          <Link href="/">
            <div className="text-md md:text-lg font-bold">Thomas Harmond</div>
          </Link>
          <div className="hidden md:block">
            <EmailCopy />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-0.5">
        <SidebarLink
          href="/"
          icon={<Home className="w-3.5 h-3.5" />}
          text="Home"
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-muted-foreground text-xs uppercase font-medium px-2 py-1">
          Me
        </div>
        <SidebarLink
          href="/blog"
          icon={<Newspaper className="w-3.5 h-3.5" />}
          text="Blog"
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          href="/bookmarks"
          icon={<Bookmark className="w-3.5 h-3.5" />}
          text="Bookmarks"
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          href="/apps"
          icon={<Layers className="w-3.5 h-3.5" />}
          text="Apps I Use"
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-muted-foreground text-xs uppercase font-medium px-2 py-1">
          Projects
        </div>

        <SidebarLink
          href="https://churchspace.co"
          text="Church Space"
          external
          setIsOpen={setIsOpen}
          icon={
            <svg
              className="w-3.5 h-3.5"
              viewBox="0 0 168 285"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none">
                <path
                  d="M142.177 23.3423H173.437C179.612 23.3423 184.617 28.3479 184.617 34.5227V258.318C184.617 264.493 179.612 269.498 173.437 269.498H142.177V23.3423Z"
                  fill="currentColor"
                />
                <path
                  d="M0 57.5604C0 52.8443 2.9699 48.6392 7.41455 47.0622L125.19 5.27404C132.441 2.70142 140.054 8.07871 140.054 15.7722V275.171C140.054 282.801 132.557 288.172 125.332 285.718L7.55682 245.715C3.03886 244.18 0 239.939 0 235.167V57.5604Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          }
        />

        <SidebarLink
          href="https://theologynotes.com"
          text="Theology Notes"
          external
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-muted-foreground text-xs uppercase font-medium px-2 py-1">
          Tools
        </div>
        <SidebarLink
          href="/writing-tools"
          icon={<PenTool className="w-3.5 h-3.5" />}
          text="Writing Tools"
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          href="/byte"
          icon={<MemoryStick className="w-3.5 h-3.5" />}
          text="Byte Counter"
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          href="/uuid"
          icon={<Dices className="w-3.5 h-3.5" />}
          text="UUID Generator"
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          href="/qr"
          icon={<QrCode className="w-3.5 h-3.5" />}
          text="QR Code Generator"
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          href="/text-to-safe-html"
          icon={<Code className="w-3.5 h-3.5" />}
          text="Text to Safe HTML"
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          href="/webp"
          icon={<ImageIcon className="w-3.5 h-3.5" />}
          text="WebP Converter"
          setIsOpen={setIsOpen}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-muted-foreground text-xs uppercase font-medium px-2 py-1">
          Socials
        </div>
        <SidebarLink
          href="https://www.goodreads.com/user/show/92633673-thomas-harmond/"
          icon={<Book className="w-3.5 h-3.5" />}
          text="Goodreads"
          external
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          href="https://www.instagram.com/thomas.harmond/"
          icon={<Instagram className="w-3.5 h-3.5" />}
          text="Instagram"
          external
          setIsOpen={setIsOpen}
        />
        <SidebarLink
          href="https://x.com/teharmond"
          icon={<Twitter className="w-3.5 h-3.5" />}
          text="Twitter"
          external
          setIsOpen={setIsOpen}
        />
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger menu for medium screens and below */}
      <div className="md:hidden border-b px-2 py-1.5 flex items-center gap-1">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[270px] sm:w-[300px] pt-0 px-3"
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              className="absolute left-2.5 top-2.5"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close menu</span>
            </Button>
            <div className=" flex flex-col gap-6">
              <SidebarContent />
            </div>
          </SheetContent>
        </Sheet>
        <span className="text-sm font-medium">{activeLink}</span>
      </div>

      {/* Regular sidebar for large screens */}
      <div className="hidden md:flex p-3 h-screen overflow-y-auto text-sm  flex-col gap-6 max-w-xl w-[270px] bg-card border-r">
        <SidebarContent />
      </div>
    </>
  );
}

interface SidebarLinkProps {
  href: string;
  icon?: React.ReactNode;
  text: string;
  external?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  text,
  external,
  setIsOpen,
}) => {
  const pathname = usePathname();
  const isActive = external
    ? false
    : pathname === href || pathname.startsWith(`${href}/`);

  const handleClick = () => {
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <Link
      className={cn(
        "text-secondary-foreground flex items-center gap-1.5 w-full justify-between hover:bg-muted transition-colors px-2 py-1 rounded-md",
        isActive && "bg-muted font-medium"
      )}
      href={href}
      onClick={handleClick}
    >
      <span className="flex items-center gap-2">
        {icon}
        {text}
      </span>
      {external && <ExternalLink className="w-3.5 h-3.5" />}
    </Link>
  );
};
