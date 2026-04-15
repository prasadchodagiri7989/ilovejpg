import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Code, Copy, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GuidanceSection } from "../../components/GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

export const JSONFormatter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const { toast } = useToast();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JSON Formatter & Validator",
    "url": "https://ilovejpg.in/json-formatter",
    "description": "Free online JSON formatter and validator. Format, validate, and beautify JSON data instantly. No installation required.",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const formatJSON = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, 2);
      setOutput(formatted);
      toast({
        title: "Success!",
        description: "JSON formatted successfully",
      });
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setOutput("");
      toast({
        title: "Error",
        description: "Invalid JSON format",
        variant: "destructive",
      });
    }
  };

  const minifyJSON = () => {
    try {
      setError("");
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      toast({
        title: "Success!",
        description: "JSON minified successfully",
      });
    } catch (err) {
      setError("Invalid JSON: " + (err as Error).message);
      setOutput("");
    }
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(output);
    toast({
      title: "Copied!",
      description: "JSON copied to clipboard",
    });
  };

  const clearAll = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  return (
    <>
      <SEO 
        title="JSON Formatter & Validator - Free Online Tool"
        description="Free online JSON formatter and validator. Format, beautify, validate, and minify JSON data with syntax highlighting. Perfect for developers working with JSON APIs and data structures."
        keywords="json formatter, json validator, json beautifier, json minifier, format json online, validate json, json syntax checker, json parser, json pretty print"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">Developer Tools</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>JSON Formatter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <div className="flex items-center gap-2">
                <Code size={24} />
                <CardTitle>JSON Formatter & Validator</CardTitle>
              </div>
              <CardDescription className="text-blue-50">
                Format, validate, and beautify your JSON data instantly
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Input JSON</label>
                  <Textarea
                    placeholder='{"name": "example", "value": 123}'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="min-h-[300px] font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Formatted Output</label>
                  <Textarea
                    value={output}
                    readOnly
                    className="min-h-[300px] font-mono text-sm bg-gray-50 dark:bg-gray-900"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mt-6">
                <Button onClick={formatJSON} className="gap-2">
                  <CheckCircle2 size={16} />
                  Format & Validate
                </Button>
                <Button onClick={minifyJSON} variant="secondary" className="gap-2">
                  Minify
                </Button>
                <Button onClick={copyOutput} variant="outline" disabled={!output} className="gap-2">
                  <Copy size={16} />
                  Copy Output
                </Button>
                <Button onClick={clearAll} variant="outline">
                  Clear
                </Button>
              </div>
            </CardContent>
          </Card>

          <GuidanceSection title="About JSON Formatter & Validator">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">What is JSON?</h3>
                <p>
                  JSON (JavaScript Object Notation) is a lightweight data-interchange format that's easy for humans to read and write, 
                  and easy for machines to parse and generate. It's widely used for APIs, configuration files, and data storage.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">How to Use the JSON Formatter</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Paste your JSON data into the input field</li>
                  <li>Click "Format & Validate" to beautify and check syntax</li>
                  <li>Click "Minify" to compress JSON for production use</li>
                  <li>Copy the formatted output to your clipboard</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Instant Formatting:</strong> Beautify JSON with proper indentation</li>
                  <li><strong>Syntax Validation:</strong> Detect and report JSON errors</li>
                  <li><strong>Minification:</strong> Compress JSON for production</li>
                  <li><strong>Error Messages:</strong> Clear error descriptions for debugging</li>
                  <li><strong>Client-Side:</strong> All processing happens in your browser - your data never leaves your device</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Common JSON Use Cases</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>API request and response formatting</li>
                  <li>Configuration file validation</li>
                  <li>Data structure visualization</li>
                  <li>Database export formatting</li>
                  <li>Web development and debugging</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Example JSON</h3>
                <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto">
{`{
  "user": {
    "id": 12345,
    "name": "John Doe",
    "email": "john@example.com",
    "roles": ["admin", "user"],
    "active": true
  }
}`}
                </pre>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Tips for Valid JSON</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use double quotes for strings (not single quotes)</li>
                  <li>Property names must be in double quotes</li>
                  <li>No trailing commas after the last item</li>
                  <li>Comments are not allowed in valid JSON</li>
                  <li>Use null instead of undefined</li>
                </ul>
              </div>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
};

export default JSONFormatter;
