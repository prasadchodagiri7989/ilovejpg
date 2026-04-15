import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Eye, Code } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function HTMLPreview() {
  const [html, setHtml] = useState('<h1>Hello World!</h1>\n<p>Preview your HTML here.</p>');
  const { toast } = useToast();

  const renderPreview = () => {
    try {
      return { __html: html };
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid HTML",
        variant: "destructive",
      });
      return { __html: '' };
    }
  };

  return (
    <>
      <SEO 
        title="HTML Preview - Live HTML Renderer | ILoveJPG"
        description="Preview HTML code in real-time. Test and render HTML instantly with live preview."
        keywords="html preview, html renderer, test html, html viewer"
      />
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>HTML Preview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-6xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-amber-500 to-orange-500 text-white">
              <div className="flex items-center gap-3">
                <Eye className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">HTML Preview</CardTitle>
                  <p className="text-sm opacity-90">Live HTML renderer and preview</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <label className="text-sm font-medium">HTML Code</label>
                  </div>
                  <Textarea
                    value={html}
                    onChange={(e) => setHtml(e.target.value)}
                    placeholder="Enter HTML code..."
                    className="min-h-[500px] font-mono text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4" />
                    <label className="text-sm font-medium">Live Preview</label>
                  </div>
                  <div 
                    className="min-h-[500px] border rounded-lg p-4 bg-white dark:bg-gray-900 overflow-auto"
                    dangerouslySetInnerHTML={renderPreview()}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About HTML Preview">
            <p className="text-muted-foreground">
              Preview HTML code in real-time as you type. Perfect for testing HTML snippets, debugging layout issues, and quick prototyping.
              The preview updates automatically as you edit your code.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
