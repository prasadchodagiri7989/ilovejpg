import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Code, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function MetaTagGenerator() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [metaTags, setMetaTags] = useState('');
  const { toast } = useToast();

  const generateMetaTags = () => {
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a page title",
        variant: "destructive",
      });
      return;
    }

    const tags = `<!-- Basic Meta Tags -->
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
${description ? `<meta name="description" content="${description}">` : ''}
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}
${author ? `<meta name="author" content="${author}">` : ''}

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:title" content="${title}">
${description ? `<meta property="og:description" content="${description}">` : ''}

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
${description ? `<meta name="twitter:description" content="${description}">` : ''}`;

    setMetaTags(tags);
    toast({
      title: "Generated!",
      description: "Meta tags generated successfully",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(metaTags);
    toast({
      title: "Copied!",
      description: "Meta tags copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Meta Tag Generator - SEO Meta Tags | ILoveJPG"
        description="Generate SEO-friendly meta tags for your website. Create Open Graph, Twitter Card, and basic HTML meta tags instantly."
        keywords="meta tag generator, seo meta tags, open graph, twitter cards"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Meta Tag Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <div className="flex items-center gap-3">
                <Code className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Meta Tag Generator</CardTitle>
                  <p className="text-sm opacity-90">Generate SEO meta tags for your website</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Page Title *</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Your Page Title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of your page (150-160 characters recommended)"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Keywords</label>
                  <Input
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Author</label>
                  <Input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Your Name or Company"
                  />
                </div>
              </div>
              
              <Button onClick={generateMetaTags} className="w-full bg-gradient-to-r from-blue-500 to-cyan-500">
                <Code className="w-4 h-4 mr-2" />
                Generate Meta Tags
              </Button>
              
              {metaTags && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Generated Meta Tags</label>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={metaTags}
                    readOnly
                    className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Meta Tag Generator">
            <p className="text-muted-foreground">
              Generate SEO-friendly meta tags including Open Graph and Twitter Card tags.
              Perfect for improving search engine visibility and social media sharing. Paste the generated tags in your HTML head section.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
