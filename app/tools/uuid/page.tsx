"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clipboard, Check } from "lucide-react";

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState("");
  const [copied, setCopied] = useState(false);

  const generateUUID = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
  };

  useEffect(() => {
    // Generate a UUID when the component mounts
    generateUUID();
  }, []);

  return (
    <div className="min-h-screen overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle>UUID Generator</CardTitle>
          <CardDescription>Generate and copy UUIDs with ease</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex h-8 w-full items-center justify-start rounded-l-lg border border-r-0 px-2 text-sm">
                {uuid}
              </div>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="h-8 rounded-l-none"
                disabled={!uuid}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Clipboard className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button onClick={generateUUID} className="h-8 w-full">
              Generate New UUID
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
