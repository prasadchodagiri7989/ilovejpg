import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dices } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function DiceRoller() {
  const [numberOfDice, setNumberOfDice] = useState(2);
  const [results, setResults] = useState<number[]>([]);
  const [total, setTotal] = useState(0);
  const [rolling, setRolling] = useState(false);

  const rollDice = () => {
    setRolling(true);
    const newResults: number[] = [];
    
    for (let i = 0; i < numberOfDice; i++) {
      newResults.push(Math.floor(Math.random() * 6) + 1);
    }
    
    setTimeout(() => {
      setResults(newResults);
      setTotal(newResults.reduce((a, b) => a + b, 0));
      setRolling(false);
    }, 500);
  };

  const getDiceFace = (value: number) => {
    const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return faces[value - 1];
  };

  return (
    <>
      <SEO 
        title="Dice Roller - Roll Virtual Dice Online | ILoveJPG"
        description="Roll virtual dice online. Perfect for board games, RPGs, and decision making. Roll up to 10 dice at once."
        keywords="dice roller, virtual dice, online dice, roll dice, dice game"
      />
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dice Roller</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
              <div className="flex items-center gap-3">
                <Dices className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Dice Roller</CardTitle>
                  <p className="text-sm opacity-90">Roll virtual dice online</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Number of Dice (1-10)</label>
                <Input
                  type="number"
                  min="1"
                  max="10"
                  value={numberOfDice}
                  onChange={(e) => setNumberOfDice(Math.min(10, Math.max(1, parseInt(e.target.value) || 1)))}
                />
              </div>

              {results.length > 0 && (
                <div className="space-y-4">
                  <div className={`flex flex-wrap gap-4 justify-center ${rolling ? 'animate-pulse' : ''}`}>
                    {results.map((result, index) => (
                      <div
                        key={index}
                        className="w-24 h-24 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex items-center justify-center text-6xl border-2 border-gray-200 dark:border-gray-700"
                      >
                        {getDiceFace(result)}
                      </div>
                    ))}
                  </div>

                  <div className="text-center p-6 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Total</p>
                    <p className="text-5xl font-bold text-orange-600">{total}</p>
                  </div>
                </div>
              )}

              <Button 
                onClick={rollDice} 
                disabled={rolling}
                className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-lg py-6"
              >
                <Dices className="w-5 h-5 mr-2" />
                {rolling ? 'Rolling...' : 'Roll Dice'}
              </Button>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <button
                    key={num}
                    onClick={() => setNumberOfDice(num)}
                    className="p-3 bg-gray-100 dark:bg-gray-800 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    {num} {num === 1 ? 'die' : 'dice'}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Dice Roller">
            <p className="text-muted-foreground">
              Roll virtual 6-sided dice online. Perfect for board games, tabletop RPGs, probability exercises, or making random decisions.
              Roll up to 10 dice at once and see the total sum instantly.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
