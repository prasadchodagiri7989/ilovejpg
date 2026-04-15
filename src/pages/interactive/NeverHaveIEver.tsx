import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wine, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

const statements = [
  "Never have I ever lied to my best friend",
  "Never have I ever skipped school or work",
  "Never have I ever cried during a movie",
  "Never have I ever sent a text to the wrong person",
  "Never have I ever pretended to be sick",
  "Never have I ever stayed up all night",
  "Never have I ever forgotten someone's birthday",
  "Never have I ever sung karaoke",
  "Never have I ever stalked someone on social media",
  "Never have I ever regifted a present",
  "Never have I ever read someone's diary",
  "Never have I ever gone skinny dipping",
  "Never have I ever been in a car accident",
  "Never have I ever broken a bone",
  "Never have I ever been on TV",
  "Never have I ever met a celebrity",
  "Never have I ever cheated in a game",
  "Never have I ever pulled an all-nighter studying",
  "Never have I ever worn the same outfit two days in a row",
  "Never have I ever laughed so hard I cried"
];

export default function NeverHaveIEver() {
  const [currentStatement, setCurrentStatement] = useState(statements[0]);
  const [answered, setAnswered] = useState(0);
  const [score, setScore] = useState(0);

  const handleResponse = (hasEver: boolean) => {
    if (hasEver) {
      setScore(prev => prev + 1);
    }
    nextStatement();
  };

  const nextStatement = () => {
    const randomIndex = Math.floor(Math.random() * statements.length);
    setCurrentStatement(statements[randomIndex]);
    setAnswered(prev => prev + 1);
  };

  const reset = () => {
    setCurrentStatement(statements[0]);
    setAnswered(0);
    setScore(0);
  };

  return (
    <>
      <SEO 
        title="Never Have I Ever Game - Play Online | ILoveJPG"
        description="Play Never Have I Ever online. Answer fun questions and keep track of your score!"
        keywords="never have I ever, party game, drinking game, online game, fun questions"
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
                <BreadcrumbPage>Never Have I Ever</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Wine className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Never Have I Ever</CardTitle>
                    <p className="text-sm opacity-90">The classic confession game</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{score}</div>
                  <div className="text-xs opacity-90">/ {answered}</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 p-8 rounded-xl border-2 border-purple-300 dark:border-purple-700 min-h-[200px] flex items-center justify-center">
                <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100">
                  {currentStatement}
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => handleResponse(true)}
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white h-20 text-xl"
                >
                  I Have! 🙈
                </Button>
                <Button
                  onClick={() => handleResponse(false)}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white h-20 text-xl"
                >
                  I Haven't! 😇
                </Button>
              </div>

              {answered > 0 && (
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium">
                    You've answered <span className="text-purple-600 dark:text-purple-400 font-bold">{answered}</span> statements
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    You've done <span className="text-pink-600 dark:text-pink-400 font-bold">{score}</span> of them!
                  </p>
                </div>
              )}

              <Button
                onClick={reset}
                variant="outline"
                className="w-full"
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Start Over
              </Button>
            </CardContent>
          </Card>

          <GuidanceSection title="How to Play">
            <div className="space-y-2">
              <p>• Read each "Never Have I Ever" statement</p>
              <p>• Click "I Have!" if you've done it, "I Haven't!" if you haven't</p>
              <p>• Your score shows how many things you've experienced</p>
              <p>• Play with friends and compare scores!</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                💡 Perfect for parties and getting to know friends!
              </p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
