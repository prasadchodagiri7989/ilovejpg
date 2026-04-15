// src/pages/pdf/CSVtoJSON.tsx

import React, { useState, useRef } from "react";
import { Table, Download, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";
import Papa from 'papaparse';

export const CSVtoJSON = () => {
  const [csvContent, setCsvContent] = useState('');
  const [jsonContent, setJsonContent] = useState('');
  const [fileName, setFileName] = useState('data.json');
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
      setFileName(file.name.replace(/\.csv$/i, '.json'));
      convertToJSON(content);
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const convertToJSON = (csv: string = csvContent) => {
    if (!csv.trim()) {
      toast({
        title: "No content",
        description: "Please load a CSV file or enter CSV content first",
        variant: "destructive",
      });
      return;
    }

    try {
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const jsonString = JSON.stringify(results.data, null, 2);
          setJsonContent(jsonString);
          toast({
            title: "Conversion successful",
            description: `Converted ${results.data.length} rows to JSON`,
          });
        },
        error: (error) => {
          throw error;
        }
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "There was an error converting the CSV. Please check the format.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const downloadJSON = () => {
    if (!jsonContent) {
      toast({
        title: "No content to download",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "File downloaded",
      description: "Your JSON file has been downloaded",
    });
  };

  const clearContent = () => {
    setCsvContent('');
    setJsonContent('');
    setFileName('data.json');
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
            <BreadcrumbPage>CSV to JSON</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="h-6 w-6" />
            Convert CSV to JSON
          </CardTitle>
          <CardDescription>
            Upload CSV files or paste CSV content and convert to JSON
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 hover:border-primary transition-colors">
            <Table className="h-12 w-12 text-gray-400 mb-4" />
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
              placeholder="Paste your CSV content here...&#10;Example:&#10;name,age,city&#10;John,25,New York&#10;Jane,30,London"
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {csvContent && !jsonContent && (
            <div className="flex justify-end">
              <Button onClick={() => convertToJSON()} size="sm">
                Convert to JSON
              </Button>
            </div>
          )}

          {jsonContent && (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">Generated JSON</label>
                <Textarea
                  value={jsonContent}
                  readOnly
                  className="min-h-[200px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={clearContent} size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button onClick={downloadJSON} size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download JSON
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title="How to Convert CSV to JSON">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select CSV File' to upload a CSV file, or paste CSV content directly</li>
              <li>Click 'Convert to JSON' to process the data</li>
              <li>Review the generated JSON in the preview area</li>
              <li>Click 'Download JSON' to save the file</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload CSV files or paste CSV data</li>
              <li>Automatically detects headers</li>
              <li>Converts to properly formatted JSON array</li>
              <li>Client-side processing - your data never leaves your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
