import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Hash, Copy, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function UUIDGenerator() {
  const [uuid, setUuid] = useState('');
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState<string[]>([]);
  const { toast } = useToast();

  const generateUUID = () => {
    const newUUID = crypto.randomUUID();
    setUuid(newUUID);
    toast({ title: "Success", description: "UUID generated!" });
  };

  const generateMultiple = () => {
    const generated = Array.from({ length: count }, () => crypto.randomUUID());
    setUuids(generated);
    toast({ title: "Success", description: `${count} UUIDs generated!` });
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied!", description: "UUID copied to clipboard" });
  };

  return (
    <>
      <SEO title="UUID Generator - Generate Random UUIDs Online" description="Generate random UUIDs (Universally Unique Identifiers) online. Free UUID generator for developers." keywords="uuid generator, generate uuid, random uuid, guid generator" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>UUID Generator</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
              <div className="flex items-center gap-3">
                <Hash className="w-8 h-8" />
                <div><CardTitle className="text-2xl">UUID Generator</CardTitle><p className="text-sm text-emerald-100">Generate random UUIDs instantly</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <Button onClick={generateUUID} className="bg-gradient-to-r from-emerald-500 to-teal-500 w-full"><RefreshCw className="w-4 h-4 mr-2" />Generate Single UUID</Button>
                {uuid && (
                  <div className="flex gap-2"><Input value={uuid} readOnly className="font-mono" /><Button onClick={() => copyToClipboard(uuid)} variant="outline"><Copy className="w-4 h-4" /></Button></div>
                )}
              </div>
              <div className="border-t pt-4 space-y-3">
                <label className="text-sm font-medium">Generate Multiple UUIDs</label>
                <div className="flex gap-2"><Input type="number" min="1" max="100" value={count} onChange={(e) => setCount(Number(e.target.value))} placeholder="Count" /><Button onClick={generateMultiple} className="bg-gradient-to-r from-emerald-500 to-teal-500">Generate</Button></div>
                {uuids.length > 0 && (
                  <div className="space-y-2 max-h-[300px] overflow-y-auto">
                    {uuids.map((id, i) => (
                      <div key={i} className="flex gap-2"><Input value={id} readOnly className="font-mono text-sm" /><Button onClick={() => copyToClipboard(id)} variant="outline" size="sm"><Copy className="w-3 h-3" /></Button></div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
          <GuidanceSection title="About UUID Generator">
            <p className="text-muted-foreground">
              Generate random UUIDs (Universally Unique Identifiers) for databases, APIs, and distributed systems.
              Perfect for creating unique identifiers for primary keys and session IDs.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
