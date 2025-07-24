import React, { useState } from "react";
import { Copy, Check, ArrowDownUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "../GuidanceSection";

const Base64Decode = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [copied, setCopied] = useState(false);

  const decodeBase64 = () => {
    if (!input) {
      toast.error("Please enter a Base64 string to decode");
      return;
    }

    try {
      const decoded = atob(input.trim());
      setOutput(decoded);
      toast.success("Base64 decoded successfully");
    } catch (error) {
      toast.error("Invalid Base64 string. Please check your input.");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const swapTool = () => {
    window.location.href = "/tools/base64-encode";
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
            <BreadcrumbPage>Decode Base64</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Base64 Decoder</CardTitle>
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
            <label htmlFor="inputBase64" className="block text-sm font-medium text-gray-700">
              Base64 to Decode
            </label>
            <textarea
              id="inputBase64"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter Base64 string to decode..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all dark:bg-transparent min-h-[120px]"
            />
          </div>

          <Button onClick={decodeBase64} className="w-full">
            Decode Base64
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
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg break-all min-h-[120px] max-h-[240px] overflow-y-auto text-sm">
                {output}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8">
        <GuidanceSection title="How to Use the Base64 Decoder">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Using the Base64 Decoder</h4>
              <p>The Base64 Decoder allows you to convert Base64 encoded strings back to plain text.</p>
              <p className="mt-2"><strong>How to Use:</strong></p>
              <ol className="list-decimal pl-5">
                <li>Enter the Base64 encoded string in the input field.</li>
                <li>Click "Decode Base64" to convert it back to plain text.</li>
                <li>Copy the decoded result for further use.</li>
                <li>To encode text into Base64 format, switch to the "Encode" option.</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium mb-1">Features</h4>
              <ul className="list-disc pl-5">
                <li>Quickly decode Base64 strings into readable text.</li>
                <li>Easy switching between encode and decode modes.</li>
                <li>Supports safe data conversion for various applications.</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </div>
  );
};

export default Base64Decode;
