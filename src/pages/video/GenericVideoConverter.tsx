// src/pages/video/GenericVideoConverter.tsx

import React, { useState, useRef } from "react";
import { Video, AlertCircle, Upload } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";

interface GenericVideoConverterProps {
  fromFormat: string;
  toFormat: string;
  acceptedExtensions: string;
  categoryPath?: string;
}

export const GenericVideoConverter: React.FC<GenericVideoConverterProps> = ({
  fromFormat,
  toFormat,
  acceptedExtensions,
  categoryPath = "/tools/video"
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setSelectedFile(file);
    
    toast({
      title: "File selected",
      description: `${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)`,
    });

    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleConvert = () => {
    toast({
      title: "Server-side processing required",
      description: "Video conversion requires server infrastructure with FFmpeg. This feature will be available soon.",
      variant: "destructive",
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
            <BreadcrumbLink asChild>
              <Link to={categoryPath}>Video Tools</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{fromFormat} to {toFormat}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Video conversion requires server-side processing with FFmpeg. This tool is currently in development and will be available with backend integration.
        </AlertDescription>
      </Alert>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="h-6 w-6" />
            Convert {fromFormat} to {toFormat}
          </CardTitle>
          <CardDescription>
            Upload {fromFormat} files to convert to {toFormat} format
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 hover:border-primary transition-colors">
            <Video className="h-12 w-12 text-gray-400 mb-4" />
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedExtensions}
              onChange={handleFileChange}
              className="hidden"
              id="video-upload"
            />
            <label htmlFor="video-upload" className="cursor-pointer">
              <Button variant="default" asChild>
                <span>
                  <Upload className="mr-2 h-4 w-4" />
                  Select {fromFormat} File
                </span>
              </Button>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Supports {acceptedExtensions.replace(/\./g, '').toUpperCase()} files
            </p>
          </div>

          {selectedFile && (
            <div className="p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <Button onClick={handleConvert}>
                  Convert to {toFormat}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <GuidanceSection title={`How to Convert ${fromFormat} to ${toFormat}`}>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">About this conversion:</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Video format conversion requires server-side processing using FFmpeg, a powerful multimedia framework.
              This ensures high-quality conversion with proper codec handling, bitrate optimization, and format compatibility.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Planned Features:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>High-quality video conversion</li>
              <li>Customizable output settings (resolution, bitrate, codec)</li>
              <li>Batch processing support</li>
              <li>Preview before conversion</li>
              <li>Progress tracking</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2">Note:</h4>
            <p className="text-sm text-muted-foreground">
              This feature requires backend infrastructure and will be implemented in a future update.
              Video files will be processed securely on the server and automatically deleted after conversion.
            </p>
          </div>
        </div>
      </GuidanceSection>
    </>
  );
};

// Export individual converter components
export const MP4toAVI = () => <GenericVideoConverter fromFormat="MP4" toFormat="AVI" acceptedExtensions=".mp4" />;
export const MP4toMOV = () => <GenericVideoConverter fromFormat="MP4" toFormat="MOV" acceptedExtensions=".mp4" />;
export const MP4toMKV = () => <GenericVideoConverter fromFormat="MP4" toFormat="MKV" acceptedExtensions=".mp4" />;
export const MP4toWEBM = () => <GenericVideoConverter fromFormat="MP4" toFormat="WEBM" acceptedExtensions=".mp4" />;
export const MP4toGIF = () => <GenericVideoConverter fromFormat="MP4" toFormat="GIF" acceptedExtensions=".mp4" />;

export const AVItoMP4 = () => <GenericVideoConverter fromFormat="AVI" toFormat="MP4" acceptedExtensions=".avi" />;
export const AVItoMOV = () => <GenericVideoConverter fromFormat="AVI" toFormat="MOV" acceptedExtensions=".avi" />;
export const AVItoMKV = () => <GenericVideoConverter fromFormat="AVI" toFormat="MKV" acceptedExtensions=".avi" />;
export const AVItoWEBM = () => <GenericVideoConverter fromFormat="AVI" toFormat="WEBM" acceptedExtensions=".avi" />;

export const MOVtoMP4 = () => <GenericVideoConverter fromFormat="MOV" toFormat="MP4" acceptedExtensions=".mov" />;
export const MOVtoAVI = () => <GenericVideoConverter fromFormat="MOV" toFormat="AVI" acceptedExtensions=".mov" />;
export const MOVtoWEBM = () => <GenericVideoConverter fromFormat="MOV" toFormat="WEBM" acceptedExtensions=".mov" />;

export const MKVtoMP4 = () => <GenericVideoConverter fromFormat="MKV" toFormat="MP4" acceptedExtensions=".mkv" />;
export const MKVtoAVI = () => <GenericVideoConverter fromFormat="MKV" toFormat="AVI" acceptedExtensions=".mkv" />;
export const MKVtoMOV = () => <GenericVideoConverter fromFormat="MKV" toFormat="MOV" acceptedExtensions=".mkv" />;

export const WEBMtoMP4 = () => <GenericVideoConverter fromFormat="WEBM" toFormat="MP4" acceptedExtensions=".webm" />;
export const WEBMtoAVI = () => <GenericVideoConverter fromFormat="WEBM" toFormat="AVI" acceptedExtensions=".webm" />;
export const WEBMtoGIF = () => <GenericVideoConverter fromFormat="WEBM" toFormat="GIF" acceptedExtensions=".webm" />;

export const GIFtoMP4 = () => <GenericVideoConverter fromFormat="GIF" toFormat="MP4" acceptedExtensions=".gif" />;
export const GIFtoWEBM = () => <GenericVideoConverter fromFormat="GIF" toFormat="WEBM" acceptedExtensions=".gif" />;
