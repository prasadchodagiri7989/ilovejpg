// src/pages/pdf/GenericConverter.tsx
// This is a reusable component for document conversions that require server-side processing

import React, { useState, useRef } from "react";
import { FileText, Download, Trash2, Plus, AlertCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";

interface GenericConverterProps {
  fromFormat: string;
  toFormat: string;
  acceptedExtensions: string[];
  title: string;
  description: string;
}

export const GenericConverter = ({
  fromFormat,
  toFormat,
  acceptedExtensions,
  title,
  description
}: GenericConverterProps) => {
  const [files, setFiles] = useState<Array<{ file: File; name: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) return;

    const validFiles = Array.from(selectedFiles).filter(file =>
      acceptedExtensions.some(ext => file.name.toLowerCase().endsWith(ext))
    );

    if (validFiles.length === 0) {
      toast({
        title: `Only ${acceptedExtensions.join(', ')} files are supported`,
        variant: "destructive",
      });
      return;
    }

    const newFiles = validFiles.map(file => {
      const baseName = file.name.replace(/\.[^/.]+$/, '');
      return {
        file,
        name: `${baseName}.${toFormat}`
      };
    });

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
            <BreadcrumbPage>{title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          {fromFormat} to {toFormat} conversion requires server-side processing or external libraries. This interface demonstrates the file handling workflow.
        </AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            {title}
          </CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 hover:border-primary transition-colors">
            <FileText className="h-12 w-12 text-gray-400 mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedExtensions.join(',')}
              onChange={handleFileChange}
              multiple
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <Button variant="default" asChild>
                <span>
                  <Plus className="mr-2 h-4 w-4" />
                  Select {fromFormat.toUpperCase()} Files
                </span>
              </Button>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              or drag and drop files here
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
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeFile(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title={`About ${fromFormat.toUpperCase()} to ${toFormat.toUpperCase()} Conversion`}>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Implementation Note:</h4>
            <p className="text-sm text-muted-foreground">
              Full document conversion requires server-side processing using libraries like LibreOffice, 
              Pandoc, or cloud services. This interface demonstrates the file handling workflow 
              that would be connected to such a backend service.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Upload multiple files</li>
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

// Wrapper components for specific conversions
export const DOCXtoTXT = () => (
  <GenericConverter
    fromFormat="DOCX"
    toFormat="txt"
    acceptedExtensions={['.docx', '.doc']}
    title="Convert DOCX to TXT"
    description="Upload DOCX files for conversion to plain text format"
  />
);

export const DOCXtoHTML = () => (
  <GenericConverter
    fromFormat="DOCX"
    toFormat="html"
    acceptedExtensions={['.docx', '.doc']}
    title="Convert DOCX to HTML"
    description="Upload DOCX files for conversion to HTML format"
  />
);

export const DOCXtoJPG = () => (
  <GenericConverter
    fromFormat="DOCX"
    toFormat="jpg"
    acceptedExtensions={['.docx', '.doc']}
    title="Convert DOCX to JPG"
    description="Upload DOCX files for conversion to JPG images"
  />
);

export const RTFtoDOCX = () => (
  <GenericConverter
    fromFormat="RTF"
    toFormat="docx"
    acceptedExtensions={['.rtf']}
    title="Convert RTF to DOCX"
    description="Upload RTF files for conversion to DOCX format"
  />
);

export const RTFtoPDF = () => (
  <GenericConverter
    fromFormat="RTF"
    toFormat="pdf"
    acceptedExtensions={['.rtf']}
    title="Convert RTF to PDF"
    description="Upload RTF files for conversion to PDF format"
  />
);

export const RTFtoTXT = () => (
  <GenericConverter
    fromFormat="RTF"
    toFormat="txt"
    acceptedExtensions={['.rtf']}
    title="Convert RTF to TXT"
    description="Upload RTF files for conversion to plain text format"
  />
);

export const ODTtoPDF = () => (
  <GenericConverter
    fromFormat="ODT"
    toFormat="pdf"
    acceptedExtensions={['.odt']}
    title="Convert ODT to PDF"
    description="Upload ODT files for conversion to PDF format"
  />
);

export const ODTtoDOCX = () => (
  <GenericConverter
    fromFormat="ODT"
    toFormat="docx"
    acceptedExtensions={['.odt']}
    title="Convert ODT to DOCX"
    description="Upload ODT files for conversion to DOCX format"
  />
);

export const HTMLtoDOCX = () => (
  <GenericConverter
    fromFormat="HTML"
    toFormat="docx"
    acceptedExtensions={['.html', '.htm']}
    title="Convert HTML to DOCX"
    description="Upload HTML files for conversion to DOCX format"
  />
);

export const TXTtoDOCX = () => (
  <GenericConverter
    fromFormat="TXT"
    toFormat="docx"
    acceptedExtensions={['.txt']}
    title="Convert TXT to DOCX"
    description="Upload TXT files for conversion to DOCX format"
  />
);

export const PDFtoPPTX = () => (
  <GenericConverter
    fromFormat="PDF"
    toFormat="pptx"
    acceptedExtensions={['.pdf']}
    title="Convert PDF to PPTX"
    description="Upload PDF files for conversion to PowerPoint format"
  />
);
