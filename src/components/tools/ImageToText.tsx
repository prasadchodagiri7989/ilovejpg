import React, { useState, useRef } from "react";
import Tesseract from "tesseract.js";
import { FileImage, Upload, Copy, Download, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const ImageToText = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>("");
  const [extractedText, setExtractedText] = useState<string>("");
  const [processing, setProcessing] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }
      setImageName(file.name);

      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target?.result as string);
        setExtractedText("");
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = () => {
    setImage(null);
    setImageName("");
    setExtractedText("");
    setProcessing(false);
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast({
      title: "Image cleared",
      description: "The current image has been removed",
    });
  };

  // 🔹 Use Tesseract.js to extract real text from image
  const processImage = async () => {
    if (!image) return;

    setProcessing(true);
    setProgress(0);
    setExtractedText("");

    try {
      const { data } = await Tesseract.recognize(image, "eng", {
        logger: (m) => {
          if (m.status === "recognizing text") {
            setProgress(Math.floor(m.progress * 100));
          }
        },
      });

      setExtractedText(data.text.trim()); // 🔹 Update with real extracted text
      setProcessing(false);

      toast({
        title: "Text extraction complete",
        description: "Text has been extracted from the image",
      });
    } catch (error) {
      toast({
        title: "Error extracting text",
        description: "An error occurred while processing the image.",
        variant: "destructive",
      });
      setProcessing(false);
    }
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
                  <BreadcrumbPage>OCR - Image to Text</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <FileImage className="mr-2 text-primary" size={24} />
            <CardTitle>OCR - Image to Text</CardTitle>
          </div>
          <CardDescription>Extract text from images using OCR technology</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side: Image Input */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Image Input</h3>
              {image ? (
                <div className="space-y-4">
                  <div className="relative rounded-md border overflow-hidden">
                    <img src={image} alt="Uploaded" className="max-h-[300px] w-full object-contain bg-gray-50" />
                    <Button variant="destructive" size="sm" className="absolute top-2 right-2" onClick={clearImage}>
                      <Trash2 size={16} />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground truncate max-w-[200px]" title={imageName}>
                      {imageName}
                    </span>
                    <Button onClick={processImage} disabled={processing}>
                      {processing ? "Processing..." : "Extract Text"}
                    </Button>
                  </div>
                  {processing && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Processing image</span>
                        <span>{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}
                </div>
              ) : (
                <div className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}>
                  <Upload size={36} className="mx-auto mb-4 text-muted-foreground/50" />
                  <h3 className="text-base font-medium mb-2">Upload Image</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Drag and drop an image file here, or click to select
                  </p>
                  <Button size="sm">Select Image</Button>
                  <input type="file" accept="image/*" onChange={handleFileChange} ref={fileInputRef} className="hidden" />
                </div>
              )}
            </div>

            {/* Right Side: Extracted Text Output */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Extracted Text</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(extractedText)}
                    disabled={!extractedText} className="flex items-center gap-1">
                    <Copy size={14} />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => {
                    const blob = new Blob([extractedText], { type: "text/plain" });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `${imageName.split(".")[0]}-extracted.txt`;
                    a.click();
                    URL.revokeObjectURL(url);
                  }} disabled={!extractedText} className="flex items-center gap-1">
                    <Download size={14} />
                    Download
                  </Button>
                </div>
              </div>
              <Textarea
                placeholder={processing ? "Processing image..." : "Extracted text will appear here..."}
                className="min-h-[300px] font-mono text-base"
                value={extractedText}
                readOnly
              />
            </div>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the OCR - Image to Text Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the OCR Tool</h4>
      <p>The OCR (Optical Character Recognition) tool allows you to extract text from images quickly and accurately.</p>

      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click "Select Image" to upload an image from your device.</li>
        <li>Alternatively, drag and drop an image file into the upload area.</li>
        <li>Supported formats: PNG, JPG, JPEG, GIF, BMP.</li>
        <li>For best results, use high-contrast images with at least 300 DPI resolution.</li>
        <li>Once uploaded, the tool will extract and display the text from the image.</li>
        <li>Copy or download the extracted text for further use.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Extracts text from images with high accuracy.</li>
        <li>Supports multiple image formats (PNG, JPG, GIF, BMP, etc.).</li>
        <li>Fast processing with an easy-to-use interface.</li>
        <li>Copy or download extracted text instantly.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>


    </div>
    </>
  );
};
