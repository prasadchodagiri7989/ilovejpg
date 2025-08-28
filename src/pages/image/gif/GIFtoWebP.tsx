import React, { useRef, useState } from "react";
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
import { decompressFrames, parseGIF } from "gifuct-js";

export const GIFtoWebP = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [frames, setFrames] = useState<Array<{ blobUrl: string; name: string }>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const gifFile = files[0];
    if (!gifFile.type.includes("gif")) {
      toast({ title: "Please upload a valid GIF file", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    const arrayBuffer = await gifFile.arrayBuffer();
    const gif = parseGIF(arrayBuffer);
    const decodedFrames = decompressFrames(gif, true);

    const newFrames: any[] = [];
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    decodedFrames.forEach((frame, index) => {
      canvas.width = frame.dims.width;
      canvas.height = frame.dims.height;

      const imageData = new ImageData(
        new Uint8ClampedArray(frame.patch),
        frame.dims.width,
        frame.dims.height
      );
      ctx?.putImageData(imageData, 0, 0);

      canvas.toBlob(blob => {
        if (blob) {
          const blobUrl = URL.createObjectURL(blob);
          newFrames.push({
            blobUrl,
            name: `${gifFile.name.replace(/\.gif$/i, "")}_frame_${index + 1}.webp`,
          });

          if (newFrames.length === decodedFrames.length) {
            setFrames(newFrames);
            toast({
              title: `${newFrames.length} frame(s) converted`,
              description: "Each frame is now available as a WebP image",
            });
            setIsLoading(false);
          }
        }
      }, "image/webp");
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const clearAll = () => {
    frames.forEach(frame => URL.revokeObjectURL(frame.blobUrl));
    setFrames([]);
    toast({ title: "All frames cleared" });
  };

  const downloadFrame = (index: number) => {
    const a = document.createElement("a");
    a.href = frames[index].blobUrl;
    a.download = frames[index].name;
    a.click();
  };

  const viewFrame = (index: number) => {
    window.open(frames[index].blobUrl, "_blank");
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
            <BreadcrumbPage>GIF to WebP Converter</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="max-w-4xl mx-auto">
        <Card className="shadow-md">
          <CardHeader className="bg-primary/5">
            <div className="flex items-center">
              <FileImage className="mr-2 text-primary" size={24} />
              <CardTitle>GIF to WebP Converter</CardTitle>
            </div>
            <CardDescription>Convert frames from GIF to WebP format</CardDescription>
          </CardHeader>

          <CardContent className="pt-6 pb-4 space-y-4">
            <div
              className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileImage size={48} className="mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">Add a GIF File</h3>
              <p className="text-sm text-muted-foreground mb-4">Click to select a GIF file</p>
              <Button>
                <Plus size={16} className="mr-1" /> Select GIF File
              </Button>
              <input
                type="file"
                accept=".gif"
                onChange={handleFileChange}
                ref={fileInputRef}
                className="hidden"
              />
            </div>

            {frames.length > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">{frames.length} Frame{frames.length > 1 ? "s" : ""} Converted</h3>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    <Trash2 size={16} className="mr-1" /> Clear All
                  </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {frames.map((frame, index) => (
                    <div key={index} className="relative group border rounded-md overflow-hidden">
                      <img src={frame.blobUrl} alt={`Frame ${index + 1}`} className="w-full h-32 object-cover" />
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); viewFrame(index); }}
                          className="h-8 w-8 text-white hover:bg-white/20"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={(e) => { e.stopPropagation(); downloadFrame(index); }}
                          className="h-8 w-8 text-white hover:bg-white/20"
                        >
                          <Download size={16} />
                        </Button>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                        {frame.name}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <p className="text-sm text-muted-foreground">
              Tip: This tool converts every frame of your GIF into WebP format, fully offline.
            </p>
          </CardContent>

          {isLoading && (
            <div className="flex items-center justify-center py-6">
              <span className="animate-spin rounded-full h-8 w-8 border-4 border-primary border-t-transparent"></span>
              <span className="ml-4 text-sm text-muted-foreground">Processing frames...</span>
            </div>
          )}
        </Card>

        <GuidanceSection title="How to Use the GIF to WebP Converter">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Steps</h4>
              <ol className="list-decimal pl-5">
                <li>Select a GIF file to extract and convert frames.</li>
                <li>Each frame is automatically converted to WebP.</li>
                <li>Click the preview or download any frame.</li>
                <li>Use “Clear All” to reset and upload a new file.</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium mb-1">Features</h4>
              <ul className="list-disc pl-5">
                <li>Client-side GIF frame extraction</li>
                <li>Each frame exported to WebP format</li>
                <li>Supports previews, downloads, and batch processing</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </>
  );
};
