import React, { useState } from "react";
import { ExternalLink, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ToolLayout from "@/components/ui/ToolLayout";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


interface StatusResult {
  url: string;
  status: number;
  statusText: string;
  redirectCount: number;
  redirectUrl?: string;
  time: number;
}

const HttpStatusChecker = () => {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState<StatusResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const checkStatus = async () => {
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
      setResult(null);

      const startTime = Date.now();
      
      // Using a CORS proxy to fetch the URL status
      const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(processedUrl)}`, {
        method: "GET",
      });

      const endTime = Date.now();
      const timeElapsed = endTime - startTime;

      // Extract status from the response
      const data = await response.json();
      
      // Check if the request was successful
      if (data.status && data.status.http_code) {
        setResult({
          url: processedUrl,
          status: data.status.http_code,
          statusText: getStatusText(data.status.http_code),
          redirectCount: 0, // This proxy might not track redirects correctly
          redirectUrl: data.status.url !== processedUrl ? data.status.url : undefined,
          time: timeElapsed,
        });
        
        toast.success(`Status checked: ${data.status.http_code}`);
      } else {
        throw new Error("Could not retrieve status information");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred while checking status");
      toast.error("Failed to check status");
    } finally {
      setLoading(false);
    }
  };

  const getStatusText = (status: number): string => {
    const statusTexts: Record<number, string> = {
      100: "Continue",
      101: "Switching Protocols",
      200: "OK",
      201: "Created",
      202: "Accepted",
      203: "Non-Authoritative Information",
      204: "No Content",
      205: "Reset Content",
      206: "Partial Content",
      300: "Multiple Choices",
      301: "Moved Permanently",
      302: "Found",
      303: "See Other",
      304: "Not Modified",
      305: "Use Proxy",
      307: "Temporary Redirect",
      308: "Permanent Redirect",
      400: "Bad Request",
      401: "Unauthorized",
      402: "Payment Required",
      403: "Forbidden",
      404: "Not Found",
      405: "Method Not Allowed",
      406: "Not Acceptable",
      407: "Proxy Authentication Required",
      408: "Request Timeout",
      409: "Conflict",
      410: "Gone",
      411: "Length Required",
      412: "Precondition Failed",
      413: "Payload Too Large",
      414: "URI Too Long",
      415: "Unsupported Media Type",
      416: "Range Not Satisfiable",
      417: "Expectation Failed",
      418: "I'm a teapot",
      422: "Unprocessable Entity",
      425: "Too Early",
      426: "Upgrade Required",
      428: "Precondition Required",
      429: "Too Many Requests",
      431: "Request Header Fields Too Large",
      451: "Unavailable For Legal Reasons",
      500: "Internal Server Error",
      501: "Not Implemented",
      502: "Bad Gateway",
      503: "Service Unavailable",
      504: "Gateway Timeout",
      505: "HTTP Version Not Supported",
      506: "Variant Also Negotiates",
      507: "Insufficient Storage",
      508: "Loop Detected",
      510: "Not Extended",
      511: "Network Authentication Required"
    };
    
    return statusTexts[status] || "Unknown Status";
  };

  const getStatusColor = (status: number): string => {
    if (status >= 200 && status < 300) return "bg-green-100 text-green-800 border-green-200";
    if (status >= 300 && status < 400) return "bg-blue-100 text-blue-800 border-blue-200";
    if (status >= 400 && status < 500) return "bg-yellow-100 text-yellow-800 border-yellow-200";
    if (status >= 500) return "bg-red-100 text-red-800 border-red-200";
    return "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusDescription = (status: number): string => {
    if (status >= 200 && status < 300) {
      return "Success! The request was successfully received, understood, and accepted.";
    }
    if (status >= 300 && status < 400) {
      return "Redirection. Further action needs to be taken to complete the request.";
    }
    if (status >= 400 && status < 500) {
      return "Client Error. The request contains bad syntax or cannot be fulfilled.";
    }
    if (status >= 500) {
      return "Server Error. The server failed to fulfill a valid request.";
    }
    return "Informational. The request was received, continuing process.";
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
                  <BreadcrumbPage>HTTP Status Checker</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <ToolLayout
      title="HTTP Status Checker"
      description="Check the HTTP status of any URL. Useful for debugging website issues, checking redirects and SEO analysis."
    >
      <div className="space-y-6">
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
              onClick={checkStatus}
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
                  Check Status
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

        {result && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-700">URL</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="flex items-center text-xs"
                  >
                    <a
                      href={result.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink size={14} className="mr-1.5" />
                      Visit
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-gray-600 break-all">
                  {result.url}
                </p>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg space-y-3">
                <h3 className="text-sm font-medium text-gray-700">Response Time</h3>
                <div className="flex items-center">
                  <div className="text-2xl font-semibold text-primary">{result.time}</div>
                  <div className="ml-1 text-sm text-gray-500">ms</div>
                </div>
                <p className="text-xs text-gray-500">
                  {result.time < 300 ? "Fast response" : result.time < 1000 ? "Average response time" : "Slow response"}
                </p>
              </div>
            </div>
            
            <div className={`p-6 border rounded-lg space-y-4 ${getStatusColor(result.status)}`}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl font-bold">{result.status}</div>
                  <div className="text-lg font-medium">{result.statusText}</div>
                </div>
                
                {result.redirectUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="bg-white/70 border-current"
                  >
                    <a
                      href={result.redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-xs"
                    >
                      <ExternalLink size={14} className="mr-1.5" />
                      Redirected URL
                    </a>
                  </Button>
                )}
              </div>
              
              <p>{getStatusDescription(result.status)}</p>
              
              {result.redirectCount > 0 && (
                <div className="text-sm">
                  <span className="font-medium">Redirect count:</span> {result.redirectCount}
                </div>
              )}
            </div>
            
            <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Common HTTP Status Codes</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-1 bg-green-100 text-green-800 rounded">200</div>
                  <span>OK - Request succeeded</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded">301</div>
                  <span>Moved Permanently</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded">302</div>
                  <span>Found (Temporary Redirect)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">404</div>
                  <span>Not Found</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">403</div>
                  <span>Forbidden</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-1 bg-red-100 text-red-800 rounded">500</div>
                  <span>Internal Server Error</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-1 bg-red-100 text-red-800 rounded">502</div>
                  <span>Bad Gateway</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="px-2 py-1 bg-red-100 text-red-800 rounded">503</div>
                  <span>Service Unavailable</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
    <GuidanceSection title="How to Use the HTTP Status Checker">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the HTTP Status Checker</h4>
      <p>The HTTP Status Checker helps you analyze the status of any URL, making it useful for debugging website issues, tracking redirects, and conducting SEO analysis.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Enter a domain name or full URL (e.g., example.com or https://example.com/path).</li>
        <li>Click "Check Status" to retrieve the HTTP response code.</li>
        <li>Review the status code to understand if the request was successful, redirected, or encountered an error.</li>
        <li>Use this information to troubleshoot website issues, track redirects, or optimize SEO.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Common HTTP Status Codes</h4>
      <ul className="list-disc pl-5">
        <li><strong>200 OK</strong> – The request was successful.</li>
        <li><strong>301 Moved Permanently</strong> – The URL has been permanently redirected.</li>
        <li><strong>302 Found</strong> – A temporary redirect is in place.</li>
        <li><strong>404 Not Found</strong> – The requested page does not exist.</li>
        <li><strong>500 Internal Server Error</strong> – A server-side issue occurred.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </>
  );
};

export default HttpStatusChecker;
