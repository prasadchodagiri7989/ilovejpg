import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Banknote } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');
  const [monthly, setMonthly] = useState(0);
  const [total, setTotal] = useState(0);

  const calculate = () => {
    const P = parseFloat(amount);
    const R = parseFloat(rate) / 100 / 12;
    const N = parseFloat(years) * 12;
    const pmt = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    setMonthly(pmt);
    setTotal(pmt * N);
  };

  return (
    <>
      <SEO title="Loan Calculator - Calculate Loan Payments" description="Calculate loan payments and total interest online. Free loan calculator for all types of loans." keywords="loan calculator, calculate loan, monthly payment calculator" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Loan Calculator</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <div className="flex items-center gap-3">
                <Banknote className="w-8 h-8" />
                <div><CardTitle className="text-2xl">Loan Calculator</CardTitle><p className="text-sm text-blue-100">Calculate monthly loan payments</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-4">
                <div><label>Loan Amount ($)</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="10000" /></div>
                <div><label>Interest Rate (%)</label><Input type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="5" /></div>
                <div><label>Loan Term (Years)</label><Input type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="5" /></div>
                <Button onClick={calculate} className="bg-gradient-to-r from-blue-500 to-indigo-500"><Banknote className="w-4 h-4 mr-2" />Calculate</Button>
              </div>
              {monthly > 0 && (
                <div className="grid gap-3">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><div className="text-sm">Monthly Payment</div><div className="text-2xl font-bold text-blue-600">${monthly.toFixed(2)}</div></div>
                  <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg"><div className="text-sm">Total Payment</div><div className="text-2xl font-bold text-indigo-600">${total.toFixed(2)}</div></div>
                </div>
              )}
            </CardContent>
          </Card>
          <GuidanceSection title="About Loan Calculator">
            <p className="text-muted-foreground">
              Calculate loan payments and total interest. Enter loan amount, interest rate, and tenure to plan your financing.
              Perfect for comparing loan offers and understanding total costs.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
