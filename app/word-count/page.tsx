"use client";

import { useState, useCallback, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";

const getHighlightColor = (wordCount: number) => {
  if (wordCount <= 3) return "bg-yellow-200";
  if (wordCount <= 8) return "bg-purple-200";
  if (wordCount <= 14) return "bg-green-200";
  return "bg-red-200";
};

export default function Component() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(150);
  const [isOpen, setIsOpen] = useState(false);

  const countWords = useCallback((text: string) => {
    const words = text.match(/\b[\w]+\b/g);
    return words ? words.length : 0;
  }, []);

  const calculateTime = useCallback((words: number, wpm: number) => {
    const totalSeconds = (words / wpm) * 60;
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.round(totalSeconds % 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, []);

  const highlightedText = useMemo(() => {
    const lines = text.split("\n");
    return lines.map((line, lineIndex) => {
      if (line.trim() === "") {
        return <br key={lineIndex} />;
      }
      const sentences = line.match(/[^.!?]+[.!?]+/g) || [line];
      const highlightedSentences = sentences
        .map((sentence, sentenceIndex) => {
          const trimmedSentence = sentence.trim();
          if (trimmedSentence === "") return null;
          const words = countWords(trimmedSentence);
          const color = getHighlightColor(words);
          return (
            <span
              key={`${lineIndex}-${sentenceIndex}`}
              className={`${color} px-1 rounded`}
            >
              {trimmedSentence}
            </span>
          );
        })
        .filter(Boolean);
      return (
        <p key={lineIndex} className="mb-2">
          {highlightedSentences}
        </p>
      );
    });
  }, [text, countWords]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const newCount = countWords(newText);
    setWordCount(newCount);
  };

  const handleWpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newWpm = parseInt(e.target.value) || 0;
    setWpm(newWpm);
  };

  const handleClearAll = () => {
    setText("");
    setWordCount(0);
  };

  const time = calculateTime(wordCount, wpm);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Card className="w-full max-w-3xl mx-auto">
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
            spellCheck={true}
            aria-label="Text input for word counting and sentence analysis"
          />
          <Collapsible open={isOpen} onOpenChange={setIsOpen}>
            <CollapsibleTrigger asChild>
              <div className="flex items-center font-semibold justify-between w-full hover:bg-muted transition-all p-2 rounded-md hover:cursor-pointer">
                Sentence Length Analysis
                {isOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="mt-0.5 bg-white p-4 rounded-md border border-gray-200 max-h-[300px] overflow-y-auto">
                {highlightedText}
              </div>
              <div className="flex flex-wrap gap-2 text-sm mt-2">
                <span className="bg-yellow-200 px-2 py-1 rounded">
                  1-3 words
                </span>
                <span className="bg-purple-200 px-2 py-1 rounded">
                  4-8 words
                </span>
                <span className="bg-green-200 px-2 py-1 rounded">
                  9-14 words
                </span>
                <span className="bg-red-200 px-2 py-1 rounded">15+ words</span>
              </div>
            </CollapsibleContent>
          </Collapsible>
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
          <div className="flex gap-4">
            <div className="space-y-2">
              <Label htmlFor="wpm">Words/Min.</Label>
              <Input
                id="wpm"
                type="number"
                value={wpm}
                onChange={handleWpmChange}
                min="1"
                className="max-w-[80px] h-9"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="wpm">Estimated Time:</Label>
              <p className="py-1.5 font-medium">{time}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
