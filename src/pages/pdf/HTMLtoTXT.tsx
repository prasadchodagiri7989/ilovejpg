// src/pages/pdf/HTMLtoTXT.tsx

import React, { useState, useRef } from "react";
import { Code, Download, Trash2, Plus, FileText } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";

export const HTMLtoTXT = () => {
  const [htmlContent, setHtmlContent] = useState('');
  const [txtContent, setTxtContent] = useState('');
  const [fileName, setFileName] = useState('document.txt');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.name.toLowerCase().endsWith('.html') && !file.name.toLowerCase().endsWith('.htm')) {
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
      setFileName(file.name.replace(/\.(html|htm)$/i, '.txt'));
      convertToText(content);
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const convertToText = (html: string = htmlContent) => {
    if (!html.trim()) {
      toast({
        title: "No content",
        description: "Please load an HTML file or enter HTML content first",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a temporary div to parse HTML
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      
      // Extract text content
      const text = tempDiv.innerText || tempDiv.textContent || '';
      
      setTxtContent(text);
      
      toast({
        title: "Conversion successful",
        description: "HTML has been converted to plain text",
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "There was an error converting the HTML. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const downloadTXT = () => {
    if (!txtContent) {
      toast({
        title: "No content to download",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "File downloaded",
      description: "Your TXT file has been downloaded",
    });
  };

  const clearContent = () => {
    setHtmlContent('');
    setTxtContent('');
    setFileName('document.txt');
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
            <BreadcrumbPage>HTML to TXT</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            Convert HTML to TXT
          </CardTitle>
          <CardDescription>
            Upload HTML files or paste HTML content and extract plain text
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
              <Button variant="default" asChild>
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
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {htmlContent && !txtContent && (
            <div className="flex justify-end">
              <Button onClick={() => convertToText()} size="sm">
                Convert to Text
              </Button>
            </div>
          )}

          {txtContent && (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">Extracted Text</label>
                <Textarea
                  value={txtContent}
                  readOnly
                  className="min-h-[200px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={clearContent} size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button onClick={downloadTXT} size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download TXT
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title="How to Convert HTML to TXT">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select HTML File' to upload an HTML file, or paste HTML content directly</li>
              <li>Click 'Convert to Text' to extract plain text from HTML</li>
              <li>Review the extracted text in the preview area</li>
              <li>Click 'Download TXT' to save the text file</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload HTML files or paste HTML code</li>
              <li>Automatically strips HTML tags and formatting</li>
              <li>Preserves text content and structure</li>
              <li>Client-side processing - your content never leaves your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
