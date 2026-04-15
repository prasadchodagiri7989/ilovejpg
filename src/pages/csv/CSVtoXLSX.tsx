// src/pages/pdf/CSVtoXLSX.tsx

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
import * as XLSX from 'xlsx';

export const CSVtoXLSX = () => {
  const [csvContent, setCsvContent] = useState('');
  const [fileName, setFileName] = useState('data.xlsx');
  const [rowCount, setRowCount] = useState(0);
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
      setFileName(file.name.replace(/\.csv$/i, '.xlsx'));
      
      // Parse to show row count
      Papa.parse(content, {
        complete: (results) => {
          setRowCount(results.data.length);
        }
      });
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const convertToXLSX = () => {
    if (!csvContent.trim()) {
      toast({
        title: "No content",
        description: "Please load a CSV file or enter CSV content first",
        variant: "destructive",
      });
      return;
    }

    try {
      // Parse CSV
      const parsed = Papa.parse(csvContent, { header: true });
      const data = parsed.data;

      // Create workbook and worksheet
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

      // Generate XLSX file
      XLSX.writeFile(workbook, fileName);

      toast({
        title: "Conversion successful",
        description: `Converted ${data.length} rows to XLSX`,
      });
    } catch (error: any) {
      toast({
        title: "Conversion failed",
        description: error.message || "Failed to convert CSV to XLSX",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const clearContent = () => {
    setCsvContent('');
    setFileName('data.xlsx');
    setRowCount(0);
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
            <BreadcrumbPage>CSV to XLSX</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Table className="h-6 w-6" />
            Convert CSV to XLSX
          </CardTitle>
          <CardDescription>
            Upload CSV files or paste CSV content and convert to Excel XLSX format
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
              placeholder='Paste your CSV content here...&#10;Example:&#10;Name,Age,City&#10;John,25,New York&#10;Jane,30,London'
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {rowCount > 0 && (
            <div className="text-sm text-muted-foreground">
              {rowCount} rows detected
            </div>
          )}

          {csvContent && (
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={clearContent} size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button onClick={convertToXLSX} size="sm">
                <Download className="mr-2 h-4 w-4" />
                Convert & Download XLSX
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title="How to Convert CSV to XLSX">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select CSV File' to upload a CSV file, or paste CSV content directly</li>
              <li>Review the detected row count</li>
              <li>Click 'Convert & Download XLSX' to generate and download the Excel file</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload CSV files or paste CSV data</li>
              <li>Automatically detects headers</li>
              <li>Creates Excel-compatible XLSX files</li>
              <li>Client-side processing - your data never leaves your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
