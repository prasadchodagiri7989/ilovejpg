import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Users, Shuffle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function RandomNamePicker() {
  const [names, setNames] = useState('');
  const [winner, setWinner] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const { toast } = useToast();

  const pickRandom = () => {
    const nameList = names.split('\n').filter(n => n.trim().length > 0);
    
    if (nameList.length === 0) {
      toast({
        title: "Error",
        description: "Please enter at least one name",
        variant: "destructive",
      });
      return;
    }

    setIsSpinning(true);
    
    let count = 0;
    const interval = setInterval(() => {
      setWinner(nameList[Math.floor(Math.random() * nameList.length)]);
      count++;
      
      if (count > 20) {
        clearInterval(interval);
        setIsSpinning(false);
        const finalWinner = nameList[Math.floor(Math.random() * nameList.length)];
        setWinner(finalWinner);
        toast({
          title: "Winner Selected!",
          description: finalWinner,
        });
      }
    }, 100);
  };

  return (
    <>
      <SEO 
        title="Random Name Picker - Pick Random Winner | ILoveJPG"
        description="Randomly pick a name from a list. Perfect for raffles, giveaways, and selecting winners."
        keywords="random name picker, name picker, random selector, winner picker"
      />
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Random Name Picker</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Random Name Picker</CardTitle>
                  <p className="text-sm opacity-90">Pick a random name from your list</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Enter Names (one per line)</label>
                <Textarea
                  value={names}
                  onChange={(e) => setNames(e.target.value)}
                  placeholder="John&#10;Jane&#10;Bob&#10;Alice"
                  rows={8}
                  disabled={isSpinning}
                />
                <p className="text-xs text-muted-foreground">
                  {names.split('\n').filter(n => n.trim().length > 0).length} names entered
                </p>
              </div>

              {winner && (
                <div className={`p-8 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg text-center ${isSpinning ? 'animate-pulse' : ''}`}>
                  <p className="text-sm text-muted-foreground mb-2">
                    {isSpinning ? 'Picking...' : 'Winner'}
                  </p>
                  <p className="text-4xl font-bold text-orange-600">{winner}</p>
                </div>
              )}

              <Button 
                onClick={pickRandom} 
                disabled={isSpinning}
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-500"
              >
                <Shuffle className="w-4 h-4 mr-2" />
                {isSpinning ? 'Picking...' : 'Pick Random Name'}
              </Button>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Random Name Picker">
            <p className="text-muted-foreground">
              Randomly select a name from your list. Perfect for raffles, giveaways, classroom activities, or any situation where you need to pick a random winner.
              Enter one name per line and click the button to pick!
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
