"use client";
import React, { useState, useRef, useEffect, type RefObject } from "react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

type EventType =
  | "mousedown"
  | "mouseup"
  | "touchstart"
  | "touchend"
  | "focusin"
  | "focusout";

export function useClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null> | RefObject<T | null>[],
  handler: (event: Event) => void,
  eventType: EventType = "mousedown",
): void {
  useEffect(() => {
    function callback(event: Event) {
      const target = event.target as Node;

      // Do nothing if the target is not connected element with document
      if (!target || !target.isConnected) {
        return;
      }

      const isOutside = Array.isArray(ref)
        ? ref
            .filter((r) => Boolean(r.current))
            .every((r) => r.current && !r.current.contains(target))
        : ref.current && !ref.current.contains(target);

      if (isOutside) {
        handler(event);
      }
    }

    window.addEventListener(eventType, callback);

    return () => {
      window.removeEventListener(eventType, callback);
    };
  }, []);
}

type IconProps = {
  fill?: string;
  secondaryfill?: string;
  strokewidth?: number;
  width?: string;
  height?: string;
  title?: string;
};
function ChatBubbleContent({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  width = "1em",
  height = "1em",
  ...props
}: IconProps) {
  secondaryfill = secondaryfill || fill;

  return (
    <svg
      height={height}
      width={width}
      {...props}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fill}>
        <path
          d="M4.25 2C2.73079 2 1.5 3.23079 1.5 4.75V16.25C1.5 16.5383 1.66526 16.8011 1.92511 16.926C2.18496 17.0509 2.49339 17.0158 2.71852 16.8357L6.26309 14H13.75C15.2692 14 16.5 12.7692 16.5 11.25V4.75C16.5 3.23079 15.2692 2 13.75 2H4.25Z"
          fill={secondaryfill}
          fillOpacity="0.4"
        />
        <path
          d="M5 6.25C5 5.83579 5.33579 5.5 5.75 5.5H12.25C12.6642 5.5 13 5.83579 13 6.25C13 6.66421 12.6642 7 12.25 7H5.75C5.33579 7 5 6.66421 5 6.25Z"
          fill={fill}
          fillRule="evenodd"
        />
        <path
          d="M5 9.75C5 9.33579 5.33579 9 5.75 9H10C10.4142 9 10.75 9.33579 10.75 9.75C10.75 10.1642 10.4142 10.5 10 10.5H5.75C5.33579 10.5 5 10.1642 5 9.75Z"
          fill={fill}
          fillRule="evenodd"
        />
      </g>
    </svg>
  );
}

function CircleCheck({
  fill = "currentColor",
  secondaryfill,
  strokewidth = 1,
  width = "1em",
  height = "1em",
  ...props
}: IconProps) {
  secondaryfill = secondaryfill || fill;

  return (
    <svg
      height={height}
      width={width}
      {...props}
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill={fill}>
        <path
          d="M9 16.25C13.0041 16.25 16.25 13.0041 16.25 9C16.25 4.99594 13.0041 1.75 9 1.75C4.99594 1.75 1.75 4.99594 1.75 9C1.75 13.0041 4.99594 16.25 9 16.25Z"
          fill={secondaryfill}
          fillOpacity="0.3"
          stroke="none"
        />
        <path
          d="M9 16.25C13.0041 16.25 16.25 13.0041 16.25 9C16.25 4.99594 13.0041 1.75 9 1.75C4.99594 1.75 1.75 4.99594 1.75 9C1.75 13.0041 4.99594 16.25 9 16.25Z"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
        <path
          d="M5.75 9.25L8 11.75L12.25 6.25"
          fill="none"
          stroke={fill}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokewidth}
        />
      </g>
    </svg>
  );
}

