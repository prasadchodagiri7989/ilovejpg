// src/pages/pdf/TXTtoHTML.tsx

import React, { useState, useRef } from "react";
import { FileText, Download, Trash2, Plus, Code } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";

export const TXTtoHTML = () => {
  const [textContent, setTextContent] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [fileName, setFileName] = useState('document.html');
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
      setFileName(file.name.replace(/\.txt$/i, '.html'));
      convertToHTML(content);
    };
    reader.readAsText(file);

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const convertToHTML = (text: string = textContent) => {
    if (!text.trim()) {
      toast({
        title: "No content",
        description: "Please load a TXT file or enter text content first",
        variant: "destructive",
      });
      return;
    }

    try {
      // Convert text to HTML with proper formatting
      const lines = text.split('\n');
      const paragraphs = lines.map(line => {
        const escapedLine = line
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;');
        return `    <p>${escapedLine || '&nbsp;'}</p>`;
      }).join('\n');

      const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Converted Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            color: #333;
        }
        p {
            margin: 0.5em 0;
        }
    </style>
</head>
<body>
${paragraphs}
</body>
</html>`;

      setHtmlContent(html);
      
      toast({
        title: "Conversion successful",
        description: "Text has been converted to HTML",
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "There was an error converting the text. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  const downloadHTML = () => {
    if (!htmlContent) {
      toast({
        title: "No content to download",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);

    toast({
      title: "File downloaded",
      description: "Your HTML file has been downloaded",
    });
  };

  const clearContent = () => {
    setTextContent('');
    setHtmlContent('');
    setFileName('document.html');
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
            <BreadcrumbPage>TXT to HTML</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Convert TXT to HTML
          </CardTitle>
          <CardDescription>
            Upload text files or paste text content and convert to HTML
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
              <Button variant="default" asChild>
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
              className="min-h-[200px] font-mono text-sm"
            />
          </div>

          {textContent && !htmlContent && (
            <div className="flex justify-end">
              <Button onClick={() => convertToHTML()} size="sm">
                Convert to HTML
              </Button>
            </div>
          )}

          {htmlContent && (
            <>
              <div>
                <label className="text-sm font-medium mb-2 block">Generated HTML</label>
                <Textarea
                  value={htmlContent}
                  readOnly
                  className="min-h-[200px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                />
              </div>

              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={clearContent} size="sm">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear
                </Button>
                <Button onClick={downloadHTML} size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Download HTML
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title="How to Convert TXT to HTML">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select TXT File' to upload a text file, or paste text content directly</li>
              <li>Click 'Convert to HTML' to generate HTML</li>
              <li>Review the generated HTML in the preview area</li>
              <li>Click 'Download HTML' to save the HTML file</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload TXT files or paste plain text</li>
              <li>Automatically formats text into HTML paragraphs</li>
              <li>Includes basic HTML template with styling</li>
              <li>Client-side processing - your content never leaves your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
