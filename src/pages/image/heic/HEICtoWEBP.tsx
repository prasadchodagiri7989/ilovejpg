import React, { useRef, useState } from "react";
import { FileImage, Download, Trash2, Plus, Eye } from "lucide-react";
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

// 👇 Import heic2any using require for TypeScript compatibility
import heic2any from "heic2any";

export const HEICtoWEBP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<Array<{ file: File; preview: string; blobUrl: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const valid = Array.from(files).filter(f =>
      f.type === "image/heic" || f.name.toLowerCase().endsWith(".heic") || f.type === "image/heif"
    );

    if (!valid.length) {
      toast({ title: "Only HEIC/HEIF files supported", variant: "destructive" });
      return;
    }

    setIsLoading(true);

    const converted: any[] = [];
    for (const file of valid) {
      try {
        const blob = await heic2any({ blob: file, toType: "image/webp" });
        const blobUrl = URL.createObjectURL(blob as Blob);
        converted.push({
          file,
          preview: URL.createObjectURL(file),
          blobUrl,
        });
      } catch (err) {
        console.error(err);
        toast({ title: `Failed to convert ${file.name}`, variant: "destructive" });
      }
    }

    setImages(prev => [...prev, ...converted]);
    setIsLoading(false);
    toast({ title: `${converted.length} image(s) converted`, description: "Now downloadable as WebP" });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (i: number) => {
    URL.revokeObjectURL(images[i].preview);
    URL.revokeObjectURL(images[i].blobUrl);
    setImages(images.filter((_, idx) => idx !== i));
    toast({ title: "Image removed" });
  };

  const clearAll = () => {
    images.forEach(img => {
      URL.revokeObjectURL(img.preview);
      URL.revokeObjectURL(img.blobUrl);
    });
    setImages([]);
    toast({ title: "All images cleared" });
  };

  const viewImage = (i: number) => window.open(images[i].blobUrl, "_blank");

  const downloadImage = (i: number) => {
    const a = document.createElement("a");
    a.href = images[i].blobUrl;
    a.download = images[i].file.name.replace(/\.(heic|heif)$/i, ".webp");
    a.click();
  };

  return (
    <>
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem><BreadcrumbPage>HEIC to WebP Converter</BreadcrumbPage></BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="bg-primary/5 flex items-center">
            <FileImage className="mr-2 text-primary" size={24} />
            <CardTitle>HEIC to WebP Converter</CardTitle>
            <CardDescription>Convert HEIC/HEIF images to WebP format</CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 pt-6 pb-4">
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileImage size={48} className="mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">Add HEIC/HEIF Files</h3>
              <p className="text-sm text-muted-foreground mb-4">Click to select HEIC images</p>
              <Button>
                <Plus size={16} className="mr-1" /> Select Files
              </Button>
              <input type="file" accept=".heic,.heif" multiple onChange={handleFileChange} ref={fileInputRef} className="hidden" />
            </div>

            {images.length > 0 && (
              <>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{images.length} Converted Image{images.length > 1 ? "s" : ""}</h3>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    <Trash2 size={16} className="mr-1" /> Clear All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {images.map((img, i) => (
                    <div key={i} className="relative group border rounded-md overflow-hidden">
                      <img src={img.blobUrl} alt={`Converted ${i + 1}`} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                        <Button size="icon" variant="ghost" onClick={e => { e.stopPropagation(); viewImage(i); }} className="h-8 w-8 text-white hover:bg-white/20">
                          <Eye size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={e => { e.stopPropagation(); downloadImage(i); }} className="h-8 w-8 text-white hover:bg-white/20">
                          <Download size={16} />
                        </Button>
                        <Button size="icon" variant="ghost" onClick={e => { e.stopPropagation(); removeImage(i); }} className="h-8 w-8 text-white hover:bg-white/20">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                        {img.file.name.replace(/\.(heic|heif)$/i, ".webp")}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>

          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <span className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></span>
              <span className="ml-4 text-sm text-muted-foreground">Converting images...</span>
            </div>
          )}
        </Card>

        <GuidanceSection title="How to Use the HEIC to WebP Converter">
          <ol className="list-decimal pl-5">
            <li>Click "Select Files" or drag-and-drop HEIC/HEIF files.</li>
            <li>Conversion happens entirely in-browser — no server upload.</li>
            <li>Preview and download each WebP from the grid.</li>
            <li>Use "Clear All" to reset.</li>
          </ol>
        </GuidanceSection>
      </div>
    </>
  );
};
