import React, { useState, useEffect } from "react";
import { Clock, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


interface ClockSettings {
  showSeconds: boolean;
  hour12: boolean;
  showDate: boolean;
  timezone: string;
}

// Fallback list of common timezones when Intl.supportedValuesOf isn't available
const FALLBACK_TIMEZONES = [
  'America/New_York',
  'America/Chicago', 
  'America/Denver',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Paris',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Pacific/Auckland',
];

export const OnlineClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [settings, setSettings] = useState<ClockSettings>({
    showSeconds: true,
    hour12: true,
    showDate: true,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  });
  const [availableTimezones, setAvailableTimezones] = useState<string[]>([]);
  
  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Clean up on component unmount
    return () => clearInterval(timer);
  }, []);
  
  // Get list of available timezones
  useEffect(() => {
    try {
      // Check if the browser supports this API (many don't)
      if (typeof Intl !== 'undefined' && 'supportedValuesOf' in Intl) {
        // TypeScript doesn't know about this method, so we need to use type assertion
        const timezones = (Intl as any).supportedValuesOf('timeZone');
        setAvailableTimezones(timezones);
      } else {
        // Fallback to common timezones
        setAvailableTimezones(FALLBACK_TIMEZONES);
      }
    } catch (error) {
      console.error('Error getting timezones:', error);
      // Fallback to common timezones
      setAvailableTimezones(FALLBACK_TIMEZONES);
    }
  }, []);
  
  const formatTime = (date: Date) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        hour: 'numeric',
        minute: 'numeric',
        second: settings.showSeconds ? 'numeric' : undefined,
        hour12: settings.hour12,
        timeZone: settings.timezone,
      };
      
      return date.toLocaleTimeString(undefined, options);
    } catch (error) {
      console.error('Error formatting time:', error);
      return date.toLocaleTimeString();
    }
  };
  
  const formatDate = (date: Date) => {
    try {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: settings.timezone,
      };
      
      return date.toLocaleDateString(undefined, options);
    } catch (error) {
      console.error('Error formatting date:', error);
      return date.toLocaleDateString();
    }
  };
  
  const handleTimezoneChange = (value: string) => {
    setSettings({
      ...settings,
      timezone: value,
    });
  };
  
  const toggleSetting = (setting: keyof ClockSettings) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
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
                      <BreadcrumbPage>Online Clock</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Clock className="mr-2 text-primary" size={24} />
            <CardTitle>Online Clock</CardTitle>
          </div>
          <CardDescription>
            View the current time in different formats and timezones
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <Tabs defaultValue="clock">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="clock">Clock</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="clock" className="pt-4">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="text-7xl font-bold tracking-tighter text-center">
                  {formatTime(currentTime)}
                </div>
                
                {settings.showDate && (
                  <div className="text-xl">
                    {formatDate(currentTime)}
                  </div>
                )}
                
                <div className="text-sm text-muted-foreground">
                  Timezone: {settings.timezone.replace(/_/g, ' ')}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={settings.timezone} onValueChange={handleTimezoneChange}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimezones.map((timezone) => (
                      <SelectItem key={timezone} value={timezone}>
                        {timezone.replace(/_/g, ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-seconds">Show seconds</Label>
                  <Switch
                    id="show-seconds"
                    checked={settings.showSeconds}
                    onCheckedChange={() => toggleSetting('showSeconds')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="12-hour">12-hour format</Label>
                  <Switch
                    id="12-hour"
                    checked={settings.hour12}
                    onCheckedChange={() => toggleSetting('hour12')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <Label htmlFor="show-date">Show date</Label>
                  <Switch
                    id="show-date"
                    checked={settings.showDate}
                    onCheckedChange={() => toggleSetting('showDate')}
                  />
                </div>
              </div>
              
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={() => {
                  setSettings({
                    showSeconds: true,
                    hour12: true,
                    showDate: true,
                    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  });
                }}
              >
                Reset to Default Settings
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Online Clock Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Viewing the Current Time</h4>
      <p>The Online Clock tool allows you to view the current time in various formats and time zones.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Open the Online Clock tool.</li>
        <li>View the current time, date, and timezone.</li>
        <li>Adjust settings to change the time format (12-hour or 24-hour).</li>
        <li>Select different time zones if needed.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Customization Options</h4>
      <ul className="list-disc pl-5">
        <li>Switch between 12-hour and 24-hour time formats.</li>
        <li>Change the displayed timezone to match your preference.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Convenient for checking time across different locations.</li>
        <li>Helps in scheduling meetings across time zones.</li>
        <li>Provides an accurate and reliable clock display.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
