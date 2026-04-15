import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function SimonSays() {
  const colors = ['red', 'blue', 'green', 'yellow'];
  const [sequence, setSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const { toast } = useToast();

  const playSequence = async (seq: string[]) => {
    setIsPlaying(true);
    for (const color of seq) {
      setActiveColor(color);
      await new Promise(resolve => setTimeout(resolve, 500));
      setActiveColor(null);
      await new Promise(resolve => setTimeout(resolve, 200));
    }
    setIsPlaying(false);
  };

  const nextRound = () => {
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    const newSequence = [...sequence, nextColor];
    setSequence(newSequence);
    setPlayerSequence([]);
    playSequence(newSequence);
  };

  const startGame = () => {
    setGameStarted(true);
    setSequence([]);
    setPlayerSequence([]);
    setScore(0);
    nextRound();
  };

  const handleColorClick = (color: string) => {
    if (isPlaying || !gameStarted) return;

    const newPlayerSequence = [...playerSequence, color];
    setPlayerSequence(newPlayerSequence);

    setActiveColor(color);
    setTimeout(() => setActiveColor(null), 300);

    // Check if correct
    if (color !== sequence[newPlayerSequence.length - 1]) {
      toast({
        title: "Game Over!",
        description: `Your score: ${score}`,
        variant: "destructive",
      });
      setGameStarted(false);
      return;
    }

    // Check if round complete
    if (newPlayerSequence.length === sequence.length) {
      setScore(prev => prev + 1);
      toast({
        title: "Correct!",
        description: "Get ready for the next round...",
      });
      setTimeout(() => nextRound(), 1000);
    }
  };

  const getColorClass = (color: string) => {
    const classes = {
      red: 'bg-red-500 hover:bg-red-600',
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      yellow: 'bg-yellow-500 hover:bg-yellow-600',
    };
    return classes[color as keyof typeof classes];
  };

  return (
    <>
      <SEO 
        title="Simon Says Game - Memory Pattern Game | ILoveJPG"
        description="Play Simon Says online. Remember and repeat the color sequence. Test your memory!"
        keywords="simon says, memory game, pattern game, simon game"
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Simon Says</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
              <div className="flex items-center gap-3">
                <Music className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Simon Says</CardTitle>
                  <p className="text-sm opacity-90">Remember the color pattern</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Level</p>
                <p className="text-4xl font-bold text-purple-600">{score}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto aspect-square">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleColorClick(color)}
                    disabled={isPlaying || !gameStarted}
                    className={`rounded-lg shadow-lg transition-all ${getColorClass(color)} ${
                      activeColor === color ? 'scale-95 brightness-150' : ''
                    } ${isPlaying || !gameStarted ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                  />
                ))}
              </div>

              {!gameStarted ? (
                <Button onClick={startGame} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-lg py-6">
                  <Music className="w-5 h-5 mr-2" />
                  Start Game
                </Button>
              ) : (
                <Button onClick={startGame} variant="outline" className="w-full">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Restart Game
                </Button>
              )}

              <div className="text-center text-sm text-muted-foreground">
                {isPlaying ? '👀 Watch carefully...' : gameStarted ? '✋ Your turn! Click the colors in order' : 'Click Start to begin'}
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded text-center">
                  <div className="w-8 h-8 bg-red-500 rounded mx-auto mb-1"></div>
                  <p className="text-xs">Red</p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded text-center">
                  <div className="w-8 h-8 bg-blue-500 rounded mx-auto mb-1"></div>
                  <p className="text-xs">Blue</p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded text-center">
                  <div className="w-8 h-8 bg-green-500 rounded mx-auto mb-1"></div>
                  <p className="text-xs">Green</p>
                </div>
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded text-center">
                  <div className="w-8 h-8 bg-yellow-500 rounded mx-auto mb-1"></div>
                  <p className="text-xs">Yellow</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Simon Says">
            <p className="text-muted-foreground">
              Watch the sequence of colors light up, then repeat it by clicking the colors in the same order.
              Each round adds one more color to the sequence. How far can you go? Test your memory skills!
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
