import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, RefreshCw, TrendingUp } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

const questions = [
  { optionA: "Have super strength", optionB: "Have the ability to fly" },
  { optionA: "Live without internet", optionB: "Live without air conditioning" },
  { optionA: "Always be 10 minutes late", optionB: "Always be 20 minutes early" },
  { optionA: "Have unlimited money", optionB: "Have unlimited time" },
  { optionA: "Read minds", optionB: "Be invisible" },
  { optionA: "Never eat junk food again", optionB: "Never use social media again" },
  { optionA: "Travel to the past", optionB: "Travel to the future" },
  { optionA: "Live in the city", optionB: "Live in the countryside" },
  { optionA: "Be famous", optionB: "Be rich but unknown" },
  { optionA: "Have no taste buds", optionB: "Have no sense of smell" },
  { optionA: "Never watch movies again", optionB: "Never listen to music again" },
  { optionA: "Always say what you think", optionB: "Never speak again" },
  { optionA: "Live without your phone", optionB: "Live without your computer" },
  { optionA: "Have a rewind button", optionB: "Have a pause button for your life" },
  { optionA: "Be able to speak all languages", optionB: "Be able to talk to animals" },
  { optionA: "Never have to sleep", optionB: "Never have to eat" },
  { optionA: "Win the lottery", optionB: "Live twice as long" },
  { optionA: "Be stuck on a broken ski lift", optionB: "Be stuck in a broken elevator" },
  { optionA: "Have a photographic memory", optionB: "Have the ability to forget anything" },
  { optionA: "Always be too hot", optionB: "Always be too cold" }
];

export default function WouldYouRather() {
  const [currentQuestion, setCurrentQuestion] = useState(questions[0]);
  const [votes, setVotes] = useState({ A: 0, B: 0 });
  const [hasVoted, setHasVoted] = useState(false);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);

  const vote = (option: 'A' | 'B') => {
    if (!hasVoted) {
      setVotes({ ...votes, [option]: votes[option] + 1 });
      setHasVoted(true);
      setQuestionsAnswered(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    setCurrentQuestion(questions[randomIndex]);
    setVotes({ A: Math.floor(Math.random() * 100), B: Math.floor(Math.random() * 100) });
    setHasVoted(false);
  };

  const getPercentage = (option: 'A' | 'B') => {
    const total = votes.A + votes.B;
    if (total === 0) return 50;
    return Math.round((votes[option] / total) * 100);
  };

  return (
    <>
      <SEO 
        title="Would You Rather Game - Online Decision Game | ILoveJPG"
        description="Play Would You Rather online. Choose between two difficult options and see what others chose!"
        keywords="would you rather, decision game, choice game, online game, party game"
      />
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Would You Rather</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Would You Rather?</CardTitle>
                    <p className="text-sm opacity-90">Make tough choices</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold">{questionsAnswered}</div>
                  <div className="text-xs opacity-90">Questions</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-gray-100">
                  Would You Rather...
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => vote('A')}
                  disabled={hasVoted}
                  className={`group relative p-8 rounded-xl border-4 transition-all duration-300 ${
                    hasVoted 
                      ? 'bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 border-purple-300 dark:border-purple-700' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:shadow-xl hover:scale-105'
                  }`}
                >
                  <div className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    {currentQuestion.optionA}
                  </div>
                  {hasVoted && (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${getPercentage('A')}%` }}
                        />
                      </div>
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {getPercentage('A')}%
                      </div>
                    </div>
                  )}
                </button>

                <button
                  onClick={() => vote('B')}
                  disabled={hasVoted}
                  className={`group relative p-8 rounded-xl border-4 transition-all duration-300 ${
                    hasVoted 
                      ? 'bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-300 dark:border-blue-700' 
                      : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-blue-400 hover:shadow-xl hover:scale-105'
                  }`}
                >
                  <div className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
                    {currentQuestion.optionB}
                  </div>
                  {hasVoted && (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                          style={{ width: `${getPercentage('B')}%` }}
                        />
                      </div>
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {getPercentage('B')}%
                      </div>
                    </div>
                  )}
                </button>
              </div>

              <Button
                onClick={nextQuestion}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white h-12"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Next Question
              </Button>
            </CardContent>
          </Card>

          <GuidanceSection title="About This Game">
            <div className="space-y-2">
              <p>• Choose between two difficult options</p>
              <p>• See what percentage chose each option</p>
              <p>• Perfect for sparking conversations</p>
              <p>• Play solo or with friends</p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
