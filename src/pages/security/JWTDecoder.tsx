import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Key, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function JWTDecoder() {
  const [jwt, setJwt] = useState('');
  const [decoded, setDecoded] = useState<{
    header: any;
    payload: any;
    signature: string;
  } | null>(null);
  const { toast } = useToast();

  const decodeJWT = () => {
    if (!jwt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a JWT token",
        variant: "destructive",
      });
      return;
    }

    try {
      const parts = jwt.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format');
      }

      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      const signature = parts[2];

      setDecoded({ header, payload, signature });
      toast({
        title: "Success!",
        description: "JWT decoded successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JWT token format",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${type} copied to clipboard`,
    });
  };

  return (
    <>
      <SEO 
        title="JWT Decoder - Decode JSON Web Tokens | ILoveJPG"
        description="Decode and inspect JWT tokens. Free online JWT decoder for debugging and analyzing JSON Web Tokens."
        keywords="jwt decoder, json web token, jwt debugger, token decoder"
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>JWT Decoder</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <Key className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">JWT Decoder</CardTitle>
                  <p className="text-sm opacity-90">Decode and inspect JSON Web Tokens</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">JWT Token</label>
                <Textarea
                  value={jwt}
                  onChange={(e) => setJwt(e.target.value)}
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
                  className="min-h-[120px] font-mono text-sm"
                />
              </div>
              
              <Button onClick={decodeJWT} className="w-full bg-gradient-to-r from-violet-500 to-purple-500">
                <Key className="w-4 h-4 mr-2" />
                Decode JWT
              </Button>
              
              {decoded && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Header</label>
                      <Button 
                        onClick={() => copyToClipboard(JSON.stringify(decoded.header, null, 2), 'Header')} 
                        variant="outline" 
                        size="sm"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <Textarea
                      value={JSON.stringify(decoded.header, null, 2)}
                      readOnly
                      className="font-mono text-sm bg-violet-50 dark:bg-violet-900/20"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Payload</label>
                      <Button 
                        onClick={() => copyToClipboard(JSON.stringify(decoded.payload, null, 2), 'Payload')} 
                        variant="outline" 
                        size="sm"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <Textarea
                      value={JSON.stringify(decoded.payload, null, 2)}
                      readOnly
                      className="font-mono text-sm bg-purple-50 dark:bg-purple-900/20"
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium">Signature</label>
                      <Button 
                        onClick={() => copyToClipboard(decoded.signature, 'Signature')} 
                        variant="outline" 
                        size="sm"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                      </Button>
                    </div>
                    <Textarea
                      value={decoded.signature}
                      readOnly
                      className="font-mono text-sm bg-fuchsia-50 dark:bg-fuchsia-900/20"
                      rows={2}
                    />
                  </div>

                  <p className="text-xs text-amber-600">
                    ⚠️ Note: This tool only decodes the JWT. It does NOT verify the signature.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About JWT Decoder">
            <p className="text-muted-foreground">
              Decode JSON Web Tokens (JWT) to inspect header, payload, and signature components.
              Perfect for debugging authentication tokens and API responses. All decoding is done locally in your browser for security.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
