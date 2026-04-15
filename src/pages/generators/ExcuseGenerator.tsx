import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileQuestion, RefreshCw, Copy, Check } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

const excuseCategories = {
  work: [
    "I'm having internet connection issues",
    "My computer just crashed and I lost all my work",
    "I have a family emergency I need to attend to",
    "I'm feeling unwell and need to rest",
    "There's unexpected construction outside making it impossible to concentrate",
    "I have a doctor's appointment I forgot about",
    "My pet is sick and needs immediate attention",
    "There's a power outage in my area",
    "I'm stuck in traffic due to an accident",
    "I need to help a family member with an urgent matter"
  ],
  social: [
    "My phone died and I just charged it",
    "I fell asleep early because I wasn't feeling well",
    "I got caught up helping a friend with an emergency",
    "My alarm didn't go off this morning",
    "I lost track of time while studying",
    "Traffic was worse than expected",
    "I had to help my parents with something urgent",
    "My phone was on silent and I didn't see your message",
    "I was in a meeting that ran longer than expected",
    "I had a family dinner I couldn't skip"
  ],
  school: [
    "My printer ran out of ink",
    "I accidentally submitted the wrong file",
    "My computer froze while I was working on it",
    "I've been sick and couldn't focus",
    "There was a family emergency",
    "My internet went down while submitting",
    "I misread the due date on the assignment",
    "My laptop battery died and I couldn't save my work",
    "I had to take care of a sick family member",
    "The file got corrupted and I lost all my progress"
  ],
  general: [
    "I'm not feeling well today",
    "Something unexpected came up",
    "I overslept my alarm",
    "I'm dealing with a personal matter",
    "I have a prior commitment I forgot about",
    "There's an emergency I need to handle",
    "I'm experiencing technical difficulties",
    "I'm stuck dealing with an urgent situation",
    "I need to take care of something important",
    "I lost track of time"
  ]
};

export default function ExcuseGenerator() {
  const [category, setCategory] = useState('general');
  const [currentExcuse, setCurrentExcuse] = useState('');
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generateExcuse = () => {
    const excuses = excuseCategories[category as keyof typeof excuseCategories];
    const randomIndex = Math.floor(Math.random() * excuses.length);
    setCurrentExcuse(excuses[randomIndex]);
    setCopied(false);
  };

  const copyExcuse = () => {
    if (!currentExcuse) return;
    
    navigator.clipboard.writeText(currentExcuse);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    toast({
      title: "Copied!",
      description: "Excuse copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Excuse Generator - Random Excuse Maker | ILoveJPG"
        description="Generate random excuses for any situation. Perfect for work, school, or social events!"
        keywords="excuse generator, random excuse, excuse maker, funny excuses, work excuse"
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Excuse Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-3xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <div className="flex items-center gap-3">
                <FileQuestion className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Excuse Generator</CardTitle>
                  <p className="text-sm opacity-90">Need an excuse? We've got you covered!</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div>
                <label className="text-sm font-medium mb-3 block">Select Category:</label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-full h-12 text-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="work">Work</SelectItem>
                    <SelectItem value="school">School</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {currentExcuse && (
                <div className="bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 p-8 rounded-xl border-4 border-amber-300 dark:border-amber-700">
                  <div className="text-center space-y-4">
                    <div className="text-4xl mb-4">💡</div>
                    <div className="text-2xl font-semibold text-gray-800 dark:text-gray-100 leading-relaxed">
                      "{currentExcuse}"
                    </div>
                  </div>
                </div>
              )}

              <Button
                onClick={generateExcuse}
                className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white h-14 text-lg"
              >
                <RefreshCw className="mr-2 h-5 w-5" />
                Generate Excuse
              </Button>

              {currentExcuse && (
                <Button
                  onClick={copyExcuse}
                  variant="outline"
                  className="w-full h-12"
                >
                  {copied ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="mr-2 h-4 w-4" />
                      Copy Excuse
                    </>
                  )}
                </Button>
              )}

              <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⚠️ <strong>Disclaimer:</strong> These excuses are for entertainment purposes only. We encourage honesty and transparency in your communications!
                </p>
              </div>
            </CardContent>
          </Card>

          <GuidanceSection title="How to Use">
            <div className="space-y-2">
              <p>• Choose a category that fits your situation</p>
              <p>• Click "Generate Excuse" to get a random excuse</p>
              <p>• Click "Copy Excuse" to copy it to your clipboard</p>
              <p>• Generate as many as you need!</p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                💡 Remember: Honesty is always the best policy!
              </p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
