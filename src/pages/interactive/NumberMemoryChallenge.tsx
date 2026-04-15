import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RefreshCw, Trophy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function NumberMemoryChallenge() {
  const [gameState, setGameState] = useState<'start' | 'show' | 'input' | 'result'>('start');
  const [currentNumber, setCurrentNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [level, setLevel] = useState(1);
  const [highScore, setHighScore] = useState(0);
  const { toast } = useToast();

  const generateNumber = (length: number) => {
    let num = '';
    for (let i = 0; i < length; i++) {
      num += Math.floor(Math.random() * 10);
    }
    return num;
  };

  const startLevel = () => {
    const number = generateNumber(level + 2);
    setCurrentNumber(number);
    setUserInput('');
    setGameState('show');
    
    const showTime = Math.min(level * 1000, 5000);
    setTimeout(() => {
      setGameState('input');
    }, showTime);
  };

  const checkAnswer = () => {
    if (userInput === currentNumber) {
      setLevel(prev => prev + 1);
      if (level > highScore) {
        setHighScore(level);
      }
      toast({
        title: "Correct! 🎉",
        description: `Moving to level ${level + 1}`,
      });
      setTimeout(() => startLevel(), 1500);
    } else {
      setGameState('result');
      toast({
        title: "Wrong! 😢",
        description: `You reached level ${level}`,
        variant: "destructive"
      });
    }
  };

  const reset = () => {
    setLevel(1);
    setGameState('start');
    setUserInput('');
  };

  return (
    <>
      <SEO 
        title="Number Memory Challenge - Brain Training Game | ILoveJPG"
        description="Test your memory with increasingly difficult number sequences. How many digits can you remember?"
        keywords="memory game, number memory, brain training, memory test, cognitive game"
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Number Memory Challenge</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Brain className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Number Memory Challenge</CardTitle>
                    <p className="text-sm opacity-90">Train your brain!</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{level}</div>
                  <div className="text-xs opacity-90">Level</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {gameState === 'start' && (
                <div className="text-center space-y-6">
                  <div className="text-6xl mb-4">🧠</div>
                  <h2 className="text-3xl font-bold">Ready to test your memory?</h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    You'll see a number for a few seconds. Then you need to type it from memory!
                  </p>
                  {highScore > 0 && (
                    <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 rounded-lg">
                      <div className="flex items-center justify-center gap-2">
                        <Trophy className="text-yellow-600" />
                        <span className="text-lg">High Score: Level {highScore}</span>
                      </div>
                    </div>
                  )}
                  <Button
                    onClick={startLevel}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white h-14 text-lg px-8"
                  >
                    Start Challenge
                  </Button>
                </div>
              )}

              {gameState === 'show' && (
                <div className="text-center space-y-6 py-12">
                  <div className="text-lg font-semibold text-gray-600 dark:text-gray-400">
                    Memorize this number:
                  </div>
                  <div className="text-7xl font-bold tracking-widest animate-pulse text-indigo-600 dark:text-indigo-400">
                    {currentNumber}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-500">
                    Level {level} • {currentNumber.length} digits
                  </div>
                </div>
              )}

              {gameState === 'input' && (
                <div className="text-center space-y-6">
                  <div className="text-2xl font-semibold">
                    What was the number?
                  </div>
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value.replace(/\D/g, ''))}
                    placeholder="Type the number..."
                    className="w-full text-5xl text-center p-6 border-4 border-indigo-300 dark:border-indigo-700 rounded-xl focus:outline-none focus:border-indigo-500 dark:bg-gray-800"
                    autoFocus
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && userInput.length === currentNumber.length) {
                        checkAnswer();
                      }
                    }}
                  />
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {userInput.length} / {currentNumber.length} digits
                  </div>
                  <Button
                    onClick={checkAnswer}
                    disabled={userInput.length !== currentNumber.length}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white h-12 px-8"
                  >
                    Submit
                  </Button>
                </div>
              )}

              {gameState === 'result' && (
                <div className="text-center space-y-6">
                  <div className="text-6xl mb-4">
                    {level > highScore ? '🏆' : '💪'}
                  </div>
                  <h2 className="text-3xl font-bold">
                    {level > highScore ? 'New High Score!' : 'Game Over'}
                  </h2>
                  <div className="p-6 bg-gradient-to-r from-indigo-100 to-purple-100 dark:from-indigo-900/30 dark:to-purple-900/30 rounded-xl">
                    <div className="text-lg mb-2">You reached</div>
                    <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400">
                      Level {level}
                    </div>
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Correct number was: <span className="font-mono font-bold">{currentNumber}</span>
                  </div>
                  <Button
                    onClick={reset}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white h-12 px-8"
                  >
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="How to Play">
            <div className="space-y-2">
              <p>• A number will be displayed briefly</p>
              <p>• Memorize it as quickly as you can</p>
              <p>• Type the number from memory</p>
              <p>• Each level adds more digits!</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                💡 The average person can remember 7±2 digits
              </p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
