
import React, { useState } from "react";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const Calendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [month, setMonth] = useState(new Date());

  const handlePrevMonth = () => {
    const prevMonth = new Date(month);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setMonth(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(month);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setMonth(nextMonth);
  };

  const handleToday = () => {
    setMonth(new Date());
    setDate(new Date());
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
                                  <BreadcrumbLink asChild>
                                    <Link to="/a">All Calculators</Link>
                                  </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                                <BreadcrumbItem>
                                  <BreadcrumbLink asChild>
                                    <Link to="/time/all">Time Calculator</Link>
                                  </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Calendar</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <CalendarIcon className="mr-2 text-primary" size={24} />
            <CardTitle>Calendar</CardTitle>
          </div>
          <CardDescription>
            View and interact with a calendar
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="flex justify-between items-center mb-4">
            <Button variant="outline" size="sm" onClick={handlePrevMonth}>
              <ChevronLeft size={16} />
            </Button>
            <h2 className="text-xl font-semibold">
              {month.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h2>
            <Button variant="outline" size="sm" onClick={handleNextMonth}>
              <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="flex justify-center">
            <CalendarUI
              mode="single"
              selected={date}
              onSelect={setDate}
              month={month}
              onMonthChange={setMonth}
              className="border rounded-md p-3"
            />
          </div>
          
          <div className="mt-4 flex justify-center">
            <Button variant="outline" onClick={handleToday}>
              Today
            </Button>
          </div>
          
          {date && (
            <div className="mt-4 p-4 bg-muted/30 rounded-md">
              <p className="text-center">
                Selected date: <span className="font-medium">{date.toLocaleDateString('en-US', { 
                  weekday: 'long',
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric'
                })}</span>
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Calendar Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Viewing the Calendar</h4>
      <p>The calendar tool allows you to view and interact with dates easily.</p>
      <p className="mt-2"><strong>Navigation:</strong></p>
      <ul className="list-disc pl-5">
        <li>Use the arrow buttons to navigate between months.</li>
        <li>Click on a specific date to select it.</li>
        <li>The "Today" button quickly moves to the current date.</li>
      </ul>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Selecting and Interacting with Dates</h4>
      <p>You can select a date to view details or add events.</p>
      <p className="mt-2"><strong>How to Select a Date:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click on any date in the calendar to highlight it.</li>
        <li>The selected date will be displayed at the top.</li>
        <li>Use this selection to create reminders or view existing events.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Adding and Managing Events</h4>
      <p>The calendar allows you to add events, meetings, or tasks to specific dates.</p>
      <p className="mt-2"><strong>Steps to Add an Event:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Click on a date to select it.</li>
        <li>Click the "Add Event" button.</li>
        <li>Enter the event title, description, and time.</li>
        <li>Click "Save" to add the event to your calendar.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium">Using the Calendar Efficiently</h4>
      <ul className="list-disc pl-5">
        <li>Use color coding to differentiate event types.</li>
        <li>Set reminders for important deadlines.</li>
        <li>Sync with other calendar apps to keep everything in one place.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>
    </div>
    </>
  );
};
