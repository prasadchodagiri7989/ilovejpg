import React, { useState, useEffect } from "react";
import { Copy, Check, Maximize2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "../GuidanceSection";

const ScreenResolution = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);
  const [deviceType, setDeviceType] = useState("");
  const [orientation, setOrientation] = useState("");
  const [dpr, setDpr] = useState(window.devicePixelRatio || 1);
  const [colorDepth, setColorDepth] = useState(window.screen.colorDepth || 24);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
      updateDeviceType(window.innerWidth);
      updateOrientation(window.innerWidth, window.innerHeight);
    };

    const updateDeviceType = (width) => {
      if (width < 640) setDeviceType("Mobile");
      else if (width < 768) setDeviceType("Large Mobile / Small Tablet");
      else if (width < 1024) setDeviceType("Tablet");
      else if (width < 1280) setDeviceType("Laptop");
      else if (width < 1536) setDeviceType("Desktop");
      else setDeviceType("Large Desktop");
    };

    const updateOrientation = (width, height) => {
      setOrientation(width > height ? "Landscape" : "Portrait");
    };

    updateDeviceType(window.innerWidth);
    updateOrientation(window.innerWidth, window.innerHeight);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const copyToClipboard = () => {
    const resText = `Screen Resolution: ${screenWidth} × ${screenHeight}
Viewport Size: ${window.innerWidth} × ${window.innerHeight}
Device Type: ${deviceType}
Orientation: ${orientation}
Device Pixel Ratio: ${dpr}
Color Depth: ${colorDepth} bits`;

    navigator.clipboard.writeText(resText);
    setCopied(true);
    toast.success("Resolution info copied to clipboard");
    setTimeout(() => setCopied(false), 1500);
  };

  const launchFullscreen = () => {
    document.documentElement.requestFullscreen().catch(() => {
      toast.error("Fullscreen request failed");
    });
  };

  const commonResolutions = [
    { name: "Mobile (Small)", width: 320, height: 568 },
    { name: "Mobile (Medium)", width: 375, height: 667 },
    { name: "Mobile (Large)", width: 414, height: 896 },
    { name: "Tablet", width: 768, height: 1024 },
    { name: "Laptop", width: 1366, height: 768 },
    { name: "Desktop", width: 1920, height: 1080 },
    { name: "4K", width: 3840, height: 2160 },
  ];

  const isCommonResolution = () => {
    return commonResolutions.some(
      (res) =>
        (res.width === screenWidth && res.height === screenHeight) ||
        (res.height === screenWidth && res.width === screenHeight)
    );
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
            <BreadcrumbPage>Screen Resolution</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <CardTitle>Screen Resolution Checker</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-4xl font-bold text-primary text-center">
            {screenWidth} × {screenHeight} px
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div><strong>Device Type:</strong> {deviceType}</div>
            <div><strong>Orientation:</strong> {orientation}</div>
            <div><strong>Pixel Ratio:</strong> {dpr}x</div>
            <div><strong>Color Depth:</strong> {colorDepth} bits</div>
          </div>

          <div className="flex space-x-3">
            <Button onClick={copyToClipboard} variant="outline" className="flex-1">
              {copied ? <><Check size={16} className="mr-1.5" />Copied</> : <><Copy size={16} className="mr-1.5" />Copy Info</>}
            </Button>
            <Button onClick={launchFullscreen} variant="outline">
              <Maximize2 size={16} className="mr-1.5" />Fullscreen
            </Button>
          </div>

          <div className="mt-4">
            <h3 className="text-sm font-medium mb-2">Common Resolutions</h3>
            <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
              {commonResolutions.map((res, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-md text-sm border dark:bg-transparent ${
                    (res.width === screenWidth && res.height === screenHeight) ||
                    (res.height === screenWidth && res.width === screenHeight)
                      ? "bg-primary/5 border-primary"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  {res.name}: {res.width} × {res.height}
                </div>
              ))}
            </div>
          </div>

          <p className="text-sm text-gray-600 mt-2">
            Your current resolution {isCommonResolution() ? "matches" : "does not match"} a standard device.
            {dpr > 1 && ` Effective resolution: ${Math.round(screenWidth * dpr)} × ${Math.round(screenHeight * dpr)} px.`}
          </p>
        </CardContent>
      </Card>

      <GuidanceSection title="How to Use the Screen Resolution Checker">
      <div className="space-y-4">
        <div>
          <h4 className="font-medium mb-1">Understanding Your Screen Resolution</h4>
          <p>The Screen Resolution Checker provides detailed information about your display settings, including resolution, pixel density, and orientation.</p>

          <p className="mt-2"><strong>How to Use:</strong></p>
          <ol className="list-decimal pl-5">
            <li>View your current screen resolution and device type at a glance.</li>
            <li>Compare your resolution with common device resolutions.</li>
            <li>Use the "Copy Info" button to copy resolution details for reference.</li>
            <li>Toggle "Fullscreen" to check changes in display dimensions.</li>
          </ol>
        </div>

        <div>
          <h4 className="font-medium mb-1">Why This Tool is Useful?</h4>
          <ul className="list-disc pl-5">
            <li>Helps developers test responsive web designs across different screen sizes.</li>
            <li>Provides quick access to pixel ratio and color depth for media professionals.</li>
            <li>Identifies whether the current screen matches standard device resolutions.</li>
          </ul>
        </div>
      </div>
      </GuidanceSection>
    </div>
  );
};

export default ScreenResolution;
