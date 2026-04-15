import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Keyboard, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function TypingSpeedTest() {
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [input, setInput] = useState('');
  const [timeLeft, setTimeLeft] = useState(60);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);

  const sampleText = "The quick brown fox jumps over the lazy dog. Practice makes perfect. Typing fast requires focus and dedication. Keep your fingers on the home row for best results.";

  useEffect(() => {
    let timer: number;
    if (started && !finished && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setFinished(true);
            calculateResults();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [started, finished, timeLeft]);

  const calculateResults = () => {
    const words = input.trim().split(/\s+/).length;
    const minutes = (60 - timeLeft) / 60;
    const calculatedWpm = Math.round(words / minutes);
    
    let correctChars = 0;
    for (let i = 0; i < Math.min(input.length, sampleText.length); i++) {
      if (input[i] === sampleText[i]) correctChars++;
    }
    const calculatedAccuracy = Math.round((correctChars / sampleText.length) * 100);

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy);
  };

  const startTest = () => {
    setStarted(true);
    setFinished(false);
    setInput('');
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(100);
  };

  const resetTest = () => {
    setStarted(false);
    setFinished(false);
    setInput('');
    setTimeLeft(60);
    setWpm(0);
    setAccuracy(100);
  };

  return (
    <>
      <SEO 
        title="Typing Speed Test - WPM Test | ILoveJPG"
        description="Test your typing speed and accuracy. Measure words per minute (WPM) and improve your typing skills."
        keywords="typing speed test, wpm test, typing test, typing speed, typing practice"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Typing Speed Test</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <div className="flex items-center gap-3">
                <Keyboard className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Typing Speed Test</CardTitle>
                  <p className="text-sm opacity-90">Test your typing speed and accuracy</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <div className="text-6xl font-bold text-green-600 mb-2">{timeLeft}</div>
                <p className="text-muted-foreground">seconds remaining</p>
              </div>

              <div className="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <p className="text-lg leading-relaxed font-mono">{sampleText}</p>
              </div>

              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!started || finished}
                placeholder={started ? "Start typing..." : "Click 'Start Test' to begin"}
                className="min-h-[150px] font-mono"
              />

              {!started && !finished && (
                <Button onClick={startTest} className="w-full bg-gradient-to-r from-green-500 to-emerald-500">
                  <Keyboard className="w-4 h-4 mr-2" />
                  Start Test
                </Button>
              )}

              {finished && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-center text-xl">Test Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">Speed</p>
                      <p className="text-4xl font-bold text-green-600">{wpm}</p>
                      <p className="text-sm text-muted-foreground">WPM</p>
                    </div>
                    <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-center">
                      <p className="text-sm text-muted-foreground mb-2">Accuracy</p>
                      <p className="text-4xl font-bold text-emerald-600">{accuracy}%</p>
                    </div>
                  </div>
                  <Button onClick={resetTest} variant="outline" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Typing Speed Test">
            <p className="text-muted-foreground">
              Test your typing speed in words per minute (WPM) and accuracy. You have 60 seconds to type as much of the sample text as possible.
              Perfect for improving your typing skills and tracking progress over time.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
