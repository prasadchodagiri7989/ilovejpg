import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleHelp, Info } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

const personalityQuestions = [
  { question: "How do you spend your free time?", options: ["Reading/Learning", "Socializing", "Creating Things", "Relaxing"] },
  { question: "What's your ideal weekend?", options: ["Adventure", "Staying Home", "Spending Time with Friends", "Working on Projects"] },
  { question: "How do you handle stress?", options: ["Talk it Out", "Work Through It", "Take a Break", "Plan & Organize"] },
  { question: "What motivates you most?", options: ["Achievement", "Helping Others", "Freedom", "Knowledge"] },
  { question: "How do you make decisions?", options: ["Logic", "Intuition", "Advice from Others", "Pros & Cons List"] }
];

const results = {
  'The Thinker': "You're analytical and love solving problems. Your logical approach helps you navigate life's challenges.",
  'The Creator': "Youare imaginative and artistic. You see possibilities everywhere and love expressing yourself.",
  'The Leader': "You're confident and decisive. People naturally look to you for guidance and inspiration.",
  'The Helper': "You're compassionate and caring. You find fulfillment in making others happy and supporting them."
};

export default function PersonalityQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  const selectAnswer = (answer: string) => {
    const newAnswers = [...answers, answer];
    setAnswers(newAnswers);
    
    if (currentQuestion < personalityQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate result
      const resultKeys = Object.keys(results);
      const finalResult = resultKeys[Math.floor(Math.random() * resultKeys.length)];
      setResult(finalResult);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <>
      <SEO title="Personality Quiz - Discover Your Type | ILoveJPG" description="Take our personality quiz and discover your unique personality type!" keywords="personality quiz, personality test, quiz, personality type" />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Personality Quiz</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CircleHelp className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Personality Quiz</CardTitle>
                    <p className="text-sm opacity-90">Discover your personality type</p>
                  </div>
                </div>
                {!result && (
                  <div className="text-right">
                    <div className="text-xl font-bold">{currentQuestion + 1}/{personalityQuestions.length}</div>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {!result ? (
                <>
                  <div className="bg-gradient-to-br from-teal-100 to-cyan-100 dark:from-teal-900/30 dark:to-cyan-900/30 p-6 rounded-xl">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">
                      {personalityQuestions[currentQuestion].question}
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {personalityQuestions[currentQuestion].options.map((option, idx) => (
                      <Button key={idx} onClick={() => selectAnswer(option)} variant="outline" className="h-16 text-lg justify-start hover:bg-teal-50 dark:hover:bg-teal-900/20">
                        {option}
                      </Button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center space-y-6">
                  <div className="text-7xl mb-4">🎯</div>
                  <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">You are:</h2>
                  <div className="text-4xl font-bold text-teal-600 dark:text-teal-400">{result}</div>
                  <div className="bg-teal-100 dark:bg-teal-900/30 p-6 rounded-xl">
                    <p className="text-xl text-gray-800 dark:text-gray-100">
                      {results[result as keyof typeof results]}
                    </p>
                  </div>
                  <Button onClick={reset} className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white h-12">
                    Take Quiz Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="About This Quiz">
            <div className="space-y-2">
              <p>• Answer 5 simple questions</p>
              <p>• Discover your personality type</p>
              <p>• Learn more about yourself</p>
              <p>• Share results with friends!</p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
