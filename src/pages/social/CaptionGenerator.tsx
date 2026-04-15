import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageSquare, Copy, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function CaptionGenerator() {
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('casual');
  const [captions, setCaptions] = useState<string[]>([]);
  const { toast } = useToast();

  const generateCaptions = () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic",
        variant: "destructive",
      });
      return;
    }

    const templates = {
      casual: [
        `Just ${topic} things 🌟`,
        `Living my best ${topic} life 💫`,
        `${topic} vibes only ✨`,
        `Another day, another ${topic} 🎯`,
        `${topic} mode: activated 🚀`,
        `Can't stop, won't stop ${topic} 💪`,
      ],
      professional: [
        `Exploring new opportunities in ${topic}`,
        `Dedicated to excellence in ${topic}`,
        `Taking ${topic} to the next level`,
        `Professional ${topic} insights`,
        `Committed to ${topic} excellence`,
      ],
      motivational: [
        `Dream big, achieve bigger! ${topic} journey continues 💪`,
        `Success is not final, failure is not fatal in ${topic} 🌟`,
        `Your ${topic} goals are within reach! Keep pushing! 🔥`,
        `Every expert was once a beginner in ${topic} 🚀`,
        `Believe in your ${topic} dreams! ✨`,
      ],
      funny: [
        `${topic}? More like ${topic}-sessed! 😂`,
        `Me: I should relax. Also me: *does ${topic}* 🤪`,
        `My therapist: And what do we do when we're stressed? Me: ${topic}! 😅`,
        `Sorry, can't hear you over my ${topic} 🔊`,
        `I'm not addicted to ${topic}... okay maybe a little 😜`,
      ],
    };

    const selected = templates[tone as keyof typeof templates] || templates.casual;
    setCaptions(selected);
    
    toast({
      title: "Generated!",
      description: `${selected.length} captions created`,
    });
  };

  const copyCaption = (caption: string) => {
    navigator.clipboard.writeText(caption);
    toast({
      title: "Copied!",
      description: "Caption copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Caption Generator - Social Media Captions | ILoveJPG"
        description="Generate engaging captions for Instagram, Facebook, and Twitter. Create perfect captions for your social media posts."
        keywords="caption generator, instagram captions, social media captions, post captions"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Caption Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Caption Generator</CardTitle>
                  <p className="text-sm opacity-90">Create engaging social media captions</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Topic or Theme</label>
                  <Input
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    placeholder="e.g., coffee, sunset, workout"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Tone</label>
                  <Select value={tone} onValueChange={setTone}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="motivational">Motivational</SelectItem>
                      <SelectItem value="funny">Funny</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={generateCaptions} className="w-full bg-gradient-to-r from-blue-500 to-purple-500">
                <MessageSquare className="w-4 h-4 mr-2" />
                Generate Captions
              </Button>
              
              {captions.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Generated Captions</h3>
                  {captions.map((caption, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg flex items-start justify-between gap-3"
                    >
                      <p className="flex-1">{caption}</p>
                      <Button onClick={() => copyCaption(caption)} variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Caption Generator">
            <p className="text-muted-foreground">
              Generate creative and engaging captions for your social media posts. Choose different tones to match your brand voice and content style.
              Perfect for Instagram, Facebook, Twitter, and more!
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
