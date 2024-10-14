"use client";

import React, { useState } from "react";
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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import EmailCopy from "./email-copy";

export default function ResponsiveSidebar() {
  const [isOpen, setIsOpen] = useState(false);

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
        <div className="text-muted-foreground text-xs uppercase font-medium px-2 py-1">
          Me
        </div>
        <SidebarLink
          href="/blog"
          icon={<Newspaper className="w-3.5 h-3.5" />}
          text="Blog"
        />
        <SidebarLink
          href="/bookmarks"
          icon={<Bookmark className="w-3.5 h-3.5" />}
          text="Bookmarks"
        />
        <SidebarLink
          href="/apps"
          icon={<Layers className="w-3.5 h-3.5" />}
          text="Apps I Use"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-muted-foreground text-xs uppercase font-medium px-2 py-1">
          Projects
        </div>
        <SidebarLink href="https://trivo.app" text="Trivo" external />
        <SidebarLink
          href="https://theologynotes.com"
          text="Theology Notes"
          external
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
        />
        <SidebarLink
          href="/byte"
          icon={<MemoryStick className="w-3.5 h-3.5" />}
          text="Byte Counter"
        />
        <SidebarLink
          href="/uuid"
          icon={<Dices className="w-3.5 h-3.5" />}
          text="UUID Generator"
        />
        <SidebarLink
          href="/qr"
          icon={<QrCode className="w-3.5 h-3.5" />}
          text="QR Code Generator"
        />
        <SidebarLink
          href="/text-to-safe-html"
          icon={<Code className="w-3.5 h-3.5" />}
          text="Text to Safe HTML"
        />
        <SidebarLink
          href="/webp"
          icon={<ImageIcon className="w-3.5 h-3.5" />}
          text="WebP Converter"
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <div className="text-muted-foreground text-xs uppercase font-medium px-2 py-1">
          Socials
        </div>
        <SidebarLink
          href="https://www.instagram.com/thomas.harmond/"
          icon={<Instagram className="w-3.5 h-3.5" />}
          text="Instagram"
          external
        />
        <SidebarLink
          href="https://x.com/teharmond"
          icon={<Twitter className="w-3.5 h-3.5" />}
          text="Twitter"
          external
        />
      </div>
    </>
  );

  return (
    <>
      {/* Hamburger menu for medium screens and below */}
      <div className="md:hidden border-b px-2 py-1.5 ">
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
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon,
  text,
  external,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      className={cn(
        "text-secondary-foreground flex items-center gap-1.5 w-full justify-between hover:bg-muted transition-colors px-2 py-1 rounded-md",
        isActive && "bg-muted font-medium"
      )}
      href={href}
    >
      <span className="flex items-center gap-2.5">
        {icon}
        {text}
      </span>
      {external && <ExternalLink className="w-3.5 h-3.5" />}
    </Link>
  );
};
