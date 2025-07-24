
import React, { useState, useEffect, useRef } from "react";
import { Camera, RotateCcw, Download, Maximize, Minimize, X, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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



export const OnlineMirror = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [flip, setFlip] = useState(false);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    startCamera();
    getAvailableCameras();
    
    // Add fullscreen change event listener
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    // Cleanup on unmount
    return () => {
      stopCamera();
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  const startCamera = async () => {
    try {
      // Reset any previous errors
      setPermissionError(null);
      
      const constraints = {
        video: selectedCamera 
          ? { deviceId: { exact: selectedCamera } } 
          : { facingMode: "user" }
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      // Connect stream to video element when available
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setPermissionError("Camera access denied. Please allow camera access in your browser settings.");
      
      toast({
        title: "Camera access denied",
        description: "Please allow camera access to use the mirror",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const getAvailableCameras = async () => {
    try {
      // First request permission
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach(track => track.stop());
      
      // Then enumerate devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setAvailableCameras(videoDevices);
      
      // If there are devices and none is selected, select the first one
      if (videoDevices.length > 0 && !selectedCamera) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
    } catch (error) {
      console.error('Error getting cameras:', error);
    }
  };

  const handleCameraChange = (deviceId: string) => {
    setSelectedCamera(deviceId);
    stopCamera();
    setTimeout(startCamera, 500); // Slight delay to ensure previous camera is stopped
  };

  const handleFullscreen = () => {
    if (!containerRef.current) return;
    
    if (!document.fullscreenElement) {
      // Enter fullscreen
      containerRef.current.requestFullscreen();
    } else {
      // Exit fullscreen
      document.exitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    setIsFullScreen(!!document.fullscreenElement);
    // Hide controls briefly when entering fullscreen
    if (document.fullscreenElement) {
      setShowControls(false);
      setTimeout(() => setShowControls(true), 2000);
    } else {
      setShowControls(true);
    }
  };

  const captureImage = () => {
    if (!videoRef.current) return;
    
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const context = canvas.getContext('2d');
    if (context) {
      // Apply flipping if needed
      if (flip) {
        context.translate(canvas.width, 0);
        context.scale(-1, 1);
      }
      
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL (image)
      const imageDataURL = canvas.toDataURL('image/png');
      
      // Create download link
      const link = document.createElement('a');
      link.href = imageDataURL;
      link.download = `mirror-${new Date().toISOString()}.png`;
      link.click();
      
      toast({
        title: "Image captured",
        description: "Your photo has been downloaded",
      });
    }
  };

  // Get video filters based on settings
  const getVideoFilters = () => {
    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%)`,
      transform: flip ? 'scaleX(-1)' : 'none',
    };
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
                      <BreadcrumbPage>Online Mirror</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Camera className="mr-2 text-primary" size={24} />
            <CardTitle>Online Mirror</CardTitle>
          </div>
          <CardDescription>
            Use your camera as a digital mirror
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 relative">
          {permissionError ? (
            <div className="p-6 text-center">
              <Camera className="mx-auto mb-4 text-muted-foreground" size={48} />
              <h3 className="text-lg font-medium mb-2">Camera Access Required</h3>
              <p className="text-muted-foreground mb-4">{permissionError}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <div
              ref={containerRef}
              className={`relative overflow-hidden rounded-lg bg-black ${isFullScreen ? 'w-screen h-screen' : 'aspect-video'}`}
            >
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${stream ? 'opacity-100' : 'opacity-0'}`}
                style={getVideoFilters()}
              />
              
              {showControls && (
                <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-1 bg-black/70 rounded-full p-1 ${isFullScreen ? 'opacity-60 hover:opacity-100' : ''}`}>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleFullscreen}
                    className="text-white h-8 w-8 p-0"
                  >
                    {isFullScreen ? <Minimize size={16} /> : <Maximize size={16} />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={captureImage}
                    className="text-white h-8 w-8 p-0"
                    disabled={!stream}
                  >
                    <Download size={16} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setFlip(!flip)}
                    className="text-white h-8 w-8 p-0"
                  >
                    <RotateCcw size={16} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-white h-8 w-8 p-0"
                  >
                    <Settings size={16} />
                  </Button>
                  
                  {isFullScreen && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => document.exitFullscreen()}
                      className="text-white h-8 w-8 p-0"
                    >
                      <X size={16} />
                    </Button>
                  )}
                </div>
              )}
              
              {showSettings && showControls && (
                <div className="absolute left-4 top-4 bg-black/70 p-4 rounded-lg text-white space-y-4 max-w-xs">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-white">Brightness: {brightness}%</Label>
                    </div>
                    <Slider
                      value={[brightness]}
                      min={50}
                      max={150}
                      step={5}
                      onValueChange={values => setBrightness(values[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-white">Contrast: {contrast}%</Label>
                    </div>
                    <Slider
                      value={[contrast]}
                      min={50}
                      max={150}
                      step={5}
                      onValueChange={values => setContrast(values[0])}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label className="text-white">Flip horizontally</Label>
                    <Switch
                      checked={flip}
                      onCheckedChange={setFlip}
                    />
                  </div>
                  
                  {availableCameras.length > 1 && (
                    <div className="space-y-2">
                      <Label className="text-white">Camera</Label>
                      <Select value={selectedCamera} onValueChange={handleCameraChange}>
                        <SelectTrigger className="bg-transparent border-white/30 text-white">
                          <SelectValue placeholder="Select camera" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCameras.map(camera => (
                            <SelectItem key={camera.deviceId} value={camera.deviceId}>
                              {camera.label || `Camera ${availableCameras.indexOf(camera) + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setBrightness(100);
                      setContrast(100);
                      setFlip(false);
                    }}
                    className="w-full"
                  >
                    Reset Settings
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {!isFullScreen && (
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Tip: Click the fullscreen button for a better mirror experience.</p>
            </div>
          )}
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Online Mirror Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Online Mirror</h4>
      <p>The Online Mirror tool allows you to use your device's camera as a digital mirror.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Open the Online Mirror tool.</li>
        <li>Grant camera access when prompted.</li>
        <li>Use the mirror to check your appearance in real-time.</li>
        <li>Click the fullscreen button for a better experience.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Real-time camera feed for a clear reflection.</li>
        <li>Fullscreen mode for a larger mirror view.</li>
        <li>No data is stored or transmitted, ensuring privacy.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Convenient for checking your appearance anytime.</li>
        <li>No need for a physical mirror.</li>
        <li>Works on any device with a camera.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
