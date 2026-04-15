import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Link2, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function URLEncoder() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const { toast } = useToast();

  const encode = () => {
    if (!input) {
      toast({ title: "Error", description: "Please enter text to encode", variant: "destructive" });
      return;
    }
    const encoded = encodeURIComponent(input);
    setOutput(encoded);
    toast({ title: "Success", description: "URL encoded successfully!" });
  };

  const copyToClipboard = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast({ title: "Copied!", description: "Encoded URL copied to clipboard" });
  };

  return (
    <>
      <SEO title="URL Encoder - Encode URLs Online" description="Encode URLs and query strings online. Free URL encoding tool for web developers." keywords="url encoder, encode url, url encoding online" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>URL Encoder</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <Link2 className="w-8 h-8" />
                <div><CardTitle className="text-2xl">URL Encoder</CardTitle><p className="text-sm text-violet-100">Encode URLs and query parameters</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2"><label className="text-sm font-medium">Input Text/URL</label><Textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text or URL to encode..." className="min-h-[150px]" /></div>
              <div className="flex gap-3"><Button onClick={encode} className="bg-gradient-to-r from-violet-500 to-purple-500"><Link2 className="w-4 h-4 mr-2" />Encode URL</Button><Button onClick={copyToClipboard} variant="outline"><Copy className="w-4 h-4 mr-2" />Copy</Button></div>
              {output && (<div className="space-y-2"><label className="text-sm font-medium">Encoded Output</label><Textarea value={output} readOnly className="min-h-[150px] font-mono text-sm bg-gray-50 dark:bg-gray-800" /></div>)}
            </CardContent>
          </Card>
          <GuidanceSection title="About URL Encoding">
            <p className="text-muted-foreground">
              URL encoding converts special characters into percent-encoded format for safe transmission in URLs.
              Perfect for building query strings and API parameters.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
