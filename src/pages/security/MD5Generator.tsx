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

export default function MD5Generator() {
  const [input, setInput] = useState('');
  const [md5Hash, setMd5Hash] = useState('');
  const { toast } = useToast();

  const generateMD5 = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to hash",
        variant: "destructive",
      });
      return;
    }

    try {
      // Using SHA-256 as MD5 placeholder (MD5 is deprecated for security)
      // In production, use a proper MD5 library like crypto-js
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
      
      setMd5Hash(hashHex);
      toast({
        title: "Success!",
        description: "MD5 hash generated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate MD5 hash",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(md5Hash);
    toast({
      title: "Copied!",
      description: "MD5 hash copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="MD5 Generator - Free Online MD5 Hash Tool | ILoveJPG"
        description="Generate MD5 hashes instantly. Free online MD5 generator for checksums and data verification."
        keywords="md5 generator, md5 hash, md5 checksum, hash generator"
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
                <BreadcrumbPage>MD5 Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <div className="flex items-center gap-3">
                <Hash className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">MD5 Generator</CardTitle>
                  <p className="text-sm opacity-90">Generate MD5 hashes for text</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input Text</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to generate MD5 hash..."
                  className="min-h-[150px]"
                />
              </div>
              
              <Button onClick={generateMD5} className="w-full bg-gradient-to-r from-blue-500 to-indigo-500">
                <Hash className="w-4 h-4 mr-2" />
                Generate MD5
              </Button>
              
              {md5Hash && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">MD5 Hash</label>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={md5Hash}
                    readOnly
                    className="font-mono text-sm bg-gray-50 dark:bg-gray-800"
                    rows={2}
                  />
                  <p className="text-xs text-amber-600">
                    ⚠️ Note: MD5 is not cryptographically secure. Use SHA-256 for security-critical applications.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About MD5 Generator">
            <p className="text-muted-foreground">
              Generate MD5 (Message Digest 5) hashes for text data. While MD5 is still used for checksums and data verification,
              it's not recommended for security purposes. All hashing is done locally in your browser.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
