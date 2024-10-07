"use client";

import { useState, useCallback } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Component() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);

  const countWords = useCallback((text: string) => {
    const trimmedText = text.trim();
    const words = trimmedText === "" ? [] : trimmedText.split(/\s+/);
    return words.length;
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const newCount = countWords(newText);
    setWordCount(newCount);
  };

  const handleClearAll = () => {
    setText("");
    setWordCount(0);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Word Counter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="Type or paste your text here..."
          className="min-h-[200px] text-base"
          value={text}
          onChange={handleTextChange}
        />
        <div className="flex justify-between items-center">
          <p className="text-lg font-semibold">
            Word Count: <span className="text-primary">{wordCount}</span>
          </p>
          <Button
            onClick={handleClearAll}
            variant="outline"
            className="hover:bg-destructive hover:text-destructive-foreground"
          >
            Clear All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
