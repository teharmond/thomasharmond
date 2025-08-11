import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Archive,
  ArchiveX,
  File,
  Folder,
  FolderPlus,
  Inbox,
  PlusCircle,
  Send,
  Trash,
} from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Sidebar() {
  return (
    <div className="flex flex-col justify-between border-r border-gray-300 bg-white">
      <div>
        <div className="mb-2 h-12 w-full items-center overflow-scroll border-b border-gray-300 bg-white p-2 align-middle text-[25px] font-semibold">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex h-full w-full items-center gap-2 pl-1 text-[14px] select-none">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://cdn.catholic.com/wp-content/uploads/AdobeStock_572194984-900x900.jpeg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start">
                <h1>Paul the Apostle</h1>
                <h1 className="text-[12px] font-light text-gray-500">
                  paul@apostle.com
                </h1>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[270px] text-sm">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Add Account</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="flex flex-col gap-0 p-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full justify-start text-[15px]"
          >
            <PlusCircle className="h-7 w-7 pr-2" />
            New Messsage
          </Button>
        </div>
        <Separator className="mt-1 mb-3" />
        <div className="flex flex-col gap-0 p-2">
          <Button size="sm" className="w-full justify-start text-[15px]">
            <Inbox className="h-7 w-7 pr-2" />
            Inbox
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[15px]"
          >
            <File className="h-7 w-7 pr-2" />
            Drafts
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[15px]"
          >
            <Send className="h-7 w-7 pr-2" />
            Sent
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[15px]"
          >
            <ArchiveX className="h-7 w-7 pr-2" />
            Junk
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[15px]"
          >
            <Trash className="h-7 w-7 pr-2" />
            Trash
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[15px]"
          >
            <Archive className="h-7 w-7 pr-2" />
            Archive
          </Button>
        </div>
        <Separator className="mt-1 mb-3" />
        <div className="flex flex-col gap-0 p-2">
          <Button
            size="sm"
            variant="ghost"
            className="w-full justify-start text-[15px]"
          >
            <Folder className="h-7 w-7 pr-2" /> Travel Plans
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[15px]"
          >
            <Folder className="h-7 w-7 pr-2" /> Questions from Peter
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[15px]"
          >
            <Folder className="h-7 w-7 pr-2" /> Corinthians being wild
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[15px]"
          >
            <Folder className="h-7 w-7 pr-2" /> Prision Records
          </Button>
        </div>
        <div className="flex flex-col gap-0 p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-[15px]"
          >
            <FolderPlus className="h-7 w-7 pr-2" /> New Folder
          </Button>
        </div>
      </div>
      <div>
        <Calendar mode="single" className="rounded-md border" />
      </div>
    </div>
  );
}
