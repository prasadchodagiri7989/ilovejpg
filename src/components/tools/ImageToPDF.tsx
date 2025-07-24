
import React, { useState, useRef } from "react";
import { FileImage, Download, Trash2, Plus, Eye } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const ImageToPDF = () => {
  const [images, setImages] = useState<Array<{ file: File; preview: string }>>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    
    if (files && files.length > 0) {
      const newImages = Array.from(files).map(file => {
        return {
          file,
          preview: URL.createObjectURL(file)
        };
      });
      
      setImages(prev => [...prev, ...newImages]);
      
      toast({
        title: `${files.length} image${files.length > 1 ? 's' : ''} added`,
        description: "Images have been added to the queue"
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
      const imageFiles = Array.from(files).filter(file => 
        file.type.startsWith('image/')
      );
      
      if (imageFiles.length === 0) {
        toast({
          title: "Invalid files",
          description: "Please drop image files only",
          variant: "destructive",
        });
        return;
      }
      
      const newImages = imageFiles.map(file => {
        return {
          file,
          preview: URL.createObjectURL(file)
        };
      });
      
      setImages(prev => [...prev, ...newImages]);
      
      toast({
        title: `${imageFiles.length} image${imageFiles.length > 1 ? 's' : ''} added`,
        description: "Images have been added to the queue"
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
      title: "Image removed",
      description: "The image has been removed from the queue"
    });
  };

  const clearAll = () => {
    images.forEach(img => URL.revokeObjectURL(img.preview));
    setImages([]);
    
    toast({
      title: "All images cleared",
      description: "All images have been removed from the queue"
    });
  };

  const generatePDF = async () => {
    if (images.length === 0) {
      toast({
        title: "No images to convert",
        description: "Please add at least one image",
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
      doc.save("converted-images.pdf");
      
      toast({
        title: "PDF generated successfully",
        description: `${images.length} image${images.length > 1 ? 's' : ''} converted to PDF`
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
                  <BreadcrumbPage>Image to PDF Converter</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-4xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <FileImage className="mr-2 text-primary" size={24} />
            <CardTitle>Image to PDF Converter</CardTitle>
          </div>
          <CardDescription>
            Convert your images to a PDF document
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4 space-y-4">
          <div
            className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current?.click()}
          >
            <FileImage size={48} className="mx-auto mb-4 text-muted-foreground/50" />
            <h3 className="text-lg font-medium mb-2">Add Images</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Drag and drop image files here, or click to select
            </p>
            <Button>
              <Plus size={16} className="mr-1" /> Select Images
            </Button>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              ref={fileInputRef}
              className="hidden"
            />
          </div>
          
          {images.length > 0 && (
            <>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">{images.length} Image{images.length > 1 ? 's' : ''}</h3>
                <Button variant="outline" size="sm" onClick={clearAll}>
                  <Trash2 size={16} className="mr-1" /> Clear All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((img, index) => (
                  <div key={index} className="relative group border rounded-md overflow-hidden">
                    <img 
                      src={img.preview} 
                      alt={`Image ${index + 1}`} 
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
            Tip: You can add multiple images at once, and they will be added as separate pages in the PDF.
          </p>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Image to PDF Converter">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Image to PDF Converter</h4>
      <p>The Image to PDF Converter allows you to convert multiple images into a single PDF document effortlessly.</p>

      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click "Add Images" to select image files from your device.</li>
        <li>Drag and drop image files into the upload area for quick selection.</li>
        <li>You can add multiple images at once; they will be added as separate pages in the PDF.</li>
        <li>Once the images are uploaded, click "Convert to PDF" to generate the document.</li>
        <li>Download the final PDF file and use it as needed.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Convert images into a high-quality PDF document.</li>
        <li>Supports multiple image formats, including PNG, JPEG, GIF, and WebP.</li>
        <li>Drag-and-drop functionality for easy file selection.</li>
        <li>Maintain image quality in the converted PDF.</li>
        <li>Simple and user-friendly interface.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
