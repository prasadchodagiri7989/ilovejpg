import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Receipt } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function GSTCalculator() {
  const [amount, setAmount] = useState('');
  const [gstRate, setGstRate] = useState('18');
  const [result, setResult] = useState({ gst: 0, total: 0 });

  const calculate = () => {
    const amt = parseFloat(amount);
    const rate = parseFloat(gstRate);
    if (amt && rate) {
      const gst = (amt * rate) / 100;
      setResult({ gst, total: amt + gst });
    }
  };

  return (
    <>
      <SEO title="GST Calculator - Calculate GST Online India" description="Calculate GST (Goods and Services Tax) online for India. Free GST calculator with all tax rates." keywords="gst calculator, calculate gst, gst india, tax calculator" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>GST Calculator</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
              <div className="flex items-center gap-3">
                <Receipt className="w-8 h-8" />
                <div><CardTitle className="text-2xl">GST Calculator</CardTitle><p className="text-sm text-orange-100">Calculate GST for India</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-4">
                <div><label className="text-sm font-medium">Base Amount (₹)</label><Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="1000" className="mt-1" /></div>
                <div><label className="text-sm font-medium">GST Rate</label><Select value={gstRate} onValueChange={setGstRate}><SelectTrigger className="mt-1"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="5">5%</SelectItem><SelectItem value="12">12%</SelectItem><SelectItem value="18">18%</SelectItem><SelectItem value="28">28%</SelectItem></SelectContent></Select></div>
                <Button onClick={calculate} className="bg-gradient-to-r from-orange-500 to-red-500"><Receipt className="w-4 h-4 mr-2" />Calculate GST</Button>
              </div>
              {result.total > 0 && (
                <div className="grid gap-3">
                  <div className="p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg"><div className="text-sm text-gray-600 dark:text-gray-400">GST Amount</div><div className="text-2xl font-bold text-orange-600">₹{result.gst.toFixed(2)}</div></div>
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg"><div className="text-sm text-gray-600 dark:text-gray-400">Total Amount (incl. GST)</div><div className="text-2xl font-bold text-red-600">₹{result.total.toFixed(2)}</div></div>
                </div>
              )}
            </CardContent>
          </Card>
          <GuidanceSection title="About GST Calculator">
            <p className="text-muted-foreground">
              Calculate GST (Goods and Services Tax) for India. Enter base amount and GST rate to find total amount with tax.
              Supports all GST rates: 5%, 12%, 18%, and 28%.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
