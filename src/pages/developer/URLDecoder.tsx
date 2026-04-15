import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Link2Off, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function URLDecoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const decode = () => {
    if (!input) {
      toast({ title: "Error", description: "Please enter text to decode", variant: "destructive" });
      return;
    }
    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      toast({ title: "Success", description: "URL decoded successfully!" });
    } catch (error) {
      toast({ title: "Error", description: "Invalid URL encoding", variant: "destructive" });
    }
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: "Copied!", description: "Decoded text copied to clipboard" });
  };

  return (
    <>
      <SEO title="URL Decoder - Decode URLs Online" description="Decode URL-encoded strings online. Free URL decoding tool for developers." keywords="url decoder, decode url, url decoding online" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>URL Decoder</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
              <div className="flex items-center gap-3">
                <Link2Off className="w-8 h-8" />
                <div><CardTitle className="text-2xl">URL Decoder</CardTitle><p className="text-sm text-pink-100">Decode URL-encoded strings</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2"><label className="text-sm font-medium">Encoded Input</label><Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter URL-encoded text..." className="min-h-[150px] font-mono" /></div>
              <div className="flex gap-3"><Button onClick={decode} className="bg-gradient-to-r from-pink-500 to-rose-500"><Link2Off className="w-4 h-4 mr-2" />Decode URL</Button><Button onClick={copyToClipboard} variant="outline"><Copy className="w-4 h-4 mr-2" />Copy</Button></div>
              {output && (<div className="space-y-2"><label className="text-sm font-medium">Decoded Output</label><Textarea value={output} readOnly className="min-h-[150px] bg-gray-50 dark:bg-gray-800" /></div>)}
            </CardContent>
          </Card>
          <GuidanceSection title="About URL Decoding">
            <p className="text-muted-foreground">
              URL decoding converts percent-encoded characters back to their original form.
              Perfect for reading URL parameters and processing form data.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
