
import React, { useState, useRef } from "react";
import { FileText, Upload, Download, Search, ZoomIn, ZoomOut, RotateCw, Trash2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const PDFViewer = () => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [pdfName, setPdfName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    
    if (file) {
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF file",
          variant: "destructive",
        });
        return;
      }
      
      // Create a URL for the PDF
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
      setPdfName(file.name);
      
      // Reset zoom and rotation
      setZoom(100);
      setRotation(0);
      
      toast({
        title: "PDF loaded",
        description: `"${file.name}" has been loaded successfully`,
      });
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (event.dataTransfer.files.length) {
      const file = event.dataTransfer.files[0];
      
      if (file.type !== "application/pdf") {
        toast({
          title: "Invalid file type",
          description: "Please select a PDF file",
          variant: "destructive",
        });
        return;
      }
      
      // Create a URL for the PDF
      const fileUrl = URL.createObjectURL(file);
      setPdfUrl(fileUrl);
      setPdfName(file.name);
      
      // Reset zoom and rotation
      setZoom(100);
      setRotation(0);
      
      toast({
        title: "PDF loaded",
        description: `"${file.name}" has been loaded successfully`,
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const clearPdf = () => {
    if (pdfUrl) {
      URL.revokeObjectURL(pdfUrl);
      setPdfUrl(null);
      setPdfName("");
      setSearchTerm("");
      
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      
      toast({
        title: "PDF cleared",
        description: "The current PDF has been removed",
      });
    }
  };

  const zoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const rotate = () => {
    setRotation(prev => (prev + 90) % 360);
  };

  const loadPdfFromUrl = () => {
    if (!pdfUrl) {
      toast({
        title: "No URL provided",
        description: "Please enter a valid PDF URL",
        variant: "destructive",
      });
      return;
    }
    
    // Check if it's already a blob URL (from a local file)
    if (pdfUrl.startsWith('blob:')) {
      // Do nothing, it's already loaded
      return;
    }
    
    // This will refresh the PDF viewer with the URL
    const currentUrl = pdfUrl;
    setPdfUrl(null);
    setTimeout(() => {
      setPdfUrl(currentUrl);
      setPdfName("Document from URL");
      toast({
        title: "PDF loaded",
        description: "The PDF has been loaded from URL",
      });
    }, 100);
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
               <BreadcrumbPage>PDF Viewer</BreadcrumbPage>
                </BreadcrumbItem>
          </BreadcrumbList>
       </Breadcrumb>
    <div className="max-w-5xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <FileText className="mr-2 text-primary" size={24} />
            <CardTitle>PDF Viewer</CardTitle>
          </div>
          <CardDescription>
            View and interact with PDF documents
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 space-y-4">
          {pdfUrl ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center">
                  <FileText size={18} className="mr-2 text-primary" />
                  <span className="font-medium truncate max-w-[200px]" title={pdfName}>
                    {pdfName}
                  </span>
                </div>
                
                <div className="flex flex-wrap items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={zoomIn}
                    title="Zoom in"
                    className="h-8 w-8 p-0"
                  >
                    <ZoomIn size={16} />
                  </Button>
                  <span className="text-sm font-medium">{zoom}%</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={zoomOut}
                    title="Zoom out"
                    className="h-8 w-8 p-0"
                  >
                    <ZoomOut size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={rotate}
                    title="Rotate"
                    className="h-8 w-8 p-0"
                  >
                    <RotateCw size={16} />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearPdf}
                    title="Clear PDF"
                    className="h-8 w-8 p-0"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
              
              <div className="relative rounded-md border bg-muted/20 overflow-hidden flex flex-col items-center justify-center">
                <iframe 
                  src={`${pdfUrl}#search=${encodeURIComponent(searchTerm)}`}
                  className="w-full h-[70vh] border-0"
                  style={{
                    transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                    transformOrigin: 'center center',
                  }}
                  title="PDF Viewer"
                ></iframe>
              </div>
              
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search in PDF..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(pdfUrl, '_blank')}
                  className="flex items-center gap-1 whitespace-nowrap"
                >
                  <Download size={16} />
                  Open in New Tab
                </Button>
              </div>
            </div>
          ) : (
            <div 
              className="border-2 border-dashed rounded-lg p-10 text-center cursor-pointer hover:bg-muted/50 transition-colors"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => fileInputRef.current?.click()}
            >
              <FileText size={48} className="mx-auto mb-4 text-muted-foreground/50" />
              <h3 className="text-lg font-medium mb-2">Open PDF</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Drag and drop a PDF file here, or click to select
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>
                  <Upload size={16} className="mr-2" />
                  Select PDF File
                </Button>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  className="hidden"
                />
                
                <div className="flex gap-2">
                  <Input
                    placeholder="Or enter PDF URL..."
                    value={pdfUrl || ""}
                    onChange={(e) => setPdfUrl(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    className="min-w-[200px]"
                  />
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      loadPdfFromUrl();
                    }}
                    disabled={!pdfUrl}
                    variant="outline"
                  >
                    Load
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-4">
                Note: Some PDFs from URLs might be blocked due to cross-origin restrictions
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the PDF Viewer">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the PDF Viewer</h4>
      <p>The PDF Viewer allows you to open, view, and interact with PDF documents easily.</p>

      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click "Open PDF" to select a PDF file from your device.</li>
        <li>Drag and drop a PDF file into the upload area for quick access.</li>
        <li>Alternatively, enter a PDF URL and click "Load" to view an online document.</li>
        <li>Once loaded, use navigation tools to scroll through pages, zoom in/out, or search within the document.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Supports viewing PDFs directly in your browser.</li>
        <li>Drag-and-drop functionality for easy access.</li>
        <li>Enter a PDF URL to load online documents.</li>
        <li>Zoom, scroll, and search within the PDF.</li>
        <li>Note: Some PDFs from URLs might be blocked due to cross-origin restrictions.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
