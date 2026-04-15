import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Activity } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w && h) {
      const bmiValue = w / (h * h);
      setBmi(bmiValue);
      if (bmiValue < 18.5) setCategory('Underweight');
      else if (bmiValue < 25) setCategory('Normal');
      else if (bmiValue < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  return (
    <>
      <SEO title="BMI Calculator - Calculate Body Mass Index" description="Calculate your BMI (Body Mass Index) online. Free BMI calculator with health category." keywords="bmi calculator, body mass index, calculate bmi, health calculator" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>BMI Calculator</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <div className="flex items-center gap-3">
                <Activity className="w-8 h-8" />
                <div><CardTitle className="text-2xl">BMI Calculator</CardTitle><p className="text-sm text-green-100">Calculate your Body Mass Index</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-4">
                <div><label className="text-sm font-medium">Weight (kg)</label><Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className="mt-1" /></div>
                <div><label className="text-sm font-medium">Height (cm)</label><Input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="175" className="mt-1" /></div>
                <Button onClick={calculate} className="bg-gradient-to-r from-green-500 to-emerald-500"><Activity className="w-4 h-4 mr-2" />Calculate BMI</Button>
              </div>
              {bmi > 0 && (
                <div className="space-y-3">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center"><div className="text-sm text-gray-600 dark:text-gray-400">Your BMI</div><div className="text-4xl font-bold text-green-600">{bmi.toFixed(1)}</div></div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center"><div className="text-sm text-gray-600 dark:text-gray-400">Category</div><div className="text-2xl font-bold text-blue-600">{category}</div></div>
                </div>
              )}
            </CardContent>
          </Card>
          <GuidanceSection title="About BMI Calculator">
            <p className="text-muted-foreground">
              Calculate your Body Mass Index (BMI) based on height and weight. Get your BMI category and health recommendations.
              Perfect for tracking fitness and maintaining healthy weight.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
