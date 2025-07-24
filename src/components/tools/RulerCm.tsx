
import React, { useState, useEffect, useRef } from "react";
import { Ruler, RotateCcw, ChevronsUpDown, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import html2canvas from "html2canvas";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const RulerCm = () => {
  const [dpi, setDpi] = useState<number | null>(null);
  const [isCalibrating, setIsCalibrating] = useState(false);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const rulerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Detect DPI on component mount
  useEffect(() => {
    detectDPI();
  }, []);

  const detectDPI = () => {
    // Create a div to measure DPI
    const dpiDiv = document.createElement('div');
    dpiDiv.style.position = 'absolute';
    dpiDiv.style.width = '1in';
    dpiDiv.style.height = '1in';
    dpiDiv.style.left = '-100%';
    dpiDiv.style.top = '-100%';
    document.body.appendChild(dpiDiv);
    
    // Get the computed width in pixels
    const computedWidth = getComputedStyle(dpiDiv).width;
    // Extract number from string "Xpx" and convert to number
    const dpiValue = parseInt(computedWidth.replace('px', ''), 10);
    document.body.removeChild(dpiDiv);
    
    setDpi(dpiValue);
    
    // If DPI is too far from standard values, suggest calibration
    if (dpiValue < 72 || dpiValue > 120) {
      setIsCalibrating(true);
    }
  };

  const toggleOrientation = () => {
    setOrientation(orientation === 'horizontal' ? 'vertical' : 'horizontal');
  };

  const downloadRuler = async () => {
    if (!rulerRef.current) return;
    
    try {
      const canvas = await html2canvas(rulerRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
      });
      
      // Convert to PNG and download
      const dataUrl = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `ruler-${orientation === 'horizontal' ? 'cm' : 'cm-vertical'}.png`;
      link.click();
      
      toast({
        title: "Ruler downloaded",
        description: "Your ruler image has been downloaded",
      });
    } catch (error) {
      console.error('Error downloading ruler:', error);
      
      toast({
        title: "Download failed",
        description: "Could not download the ruler image",
        variant: "destructive",
      });
    }
  };

  // Generate ruler markings
  const generateRulerMarkings = () => {
    if (!dpi) return null;
    
    const cmInPixels = dpi / 2.54; // Convert inch to cm
    const mmInPixels = cmInPixels / 10; // Convert cm to mm
    
    const totalCm = 15; // 15cm ruler
    const markings = [];
    
    for (let cm = 0; cm <= totalCm; cm++) {
      // Add cm marking
      markings.push(
        <div
          key={`cm-${cm}`}
          className="absolute flex items-end justify-center"
          style={{
            [orientation === 'horizontal' ? 'left' : 'top']: `${cm * cmInPixels}px`,
            [orientation === 'horizontal' ? 'top' : 'left']: '0',
            [orientation === 'horizontal' ? 'height' : 'width']: '100%',
            [orientation === 'horizontal' ? 'width' : 'height']: '1px',
          }}
        >
          <div
            className="bg-black dark:bg-white"
            style={{
              [orientation === 'horizontal' ? 'height' : 'width']: '8px',
              [orientation === 'horizontal' ? 'width' : 'height']: '1px',
            }}
          />
          <span
            className={`text-xs absolute ${
              orientation === 'horizontal' 
                ? 'bottom-[-20px] transform -translate-x-1/2' 
                : 'right-[-20px] transform -translate-y-1/2'
            }`}
          >
            {cm}
          </span>
        </div>
      );
      
      // Add mm markings (skip at 0cm position)
      if (cm < totalCm) {
        for (let mm = 1; mm < 10; mm++) {
          const height = mm === 5 ? '6px' : '4px';
          markings.push(
            <div
              key={`mm-${cm}-${mm}`}
              className="absolute bg-black dark:bg-white"
              style={{
                [orientation === 'horizontal' ? 'left' : 'top']: `${(cm * cmInPixels) + (mm * mmInPixels)}px`,
                [orientation === 'horizontal' ? 'height' : 'width']: height,
                [orientation === 'horizontal' ? 'width' : 'height']: '1px',
              }}
            />
          );
        }
      }
    }
    
    return markings;
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
                       <BreadcrumbPage>Ruler (cm/mm)</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Ruler className="mr-2 text-primary" size={24} />
            <CardTitle>Ruler (cm/mm)</CardTitle>
          </div>
          <CardDescription>
            Measure objects with an on-screen ruler
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
            {isCalibrating ? (
              <div className="border rounded-md p-4 bg-muted/30">
                <h3 className="text-lg font-medium mb-2">Calibration Needed</h3>
                <p className="mb-4">
                  For accurate measurements, please calibrate the ruler with a physical object of known size.
                </p>
                <p className="mb-2">
                  1. Place a credit card (85.60mm) or a standard dollar bill (155.81mm) against your screen.
                </p>
                <p className="mb-4">
                  2. Adjust your browser zoom until the ruler matches the physical object.
                </p>
                <Button
                  onClick={() => setIsCalibrating(false)}
                  className="flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  Reset and Continue
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center space-y-4">
                <div
                  ref={rulerRef}
                  className={`relative w-full ${
                    orientation === 'vertical' ? 'h-[400px]' : 'h-16'
                  } border border-black dark:border-white overflow-hidden bg-white dark:bg-black`}
                >
                  {dpi && (
                    <>
                      <div 
                        className={`absolute ${
                          orientation === 'horizontal' 
                            ? 'left-0 top-0 h-full border-r' 
                            : 'left-0 top-0 w-full border-b'
                        } border-black dark:border-white`} 
                      />
                      {generateRulerMarkings()}
                    </>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant="outline"
                    onClick={toggleOrientation}
                    className="flex items-center gap-2"
                  >
                    <ChevronsUpDown size={16} />
                    {orientation === 'horizontal' ? 'Switch to Vertical' : 'Switch to Horizontal'}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={downloadRuler}
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download Ruler
                  </Button>
                </div>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              <h3 className="font-medium mb-1">How to use:</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Place the object against your screen to measure it.</li>
                <li>For most accurate results, calibrate the ruler first.</li>
                <li>Each small mark represents 1mm, larger marks are 5mm, and numbered marks are centimeters.</li>
                <li>Switch between horizontal and vertical orientation as needed.</li>
                <li>You can download the ruler image for printing.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Ruler Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Ruler Tool</h4>
      <p>The Ruler Tool allows you to measure objects directly on your screen.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Place the object against your screen to measure it.</li>
        <li>For best accuracy, calibrate the ruler before use.</li>
        <li>Switch between horizontal and vertical orientation as needed.</li>
        <li>Use the markings to measure in millimeters and centimeters.</li>
        <li>Click "Download Ruler" to save and print it for offline use.</li>
      </ol>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