export default function Page() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [feedbackContent, setFeedbackContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const submittingRef = useRef(false);
  const pathname = usePathname();

  const isPC =
    typeof window !== "undefined" &&
    (navigator.platform.toLowerCase().includes("win") ||
      navigator.platform.toLowerCase().includes("linux"));

  function closeFeedback() {
    requestAnimationFrame(() => {
      setIsExpanded(false);

      setTimeout(() => {
        setShowBackground(false);
        setShowSuccess(false);
      }, 150);
    });
  }

  function openFeedback() {
    setIsExpanded(true);
    setShowBackground(true);
    setError(null);
  }

  const isPending = false; // Demo mode - no actual submission

  function handleSendFeedback() {
    if (feedbackContent.trim() && !isPending && !submittingRef.current) {
      // Demo mode - just show success without submitting
      setShowSuccess(true);
      setTimeout(() => {
        setFeedbackContent("");
      }, 200);
      setTimeout(() => {
        closeFeedback();
      }, 1500);
    }
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        (e.metaKey || e.ctrlKey) &&
        isExpanded &&
        feedbackContent.trim()
      ) {
        e.preventDefault();
        handleSendFeedback();
      }
    };

    if (isExpanded) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded, feedbackContent, pathname]);

  useClickOutside(rootRef, closeFeedback);

  return (
    // mock app
    <div className="h-62 w-full rounded-lg border">
      {/* sidebar */}
      <div className="bg-muted relative flex h-full w-[14rem] flex-col justify-end p-2">
        <motion.div
          className={cn(
            "text-muted-foreground hover:bg-background hover:text-foreground relative flex items-end overflow-hidden rounded-xl border px-2 text-sm font-normal transition-[background-color,border-color] duration-500 hover:cursor-pointer",
            showBackground
              ? "border-border bg-background"
              : "border-transparent",
          )}
          onClick={() => !isExpanded && openFeedback()}
          initial={false}
          ref={rootRef}
          animate={{
            height: isExpanded ? 166 : 32,
            width: isExpanded ? "180%" : "100%",
          }}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 35,
            height: { duration: 0.15 },
          }}
        >
          <AnimatePresence mode="wait">
            {!isExpanded ? (
              <motion.div
                key="collapsed"
                className="flex h-8 w-full items-center gap-2 select-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.06 }}
              >
                <ChatBubbleContent />
                Send Feedback
              </motion.div>
            ) : showSuccess ? (
              <motion.div
                key="success"
                className="absolute inset-0 flex flex-col items-center justify-center gap-3"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{
                  duration: 0.2,
                  ease: "easeOut",
                }}
              >
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.05,
                  }}
                >
                  <span className="text-green-500">
                    <CircleCheck width="48" height="48" />
                  </span>
                </motion.div>
                <motion.p
                  className="text-foreground text-sm font-medium"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.15,
                    duration: 0.2,
                    ease: "easeOut",
                  }}
                >
                  Thanks for your feedback!
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="expanded"
                className="absolute inset-0 flex flex-col gap-3 px-3 pt-3 pb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.15 }}
              >
                <textarea
                  ref={textareaRef}
                  value={feedbackContent}
                  onChange={(e) => setFeedbackContent(e.target.value)}
                  className="border-input bg-background text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-none rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                  placeholder="Share your feedback..."
                  rows={4}
                  onClick={(e) => e.stopPropagation()}
                  autoFocus
                />
                {error && (
                  <div className="text-destructive text-xs">{error}</div>
                )}
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="text-muted-foreground text-xs whitespace-nowrap">
                    Need help?{" "}
                    <span className="text-primary hover:underline">
                      Visit the Help Center
                    </span>
                  </span>

                  <Button
                    variant="default"
                    size="sm"
                    className="gap-1 pr-2 text-sm"
                    disabled={isPending || !feedbackContent.trim()}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSendFeedback();
                    }}
                  >
                    Send
                    <span className="bg-secondary text-primary ml-1.5 flex h-5 w-5 items-center justify-center rounded text-sm">
                      {isPC ? "Ctrl" : "⌘"}
                    </span>
                    <span className="bg-secondary text-primary flex h-5 w-5 items-center justify-center rounded pt-0.5 text-xs">
                      ↩
                    </span>
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
