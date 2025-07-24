
import React, { useState, useEffect } from "react";
import { MousePointer, Clock, RotateCcw, Play } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const CPSTest = () => {
  const [count, setCount] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 10 seconds test by default
  const [testDuration, setTestDuration] = useState(10); // Default test duration
  const [cps, setCps] = useState(0);
  const [highScore, setHighScore] = useState<number | null>(null);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  const { toast } = useToast();

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('cpsHighScore');
    if (savedHighScore) {
      setHighScore(parseFloat(savedHighScore));
    }
  }, []);

  // Start the test
  const startTest = () => {
    setCount(0);
    setTimeLeft(testDuration);
    setIsActive(true);
    setCps(0);
    
    // Start countdown
    const id = window.setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(id);
          endTest();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    setIntervalId(id);
    
    toast({
      title: "Test started",
      description: `Click as fast as you can for ${testDuration} seconds!`,
    });
  };

  // End the test
  const endTest = () => {
    setIsActive(false);
    
    // Calculate clicks per second
    const finalCps = count / testDuration;
    setCps(finalCps);
    
    // Check if this is a new high score
    if (highScore === null || finalCps > highScore) {
      setHighScore(finalCps);
      localStorage.setItem('cpsHighScore', finalCps.toString());
      
      toast({
        title: "New high score!",
        description: `${finalCps.toFixed(2)} clicks per second`,
        variant: "default",
      });
    } else {
      toast({
        title: "Test completed",
        description: `You achieved ${finalCps.toFixed(2)} clicks per second`,
      });
    }
  };

  // Handle clicks during the test
  const handleClick = () => {
    if (isActive) {
      setCount(count + 1);
    }
  };

  // Reset the test
  const resetTest = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    
    setCount(0);
    setTimeLeft(testDuration);
    setIsActive(false);
    setCps(0);
    
    toast({
      title: "Test reset",
      description: "The CPS test has been reset",
    });
  };

  // Set test duration
  const setDuration = (seconds: number) => {
    if (!isActive) {
      setTestDuration(seconds);
      setTimeLeft(seconds);
      
      toast({
        title: "Duration set",
        description: `Test duration set to ${seconds} seconds`,
      });
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
                  <BreadcrumbPage>CPS Test</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <MousePointer className="mr-2 text-primary" size={24} />
            <CardTitle>CPS Test</CardTitle>
          </div>
          <CardDescription>
            Measure your clicks per second
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="flex flex-col items-center justify-center space-y-6">
            {!isActive && cps > 0 ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="text-6xl font-bold text-primary">{cps.toFixed(2)}</div>
                <div className="text-xl">Clicks per second</div>
                
                {highScore !== null && (
                  <div className="flex flex-col items-center">
                    <div className="text-sm text-muted-foreground">High Score</div>
                    <div className="text-xl font-semibold">{highScore.toFixed(2)} CPS</div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="bg-muted/30 p-4 rounded-md text-center">
                    <div className="text-sm text-muted-foreground mb-1">
                      <Clock size={16} className="inline-block mr-1" />
                      Time Left
                    </div>
                    <div className="text-3xl font-semibold">
                      {timeLeft}s
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-md text-center">
                    <div className="text-sm text-muted-foreground mb-1">
                      <MousePointer size={16} className="inline-block mr-1" />
                      Clicks
                    </div>
                    <div className="text-3xl font-semibold">
                      {count}
                    </div>
                  </div>
                </div>
                
                {isActive && (
                  <div className="w-full space-y-2">
                    <Progress value={(1 - timeLeft / testDuration) * 100} />
                    <div className="text-sm text-muted-foreground text-center">
                      Current speed: {count > 0 && timeLeft < testDuration ? (count / (testDuration - timeLeft)).toFixed(2) : "0.00"} CPS
                    </div>
                  </div>
                )}
              </>
            )}
            
            {isActive ? (
              <Button 
                size="lg" 
                className="w-48 h-48 rounded-full text-xl"
                onClick={handleClick}
              >
                CLICK ME
              </Button>
            ) : (
              <div className="space-y-4">
                {cps > 0 ? (
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => startTest()} 
                      className="flex items-center gap-2"
                    >
                      <Play size={16} />
                      Try Again
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      onClick={resetTest}
                      className="flex items-center gap-2"
                    >
                      <RotateCcw size={16} />
                      Reset
                    </Button>
                  </div>
                ) : (
                  <Button 
                    onClick={() => startTest()} 
                    className="flex items-center gap-2"
                    size="lg"
                  >
                    <Play size={16} />
                    Start Test
                  </Button>
                )}
                
                <div className="flex justify-center gap-2">
                  <Button 
                    variant={testDuration === 5 ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setDuration(5)}
                    disabled={isActive}
                  >
                    5s
                  </Button>
                  <Button 
                    variant={testDuration === 10 ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setDuration(10)}
                    disabled={isActive}
                  >
                    10s
                  </Button>
                  <Button 
                    variant={testDuration === 30 ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setDuration(30)}
                    disabled={isActive}
                  >
                    30s
                  </Button>
                  <Button 
                    variant={testDuration === 60 ? "default" : "outline"} 
                    size="sm" 
                    onClick={() => setDuration(60)}
                    disabled={isActive}
                  >
                    60s
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the CPS Test">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Measuring Clicks Per Second (CPS)</h4>
      <p>The CPS Test allows you to measure how many clicks you can make per second within a given time frame.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Select a test duration (5s, 10s, 30s, or 60s).</li>
        <li>Click the "Start Test" button to begin.</li>
        <li>Click as fast as you can until the timer runs out.</li>
        <li>Your total clicks and CPS score will be displayed at the end.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Improving Your CPS Score</h4>
      <ul className="list-disc pl-5">
        <li>Use a gaming mouse with a high click response rate.</li>
        <li>Try clicking techniques like jitter clicking or butterfly clicking.</li>
        <li>Practice regularly to improve finger speed and coordination.</li>
      </ul>
    </div>
  </div>
      </GuidanceSection>

    </div>
    </>
  );
};
