import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { FileImage, Download, Trash2, Plus, Eye } from "lucide-react";
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

export const BMPtoPDF = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<{ file: File; preview: string; dataUrl: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const validImages = Array.from(files).filter(file =>
      file.type === "image/bmp" || file.name.toLowerCase().endsWith(".bmp")
    );

    if (validImages.length === 0) {
      toast({ title: "Only BMP files are supported", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    const newImages: any[] = [];
    let processedCount = 0;

    validImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        newImages.push({
          file,
          preview: URL.createObjectURL(file),
          dataUrl: reader.result as string,
        });
        processedCount++;
        if (processedCount === validImages.length) {
          setImages(prev => [...prev, ...newImages]);
          toast({
            title: `${newImages.length} BMP image(s) added`,
            description: "You can now export them to a PDF file",
          });
          setIsLoading(false);
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages(images.filter((_, i) => i !== index));
    toast({ title: "Image removed", description: "The image has been removed" });
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    toast({ title: "All images cleared" });
  };

  const viewImage = (index: number) => {
    window.open(images[index].dataUrl, "_blank");
  };

  const downloadPDF = () => {
    const pdf = new jsPDF();
    images.forEach((img, i) => {
      const image = new Image();
      image.src = img.dataUrl;
      pdf.addImage(img.dataUrl, "PNG", 10, 10, 190, 0);
      if (i !== images.length - 1) pdf.addPage();
    });
    pdf.save("converted-images.pdf");
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
            <BreadcrumbPage>BMP to PDF Converter</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center">
              <FileImage className="mr-2 text-primary" size={24} />
              <CardTitle>BMP to PDF Converter</CardTitle>
            </div>
            <CardDescription>Convert BMP images to a single PDF file</CardDescription>
          </CardHeader>

          <CardContent className="pt-6 pb-4 space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileImage size={48} className="mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">Add BMP Images</h3>
              <p className="text-sm text-muted-foreground mb-4">Click to select BMP files</p>
              <Button>
                <Plus size={16} className="mr-1" /> Select BMP Files
              </Button>
              <input
                type="file"
                accept=".bmp"
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
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={downloadPDF}>
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
                      <img src={img.preview} alt={`BMP ${index + 1}`} className="w-full h-32 object-cover" />
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
                        {img.file.name.replace(/\.bmp$/i, ".pdf")}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <p className="text-sm text-muted-foreground">
              Tip: This tool converts BMP images into a single PDF file right in your browser.
            </p>
          </CardContent>

          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <span className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></span>
              <span className="ml-4 text-sm text-muted-foreground">Processing images...</span>
            </div>
          )}
        </Card>

        <GuidanceSection title="How to Use the BMP to PDF Converter">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Step-by-step Instructions</h4>
              <ol className="list-decimal pl-5">
                <li>Click "Select BMP Files" or drag and drop BMP images.</li>
                <li>They’ll be automatically listed and previewed.</li>
                <li>Click "Download PDF" to export all images as a single PDF.</li>
                <li>Use "Clear All" to start over.</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-1">Features</h4>
              <ul className="list-disc pl-5">
                <li>Client-side conversion with no image upload</li>
                <li>Preview images before exporting</li>
                <li>PDF contains each image on a separate page</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </>
  );
};
