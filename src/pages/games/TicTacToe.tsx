import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Grid3x3, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function TicTacToe() {
  const [board, setBoard] = useState<(string | null)[]>(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState<string | null>(null);
  const { toast } = useToast();

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);

    const gameWinner = calculateWinner(newBoard);
    if (gameWinner) {
      setWinner(gameWinner);
      toast({
        title: "Game Over!",
        description: `${gameWinner} wins!`,
      });
    } else if (newBoard.every(square => square !== null)) {
      setWinner('Draw');
      toast({
        title: "Game Over!",
        description: "It's a draw!",
      });
    }

    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  return (
    <>
      <SEO 
        title="Tic Tac Toe Game - Play Online | ILoveJPG"
        description="Play Tic Tac Toe online for free. Classic X and O game for two players."
        keywords="tic tac toe, tic tac toe game, online game, x and o game"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Tic Tac Toe</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <div className="flex items-center gap-3">
                <Grid3x3 className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Tic Tac Toe</CardTitle>
                  <p className="text-sm opacity-90">Classic X and O game</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <p className="text-2xl font-bold mb-2">
                  {winner ? (winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`) : `Next: ${isXNext ? 'X' : 'O'}`}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                {board.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => handleClick(index)}
                    className={`aspect-square text-6xl font-bold rounded-lg shadow-lg transition-all hover:scale-105 ${
                      cell === 'X' 
                        ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' 
                        : cell === 'O'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-600'
                        : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    disabled={!!cell || !!winner}
                  >
                    {cell}
                  </button>
                ))}
              </div>

              <Button onClick={resetGame} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500">
                <RefreshCw className="w-4 h-4 mr-2" />
                New Game
              </Button>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                  <div className="text-4xl font-bold text-blue-600">X</div>
                  <p className="text-sm text-muted-foreground mt-2">Player 1</p>
                </div>
                <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center">
                  <div className="text-4xl font-bold text-red-600">O</div>
                  <p className="text-sm text-muted-foreground mt-2">Player 2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Tic Tac Toe">
            <p className="text-muted-foreground">
              Classic Tic Tac Toe game for two players. Take turns placing X and O on the 3x3 grid.
              The first player to get three in a row (horizontally, vertically, or diagonally) wins!
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
