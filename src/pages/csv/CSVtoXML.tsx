// src/pages/pdf/CSVtoXML.tsx

import React, { useState, useRef } from "react";
import { FileCode, Download, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";
import Papa from 'papaparse';

export const CSVtoXML = () => {
  const [csvContent, setCsvContent] = useState('');
  const [xmlContent, setXmlContent] = useState('');
  const [fileName, setFileName] = useState('data.xml');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.csv')) {
      toast({
        title: "Only CSV files are supported",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setCsvContent(content);
      setFileName(file.name.replace(/\.csv$/i, '.xml'));
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

  const convertToXML = (csv: string = csvContent) => {
    if (!csv.trim()) {
      toast({
        title: "No content",
        description: "Please load a CSV file or enter CSV content first",
        variant: "destructive",
      });
      return;
    }

    try {
      const parsed = Papa.parse(csv, { header: true });
      const data = parsed.data;

      if (data.length === 0) {
        throw new Error("CSV is empty");
      }

      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<root>\n';

      data.forEach((row: any) => {
        xml += '  <row>\n';
        Object.entries(row).forEach(([key, value]) => {
          const sanitizedKey = key.trim().replace(/[^a-zA-Z0-9_]/g, '_');
          xml += `    <${sanitizedKey}>${escapeXml(String(value))}</${sanitizedKey}>\n`;
        });
        xml += '  </row>\n';
      });

      xml += '</root>';
      setXmlContent(xml);

      toast({
        title: "Conversion successful",
        description: `Converted ${data.length} rows to XML`,
      });
    } catch (error: any) {
      toast({
        title: "Conversion failed",
        description: error.message || "Failed to convert CSV to XML",
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
    setCsvContent('');
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
            <BreadcrumbPage>CSV to XML</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileCode className="h-6 w-6" />
            Convert CSV to XML
          </CardTitle>
          <CardDescription>
            Upload CSV files or paste CSV content and convert to XML format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 hover:border-primary transition-colors">
            <FileCode className="h-12 w-12 text-gray-400 mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
              id="csv-upload"
            />
            <label htmlFor="csv-upload" className="cursor-pointer">
              <Button variant="default" asChild>
                <span>
                  <Plus className="mr-2 h-4 w-4" />
                  Select CSV File
                </span>
              </Button>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              or paste CSV content below
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">CSV Content</label>
            <Textarea
              value={csvContent}
              onChange={(e) => setCsvContent(e.target.value)}
              placeholder='Paste your CSV content here...&#10;Example:&#10;Name,Age,City&#10;John,25,New York&#10;Jane,30,London'
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {csvContent && !xmlContent && (
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

      <GuidanceSection title="How to Convert CSV to XML">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select CSV File' to upload a CSV file, or paste CSV content directly</li>
              <li>Click 'Convert to XML' to process the data</li>
              <li>Review the generated XML in the preview area</li>
              <li>Click 'Download XML' to save the file</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload CSV files or paste CSV data</li>
              <li>Automatically extracts headers as XML tags</li>
              <li>Properly escapes XML special characters</li>
              <li>Client-side processing - your data never leaves your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
