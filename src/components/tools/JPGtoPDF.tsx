
import React, { useState, useRef } from "react";
import { ImageIcon, Download, Trash2, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const JPGtoPDF = () => {
  const [images, setImages] = useState<Array<{ file: File; preview: string }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      const jpgFiles = Array.from(files).filter(file => 
        file.type === 'image/jpeg' || file.type === 'image/jpg'
      );
      
      if (jpgFiles.length === 0) {
        toast({
          title: "Invalid files",
          description: "Please select JPG/JPEG files only",
          variant: "destructive",
        });
        return;
      }
      
      const newImages = jpgFiles.map(file => {
        return {
          file,
          preview: URL.createObjectURL(file)
        };
      });
      
      setImages(prev => [...prev, ...newImages]);
      
      toast({
        title: `${jpgFiles.length} JPG file${jpgFiles.length > 1 ? 's' : ''} added`,
        description: "JPG files have been added to the queue"
      });
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    
    const files = event.dataTransfer.files;
    
    if (files && files.length > 0) {
      const jpgFiles = Array.from(files).filter(file => 
        file.type === 'image/jpeg' || file.type === 'image/jpg'
      );
      
      if (jpgFiles.length === 0) {
        toast({
          title: "Invalid files",
          description: "Please drop JPG/JPEG files only",
          variant: "destructive",
        });
        return;
      }
      
      const newImages = jpgFiles.map(file => {
        return {
          file,
          preview: URL.createObjectURL(file)
        };
      });
      
      setImages(prev => [...prev, ...newImages]);
      
      toast({
        title: `${jpgFiles.length} JPG file${jpgFiles.length > 1 ? 's' : ''} added`,
        description: "JPG files have been added to the queue"
      });
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const removeImage = (index: number) => {
    URL.revokeObjectURL(images[index].preview);
    setImages(images.filter((_, i) => i !== index));
    
    toast({
      title: "JPG file removed",
      description: "The JPG file has been removed from the queue"
    });
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    
    toast({
      title: "All JPG files cleared",
      description: "All JPG files have been removed from the queue"
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) {
      toast({
        title: "No JPG files to convert",
        description: "Please add at least one JPG file",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "px",
      });
      
      // Process each image
      for (let i = 0; i < images.length; i++) {
        const img = images[i];
        
        // Create an image element to get dimensions
        const imgElement = new Image();
        imgElement.src = img.preview;
        
        // Wait for image to load
        await new Promise(resolve => {
          imgElement.onload = resolve;
        });
        
        // If not the first page, add a new page
        if (i > 0) {
          doc.addPage();
        }
        
        // Calculate dimensions to fit the page
        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        
        let imgWidth = imgElement.width;
        let imgHeight = imgElement.height;
        
        // Scale image to fit the page
        if (imgWidth > pageWidth || imgHeight > pageHeight) {
          const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
          imgWidth *= ratio;
          imgHeight *= ratio;
        }
        
        // Center image on page
        const x = (pageWidth - imgWidth) / 2;
        const y = (pageHeight - imgHeight) / 2;
        
        // Add image to PDF
        doc.addImage(img.preview, 'JPEG', x, y, imgWidth, imgHeight);
      }
      
      // Save the PDF
      doc.save("converted-jpg.pdf");
      
      toast({
        title: "PDF generated successfully",
        description: `${images.length} JPG file${images.length > 1 ? 's' : ''} converted to PDF`
      });
    } catch (error) {
      console.error("Error generating PDF:", error);
      toast({
        title: "Error generating PDF",
        description: "There was an error creating your PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const viewImage = (index: number) => {
    window.open(images[index].preview, '_blank');
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
                  <BreadcrumbPage>JPG to PDF Converter
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <ImageIcon className="mr-2 text-primary" size={24} />
            <CardTitle>JPG to PDF Converter</CardTitle>
          </div>
          <CardDescription>
            Convert your JPG/JPEG images to a PDF document
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 space-y-4">
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <ImageIcon size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">Add JPG Files</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop JPG/JPEG files here, or click to select
            </p>
            <Button>
              <Plus size={16} className="mr-1" /> Select JPG Files
            </Button>
            <input
              type="file"
              accept=".jpg,.jpeg,image/jpeg"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>
          
          {images.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{images.length} JPG File{images.length > 1 ? 's' : ''}</h3>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 size={16} className="mr-1" /> Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group border rounded-md overflow-hidden">
                    <img 
                      src={img.preview} 
                      alt={`JPG ${index + 1}`} 
                      className="w-full h-32 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={(e) => { e.stopPropagation(); viewImage(index); }}
                        className="h-8 w-8 text-white hover:bg-white/20"
                      >
                        <Eye size={16} />
                      </Button>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        onClick={(e) => { e.stopPropagation(); removeImage(index); }}
                        className="h-8 w-8 text-white hover:bg-white/20"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-1 truncate">
                      {img.file.name}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                className="w-full"
                disabled={isGenerating || images.length === 0}
                onClick={generatePDF}
              >
                <Download size={16} className="mr-2" />
                {isGenerating ? "Generating PDF..." : "Generate PDF"}
              </Button>
            </>
          )}
          
          <p className="text-sm text-muted-foreground">
            Tip: You can add multiple JPG files at once, and they will be added as separate pages in the PDF.
          </p>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the JPG to PDF Converter">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the JPG to PDF Converter</h4>
      <p>The JPG to PDF Converter allows you to convert JPG/JPEG images into a single PDF document easily.</p>

      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click "Add JPG Files" to select JPG/JPEG files from your device.</li>
        <li>Drag and drop JPG/JPEG files into the upload area for quick selection.</li>
        <li>You can add multiple JPG files at once; they will be added as separate pages in the PDF.</li>
        <li>Once the images are uploaded, click "Convert to PDF" to generate the document.</li>
        <li>Download the final PDF file and use it as needed.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Convert JPG/JPEG images into a high-quality PDF document.</li>
        <li>Drag-and-drop functionality for easy file selection.</li>
        <li>Maintain image resolution and quality in the converted PDF.</li>
        <li>Fast and user-friendly interface for quick conversions.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
