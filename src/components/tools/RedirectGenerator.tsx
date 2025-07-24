import React, { useState } from "react";
import { Copy, Check, ArrowDownUp } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "@/components/GuidanceSection";

const RedirectGenerator = () => {
  const [sourceUrl, setSourceUrl] = useState("");
  const [destinationUrl, setDestinationUrl] = useState("");
  const [code, setCode] = useState("");
  const [copied, setCopied] = useState(false);

  const generateCode = () => {
    if (!sourceUrl || !destinationUrl) {
      toast.error("Please enter both source and destination URLs");
      return;
    }

    try {
      // Simple URL validation
      new URL(destinationUrl);

      const htaccessCode = `RewriteEngine On\nRewriteRule ^${sourceUrl.replace(/^\/+/, "")}$ ${destinationUrl} [R=301,L]`;
      const metaTagCode = `<meta http-equiv="refresh" content="0;url=${destinationUrl}" />`;
      const jsCode = `<script>\n  window.location.href = "${destinationUrl}";\n</script>`;

      setCode(`# .htaccess (Apache):\n${htaccessCode}\n\n# HTML Meta Tag:\n${metaTagCode}\n\n# JavaScript:\n${jsCode}`);

      toast.success("Redirect code generated successfully");
    } catch (error) {
      toast.error("Please enter a valid destination URL");
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    toast.success("Copied to clipboard");

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const swapTool = () => {
    window.location.href = "/tools/redirect-decode";
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
            <BreadcrumbPage>Redirect Generator</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>301 Redirect Generator</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={swapTool}
              className="flex items-center text-xs"
            >
              <ArrowDownUp size={14} className="mr-1.5" />
              Switch to Decode
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="sourceUrl" className="block text-sm font-medium text-gray-700">
              Source URL Path
            </label>
            <input
              id="sourceUrl"
              type="text"
              value={sourceUrl}
              onChange={(e) => setSourceUrl(e.target.value)}
              placeholder="/old-page"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all dark:bg-transparent"
            />
            <p className="text-xs text-gray-500">
              The URL path you want to redirect from (e.g., /old-page)
            </p>
          </div>

          <div className="space-y-2">
            <label htmlFor="destinationUrl" className="block text-sm font-medium text-gray-700">
              Destination URL
            </label>
            <input
              id="destinationUrl"
              type="text"
              value={destinationUrl}
              onChange={(e) => setDestinationUrl(e.target.value)}
              placeholder="https://example.com/new-page"
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all dark:bg-transparent"
            />
            <p className="text-xs text-gray-500">
              The full URL you want to redirect to (e.g., https://example.com/new-page)
            </p>
          </div>

          <Button onClick={generateCode} className="w-full">
            Generate Redirect Code
          </Button>

          {code && (
            <div className="space-y-3 mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">Generated Code</h3>
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
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg break-all min-h-[120px] max-h-[240px] overflow-y-auto text-xs sm:text-sm dark:bg-transparent">
                {code}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8">
        <GuidanceSection title="How to Use the 301 Redirect Generator">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">What is a 301 Redirect?</h4>
              <p>A 301 redirect is a permanent redirect that tells search engines and users that a page has moved to a new URL.</p>
            </div>

            <div>
              <h4 className="font-medium mb-1">How to Use:</h4>
              <ol className="list-decimal pl-5">
                <li>Enter the old URL path you want to redirect from.</li>
                <li>Enter the full destination URL where users should be redirected.</li>
                <li>Click "Generate Redirect Code" to get the redirect options.</li>
                <li>Copy and implement the generated code into your server configuration, HTML, or JavaScript.</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium">Which Redirect Method to Use?</h4>
              <ul className="list-disc pl-5">
                <li><strong>.htaccess (Apache)</strong>: Best for permanent redirects on Apache servers.</li>
                <li><strong>Meta Tag</strong>: Quick client-side redirect, but not ideal for SEO.</li>
                <li><strong>JavaScript</strong>: Redirect users using JavaScript, useful for dynamic pages.</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </div>
  );
};

export default RedirectGenerator;
