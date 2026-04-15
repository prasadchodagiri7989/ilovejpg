import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Lock, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function Base64Encoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const encode = () => {
    if (!input) {
      toast({ title: "Error", description: "Please enter text to encode", variant: "destructive" });
      return;
    }
    try {
      const encoded = btoa(input);
      setOutput(encoded);
      toast({ title: "Success", description: "Text encoded successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Failed to encode", variant: "destructive" });
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: "Copied!", description: "Encoded text copied to clipboard" });
  };

  return (
    <>
      <SEO title="Base64 Encoder - Encode Text to Base64 Online" description="Encode text to Base64 format online. Free, fast, and secure Base64 encoding tool." keywords="base64 encoder, encode base64, base64 converter" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Base64 Encoder</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
              <div className="flex items-center gap-3">
                <Lock className="w-8 h-8" />
                <div><CardTitle className="text-2xl">Base64 Encoder</CardTitle><p className="text-sm text-blue-100">Encode text to Base64 format</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2"><label className="text-sm font-medium">Input Text</label><Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text to encode..." className="min-h-[150px]" /></div>
              <div className="flex gap-3"><Button onClick={encode} className="bg-gradient-to-r from-blue-500 to-cyan-500"><Lock className="w-4 h-4 mr-2" />Encode to Base64</Button><Button onClick={copyToClipboard} variant="outline"><Copy className="w-4 h-4 mr-2" />Copy</Button></div>
              {output && (<div className="space-y-2"><label className="text-sm font-medium">Base64 Output</label><Textarea value={output} readOnly className="min-h-[150px] font-mono text-sm bg-gray-50 dark:bg-gray-800" /></div>)}
            </CardContent>
          </Card>
          <GuidanceSection title="About Base64 Encoding">
            <p className="text-muted-foreground">
              Base64 encoding converts binary data into ASCII text format. Perfect for encoding images, API tokens, and data for safe transmission in HTML, CSS, or JSON.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
