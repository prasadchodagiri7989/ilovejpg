import React, { useState } from "react";
import { Copy, Check, ArrowDownUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "../GuidanceSection";

const UrlDecode = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const decodeUrl = () => {
    if (!input) {
      toast.error("Please enter a URL encoded string to decode");
      return;
    }

    try {
      const decoded = decodeURIComponent(input);
      setOutput(decoded);
      toast.success("URL string decoded");
    } catch {
      toast.error("Error decoding URL string. Check your input.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  };

  const swapTool = () => {
    window.location.href = "/tools/url-encode";
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Breadcrumb className="mb-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>URL Decode</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>URL Decoder</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={swapTool}
              className="flex items-center text-xs"
            >
              <ArrowDownUp size={14} className="mr-1.5" />
              Switch to Encode
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="inputText" className="block text-sm font-medium text-gray-700">
              URL Encoded String to Decode
            </label>
            <textarea
              id="inputText"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter URL encoded string to decode..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all dark:bg-transparent min-h-[120px]"
            />
          </div>

          <Button onClick={decodeUrl} className="w-full">
            Decode URL String
          </Button>

          {output && (
            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Decoded Output</h3>
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
                      Copy to Clipboard
                    </>
                  )}
                </Button>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg break-all min-h-[120px] max-h-[240px] overflow-y-auto text-sm dark:bg-transparent">
                {output}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8">
        <GuidanceSection title="How to Use the URL Decoder">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Using the URL Decoder</h4>
              <p>The URL Decoder allows you to convert encoded URLs back to their original readable format by replacing encoded characters with their actual representations.</p>

              <p className="mt-2"><strong>How to Use:</strong></p>
              <ol className="list-decimal pl-5">
                <li>Enter the encoded URL string in the input field.</li>
                <li>Click "Decode URL String" to convert it back to normal text.</li>
                <li>Copy the decoded text for use in applications, links, or APIs.</li>
                <li>Use the "Switch to Encode" option to encode text into a URL-safe format.</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium mb-1">Why Use This Tool?</h4>
              <ul className="list-disc pl-5">
                <li>Helps decode URL parameters for debugging or analysis.</li>
                <li>Restores readable text from encoded web links.</li>
                <li>Useful for developers working with APIs, redirects, or SEO optimization.</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </div>
  );
};

export default UrlDecode;
