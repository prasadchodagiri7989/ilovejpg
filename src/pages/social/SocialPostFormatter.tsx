import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FileText, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function SocialPostFormatter() {
  const [text, setText] = useState('');
  const [platform, setPlatform] = useState('twitter');
  const [formatted, setFormatted] = useState('');
  const { toast } = useToast();

  const formatPost = () => {
    if (!text.trim()) {
      toast({
        title: "Error",
        description: "Please enter some text",
        variant: "destructive",
      });
      return;
    }

    let result = text;

    switch (platform) {
      case 'twitter':
        // Twitter: Add line breaks, emojis, hashtags at end
        result = text.split('\n\n').join('\n\n💭 ');
        if (result.length > 280) {
          result = result.substring(0, 277) + '...';
        }
        break;
      
      case 'instagram':
        // Instagram: Add emojis between paragraphs
        result = text.split('\n\n').join('\n\n✨ ');
        result += '\n\n─────────────\n';
        break;
      
      case 'linkedin':
        // LinkedIn: Professional formatting
        result = text.split('\n\n').map((para, i) => 
          i === 0 ? `${para}` : `\n\n${para}`
        ).join('');
        result += '\n\n#Professional #Career #Growth';
        break;
      
      case 'facebook':
        // Facebook: Add emojis and formatting
        result = text.split('\n\n').join('\n\n👉 ');
        break;
    }

    setFormatted(result);
    toast({
      title: "Formatted!",
      description: `Post formatted for ${platform}`,
    });
  };

  const copyFormatted = () => {
    navigator.clipboard.writeText(formatted);
    toast({
      title: "Copied!",
      description: "Formatted post copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Social Post Formatter - Format Social Media Posts | ILoveJPG"
        description="Format your social media posts for Twitter, Instagram, LinkedIn, and Facebook. Optimize text for each platform."
        keywords="social post formatter, twitter formatter, instagram formatter, social media formatter"
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Social Post Formatter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Social Post Formatter</CardTitle>
                  <p className="text-sm opacity-90">Format posts for different social platforms</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Platform</label>
                  <Select value={platform} onValueChange={setPlatform}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twitter">Twitter/X</SelectItem>
                      <SelectItem value="instagram">Instagram</SelectItem>
                      <SelectItem value="linkedin">LinkedIn</SelectItem>
                      <SelectItem value="facebook">Facebook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Your Post</label>
                  <Textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your post content..."
                    rows={6}
                  />
                  <p className="text-xs text-muted-foreground">
                    {platform === 'twitter' && `${text.length}/280 characters`}
                    {platform !== 'twitter' && `${text.length} characters`}
                  </p>
                </div>
              </div>
              
              <Button onClick={formatPost} className="w-full bg-gradient-to-r from-emerald-500 to-teal-500">
                <FileText className="w-4 h-4 mr-2" />
                Format Post
              </Button>
              
              {formatted && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Formatted Post</label>
                    <Button onClick={copyFormatted} variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={formatted}
                    readOnly
                    className="bg-gray-50 dark:bg-gray-800"
                    rows={8}
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Social Post Formatter">
            <p className="text-muted-foreground">
              Format your social media posts for optimal engagement on different platforms.
              Each platform has unique formatting styles and character limits. This tool helps you adapt your content accordingly.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
