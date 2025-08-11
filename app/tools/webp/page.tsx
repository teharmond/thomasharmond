"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, CheckCircle2, Upload } from "lucide-react";

export default function PngToWebpConverter() {
  const [webpBlob, setWebpBlob] = useState<Blob | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [fileName, setFileName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const convertToWebp = async (file: File) => {
    setIsConverting(true);
    setError(null);
    setWebpBlob(null);
    setPreviewUrl(null);

    if (!file.type.startsWith("image/png")) {
      setError("Please upload a PNG image.");
      setIsConverting(false);
      return;
    }

    setFileName(file.name.replace(/\.[^/.]+$/, "") + ".webp");

    try {
      const image = new Image();
      image.src = URL.createObjectURL(file);
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = image.width;
      canvas.height = image.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) throw new Error("Could not get canvas context");

      ctx.drawImage(image, 0, 0);
      const webpBlob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, "image/webp", 0.8),
      );

      if (!webpBlob) throw new Error("Conversion failed");

      setWebpBlob(webpBlob);
      setPreviewUrl(URL.createObjectURL(webpBlob));
    } catch (err) {
      setError("An error occurred during conversion. Please try again.");
      console.error(err);
    } finally {
      setIsConverting(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      convertToWebp(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      convertToWebp(file);
    }
  };

  const handleDownload = () => {
    if (webpBlob) {
      const url = URL.createObjectURL(webpBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="min-h-screen overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            PNG to WebP Converter
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div
            className="mb-4 cursor-pointer rounded-lg border-2 border-dashed border-gray-300 p-8 text-center"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mx-auto mb-4 text-gray-500" size={48} />
            <p className="text-gray-500">
              Drag and drop a PNG file here, or click to select
            </p>
            <Input
              ref={fileInputRef}
              type="file"
              accept="image/png"
              onChange={handleFileChange}
              className="hidden"
              aria-label="Upload PNG file"
            />
          </div>
          {isConverting && <p className="text-blue-500">Converting...</p>}
          {error && (
            <div className="mb-4 flex items-center text-red-500" role="alert">
              <AlertCircle className="mr-2" />
              <p>{error}</p>
            </div>
          )}
          {previewUrl && (
            <div className="mt-4">
              <div className="mb-2 flex items-center text-green-500">
                <CheckCircle2 className="mr-2" />
                <p>Conversion successful!</p>
              </div>
              <img
                src={previewUrl}
                alt="Converted WebP"
                className="mb-2 h-auto max-w-full rounded-lg"
              />
            </div>
          )}
        </CardContent>
        {previewUrl && (
          <CardFooter>
            <Button onClick={handleDownload} className="w-full">
              Download {fileName}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
