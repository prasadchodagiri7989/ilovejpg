import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Monitor, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function UserAgentParser() {
  const [userAgent, setUserAgent] = useState(navigator.userAgent);
  const [parsed, setParsed] = useState<any>(null);
  const { toast } = useToast();

  const parseUserAgent = () => {
    if (!userAgent.trim()) {
      toast({
        title: "Error",
        description: "Please enter a user agent string",
        variant: "destructive",
      });
      return;
    }

    try {
      const browser = detectBrowser(userAgent);
      const os = detectOS(userAgent);
      const device = detectDevice(userAgent);

      setParsed({ browser, os, device, userAgent });
      toast({
        title: "Parsed!",
        description: "User agent parsed successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to parse user agent",
        variant: "destructive",
      });
    }
  };

  const detectBrowser = (ua: string) => {
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari') && !ua.includes('Chrome')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    if (ua.includes('Opera') || ua.includes('OPR')) return 'Opera';
    return 'Unknown';
  };

  const detectOS = (ua: string) => {
    if (ua.includes('Windows')) return 'Windows';
    if (ua.includes('Mac OS')) return 'macOS';
    if (ua.includes('Linux')) return 'Linux';
    if (ua.includes('Android')) return 'Android';
    if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) return 'iOS';
    return 'Unknown';
  };

  const detectDevice = (ua: string) => {
    if (ua.includes('Mobile') || ua.includes('iPhone') || ua.includes('Android')) return 'Mobile';
    if (ua.includes('Tablet') || ua.includes('iPad')) return 'Tablet';
    return 'Desktop';
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(parsed, null, 2));
    toast({
      title: "Copied!",
      description: "Parsed data copied to clipboard",
    });
  };

  return (
    <>
      <SEO 
        title="User Agent Parser - Analyze Browser & Device Info | ILoveJPG"
        description="Parse and analyze user agent strings. Get browser, OS, and device information from user agent data."
        keywords="user agent parser, browser detection, device detection, user agent analyzer"
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>User Agent Parser</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <Monitor className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">User Agent Parser</CardTitle>
                  <p className="text-sm opacity-90">Analyze browser and device information</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">User Agent String</label>
                <Textarea
                  value={userAgent}
                  onChange={(e) => setUserAgent(e.target.value)}
                  placeholder="Enter user agent string..."
                  className="min-h-[100px] font-mono text-sm"
                />
              </div>
              
              <Button onClick={parseUserAgent} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500">
                <Monitor className="w-4 h-4 mr-2" />
                Parse User Agent
              </Button>
              
              {parsed && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">Parsed Information</h3>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="w-4 h-4 mr-2" />
                      Copy JSON
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Browser</p>
                      <p className="text-xl font-bold text-indigo-600">{parsed.browser}</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Operating System</p>
                      <p className="text-xl font-bold text-purple-600">{parsed.os}</p>
                    </div>
                    <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Device Type</p>
                      <p className="text-xl font-bold text-pink-600">{parsed.device}</p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About User Agent Parser">
            <p className="text-muted-foreground">
              Parse user agent strings to extract browser, operating system, and device information.
              Perfect for web analytics, debugging, and understanding visitor demographics. Your current user agent is pre-filled.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
