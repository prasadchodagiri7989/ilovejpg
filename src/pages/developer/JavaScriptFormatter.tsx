import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Code2, Copy, Sparkles } from 'lucide-react';
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

export default function JavaScriptFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const formatJS = () => {
    if (!input.trim()) {
      toast({ title: "Error", description: "Please enter JavaScript code to format", variant: "destructive" });
      return;
    }

    try {
      // Basic JS formatting
      let formatted = input
        .replace(/\s*{\s*/g, ' {\n  ')
        .replace(/\s*}\s*/g, '\n}\n')
        .replace(/\s*;\s*/g, ';\n  ')
        .replace(/\)\s*{/g, ') {')
        .trim();
      
      setOutput(formatted);
      toast({ title: "Success", description: "JavaScript formatted successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to format JavaScript", variant: "destructive" });
    }
  };

  const minifyJS = () => {
    if (!input.trim()) {
      toast({ title: "Error", description: "Please enter JavaScript code to minify", variant: "destructive" });
      return;
    }

    const minified = input
      .replace(/\/\/.*/g, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .replace(/\s*([{}();,:])\s*/g, '$1')
      .trim();
    
    setOutput(minified);
    toast({ title: "Success", description: "JavaScript minified successfully!" });
  };

  const copyToClipboard = () => {
    if (!output) {
      toast({ title: "Error", description: "No formatted JavaScript to copy", variant: "destructive" });
      return;
    }
    navigator.clipboard.writeText(output);
    toast({ title: "Copied!", description: "Formatted JavaScript copied to clipboard" });
  };

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JavaScript Formatter",
    "description": "Format and beautify JavaScript code online with proper indentation and minification",
    "applicationCategory": "DeveloperApplication"
  };

  return (
    <>
      <SEO
        title="JavaScript Formatter - Beautify & Minify JS Code Online"
        description="Format, beautify, and minify JavaScript code online. Free JavaScript formatter with syntax organization and instant formatting."
        keywords="javascript formatter, beautify js, minify javascript, format js online, js beautifier"
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
                <BreadcrumbPage>JavaScript Formatter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
              <div className="flex items-center gap-3">
                <Code2 className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">JavaScript Formatter</CardTitle>
                  <p className="text-sm text-yellow-100">Format, beautify, and minify JavaScript code</p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input JavaScript</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="function example(){console.log('Hello');}"
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>

              <div className="flex gap-3 flex-wrap">
                <Button onClick={formatJS} className="bg-gradient-to-r from-yellow-500 to-orange-500">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Format JavaScript
                </Button>
                <Button onClick={minifyJS} variant="outline">
                  Minify JavaScript
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

          <GuidanceSection title="About JavaScript Formatter">
            <p className="text-muted-foreground">
              Format and beautify your JavaScript code instantly. Paste minified or messy JavaScript and get clean, properly indented code.
              Perfect for JavaScript and TypeScript developers.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
