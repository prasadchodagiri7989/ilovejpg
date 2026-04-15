import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calculator, Percent } from "lucide-react";
import { GuidanceSection } from "../../components/GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { SEO } from "@/components/SEO";

export const PercentageCalculator = () => {
  const [value, setValue] = useState("");
  const [percentage, setPercentage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Percentage Calculator",
    "url": "https://ilovejpg.in/percentage-calculator",
    "description": "Free online percentage calculator. Calculate percentages, percentage increase, decrease, and more. Fast and accurate results.",
    "applicationCategory": "UtilitiesApplication",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  const calculate = () => {
    const val = parseFloat(value);
    const perc = parseFloat(percentage);
    if (!isNaN(val) && !isNaN(perc)) {
      const calculatedResult = (val * perc) / 100;
      setResult(calculatedResult);
    }
  };

  const calculateIncrease = () => {
    const val = parseFloat(value);
    const perc = parseFloat(percentage);
    if (!isNaN(val) && !isNaN(perc)) {
      const increase = (val * perc) / 100;
      setResult(val + increase);
    }
  };

  const calculateDecrease = () => {
    const val = parseFloat(value);
    const perc = parseFloat(percentage);
    if (!isNaN(val) && !isNaN(perc)) {
      const decrease = (val * perc) / 100;
      setResult(val - decrease);
    }
  };

  const clear = () => {
    setValue("");
    setPercentage("");
    setResult(null);
  };

  return (
    <>
      <SEO 
        title="Percentage Calculator - Calculate Percentages Online Free"
        description="Free online percentage calculator. Calculate percentage of a number, percentage increase, decrease, change, and more. Simple, fast, and accurate percentage calculations for everyday use."
        keywords="percentage calculator, calculate percentage, percentage increase, percentage decrease, percent of number, percentage change calculator, online percentage tool"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
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
                  <Link to="/">Calculator Tools</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Percentage Calculator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Card className="shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
              <div className="flex items-center gap-2">
                <Calculator size={24} />
                <CardTitle>Percentage Calculator</CardTitle>
              </div>
              <CardDescription className="text-green-50">
                Calculate percentages quickly and accurately
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Value</label>
                    <Input
                      type="number"
                      placeholder="Enter value (e.g., 100)"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Percentage (%)</label>
                    <Input
                      type="number"
                      placeholder="Enter percentage (e.g., 15)"
                      value={percentage}
                      onChange={(e) => setPercentage(e.target.value)}
                      className="text-lg"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Button onClick={calculate} className="gap-2">
                    <Percent size={16} />
                    Calculate Percentage
                  </Button>
                  <Button onClick={calculateIncrease} variant="secondary">
                    Add %
                  </Button>
                  <Button onClick={calculateDecrease} variant="secondary">
                    Subtract %
                  </Button>
                  <Button onClick={clear} variant="outline">
                    Clear
                  </Button>
                </div>

                {result !== null && (
                  <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <CardContent className="pt-6">
                      <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Result</p>
                        <p className="text-4xl font-bold text-green-600 dark:text-green-400">
                          {result.toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Example 1</p>
                    <p className="text-lg font-semibold mt-1">What is 20% of 150?</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">30</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Example 2</p>
                    <p className="text-lg font-semibold mt-1">100 + 15% =</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">115</p>
                  </div>
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Example 3</p>
                    <p className="text-lg font-semibold mt-1">200 - 25% =</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400 mt-2">150</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <GuidanceSection title="How to Use the Percentage Calculator">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-lg mb-2">What is a Percentage?</h3>
                <p>
                  A percentage is a way of expressing a number as a fraction of 100. The word "percent" means "per hundred". 
                  For example, 25% means 25 per 100, or 25/100, which equals 0.25.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">How to Calculate Percentages</h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium">Finding a Percentage of a Number</h4>
                    <p>To find what percent of a number is, multiply the number by the percentage and divide by 100.</p>
                    <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                      20% of 150 = (150 × 20) ÷ 100 = 30
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Adding a Percentage</h4>
                    <p>To increase a number by a percentage, add the percentage amount to the original number.</p>
                    <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                      100 + 15% = 100 + (100 × 15 ÷ 100) = 115
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium">Subtracting a Percentage</h4>
                    <p>To decrease a number by a percentage, subtract the percentage amount from the original number.</p>
                    <p className="font-mono bg-gray-100 dark:bg-gray-800 p-2 rounded mt-1">
                      200 - 25% = 200 - (200 × 25 ÷ 100) = 150
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Common Uses of Percentages</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Shopping Discounts:</strong> Calculate sale prices and savings</li>
                  <li><strong>Tips and Gratuity:</strong> Calculate restaurant tips</li>
                  <li><strong>Tax Calculations:</strong> Add sales tax or VAT to prices</li>
                  <li><strong>Interest Rates:</strong> Calculate loan interest or investment returns</li>
                  <li><strong>Statistics:</strong> Express proportions and ratios</li>
                  <li><strong>Grade Calculations:</strong> Convert scores to percentages</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">Quick Reference Table</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse border border-gray-300 dark:border-gray-700">
                    <thead>
                      <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="border border-gray-300 dark:border-gray-700 p-2">Percentage</th>
                        <th className="border border-gray-300 dark:border-gray-700 p-2">Decimal</th>
                        <th className="border border-gray-300 dark:border-gray-700 p-2">Fraction</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">10%</td>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">0.1</td>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">1/10</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">25%</td>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">0.25</td>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">1/4</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">50%</td>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">0.5</td>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">1/2</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">75%</td>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">0.75</td>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">3/4</td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">100%</td>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">1.0</td>
                        <td className="border border-gray-300 dark:border-gray-700 p-2">1/1</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
};

export default PercentageCalculator;
