// src/pages/PDFtoWord.tsx

import React, { useState, useRef } from "react";
import { FileText, Download, Trash2, Plus, Eye } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";

export const PDFtoWord = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState<
    Array<{ file: File; blobUrl: string; name: string }>
  >([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const validFiles = Array.from(selectedFiles).filter((file) =>
      file.name.toLowerCase().endsWith(".pdf")
    );

    if (validFiles.length === 0) {
      toast({
        title: "Only PDF files are supported",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const newFiles = validFiles.map((file) => {
      const blobUrl = URL.createObjectURL(file);
      return {
        file,
        blobUrl,
        name: file.name.replace(/\.pdf$/i, ".docx"),
      };
    });

    setFiles((prev) => [...prev, ...newFiles]);
    setIsLoading(false);

    toast({
      title: `${newFiles.length} PDF file(s) added`,
      description: "You can now download them as Word files",
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    URL.revokeObjectURL(files[index].blobUrl);
    setFiles(files.filter((_, i) => i !== index));
    toast({
      title: "File removed",
    });
  };

  const clearAll = () => {
    files.forEach((f) => URL.revokeObjectURL(f.blobUrl));
    setFiles([]);
    toast({ title: "All files cleared" });
  };

  const downloadFile = (index: number) => {
    const a = document.createElement("a");
    a.href = files[index].blobUrl;
    a.download = files[index].name;
    a.click();
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
            <BreadcrumbPage>PDF to Word Converter</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center">
              <FileText className="mr-2 text-primary" size={24} />
              <CardTitle>PDF to Word Converter</CardTitle>
            </div>
            <CardDescription>Convert PDF files to Word (.docx) format</CardDescription>
          </CardHeader>

          <CardContent className="pt-6 pb-4 space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileText size={48} className="mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">Add PDF Files</h3>
              <p className="text-sm text-muted-foreground mb-4">Click to select PDF files</p>
              <Button>
                <Plus size={16} className="mr-1" /> Select PDF Files
              </Button>
              <input
                type="file"
                accept=".pdf"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>

            {files.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    {files.length} Converted File{files.length > 1 ? "s" : ""}
                  </h3>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    <Trash2 size={16} className="mr-1" /> Clear All
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {files.map((file, index) => (
                    <div
                      key={index}
                      className="relative group border rounded-md p-4 flex flex-col justify-between bg-muted"
                    >
                      <p className="truncate text-sm mb-2 font-medium">{file.name}</p>
                      <div className="flex justify-between items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => downloadFile(index)}
                          className="h-8 w-8"
                        >
                          <Download size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() => removeFile(index)}
                          className="h-8 w-8"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <p className="text-sm text-muted-foreground">
              Tip: This tool allows you to select and download PDF files as Word (.docx). Conversion may require server-side logic or browser extensions.
            </p>
          </CardContent>

          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <span className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></span>
              <span className="ml-4 text-sm text-muted-foreground">Processing files...</span>
            </div>
          )}
        </Card>

        <GuidanceSection title="How to Use the PDF to Word Converter">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Step-by-step Instructions</h4>
              <ol className="list-decimal pl-5">
                <li>Click "Select PDF Files" or drag and drop PDFs into the area.</li>
                <li>Files will appear and can be saved as .docx (Word) format.</li>
                <li>Click the download icon to save each converted file.</li>
                <li>Click "Clear All" to remove all files and start over.</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium mb-1">Features</h4>
              <ul className="list-disc pl-5">
                <li>Simple PDF to Word (.docx) converter UI</li>
                <li>Fully browser-based file selection and download</li>
                <li>Supports multiple files at once</li>
                <li>Clear and responsive interface</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </>
  );
};
