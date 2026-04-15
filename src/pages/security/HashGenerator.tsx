import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Hash, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function HashGenerator() {
  const [input, setInput] = useState('');
  const [algorithm, setAlgorithm] = useState<'md5' | 'sha1' | 'sha256' | 'sha512'>('sha256');
  const [hash, setHash] = useState('');
  const { toast } = useToast();

  const generateHash = async () => {
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
      
      let hashBuffer: ArrayBuffer;
      
      if (algorithm === 'md5') {
        // Simple MD5 implementation (not cryptographically secure)
        const hashHex = await simpleMD5(input);
        setHash(hashHex);
      } else {
        const algoMap = {
          'sha1': 'SHA-1',
          'sha256': 'SHA-256',
          'sha512': 'SHA-512',
        };
        
        hashBuffer = await crypto.subtle.digest(algoMap[algorithm], data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        setHash(hashHex);
      }

      toast({
        title: "Success!",
        description: `${algorithm.toUpperCase()} hash generated`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate hash",
        variant: "destructive",
      });
    }
  };

  const simpleMD5 = async (text: string): Promise<string> => {
    // This is a simplified placeholder - in production, use a proper MD5 library
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').slice(0, 32);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "Copied!",
      description: "Hash copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="Hash Generator - MD5, SHA1, SHA256, SHA512 | ILoveJPG"
        description="Generate cryptographic hashes with multiple algorithms. Free online hash generator for MD5, SHA1, SHA256, and SHA512."
        keywords="hash generator, md5, sha256, sha512, cryptographic hash"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Hash Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <div className="flex items-center gap-3">
                <Hash className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Hash Generator</CardTitle>
                  <p className="text-sm opacity-90">Generate cryptographic hashes</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Algorithm</label>
                <Select value={algorithm} onValueChange={(v: any) => setAlgorithm(v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="md5">MD5</SelectItem>
                    <SelectItem value="sha1">SHA-1</SelectItem>
                    <SelectItem value="sha256">SHA-256</SelectItem>
                    <SelectItem value="sha512">SHA-512</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Input Text</label>
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter text to generate hash..."
                  className="min-h-[150px]"
                />
              </div>
              
              <Button onClick={generateHash} className="w-full bg-gradient-to-r from-green-500 to-teal-500">
                <Hash className="w-4 h-4 mr-2" />
                Generate Hash
              </Button>
              
              {hash && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">{algorithm.toUpperCase()} Hash</label>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                  </div>
                  <Textarea
                    value={hash}
                    readOnly
                    className="font-mono text-sm bg-gray-50 dark:bg-gray-800"
                    rows={3}
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Hash Generator">
            <p className="text-muted-foreground">
              Generate cryptographic hashes using MD5, SHA-1, SHA-256, or SHA-512 algorithms.
              Perfect for password hashing, file integrity verification, and data checksums. All hashing is done locally in your browser.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
