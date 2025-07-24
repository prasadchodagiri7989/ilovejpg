import React, { useState, useEffect } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const CurrentTime = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    // Clean up on component unmount
    return () => clearInterval(timer);
  }, []);
  
  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return date.toLocaleDateString(undefined, options);
  };
  
  const formatTime = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: true
    };
    return date.toLocaleTimeString(undefined, options);
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
                  <BreadcrumbPage>Current Time</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Clock className="mr-2 text-primary" size={24} />
            <CardTitle>Current Time</CardTitle>
          </div>
          <CardDescription>
            The current local date and time
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center text-6xl font-bold tracking-tighter text-center">
              {formatTime(currentTime)}
            </div>
            <Separator />
            <div className="flex items-center text-xl">
              <CalendarIcon className="mr-2 text-muted-foreground" size={20} />
              {formatDate(currentTime)}
            </div>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Current Time Display">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Viewing the Current Time</h4>
      <p>The Current Time display shows the local date and time based on your device settings.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Simply open the tool to view the current time instantly.</li>
        <li>The time updates automatically to reflect real-time changes.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Use Cases for the Current Time Display</h4>
      <ul className="list-disc pl-5">
        <li>Checking the local time without needing a clock or phone.</li>
        <li>Synchronizing activities or events based on the current time.</li>
        <li>Quickly verifying the date and time for scheduling purposes.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
