import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Code, Copy, FileCode } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function HTMLFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const formatHTML = () => {
    if (!input.trim()) {
      toast({ title: "Error", description: "Please enter HTML code to format", variant: "destructive" });
      return;
    }

    try {
      const formatted = beautifyHTML(input);
      setOutput(formatted);
      toast({ title: "Success", description: "HTML formatted successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to format HTML", variant: "destructive" });
    }
  };

  const beautifyHTML = (html: string): string => {
    let formatted = '';
    let indent = 0;
    const tab = '  ';
    
    html.split(/(<[^>]+>)/g).forEach(element => {
      if (element.match(/^<\/\w/)) {
        indent--;
      }
      
      if (element.trim()) {
        formatted += tab.repeat(Math.max(0, indent)) + element.trim() + '\n';
      }
      
      if (element.match(/^<\w[^>]*[^\/]>$/)) {
        indent++;
      }
    });
    
    return formatted.trim();
  };

  const minifyHTML = () => {
    if (!input.trim()) {
      toast({ title: "Error", description: "Please enter HTML code to minify", variant: "destructive" });
      return;
    }

    const minified = input.replace(/\s+/g, ' ').replace(/>\s+</g, '><').trim();
    setOutput(minified);
    toast({ title: "Success", description: "HTML minified successfully!" });
  };

  const copyToClipboard = () => {
    if (!output) {
      toast({ title: "Error", description: "No formatted HTML to copy", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(output);
    toast({ title: "Copied!", description: "Formatted HTML copied to clipboard" });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "HTML Formatter",
    "description": "Format and beautify HTML code online with indentation, minification, and syntax highlighting",
    "applicationCategory": "DeveloperApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <>
      <SEO
        title="HTML Formatter - Beautify & Minify HTML Code Online"
        description="Format, beautify, and minify HTML code online. Free HTML formatter with syntax highlighting, indentation control, and instant preview. Perfect for developers."
        keywords="html formatter, beautify html, minify html, format html online, html beautifier, html code formatter"
        structuredData={structuredData}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>HTML Formatter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <div className="flex items-center gap-3">
                <FileCode className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">HTML Formatter</CardTitle>
                  <p className="text-sm text-orange-100">Format, beautify, and minify HTML code</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input HTML</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="<div><p>Paste your HTML here...</p></div>"
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button onClick={formatHTML} className="bg-gradient-to-r from-orange-500 to-red-500">
                  <Code className="w-4 h-4 mr-2" />
                  Format HTML
                </Button>
                <Button onClick={minifyHTML} variant="outline">
                  Minify HTML
                </Button>
                <Button onClick={copyToClipboard} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Output
                </Button>
              </div>

              {output && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Formatted Output</label>
                  <Textarea
                    value={output}
                    readOnly
                    className="min-h-[200px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          <GuidanceSection title="About HTML Formatter">
            <p className="text-muted-foreground">
              Format and beautify your HTML code instantly. Paste minified or messy HTML and get clean, properly indented code.
              Perfect for developers working with web pages and HTML templates.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
