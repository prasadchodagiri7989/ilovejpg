import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Globe, Search, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function IPLookup() {
  const [ip, setIp] = useState('');
  const [info, setInfo] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const lookupIP = async () => {
    if (!ip.trim()) {
      toast({
        title: "Error",
        description: "Please enter an IP address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Using ipapi.co free API
      const response = await fetch(`https://ipapi.co/${ip}/json/`);
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.reason || 'Invalid IP address');
      }

      setInfo(data);
      toast({
        title: "Success!",
        description: "IP information retrieved",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to lookup IP address",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getMyIP = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ipapi.co/json/');
      const data = await response.json();
      setIp(data.ip);
      setInfo(data);
      toast({
        title: "Success!",
        description: "Your IP information retrieved",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get your IP address",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="IP Address Lookup - Geolocation & Network Info | ILoveJPG"
        description="Lookup IP address information including geolocation, ISP, and network details. Free IP lookup tool."
        keywords="ip lookup, ip address, geolocation, ip info, network lookup"
      />
      <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>IP Address Lookup</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <div className="flex items-center gap-3">
                <Globe className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">IP Address Lookup</CardTitle>
                  <p className="text-sm opacity-90">Get geolocation and network information</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="flex gap-3">
                <Input
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  placeholder="Enter IP address (e.g., 8.8.8.8)"
                  onKeyPress={(e) => e.key === 'Enter' && lookupIP()}
                />
                <Button onClick={lookupIP} disabled={loading} className="bg-gradient-to-r from-cyan-500 to-blue-500">
                  <Search className="w-4 h-4 mr-2" />
                  Lookup
                </Button>
              </div>

              <Button onClick={getMyIP} disabled={loading} variant="outline" className="w-full">
                <Globe className="w-4 h-4 mr-2" />
                Get My IP Info
              </Button>
              
              {info && (
                <div className="space-y-4">
                  <h3 className="font-semibold">IP Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">IP Address</p>
                      <p className="font-semibold">{info.ip}</p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Location</p>
                      <p className="font-semibold">{info.city}, {info.region}, {info.country_name}</p>
                    </div>
                    <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">ISP</p>
                      <p className="font-semibold">{info.org || 'N/A'}</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Timezone</p>
                      <p className="font-semibold">{info.timezone || 'N/A'}</p>
                    </div>
                    {info.latitude && info.longitude && (
                      <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg md:col-span-2">
                        <p className="text-sm text-muted-foreground">Coordinates</p>
                        <p className="font-semibold">{info.latitude}, {info.longitude}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About IP Address Lookup">
            <p className="text-muted-foreground">
              Lookup IP address information including geographic location, ISP, timezone, and network details.
              Perfect for network troubleshooting, security analysis, and understanding visitor locations. Uses ipapi.co API.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
