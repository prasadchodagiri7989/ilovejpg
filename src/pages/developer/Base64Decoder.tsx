import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Unlock, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function Base64Decoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const decode = () => {
    if (!input) {
      toast({ title: "Error", description: "Please enter Base64 to decode", variant: "destructive" });
      return;
    }
    try {
      const decoded = atob(input.trim());
      setOutput(decoded);
      toast({ title: "Success", description: "Base64 decoded successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Invalid Base64 string", variant: "destructive" });
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: "Copied!", description: "Decoded text copied to clipboard" });
  };

  return (
    <>
      <SEO title="Base64 Decoder - Decode Base64 to Text Online" description="Decode Base64 encoded text online. Free, fast, and secure Base64 decoding tool." keywords="base64 decoder, decode base64, base64 converter" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Base64 Decoder</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white">
              <div className="flex items-center gap-3">
                <Unlock className="w-8 h-8" />
                <div><CardTitle className="text-2xl">Base64 Decoder</CardTitle><p className="text-sm text-cyan-100">Decode Base64 to text</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2"><label className="text-sm font-medium">Base64 Input</label><Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter Base64 to decode..." className="min-h-[150px] font-mono" /></div>
              <div className="flex gap-3"><Button onClick={decode} className="bg-gradient-to-r from-cyan-500 to-teal-500"><Unlock className="w-4 h-4 mr-2" />Decode Base64</Button><Button onClick={copyToClipboard} variant="outline"><Copy className="w-4 h-4 mr-2" />Copy</Button></div>
              {output && (<div className="space-y-2"><label className="text-sm font-medium">Decoded Output</label><Textarea value={output} readOnly className="min-h-[150px] bg-gray-50 dark:bg-gray-800" /></div>)}
            </CardContent>
          </Card>
          <GuidanceSection title="About Base64 Decoding">
            <p className="text-muted-foreground">
              Base64 decoding converts Base64-encoded ASCII text back to its original format. Perfect for reading encoded data and debugging.
              Essential tool for developers working with APIs and data processing.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
