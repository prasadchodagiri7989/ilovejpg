import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, RefreshCw, Copy, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

const templates = [
  { part1: ["Once upon a time", "In a distant galaxy", "Deep in the forest", "On a stormy night"], part2: ["a brave hero", "a magical creature", "a lost traveler", "a mysterious stranger"], part3: ["discovered a secret", "found a hidden treasure", "met an old wizard", "stumbled upon a portal"], part4: ["that changed everything", "leading to an epic adventure", "revealing ancient mysteries", "opening new possibilities"] }
];

export default function RandomStoryGenerator() {
  const [story, setStory] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateStory = () => {
    const template = templates[0];
    const part1 = template.part1[Math.floor(Math.random() * template.part1.length)];
    const part2 = template.part2[Math.floor(Math.random() * template.part2.length)];
    const part3 = template.part3[Math.floor(Math.random() * template.part3.length)];
    const part4 = template.part4[Math.floor(Math.random() * template.part4.length)];
    
    setStory(`${part1}, ${part2} ${part3} ${part4}.`);
    setCopied(false);
  };

  const copyStory = () => {
    if (!story) return;
    navigator.clipboard.writeText(story);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({ title: "Copied!", description: "Story copied to clipboard" });
  };

  return (
    <>
      <SEO title="Random Story Generator - Create Stories | ILoveJPG" description="Generate random creative stories with one click!" keywords="story generator, random story, creative writing, story maker" />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Random Story Generator</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
              <div className="flex items-center gap-3">
                <Book className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Random Story Generator</CardTitle>
                  <p className="text-sm opacity-90">Create unique stories instantly!</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              {story && (
                <div className="bg-gradient-to-br from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30 p-8 rounded-xl border-4 border-indigo-300 dark:border-indigo-700">
                  <div className="text-6xl mb-4 text-center">📖</div>
                  <div className="text-2xl font-serif text-gray-800 dark:text-gray-100 leading-relaxed text-center">{story}</div>
                </div>
              )}
              
              <Button onClick={generateStory} className="w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white h-14 text-lg">
                <RefreshCw className="mr-2 h-5 w-5" />Generate Story
              </Button>
              
              {story && (
                <Button onClick={copyStory} variant="outline" className="w-full">
                  {copied ? <><Check className="mr-2 h-4 w-4" />Copied!</> : <><Copy className="mr-2 h-4 w-4" />Copy Story</>}
                </Button>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="About Story Generator">
            <div className="space-y-2">
              <p>• Generate random creative stories</p>
              <p>• Perfect for writing inspiration</p>
              <p>• Share with friends or use as prompts</p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
