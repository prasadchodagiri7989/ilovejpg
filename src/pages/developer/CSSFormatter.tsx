import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Palette, Copy, FileCode } from 'lucide-react';
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

export default function CSSFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const formatCSS = () => {
    if (!input.trim()) {
      toast({ title: "Error", description: "Please enter CSS code to format", variant: "destructive" });
      return;
    }

    try {
      let formatted = input
        .replace(/\s*{\s*/g, ' {\n  ')
        .replace(/\s*}\s*/g, '\n}\n\n')
        .replace(/\s*;\s*/g, ';\n  ')
        .replace(/\s*,\s*/g, ', ')
        .replace(/:\s*/g, ': ')
        .trim();
      
      setOutput(formatted);
      toast({ title: "Success", description: "CSS formatted successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to format CSS", variant: "destructive" });
    }
  };

  const minifyCSS = () => {
    if (!input.trim()) {
      toast({ title: "Error", description: "Please enter CSS code to minify", variant: "destructive" });
      return;
    }

    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}:;,])\s*/g, '$1')
      .trim();
    
    setOutput(minified);
    toast({ title: "Success", description: "CSS minified successfully!" });
  };

  const copyToClipboard = () => {
    if (!output) {
      toast({ title: "Error", description: "No formatted CSS to copy", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(output);
    toast({ title: "Copied!", description: "Formatted CSS copied to clipboard" });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CSS Formatter",
    "description": "Format and beautify CSS code online with proper indentation and minification",
    "applicationCategory": "DeveloperApplication"
  };

  return (
    <>
      <SEO
        title="CSS Formatter - Beautify & Minify CSS Code Online"
        description="Format, beautify, and minify CSS code online. Free CSS formatter with syntax organization, indentation control, and instant formatting."
        keywords="css formatter, beautify css, minify css, format css online, css beautifier, css optimizer"
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
                <BreadcrumbPage>CSS Formatter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center gap-3">
                <Palette className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">CSS Formatter</CardTitle>
                  <p className="text-sm text-purple-100">Format, beautify, and minify CSS code</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input CSS</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder=".container{margin:0;padding:10px}"
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button onClick={formatCSS} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <FileCode className="w-4 h-4 mr-2" />
                  Format CSS
                </Button>
                <Button onClick={minifyCSS} variant="outline">
                  Minify CSS
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

          <GuidanceSection title="About CSS Formatter">
            <p className="text-muted-foreground">
              Format and beautify your CSS code instantly. Paste minified or messy stylesheets and get clean, properly indented CSS.
              Perfect for front-end developers and web designers.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
