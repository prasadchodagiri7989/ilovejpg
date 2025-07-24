
import React, { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, RotateCcw, Clock, Save } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [laps, setLaps] = useState<number[]>([]);
  const intervalRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const { toast } = useToast();

  useEffect(() => {
    if (isRunning) {
      startTimeRef.current = Date.now() - elapsedTime;
      intervalRef.current = window.setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10); // Update every 10ms for better precision
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setElapsedTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    if (isRunning) {
      setLaps([...laps, elapsedTime]);
      toast({
        title: "Lap recorded",
        description: formatTime(elapsedTime),
      });
    }
  };

  const formatTime = (time: number) => {
    const ms = Math.floor((time % 1000) / 10);
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / (1000 * 60)) % 60);
    const hours = Math.floor(time / (1000 * 60 * 60));

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms
      .toString()
      .padStart(2, '0')}`;
  };

  return (
     <>
              <Breadcrumb className="mb-4">
                 <BreadcrumbList>
                     <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                           <Link to="/">Home</Link>
                        </BreadcrumbLink>
                     </BreadcrumbItem>
                      <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/a">All Calculators</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink asChild>
                        <Link to="/time/all">Time Calculator</Link>
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                      <BreadcrumbItem>
                       <BreadcrumbPage>Stopwatch</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Timer className="mr-2 text-primary" size={24} />
            <CardTitle>Stopwatch</CardTitle>
          </div>
          <CardDescription>
            Precise timing for any activity
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="flex items-center justify-center text-6xl font-bold tracking-tighter w-full font-mono">
              {formatTime(elapsedTime)}
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleStartStop} 
                className="flex gap-2 items-center"
              >
                {isRunning ? <Pause size={16} /> : <Play size={16} />}
                {isRunning ? "Pause" : "Start"}
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleReset} 
                className="flex gap-2 items-center"
                disabled={elapsedTime === 0}
              >
                <RotateCcw size={16} />
                Reset
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                onClick={handleLap} 
                className="flex gap-2 items-center"
                disabled={!isRunning}
              >
                <Save size={16} />
                Lap
              </Button>
            </div>
            
            {laps.length > 0 && (
              <div className="w-full mt-4">
                <h3 className="text-lg font-medium mb-2">Laps</h3>
                <div className="border rounded-md overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2 flex font-medium">
                    <span className="flex-1">Lap</span>
                    <span className="flex-1">Time</span>
                    <span className="flex-1">Total</span>
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {laps.map((lapTime, index) => (
                      <div 
                        key={index} 
                        className="px-4 py-2 flex border-t"
                      >
                        <span className="flex-1">#{laps.length - index}</span>
                        <span className="flex-1 font-mono">
                          {index > 0 
                            ? formatTime(lapTime - laps[index - 1]) 
                            : formatTime(lapTime)
                          }
                        </span>
                        <span className="flex-1 font-mono">{formatTime(lapTime)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Stopwatch Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Stopwatch Tool</h4>
      <p>The Stopwatch Tool allows you to measure elapsed time with precision.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click the "Start" button to begin timing.</li>
        <li>Click "Lap" to record split times while the stopwatch is running.</li>
        <li>Click "Reset" to clear the timer and lap records.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Accurate time tracking down to milliseconds.</li>
        <li>Lap functionality to record intermediate times.</li>
        <li>Simple and easy-to-use interface.</li>
        <li>Works entirely in your browser with no downloads required.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Ideal for timing workouts, experiments, or any timed activities.</li>
        <li>Useful for competitive sports and speed-based tasks.</li>
        <li>No internet connection required—works offline.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
