import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Hash, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function TextToHex() {
  const [textInput, setTextInput] = useState('');
  const [hexOutput, setHexOutput] = useState('');
  const { toast } = useToast();

  const textToHex = (text: string): string => {
    return text
      .split('')
      .map(char => char.charCodeAt(0).toString(16).padStart(2, '0'))
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

    const hex = textToHex(textInput);
    setHexOutput(hex);
    toast({
      title: "Success",
      description: "Text converted to hexadecimal successfully!",
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hexOutput);
    toast({
      title: "Copied!",
      description: "Hexadecimal copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Text to Hex Converter - Free Online Tool | ILoveJPG"
        description="Convert text to hexadecimal (hex) instantly. Free online text to hex converter for encoding text data."
        keywords="text to hex, hex converter, hexadecimal encoder, text encoder"
      />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Text to Hex</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
              <div className="flex items-center gap-3">
                <Hash className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Text to Hex Converter</CardTitle>
                  <p className="text-sm opacity-90">Convert text to hexadecimal</p>
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
                <Button onClick={convert} className="bg-gradient-to-r from-orange-500 to-amber-500">
                  <Hash className="w-4 h-4 mr-2" />
                  Convert to Hex
                </Button>
                {hexOutput && (
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>
              
              {hexOutput && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hexadecimal Output</label>
                  <Textarea
                    value={hexOutput}
                    readOnly
                    className="min-h-[150px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
                  />
                  <p className="text-xs text-muted-foreground">
                    Each character is converted to its hexadecimal (base-16) representation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Text to Hex Converter">
            <p className="text-muted-foreground">
              Convert text to hexadecimal (base-16) format. Each character is converted to its hex representation.
              Perfect for color codes, memory addresses, and low-level programming.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
