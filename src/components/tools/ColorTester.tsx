import React, { useState } from "react";
import { Copy, Check, Plus, X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "../GuidanceSection";

type ColorItem = {
  id: string;
  color: string;
  name: string;
};

const ColorTester = () => {
  const [colors, setColors] = useState<ColorItem[]>([
    { id: "1", color: "#3b82f6", name: "Blue" },
    { id: "2", color: "#ef4444", name: "Red" },
    { id: "3", color: "#10b981", name: "Green" },
  ]);
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [textColor, setTextColor] = useState("#000000");
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(null), 1500);
  };

  const addNewColor = () => {
    const newId = Date.now().toString();
    setColors([...colors, { id: newId, color: "#000000", name: `Color ${colors.length + 1}` }]);
  };

  const updateColor = (id: string, field: keyof ColorItem, value: string) => {
    setColors(colors.map(color => (color.id === id ? { ...color, [field]: value } : color)));
  };

  const removeColor = (id: string) => {
    setColors(colors.filter(color => color.id !== id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 space-y-8">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Color Tester</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Background & Text Colors</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="w-12 h-10 p-0 border-0 rounded cursor-pointer dark:bg-transparent"
            />
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Background Color</label>
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-l-lg text-sm dark:bg-transparent"
              />
              <button
                onClick={() => copyToClipboard(backgroundColor, "bg")}
                className="px-2 py-1.5 bg-gray-100 border-y border-r border-gray-200 rounded-r-lg dark:bg-transparent"
              >
                {copied === "bg" ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-500" />}
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="color"
              value={textColor}
              onChange={(e) => setTextColor(e.target.value)}
              className="w-12 h-10 p-0 border-0 rounded cursor-pointer dark:bg-transparent"
            />
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">Text Color</label>
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-gray-200 rounded-l-lg text-sm dark:bg-transparent"
              />
              <button
                onClick={() => copyToClipboard(textColor, "text")}
                className="px-2 py-1.5 bg-gray-100 border-y border-r border-gray-200 rounded-r-lg dark:bg-transparent"
              >
                {copied === "text" ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-500" />}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 max-h-[200px] overflow-y-auto">
            {colors.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <input
                  type="color"
                  value={item.color}
                  onChange={(e) => updateColor(item.id, "color", e.target.value)}
                  className="w-12 h-10 p-0 border-0 rounded cursor-pointer dark:bg-transparent"
                />
                <div className="flex-1 space-y-1">
                  <input
                    type="text"
                    value={item.color}
                    onChange={(e) => updateColor(item.id, "color", e.target.value)}
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm w-full dark:bg-transparent"
                  />
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => updateColor(item.id, "name", e.target.value)}
                    placeholder="Name"
                    className="px-3 py-1.5 border border-gray-200 rounded-lg text-sm w-full dark:bg-transparent"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => copyToClipboard(item.color, item.id)}
                    className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg dark:bg-transparent"
                  >
                    {copied === item.id ? <Check size={14} className="text-green-500" /> : <Copy size={14} className="text-gray-500" />}
                  </button>
                  <button
                    onClick={() => removeColor(item.id)}
                    className="px-3 py-1.5 bg-gray-100 border border-gray-200 rounded-lg dark:bg-transparent"
                  >
                    <X size={14} className="text-gray-500" />
                  </button>
                </div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={addNewColor} className="w-full mt-3">
              <Plus size={14} className="mr-1.5" />
              Add Color
            </Button>
          </div>
        </CardContent>
      </Card>

      <GuidanceSection title="How to Use the Color Tester">
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-1">Using the Color Tester</h4>
            <p>The Color Tester allows you to test color combinations for contrast and accessibility.</p>
            <p className="mt-2"><strong>How to Use:</strong></p>
            <ol className="list-decimal pl-5">
              <li>Select a background color using the color picker or enter a hex code.</li>
              <li>Select a text color to test its contrast against the background.</li>
              <li>Optionally, add additional colors for testing and comparison.</li>
              <li>Use the preview section to see how the text appears with your chosen colors.</li>
              <li>Check the contrast analysis to ensure readability and accessibility.</li>
            </ol>
          </div>
          <div>
            <h4 className="font-medium mb-1">Features</h4>
            <ul className="list-disc pl-5">
              <li>Instant preview of color combinations.</li>
              <li>Supports both manual hex code entry and color pickers.</li>
              <li>Contrast analysis to ensure accessibility compliance.</li>
              <li>Option to add multiple colors for easy comparison.</li>
            </ul>
          </div>
        </div>
      </GuidanceSection>
    </div>
  );
};

export default ColorTester;
