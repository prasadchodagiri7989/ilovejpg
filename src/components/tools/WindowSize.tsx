import React, { useState, useEffect } from "react";
import { Copy, Check, ArrowDownUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "../GuidanceSection";

const WindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);
  const [deviceWidth, setDeviceWidth] = useState(window.screen.width);
  const [deviceHeight, setDeviceHeight] = useState(window.screen.height);
  const [devicePixelRatio, setDevicePixelRatio] = useState(window.devicePixelRatio || 1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const copyToClipboard = () => {
    const sizeText = `Window Size: ${windowWidth} × ${windowHeight}px
Viewport Size: ${viewportWidth} × ${viewportHeight}px
Device Size: ${deviceWidth} × ${deviceHeight}px
Device Pixel Ratio: ${devicePixelRatio}`;

    navigator.clipboard.writeText(sizeText);
    setCopied(true);
    toast.success("Window size info copied to clipboard");

    setTimeout(() => {
      setCopied(false);
    }, 1500);
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
            <BreadcrumbPage>Window Size</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Window Size</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.location.href = "/tools/other-tool"}
              className="flex items-center text-xs"
            >
              <ArrowDownUp size={14} className="mr-1.5" />
              Switch Tool
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-6xl font-bold text-primary flex items-end">
            {windowWidth} <span className="mx-2 text-gray-300 text-5xl">×</span> {windowHeight}
          </div>
          <div className="mt-2 text-gray-500">Window Pixels</div>

          <Button onClick={copyToClipboard} className="w-full">
            {copied ? (
              <div className="flex items-center justify-center">
                <Check size={16} className="mr-1.5" />
                Copied
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <Copy size={16} className="mr-1.5" />
                Copy Info
              </div>
            )}
          </Button>

          <div className="space-y-3 mt-6">
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg dark:bg-transparent">
              <div className="text-sm text-gray-500 mb-1">Viewport</div>
              <div className="font-medium flex justify-between">
                <span>Width: {viewportWidth}px</span>
                <span>Height: {viewportHeight}px</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg dark:bg-transparent">
              <div className="text-sm text-gray-500 mb-1">Device</div>
              <div className="font-medium flex justify-between">
                <span>Width: {deviceWidth}px</span>
                <span>Height: {deviceHeight}px</span>
              </div>
            </div>

            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg dark:bg-transparent">
              <div className="text-sm text-gray-500 mb-1">Pixel Ratio</div>
              <div className="font-medium">
                {devicePixelRatio}x
                <span className="text-xs text-gray-500 ml-2">
                  ({devicePixelRatio > 1 ? "High DPI Display" : "Standard Display"})
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <GuidanceSection title="How to Use the Window Size Tool">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Understanding Window and Viewport Dimensions</h4>
              <p>The Window Size Tool helps you analyze your current browser window and viewport dimensions, making it useful for responsive web design testing.</p>

              <p className="mt-2"><strong>Key Metrics:</strong></p>
              <ul className="list-disc pl-5">
                <li><strong>Window Size:</strong> {windowWidth} × {windowHeight} pixels</li>
                <li><strong>Viewport Size:</strong> {viewportWidth} × {viewportHeight} pixels (excludes browser UI elements)</li>
                <li><strong>Device Screen Size:</strong> {deviceWidth} × {deviceHeight} pixels</li>
                <li><strong>Pixel Ratio:</strong> {devicePixelRatio}x (High DPI Display)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium mb-1">Features</h4>
              <ul className="list-disc pl-5">
                <li>Quickly view window and viewport dimensions.</li>
                <li>Helpful for responsive design testing.</li>
                <li>Easy to copy dimensions to clipboard for later use.</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </div>
  );
};

export default WindowSize;
