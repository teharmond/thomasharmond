"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Editor from "@monaco-editor/react";
import { useTheme } from "next-themes";

const languages = [
  { value: "json", label: "JSON" },
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
  { value: "python", label: "Python" },
  { value: "java", label: "Java" },
  { value: "csharp", label: "C#" },
  { value: "cpp", label: "C++" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
  { value: "ruby", label: "Ruby" },
  { value: "php", label: "PHP" },
];

export default function ByteCounter() {
  const [byteCount, setByteCount] = useState(0);
  const [language, setLanguage] = useState("json");
  const [mounted, setMounted] = useState(false);
  const { theme, systemTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const countBytes = useCallback((text: string | undefined) => {
    if (text === undefined) return;
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    setByteCount(bytes.length);
  }, []);

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
  };

  const getDefaultValue = (lang: string) => {
    switch (lang) {
      case "json":
        return '{\n  "key": "value"\n}';
      default:
        return `// Enter your ${
          languages.find((l) => l.value === lang)?.label
        } code here`;
    }
  };

  const currentTheme = theme === "system" ? systemTheme : theme;

  if (!mounted) return null;

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Code Byte Counter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select
              onValueChange={handleLanguageChange}
              defaultValue={language}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div
            className={`mb-4 border rounded-md overflow-hidden ${
              currentTheme === "dark" ? "bg-gray-800" : "bg-white"
            }`}
          >
            <Editor
              height="300px"
              language={language}
              defaultValue={getDefaultValue(language)}
              onChange={countBytes}
              theme={currentTheme === "dark" ? "vs-dark" : "light"}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                scrollBeyondLastLine: false,
                wordWrap: "on",
                wrappingIndent: "indent",
                automaticLayout: true,
              }}
            />
          </div>
          <p className="text-lg font-semibold">
            Byte count: <span className="text-primary">{byteCount}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
