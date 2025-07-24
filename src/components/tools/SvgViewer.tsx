
import React, { useState, useRef } from "react";
import { Upload, Download, Copy, Check, RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ToolLayout from "@/components/ui/ToolLayout";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


const SvgViewer = () => {
  const [svgCode, setSvgCode] = useState("");
  const [svgPreview, setSvgPreview] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [previewSize, setPreviewSize] = useState(300);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "image/svg+xml") {
      toast.error("Please select an SVG file");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setSvgCode(result);
      updatePreview(result);
      toast.success("SVG file loaded");
    };
    
    reader.onerror = () => {
      toast.error("Error reading file");
    };
    
    reader.readAsText(file);
  };

  const updatePreview = (code: string) => {
    setSvgPreview(code);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newCode = e.target.value;
    setSvgCode(newCode);
  };

  const refreshPreview = () => {
    updatePreview(svgCode);
    toast.success("Preview updated");
  };

  const clearSvg = () => {
    setSvgCode("");
    setSvgPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    toast.info("SVG cleared");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    toast.success("SVG code copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const downloadSvg = () => {
    const blob = new Blob([svgCode], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "image.svg";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("SVG file downloaded");
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
                       <BreadcrumbPage>SVG Viewer</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <ToolLayout
      title="SVG Viewer/Editor"
      description="View, edit, and optimize SVG images. Useful for web developers and designers."
      className="max-w-6xl p-0 overflow-hidden"
    >
      <div className="flex flex-col h-[600px]">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <input
              ref={fileInputRef}
              type="file"
              accept=".svg,image/svg+xml"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center text-xs"
            >
              <Upload size={14} className="mr-1.5" />
              Upload SVG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={refreshPreview}
              className="flex items-center text-xs"
              disabled={!svgCode}
            >
              <RefreshCw size={14} className="mr-1.5" />
              Update Preview
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center text-xs"
              disabled={!svgCode}
            >
              {copied ? (
                <>
                  <Check size={14} className="mr-1.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} className="mr-1.5" />
                  Copy Code
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadSvg}
              className="flex items-center text-xs"
              disabled={!svgCode}
            >
              <Download size={14} className="mr-1.5" />
              Download SVG
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={clearSvg}
              className="flex items-center text-xs"
              disabled={!svgCode}
            >
              <Trash2 size={14} className="mr-1.5" />
              Clear
            </Button>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/2 flex flex-col border-r border-gray-200">
            <div className="p-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">SVG Code</span>
            </div>
            <textarea
              value={svgCode}
              onChange={handleCodeChange}
              placeholder="Paste your SVG code here or upload an SVG file..."
              className="flex-1 p-4 font-mono text-sm resize-none border focus:ring-0 outline-none dark:bg-transparent"
              spellCheck="false"
            ></textarea>
          </div>
          
          <div className="w-1/2 flex flex-col">
            <div className="p-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <span className="text-xs font-medium text-gray-600">Preview</span>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  <label htmlFor="bgColor" className="text-xs text-gray-500 mr-1.5">
                    BG:
                  </label>
                  <input
                    id="bgColor"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor="size" className="text-xs text-gray-500 mr-1.5">
                    Size:
                  </label>
                  <select
                    id="size"
                    value={previewSize}
                    onChange={(e) => setPreviewSize(Number(e.target.value))}
                    className="text-xs p-1 border border-gray-200 rounded dark:text-black"
                  >
                    <option value="200">Small</option>
                    <option value="300">Medium</option>
                    <option value="400">Large</option>
                  </select>
                </div>
              </div>
            </div>
            <div 
              className="flex-1 flex items-center justify-center overflow-auto p-4 transition-colors" 
              style={{ backgroundColor }}
            >
              {svgPreview ? (
                <div 
                  className="svg-preview max-w-full max-h-full"
                  style={{ width: previewSize, height: previewSize }}
                  dangerouslySetInnerHTML={{ 
                    __html: svgPreview
                      .replace(/script/gi, 'BLOCKED_SCRIPT') // Basic XSS prevention
                  }}
                />
              ) : (
                <div className="text-sm text-gray-400">
                  SVG preview will appear here
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
    <GuidanceSection title="How to Use the SVG Viewer/Editor">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the SVG Viewer/Editor</h4>
      <p>The SVG Viewer/Editor allows you to view, edit, and optimize SVG images easily, making it a powerful tool for web developers and designers.</p>
      
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Upload an SVG file or paste your SVG code in the provided editor.</li>
        <li>Modify the SVG code directly to see real-time updates in the preview.</li>
        <li>Use the background color and size options to customize the preview.</li>
        <li>Click "Update Preview" to refresh the rendered SVG.</li>
        <li>Once satisfied, copy the optimized SVG code or download the updated file.</li>
        <li>Click "Clear" to reset the editor and start over.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Instantly preview and edit SVG images.</li>
        <li>Optimize SVG code for performance and compatibility.</li>
        <li>Test different background colors and sizes before implementation.</li>
        <li>Useful for web design, UI development, and vector graphic optimization.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </>
  );
};

export default SvgViewer;
