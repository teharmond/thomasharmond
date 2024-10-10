"use client";

import React from "react";
import { useToast } from "@/hooks/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default function EmailCopy() {
  const { toast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("thomas@harmond.us");
      toast({
        title: "Email copied!",
      });
    } catch (error) {
      console.error("Failed to copy email:", error);
      toast({
        title: "Copy failed",
        description: "Unable to copy the email address. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <div
            className="text-sm text-muted-foreground cursor-pointer hover:text-foreground transition-colors"
            onClick={handleCopy}
          >
            thomas@harmond.us
          </div>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          <p>Click to copy</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
