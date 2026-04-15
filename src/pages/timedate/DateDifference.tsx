import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function DateDifference() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [difference, setDifference] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    hours: number;
    minutes: number;
  } | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Please select both dates",
        variant: "destructive",
      });
      return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start > end) {
      toast({
        title: "Error",
        description: "Start date must be before end date",
        variant: "destructive",
      });
      return;
    }

    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    let days = end.getDate() - start.getDate();

    if (days < 0) {
      months--;
      const prevMonth = new Date(end.getFullYear(), end.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setDifference({ years, months, days, totalDays, hours, minutes });
    toast({
      title: "Calculated!",
      description: "Date difference calculated successfully",
    });
  };

  return (
    <>
      <SEO 
        title="Date Difference Calculator - Free Online Tool | ILoveJPG"
        description="Calculate the difference between two dates. Get results in years, months, days, hours, and minutes."
        keywords="date difference, date calculator, days between dates, time difference"
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
                <BreadcrumbPage>Date Difference</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              <div className="flex items-center gap-3">
                <Calendar className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Date Difference Calculator</CardTitle>
                  <p className="text-sm opacity-90">Calculate the time between two dates</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Start Date</label>
                  <Input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">End Date</label>
                  <Input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculate} className="w-full bg-gradient-to-r from-cyan-500 to-blue-500">
                <Calendar className="w-4 h-4 mr-2" />
                Calculate Difference
              </Button>
              
              {difference && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-cyan-600">{difference.years}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Years</div>
                  </div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-blue-600">{difference.months}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Months</div>
                  </div>
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-indigo-600">{difference.days}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Days</div>
                  </div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-purple-600">{difference.totalDays}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Days</div>
                  </div>
                  <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-pink-600">{difference.hours}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Hours</div>
                  </div>
                  <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-center">
                    <div className="text-3xl font-bold text-rose-600">{difference.minutes}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Minutes</div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Date Difference Calculator">
            <p className="text-muted-foreground">
              Calculate the exact difference between two dates in years, months, days, hours, and minutes.
              Perfect for tracking project timelines, calculating age, planning events, and measuring time spans.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
