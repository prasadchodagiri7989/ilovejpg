import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Hash, Copy, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function HashtagGenerator() {
  const [topic, setTopic] = useState('');
  const [hashtags, setHashtags] = useState<string[]>([]);
  const { toast } = useToast();

  const generateHashtags = () => {
    if (!topic.trim()) {
      toast({
        title: "Error",
        description: "Please enter a topic",
        variant: "destructive",
      });
      return;
    }

    const words = topic.split(' ').filter(w => w.length > 0);
    const generated: string[] = [];

    // Main topic hashtags
    generated.push(`#${words.join('')}`);
    words.forEach(word => {
      generated.push(`#${word.charAt(0).toUpperCase() + word.slice(1)}`);
    });

    // Common prefix/suffix hashtags
    const prefixes = ['Best', 'Top', 'Amazing', 'Love', 'Daily', 'My', 'New', 'Viral'];
    const suffixes = ['Lovers', 'Gram', 'Life', 'Goals', 'OfTheDay', 'Vibes', 'Inspiration'];
    
    prefixes.forEach(prefix => {
      generated.push(`#${prefix}${words[0].charAt(0).toUpperCase() + words[0].slice(1)}`);
    });

    suffixes.forEach(suffix => {
      generated.push(`#${words[0].charAt(0).toUpperCase() + words[0].slice(1)}${suffix}`);
    });

    // Generic popular hashtags
    const popular = ['#InstaGood', '#PhotoOfTheDay', '#Instagram', '#PicOfTheDay', '#Follow', '#Like4Like', '#TBT', '#FollowMe', '#Instagram', '#Summer'];
    
    setHashtags([...new Set([...generated, ...popular])].slice(0, 30));
    toast({
      title: "Generated!",
      description: `${hashtags.length} hashtags created`,
    });
  };

  const copyAllHashtags = () => {
    navigator.clipboard.writeText(hashtags.join(' '));
    toast({
      title: "Copied!",
      description: "All hashtags copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Hashtag Generator - Social Media Hashtags | ILoveJPG"
        description="Generate trending hashtags for Instagram, Twitter, and TikTok. Boost your social media engagement with relevant hashtags."
        keywords="hashtag generator, instagram hashtags, twitter hashtags, social media hashtags"
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
                <BreadcrumbPage>Hashtag Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <Hash className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Hashtag Generator</CardTitle>
                  <p className="text-sm opacity-90">Generate trending hashtags for social media</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Topic or Keyword</label>
                <Input
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., travel, fitness, food"
                  onKeyPress={(e) => e.key === 'Enter' && generateHashtags()}
                />
              </div>
              
              <Button onClick={generateHashtags} className="w-full bg-gradient-to-r from-pink-500 to-purple-500">
                <Hash className="w-4 h-4 mr-2" />
                Generate Hashtags
              </Button>
              
              {hashtags.length > 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Generated Hashtags ({hashtags.length})</h3>
                    <Button onClick={copyAllHashtags} variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy All
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {hashtags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full text-sm font-medium cursor-pointer hover:scale-105 transition-transform"
                        onClick={() => {
                          navigator.clipboard.writeText(tag);
                          toast({ title: "Copied!", description: tag });
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Hashtag Generator">
            <p className="text-muted-foreground">
              Generate relevant hashtags for your social media posts on Instagram, Twitter, TikTok, and more.
              Click any hashtag to copy it individually, or use "Copy All" to copy all hashtags at once. Boost your social media engagement!
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
