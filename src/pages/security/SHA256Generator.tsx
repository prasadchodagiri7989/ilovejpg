import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Shield, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function SHA256Generator() {
  const [input, setInput] = useState('');
  const [sha256Hash, setSha256Hash] = useState('');
  const { toast } = useToast();

  const generateSHA256 = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Please enter text to hash",
        variant: "destructive",
      });
      return;
    }

    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(input);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      setSha256Hash(hashHex);
      toast({
        title: "Success!",
        description: "SHA-256 hash generated",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate SHA-256 hash",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(sha256Hash);
    toast({
      title: "Copied!",
      description: "SHA-256 hash copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="SHA-256 Generator - Free Online SHA256 Hash Tool | ILoveJPG"
        description="Generate SHA-256 hashes securely. Free online SHA-256 generator for cryptographic hashing and password security."
        keywords="sha256 generator, sha-256 hash, secure hash, cryptographic hash"
      />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>SHA-256 Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-green-500 text-white">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">SHA-256 Generator</CardTitle>
                  <p className="text-sm opacity-90">Generate secure SHA-256 hashes</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Input Text</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to generate SHA-256 hash..."
                  className="min-h-[150px]"
                />
              </div>
              
              <Button onClick={generateSHA256} className="w-full bg-gradient-to-r from-emerald-500 to-green-500">
                <Shield className="w-4 h-4 mr-2" />
                Generate SHA-256
              </Button>
              
              {sha256Hash && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">SHA-256 Hash</label>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={sha256Hash}
                    readOnly
                    className="font-mono text-sm bg-gray-50 dark:bg-gray-800"
                    rows={3}
                  />
                  <p className="text-xs text-green-600">
                    ✓ SHA-256 is cryptographically secure and recommended for security applications
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About SHA-256 Generator">
            <p className="text-muted-foreground">
              Generate SHA-256 (Secure Hash Algorithm 256-bit) hashes for secure data verification and cryptographic applications.
              SHA-256 is widely used in blockchain, SSL certificates, and secure password storage. All hashing is done locally in your browser.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
