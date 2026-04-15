import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, RefreshCw, Copy, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

const challenges = {
  fitness: [
    "Do 50 jumping jacks right now",
    "Hold a plank for 60 seconds",
    "Do 20 squats",
    "Take a 10-minute walk",
    "Stretch for 5 minutes",
    "Do 15 pushups",
    "Run in place for 2 minutes",
    "Do 30 mountain climbers"
  ],
  creative: [
    "Write a short poem about your day",
    "Draw something without lifting your pen",
    "Make up a story using 5 random words",
    "Create a new recipe",
    "Design your dream house",
    "Write a song chorus",
    "Sketch the view from your window"
  ],
  social: [
    "Compliment 3 people today",
    "Call a friend you haven't talked to in a while",
    "Send a thank you message to someone",
    "Share a funny meme with someone",
    "Help a stranger today",
    "Start a conversation with someone new"
  ],
  learning: [
    "Learn 5 words in a new language",
    "Watch an educational video",
    "Read for 20 minutes",
    "Research something you're curious about",
    "Practice a new skill for 15 minutes",
    "Teach someone something you know"
  ],
  fun: [
    "Try to juggle 3 items",
    "Dance for 3 minutes",
    "Make someone laugh",
    "Try a new food",
    "Take a silly selfie",
    "Play a game you've never played",
    "Do something that scares you a little"
  ]
};

export default function RandomChallengeGenerator() {
  const [category, setCategory] = useState('fun');
  const [currentChallenge, setCurrentChallenge] = useState('');
  const [completed, setCompleted] = useState(0);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateChallenge = () => {
    const categoryList = challenges[category as keyof typeof challenges];
    const randomIndex = Math.floor(Math.random() * categoryList.length);
    setCurrentChallenge(categoryList[randomIndex]);
    setCopied(false);
  };

  const markComplete = () => {
    setCompleted(prev => prev + 1);
    toast({
      title: "Challenge Completed!",
      description: "Great job! Ready for another?",
    });
    setTimeout(() => generateChallenge(), 1000);
  };

  const copyChallenge = () => {
    if (!currentChallenge) return;
    
    navigator.clipboard.writeText(currentChallenge);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied!",
      description: "Challenge copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Random Challenge Generator - Daily Tasks & Challenges | ILoveJPG"
        description="Generate random challenges for fitness, creativity, learning, and more. Accept the challenge!"
        keywords="challenge generator, random challenge, daily challenge, task generator, fun challenges"
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Random Challenge Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Random Challenge Generator</CardTitle>
                    <p className="text-sm opacity-90">Push yourself with daily challenges!</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{completed}</div>
                  <div className="text-xs opacity-90">Completed</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Challenge Category:</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full h-12 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fun">🎮 Fun & Games</SelectItem>
                    <SelectItem value="fitness">💪 Fitness</SelectItem>
                    <SelectItem value="creative">🎨 Creative</SelectItem>
                    <SelectItem value="social">👥 Social</SelectItem>
                    <SelectItem value="learning">📚 Learning</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {currentChallenge && (
                <div className="bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/30 dark:to-purple-900/30 p-8 rounded-xl border-4 border-violet-300 dark:border-violet-700">
                  <div className="text-center space-y-4">
                    <div className="text-6xl mb-4">🎯</div>
                    <div className="text-lg font-medium text-violet-600 dark:text-violet-400 uppercase tracking-wide">
                      Your Challenge
                    </div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 leading-relaxed">
                      {currentChallenge}
                    </div>
                  </div>
                </div>
              )}

              {currentChallenge ? (
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={markComplete}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white h-14"
                  >
                    ✅ Complete
                  </Button>
                  <Button
                    onClick={generateChallenge}
                    variant="outline"
                    className="h-14"
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Skip
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={generateChallenge}
                  className="w-full bg-gradient-to-r from-violet-500 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white h-14 text-lg"
                >
                  <Target className="mr-2 h-5 w-5" />
                  Generate Challenge
                </Button>
              )}

              {currentChallenge && (
                <Button
                  onClick={copyChallenge}
                  variant="outline"
                  className="w-full"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Challenge
                    </>
                  )}
                </Button>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="How It Works">
            <div className="space-y-2">
              <p>• Choose a challenge category</p>
              <p>• Click "Generate Challenge" to get a random task</p>
              <p>• Complete it and mark as done</p>
              <p>• Track your completed challenges</p>
              <p>• Challenge yourself daily!</p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
