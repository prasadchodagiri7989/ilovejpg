import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Code, Copy, FileJson } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function XMLtoJSON() {
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const { toast } = useToast();

  const xmlToJson = (xml: string): any => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    
    const parseError = xmlDoc.querySelector('parsererror');
    if (parseError) {
      throw new Error('Invalid XML');
    }

    const parseNode = (node: any): any => {
      if (node.nodeType === 3) { // Text node
        return node.nodeValue.trim();
      }

      const obj: any = {};
      
      // Handle attributes
      if (node.attributes && node.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let i = 0; i < node.attributes.length; i++) {
          obj['@attributes'][node.attributes[i].name] = node.attributes[i].value;
        }
      }

      // Handle child nodes
      if (node.childNodes && node.childNodes.length > 0) {
        for (let i = 0; i < node.childNodes.length; i++) {
          const child = node.childNodes[i];
          const nodeName = child.nodeName;

          if (child.nodeType === 3) {
            const text = child.nodeValue.trim();
            if (text) {
              return text;
            }
            continue;
          }

          if (obj[nodeName]) {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(parseNode(child));
          } else {
            obj[nodeName] = parseNode(child);
          }
        }
      }

      return obj;
    };

    return parseNode(xmlDoc.documentElement);
  };

  const convert = () => {
    if (!xmlInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter XML data",
        variant: "destructive",
      });
      return;
    }

    try {
      const json = xmlToJson(xmlInput);
      setJsonOutput(JSON.stringify(json, null, 2));
      toast({
        title: "Success",
        description: "XML converted to JSON successfully!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Invalid XML format",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(jsonOutput);
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard",
    });
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <SEO 
        title="XML to JSON Converter - Free Online Tool | ILoveJPG"
        description="Convert XML data to JSON format instantly. Free online XML to JSON converter with download option."
        keywords="xml to json, xml converter, json converter, data converter"
      />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>XML to JSON</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
              <div className="flex items-center gap-3">
                <FileJson className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">XML to JSON Converter</CardTitle>
                  <p className="text-sm opacity-90">Convert XML data to JSON format</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">XML Input</label>
                <Textarea
                  value={xmlInput}
                  onChange={(e) => setXmlInput(e.target.value)}
                  placeholder='<root><name>John</name><age>30</age></root>'
                  className="min-h-[200px] font-mono text-sm"
                />
              </div>
              
              <div className="flex gap-3">
                <Button onClick={convert} className="bg-gradient-to-r from-teal-500 to-cyan-500">
                  <Code className="w-4 h-4 mr-2" />
                  Convert to JSON
                </Button>
                {jsonOutput && (
                  <>
                    <Button onClick={copyToClipboard} variant="outline">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy
                    </Button>
                    <Button onClick={downloadJSON} variant="outline">
                      Download JSON
                    </Button>
                  </>
                )}
              </div>
              
              {jsonOutput && (
                <div className="space-y-2">
                  <label className="text-sm font-medium">JSON Output</label>
                  <Textarea
                    value={jsonOutput}
                    readOnly
                    className="min-h-[200px] font-mono text-sm bg-gray-50 dark:bg-gray-800"
                  />
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About XML to JSON Converter">
            <p className="text-muted-foreground">
              Convert XML data to JSON format instantly. Perfect for modern web applications, API responses, and data processing.
              Preserves XML structure and attributes.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
