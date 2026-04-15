import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, RefreshCw, Trophy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function ReactionTimeTest() {
  const [gameState, setGameState] = useState<'waiting' | 'ready' | 'click' | 'result'>('waiting');
  const [startTime, setStartTime] = useState(0);
  const [reactionTime, setReactionTime] = useState(0);
  const [attempts, setAttempts] = useState<number[]>([]);
  const [countdown, setCountdown] = useState(3);
  const { toast } = useToast();

  useEffect(() => {
    if (gameState === 'ready') {
      const randomDelay = Math.random() * 3000 + 2000; // 2-5 seconds
      const timer = setTimeout(() => {
        setGameState('click');
        setStartTime(Date.now());
      }, randomDelay);

      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const startTest = () => {
    setGameState('ready');
    setReactionTime(0);
  };

  const handleClick = () => {
    if (gameState === 'click') {
      const time = Date.now() - startTime;
      setReactionTime(time);
      setAttempts(prev => [...prev, time]);
      setGameState('result');
      
      let message = '';
      if (time < 200) message = 'Lightning fast! ⚡';
      else if (time < 300) message = 'Excellent reaction! 🎯';
      else if (time < 400) message = 'Good job! 👍';
      else message = 'Keep practicing! 💪';
      
      toast({
        title: "Result",
        description: message,
      });
    } else if (gameState === 'ready') {
      setGameState('waiting');
      toast({
        title: "Too early!",
        description: "Wait for green!",
        variant: "destructive"
      });
    }
  };

  const getAverage = () => {
    if (attempts.length === 0) return 0;
    return Math.round(attempts.reduce((a, b) => a + b, 0) / attempts.length);
  };

  const getBest = () => {
    if (attempts.length === 0) return 0;
    return Math.min(...attempts);
  };

  const getRating = (time: number) => {
    if (time < 200) return { text: 'Superhuman!', color: 'text-purple-600' };
    if (time < 250) return { text: 'Excellent', color: 'text-green-600' };
    if (time < 300) return { text: 'Good', color: 'text-blue-600' };
    if (time < 400) return { text: 'Average', color: 'text-yellow-600' };
    return { text: 'Needs Practice', color: 'text-orange-600' };
  };

  return (
    <>
      <SEO 
        title="Reaction Time Test - Test Your Speed | ILoveJPG"
        description="Test your reaction time online. Click as fast as you can when the screen turns green!"
        keywords="reaction time test, speed test, reflex test, online game, reaction game"
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Reaction Time Test</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Zap className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Reaction Time Test</CardTitle>
                    <p className="text-sm opacity-90">How fast are your reflexes?</p>
                  </div>
                </div>
                {attempts.length > 0 && (
                  <div className="text-right">
                    <div className="text-2xl font-bold">{getBest()}ms</div>
                    <div className="text-xs opacity-90">Best</div>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <button
                onClick={handleClick}
                disabled={gameState === 'waiting' || gameState === 'result'}
                className={`w-full h-96 rounded-xl border-4 transition-all duration-300 cursor-pointer ${
                  gameState === 'waiting' 
                    ? 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 border-blue-300 dark:border-blue-700'
                    : gameState === 'ready'
                    ? 'bg-gradient-to-br from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 border-red-300 dark:border-red-700'
                    : gameState === 'click'
                    ? 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 border-green-300 dark:border-green-700 animate-pulse'
                    : 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800/30 dark:to-gray-700/30 border-gray-300 dark:border-gray-700'
                }`}
              >
                <div className="text-center">
                  {gameState === 'waiting' && (
                    <div>
                      <div className="text-6xl mb-4">👆</div>
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">Click to Start</div>
                      <div className="text-gray-600 dark:text-gray-400 mt-2">Wait for green...</div>
                    </div>
                  )}
                  {gameState === 'ready' && (
                    <div>
                      <div className="text-6xl mb-4">⏳</div>
                      <div className="text-2xl font-bold text-red-700 dark:text-red-300">Wait...</div>
                      <div className="text-gray-600 dark:text-gray-400 mt-2">Don't click yet!</div>
                    </div>
                  )}
                  {gameState === 'click' && (
                    <div>
                      <div className="text-6xl mb-4">⚡</div>
                      <div className="text-3xl font-bold text-green-700 dark:text-green-300">CLICK NOW!</div>
                    </div>
                  )}
                  {gameState === 'result' && (
                    <div>
                      <div className="text-6xl mb-4">🎯</div>
                      <div className="text-5xl font-bold text-gray-800 dark:text-gray-100 mb-2">
                        {reactionTime}ms
                      </div>
                      <div className={`text-2xl font-semibold ${getRating(reactionTime).color}`}>
                        {getRating(reactionTime).text}
                      </div>
                    </div>
                  )}
                </div>
              </button>

              {gameState === 'result' && (
                <Button
                  onClick={startTest}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white h-14 text-lg"
                >
                  <RefreshCw className="mr-2 h-5 w-5" />
                  Try Again
                </Button>
              )}

              {gameState === 'waiting' && attempts.length === 0 && (
                <Button
                  onClick={startTest}
                  className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white h-14 text-lg"
                >
                  <Zap className="mr-2 h-5 w-5" />
                  Start Test
                </Button>
              )}

              {attempts.length > 0 && (
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{getBest()}ms</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Best</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{getAverage()}ms</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Average</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">{attempts.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Attempts</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="How It Works">
            <div className="space-y-2">
              <p>• Click "Start Test" to begin</p>
              <p>• Wait for the screen to turn green</p>
              <p>• Click as fast as you can!</p>
              <p>• Don't click too early or you'll have to restart</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                💡 Average human reaction time is around 250ms
              </p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
