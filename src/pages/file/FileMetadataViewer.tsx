import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileSearch, Upload } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function FileMetadataViewer() {
  const [metadata, setMetadata] = useState<any>(null);
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const meta = {
      name: file.name,
      size: file.size,
      type: file.type || 'Unknown',
      lastModified: new Date(file.lastModified).toLocaleString(),
      extension: file.name.substring(file.name.lastIndexOf('.') + 1).toUpperCase(),
    };

    setMetadata(meta);
    toast({
      title: "File Loaded!",
      description: "Metadata extracted successfully",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    return (bytes / (1024 * 1024 * 1024)).toFixed(2) + ' GB';
  };

  return (
    <>
      <SEO 
        title="File Metadata Viewer - View File Properties | ILoveJPG"
        description="View file metadata including name, size, type, and modification date. Extract file information easily."
        keywords="file metadata, file properties, file info viewer, file details"
      />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>File Metadata Viewer</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
              <div className="flex items-center gap-3">
                <FileSearch className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">File Metadata Viewer</CardTitle>
                  <p className="text-sm opacity-90">View detailed file information</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <p className="text-sm text-muted-foreground mb-4">Upload a file to view its metadata</p>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gradient-to-r file:from-teal-500 file:to-cyan-500 file:text-white hover:file:opacity-90"
                />
              </div>

              {metadata && (
                <div className="space-y-4">
                  <h3 className="font-semibold">File Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">File Name</p>
                      <p className="font-semibold break-all">{metadata.name}</p>
                    </div>
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">File Size</p>
                      <p className="font-semibold">{formatFileSize(metadata.size)}</p>
                      <p className="text-xs text-muted-foreground">{metadata.size.toLocaleString()} bytes</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">File Type</p>
                      <p className="font-semibold">{metadata.type}</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Extension</p>
                      <p className="font-semibold">{metadata.extension}</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg md:col-span-2">
                      <p className="text-sm text-muted-foreground">Last Modified</p>
                      <p className="font-semibold">{metadata.lastModified}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About File Metadata Viewer">
            <p className="text-muted-foreground">
              View detailed metadata for any file including name, size, type, extension, and last modification date.
              Perfect for checking file properties before uploading or sharing. All processing is done locally in your browser.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
