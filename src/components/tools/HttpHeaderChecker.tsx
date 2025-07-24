import React, { useState } from "react";
import { ExternalLink, ArrowRight, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { GuidanceSection } from "../GuidanceSection";

const HttpHeaderChecker = () => {
  const [url, setUrl] = useState("");
  const [headers, setHeaders] = useState<Header[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const fetchHeaders = async () => {
    if (!url) {
      toast.error("Please enter a URL");
      return;
    }

    let processedUrl = url;
    if (!processedUrl.startsWith("http://") && !processedUrl.startsWith("https://")) {
      processedUrl = "https://" + processedUrl;
    }

    try {
      setLoading(true);
      setError("");
      setHeaders([]);

      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(processedUrl)}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const headerEntries: Header[] = [];

      // Extract headers from the response
      for (const key in data.status) {
        if (key.toLowerCase() !== "url" && key.toLowerCase() !== "content_type") {
          headerEntries.push({
            name: key.replace(/_/g, "-"),
            value: data.status[key],
          });
        }
      }

      setHeaders(headerEntries);
      toast.success("Headers fetched successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while fetching headers");
      toast.error("Failed to fetch headers");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    const headerText = headers.map(header => `${header.name}: ${header.value}`).join("\n");
    navigator.clipboard.writeText(headerText);
    setCopied(true);
    toast.success("Headers copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 1500);
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
            <BreadcrumbPage>HTTP Header Checker</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>HTTP Header Checker</CardTitle>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="url" className="block text-sm font-medium text-gray-700">
              Enter URL
            </label>
            <div className="flex items-center">
              <input
                id="url"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="example.com"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-l-lg focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all dark:bg-transparent"
              />
              <Button
                onClick={fetchHeaders}
                disabled={loading}
                className="rounded-l-none"
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Checking
                  </span>
                ) : (
                  <span className="flex items-center">
                    <ArrowRight size={16} className="mr-1.5" />
                    Check Headers
                  </span>
                )}
              </Button>
            </div>
            <p className="text-xs text-gray-500">
              Enter a domain name or full URL (e.g., example.com or https://example.com/path)
            </p>
          </div>

          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {error}
            </div>
          )}

          {headers.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-700">
                  Headers for {url.startsWith("http") ? url : `https://${url}`}
                </h3>
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
                        Copy Headers
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex items-center text-xs"
                  >
                    <a
                      href={url.startsWith("http") ? url : `https://${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={14} className="mr-1.5" />
                      Visit Site
                    </a>
                  </Button>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                        Header Name
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/3">
                        Value
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {headers.map((header, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-4 py-3 text-sm font-medium text-gray-900 align-top">
                          {header.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-gray-700 font-mono break-all">
                          {header.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="mt-8">
        <GuidanceSection title="How to Use the HTTP Header Checker">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-1">Using the HTTP Header Checker</h4>
              <p>The HTTP Header Checker allows you to inspect HTTP headers for any website, helping with debugging, security analysis, and SEO.</p>
              <p className="mt-2"><strong>How to Use:</strong></p>
              <ol className="list-decimal pl-5">
                <li>Enter a domain name or full URL (e.g., example.com or https://example.com/path).</li>
                <li>Click "Check Headers" to fetch the HTTP headers.</li>
                <li>Review the response headers, including status codes, content type, caching policies, and security settings.</li>
                <li>Use the information to analyze SEO, troubleshoot issues, or check for security vulnerabilities.</li>
              </ol>
            </div>

            <div>
              <h4 className="font-medium mb-1">Features</h4>
              <ul className="list-disc pl-5">
                <li>Fetches and displays HTTP response headers.</li>
                <li>Helps with debugging and troubleshooting web requests.</li>
                <li>Useful for analyzing SEO and security configurations.</li>
                <li>Supports both domain names and full URLs.</li>
              </ul>
            </div>
          </div>
        </GuidanceSection>
      </div>
    </>
  );
};

export default HttpHeaderChecker;
