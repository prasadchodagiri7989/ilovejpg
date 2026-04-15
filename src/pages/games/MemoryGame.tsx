import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Brain, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

interface CardItem {
  id: number;
  value: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export default function MemoryGame() {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const emojis = ['🎮', '🎯', '🎨', '🎭', '🎪', '🎸', '🎹', '🎲'];

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        value: emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setMoves(0);
    setMatchedPairs(0);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      if (cards[first].value === cards[second].value) {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, isMatched: true } : card
          ));
          setMatchedPairs(prev => prev + 1);
          setFlippedCards([]);
        }, 500);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) =>
            idx === first || idx === second ? { ...card, isFlipped: false } : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards, cards]);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2 || cards[index].isFlipped || cards[index].isMatched) return;

    setCards(prev => prev.map((card, idx) =>
      idx === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, index]);
    setMoves(prev => prev + 1);
  };

  const isGameWon = matchedPairs === emojis.length;

  return (
    <>
      <SEO 
        title="Memory Game - Card Matching Game | ILoveJPG"
        description="Play the classic memory card matching game online. Flip cards and find matching pairs."
        keywords="memory game, card game, matching game, brain game"
      />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Memory Game</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <Brain className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Memory Game</CardTitle>
                  <p className="text-sm opacity-90">Find all matching pairs</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="flex justify-between items-center">
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Moves</p>
                  <p className="text-2xl font-bold">{moves}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Pairs Found</p>
                  <p className="text-2xl font-bold">{matchedPairs}/{emojis.length}</p>
                </div>
              </div>

              {isGameWon && (
                <div className="p-4 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-lg text-center">
                  <p className="text-2xl font-bold text-purple-600 mb-2">🎉 You Won!</p>
                  <p className="text-sm text-muted-foreground">Completed in {moves} moves</p>
                </div>
              )}

              <div className="grid grid-cols-4 gap-3">
                {cards.map((card, index) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    className={`aspect-square text-4xl font-bold rounded-lg shadow-lg transition-all ${
                      card.isFlipped || card.isMatched
                        ? 'bg-gradient-to-br from-pink-400 to-purple-400'
                        : 'bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 hover:scale-105'
                    }`}
                    disabled={card.isFlipped || card.isMatched}
                  >
                    {card.isFlipped || card.isMatched ? card.value : '?'}
                  </button>
                ))}
              </div>

              <Button onClick={initializeGame} className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                <RefreshCw className="w-4 h-4 mr-2" />
                New Game
              </Button>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Memory Game">
            <p className="text-muted-foreground">
              Test your memory with this classic card matching game! Flip two cards at a time to find matching pairs.
              Try to complete the game in as few moves as possible. Great for improving memory and concentration.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
