import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Circle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function SpinWheel() {
  const [options, setOptions] = useState('');
  const [winner, setWinner] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const { toast } = useToast();

  const spin = () => {
    const optionList = options.split('\n').filter(o => o.trim().length > 0);
    
    if (optionList.length < 2) {
      toast({
        title: "Error",
        description: "Please enter at least 2 options",
        variant: "destructive",
      });
      return;
    }

    setSpinning(true);
    const spins = 5 + Math.random() * 5;
    const newRotation = rotation + spins * 360 + Math.random() * 360;
    setRotation(newRotation);
    
    setTimeout(() => {
      const selected = optionList[Math.floor(Math.random() * optionList.length)];
      setWinner(selected);
      setSpinning(false);
      toast({
        title: "Winner Selected!",
        description: selected,
      });
    }, 3000);
  };

  return (
    <>
      <SEO 
        title="Spin Wheel - Random Picker Wheel | ILoveJPG"
        description="Spin the wheel to pick a random option. Perfect for decision making, games, and giveaways."
        keywords="spin wheel, picker wheel, random wheel, decision wheel, wheel spinner"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Spin Wheel</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center gap-3">
                <Circle className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Spin Wheel</CardTitle>
                  <p className="text-sm opacity-90">Spin to pick a random option</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Enter Options (one per line)</label>
                <Textarea
                  value={options}
                  onChange={(e) => setOptions(e.target.value)}
                  placeholder="Pizza&#10;Burger&#10;Tacos&#10;Sushi"
                  rows={6}
                  disabled={spinning}
                />
                <p className="text-xs text-muted-foreground">
                  {options.split('\n').filter(o => o.trim().length > 0).length} options entered
                </p>
              </div>

              <div className="flex justify-center py-8">
                <div 
                  className="relative w-64 h-64"
                  style={{
                    transform: `rotate(${rotation}deg)`,
                    transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none',
                  }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400 via-pink-400 to-rose-400 shadow-2xl flex items-center justify-center">
                    <div className="text-white text-6xl font-bold">🎯</div>
                  </div>
                  {/* Pointer */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-red-500 z-10" />
                </div>
              </div>

              {winner && !spinning && (
                <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground mb-2">Winner</p>
                  <p className="text-3xl font-bold text-purple-600">{winner}</p>
                </div>
              )}

              <Button 
                onClick={spin} 
                disabled={spinning}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-lg py-6"
              >
                <Circle className="w-5 h-5 mr-2" />
                {spinning ? 'Spinning...' : 'Spin the Wheel'}
              </Button>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Spin Wheel">
            <p className="text-muted-foreground">
              Spin the wheel to randomly select one option from your list. Perfect for making decisions, choosing lunch places, picking winners, or just having fun!
              Enter your options and watch the wheel spin.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
