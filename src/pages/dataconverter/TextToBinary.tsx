import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Binary, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function TextToBinary() {
  const [textInput, setTextInput] = useState('');
  const [binaryOutput, setBinaryOutput] = useState('');
  const { toast } = useToast();

  const textToBinary = (text: string): string => {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const convert = () => {
    if (!textInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to convert",
        variant: "destructive",
      });
      return;
    }

    const binary = textToBinary(textInput);
    setBinaryOutput(binary);
    toast({
      title: "Success",
      description: "Text converted to binary successfully!",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(binaryOutput);
    toast({
      title: "Copied!",
      description: "Binary copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Text to Binary Converter - Free Online Tool | ILoveJPG"
        description="Convert text to binary code instantly. Free online text to binary converter for encoding text data."
        keywords="text to binary, binary converter, binary encoder, text encoder"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Text to Binary</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <div className="flex items-center gap-3">
                <Binary className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Text to Binary Converter</CardTitle>
                  <p className="text-sm opacity-90">Convert text to binary code</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Text Input</label>
                <Textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter text to convert..."
                  className="min-h-[150px]"
                />
              </div>
              
              <div className="flex gap-3">
                <Button onClick={convert} className="bg-gradient-to-r from-green-500 to-emerald-500">
                  <Binary className="w-4 h-4 mr-2" />
                  Convert to Binary
                </Button>
                {binaryOutput && (
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>
              
              {binaryOutput && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Binary Output</label>
                  <Textarea
                    value={binaryOutput}
                    readOnly
                    className="min-h-[150px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
                  />
                  <p className="text-xs text-muted-foreground">
                    Each character is converted to its 8-bit binary representation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Text to Binary Converter">
            <p className="text-muted-foreground">
              Convert text to binary (base-2) format. Each character is converted to its 8-bit binary representation.
              Perfect for learning binary, data encoding, and computer science education.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
