// src/pages/pdf/PDFtoJPG.tsx

import React, { useState, useRef } from "react";
import { FileText, Download, Trash2, Plus, Image } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";
import * as pdfjsLib from 'pdfjs-dist';

// Set up the worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export const PDFtoJPG = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<{ pageNum: number; dataUrl: string; fileName: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validFiles = Array.from(files).filter(file =>
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
      const newImages: any[] = [];

      for (const file of validFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          const page = await pdf.getPage(pageNum);
          const viewport = page.getViewport({ scale: 2.0 });
          
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({
            canvasContext: context!,
            viewport: viewport,
            canvas: canvas
          }).promise;

          const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
          const baseName = file.name.replace(/\.pdf$/i, '');
          
          newImages.push({
            pageNum,
            dataUrl,
            fileName: `${baseName}_page_${pageNum}.jpg`
          });
        }
      }

      setImages(prev => [...prev, ...newImages]);
      toast({
        title: `${newImages.length} page(s) converted`,
        description: "You can now download them as JPG",
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: "There was an error converting the PDF. Please try again.",
        variant: "destructive",
      });
      console.error(error);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    toast({
      title: "Image removed",
    });
  };

  const clearAll = () => {
    setImages([]);
    toast({
      title: "All images cleared",
    });
  };

  const downloadImage = (index: number) => {
    const link = document.createElement('a');
    link.href = images[index].dataUrl;
    link.download = images[index].fileName;
    link.click();
  };

  const downloadAll = () => {
    images.forEach((img, index) => {
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = img.dataUrl;
        link.download = img.fileName;
        link.click();
      }, index * 100);
    });

    toast({
      title: "Downloading all images",
      description: `${images.length} image(s) will be downloaded`,
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
            <BreadcrumbPage>PDF to JPG</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6" />
            Convert PDF to JPG
          </CardTitle>
          <CardDescription>
            Upload PDF files and convert each page to JPG images
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

          {images.length > 0 && (
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={clearAll} size="sm">
                <Trash2 className="mr-2 h-4 w-4" />
                Clear All
              </Button>
              <Button onClick={downloadAll} size="sm">
                <Download className="mr-2 h-4 w-4" />
                Download All ({images.length})
              </Button>
            </div>
          )}

          {images.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-4">
                    <img
                      src={img.dataUrl}
                      alt={`Page ${img.pageNum}`}
                      className="w-full h-48 object-contain bg-gray-100 dark:bg-gray-800 rounded mb-3"
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600 dark:text-gray-400 truncate flex-1">
                        Page {img.pageNum}
                      </span>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeImage(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => downloadImage(index)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title="How to Convert PDF to JPG">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Steps:</h4>
            <ol className="list-decimal pl-5 space-y-1">
              <li>Click 'Select PDF Files' or drag and drop PDF files</li>
              <li>Wait for the conversion to complete</li>
              <li>Preview the converted JPG images</li>
              <li>Download individual images or all at once</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-2">Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Convert multiple PDF files at once</li>
              <li>Each PDF page becomes a separate JPG</li>
              <li>High-quality image output</li>
              <li>Client-side processing - your files never leave your device</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};
