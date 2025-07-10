"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check, Copy } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// Custom hook for debounce
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Custom hook for clipboard functionality
const useClipboard = (duration = 2000) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = useCallback(
    (text: string) => {
      if (typeof navigator !== "undefined") {
        navigator.clipboard.writeText(text).then(() => {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, duration);
        });
      }
    },
    [duration]
  );

  return { isCopied, copyToClipboard };
};

export default function HTMLSafeConverter() {
  const [inputText, setInputText] = useState("");
  const [safeHtml, setSafeHtml] = useState("");
  const debouncedInputText = useDebounce(inputText, 300);
  const { isCopied, copyToClipboard } = useClipboard();

  const htmlEntities: { [key: string]: string } = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;",
  };

  const convertToSafeHtml = useCallback(
    (text: string) => {
      return text.replace(/[&<>"'`=\/]/g, (char) => {
        return htmlEntities[char] || `&#${char.charCodeAt(0)};`;
      });
    },
    [htmlEntities]
  );

  useEffect(() => {
    setSafeHtml(convertToSafeHtml(debouncedInputText));
  }, [debouncedInputText, convertToSafeHtml]);

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto ">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>HTML-Safe Text Converter</CardTitle>
          <CardDescription>
            Special characters are automatically converted to HTML-safe entities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="input-text" className="text-sm font-medium">
                Enter your text:
              </label>
              <Textarea
                id="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your text here"
                aria-describedby="input-description"
              />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="safe-html-output"
                  className="text-sm font-medium"
                >
                  HTML-Safe Output:
                </label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => copyToClipboard(safeHtml)}
                  disabled={isCopied}
                  className="h-7 text-xs"
                  aria-label={
                    isCopied ? "Copied to clipboard" : "Copy to clipboard"
                  }
                >
                  {isCopied ? (
                    <Check className="h-3.5 w-3.5 mr-2" />
                  ) : (
                    <Copy className="h-3.5 w-3.5 mr-2" />
                  )}
                  {isCopied ? "Copied!" : "Copy"}
                </Button>
              </div>
              <div
                id="safe-html-output"
                className="p-2 bg-secondary text-secondary-foreground rounded-md min-h-[100px] break-all"
                aria-live="polite"
              >
                {safeHtml}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
