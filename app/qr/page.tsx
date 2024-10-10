"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";

export default function QRCodeGenerator() {
  const [inputText, setInputText] = useState("");
  const [qrCodeText, setQRCodeText] = useState("");
  const [isTransparent, setIsTransparent] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [qrCodeColor, setQrCodeColor] = useState("#000000");
  const { toast } = useToast();

  const generateQRCode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQRCodeText(inputText);
  };

  const downloadQRCode = () => {
    const svg = document.getElementById("qr-code");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      const canvas = document.createElement("canvas");
      canvas.width = 1000;
      canvas.height = 1000;
      const ctx = canvas.getContext("2d");
      const img = new Image();
      img.onload = () => {
        if (ctx) {
          if (!isTransparent) {
            ctx.fillStyle = backgroundColor;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }
          const padding = 40;
          ctx.drawImage(
            img,
            padding,
            padding,
            canvas.width - 2 * padding,
            canvas.height - 2 * padding
          );
          const pngFile = canvas.toDataURL("image/png");
          const downloadLink = document.createElement("a");
          downloadLink.download = "qrcode.png";
          downloadLink.href = pngFile;
          downloadLink.click();
        }
      };
      img.src = "data:image/svg+xml;base64," + btoa(svgData);
    }
  };

  const copyToClipboard = () => {
    const svg = document.getElementById("qr-code");
    if (svg) {
      const svgData = new XMLSerializer().serializeToString(svg);
      navigator.clipboard
        .writeText(svgData)
        .then(() => {
          toast({
            title: "Copied to clipboard",
            description: "The QR code SVG has been copied to your clipboard.",
          });
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
          toast({
            title: "Failed to copy",
            description:
              "There was an error copying the QR code to your clipboard.",
            variant: "destructive",
          });
        });
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            QR Code Generator
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={generateQRCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="input-text">Enter text or URL</Label>
              <Input
                id="input-text"
                type="text"
                placeholder="Enter text or URL"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="transparent-bg"
                checked={isTransparent}
                onCheckedChange={setIsTransparent}
              />
              <Label htmlFor="transparent-bg">Transparent Background</Label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex">
                  <Input
                    id="bg-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 p-1 mr-2"
                  />
                  <Input
                    type="text"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-grow"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="qr-color">QR Code Color</Label>
                <div className="flex">
                  <Input
                    id="qr-color"
                    type="color"
                    value={qrCodeColor}
                    onChange={(e) => setQrCodeColor(e.target.value)}
                    className="w-12 p-1 mr-2"
                  />
                  <Input
                    type="text"
                    value={qrCodeColor}
                    onChange={(e) => setQrCodeColor(e.target.value)}
                    className="flex-grow"
                  />
                </div>
              </div>
            </div>
            <Button type="submit" className="w-full">
              Generate QR Code
            </Button>
          </form>
          {qrCodeText && (
            <div className="mt-6 flex flex-col items-center">
              <div
                className={`w-full max-w-[300px] aspect-square flex items-center justify-center p-4 rounded-lg`}
                style={{
                  backgroundColor: isTransparent
                    ? "transparent"
                    : backgroundColor,
                }}
              >
                <QRCodeSVG
                  id="qr-code"
                  value={qrCodeText}
                  size={268}
                  level={"H"}
                  bgColor={isTransparent ? "transparent" : backgroundColor}
                  fgColor={qrCodeColor}
                />
              </div>
              <div className="mt-4 space-x-2">
                <Button onClick={downloadQRCode}>Download QR Code</Button>
                <Button onClick={copyToClipboard} variant="outline">
                  Copy SVG Path
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
