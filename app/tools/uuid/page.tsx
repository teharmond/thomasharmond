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
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>UUID Generator</CardTitle>
          <CardDescription>Generate and copy UUIDs with ease</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex">
              <div className="flex justify-start items-center border rounded-l-lg px-2 w-full h-8 text-sm border-r-0">
                {uuid}
              </div>
              <Button
                onClick={copyToClipboard}
                variant="outline"
                className="rounded-l-none h-8"
                disabled={!uuid}
              >
                {copied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Clipboard className="h-4 w-4" />
                )}
              </Button>
            </div>
            <Button onClick={generateUUID} className="w-full h-8">
              Generate New UUID
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
