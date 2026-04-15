import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tag, DollarSign } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [result, setResult] = useState({ discountAmount: 0, finalPrice: 0, saved: 0 });

  const calculate = () => {
    const p = parseFloat(price);
    const d = parseFloat(discount);
    if (p && d) {
      const discountAmount = (p * d) / 100;
      const finalPrice = p - discountAmount;
      setResult({ discountAmount, finalPrice, saved: discountAmount });
    }
  };

  return (
    <>
      <SEO title="Discount Calculator - Calculate Discounts Online" description="Calculate discounts and final prices online. Free discount calculator for shopping and sales." keywords="discount calculator, calculate discount, sale price calculator" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Discount Calculator</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <div className="flex items-center gap-3">
                <Tag className="w-8 h-8" />
                <div><CardTitle className="text-2xl">Discount Calculator</CardTitle><p className="text-sm text-red-100">Calculate sale prices and savings</p></div>
              </div>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="grid gap-4">
                <div><label className="text-sm font-medium">Original Price</label><Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="100" className="mt-1" /></div>
                <div><label className="text-sm font-medium">Discount (%)</label><Input type="number" value={discount} onChange={(e) => setDiscount(e.target.value)} placeholder="20" className="mt-1" /></div>
                <Button onClick={calculate} className="bg-gradient-to-r from-red-500 to-pink-500"><DollarSign className="w-4 h-4 mr-2" />Calculate Discount</Button>
              </div>
              {result.finalPrice > 0 && (
                <div className="grid gap-3">
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg"><div className="text-sm text-gray-600 dark:text-gray-400">Discount Amount</div><div className="text-2xl font-bold text-green-600">${result.discountAmount.toFixed(2)}</div></div>
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg"><div className="text-sm text-gray-600 dark:text-gray-400">Final Price</div><div className="text-2xl font-bold text-blue-600">${result.finalPrice.toFixed(2)}</div></div>
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg"><div className="text-sm text-gray-600 dark:text-gray-400">You Save</div><div className="text-2xl font-bold text-purple-600">${result.saved.toFixed(2)}</div></div>
                </div>
              )}
            </CardContent>
          </Card>
          <GuidanceSection title="About Discount Calculator">
            <p className="text-muted-foreground">
              Calculate discounts instantly. Enter original price and discount percentage to find savings and final price.
              Perfect for shopping, sales analysis, and business pricing.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
