import React, { useState } from "react";
import { Download, Trash2, ArrowDownUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js
import { GuidanceSection } from "../GuidanceSection";

const Base64ToImage = () => {
  const [base64Input, setBase64Input] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageType, setImageType] = useState("png");
  const [fileName, setFileName] = useState("converted-image");

  const convertToImage = () => {
    if (!base64Input) {
      toast.error("Please enter a Base64 string");
      return;
    }

    try {
      let base64Data = base64Input.trim();
      if (base64Data.startsWith("data:")) {
        const matches = base64Data.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          const detectedType = matches[1];
          base64Data = matches[2];
          
          if (detectedType.includes("png")) setImageType("png");
          else if (detectedType.includes("jpeg") || detectedType.includes("jpg")) setImageType("jpeg");
          else if (detectedType.includes("gif")) setImageType("gif");
          else if (detectedType.includes("svg")) setImageType("svg");
          else setImageType("png");
        }
      }

      const imageUrl = `data:image/${imageType};base64,${base64Data}`;
      setImageUrl(imageUrl);
      toast.success("Base64 converted to image");
    } catch (error) {
      toast.error("Could not convert Base64 to image. Check your input.");
    }
  };

  const downloadImage = () => {
    if (!imageUrl) return;

    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `${fileName}.${imageType}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("Image downloaded");
  };

  const clearImage = () => {
    setImageUrl("");
    toast.info("Image cleared");
  };

  const swapTool = () => {
    window.location.href = "/tools/base64-encode";
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Base64 to Image</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Base64 to Image Converter</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={swapTool}
              className="flex items-center text-xs"
            >
              <ArrowDownUp size={14} className="mr-1.5" />
              Switch to Encode
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="base64Input" className="block text-sm font-medium text-gray-700">
              Base64 String
            </label>
            <textarea
              id="base64Input"
              value={base64Input}
              onChange={(e) => setBase64Input(e.target.value)}
              placeholder="Paste your Base64 string here..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all dark:bg-transparent min-h-[120px]"
            />
            <p className="text-xs text-gray-500">Paste a Base64 string with or without the data URL prefix</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="imageType" className="block text-sm font-medium text-gray-700">
                Image Type
              </label>
              <select
                id="imageType"
                value={imageType}
                onChange={(e) => setImageType(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all dark:bg-transparent dark:text-black"
              >
                <option value="png">PNG</option>
                <option value="jpeg">JPEG</option>
                <option value="gif">GIF</option>
                <option value="svg+xml">SVG</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="fileName" className="block text-sm font-medium text-gray-700">
                File Name
              </label>
              <input
                id="fileName"
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all dark:bg-transparent dark:text-black"
              />
            </div>
          </div>

          <Button onClick={convertToImage} className="w-full">
            Convert to Image
          </Button>

          {imageUrl && (
            <div className="space-y-4 mt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-gray-700">Preview</h3>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearImage}
                    className="flex items-center text-xs"
                  >
                    <Trash2 size={14} className="mr-1.5" />
                    Clear
                  </Button>
                  <Button
                    size="sm"
                    onClick={downloadImage}
                    className="flex items-center text-xs"
                  >
                    <Download size={14} className="mr-1.5" />
                    Download
                  </Button>
                </div>
              </div>
              <div className="p-4 bg-[#f5f5f5] border border-gray-200 rounded-lg flex items-center justify-center min-h-[200px] max-h-[400px] overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Converted from Base64"
                  className="max-w-full max-h-[360px] object-contain"
                />
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title="How to Use the Base64 to Image Converter">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Using the Base64 to Image Converter</h4>
            <p>The Base64 to Image Converter allows you to convert Base64 encoded strings into viewable and downloadable images.</p>
            <p className="mt-2"><strong>How to Use:</strong></p>
            <ol className="list-decimal pl-5">
              <li>Paste your Base64 encoded string into the input field.</li>
              <li>Ensure the string includes or excludes the data URL prefix as needed.</li>
              <li>Select the desired image format (e.g., PNG).</li>
              <li>Specify a file name for the converted image.</li>
              <li>Click "Convert to Image" to generate the image from the Base64 string.</li>
              <li>View and download the generated image for further use.</li>
            </ol>
          </div>

          <div>
            <h4 className="font-medium mb-1">Features</h4>
            <ul className="list-disc pl-5">
              <li>Converts Base64 encoded strings into images instantly.</li>
              <li>Supports multiple image formats, including PNG.</li>
              <li>Allows customization of the file name before downloading.</li>
              <li>Easy-to-use interface for quick conversions.</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </div>
  );
};

export default Base64ToImage;
