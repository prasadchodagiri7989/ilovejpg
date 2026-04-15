// src/pages/pdf/XLSXtoJSON.tsx

import React, { useState, useRef } from "react";
import { Table, Download, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";
import * as XLSX from 'xlsx';

export const XLSXtoJSON = () => {
  const [jsonContent, setJsonContent] = useState('');
  const [fileName, setFileName] = useState('data.json');
  const [originalFileName, setOriginalFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const ext = file.name.toLowerCase();
    if (!ext.endsWith('.xlsx') && !ext.endsWith('.xls')) {
      toast({
        title: "Only Excel files are supported",
        description: "Please upload .xlsx or .xls files",
        variant: "destructive",
      });
      return;
    }

    setOriginalFileName(file.name);
    setFileName(file.name.replace(/\.(xlsx|xls)$/i, '.json'));

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = e.target?.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        
        // Get first sheet
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        const json = JSON.stringify(jsonData, null, 2);
        setJsonContent(json);
        
        toast({
          title: "File loaded successfully",
          description: `Converted ${jsonData.length} rows from sheet: ${firstSheetName}`,
        });
      } catch (error: any) {
        toast({
          title: "Conversion failed",
          description: error.message || "Failed to read Excel file",
          variant: "destructive",
        });
        console.error(error);
      }
    };
    reader.readAsBinaryString(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
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
    setJsonContent('');
    setFileName('data.json');
    setOriginalFileName('');
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
            <BreadcrumbPage>XLSX to JSON</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="h-6 w-6" />
            Convert XLSX to JSON
          </CardTitle>
          <CardDescription>
            Upload Excel files (XLSX/XLS) and convert to JSON format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 hover:border-primary transition-colors">
            <Table className="h-12 w-12 text-gray-400 mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileChange}
              className="hidden"
              id="xlsx-upload"
            />
            <label htmlFor="xlsx-upload" className="cursor-pointer">
              <Button variant="default" asChild>
                <span>
                  <Plus className="mr-2 h-4 w-4" />
                  Select Excel File
                </span>
              </Button>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Supports .xlsx and .xls files
            </p>
          </div>

          {originalFileName && (
            <div className="text-sm text-muted-foreground">
              File: {originalFileName}
            </div>
          )}

          {jsonContent && (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">Generated JSON</label>
                <Textarea
                  value={jsonContent}
                  readOnly
                  className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
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

      <GuidanceSection title="How to Convert XLSX to JSON">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select Excel File' to upload an XLSX or XLS file</li>
              <li>The first sheet will be automatically converted to JSON</li>
              <li>Review the generated JSON in the preview area</li>
              <li>Click 'Download JSON' to save the file</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Supports both .xlsx (modern Excel) and .xls (legacy Excel) files</li>
              <li>Automatically converts the first sheet to JSON array</li>
              <li>Preserves column headers as object keys</li>
              <li>Client-side processing - your data never leaves your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
