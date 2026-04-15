// src/pages/pdf/PDFtoTXT.tsx

import React, { useState, useRef } from "react";
import { FileText, Download, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";
import * as pdfjsLib from 'pdfjs-dist';

pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const PDFtoTXT = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<Array<{ fileName: string; text: string; blobUrl: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const validFiles = Array.from(selectedFiles).filter(file =>
      file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")
    );

    if (validFiles.length === 0) {
      toast({
        title: "Only PDF files are supported",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const newFiles: any[] = [];

      for (const file of validFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        let fullText = '';
        
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const textContent = await page.getTextContent();
          const pageText = textContent.items.map((item: any) => item.str).join(' ');
          fullText += `\n--- Page ${pageNum} ---\n${pageText}\n`;
        }

        const blob = new Blob([fullText], { type: 'text/plain' });
        const blobUrl = URL.createObjectURL(blob);
        
        newFiles.push({
          fileName: file.name.replace(/\.pdf$/i, '.txt'),
          text: fullText,
          blobUrl
        });
      }

      setFiles(prev => [...prev, ...newFiles]);
      toast({
        title: `${newFiles.length} file(s) converted`,
        description: "You can now download them as TXT",
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "There was an error extracting text. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(files[index].blobUrl);
    setFiles(files.filter((_, i) => i !== index));
    toast({ title: "File removed" });
  };

  const clearAll = () => {
    files.forEach(f => URL.revokeObjectURL(f.blobUrl));
    setFiles([]);
    toast({ title: "All files cleared" });
  };

  const downloadFile = (index: number) => {
    const link = document.createElement('a');
    link.href = files[index].blobUrl;
    link.download = files[index].fileName;
    link.click();
  };

  const downloadAll = () => {
    files.forEach((file, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = file.blobUrl;
        link.download = file.fileName;
        link.click();
      }, index * 100);
    });

    toast({
      title: "Downloading all files",
      description: `${files.length} file(s) will be downloaded`,
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
            <BreadcrumbPage>PDF to TXT</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Convert PDF to TXT
          </CardTitle>
          <CardDescription>
            Extract text content from PDF files and save as plain text
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 hover:border-primary transition-colors">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              multiple
              className="hidden"
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload" className="cursor-pointer">
              <Button variant="default" disabled={isLoading} asChild>
                <span>
                  <Plus className="mr-2 h-4 w-4" />
                  {isLoading ? "Converting..." : "Select PDF Files"}
                </span>
              </Button>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              or drag and drop PDF files here
            </p>
          </div>

          {files.length > 0 && (
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={clearAll} size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
              <Button onClick={downloadAll} size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download All ({files.length})
              </Button>
            </div>
          )}

          {files.length > 0 && (
            <div className="space-y-3">
              {files.map((file, index) => (
                <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm font-medium truncate flex-1">
                        {file.fileName}
                      </span>
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
                          onClick={() => downloadFile(index)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded max-h-32 overflow-auto">
                      <pre className="text-xs whitespace-pre-wrap">
                        {file.text.substring(0, 500)}
                        {file.text.length > 500 && '...'}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title="How to Convert PDF to TXT">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select PDF Files' or drag and drop PDF files</li>
              <li>Wait for text extraction to complete</li>
              <li>Preview the extracted text content</li>
              <li>Download individual files or all at once</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Extract text from multiple PDFs at once</li>
              <li>Preserves page structure with page markers</li>
              <li>Plain text format for easy editing</li>
              <li>Client-side processing - your files never leave your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
