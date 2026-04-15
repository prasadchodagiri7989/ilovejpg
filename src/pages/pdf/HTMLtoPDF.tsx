// src/pages/pdf/HTMLtoPDF.tsx

import React, { useState, useRef } from "react";
import { FileText, Download, Trash2, Plus, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";
import jsPDF from 'jspdf';

export const HTMLtoPDF = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [fileName, setFileName] = useState('document.pdf');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.html')) {
      toast({
        title: "Only HTML files are supported",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      setHtmlContent(content);
      setFileName(file.name.replace(/\.html$/i, '.pdf'));
      toast({
        title: "HTML file loaded",
        description: "You can now convert it to PDF",
      });
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const convertToPDF = () => {
    if (!htmlContent.trim()) {
      toast({
        title: "No content",
        description: "Please load an HTML file or enter HTML content first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Create a temporary div to render the HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = htmlContent;
      tempDiv.style.padding = '20px';
      tempDiv.style.fontFamily = 'Arial, sans-serif';
      tempDiv.style.fontSize = '12px';
      tempDiv.style.lineHeight = '1.6';
      document.body.appendChild(tempDiv);

      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Get text content (simplified conversion)
      const text = tempDiv.innerText || tempDiv.textContent || '';
      const lines = pdf.splitTextToSize(text, 170);
      
      let y = 20;
      lines.forEach((line: string) => {
        if (y > 280) {
          pdf.addPage();
          y = 20;
        }
        pdf.text(line, 20, y);
        y += 7;
      });

      // Clean up
      document.body.removeChild(tempDiv);

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
    setHtmlContent('');
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
            <BreadcrumbPage>HTML to PDF</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            Convert HTML to PDF
          </CardTitle>
          <CardDescription>
            Upload HTML files or paste HTML content and convert to PDF
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 hover:border-primary transition-colors">
            <Code className="h-12 w-12 text-gray-400 mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept=".html,.htm"
              onChange={handleFileChange}
              className="hidden"
              id="html-upload"
            />
            <label htmlFor="html-upload" className="cursor-pointer">
              <Button variant="default" disabled={isLoading} asChild>
                <span>
                  <Plus className="mr-2 h-4 w-4" />
                  Select HTML File
                </span>
              </Button>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              or paste HTML content below
            </p>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">HTML Content</label>
            <Textarea
              value={htmlContent}
              onChange={(e) => setHtmlContent(e.target.value)}
              placeholder="Paste your HTML content here..."
              className="min-h-[300px] font-mono text-sm"
            />
          </div>

          {htmlContent && (
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

      <GuidanceSection title="How to Convert HTML to PDF">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select HTML File' to upload an HTML file, or paste HTML content directly</li>
              <li>Review the HTML content in the text area</li>
              <li>Click 'Convert to PDF' to generate your PDF</li>
              <li>The PDF will be automatically downloaded</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload HTML files or paste HTML code</li>
              <li>Text-based conversion to PDF</li>
              <li>Automatic page breaks</li>
              <li>Client-side processing - your content never leaves your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
