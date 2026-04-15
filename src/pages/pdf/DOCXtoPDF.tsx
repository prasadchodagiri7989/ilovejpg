// src/pages/pdf/DOCXtoPDF.tsx

import React, { useState, useRef } from "react";
import { FileText, Download, Trash2, Plus, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";

export const DOCXtoPDF = () => {
  const [files, setFiles] = useState<Array<{ file: File; name: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const validFiles = Array.from(selectedFiles).filter(file =>
      file.name.toLowerCase().endsWith('.docx') || file.name.toLowerCase().endsWith('.doc')
    );

    if (validFiles.length === 0) {
      toast({
        title: "Only DOCX/DOC files are supported",
        variant: "destructive",
      });
      return;
    }

    const newFiles = validFiles.map(file => ({
      file,
      name: file.name.replace(/\.(docx|doc)$/i, '.pdf')
    }));

    setFiles(prev => [...prev, ...newFiles]);
    toast({
      title: `${newFiles.length} file(s) added`,
      description: "Note: Actual conversion requires server-side processing",
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
    toast({ title: "File removed" });
  };

  const clearAll = () => {
    setFiles([]);
    toast({ title: "All files cleared" });
  };

  const simulateDownload = (index: number) => {
    toast({
      title: "Conversion not available",
      description: "This requires server-side processing or external API. File selected for processing.",
      variant: "default",
    });
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
              <Link to="/tools/pdf">PDF Tools</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>DOCX to PDF</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          DOCX to PDF conversion requires server-side processing or external libraries. This interface demonstrates the file handling workflow.
        </AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Convert DOCX to PDF
          </CardTitle>
          <CardDescription>
            Upload DOCX files for conversion to PDF format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 hover:border-primary transition-colors">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept=".docx,.doc"
              onChange={handleFileChange}
              multiple
              className="hidden"
              id="docx-upload"
            />
            <label htmlFor="docx-upload" className="cursor-pointer">
              <Button variant="default" asChild>
                <span>
                  <Plus className="mr-2 h-4 w-4" />
                  Select DOCX Files
                </span>
              </Button>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              or drag and drop DOCX files here
            </p>
          </div>

          {files.length > 0 && (
            <>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={clearAll} size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear All
                </Button>
              </div>

              <div className="space-y-3">
                {files.map((file, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div className="flex-1 truncate">
                          <p className="text-sm font-medium">{file.file.name}</p>
                          <p className="text-xs text-gray-500">Will convert to: {file.name}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFile(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="default"
                            size="sm"
                            onClick={() => simulateDownload(index)}
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title="About DOCX to PDF Conversion">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Implementation Note:</h4>
            <p className="text-sm text-muted-foreground">
              Full DOCX to PDF conversion requires server-side processing using libraries like LibreOffice, 
              Pandoc, or cloud services like Google Docs API. This interface demonstrates the file handling workflow 
              that would be connected to such a backend service.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload multiple DOCX/DOC files</li>
              <li>File validation and preview</li>
              <li>Ready for backend integration</li>
              <li>Clean and intuitive interface</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
