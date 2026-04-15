import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

const moods = {
  happy: { suggestions: ['Listen to upbeat music', 'Dance around', 'Call a friend', 'Watch comedy'], emoji: '😊', color: 'from-yellow-500 to-orange-500' },
  sad: { suggestions: ['Watch a comfort movie', 'Write in a journal', 'Take a warm bath', 'Listen to calming music'], emoji: '😢', color: 'from-blue-500 to-indigo-500' },
  energetic: { suggestions: ['Go for a run', 'Try a new workout', 'Clean your space', 'Start a project'], emoji: '⚡', color: 'from-red-500 to-pink-500' },
  tired: { suggestions: ['Take a nap', 'Meditate', 'Drink herbal tea', 'Read a book'], emoji: '😴', color: 'from-purple-500 to-indigo-500' },
  stressed: { suggestions: ['Deep breathing', 'Go for a walk', 'Listen to nature sounds', 'Do yoga'], emoji: '😰', color: 'from-gray-500 to-slate-500' }
};

export default function MoodBasedSuggestion() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [suggestion, setSuggestion] = useState('');

  const selectMood = (mood: string) => {
    setSelectedMood(mood);
    const moodData = moods[mood as keyof typeof moods];
    const randomSuggestion = moodData.suggestions[Math.floor(Math.random() * moodData.suggestions.length)];
    setSuggestion(randomSuggestion);
  };

  return (
    <>
      <SEO title="Mood Based Suggestion - Activity Ideas | ILoveJPG" description="Get personalized activity suggestions based on your current mood!" keywords="mood tracker, activity suggestions, mood based" />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-rose-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Mood Based Suggestion</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className={`bg-gradient-to-r ${selectedMood ? moods[selectedMood as keyof typeof moods].color : 'from-purple-500 to-pink-500'} text-white`}>
              <div className="flex items-center gap-3">
                <Lightbulb className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Mood Based Suggestion</CardTitle>
                  <p className="text-sm opacity-90">How are you feeling today?</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {!selectedMood ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(moods).map(([key, val]) => (
                    <button key={key} onClick={() => selectMood(key)} className="p-6 rounded-xl border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 hover:scale-105 transition-all duration-200 bg-white dark:bg-gray-800">
                      <div className="text-5xl mb-2">{val.emoji}</div>
                      <div className="font-semibold capitalize">{key}</div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className={`bg-gradient-to-br ${moods[selectedMood as keyof typeof moods].color} bg-opacity-20 p-8 rounded-xl text-center`}>
                    <div className="text-7xl mb-4">{moods[selectedMood as keyof typeof moods].emoji}</div>
                    <div className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Try this:</div>
                    <div className="text-3xl font-semibold text-gray-800 dark:text-gray-100">{suggestion}</div>
                  </div>
                  <Button onClick={() => { setSelectedMood(null); setSuggestion(''); }} variant="outline" className="w-full h-12">
                    <RefreshCw className="mr-2 h-4 w-4" />Choose Different Mood
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="About This Tool">
            <div className="space-y-2">
              <p>• Select your current mood</p>
              <p>• Get personalized activity suggestions</p>
              <p>• Try different activities to improve your mood</p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
