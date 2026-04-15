import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Smile, RefreshCw, Copy, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

const emojiSets = [
  { emojis: ['😀', '😃', '😄', '😁'], answer: '😄' },
  { emojis: ['🐶', '🐱', '🐭', '🐹'], answer: '🐭' },
  { emojis: ['🍎', '🍊', '🍋', '🍌'], answer: '🍋' },
  { emojis: ['⚽', '🏀', '🏈', '⚾'], answer: '🏈' },
  { emojis: ['🚗', '🚕', '🚙', '🚌'], answer: '🚙' },
  { emojis: ['🌞', '🌝', '🌛', '🌜'], answer: '🌛' },
  { emojis: ['❤️', '💛', '💚', '💙'], answer: '💚' },
  { emojis: ['🍕', '🍔', '🍟', '🌭'], answer: '🍟' },
  { emojis: ['🎵', '🎶', '🎤', '🎧'], answer: '🎤' },
  { emojis: ['⭐', '🌟', '✨', '💫'], answer: '✨' }
];

export default function EmojiGuessGame() {
  const [currentSet, setCurrentSet] = useState(emojiSets[0]);
  const [shownEmoji, setShownEmoji] = useState(currentSet.answer);
  const [gameState, setGameState] = useState<'memorize' | 'guess'>('memorize');
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(3);
  const { toast } = useToast();

  const startNewRound = () => {
    const randomSet = emojiSets[Math.floor(Math.random() * emojiSets.length)];
    setCurrentSet(randomSet);
    setShownEmoji(randomSet.answer);
    setGameState('memorize');
    setTimeLeft(3);
    
    const countdown = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(countdown);
          setGameState('guess');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGuess = (emoji: string) => {
    setAttempts(prev => prev + 1);
    
    if (emoji === currentSet.answer) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct! 🎉",
        description: "Great memory!",
      });
    } else {
      toast({
        title: "Wrong! 😢",
        description: "Try again next round!",
        variant: "destructive"
      });
    }
    
    setTimeout(() => startNewRound(), 1500);
  };

  const reset = () => {
    setScore(0);
    setAttempts(0);
    startNewRound();
  };

  return (
    <>
      <SEO 
        title="Emoji Guess Game - Memory Challenge | ILoveJPG"
        description="Test your memory with emoji patterns. Memorize the emoji and find it among others!"
        keywords="emoji game, memory game, emoji guess, brain game, memory test"
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Emoji Guess Game</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-pink-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smile className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Emoji Guess Game</CardTitle>
                    <p className="text-sm opacity-90">Test your memory!</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{score}/{attempts}</div>
                  <div className="text-xs opacity-90">Score</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {gameState === 'memorize' && (
                <div className="text-center space-y-6">
                  <div className="text-xl font-semibold">Memorize this emoji:</div>
                  <div className="text-9xl animate-pulse">{shownEmoji}</div>
                  <div className="text-5xl font-bold text-yellow-600 dark:text-yellow-400">
                    {timeLeft}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    Get ready to find it!
                  </div>
                </div>
              )}

              {gameState === 'guess' && (
                <div className="space-y-6">
                  <div className="text-xl font-semibold text-center">
                    Which emoji did you see?
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    {currentSet.emojis.map((emoji, index) => (
                      <button
                        key={index}
                        onClick={() => handleGuess(emoji)}
                        className="h-32 text-8xl bg-white dark:bg-gray-800 rounded-xl border-4 border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:scale-105 transition-all duration-200 hover:shadow-xl"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {attempts === 0 && gameState === 'memorize' && (
                <div className="text-center text-gray-600 dark:text-gray-400">
                  <p>👀 Watch carefully!</p>
                  <p className="text-sm mt-2">You'll need to find this emoji in a few seconds</p>
                </div>
              )}

              {attempts > 0 && (
                <div className="flex justify-between items-center p-4 bg-gradient-to-r from-yellow-50 to-pink-50 dark:from-yellow-900/20 dark:to-pink-900/20 rounded-lg">
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {Math.round((score / attempts) * 100)}%
                    </div>
                  </div>
                  <Button
                    onClick={reset}
                    variant="outline"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset
                  </Button>
                </div>
              )}

              {attempts === 0 && (
                <Button
                  onClick={startNewRound}
                  className="w-full bg-gradient-to-r from-yellow-500 to-pink-500 hover:from-yellow-600 hover:to-pink-600 text-white h-12"
                >
                  Start Game
                </Button>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="How to Play">
            <div className="space-y-2">
              <p>• An emoji will be shown for 3 seconds</p>
              <p>• Memorize it carefully!</p>
              <p>• Find the same emoji among 4 options</p>
              <p>• Try to get the highest score!</p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
