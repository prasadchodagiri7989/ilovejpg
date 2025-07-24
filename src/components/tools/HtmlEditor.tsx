
import React, { useState, useEffect } from "react";
import { Code, Play, Copy, Check, Download } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ToolLayout from "@/components/ui/ToolLayout";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


const HtmlEditor = () => {
  const [html, setHtml] = useState("");
  const [preview, setPreview] = useState("");
  const [copied, setCopied] = useState(false);
  const [autoPreview, setAutoPreview] = useState(true);

  const defaultTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML Preview</title>
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.5;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>This is a simple HTML preview. Edit the code on the left to see changes.</p>
</body>
</html>`;

  useEffect(() => {
    setHtml(defaultTemplate);
    updatePreview(defaultTemplate);
  }, []);

  useEffect(() => {
    if (autoPreview) {
      const timer = setTimeout(() => {
        updatePreview(html);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [html, autoPreview]);

  const updatePreview = (code: string) => {
    setPreview(code);
  };

  const runPreview = () => {
    updatePreview(html);
    toast.success("Preview updated");
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html);
    setCopied(true);
    toast.success("HTML copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const downloadHtml = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("HTML file downloaded");
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
                  <BreadcrumbPage>HTML Editor</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <ToolLayout
      title="HTML Editor"
      description="Write and preview HTML code in real time."
      className="max-w-6xl p-0 overflow-hidden"
    >
      <div className="flex flex-col h-[600px]">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <button
              onClick={runPreview}
              className="flex items-center px-3 py-1.5 text-sm font-medium rounded-md bg-primary text-white hover:bg-primary/90 transition-colors"
            >
              <Play size={14} className="mr-1.5" />
              Run
            </button>
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={autoPreview}
                onChange={() => setAutoPreview(!autoPreview)}
                className="rounded border-gray-300 text-primary focus:ring-primary/30 mr-1.5"
              />
              Auto Preview
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              className="flex items-center text-xs"
            >
              {copied ? (
                <>
                  <Check size={14} className="mr-1.5" />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} className="mr-1.5" />
                  Copy HTML
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadHtml}
              className="flex items-center text-xs"
            >
              <Download size={14} className="mr-1.5" />
              Download
            </Button>
          </div>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          <div className="w-1/2 flex flex-col border-r border-gray-200">
            <div className="p-2 bg-gray-50 border-b border-gray-200 flex items-center">
              <Code size={14} className="text-gray-500 mr-1.5" />
              <span className="text-xs font-medium text-gray-600">HTML Code</span>
            </div>
            <textarea
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="flex-1 p-4 font-mono text-sm resize-none border-0 focus:ring-0 outline-none dark:text-black"
              spellCheck="false"
            ></textarea>
          </div>
          
          <div className="w-1/2 flex flex-col">
            <div className="p-2 bg-gray-50 border-b border-gray-200 flex items-center">
              <Play size={14} className="text-gray-500 mr-1.5" />
              <span className="text-xs font-medium text-gray-600">Preview</span>
            </div>
            <div className="flex-1 overflow-auto bg-white">
              <iframe
                title="HTML Preview"
                srcDoc={preview}
                className="w-full h-full border-0"
                sandbox="allow-scripts"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
    <GuidanceSection title="How to Use the HTML Editor">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the HTML Editor</h4>
      <p>The HTML Editor allows you to write, edit, and preview HTML code in real time.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Enter your HTML code in the editor.</li>
        <li>Click "Run" to render the HTML output.</li>
        <li>Enable "Auto Preview" to see changes live as you type.</li>
        <li>Click "Copy HTML" to copy your code to the clipboard.</li>
        <li>Click "Download" to save your HTML file.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Live preview for instant feedback.</li>
        <li>Auto-preview mode for real-time updates.</li>
        <li>Easy copy and download options.</li>
        <li>Simple and beginner-friendly interface.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </>
  );
};

export default HtmlEditor;
