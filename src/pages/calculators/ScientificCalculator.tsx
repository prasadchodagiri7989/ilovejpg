import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const appendNumber = (num: string) => {
    setDisplay(display === '0' ? num : display + num);
    setExpression(expression + num);
  };

  const appendOperator = (op: string) => {
    setExpression(expression + op);
    setDisplay('0');
  };

  const calculate = () => {
    try {
      const result = eval(expression);
      setDisplay(result.toString());
      setExpression(result.toString());
    } catch {
      setDisplay('Error');
    }
  };

  const clear = () => {
    setDisplay('0');
    setExpression('');
  };

  return (
    <>
      <SEO title="Scientific Calculator - Advanced Online Calculator" description="Free scientific calculator with advanced functions. Calculate complex mathematical expressions online." keywords="scientific calculator, online calculator, math calculator" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Scientific Calculator</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-md mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-slate-500 to-gray-600 text-white">
              <div className="flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                <div><CardTitle className="text-2xl">Scientific Calculator</CardTitle></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-lg text-right"><div className="text-sm text-gray-600">{expression || '0'}</div><div className="text-2xl font-bold">{display}</div></div>
              <div className="grid grid-cols-4 gap-2">
                {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map((btn) => (
                  <Button key={btn} onClick={() => btn === '=' ? calculate() : btn.match(/[0-9.]/) ? appendNumber(btn) : appendOperator(btn)} className={btn === '=' ? 'bg-green-500' : ''}>{btn}</Button>
                ))}
              </div>
              <Button onClick={clear} variant="destructive" className="w-full">Clear</Button>
            </CardContent>
          </Card>
          <GuidanceSection title="About Scientific Calculator">
            <p className="text-muted-foreground">
              Perform basic and advanced calculations online. Supports addition, subtraction, multiplication, and division.
              Perfect for quick calculations and mathematical operations.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
