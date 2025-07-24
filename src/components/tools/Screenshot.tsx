import React, { useState, useRef } from "react";
import { Image, Camera, Download, Monitor, Crop, Copy, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const Screenshot = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [useCountdown, setUseCountdown] = useState(false);
  const [countdownDuration, setCountdownDuration] = useState("3");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  
  const countdownTimerRef = useRef<number | null>(null);

  const captureScreen = async () => {
    try {
      // Reset error state and previous capture
      setErrorMessage(null);
      if (capturedImage) {
        URL.revokeObjectURL(capturedImage);
        setCapturedImage(null);
      }
      
      // Start countdown if enabled
      if (useCountdown) {
        const seconds = parseInt(countdownDuration);
        setCountdown(seconds);
        
        let remainingSeconds = seconds;
        countdownTimerRef.current = window.setInterval(() => {
          remainingSeconds -= 1;
          setCountdown(remainingSeconds);
          
          if (remainingSeconds <= 0) {
            if (countdownTimerRef.current) {
              clearInterval(countdownTimerRef.current);
              countdownTimerRef.current = null;
            }
            doCapture();
          }
        }, 1000);
      } else {
        // Capture immediately
        doCapture();
      }
    } catch (error) {
      console.error('Error in screenshot process:', error);
      handleError("An unexpected error occurred. Please try again.");
    }
  };
  
  const doCapture = async () => {
    try {
      // Request screen capture - use proper constraints format
      // The displayMedia API doesn't use mediaSource directly in constraints
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true, // Standard video constraints
        audio: false
      });
      
      // Create video element to get a frame
      const video = document.createElement("video");
      video.srcObject = stream;
      
      // When video is loaded, capture a frame
      video.onloadedmetadata = () => {
        video.play();
        
        // Slight delay to ensure play has started
        setTimeout(() => {
          // Create canvas to draw the frame
          const canvas = document.createElement("canvas");
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
          
          // Convert to image
          const imageUrl = canvas.toDataURL("image/png");
          setCapturedImage(imageUrl);
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
          
          toast({
            title: "Screenshot captured",
            description: "Your screenshot is ready to download",
          });
        }, 100);
      };
    } catch (error) {
      console.error('Error capturing screenshot:', error);
      
      // Check for specific errors
      if (error instanceof DOMException) {
        if (error.name === 'NotAllowedError') {
          handleError("Screenshot permission denied. Please allow screen capture access.");
        } else if (error.name === 'AbortError') {
          // User cancelled, this is not an error
          handleError(null);
        } else {
          handleError("Failed to capture screenshot. Please try again.");
        }
      } else {
        handleError("An unexpected error occurred. Please try again.");
      }
    }
  };
  
  const handleError = (message: string | null) => {
    setErrorMessage(message);
    
    if (message) {
      toast({
        title: "Screenshot failed",
        description: message,
        variant: "destructive",
      });
    }
    
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
      setCountdown(null);
    }
  };

  const downloadImage = () => {
    if (!capturedImage) return;
    
    const a = document.createElement('a');
    a.href = capturedImage;
    a.download = `screenshot-${new Date().toISOString().replace(/[:.]/g, '-')}.png`;
    a.click();
    
    toast({
      title: "Download started",
      description: "Your screenshot is being downloaded",
    });
  };

  const copyToClipboard = async () => {
    if (!capturedImage) return;
    
    try {
      // Convert data URL to blob
      const response = await fetch(capturedImage);
      const blob = await response.blob();
      
      // Copy to clipboard
      await navigator.clipboard.write([
        new ClipboardItem({
          [blob.type]: blob
        })
      ]);
      
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "Copied to clipboard",
        description: "Screenshot copied to clipboard successfully",
      });
    } catch (error) {
      console.error('Failed to copy screenshot:', error);
      
      toast({
        title: "Copy failed",
        description: "Could not copy to clipboard. Try downloading instead.",
        variant: "destructive",
      });
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
                       <BreadcrumbPage>Screenshot Tool</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Image className="mr-2 text-primary" size={24} />
            <CardTitle>Screenshot Tool</CardTitle>
          </div>
          <CardDescription>
            Capture screenshots of your screen or applications
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
            {countdown !== null ? (
              <div className="aspect-video bg-black/90 rounded-md flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-7xl font-bold animate-pulse">{countdown}</div>
                  <p className="mt-2">Taking screenshot in {countdown} {countdown === 1 ? 'second' : 'seconds'}...</p>
                </div>
              </div>
            ) : capturedImage ? (
              <div className="border rounded-md overflow-hidden">
                <img 
                  src={capturedImage} 
                  alt="Screenshot" 
                  className="max-w-full h-auto"
                />
              </div>
            ) : (
              <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Monitor size={48} className="mx-auto mb-4" />
                  <p>Click the capture button to take a screenshot</p>
                  <p className="text-sm mt-1">You'll be prompted to select which screen or window to capture</p>
                </div>
              </div>
            )}
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="countdown-toggle" className="cursor-pointer">Use countdown timer</Label>
                <Switch
                  id="countdown-toggle"
                  checked={useCountdown}
                  onCheckedChange={setUseCountdown}
                  disabled={countdown !== null}
                />
              </div>
              
              {useCountdown && (
                <div className="space-y-2">
                  <Label htmlFor="countdown-seconds">Countdown seconds</Label>
                  <Select 
                    value={countdownDuration} 
                    onValueChange={setCountdownDuration}
                    disabled={countdown !== null}
                  >
                    <SelectTrigger id="countdown-seconds" className="w-full">
                      <SelectValue placeholder="Select seconds" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 seconds</SelectItem>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {countdown === null && (
                <Button
                  onClick={captureScreen}
                  className="flex items-center gap-2"
                  disabled={countdown !== null}
                >
                  <Camera size={16} />
                  {capturedImage ? "Capture Again" : "Capture Screenshot"}
                </Button>
              )}
              
              {capturedImage && (
                <>
                  <Button
                    variant="outline"
                    onClick={downloadImage}
                    className="flex items-center gap-2"
                  >
                    <Download size={16} />
                    Download
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={copyToClipboard}
                    className="flex items-center gap-2"
                  >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                    {copied ? "Copied!" : "Copy to Clipboard"}
                  </Button>
                </>
              )}
            </div>
            
            {errorMessage && (
              <div className="p-3 bg-destructive/10 text-destructive rounded-md text-sm">
                {errorMessage}
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              <h4 className="font-medium mb-1">Tips:</h4>
              <ul className="list-disc ml-5 space-y-1">
                <li>Use the countdown timer to prepare your screen before capture</li>
                <li>You can select a specific application window or your entire screen</li>
                <li>Screenshots are processed locally and not uploaded to any server</li>
                <li>Some websites or applications may block screen capture for security reasons</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use Screenshot Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Screenshot Tool</h4>
      <p>The Screenshot Tool allows you to capture images of your screen or specific applications.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click the "Capture Screenshot" button to start.</li>
        <li>Select the screen or application window you want to capture.</li>
        <li>Use the countdown timer for better preparation if needed.</li>
        <li>The captured screenshot will be processed locally for privacy.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Capture full screen, specific windows, or application screens.</li>
        <li>Optional countdown timer to set up the desired screen.</li>
        <li>Local processing ensures privacy and security.</li>
        <li>Easy to use with a simple and intuitive interface.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Useful for capturing important moments on your screen.</li>
        <li>Great for creating tutorials, reports, or saving references.</li>
        <li>Ensures privacy by keeping all screenshots locally processed.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
