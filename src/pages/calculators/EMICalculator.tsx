import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calculator, TrendingUp } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function EMICalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);

  const calculate = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 12 / 100;
    const N = parseFloat(tenure) * 12;
    
    if (P && R && N) {
      const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
      const total = emiValue * N;
      const interest = total - P;
      
      setEmi(emiValue);
      setTotalInterest(interest);
      setTotalAmount(total);
    }
  };

  return (
    <>
      <SEO title="EMI Calculator - Calculate Loan EMI Online" description="Calculate EMI for home loans, car loans, and personal loans. Free EMI calculator with interest breakdown." keywords="emi calculator, loan emi, calculate emi, home loan emi" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>EMI Calculator</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <TrendingUp className="w-8 h-8" />
                <div><CardTitle className="text-2xl">EMI Calculator</CardTitle><p className="text-sm text-indigo-100">Calculate monthly loan EMI</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-4">
                <div><label className="text-sm font-medium">Loan Amount (₹)</label><Input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="500000" className="mt-1" /></div>
                <div><label className="text-sm font-medium">Interest Rate (% per annum)</label><Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="8.5" className="mt-1" /></div>
                <div><label className="text-sm font-medium">Loan Tenure (Years)</label><Input type="number" value={tenure} onChange={(e) => setTenure(e.target.value)} placeholder="20" className="mt-1" /></div>
                <Button onClick={calculate} className="bg-gradient-to-r from-indigo-500 to-purple-500"><Calculator className="w-4 h-4 mr-2" />Calculate EMI</Button>
              </div>
              {emi > 0 && (
                <div className="grid gap-3">
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"><div className="text-sm text-gray-600 dark:text-gray-400">Monthly EMI</div><div className="text-2xl font-bold text-indigo-600">₹{emi.toFixed(2)}</div></div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><div className="text-sm text-gray-600 dark:text-gray-400">Total Interest</div><div className="text-2xl font-bold text-purple-600">₹{totalInterest.toFixed(2)}</div></div>
                  <div className="p-4 bg-pink-50 dark:bg-pink-900/20 rounded-lg"><div className="text-sm text-gray-600 dark:text-gray-400">Total Amount</div><div className="text-2xl font-bold text-pink-600">₹{totalAmount.toFixed(2)}</div></div>
                </div>
              )}
            </CardContent>
          </Card>
          <GuidanceSection title="About EMI Calculator">
            <p className="text-muted-foreground">
              Calculate your monthly loan installments (EMI) easily. Enter loan amount, interest rate, and tenure to find your monthly payment.
              Perfect for planning home loans, car loans, and personal loans.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
