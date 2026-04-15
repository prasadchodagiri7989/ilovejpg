import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calculator, Plus, Minus } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function TimeCalculator() {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [hours2, setHours2] = useState(0);
  const [minutes2, setMinutes2] = useState(0);
  const [seconds2, setSeconds2] = useState(0);
  const [result, setResult] = useState<{ hours: number; minutes: number; seconds: number } | null>(null);
  const { toast } = useToast();

  const calculate = () => {
    const totalSeconds1 = hours * 3600 + minutes * 60 + seconds;
    const totalSeconds2 = hours2 * 3600 + minutes2 * 60 + seconds2;
    
    let resultSeconds = operation === 'add' 
      ? totalSeconds1 + totalSeconds2 
      : totalSeconds1 - totalSeconds2;

    if (resultSeconds < 0) {
      toast({
        title: "Error",
        description: "Result cannot be negative",
        variant: "destructive",
      });
      return;
    }

    const h = Math.floor(resultSeconds / 3600);
    const m = Math.floor((resultSeconds % 3600) / 60);
    const s = resultSeconds % 60;

    setResult({ hours: h, minutes: m, seconds: s });
    toast({
      title: "Calculated!",
      description: "Time calculation completed",
    });
  };

  return (
    <>
      <SEO 
        title="Time Calculator - Add & Subtract Time | ILoveJPG"
        description="Add or subtract hours, minutes, and seconds. Free online time calculator for time math operations."
        keywords="time calculator, add time, subtract time, time math"
      />
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Time Calculator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <div className="flex items-center gap-3">
                <Calculator className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Time Calculator</CardTitle>
                  <p className="text-sm opacity-90">Add or subtract time values</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hours</label>
                    <Input
                      type="number"
                      min="0"
                      value={hours}
                      onChange={(e) => setHours(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minutes</label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={minutes}
                      onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Seconds</label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={seconds}
                      onChange={(e) => setSeconds(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div className="flex justify-center">
                  <Select value={operation} onValueChange={(v) => setOperation(v as 'add' | 'subtract')}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="add">
                        <div className="flex items-center gap-2">
                          <Plus className="w-4 h-4" /> Add
                        </div>
                      </SelectItem>
                      <SelectItem value="subtract">
                        <div className="flex items-center gap-2">
                          <Minus className="w-4 h-4" /> Subtract
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hours</label>
                    <Input
                      type="number"
                      min="0"
                      value={hours2}
                      onChange={(e) => setHours2(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Minutes</label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={minutes2}
                      onChange={(e) => setMinutes2(parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Seconds</label>
                    <Input
                      type="number"
                      min="0"
                      max="59"
                      value={seconds2}
                      onChange={(e) => setSeconds2(parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>
              </div>
              
              <Button onClick={calculate} className="w-full bg-gradient-to-r from-green-500 to-teal-500">
                <Calculator className="w-4 h-4 mr-2" />
                Calculate
              </Button>
              
              {result && (
                <div className="p-6 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">Result</p>
                  <div className="text-4xl font-bold text-green-600">
                    {result.hours}h {result.minutes}m {result.seconds}s
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Time Calculator">
            <p className="text-muted-foreground">
              Add or subtract time values in hours, minutes, and seconds. Perfect for calculating work hours, project time, and time-based calculations.
              Automatically handles overflow and conversion between units.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
