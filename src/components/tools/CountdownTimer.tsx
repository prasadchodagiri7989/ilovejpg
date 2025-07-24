
import React, { useState, useEffect, useRef } from "react";
import { Timer, Play, Pause, RotateCcw, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const CountdownTimer = () => {
  const [hours, setHours] = useState("00");
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState("00");
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio("https://assets.mixkit.co/active_storage/sfx/1028/1028.wav");
    audioRef.current.loop = true;
    
    // Cleanup function
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = () => {
    // Calculate total seconds from input
    const totalSeconds = 
      parseInt(hours || "0") * 3600 + 
      parseInt(minutes || "0") * 60 + 
      parseInt(seconds || "0");
    
    if (totalSeconds <= 0) {
      toast({
        title: "Invalid time",
        description: "Please enter a valid time for the countdown",
        variant: "destructive",
      });
      return;
    }
    
    setTimeLeft(totalSeconds);
    setIsRunning(true);
    
    // Start interval
    intervalRef.current = window.setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          
          // Play sound when timer ends
          if (audioRef.current && !isMuted) {
            audioRef.current.play();
          }
          
          toast({
            title: "Time's up!",
            description: "The countdown timer has finished",
            duration: 5000,
          });
          
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    setIsRunning(false);
    setTimeLeft(0);
    setHours("00");
    setMinutes("00");
    setSeconds("00");
    
    // Stop audio if it's playing
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (audioRef.current && audioRef.current.paused === false) {
      if (!isMuted) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // Format display time
  const formatTime = (time: number) => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    
    return {
      hours: h.toString().padStart(2, '0'),
      minutes: m.toString().padStart(2, '0'),
      seconds: s.toString().padStart(2, '0')
    };
  };

  const displayTime = formatTime(timeLeft);

  // Input handlers with validation
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      setHours(value.padStart(2, '0'));
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value) && parseInt(value || "0") < 60) {
      setMinutes(value.padStart(2, '0'));
    }
  };

  const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value) && parseInt(value || "0") < 60) {
      setSeconds(value.padStart(2, '0'));
    }
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
                  <BreadcrumbPage>Countdown Timer</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Timer className="mr-2 text-primary" size={24} />
            <CardTitle>Countdown Timer</CardTitle>
          </div>
          <CardDescription>
            Set a countdown timer with alarms
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          {!isRunning && timeLeft === 0 ? (
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="hours">Hours</Label>
                  <Input
                    id="hours"
                    value={hours}
                    onChange={handleHoursChange}
                    className="text-center text-2xl"
                    maxLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="minutes">Minutes</Label>
                  <Input
                    id="minutes"
                    value={minutes}
                    onChange={handleMinutesChange}
                    className="text-center text-2xl"
                    maxLength={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seconds">Seconds</Label>
                  <Input
                    id="seconds"
                    value={seconds}
                    onChange={handleSecondsChange}
                    className="text-center text-2xl"
                    maxLength={2}
                  />
                </div>
              </div>
              
              <Button 
                onClick={startTimer} 
                className="w-full flex items-center justify-center gap-2"
                size="lg"
              >
                <Play size={16} />
                Start Timer
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="text-6xl font-bold flex justify-center gap-2">
                <span>{displayTime.hours}</span>
                <span>:</span>
                <span>{displayTime.minutes}</span>
                <span>:</span>
                <span>{displayTime.seconds}</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {isRunning ? (
                  <Button
                    onClick={pauseTimer}
                    className="flex items-center gap-2"
                  >
                    <Pause size={16} />
                    Pause
                  </Button>
                ) : (
                  <Button
                    onClick={startTimer}
                    className="flex items-center gap-2"
                  >
                    <Play size={16} />
                    Resume
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={resetTimer}
                  className="flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  Reset
                </Button>
                
                <Button
                  variant="outline"
                  onClick={toggleMute}
                  className="flex items-center gap-2"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {isMuted ? "Unmute" : "Mute"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Countdown Timer">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Setting a Countdown Timer</h4>
      <p>The Countdown Timer allows you to set a timer with hours, minutes, and seconds, and receive an alert when the time is up.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Enter the desired hours, minutes, and seconds for your countdown.</li>
        <li>Click the "Start Timer" button to begin the countdown.</li>
        <li>The timer will count down to zero and trigger an alarm when time is up.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Use Cases for the Countdown Timer</h4>
      <ul className="list-disc pl-5">
        <li>Time management for study sessions or work intervals.</li>
        <li>Cooking or baking to track preparation times.</li>
        <li>Workout and exercise routines.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>

    </>
  );
};
