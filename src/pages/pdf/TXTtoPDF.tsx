// src/pages/pdf/TXTtoPDF.tsx

import React, { useState, useRef } from "react";
import { FileText, Download, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";
import jsPDF from 'jspdf';

export const TXTtoPDF = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [fileName, setFileName] = useState('document.pdf');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.txt')) {
      toast({
        title: "Only TXT files are supported",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setTextContent(content);
      setFileName(file.name.replace(/\.txt$/i, '.pdf'));
      toast({
        title: "Text file loaded",
        description: "You can now convert it to PDF",
      });
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const convertToPDF = () => {
    if (!textContent.trim()) {
      toast({
        title: "No content",
        description: "Please load a text file or enter text content first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const pdf = new jsPDF('p', 'mm', 'a4');
      const lines = pdf.splitTextToSize(textContent, 170);
      
      let y = 20;
      lines.forEach((line: string) => {
        if (y > 280) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(line, 20, y);
        y += 7;
      });

      pdf.save(fileName);

      toast({
        title: "PDF created successfully",
        description: "Your file has been downloaded",
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "There was an error creating the PDF. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const clearContent = () => {
    setTextContent('');
    setFileName('document.pdf');
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
              <Link to="/tools/pdf">PDF Tools</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>TXT to PDF</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Convert TXT to PDF
          </CardTitle>
          <CardDescription>
            Upload text files or paste text content and convert to PDF
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 hover:border-primary transition-colors">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt"
              onChange={handleFileChange}
              className="hidden"
              id="txt-upload"
            />
            <label htmlFor="txt-upload" className="cursor-pointer">
              <Button variant="default" disabled={isLoading} asChild>
                <span>
                  <Plus className="mr-2 h-4 w-4" />
                  Select TXT File
                </span>
              </Button>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              or paste text content below
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Text Content</label>
            <Textarea
              value={textContent}
              onChange={(e) => setTextContent(e.target.value)}
              placeholder="Paste your text content here..."
              className="min-h-[300px] font-mono text-sm"
            />
          </div>

          {textContent && (
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={clearContent} size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear
              </Button>
              <Button onClick={convertToPDF} size="sm" disabled={isLoading}>
                <Download className="mr-2 h-4 w-4" />
                {isLoading ? "Converting..." : "Convert to PDF"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title="How to Convert TXT to PDF">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select TXT File' to upload a text file, or paste text content directly</li>
              <li>Review the text content in the text area</li>
              <li>Click 'Convert to PDF' to generate your PDF</li>
              <li>The PDF will be automatically downloaded</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload TXT files or paste plain text</li>
              <li>Automatic text wrapping and pagination</li>
              <li>Preserves line breaks and formatting</li>
              <li>Client-side processing - your content never leaves your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
