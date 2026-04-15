import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Heart, RefreshCw, Copy, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function LoveCalculator() {
  const [name1, setName1] = useState('');
  const [name2, setName2] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const calculateLove = () => {
    if (!name1.trim() || !name2.trim()) {
      toast({
        title: "Missing Names!",
        description: "Please enter both names",
        variant: "destructive"
      });
      return;
    }

    // Create a "deterministic" but fun calculation
    const combined = (name1.toLowerCase() + name2.toLowerCase()).split('').sort().join('');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = ((hash << 5) - hash) + combined.charCodeAt(i);
      hash = hash & hash;
    }
    
    const percentage = ((Math.abs(hash) % 40) + 50); // Range: 50-89
    setResult(percentage);

    if (percentage >= 80) {
      setMessage("Perfect Match! 💕 You two are made for each other!");
    } else if (percentage >= 70) {
      setMessage("Great Compatibility! ❤️ Love is in the air!");
    } else if (percentage >= 60) {
      setMessage("Good Match! 💖 You have potential together!");
    } else {
      setMessage("Interesting Pair! 💫 Every relationship takes work!");
    }

    toast({
      title: "Love Calculated!",
      description: `${percentage}% compatibility!`,
    });
  };

  const copyResult = () => {
    if (result === null) return;
    
    const text = `${name1} ❤️ ${name2}\nLove Compatibility: ${result}%\n${message}\n\nGenerated at ilovejpg.in`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    });
  };

  const reset = () => {
    setName1('');
    setName2('');
    setResult(null);
    setMessage('');
  };

  return (
    <>
      <SEO 
        title="Love Calculator - Test Love Compatibility | ILoveJPG"
        description="Calculate love compatibility between two people. Fun love percentage calculator for couples!"
        keywords="love calculator, compatibility test, love percentage, relationship calculator, love meter"
      />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-red-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Love Calculator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-red-500 text-white">
              <div className="flex items-center gap-3">
                <Heart className="w-8 h-8 fill-current" />
                <div>
                  <CardTitle className="text-2xl">Love Calculator</CardTitle>
                  <p className="text-sm opacity-90">Test your love compatibility!</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <Input
                    value={name1}
                    onChange={(e) => setName1(e.target.value)}
                    placeholder="Enter first name..."
                    className="text-lg"
                  />
                </div>

                <div className="text-center text-4xl">
                  ❤️
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Second Name</label>
                  <Input
                    value={name2}
                    onChange={(e) => setName2(e.target.value)}
                    placeholder="Enter second name..."
                    className="text-lg"
                    onKeyPress={(e) => e.key === 'Enter' && calculateLove()}
                  />
                </div>
              </div>

              {result === null ? (
                <Button
                  onClick={calculateLove}
                  className="w-full bg-gradient-to-r from-pink-500 to-red-500 hover:from-pink-600 hover:to-red-600 text-white h-14 text-lg"
                >
                  <Heart className="mr-2 h-5 w-5 fill-current" />
                  Calculate Love
                </Button>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-pink-100 to-red-100 dark:from-pink-900/30 dark:to-red-900/30 p-8 rounded-xl border-4 border-pink-300 dark:border-pink-700 text-center space-y-4">
                    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                      {name1} ❤️ {name2}
                    </div>
                    
                    <div className="relative">
                      <svg className="w-40 h-40 mx-auto transform -rotate-90">
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="currentColor"
                          strokeWidth="12"
                          fill="none"
                          className="text-gray-200 dark:text-gray-700"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="70"
                          stroke="url(#gradient)"
                          strokeWidth="12"
                          fill="none"
                          strokeDasharray={`${2 * Math.PI * 70}`}
                          strokeDashoffset={`${2 * Math.PI * 70 * (1 - result / 100)}`}
                          className="transition-all duration-1000"
                        />
                        <defs>
                          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#ef4444" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-pink-600 dark:text-pink-400">
                            {result}%
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                      {message}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <Button
                      onClick={copyResult}
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
                          Copy Result
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={reset}
                      variant="outline"
                      className="h-12"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Try Again
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="About Love Calculator">
            <div className="space-y-2">
              <p>• Enter two names to calculate love compatibility</p>
              <p>• Get an instant compatibility percentage</p>
              <p>• Share the results with your partner!</p>
              <p>• Just for fun - not scientifically accurate 😊</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                💡 Remember: True love isn't determined by a calculator!
              </p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
