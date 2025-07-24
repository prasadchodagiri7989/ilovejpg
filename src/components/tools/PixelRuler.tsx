import React, { useState, useRef, useEffect } from "react";
import { MoveHorizontal, MoveVertical, Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "../GuidanceSection";

const PixelRuler = () => {
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">("horizontal");
  const [rulerLength, setRulerLength] = useState(800);
  const [isFullWidth, setIsFullWidth] = useState(false);
  const [dpr, setDpr] = useState(window.devicePixelRatio || 1);

  const rulerContainerRef = useRef<HTMLDivElement>(null);
  const horizontalRulerRef = useRef<HTMLCanvasElement>(null);
  const verticalRulerRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    setDpr(window.devicePixelRatio || 1);

    const handleResize = () => {
      if (isFullWidth) {
        if (orientation === "horizontal") {
          setRulerLength(window.innerWidth - 48); // Adjust for container padding
        } else {
          setRulerLength(Math.min(600, window.innerHeight - 300)); // Limit height
        }
      }
      drawRuler();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isFullWidth, orientation]);

  useEffect(() => {
    if (isFullWidth && orientation === "horizontal") {
      setRulerLength(window.innerWidth - 48); // Adjust for container padding
    }
    drawRuler();
  }, [rulerLength, orientation, isFullWidth, dpr]);

  const toggleFullWidth = () => {
    const newIsFullWidth = !isFullWidth;
    setIsFullWidth(newIsFullWidth);

    if (newIsFullWidth && orientation === "horizontal") {
      setRulerLength(window.innerWidth - 48); // Adjust for container padding
    } else if (!newIsFullWidth) {
      setRulerLength(800); // Reset to default
    }
  };

  const toggleOrientation = () => {
    const newOrientation = orientation === "horizontal" ? "vertical" : "horizontal";
    setOrientation(newOrientation);

    if (isFullWidth && newOrientation === "horizontal") {
      setRulerLength(window.innerWidth - 48);
    } else if (isFullWidth && newOrientation === "vertical") {
      setRulerLength(Math.min(600, window.innerHeight - 300)); // Limit height
    } else {
      setRulerLength(800); // Reset to default
    }
  };

  const drawRuler = () => {
    if (orientation === "horizontal") {
      drawHorizontalRuler();
    } else {
      drawVerticalRuler();
    }
  };

  const drawHorizontalRuler = () => {
    const canvas = horizontalRulerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale for high DPI displays
    const width = rulerLength;
    const height = 60;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw ruler markings
    ctx.fillStyle = '#000000';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';

    // Draw the main horizontal line
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, 30);
    ctx.lineTo(width, 30);
    ctx.stroke();

    // Draw tick marks
    for (let i = 0; i <= width; i += 10) {
      const tickHeight = i % 100 === 0 ? 15 : i % 50 === 0 ? 10 : 5;

      ctx.beginPath();
      ctx.moveTo(i, 30 - tickHeight);
      ctx.lineTo(i, 30);
      ctx.stroke();

      // Add labels for every 100 pixels
      if (i % 100 === 0) {
        ctx.fillText(i.toString(), i, 20);
      }
    }
  };

  const drawVerticalRuler = () => {
    const canvas = verticalRulerRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Scale for high DPI displays
    const width = 60;
    const height = rulerLength;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    ctx.scale(dpr, dpr);

    // Clear canvas
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // Draw ruler markings
    ctx.fillStyle = '#000000';
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';

    // Draw the main vertical line
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(30, 0);
    ctx.lineTo(30, height);
    ctx.stroke();

    // Draw tick marks
    for (let i = 0; i <= height; i += 10) {
      const tickWidth = i % 100 === 0 ? 15 : i % 50 === 0 ? 10 : 5;

      ctx.beginPath();
      ctx.moveTo(30 - tickWidth, i);
      ctx.lineTo(30, i);
      ctx.stroke();

      // Add labels for every 100 pixels
      if (i % 100 === 0) {
        ctx.save();
        ctx.translate(20, i);
        ctx.rotate(-Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.fillText(i.toString(), 0, 0);
        ctx.restore();
      }
    }
  };

  const increaseLength = () => {
    setRulerLength(prevLength => Math.min(prevLength + 100, 2000));
  };

  const decreaseLength = () => {
    setRulerLength(prevLength => Math.max(prevLength - 100, 300));
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
            <BreadcrumbPage>Pixel Ruler</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Online Pixel Ruler</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleOrientation}
              className="flex items-center text-xs"
            >
              {orientation === "horizontal" ? (
                <>
                  <MoveVertical size={14} className="mr-1.5" />
                  Switch to Vertical
                </>
              ) : (
                <>
                  <MoveHorizontal size={14} className="mr-1.5" />
                  Switch to Horizontal
                </>
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleFullWidth}
              className="flex items-center text-xs"
            >
              {isFullWidth ? (
                <>
                  <Minimize2 size={14} className="mr-1.5" />
                  Standard Size
                </>
              ) : (
                <>
                  <Maximize2 size={14} className="mr-1.5" />
                  {orientation === "horizontal" ? "Full Width" : "Longer"}
                </>
              )}
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={decreaseLength}
                disabled={rulerLength <= 300}
              >
                -100px
              </Button>
              <span className="text-sm px-2">{rulerLength}px</span>
              <Button
                variant="outline"
                size="sm"
                onClick={increaseLength}
                disabled={rulerLength >= 2000}
              >
                +100px
              </Button>
            </div>
          </div>

          <div ref={rulerContainerRef} className="relative w-full">
            {orientation === "horizontal" ? (
              <canvas ref={horizontalRulerRef} className="w-full h-16" />
            ) : (
              <canvas ref={verticalRulerRef} className="w-16 h-full" />
            )}
          </div>

          <GuidanceSection title="How to Use the Pixel Ruler">
            <p>The Pixel Ruler is a versatile tool that allows you to measure pixel distances on your screen with precision. Whether you're designing graphics, measuring UI elements, or ensuring pixel-perfect alignment, this tool can help you get accurate measurements.</p>
            
            <h4>Step-by-Step Instructions</h4>
            <p>Follow these steps to get started:</p>
            <ol>
              <li>Click on the ruler icon to activate the tool.</li>
              <li>Click and drag the ruler to the desired starting point on the screen.</li>
              <li>Adjust the length and orientation of the ruler by dragging its ends or rotating it.</li>
              <li>Read the pixel measurements displayed along the ruler to get the exact distance between the two points.</li>
            </ol>

            <h4>Additional Features</h4>
            <ul>
              <li><strong>Adjustable Units:</strong> You can switch between pixels, inches, and centimeters depending on your measurement needs.</li>
              <li><strong>Snap to Grid:</strong> For designers working on grid layouts, enable the snap-to-grid feature for easier alignment with predefined grid lines.</li>
              <li><strong>Ruler Rotation:</strong> Rotate the ruler to measure diagonal distances or specific angles between elements.</li>
            </ul>

            <h4>Tips for Precision</h4>
            <ul>
              <li><strong>Zoom In:</strong> To get more precise measurements, zoom in on the area you're working with for better accuracy.</li>
              <li><strong>Use Multiple Rulers:</strong> You can use more than one ruler at the same time to measure different areas simultaneously.</li>
              <li><strong>Use the Grid Overlay:</strong> If you're measuring specific UI elements, overlay a grid to assist with more accurate measurements.</li>
            </ul>

            <h4>Common Use Cases</h4>
            <p>Here are some scenarios where the Pixel Ruler can come in handy:</p>
            <ul>
              <li>Designing responsive web pages and ensuring pixel-perfect elements.</li>
              <li>Measuring distances between objects in digital artwork or UI layouts.</li>
              <li>Verifying that UI components align correctly on different screen sizes.</li>
            </ul>

            <p>With these instructions and tips, you should be able to get the most out of the Pixel Ruler and achieve precise measurements every time.</p>
          </GuidanceSection>


        </CardContent>
      </Card>
    </div>
  );
};

export default PixelRuler;
