import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cake } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });

  const calculate = () => {
    const birth = new Date(birthDate);
    const today = new Date();
    const years = today.getFullYear() - birth.getFullYear();
    const months = today.getMonth() - birth.getMonth();
    const days = today.getDate() - birth.getDate();
    setAge({ years, months: months < 0 ? 12 + months : months, days: days < 0 ? 30 + days : days });
  };

  return (
    <>
      <SEO title="Age Calculator - Calculate Your Age Online" description="Calculate your age in years, months, and days. Free age calculator with precise results." keywords="age calculator, calculate age, age finder" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Age Calculator</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-rose-500 text-white">
              <div className="flex items-center gap-3">
                <Cake className="w-8 h-8" />
                <div><CardTitle className="text-2xl">Age Calculator</CardTitle><p className="text-sm text-pink-100">Calculate your exact age</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div><label className="text-sm font-medium">Date of Birth</label><Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} className="mt-1" /></div>
              <Button onClick={calculate} className="bg-gradient-to-r from-pink-500 to-rose-500 w-full"><Cake className="w-4 h-4 mr-2" />Calculate Age</Button>
              {age.years > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg text-center"><div className="text-3xl font-bold text-pink-600">{age.years}</div><div className="text-sm text-gray-600 dark:text-gray-400">Years</div></div>
                  <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg text-center"><div className="text-3xl font-bold text-rose-600">{age.months}</div><div className="text-sm text-gray-600 dark:text-gray-400">Months</div></div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg text-center"><div className="text-3xl font-bold text-red-600">{age.days}</div><div className="text-sm text-gray-600 dark:text-gray-400">Days</div></div>
                </div>
              )}
            </CardContent>
          </Card>
          <GuidanceSection title="About Age Calculator">
            <p className="text-muted-foreground">
              Calculate your exact age in years, months, and days. Enter your birth date to get precise age calculations instantly.
              Perfect for age verification and birthday planning.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
