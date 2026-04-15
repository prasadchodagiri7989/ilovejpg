import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Clock, Play, Pause, RotateCcw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function CountdownTimer() {
  const [targetDate, setTargetDate] = useState('');
  const [targetTime, setTargetTime] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    let interval: number;

    if (isRunning && targetDate && targetTime) {
      interval = setInterval(() => {
        const target = new Date(`${targetDate}T${targetTime}`);
        const now = new Date();
        const diff = target.getTime() - now.getTime();

        if (diff <= 0) {
          setIsRunning(false);
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
          toast({
            title: "Countdown Complete!",
            description: "The target time has been reached",
          });
          return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, targetDate, targetTime]);

  const startCountdown = () => {
    if (!targetDate || !targetTime) {
      toast({
        title: "Error",
        description: "Please select target date and time",
        variant: "destructive",
      });
      return;
    }

    const target = new Date(`${targetDate}T${targetTime}`);
    const now = new Date();

    if (target <= now) {
      toast({
        title: "Error",
        description: "Target time must be in the future",
        variant: "destructive",
      });
      return;
    }

    setIsRunning(true);
    toast({
      title: "Countdown Started!",
      description: "Timer is now running",
    });
  };

  const reset = () => {
    setIsRunning(false);
    setTimeLeft(null);
    setTargetDate('');
    setTargetTime('');
  };

  return (
    <>
      <SEO 
        title="Countdown Timer - Free Online Tool | ILoveJPG"
        description="Create countdown timers for events, deadlines, and special occasions. Real-time countdown with days, hours, minutes, and seconds."
        keywords="countdown timer, event countdown, timer, deadline tracker"
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Countdown Timer</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <div className="flex items-center gap-3">
                <Clock className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Countdown Timer</CardTitle>
                  <p className="text-sm opacity-90">Count down to your important events</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Date</label>
                  <Input
                    type="date"
                    value={targetDate}
                    onChange={(e) => setTargetDate(e.target.value)}
                    disabled={isRunning}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Target Time</label>
                  <Input
                    type="time"
                    value={targetTime}
                    onChange={(e) => setTargetTime(e.target.value)}
                    disabled={isRunning}
                  />
                </div>
              </div>
              
              <div className="flex gap-3">
                {!isRunning ? (
                  <Button onClick={startCountdown} className="flex-1 bg-gradient-to-r from-orange-500 to-red-500">
                    <Play className="w-4 h-4 mr-2" />
                    Start Countdown
                  </Button>
                ) : (
                  <Button onClick={() => setIsRunning(false)} variant="outline" className="flex-1">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                <Button onClick={reset} variant="outline">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>
              
              {timeLeft && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg text-center">
                    <div className="text-4xl font-bold text-orange-600">{timeLeft.days}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Days</div>
                  </div>
                  <div className="p-6 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                    <div className="text-4xl font-bold text-red-600">{timeLeft.hours}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Hours</div>
                  </div>
                  <div className="p-6 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-center">
                    <div className="text-4xl font-bold text-pink-600">{timeLeft.minutes}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Minutes</div>
                  </div>
                  <div className="p-6 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-center">
                    <div className="text-4xl font-bold text-rose-600">{timeLeft.seconds}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-2">Seconds</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Countdown Timer">
            <p className="text-muted-foreground">
              Create customizable countdown timers for events, deadlines, and special occasions.
              Real-time updates show remaining days, hours, minutes, and seconds. Perfect for project deadlines, events, and celebrations.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
