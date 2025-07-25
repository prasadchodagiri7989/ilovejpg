import React, { useState, useRef } from "react";
import { FileImage, Download, Trash2, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";

export const JPGtoSVG = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<{ file: File; preview: string; svgContent: string; blobUrl: string }>>([]);
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

    setIsLoading(true);
    const newImages: any[] = [];
    let processedCount = 0;

    validImages.forEach(file => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const width = img.width;
          const height = img.height;
          const encoded = reader.result as string;

          const svgContent = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
              <image href="${encoded}" width="${width}" height="${height}" />
            </svg>
          `.trim();

          const blob = new Blob([svgContent], { type: "image/svg+xml" });
          const blobUrl = URL.createObjectURL(blob);

          newImages.push({
            file,
            preview: encoded,
            svgContent,
            blobUrl
          });

          processedCount++;
          if (processedCount === validImages.length) {
            setImages(prev => [...prev, ...newImages]);
            toast({
              title: `${newImages.length} JPG image(s) wrapped as SVG`,
              description: "You can now download them",
            });
            setIsLoading(false);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].blobUrl);
    setImages(images.filter((_, i) => i !== index));
    toast({ title: "Image removed" });
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.blobUrl));
    setImages([]);
    toast({ title: "All images cleared" });
  };

  const viewImage = (index: number) => {
    window.open(images[index].blobUrl, "_blank");
  };

  const downloadImage = (index: number) => {
    const a = document.createElement("a");
    a.href = images[index].blobUrl;
    a.download = images[index].file.name.replace(/\.(jpg|jpeg)$/i, ".svg");
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
            <BreadcrumbPage>JPG to SVG Converter</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center">
              <FileImage className="mr-2 text-primary" size={24} />
              <CardTitle>JPG to SVG Converter</CardTitle>
            </div>
            <CardDescription>Wrap JPG images inside SVG format (not vectorized)</CardDescription>
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
                  <h3 className="text-lg font-medium">{images.length} SVG Image{images.length > 1 ? "s" : ""}</h3>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    <Trash2 size={16} className="mr-1" /> Clear All
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative group border rounded-md overflow-hidden">
                      <img src={img.preview} alt={`SVG ${index + 1}`} className="w-full h-32 object-cover" />
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
                          onClick={(e) => { e.stopPropagation(); downloadImage(index); }}
                          className="h-8 w-8 text-white hover:bg-white/20"
                        >
                          <Download size={16} />
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
                        {img.file.name.replace(/\.(jpg|jpeg)$/i, ".svg")}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <p className="text-sm text-muted-foreground">
              Tip: This wraps JPG images inside an SVG container. It is not a vectorization process.
            </p>
          </CardContent>

          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <span className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></span>
              <span className="ml-4 text-sm text-muted-foreground">Generating SVG...</span>
            </div>
          )}
        </Card>

        <GuidanceSection title="How to Use the JPG to SVG Converter">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Steps</h4>
              <ol className="list-decimal pl-5">
                <li>Select JPG images from your device.</li>
                <li>They are wrapped inside a valid SVG XML structure.</li>
                <li>Preview, view, or download as `.svg` files.</li>
              </ol>
            </div>
            <div>
              <h4 className="font-medium mb-1">Notes</h4>
              <ul className="list-disc pl-5">
                <li>This method does not vectorize — it embeds the image inside SVG format.</li>
                <li>Works offline with complete privacy.</li>
                <li>True raster-to-vector conversion requires external libraries or services.</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </>
  );
};
