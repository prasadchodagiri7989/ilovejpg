import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Code, Copy, FileCode } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function JSONtoXML() {
  const [jsonInput, setJsonInput] = useState('');
  const [xmlOutput, setXmlOutput] = useState('');
  const { toast } = useToast();

  const jsonToXml = (obj: any, rootName: string = 'root'): string => {
    const convertValue = (value: any, key: string): string => {
      if (value === null || value === undefined) {
        return `<${key}/>`;
      }
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        const inner = Object.entries(value)
          .map(([k, v]) => convertValue(v, k))
          .join('');
        return `<${key}>${inner}</${key}>`;
      }
      
      if (Array.isArray(value)) {
        return value.map(item => convertValue(item, key)).join('');
      }
      
      return `<${key}>${String(value)}</${key}>`;
    };

    const entries = Object.entries(obj)
      .map(([key, value]) => convertValue(value, key))
      .join('');
    
    return `<?xml version="1.0" encoding="UTF-8"?>\n<${rootName}>\n${entries}\n</${rootName}>`;
  };

  const convert = () => {
    if (!jsonInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter JSON data",
        variant: "destructive",
      });
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const xml = jsonToXml(parsed);
      setXmlOutput(xml);
      toast({
        title: "Success",
        description: "JSON converted to XML successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(xmlOutput);
    toast({
      title: "Copied!",
      description: "XML copied to clipboard",
    });
  };

  const downloadXML = () => {
    const blob = new Blob([xmlOutput], { type: 'text/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title="JSON to XML Converter - Free Online Tool | ILoveJPG"
        description="Convert JSON data to XML format instantly. Free online JSON to XML converter with download option."
        keywords="json to xml, json converter, xml converter, data converter"
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-red-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>JSON to XML</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center gap-3">
                <FileCode className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">JSON to XML Converter</CardTitle>
                  <p className="text-sm opacity-90">Convert JSON data to XML format</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">JSON Input</label>
                <Textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder='{"name": "John", "age": 30}'
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
              
              <div className="flex gap-3">
                <Button onClick={convert} className="bg-gradient-to-r from-purple-500 to-pink-500">
                  <Code className="w-4 h-4 mr-2" />
                  Convert to XML
                </Button>
                {xmlOutput && (
                  <>
                    <Button onClick={copyToClipboard} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button onClick={downloadXML} variant="outline">
                      Download XML
                    </Button>
                  </>
                )}
              </div>
              
              {xmlOutput && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">XML Output</label>
                  <Textarea
                    value={xmlOutput}
                    readOnly
                    className="min-h-[200px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About JSON to XML Converter">
            <p className="text-muted-foreground">
              Convert JSON data to XML format instantly. Perfect for data transformation, API integration, and cross-platform compatibility.
              Supports nested objects and arrays.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
