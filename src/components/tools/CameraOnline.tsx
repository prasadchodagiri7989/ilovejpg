
import React, { useState, useRef, useEffect } from "react";
import { Camera, X, Image, RotateCcw, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const CameraOnline = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Initial camera setup
    startCamera();
    
    // Cleanup on unmount
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCamera = async () => {
    try {
      // Reset any previous errors
      setPermissionError(null);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" }
      });
      
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
        description: "Please allow camera access to use this feature",
        variant: "destructive",
      });
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Convert canvas to data URL (image)
      const imageDataURL = canvas.toDataURL('image/png');
      setCapturedImage(imageDataURL);
      
      toast({
        title: "Image captured",
        description: "Your photo has been captured and is ready to download",
      });
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
    
    toast({
      title: "Camera reset",
      description: "Ready to take a new photo",
    });
  };

  const downloadImage = () => {
    if (!capturedImage) return;
    
    const link = document.createElement('a');
    link.href = capturedImage;
    link.download = `photo-${new Date().toISOString()}.png`;
    link.click();
    
    toast({
      title: "Download started",
      description: "Your photo is being downloaded",
    });
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
                  <BreadcrumbPage>Camera Online</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Camera className="mr-2 text-primary" size={24} />
            <CardTitle>Camera Online</CardTitle>
          </div>
          <CardDescription>
            Take photos using your device camera
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          {permissionError ? (
            <div className="p-6 text-center">
              <Camera className="mx-auto mb-4 text-muted-foreground" size={48} />
              <h3 className="text-lg font-medium mb-2">Camera Access Required</h3>
              <p className="text-muted-foreground mb-4">{permissionError}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative overflow-hidden rounded-lg bg-black aspect-video">
                {!capturedImage ? (
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${stream ? 'opacity-100' : 'opacity-0'}`}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <img src={capturedImage} alt="Captured" className="max-w-full max-h-full" />
                  </div>
                )}
                
                {/* Hidden canvas for capturing the image */}
                <canvas ref={canvasRef} className="hidden" />
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {!capturedImage ? (
                  <Button
                    onClick={captureImage}
                    className="flex items-center gap-2"
                    size="lg"
                    disabled={!stream}
                  >
                    <Camera size={16} />
                    Take Photo
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={resetCamera}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <RotateCcw size={16} />
                      Take Another
                    </Button>
                    
                    <Button
                      onClick={downloadImage}
                      className="flex items-center gap-2"
                    >
                      <Download size={16} />
                      Download Photo
                    </Button>
                  </>
                )}
              </div>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Photos are processed locally and not sent to any server.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Camera Online Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Taking Photos</h4>
      <p>The Camera Online tool allows you to take photos using your device camera.</p>
      <p className="mt-2"><strong>Steps to Capture a Photo:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Ensure your camera is connected and functioning properly.</li>
        <li>Allow camera access when prompted by your browser.</li>
        <li>Click the "Take Photo" button to capture an image.</li>
        <li>Review the photo and save it if needed.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Managing Permissions</h4>
      <p>Camera access is required for this tool to function properly.</p>
      <p className="mt-2"><strong>How to Allow Camera Access:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click on the camera permission request in your browser.</li>
        <li>Select "Allow" to enable photo capturing.</li>
        <li>If access is denied, go to your browser settings and enable camera permissions manually.</li>
        <li>Refresh the page and try again if permission issues persist.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Saving and Managing Photos</h4>
      <p>Once you take a photo, you can save and manage it.</p>
      <p className="mt-2"><strong>Options after Capturing:</strong></p>
      <ul className="list-disc pl-5">
        <li>Review the photo before saving.</li>
        <li>Download the photo to your device for storage.</li>
        <li>Retake the photo if you need a better shot.</li>
      </ul>
    </div>
    
    <div>
      <h4 className="font-medium">Best Practices for Taking Photos</h4>
      <ul className="list-disc pl-5">
        <li>Ensure good lighting for clear images.</li>
        <li>Keep your camera lens clean for the best quality.</li>
        <li>Hold your device steady to avoid blurry photos.</li>
      </ul>
    </div>
  </div>
      </GuidanceSection>

    </div>
    </>
  );
};
