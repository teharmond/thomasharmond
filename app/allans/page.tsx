"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Component() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-11-22T10:00:00-06:00"); // November 22, 2024, 10:00 AM Central Time

    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, "0");

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Countdown to the best day ever
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 text-center">
          <div className="flex flex-col">
            <span className="text-4xl font-bold">
              {formatTime(timeLeft.days)}
            </span>
            <span className="text-sm text-muted-foreground">Days</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold">
              {formatTime(timeLeft.hours)}
            </span>
            <span className="text-sm text-muted-foreground">Hours</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold">
              {formatTime(timeLeft.minutes)}
            </span>
            <span className="text-sm text-muted-foreground">Minutes</span>
          </div>
          <div className="flex flex-col">
            <span className="text-4xl font-bold">
              {formatTime(timeLeft.seconds)}
            </span>
            <span className="text-sm text-muted-foreground">Seconds</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
