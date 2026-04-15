import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clover, RefreshCw, TrendingUp } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

const fortunes = [
  { message: "Today is your lucky day! Great things are coming!", emoji: "🍀" },
  { message: "Expect unexpected good news soon!", emoji: "📬" },
  { message: "Your hard work will pay off today!", emoji: "💪" },
  { message: "A pleasant surprise awaits you!", emoji: "🎁" },
  { message: "Someone special is thinking about you!", emoji: "💭" },
  { message: "Your creativity will shine today!", emoji: "✨" },
  { message: "Good vibes only today!", emoji: "🌈" },
  { message: "Fortune favors the bold today!", emoji: "⚡" },
  { message: "A new opportunity is on the horizon!", emoji: "🌅" },
  { message: "Today is perfect for new beginnings!", emoji: "🌱" }
];

export default function DailyLuckMeter() {
  const [luckScore, setLuckScore] = useState(0);
  const [fortune, setFortune] = useState(fortunes[0]);
  const [hasChecked, setHasChecked] = useState(false);

  const checkLuck = () => {
    const score = Math.floor(Math.random() * 30) + 70; // 70-99
    const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    
    setLuckScore(0);
    setHasChecked(true);
    setFortune(randomFortune);
    
    // Animate the score
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      if (current >= score) {
        setLuckScore(score);
        clearInterval(interval);
      } else {
        setLuckScore(current);
      }
    }, 20);
  };

  const getLuckLevel = (score: number) => {
    if (score >= 90) return { text: 'Extremely Lucky!', color: 'text-green-600', bg: 'from-green-500 to-emerald-500' };
    if (score >= 80) return { text: 'Very Lucky!', color: 'text-blue-600', bg: 'from-blue-500 to-cyan-500' };
    return { text: 'Good Luck!', color: 'text-purple-600', bg: 'from-purple-500 to-pink-500' };
  };

  const luck = getLuckLevel(luckScore);

  return (
    <>
      <SEO 
        title="Daily Luck Meter - Check Your Luck Today | ILoveJPG"
        description="Check your luck score for today! Get your daily fortune and luck percentage."
        keywords="luck meter, daily fortune, luck calculator, fortune teller, luck score"
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
                <BreadcrumbPage>Daily Luck Meter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className={`bg-gradient-to-r ${hasChecked ? luck.bg : 'from-green-500 to-emerald-500'} text-white`}>
              <div className="flex items-center gap-3">
                <Clover className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Daily Luck Meter</CardTitle>
                  <p className="text-sm opacity-90">Discover your fortune for today!</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {!hasChecked ? (
                <div className="text-center space-y-6 py-12">
                  <div className="text-8xl mb-6">🍀</div>
                  <h2 className="text-3xl font-bold">Check Your Luck!</h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Find out how lucky you are today
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <svg className="w-64 h-64 mx-auto transform -rotate-90">
                      <circle
                        cx="128"
                        cy="128"
                        r="100"
                        stroke="currentColor"
                        strokeWidth="20"
                        fill="none"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="128"
                        cy="128"
                        r="100"
                        stroke="url(#luckGradient)"
                        strokeWidth="20"
                        fill="none"
                        strokeDasharray={`${2 * Math.PI * 100}`}
                        strokeDashoffset={`${2 * Math.PI * 100 * (1 - luckScore / 100)}`}
                        className="transition-all duration-1000"
                      />
                      <defs>
                        <linearGradient id="luckGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981" />
                          <stop offset="100%" stopColor="#06b6d4" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-6xl font-bold text-green-600 dark:text-green-400">
                          {luckScore}%
                        </div>
                        <div className={`text-xl font-semibold ${luck.color} dark:${luck.color}`}>
                          {luck.text}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 p-6 rounded-xl border-2 border-green-300 dark:border-green-700 text-center">
                    <div className="text-6xl mb-4">{fortune.emoji}</div>
                    <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
                      {fortune.message}
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={checkLuck}
                className={`w-full bg-gradient-to-r ${luck.bg} hover:opacity-90 text-white h-14 text-lg`}
              >
                {hasChecked ? (
                  <>
                    <RefreshCw className="mr-2 h-5 w-5" />
                    Check Again
                  </>
                ) : (
                  <>
                    <Clover className="mr-2 h-5 w-5" />
                    Check My Luck
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          <GuidanceSection title="About the Luck Meter">
            <div className="space-y-2">
              <p>• Get your daily luck percentage</p>
              <p>• Receive a personalized fortune message</p>
              <p>• Check as many times as you want!</p>
              <p>• Share your luck with friends</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                💡 Remember: You make your own luck with positive actions!
              </p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
