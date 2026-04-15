import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid2x2, RefreshCw, ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

type Grid = (number | null)[][];

export default function Game2048() {
  const [grid, setGrid] = useState<Grid>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const initializeGrid = () => {
    const newGrid: Grid = Array(4).fill(null).map(() => Array(4).fill(null));
    addRandomTile(newGrid);
    addRandomTile(newGrid);
    setGrid(newGrid);
    setScore(0);
    setGameOver(false);
  };

  useEffect(() => {
    initializeGrid();
  }, []);

  const addRandomTile = (currentGrid: Grid) => {
    const emptyTiles: [number, number][] = [];
    currentGrid.forEach((row, i) => {
      row.forEach((cell, j) => {
        if (cell === null) emptyTiles.push([i, j]);
      });
    });

    if (emptyTiles.length > 0) {
      const [row, col] = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
      currentGrid[row][col] = Math.random() < 0.9 ? 2 : 4;
    }
  };

  const move = (direction: 'up' | 'down' | 'left' | 'right') => {
    if (gameOver) return;

    let newGrid = JSON.parse(JSON.stringify(grid)) as Grid;
    let moved = false;
    let newScore = score;

    const moveLeft = (row: (number | null)[]) => {
      const filtered = row.filter(cell => cell !== null) as number[];
      const merged: number[] = [];
      
      for (let i = 0; i < filtered.length; i++) {
        if (i < filtered.length - 1 && filtered[i] === filtered[i + 1]) {
          merged.push(filtered[i] * 2);
          newScore += filtered[i] * 2;
          i++;
        } else {
          merged.push(filtered[i]);
        }
      }
      
      while (merged.length < 4) merged.push(null as any);
      return merged as (number | null)[];
    };

    if (direction === 'left') {
      newGrid = newGrid.map(row => moveLeft(row));
    } else if (direction === 'right') {
      newGrid = newGrid.map(row => moveLeft([...row].reverse()).reverse());
    } else if (direction === 'up') {
      for (let col = 0; col < 4; col++) {
        const column = newGrid.map(row => row[col]);
        const moved = moveLeft(column);
        moved.forEach((val, row) => {
          newGrid[row][col] = val;
        });
      }
    } else if (direction === 'down') {
      for (let col = 0; col < 4; col++) {
        const column = newGrid.map(row => row[col]).reverse();
        const movedColumn = moveLeft(column).reverse();
        movedColumn.forEach((val, row) => {
          newGrid[row][col] = val;
        });
      }
    }

    moved = JSON.stringify(grid) !== JSON.stringify(newGrid);

    if (moved) {
      addRandomTile(newGrid);
      setGrid(newGrid);
      setScore(newScore);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp') move('up');
      else if (e.key === 'ArrowDown') move('down');
      else if (e.key === 'ArrowLeft') move('left');
      else if (e.key === 'ArrowRight') move('right');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [grid, gameOver]);

  const getTileColor = (value: number | null) => {
    if (!value) return 'bg-gray-200 dark:bg-gray-700';
    const colors: Record<number, string> = {
      2: 'bg-amber-100',
      4: 'bg-amber-200',
      8: 'bg-orange-300',
      16: 'bg-orange-400',
      32: 'bg-red-400',
      64: 'bg-red-500',
      128: 'bg-yellow-400',
      256: 'bg-yellow-500',
      512: 'bg-yellow-600',
      1024: 'bg-amber-600',
      2048: 'bg-amber-700',
    };
    return colors[value] || 'bg-purple-600';
  };

  return (
    <>
      <SEO 
        title="2048 Game - Play Online | ILoveJPG"
        description="Play the addictive 2048 puzzle game online. Combine tiles to reach 2048!"
        keywords="2048 game, puzzle game, number game, 2048 online"
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>2048 Game</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <div className="flex items-center gap-3">
                <Grid2x2 className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">2048 Game</CardTitle>
                  <p className="text-sm opacity-90">Combine tiles to reach 2048</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Score</p>
                  <p className="text-3xl font-bold text-orange-600">{score}</p>
                </div>
                <Button onClick={initializeGrid} variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Game
                </Button>
              </div>

              <div className="bg-amber-100 dark:bg-amber-900/20 rounded-lg p-4">
                <div className="grid grid-cols-4 gap-3">
                  {grid.map((row, i) =>
                    row.map((cell, j) => (
                      <div
                        key={`${i}-${j}`}
                        className={`aspect-square rounded-lg flex items-center justify-center text-2xl font-bold ${getTileColor(cell)} transition-all`}
                      >
                        {cell || ''}
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div></div>
                <Button onClick={() => move('up')} variant="outline" size="lg">
                  <ArrowUp className="w-6 h-6" />
                </Button>
                <div></div>
                <Button onClick={() => move('left')} variant="outline" size="lg">
                  <ArrowLeft className="w-6 h-6" />
                </Button>
                <Button onClick={() => move('down')} variant="outline" size="lg">
                  <ArrowDown className="w-6 h-6" />
                </Button>
                <Button onClick={() => move('right')} variant="outline" size="lg">
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>

              <p className="text-center text-sm text-muted-foreground">
                Use arrow keys or buttons to move tiles. Combine same numbers to create larger tiles!
              </p>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About 2048 Game">
            <p className="text-muted-foreground">
              Combine tiles with the same number to create larger numbers. Keep combining until you reach 2048!
              Use arrow keys or on-screen buttons to move all tiles in one direction. Plan your moves carefully!
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
