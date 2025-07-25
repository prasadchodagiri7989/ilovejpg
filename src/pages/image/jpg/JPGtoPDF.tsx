import React, { useState, useRef } from "react";
import { FileImage, Download, Trash2, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";
import { jsPDF } from "jspdf";

export const JPGtoPDF = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<{ file: File; preview: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validImages = Array.from(files).filter(file =>
      file.type === "image/jpeg" || file.name.toLowerCase().endsWith(".jpg")
    );

    if (validImages.length === 0) {
      toast({
        title: "Only JPG files are supported",
        variant: "destructive",
      });
      return;
    }

    const newImages = validImages.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(prev => [...prev, ...newImages]);

    if (fileInputRef.current) fileInputRef.current.value = "";

    toast({
      title: `${newImages.length} JPG image(s) added`,
      description: "Ready to convert to PDF",
    });
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages(images.filter((_, i) => i !== index));
    toast({
      title: "Image removed",
    });
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    toast({
      title: "All images cleared",
    });
  };

  const viewImage = (index: number) => {
    window.open(images[index].preview, "_blank");
  };

  const downloadPDF = async () => {
    setIsLoading(true);
    const pdf = new jsPDF();
    const margin = 10;

    for (let i = 0; i < images.length; i++) {
      const img = images[i];
      const image = new Image();
      image.src = img.preview;

      await new Promise<void>(resolve => {
        image.onload = () => {
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const ratio = Math.min((pageWidth - margin * 2) / image.width, (pageHeight - margin * 2) / image.height);
          const width = image.width * ratio;
          const height = image.height * ratio;
          const x = (pageWidth - width) / 2;
          const y = (pageHeight - height) / 2;

          pdf.addImage(image, 'JPEG', x, y, width, height);

          if (i < images.length - 1) {
            pdf.addPage();
          }

          resolve();
        };
      });
    }

    pdf.save("converted-images.pdf");
    setIsLoading(false);

    toast({
      title: "PDF Ready",
      description: "All images have been saved as a PDF file",
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
            <BreadcrumbPage>JPG to PDF Converter</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center">
              <FileImage className="mr-2 text-primary" size={24} />
              <CardTitle>JPG to PDF Converter</CardTitle>
            </div>
            <CardDescription>Convert JPG images to a single PDF document</CardDescription>
          </CardHeader>

          <CardContent className="pt-6 pb-4 space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileImage size={48} className="mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">Add JPG Images</h3>
              <p className="text-sm text-muted-foreground mb-4">Click to select JPG files</p>
              <Button>
                <Plus size={16} className="mr-1" /> Select JPG Files
              </Button>
              <input
                type="file"
                accept=".jpg,.jpeg"
                multiple
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>

            {images.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{images.length} Selected Image{images.length > 1 ? "s" : ""}</h3>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    <Trash2 size={16} className="mr-1" /> Clear All
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group border rounded-md overflow-hidden">
                      <img src={img.preview} alt={`Selected ${index + 1}`} className="w-full h-32 object-cover" />
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

                <div className="text-center">
                  <Button onClick={downloadPDF} disabled={isLoading}>
                    <Download size={16} className="mr-1" /> Download PDF
                  </Button>
                </div>
              </>
            )}

            <p className="text-sm text-muted-foreground">
              Tip: This tool converts your JPG images into a single downloadable PDF file.
            </p>
          </CardContent>

          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <span className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></span>
              <span className="ml-4 text-sm text-muted-foreground">Generating PDF...</span>
            </div>
          )}
        </Card>

        <GuidanceSection title="How to Use the JPG to PDF Converter">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Step-by-step Instructions</h4>
              <ol className="list-decimal pl-5">
                <li>Click "Select JPG Files" or drag and drop JPG images into the upload area.</li>
                <li>All selected images will be listed with previews.</li>
                <li>Click "Download PDF" to generate and download the final PDF file.</li>
                <li>Click "Clear All" to remove all images and start again.</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-1">Features</h4>
              <ul className="list-disc pl-5">
                <li>Combines multiple JPGs into a single PDF file.</li>
                <li>Fully client-side — no file uploads.</li>
                <li>Preview images before creating PDF.</li>
                <li>Clean, fast, and responsive UI.</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </>
  );
};
