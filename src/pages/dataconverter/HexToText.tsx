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

export default function HexToText() {
  const [hexInput, setHexInput] = useState('');
  const [textOutput, setTextOutput] = useState('');
  const { toast } = useToast();

  const hexToText = (hex: string): string => {
    // Remove any non-hex characters and split by spaces or every 2 characters
    const cleaned = hex.replace(/[^0-9A-Fa-f\s]/g, '');
    const bytes = cleaned.includes(' ') 
      ? cleaned.split(/\s+/).filter(b => b)
      : cleaned.match(/.{1,2}/g) || [];
    
    return bytes
      .map(byte => String.fromCharCode(parseInt(byte, 16)))
      .join('');
  };

  const convert = () => {
    if (!hexInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter hexadecimal code to convert",
        variant: "destructive",
      });
      return;
    }

    try {
      const text = hexToText(hexInput);
      if (!text) {
        throw new Error('Invalid hex');
      }
      setTextOutput(text);
      toast({
        title: "Success",
        description: "Hexadecimal converted to text successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid hexadecimal format",
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
        title="Hex to Text Converter - Free Online Tool | ILoveJPG"
        description="Convert hexadecimal (hex) to text instantly. Free online hex to text decoder for decoding hex data."
        keywords="hex to text, hex decoder, hexadecimal converter, text decoder"
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
                <BreadcrumbPage>Hex to Text</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
              <div className="flex items-center gap-3">
                <Hash className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Hex to Text Converter</CardTitle>
                  <p className="text-sm opacity-90">Decode hexadecimal to readable text</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Hexadecimal Input</label>
                <Textarea
                  value={hexInput}
                  onChange={(e) => setHexInput(e.target.value)}
                  placeholder="48 65 6c 6c 6f"
                  className="min-h-[150px] font-mono text-sm"
                />
                <p className="text-xs text-muted-foreground">
                  Enter hexadecimal code (space-separated or continuous)
                </p>
              </div>
              
              <div className="flex gap-3">
                <Button onClick={convert} className="bg-gradient-to-r from-pink-500 to-rose-500">
                  <Hash className="w-4 h-4 mr-2" />
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
          
          <GuidanceSection title="About Hex to Text Converter">
            <p className="text-muted-foreground">
              Decode hexadecimal back to readable text. Supports both space-separated and continuous hex input.
              Perfect for decoding hex data, debugging, and working with encoded messages.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
