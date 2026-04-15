import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, RefreshCw, Copy, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

const pickupLines = [
  "Are you a magician? Because whenever I look at you, everyone else disappears.",
  "Do you have a map? I keep getting lost in your eyes.",
  "Are you a parking ticket? Because you've got 'fine' written all over you.",
  "Is your name Google? Because you have everything I've been searching for.",
  "Do you believe in love at first sight, or should I walk by again?",
  "Are you a camera? Because every time I look at you, I smile.",
  "If you were a vegetable, you'd be a cute-cumber!",
  "Do you have a Band-Aid? Because I just scraped my knee falling for you.",
  "Are you made of copper and tellurium? Because you're Cu-Te!",
  "Is your dad a baker? Because you're a cutie pie!",
  "Do you have a sunburn, or are you always this hot?",
  "Are you a time traveler? Because I see you in my future!",
  "If beauty were time, you'd be an eternity.",
  "Do you have Wi-Fi? Because I'm feeling a connection.",
  "Are you a loan? Because you've got my interest!",
  "Is your name Chapstick? Because you're da balm!",
  "Are you Australian? Because you meet all of my koala-fications!",
  "Do you like Star Wars? Because Yoda one for me!",
  "Are you a banana? Because I find you a-peeling!",
  "If you were a triangle, you'd be acute one!"
];

const categories = {
  cheesy: ['🧀', 'Cheesy'],
  smooth: ['😎', 'Smooth'],
  funny: ['😂', 'Funny'],
  nerdy: ['🤓', 'Nerdy']
};

export default function PickupLineGenerator() {
  const [currentLine, setCurrentLine] = useState('');
  const [rating, setRating] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateLine = () => {
    const randomIndex = Math.floor(Math.random() * pickupLines.length);
    setCurrentLine(pickupLines[randomIndex]);
    setRating(Math.floor(Math.random() * 3) + 6); // 6-8 rating
    setCopied(false);
  };

  const copyLine = () => {
    if (!currentLine) return;
    
    navigator.clipboard.writeText(currentLine);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied!",
      description: "Pickup line copied to clipboard",
    });
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 8) return 'text-green-600 dark:text-green-400';
    if (rating >= 7) return 'text-blue-600 dark:text-blue-400';
    return 'text-yellow-600 dark:text-yellow-400';
  };

  return (
    <>
      <SEO 
        title="Pickup Line Generator - Funny & Smooth Lines | ILoveJPG"
        description="Generate funny, cheesy, and smooth pickup lines. Perfect for breaking the ice!"
        keywords="pickup lines, flirty lines, funny pickup lines, cheesy pickup lines, ice breakers"
      />
      <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Pickup Line Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-rose-500 to-pink-500 text-white">
              <div className="flex items-center gap-3">
                <Sparkles className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Pickup Line Generator</CardTitle>
                  <p className="text-sm opacity-90">Smooth lines for smooth talkers!</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {currentLine ? (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/30 dark:to-pink-900/30 p-8 rounded-xl border-4 border-rose-300 dark:border-rose-700">
                    <div className="text-center space-y-4">
                      <div className="text-5xl mb-4">💘</div>
                      <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed">
                        "{currentLine}"
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="text-center">
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Smoothness Rating</div>
                      <div className={`text-4xl font-bold ${getRatingColor(rating)}`}>
                        {rating}/10
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-2 h-12 rounded ${
                            i < rating
                              ? 'bg-gradient-to-t from-rose-500 to-pink-500'
                              : 'bg-gray-200 dark:bg-gray-700'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={copyLine}
                      variant="outline"
                      className="h-12"
                    >
                      {copied ? (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="mr-2 h-4 w-4" />
                          Copy Line
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={generateLine}
                      variant="outline"
                      className="h-12"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Another One
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center space-y-6 py-12">
                  <div className="text-6xl mb-4">😉</div>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Ready to impress someone?
                  </p>
                  <p className="text-gray-500 dark:text-gray-500">
                    Click below to get a pickup line!
                  </p>
                </div>
              )}

              <Button
                onClick={generateLine}
                className="w-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white h-14 text-lg"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Generate Pickup Line
              </Button>

              <div className="bg-pink-50 dark:bg-pink-900/20 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                <p className="text-sm text-pink-800 dark:text-pink-200 text-center">
                  💝 <strong>Pro Tip:</strong> Confidence and a genuine smile work better than any pickup line!
                </p>
              </div>
            </CardContent>
          </Card>

          <GuidanceSection title="About Pickup Lines">
            <div className="space-y-2">
              <p>• Get funny and cheesy pickup lines instantly</p>
              <p>• Each line comes with a "smoothness rating"</p>
              <p>• Copy your favorite lines to share</p>
              <p>• Perfect for breaking the ice!</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                💡 Remember: Be respectful and read the room!
              </p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
