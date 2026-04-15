import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Server, Search } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function DNSLookup() {
  const [domain, setDomain] = useState('');
  const [records, setRecords] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const lookupDNS = async () => {
    if (!domain.trim()) {
      toast({
        title: "Error",
        description: "Please enter a domain name",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // Using Google's DNS-over-HTTPS API
      const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
      const response = await fetch(`https://dns.google/resolve?name=${cleanDomain}&type=A`);
      const data = await response.json();
      
      if (data.Status !== 0) {
        throw new Error('Domain not found or invalid');
      }

      setRecords(data);
      toast({
        title: "Success!",
        description: "DNS records retrieved",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to lookup DNS records",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="DNS Lookup - Domain Name System Query Tool | ILoveJPG"
        description="Lookup DNS records for any domain. Check A, AAAA, MX, NS, and other DNS records instantly."
        keywords="dns lookup, dns records, domain lookup, dns query, nameserver"
      />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>DNS Lookup</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <Server className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">DNS Lookup</CardTitle>
                  <p className="text-sm opacity-90">Query DNS records for any domain</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="flex gap-3">
                <Input
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Enter domain name (e.g., example.com)"
                  onKeyPress={(e) => e.key === 'Enter' && lookupDNS()}
                />
                <Button onClick={lookupDNS} disabled={loading} className="bg-gradient-to-r from-violet-500 to-purple-500">
                  <Search className="w-4 h-4 mr-2" />
                  Lookup
                </Button>
              </div>
              
              {records && (
                <div className="space-y-4">
                  <h3 className="font-semibold">DNS Records</h3>
                  
                  {records.Answer && records.Answer.length > 0 ? (
                    <div className="space-y-3">
                      {records.Answer.map((record: any, index: number) => (
                        <div key={index} className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            <div>
                              <p className="text-sm text-muted-foreground">Name</p>
                              <p className="font-semibold break-all">{record.name}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Type</p>
                              <p className="font-semibold">{record.type}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Value</p>
                              <p className="font-semibold break-all">{record.data}</p>
                            </div>
                          </div>
                          {record.TTL && (
                            <div className="mt-2">
                              <p className="text-sm text-muted-foreground">TTL: {record.TTL} seconds</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No DNS records found</p>
                  )}

                  {records.Question && (
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Query</p>
                      <p className="font-semibold">{records.Question[0]?.name}</p>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About DNS Lookup">
            <p className="text-muted-foreground">
              Query DNS records for any domain name. Get A records, IP addresses, and nameserver information.
              Perfect for troubleshooting domain issues, verifying DNS configuration, and network diagnostics. Uses Google DNS-over-HTTPS API.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
