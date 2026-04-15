import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe2 } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function WorldClock() {
  const [times, setTimes] = useState<{ [key: string]: string }>({});

  const timezones = [
    { name: 'New York', tz: 'America/New_York' },
    { name: 'London', tz: 'Europe/London' },
    { name: 'Paris', tz: 'Europe/Paris' },
    { name: 'Tokyo', tz: 'Asia/Tokyo' },
    { name: 'Sydney', tz: 'Australia/Sydney' },
    { name: 'Dubai', tz: 'Asia/Dubai' },
    { name: 'Mumbai', tz: 'Asia/Kolkata' },
    { name: 'Los Angeles', tz: 'America/Los_Angeles' },
    { name: 'Singapore', tz: 'Asia/Singapore' },
    { name: 'Hong Kong', tz: 'Asia/Hong_Kong' },
    { name: 'Moscow', tz: 'Europe/Moscow' },
    { name: 'São Paulo', tz: 'America/Sao_Paulo' },
  ];

  useEffect(() => {
    const updateTimes = () => {
      const newTimes: { [key: string]: string } = {};
      timezones.forEach(({ name, tz }) => {
        const formatter = new Intl.DateTimeFormat('en-US', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        });
        newTimes[name] = formatter.format(new Date());
      });
      setTimes(newTimes);
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <SEO 
        title="World Clock - Current Time in Major Cities | ILoveJPG"
        description="View current time in major cities worldwide. Real-time world clock with multiple timezones."
        keywords="world clock, world time, international time, timezone clock"
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
                <BreadcrumbPage>World Clock</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-6xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <Globe2 className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">World Clock</CardTitle>
                  <p className="text-sm opacity-90">Current time in major cities worldwide</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {timezones.map(({ name, tz }) => (
                  <div
                    key={name}
                    className="p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg border border-indigo-100 dark:border-indigo-800"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Globe2 className="w-5 h-5 text-indigo-600" />
                      <h3 className="font-semibold text-lg">{name}</h3>
                    </div>
                    <div className="text-3xl font-bold text-indigo-600">
                      {times[name] || 'Loading...'}
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{tz}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About World Clock">
            <p className="text-muted-foreground">
              View real-time current time in major cities around the world. Perfect for international business, remote teams, and global coordination.
              Updates every second with accurate timezone information including daylight saving time adjustments.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
