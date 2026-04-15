// src/pages/pdf/JSONtoXML.tsx

import React, { useState, useRef } from "react";
import { FileCode, Download, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";

export const JSONtoXML = () => {
  const [jsonContent, setJsonContent] = useState('');
  const [xmlContent, setXmlContent] = useState('');
  const [fileName, setFileName] = useState('data.xml');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.json')) {
      toast({
        title: "Only JSON files are supported",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setJsonContent(content);
      setFileName(file.name.replace(/\.json$/i, '.xml'));
      convertToXML(content);
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const escapeXml = (text: string): string => {
    return String(text)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  };

  const convertToXML = (json: string = jsonContent) => {
    if (!json.trim()) {
      toast({
        title: "No content",
        description: "Please load a JSON file or enter JSON content first",
        variant: "destructive",
      });
      return;
    }

    try {
      const data = JSON.parse(json);
      
      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';

      if (Array.isArray(data)) {
        data.forEach((item: any) => {
          xml += '  <item>\n';
          if (typeof item === 'object' && item !== null) {
            Object.entries(item).forEach(([key, value]) => {
              const sanitizedKey = key.trim().replace(/[^a-zA-Z0-9_]/g, '_');
              xml += `    <${sanitizedKey}>${escapeXml(String(value))}</${sanitizedKey}>\n`;
            });
          } else {
            xml += `    <value>${escapeXml(String(item))}</value>\n`;
          }
          xml += '  </item>\n';
        });
      } else if (typeof data === 'object' && data !== null) {
        Object.entries(data).forEach(([key, value]) => {
          const sanitizedKey = key.trim().replace(/[^a-zA-Z0-9_]/g, '_');
          xml += `  <${sanitizedKey}>${escapeXml(String(value))}</${sanitizedKey}>\n`;
        });
      } else {
        xml += `  <value>${escapeXml(String(data))}</value>\n`;
      }

      xml += '</root>';
      setXmlContent(xml);
      
      toast({
        title: "Conversion successful",
        description: "JSON converted to XML",
      });
    } catch (error: any) {
      toast({
        title: "Conversion failed",
        description: error.message || "Invalid JSON format. Please check your data.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const downloadXML = () => {
    if (!xmlContent) {
      toast({
        title: "No content to download",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "File downloaded",
      description: "Your XML file has been downloaded",
    });
  };

  const clearContent = () => {
    setJsonContent('');
    setXmlContent('');
    setFileName('data.xml');
    toast({ title: "Content cleared" });
  };

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/tools/spreadsheet">Spreadsheet Tools</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>JSON to XML</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-6 w-6" />
            Convert JSON to XML
          </CardTitle>
          <CardDescription>
            Upload JSON files or paste JSON content and convert to XML format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 hover:border-primary transition-colors">
            <FileCode className="h-12 w-12 text-gray-400 mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
              id="json-upload"
            />
            <label htmlFor="json-upload" className="cursor-pointer">
              <Button variant="default" asChild>
                <span>
                  <Plus className="mr-2 h-4 w-4" />
                  Select JSON File
                </span>
              </Button>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              or paste JSON content below
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">JSON Content</label>
            <Textarea
              value={jsonContent}
              onChange={(e) => setJsonContent(e.target.value)}
              placeholder='Paste your JSON content here...&#10;Example:&#10;[&#10;  {"name": "John", "age": 25, "city": "New York"},&#10;  {"name": "Jane", "age": 30, "city": "London"}&#10;]'
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {jsonContent && !xmlContent && (
            <div className="flex justify-end">
              <Button onClick={() => convertToXML()} size="sm">
                Convert to XML
              </Button>
            </div>
          )}

          {xmlContent && (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">Generated XML</label>
                <Textarea
                  value={xmlContent}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={clearContent} size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button onClick={downloadXML} size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download XML
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title="How to Convert JSON to XML">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select JSON File' to upload a JSON file, or paste JSON content directly</li>
              <li>Click 'Convert to XML' to process the data</li>
              <li>Review the generated XML in the preview area</li>
              <li>Click 'Download XML' to save the file</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload JSON files or paste JSON data</li>
              <li>Supports arrays, objects, and primitive values</li>
              <li>Properly escapes XML special characters</li>
              <li>Client-side processing - your data never leaves your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
