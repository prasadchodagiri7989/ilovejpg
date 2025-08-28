import React, { useState } from "react";
import { Download, Palette } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"; // ✅ Make sure you have this in shadcn
import { useToast } from "@/hooks/use-toast";

export const BackgroundGenerator = () => {
  const [color, setColor] = useState("#ff0000");
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Extra feature states
  const [useGradient, setUseGradient] = useState(false);
  const [gradientColor, setGradientColor] = useState("#0000ff");
  const [gradientDirection, setGradientDirection] = useState("horizontal");

  const [usePattern, setUsePattern] = useState(false);
  const [patternSize, setPatternSize] = useState(50);

  const { toast } = useToast();

  const generateBackground = () => {
    if (width <= 0 || height <= 0) {
      toast({
        title: "Invalid resolution",
        description: "Width and height must be positive numbers",
        variant: "destructive",
      });
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Fill background
    if (useGradient) {
      let gradient;
      if (gradientDirection === "horizontal") {
        gradient = ctx.createLinearGradient(0, 0, width, 0);
      } else if (gradientDirection === "vertical") {
        gradient = ctx.createLinearGradient(0, 0, 0, height);
      } else {
        gradient = ctx.createLinearGradient(0, 0, width, height);
      }
      gradient.addColorStop(0, color);
      gradient.addColorStop(1, gradientColor);
      ctx.fillStyle = gradient;
    } else {
      ctx.fillStyle = color;
    }
    ctx.fillRect(0, 0, width, height);

    // Add pattern
    if (usePattern) {
      ctx.strokeStyle = "#ffffff55"; // semi-transparent white
      for (let x = 0; x < width; x += patternSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += patternSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }

    const url = canvas.toDataURL("image/png");
    setImageUrl(url);

    toast({
      title: "Background generated",
      description: `Resolution: ${width}x${height}`,
    });
  };

  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = `background-${width}x${height}.png`;
    link.click();
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Palette className="mr-2 text-primary" size={24} />
            <CardTitle>Background Generator</CardTitle>
          </div>
          <CardDescription>Create solid or fancy backgrounds with extra effects</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 mt-4">
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Base Color</label>
              <Input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="h-10 w-20 p-1 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Width (px)</label>
              <Input
                type="number"
                value={width}
                onChange={(e) => setWidth(parseInt(e.target.value))}
                className="w-32"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Height (px)</label>
              <Input
                type="number"
                value={height}
                onChange={(e) => setHeight(parseInt(e.target.value))}
                className="w-32"
              />
            </div>
          </div>

          {/* Gradient Option */}
          <div className="flex items-center gap-2">
            <Checkbox checked={useGradient} onCheckedChange={(v) => setUseGradient(Boolean(v))} />
            <span>Enable Gradient</span>
          </div>
          {useGradient && (
            <div className="flex flex-wrap gap-4 pl-6">
              <div>
                <label className="block text-sm mb-1">Gradient Color</label>
                <Input
                  type="color"
                  value={gradientColor}
                  onChange={(e) => setGradientColor(e.target.value)}
                  className="h-10 w-20 p-1 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Direction</label>
                <select
                  value={gradientDirection}
                  onChange={(e) => setGradientDirection(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="horizontal">Horizontal</option>
                  <option value="vertical">Vertical</option>
                  <option value="diagonal">Diagonal</option>
                </select>
              </div>
            </div>
          )}

          {/* Pattern Option */}
          <div className="flex items-center gap-2">
            <Checkbox checked={usePattern} onCheckedChange={(v) => setUsePattern(Boolean(v))} />
            <span>Enable Grid Pattern</span>
          </div>
          {usePattern && (
            <div className="pl-6">
              <label className="block text-sm mb-1">Grid Size (px)</label>
              <Input
                type="number"
                value={patternSize}
                onChange={(e) => setPatternSize(parseInt(e.target.value))}
                className="w-32"
              />
            </div>
          )}

          <Button onClick={generateBackground}>
            Generate Background
          </Button>

          {imageUrl && (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden w-full max-h-[400px] flex items-center justify-center bg-muted">
                <img src={imageUrl} alt="Generated Background" className="max-w-full max-h-[400px]" />
              </div>
              <Button onClick={downloadImage}>
                <Download size={16} className="mr-1" /> Download PNG
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
