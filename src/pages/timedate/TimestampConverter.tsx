import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Clock, Copy, RotateCcw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { GuidanceSection } from "../../components/GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

export const TimestampConverter = () => {
  const [timestamp, setTimestamp] = useState("");
  const [currentTimestamp, setCurrentTimestamp] = useState(Date.now());
  const [convertedDate, setConvertedDate] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [resultTimestamp, setResultTimestamp] = useState("");
  const { toast } = useToast();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Timestamp Converter",
    "url": "https://ilovejpg.in/timestamp-converter",
    "description": "Free online Unix timestamp converter. Convert Unix timestamps to human-readable dates and vice versa. Supports milliseconds and seconds.",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const convertToDate = () => {
    try {
      const ts = parseInt(timestamp);
      if (isNaN(ts)) {
        toast({
          title: "Invalid Input",
          description: "Please enter a valid timestamp",
          variant: "destructive",
        });
        return;
      }
      
      // Handle both seconds and milliseconds
      const milliseconds = timestamp.length === 10 ? ts * 1000 : ts;
      const date = new Date(milliseconds);
      
      const formatted = date.toLocaleString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      });
      
      setConvertedDate(formatted);
      toast({
        title: "Converted!",
        description: "Timestamp converted successfully",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to convert timestamp",
        variant: "destructive",
      });
    }
  };

  const convertToTimestamp = () => {
    try {
      const date = new Date(dateInput);
      if (isNaN(date.getTime())) {
        toast({
          title: "Invalid Date",
          description: "Please enter a valid date",
          variant: "destructive",
        });
        return;
      }
      
      const ts = Math.floor(date.getTime() / 1000);
      setResultTimestamp(ts.toString());
      toast({
        title: "Converted!",
        description: "Date converted to timestamp",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to convert date",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Copied to clipboard",
    });
  };

  const useCurrentTimestamp = () => {
    setTimestamp(Math.floor(currentTimestamp / 1000).toString());
  };

  return (
    <>
      <SEO 
        title="Unix Timestamp Converter - Convert Timestamp to Date Online"
        description="Free online Unix timestamp converter. Convert Unix timestamps to human-readable dates and dates to timestamps. Supports both seconds and milliseconds. Perfect for developers and system administrators."
        keywords="timestamp converter, unix timestamp, epoch converter, timestamp to date, date to timestamp, unix time converter, epoch time converter, timestamp tool"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-5xl mx-auto">
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
                  <Link to="/">Time & Date Tools</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Timestamp Converter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card className="shadow-lg mb-6">
            <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              <div className="flex items-center gap-2">
                <Clock size={24} />
                <CardTitle>Unix Timestamp Converter</CardTitle>
              </div>
              <CardDescription className="text-purple-50">
                Convert between Unix timestamps and human-readable dates
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg mb-6">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current Unix Timestamp</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                    {Math.floor(currentTimestamp / 1000)}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(currentTimestamp).toLocaleString()}
                  </p>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="mt-3"
                    onClick={useCurrentTimestamp}
                  >
                    Use Current Timestamp
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Timestamp to Date</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Unix Timestamp</label>
                    <Input
                      type="text"
                      placeholder="Enter timestamp (e.g., 1609459200)"
                      value={timestamp}
                      onChange={(e) => setTimestamp(e.target.value)}
                      className="text-lg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Supports both seconds (10 digits) and milliseconds (13 digits)</p>
                  </div>
                  <Button onClick={convertToDate} className="w-full">
                    Convert to Date
                  </Button>
                  {convertedDate && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Result:</p>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard(convertedDate)}
                          className="gap-1"
                        >
                          <Copy size={14} />
                          Copy
                        </Button>
                      </div>
                      <p className="text-sm font-mono break-words">{convertedDate}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-lg">Date to Timestamp</h3>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Date and Time</label>
                    <Input
                      type="datetime-local"
                      value={dateInput}
                      onChange={(e) => setDateInput(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <Button onClick={convertToTimestamp} className="w-full" variant="secondary">
                    Convert to Timestamp
                  </Button>
                  {resultTimestamp && (
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Result:</p>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          onClick={() => copyToClipboard(resultTimestamp)}
                          className="gap-1"
                        >
                          <Copy size={14} />
                          Copy
                        </Button>
                      </div>
                      <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">{resultTimestamp}</p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <GuidanceSection title="About Unix Timestamps">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">What is a Unix Timestamp?</h3>
                <p>
                  A Unix timestamp (also known as Epoch time or POSIX time) is a system for tracking time as a running count of seconds. 
                  It represents the number of seconds that have elapsed since January 1, 1970, at 00:00:00 UTC (the Unix epoch).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Why Use Unix Timestamps?</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Universal Standard:</strong> Works across all programming languages and systems</li>
                  <li><strong>Timezone Independent:</strong> Represents absolute time, avoiding timezone confusion</li>
                  <li><strong>Easy Calculations:</strong> Simple arithmetic for time differences</li>
                  <li><strong>Database Storage:</strong> Efficient storage as a single number</li>
                  <li><strong>API Communication:</strong> Standard format for data exchange</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Common Use Cases</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Database record timestamps</li>
                  <li>API request/response timestamps</li>
                  <li>Log file analysis</li>
                  <li>Session expiration tracking</li>
                  <li>Event scheduling systems</li>
                  <li>Cache invalidation</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Important Milestones</h3>
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="font-medium">Unix Epoch Start</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">0 = January 1, 1970 00:00:00 UTC</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="font-medium">Year 2000 (Y2K)</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">946684800 = January 1, 2000 00:00:00 UTC</p>
                  </div>
                  <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded">
                    <p className="font-medium">Year 2038 Problem</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">2147483647 = January 19, 2038 03:14:07 UTC (32-bit limit)</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Seconds vs Milliseconds</h3>
                <p className="mb-2">Unix timestamps can be expressed in two formats:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Seconds (10 digits):</strong> Standard Unix timestamp (e.g., 1609459200)</li>
                  <li><strong>Milliseconds (13 digits):</strong> Used by JavaScript and some APIs (e.g., 1609459200000)</li>
                </ul>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  This tool automatically detects the format based on the number of digits.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Programming Examples</h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium mb-1">JavaScript</p>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`// Get current timestamp (milliseconds)
const timestamp = Date.now();

// Convert to seconds
const seconds = Math.floor(Date.now() / 1000);

// Convert timestamp to date
const date = new Date(timestamp);`}
                    </pre>
                  </div>
                  <div>
                    <p className="font-medium mb-1">Python</p>
                    <pre className="bg-gray-100 dark:bg-gray-800 p-3 rounded text-sm overflow-x-auto">
{`import time
# Get current timestamp
timestamp = int(time.time())

# Convert timestamp to date
from datetime import datetime
date = datetime.fromtimestamp(timestamp)`}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
};

export default TimestampConverter;
