"use client";

import { useState, useCallback, useMemo } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const getHighlightColor = (wordCount: number) => {
  if (wordCount <= 3) return "bg-yellow-600";
  if (wordCount <= 8) return "bg-purple-600";
  if (wordCount <= 14) return "bg-green-600";
  return "bg-red-600";
};

export default function Component() {
  const [text, setText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [wpm, setWpm] = useState(150);

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
              className={`${color} mr-1 rounded px-0.5`}
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
    <div className="min-h-screen overflow-y-auto px-4 py-8 sm:px-6 lg:px-8">
      <Card className="mx-auto w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Writing Tools
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Textarea
            placeholder="Type or paste your text here..."
            className="min-h-[200px] text-base"
            value={text}
            onChange={handleTextChange}
            spellCheck={true}
            aria-label="Text input for word counting and sentence analysis"
          />
          <div className="flex items-center justify-between">
            <p className="pl-2 font-medium">
              Word Count: <span className="text-primary">{wordCount}</span>
            </p>
          </div>
          <Accordion type="multiple" className="w-full px-2">
            <AccordionItem value="sentence-analysis">
              <AccordionTrigger>Sentence Length Analysis</AccordionTrigger>
              <AccordionContent>
                <div className="bg-card max-h-[300px] overflow-y-auto rounded-md border border-gray-200 p-3">
                  {highlightedText}
                </div>
                <div className="mt-2 flex flex-wrap gap-2 text-sm">
                  <span className="rounded bg-yellow-600 px-2 py-1">
                    1-3 words
                  </span>
                  <span className="rounded bg-purple-600 px-2 py-1">
                    4-8 words
                  </span>
                  <span className="rounded bg-green-600 px-2 py-1">
                    9-14 words
                  </span>
                  <span className="rounded bg-red-600 px-2 py-1">
                    15+ words
                  </span>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="reading-time">
              <AccordionTrigger>Reading Time</AccordionTrigger>
              <AccordionContent>
                <div className="rounded-md border border-gray-200 p-4">
                  <div className="flex gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="wpm">Words/Min.</Label>
                      <Input
                        id="wpm"
                        type="number"
                        value={wpm}
                        onChange={handleWpmChange}
                        min="1"
                        className="h-9 max-w-[80px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="estimatedTime">Estimated Time:</Label>
                      <p id="estimatedTime" className="py-1.5 font-medium">
                        {time}
                      </p>
                    </div>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
        <CardFooter className="mt-4 px-8">
          <div className="flex w-full justify-end">
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="hover:bg-destructive hover:text-destructive-foreground h-9"
            >
              Clear All
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
