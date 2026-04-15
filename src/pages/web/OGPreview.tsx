import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Share2, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function OGPreview() {
  const [title, setTitle] = useState('Your Page Title');
  const [description, setDescription] = useState('Your page description will appear here. Make it engaging and informative!');
  const [imageUrl, setImageUrl] = useState('https://via.placeholder.com/1200x630/4F46E5/ffffff?text=Preview+Image');
  const [url, setUrl] = useState('https://yourwebsite.com');
  const { toast } = useToast();

  const generateOGTags = () => {
    const tags = `<!-- Open Graph Meta Tags -->
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${imageUrl}">
<meta property="og:url" content="${url}">
<meta property="og:type" content="website">

<!-- Twitter Card Meta Tags -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${description}">
<meta name="twitter:image" content="${imageUrl}">`;

    navigator.clipboard.writeText(tags);
    toast({
      title: "Copied!",
      description: "Open Graph tags copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Open Graph Preview - Social Media Share Preview | ILoveJPG"
        description="Preview how your website will look when shared on Facebook, Twitter, and LinkedIn. Generate Open Graph meta tags."
        keywords="open graph preview, og tags, social media preview, facebook preview"
      />
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Open Graph Preview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
              <div className="flex items-center gap-3">
                <Share2 className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Open Graph Preview</CardTitle>
                  <p className="text-sm opacity-90">Preview social media sharing appearance</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
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
                    placeholder="Your page description"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Image URL</label>
                  <Input
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground">Recommended: 1200x630 pixels</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">URL</label>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://yourwebsite.com"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Preview</h3>
                <div className="border rounded-lg overflow-hidden bg-white dark:bg-gray-800">
                  <img 
                    src={imageUrl} 
                    alt="Preview" 
                    className="w-full h-64 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1200x630/4F46E5/ffffff?text=Invalid+Image+URL';
                    }}
                  />
                  <div className="p-4">
                    <p className="text-xs text-gray-500 uppercase mb-1">{new URL(url).hostname}</p>
                    <h3 className="font-bold text-lg mb-1 line-clamp-2">{title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{description}</p>
                  </div>
                </div>
              </div>
              
              <Button onClick={generateOGTags} className="w-full bg-gradient-to-r from-pink-500 to-rose-500">
                <Share2 className="w-4 h-4 mr-2" />
                Copy Open Graph Tags
              </Button>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Open Graph Preview">
            <p className="text-muted-foreground">
              Preview how your website will appear when shared on social media platforms like Facebook, Twitter, and LinkedIn.
              Generate and copy Open Graph meta tags to optimize your social media sharing appearance.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
