import React, { useState, useRef, useEffect } from "react";
import { Upload, Pipette, Copy, Check, X, Trash2, Maximize2, Minimize2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ToolLayout from "@/components/ui/ToolLayout";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface PickedColor {
  id: string;
  color: string;
  x: number;
  y: number;
}

const ColorPickerFromImage = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [pickedColors, setPickedColors] = useState<PickedColor[]>([]);
  const [pickerMode, setPickerMode] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageUrl(result);
      setPickedColors([]);
      toast.success("Image loaded successfully");
    };
    
    reader.onerror = () => {
      toast.error("Error reading file");
    };
    
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (!imageUrl || !imageRef.current) return;

    const img = imageRef.current;
    img.onload = () => {
      if (!containerRef.current) return;
      
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = 400;
      
      const imgRatio = img.naturalWidth / img.naturalHeight;
      let canvasWidth = containerWidth;
      let canvasHeight = containerWidth / imgRatio;
      
      if (canvasHeight > containerHeight) {
        canvasHeight = containerHeight;
        canvasWidth = containerHeight * imgRatio;
      }
      
      setCanvasSize({ width: canvasWidth, height: canvasHeight });

      const canvas = canvasRef.current;
      if (!canvas) return;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [imageUrl, zoomLevel]);

  const getColorAtPosition = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    
    const pixel = ctx.getImageData(x, y, 1, 1).data;
    
    const rgbToHex = (r: number, g: number, b: number) => {
      return "#" + [r, g, b].map(x => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      }).join("");
    };
    
    return rgbToHex(pixel[0], pixel[1], pixel[2]);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!pickerMode || !canvasRef.current) return;
    
    const rect = canvasRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left);
    const y = (e.clientY - rect.top);
    
    const color = getColorAtPosition(x, y);
    if (!color) return;
    
    const newColor: PickedColor = { id: Date.now().toString(), color, x, y };
    setPickedColors(prev => [...prev, newColor]);
    toast.success(`Color picked: ${color}`);
  };

  const togglePickerMode = () => {
    setPickerMode(!pickerMode);
    if (!pickerMode) {
      toast.info("Click anywhere on the image to pick a color");
    }
  };

  const removeColor = (id: string) => {
    setPickedColors(prev => prev.filter(color => color.id !== id));
  };

  const clearColors = () => {
    setPickedColors([]);
    toast.info("All picked colors cleared");
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Color copied to clipboard");
    
    setTimeout(() => {
      setCopied(null);
    }, 1500);
  };

  const toggleZoom = () => {
    setZoomLevel(prev => prev === 1 ? 1.5 : 1);
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
            <BreadcrumbPage>Color Picker From Image</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Color Picker from Image</CardTitle>
            <Button variant="outline" size="sm" onClick={toggleZoom} className="flex items-center text-xs">
              {zoomLevel > 1 ? (
                <Minimize2 size={14} className="mr-1.5" />
              ) : (
                <Maximize2 size={14} className="mr-1.5" />
              )}
              {zoomLevel > 1 ? "Zoom Out" : "Zoom In"}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-2">
            <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
            <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="text-xs">
              <Upload size={14} className="mr-1.5" />
              Upload Image
            </Button>
            <Button variant={pickerMode ? "default" : "outline"} size="sm" onClick={togglePickerMode} className="text-xs" disabled={!imageUrl}>
              <Pipette size={14} className="mr-1.5" />
              {pickerMode ? "Picking..." : "Pick Colors"}
            </Button>
          </div>

          {imageUrl && (
            <div ref={containerRef} className="flex items-center justify-center overflow-hidden max-h-[500px]">
              <img ref={imageRef} src={imageUrl} alt="Uploaded" className="hidden" />
              <canvas
                ref={canvasRef}
                onClick={handleCanvasClick}
                className={`mx-auto ${pickerMode ? "cursor-crosshair" : "cursor-default"}`}
                style={{
                  width: canvasSize.width * zoomLevel,
                  height: canvasSize.height * zoomLevel,
                  maxWidth: "100vw",
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Picked Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {pickedColors.length === 0 ? (
            <div className="text-center p-8 text-gray-500 border border-dashed border-gray-200 rounded-lg">
              <Pipette size={24} className="mx-auto mb-2 text-gray-300" />
              <p className="text-xs">Click on the image to pick colors</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto">
              {pickedColors.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded" style={{ backgroundColor: item.color }} />
                  <div className="flex-1">
                    <input type="text" value={item.color} readOnly className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm text-center" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="link" size="sm" onClick={() => copyToClipboard(item.color, item.id)} disabled={copied === item.id} className="text-xs">
                      <Copy size={14} className="mr-1.5" />
                      {copied === item.id ? <Check size={14} /> : "Copy"}
                    </Button>
                    <Button variant="link" size="sm" onClick={() => removeColor(item.id)} className="text-xs">
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <Button variant="outline" size="sm" onClick={clearColors} className="w-full mt-4">
            Clear All
          </Button>
        </CardContent>
      </Card>

      
<GuidanceSection title="How to Use the Color Picker from Image">
<div className="space-y-4">
  <div>
    <h4 className="font-medium mb-1">Using the Color Picker from Image</h4>
    <p>The Color Picker from Image allows you to extract color codes from any uploaded image.</p>
    <p className="mt-2"><strong>How to Use:</strong></p>
    <ol className="list-decimal pl-5">
      <li>Click "Upload Image" and select an image file.</li>
      <li>Once uploaded, click on the image to pick colors.</li>
      <li>The extracted colors will be displayed with their hex codes.</li>
      <li>Use the selected colors for design projects or reference.</li>
    </ol>
  </div>

  <div>
    <h4 className="font-medium mb-1">Features</h4>
    <ul className="list-disc pl-5">
      <li>Supports multiple image formats (PNG, JPG, JPEG, GIF, WebP).</li>
      <li>Extracts accurate hex codes from any image.</li>
      <li>Easy-to-use interface for selecting colors.</li>
      <li>Ideal for designers and developers working with color palettes.</li>
    </ul>
  </div>
</div>
</GuidanceSection>
    </>
  );
};

export default ColorPickerFromImage;


