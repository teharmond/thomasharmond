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
    <div className=" bg-white border-r border-gray-300 justify-between flex flex-col">
      <div>
        <div className="w-full h-12 font-semibold text-[25px] p-2 bg-white border-b  items-center align-middle border-gray-300 mb-2 overflow-scroll">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full h-full select-none text-[14px] items-center flex gap-2 pl-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://cdn.catholic.com/wp-content/uploads/AdobeStock_572194984-900x900.jpeg" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="flex flex-col items-start ">
                <h1>Paul the Apostle</h1>
                <h1 className="text-gray-500 font-light text-[12px]">
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
        <div className="gap-0 flex flex-col p-2">
          <Button
            size="sm"
            variant="outline"
            className="w-full text-[15px] justify-start"
          >
            <PlusCircle className="w-7 h-7 pr-2" />
            New Messsage
          </Button>
        </div>
        <Separator className="mb-3 mt-1 " />
        <div className="gap-0 flex flex-col p-2">
          <Button size="sm" className="w-full text-[15px] justify-start">
            <Inbox className="w-7 h-7 pr-2" />
            Inbox
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[15px] justify-start"
          >
            <File className="w-7 h-7 pr-2" />
            Drafts
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[15px] justify-start"
          >
            <Send className="w-7 h-7 pr-2" />
            Sent
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[15px] justify-start"
          >
            <ArchiveX className="w-7 h-7 pr-2" />
            Junk
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[15px] justify-start"
          >
            <Trash className="w-7 h-7 pr-2" />
            Trash
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[15px] justify-start"
          >
            <Archive className="w-7 h-7 pr-2" />
            Archive
          </Button>
        </div>
        <Separator className="mb-3 mt-1 " />
        <div className="gap-0 flex flex-col p-2">
          <Button
            size="sm"
            variant="ghost"
            className="w-full text-[15px] justify-start"
          >
            <Folder className="w-7 h-7 pr-2" /> Travel Plans
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[15px] justify-start"
          >
            <Folder className="w-7 h-7 pr-2" /> Questions from Peter
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[15px] justify-start"
          >
            <Folder className="w-7 h-7 pr-2" /> Corinthians being wild
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[15px] justify-start"
          >
            <Folder className="w-7 h-7 pr-2" /> Prision Records
          </Button>
        </div>
        <div className="gap-0 flex flex-col p-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-[15px] justify-start"
          >
            <FolderPlus className="w-7 h-7 pr-2" /> New Folder
          </Button>
        </div>
      </div>
      <div>
        <Calendar mode="single" className="rounded-md border" />
      </div>
    </div>
  );
}
