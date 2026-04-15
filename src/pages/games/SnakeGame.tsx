import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
type Position = { x: number; y: number };

export default function SnakeGame() {
  const gridSize = 20;
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Position>({ x: 15, y: 15 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection('RIGHT');
    setGameStarted(false);
    setGameOver(false);
    setScore(0);
    generateFood();
  };

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake(prevSnake => {
        const head = { ...prevSnake[0] };

        switch (direction) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Check wall collision
        if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Check food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [direction, food, gameStarted, gameOver, generateFood]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!gameStarted) {
        setGameStarted(true);
      }

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'DOWN') setDirection('UP');
          break;
        case 'ArrowDown':
          if (direction !== 'UP') setDirection('DOWN');
          break;
        case 'ArrowLeft':
          if (direction !== 'RIGHT') setDirection('LEFT');
          break;
        case 'ArrowRight':
          if (direction !== 'LEFT') setDirection('RIGHT');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted]);

  return (
    <>
      <SEO 
        title="Snake Game - Play Classic Snake Online | ILoveJPG"
        description="Play the classic Snake game online. Eat food, grow longer, and avoid hitting walls or yourself!"
        keywords="snake game, classic snake, retro game, snake online"
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
                <BreadcrumbPage>Snake Game</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <div className="flex items-center gap-3">
                <Gamepad2 className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Snake Game</CardTitle>
                  <p className="text-sm opacity-90">Classic retro snake game</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-3xl font-bold text-green-600">{score}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Length</p>
                  <p className="text-3xl font-bold text-emerald-600">{snake.length}</p>
                </div>
              </div>

              {gameOver && (
                <div className="p-4 bg-red-100 dark:bg-red-900/20 rounded-lg text-center">
                  <p className="text-2xl font-bold text-red-600 mb-2">Game Over!</p>
                  <p className="text-sm text-muted-foreground">Final Score: {score}</p>
                </div>
              )}

              <div className="bg-gray-900 rounded-lg p-2">
                <div 
                  className="grid gap-0"
                  style={{ 
                    gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
                    aspectRatio: '1/1'
                  }}
                >
                  {Array.from({ length: gridSize * gridSize }).map((_, index) => {
                    const x = index % gridSize;
                    const y = Math.floor(index / gridSize);
                    const isSnake = snake.some(segment => segment.x === x && segment.y === y);
                    const isHead = snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;

                    return (
                      <div
                        key={index}
                        className={`border border-gray-800 ${
                          isHead ? 'bg-green-400' :
                          isSnake ? 'bg-green-500' :
                          isFood ? 'bg-red-500' :
                          'bg-gray-700'
                        }`}
                      />
                    );
                  })}
                </div>
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={() => !gameStarted && setGameStarted(true)} 
                  disabled={gameStarted && !gameOver}
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500"
                >
                  {!gameStarted ? 'Start Game' : 'Playing...'}
                </Button>
                <Button onClick={resetGame} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Reset
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Use arrow keys to control the snake. Eat the red food to grow!
              </p>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Snake Game">
            <p className="text-muted-foreground">
              Navigate the snake using arrow keys. Eat the red food to grow longer and score points.
              Avoid hitting the walls or yourself. The game gets harder as you grow longer!
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
