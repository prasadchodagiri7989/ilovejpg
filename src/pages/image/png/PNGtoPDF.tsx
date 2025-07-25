import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { FileImage, Download, Eye, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

export const PNGtoPDF = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<{ file: File; preview: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validImages = Array.from(files).filter(file =>
      file.type === "image/png" || file.name.toLowerCase().endsWith(".png")
    );

    if (validImages.length === 0) {
      toast({ title: "Only PNG files are supported", variant: "destructive" });
      return;
    }

    const previews = validImages.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(prev => [...prev, ...previews]);
    toast({ title: `${previews.length} PNG image(s) loaded`, description: "Ready for PDF conversion" });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    toast({ title: "All images cleared" });
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages(images.filter((_, i) => i !== index));
    toast({ title: "Image removed" });
  };

  const viewImage = (index: number) => {
    window.open(images[index].preview, "_blank");
  };

  const downloadPDF = async () => {
    if (images.length === 0) return;

    setIsLoading(true);
    const pdf = new jsPDF();

    for (let i = 0; i < images.length; i++) {
      const img = images[i];

      const image = new Image();
      image.src = img.preview;

      await new Promise(resolve => {
        image.onload = () => {
          const width = image.width;
          const height = image.height;
          const ratio = width / height;

          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          let pdfWidth = pageWidth;
          let pdfHeight = pageWidth / ratio;

          if (pdfHeight > pageHeight) {
            pdfHeight = pageHeight;
            pdfWidth = pageHeight * ratio;
          }

          const x = (pageWidth - pdfWidth) / 2;
          const y = (pageHeight - pdfHeight) / 2;

          pdf.addImage(image, "PNG", x, y, pdfWidth, pdfHeight);
          if (i < images.length - 1) pdf.addPage();
          resolve(true);
        };
      });
    }

    pdf.save("converted-images.pdf");
    toast({ title: "PDF downloaded successfully" });
    setIsLoading(false);
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
            <BreadcrumbPage>PNG to PDF Converter</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center">
              <FileImage className="mr-2 text-primary" size={24} />
              <CardTitle>PNG to PDF Converter</CardTitle>
            </div>
            <CardDescription>Convert PNG images into a PDF file</CardDescription>
          </CardHeader>

          <CardContent className="pt-6 pb-4 space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileImage size={48} className="mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">Add PNG Images</h3>
              <p className="text-sm text-muted-foreground mb-4">Click to select PNG files</p>
              <Button>
                <Plus size={16} className="mr-1" /> Select PNG Files
              </Button>
              <input
                type="file"
                accept=".png"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>

            {images.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">
                    {images.length} Image{images.length > 1 ? "s" : ""} Loaded
                  </h3>
                  <div className="flex gap-2">
                    <Button onClick={downloadPDF} disabled={isLoading}>
                      <Download size={16} className="mr-1" /> Download PDF
                    </Button>
                    <Button variant="outline" size="sm" onClick={clearAll}>
                      <Trash2 size={16} className="mr-1" /> Clear All
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group border rounded-md overflow-hidden">
                      <img src={img.preview} alt={`Loaded ${index + 1}`} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); viewImage(index); }}
                          className="h-8 w-8 text-white hover:bg-white/20"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                          className="h-8 w-8 text-white hover:bg-white/20"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                        {img.file.name}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <p className="text-sm text-muted-foreground">
              Tip: Your images will be merged into a single PDF, ready for download.
            </p>
          </CardContent>

          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <span className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></span>
              <span className="ml-4 text-sm text-muted-foreground">Generating PDF...</span>
            </div>
          )}
        </Card>

        <GuidanceSection title="How to Use the PNG to PDF Converter">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Step-by-step Instructions</h4>
              <ol className="list-decimal pl-5">
                <li>Click "Select PNG Files" or drag-and-drop your images.</li>
                <li>Wait for the images to load in the preview section.</li>
                <li>Click "Download PDF" to download the merged PDF.</li>
                <li>Use "Clear All" to remove all files and start again.</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-1">Features</h4>
              <ul className="list-disc pl-5">
                <li>Fast, offline conversion with <code>jsPDF</code></li>
                <li>No server uploads — fully browser-based and private</li>
                <li>Supports multiple images per PDF</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </>
  );
};
