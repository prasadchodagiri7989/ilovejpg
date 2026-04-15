import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Copy, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function BioGenerator() {
  const [name, setName] = useState('');
  const [profession, setProfession] = useState('');
  const [style, setStyle] = useState('professional');
  const [bios, setBios] = useState<string[]>([]);
  const { toast } = useToast();

  const generateBios = () => {
    if (!name.trim() || !profession.trim()) {
      toast({
        title: "Error",
        description: "Please enter name and profession",
        variant: "destructive",
      });
      return;
    }

    const templates = {
      professional: [
        `${name} | ${profession} | Passionate about innovation and excellence`,
        `${profession} with a vision | ${name} | Building the future`,
        `${name} - ${profession} | Helping others succeed | Let's connect`,
        `Professional ${profession} | ${name} | Dedicated to making a difference`,
      ],
      creative: [
        `${name} ✨ ${profession} by day, dreamer by night 🌙`,
        `Creating magic as a ${profession} | ${name} | Living my best life 🚀`,
        `${name} 🎨 ${profession} | Turning ideas into reality 💡`,
        `Just a ${profession} trying to make the world more beautiful | ${name} 🌟`,
      ],
      minimal: [
        `${name} | ${profession}`,
        `${profession} | ${name}`,
        `${name} - ${profession}`,
        `${profession}`,
      ],
      fun: [
        `${name} 🎉 ${profession} | Coffee enthusiast ☕ | Making things happen`,
        `Professional ${profession} (kinda) | ${name} | Living the dream! 🌈`,
        `${name} | ${profession} | Pizza lover 🍕 | Let's create something awesome!`,
        `${profession} by day, superhero by night 🦸 | ${name}`,
      ],
    };

    const selected = templates[style as keyof typeof templates] || templates.professional;
    setBios(selected);
    
    toast({
      title: "Generated!",
      description: `${selected.length} bios created`,
    });
  };

  const copyBio = (bio: string) => {
    navigator.clipboard.writeText(bio);
    toast({
      title: "Copied!",
      description: "Bio copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Bio Generator - Social Media Bio Creator | ILoveJPG"
        description="Generate creative bios for Instagram, Twitter, LinkedIn, and TikTok. Create the perfect social media bio in seconds."
        keywords="bio generator, instagram bio, twitter bio, social media bio, profile bio"
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Bio Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white">
              <div className="flex items-center gap-3">
                <User className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Bio Generator</CardTitle>
                  <p className="text-sm opacity-90">Create perfect social media bios</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Profession/Title</label>
                  <Input
                    value={profession}
                    onChange={(e) => setProfession(e.target.value)}
                    placeholder="e.g., Designer, Developer, Artist"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Style</label>
                  <Select value={style} onValueChange={setStyle}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="creative">Creative</SelectItem>
                      <SelectItem value="minimal">Minimal</SelectItem>
                      <SelectItem value="fun">Fun</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <Button onClick={generateBios} className="w-full bg-gradient-to-r from-violet-500 to-fuchsia-500">
                <User className="w-4 h-4 mr-2" />
                Generate Bios
              </Button>
              
              {bios.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Generated Bios</h3>
                  {bios.map((bio, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gradient-to-r from-violet-50 to-fuchsia-50 dark:from-violet-900/20 dark:to-fuchsia-900/20 rounded-lg flex items-start justify-between gap-3"
                    >
                      <p className="flex-1">{bio}</p>
                      <Button onClick={() => copyBio(bio)} variant="outline" size="sm">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Bio Generator">
            <p className="text-muted-foreground">
              Generate creative and professional bios for your social media profiles.
              Perfect for Instagram, Twitter, LinkedIn, TikTok, and more. Choose different styles to match your personality!
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
