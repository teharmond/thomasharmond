import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div className="p-8  text-sm flex flex-col gap-10 max-w-xl bg-background ">
      <div className="flex gap-2 items-center">
        <div className="w-10 h-10 bg-white rounded-full"></div>
        <div className="flex flex-col">
          <div className="text-xl font-bold">Thomas Harmond</div>
          <div className="text-sm text-muted-foreground">
            Building apps. Following Jesus.
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="font-mono uppercase font-medium ">Projects</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col ">
            <Link
              className="text-blue-500 font-semibold underline"
              href="https://trivo.app"
            >
              Trivo
            </Link>

            <div className="text-sm ">
              Trivo helps churches and non-profits engage their people and
              manage their ministries so they can focus on what matters most.
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="text-muted-foreground  font-medium  ">
              <span className="underline">Theology Notes</span>{" "}
              <span className="text-xs text-muted-foreground font-normal ">
                (Coming Soon)
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              My library of highlights and lecture notes for people in minsitry.
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="font-mono uppercase font-medium ">Resources</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col ">
            <div className="text-muted-foreground  font-medium  ">
              <span className="underline">Blog</span>{" "}
              <span className="text-xs text-muted-foreground font-normal ">
                (Coming Soon)
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              A collection of my thoughts and ideas.
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="text-muted-foreground  font-medium  ">
              <span className="underline">Bookmarks</span>{" "}
              <span className="text-xs text-muted-foreground font-normal ">
                (Coming Soon)
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              Books, websites, articles, and other things I like.
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="text-muted-foreground  font-medium  ">
              <span className="underline">Apps I Use</span>{" "}
              <span className="text-xs text-muted-foreground font-normal ">
                (Coming Soon)
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              All the apps I use.
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="font-mono uppercase font-medium ">Tools</div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col ">
            <Link
              className="text-blue-500 underline font-semibold"
              href="/writing-tools"
            >
              Writing Tools
            </Link>
            <div className="text-sm ">
              A collection of tools to help with writing.
            </div>
          </div>
          <div className="flex flex-col ">
            <Link
              className="text-blue-500 underline font-semibold"
              href="/byte"
            >
              Byte Counter
            </Link>
            <div className="text-sm ">
              A tool to help with counting bytes for your projects.
            </div>
          </div>
          <div className="flex flex-col ">
            <Link
              className="text-blue-500 underline font-semibold"
              href="/uuid"
            >
              UUID Generator
            </Link>

            <div className="text-sm ">
              A tool to help with generating UUIDs for your projects.
            </div>
          </div>
          <div className="flex flex-col ">
            <Link className="text-blue-500 underline font-semibold" href="/qr">
              QR Code Generator
            </Link>
            <div className="text-sm ">
              A tool to help with generating QR codes for your projects.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
