"use client";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Check, Copy } from "lucide-react";
import React, { useState } from "react";

export default function CopyEmailButton() {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText("hey@thomasharmond.com");
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
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
    <Button
      variant="outline"
      className="relative h-9 w-30 cursor-pointer overflow-hidden rounded-full px-4"
      onClick={handleCopy}
    >
      <span
        className={`inline-flex items-center gap-1.5 transition-all duration-300 ease-out ${
          copied ? "scale-75 opacity-0 blur-sm" : "blur-0 scale-100 opacity-100"
        }`}
      >
        Copy Email
      </span>
      <span
        className={`absolute inset-0 inline-flex items-center justify-center gap-1.5 transition-all duration-300 ease-out ${
          copied ? "blur-0 scale-100 opacity-100" : "scale-75 opacity-0 blur-sm"
        }`}
      >
        Copied
      </span>
    </Button>
  );
}
