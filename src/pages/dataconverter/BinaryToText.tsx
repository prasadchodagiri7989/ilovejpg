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

export default function BinaryToText() {
  const [binaryInput, setBinaryInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const { toast } = useToast();

  const binaryToText = (binary: string): string => {
    // Remove any non-binary characters and split by spaces or every 8 characters
    const cleaned = binary.replace(/[^01\s]/g, '');
    const bytes = cleaned.includes(' ') 
      ? cleaned.split(/\s+/).filter(b => b)
      : cleaned.match(/.{1,8}/g) || [];
    
    return bytes
      .map(byte => String.fromCharCode(parseInt(byte, 2)))
      .join('');
  };

  const convert = () => {
    if (!binaryInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter binary code to convert",
        variant: "destructive",
      });
      return;
    }

    try {
      const text = binaryToText(binaryInput);
      if (!text) {
        throw new Error('Invalid binary');
      }
      setTextOutput(text);
      toast({
        title: "Success",
        description: "Binary converted to text successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid binary format",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(textOutput);
    toast({
      title: "Copied!",
      description: "Text copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Binary to Text Converter - Free Online Tool | ILoveJPG"
        description="Convert binary code to text instantly. Free online binary to text decoder for decoding binary data."
        keywords="binary to text, binary decoder, binary converter, text decoder"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Binary to Text</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <div className="flex items-center gap-3">
                <Binary className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Binary to Text Converter</CardTitle>
                  <p className="text-sm opacity-90">Decode binary to readable text</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Binary Input</label>
                <Textarea
                  value={binaryInput}
                  onChange={(e) => setBinaryInput(e.target.value)}
                  placeholder="01001000 01100101 01101100 01101100 01101111"
                  className="min-h-[150px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Enter binary code (space-separated or continuous)
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={convert} className="bg-gradient-to-r from-blue-500 to-indigo-500">
                  <Binary className="w-4 h-4 mr-2" />
                  Convert to Text
                </Button>
                {textOutput && (
                  <Button onClick={copyToClipboard} variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                )}
              </div>
              
              {textOutput && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">Text Output</label>
                  <Textarea
                    value={textOutput}
                    readOnly
                    className="min-h-[150px] bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Binary to Text Converter">
            <p className="text-muted-foreground">
              Decode binary code back to readable text. Supports both space-separated and continuous binary input.
              Perfect for decoding binary messages and learning computer fundamentals.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
