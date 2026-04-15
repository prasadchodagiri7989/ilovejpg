import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, RefreshCw, Zap } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

const truthQuestions = [
  "What's your most embarrassing moment?",
  "What's the biggest lie you've ever told?",
  "Who was your first crush?",
  "What's your biggest fear?",
  "Have you ever cheated on a test?",
  "What's your guilty pleasure?",
  "What's the most childish thing you still do?",
  "What's a secret you've never told anyone?",
  "What's the worst gift you've ever received?",
  "If you could be invisible for a day, what would you do?",
  "What's your biggest insecurity?",
  "Have you ever lied to your best friend?",
  "What's the weirdest dream you've ever had?",
  "What's something you're glad your parents don't know?",
  "What's your most unusual talent?",
  "Have you ever had a crush on a friend's partner?",
  "What's the longest you've gone without showering?",
  "What's your biggest regret?",
  "What's the most expensive thing you've stolen?",
  "What's something you've done that you're not proud of?"
];

const dares = [
  "Do 20 pushups right now",
  "Speak in an accent for the next 3 rounds",
  "Let someone go through your phone for 1 minute",
  "Post an embarrassing photo on social media",
  "Do your best dance for 1 minute",
  "Call a random contact and sing to them",
  "Eat a spoonful of a condiment",
  "Do a handstand for 30 seconds",
  "Talk without closing your mouth",
  "Let the group give you a new hairstyle",
  "Wear your clothes backwards for the next hour",
  "Do an impression of another player",
  "Speak in rhymes for the next 3 rounds",
  "Let someone tickle you for 30 seconds",
  "Do 50 jumping jacks",
  "Plank for 1 minute",
  "Text your crush right now",
  "Eat a raw onion slice",
  "Do your best animal impression",
  "Let someone draw on your face"
];

const modes = [
  { id: 'classic', name: 'Classic', color: 'from-blue-500 to-indigo-500' },
  { id: 'spicy', name: 'Spicy 🌶️', color: 'from-red-500 to-orange-500' },
  { id: 'friendly', name: 'Friendly', color: 'from-green-500 to-teal-500' }
];

export default function TruthOrDare() {
  const [mode, setMode] = useState('classic');
  const [currentChallenge, setCurrentChallenge] = useState<string>('');
  const [challengeType, setChallengeType] = useState<'truth' | 'dare' | null>(null);
  const { toast } = useToast();

  const getChallenge = (type: 'truth' | 'dare') => {
    const list = type === 'truth' ? truthQuestions : dares;
    const randomIndex = Math.floor(Math.random() * list.length);
    setCurrentChallenge(list[randomIndex]);
    setChallengeType(type);
    
    toast({
      title: type === 'truth' ? "Truth Selected!" : "Dare Selected!",
      description: "Good luck!",
    });
  };

  const reset = () => {
    setCurrentChallenge('');
    setChallengeType(null);
  };

  return (
    <>
      <SEO 
        title="Truth or Dare Game - Play Online | ILoveJPG"
        description="Play Truth or Dare online with friends. Choose from classic, spicy, or friendly modes. Perfect for parties!"
        keywords="truth or dare, party game, truth questions, dare challenges, online game"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Truth or Dare</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className={`bg-gradient-to-r ${modes.find(m => m.id === mode)?.color} text-white`}>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Truth or Dare</CardTitle>
                  <p className="text-sm opacity-90">The ultimate party game</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Select Mode:</label>
                <div className="grid grid-cols-3 gap-3">
                  {modes.map((m) => (
                    <Button
                      key={m.id}
                      variant={mode === m.id ? 'default' : 'outline'}
                      onClick={() => setMode(m.id)}
                      className="w-full"
                    >
                      {m.name}
                    </Button>
                  ))}
                </div>
              </div>

              {currentChallenge && (
                <div className={`p-6 rounded-lg bg-gradient-to-r ${challengeType === 'truth' ? 'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30' : 'from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30'} border-2 ${challengeType === 'truth' ? 'border-blue-300 dark:border-blue-700' : 'border-red-300 dark:border-red-700'}`}>
                  <div className="text-center">
                    <h3 className={`text-2xl font-bold mb-4 ${challengeType === 'truth' ? 'text-blue-700 dark:text-blue-300' : 'text-red-700 dark:text-red-300'}`}>
                      {challengeType === 'truth' ? '🤔 TRUTH' : '⚡ DARE'}
                    </h3>
                    <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                      {currentChallenge}
                    </p>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={() => getChallenge('truth')}
                  className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white h-24 text-xl"
                >
                  <Zap className="mr-2 h-6 w-6" />
                  Truth
                </Button>
                <Button
                  onClick={() => getChallenge('dare')}
                  className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white h-24 text-xl"
                >
                  <Zap className="mr-2 h-6 w-6" />
                  Dare
                </Button>
              </div>

              {currentChallenge && (
                <Button
                  onClick={reset}
                  variant="outline"
                  className="w-full"
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Next Player
                </Button>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="How to Play">
            <div className="space-y-2">
              <p>• Choose a game mode: Classic, Spicy, or Friendly</p>
              <p>• Players take turns clicking "Truth" or "Dare"</p>
              <p>• Complete the challenge or answer the question</p>
              <p>• Have fun and be honest!</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                💡 Tip: Play with friends for maximum fun!
              </p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
