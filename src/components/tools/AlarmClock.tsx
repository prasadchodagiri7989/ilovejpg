
import React, { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Clock, Volume2, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const AlarmClock = () => {
  const [alarmTime, setAlarmTime] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isAlarmSet, setIsAlarmSet] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
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
    };
  }, []);
  
  useEffect(() => {
    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  useEffect(() => {
    // Check if alarm should ring
    if (isAlarmSet && !isRinging) {
      const now = currentTime;
      const alarm = new Date();
      
      const [hours, minutes] = alarmTime.split(":").map(Number);
      
      alarm.setHours(hours);
      alarm.setMinutes(minutes);
      alarm.setSeconds(0);
      
      // If alarm time is in the past, set it for tomorrow
      if (now > alarm) {
        alarm.setDate(alarm.getDate() + 1);
      }
      
      const timeUntilAlarm = alarm.getTime() - now.getTime();
      
      // If timeUntilAlarm is less than 1 second, trigger the alarm
      if (timeUntilAlarm < 1000) {
        setIsRinging(true);
        if (audioRef.current && !isMuted) {
          audioRef.current.play();
        }
        
        toast({
          title: "Alarm!",
          description: `It's ${alarmTime}`,
          duration: 10000,
        });
      }
    }
  }, [currentTime, alarmTime, isAlarmSet, isRinging, isMuted, toast]);
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };
  
  const handleSetAlarm = () => {
    if (!alarmTime) {
      toast({
        title: "Set a time first",
        description: "Please select a time for your alarm.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAlarmSet(true);
    toast({
      title: "Alarm set",
      description: `Alarm set for ${alarmTime}`,
    });
  };
  
  const handleCancelAlarm = () => {
    setIsAlarmSet(false);
    setIsRinging(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    
    toast({
      title: "Alarm canceled",
      description: "Your alarm has been canceled.",
    });
  };
  
  const handleStopRinging = () => {
    setIsRinging(false);
    setIsAlarmSet(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    if (audioRef.current) {
      if (!isMuted) {
        audioRef.current.pause();
      } else if (isRinging) {
        audioRef.current.play();
      }
    }
  };
  
  // Get current time in HH:MM format to set as default value
  const getCurrentTimeForInput = () => {
    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
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
                  <BreadcrumbPage>Alarm Clock</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Bell className="mr-2 text-primary" size={24} />
            <CardTitle>Alarm Clock</CardTitle>
          </div>
          <CardDescription>
            Set alarms with sound notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            <div className="flex items-center justify-center text-5xl font-bold tracking-tighter">
              {formatTime(currentTime)}
            </div>
            
            <div className="grid w-full max-w-sm items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <label htmlFor="alarm-time" className="text-sm font-medium">Set Alarm Time</label>
                <Input
                  id="alarm-time"
                  type="time"
                  value={alarmTime || getCurrentTimeForInput()}
                  onChange={(e) => setAlarmTime(e.target.value)}
                  disabled={isAlarmSet}
                  className="text-center text-lg"
                />
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 justify-center">
              {!isAlarmSet ? (
                <Button 
                  onClick={handleSetAlarm} 
                  className="flex items-center gap-2"
                  disabled={!alarmTime}
                >
                  <Bell size={16} />
                  Set Alarm
                </Button>
              ) : (
                <Button 
                  onClick={handleCancelAlarm} 
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  <Bell size={16} />
                  Cancel Alarm
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={toggleMute}
                className="flex items-center gap-2"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {isMuted ? "Unmute" : "Mute"}
              </Button>
              
              {isRinging && (
                <Button 
                  onClick={handleStopRinging} 
                  variant="destructive"
                  className="flex items-center gap-2"
                >
                  Stop Alarm
                </Button>
              )}
            </div>
            
            {isAlarmSet && !isRinging && (
              <div className="bg-primary/10 px-4 py-2 rounded-md">
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>Alarm set for {alarmTime}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Alarm Clock">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">What is an Alarm Clock?</h4>
            <p>An alarm clock lets you set a time for a notification sound to remind you of important events.</p>
          </div>

          <div>
            <h4 className="font-medium mb-1">How to Use:</h4>
            <ol className="list-decimal pl-5">
              <li>Enter the time you want the alarm to ring.</li>
              <li>Click "Set Alarm" to activate it.</li>
              <li>If the alarm is ringing, you can mute or stop it.</li>
              <li>Keep the page open for the alarm to work.</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium">Features</h4>
            <ul className="list-disc pl-5">
              <li><strong>Time Display</strong>: Shows the current time.</li>
              <li><strong>Set Alarm</strong>: Allows users to set an alarm time.</li>
              <li><strong>Sound Notification</strong>: Plays an alert sound when the set time is reached.</li>
              <li><strong>Mute Option</strong>: Users can mute or unmute the alarm.</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </div>
    </>
  );
};
