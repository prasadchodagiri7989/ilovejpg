import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { HardDrive, ArrowRight } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function FileSizeConverter() {
  const [value, setValue] = useState<string>('1');
  const [fromUnit, setFromUnit] = useState('MB');
  const [toUnit, setToUnit] = useState('GB');
  const [result, setResult] = useState<string>('');

  const units  = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
    TB: 1024 * 1024 * 1024 * 1024,
  };

  const convert = () => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult('Invalid input');
      return;
    }

    const bytes = numValue * units[fromUnit as keyof typeof units];
    const converted = bytes / units[toUnit as keyof typeof units];
    setResult(converted.toFixed(6));
  };

  // Auto-convert on input change
  useState(() => {
    convert();
  });

  return (
    <>
      <SEO 
        title="File Size Converter - Convert Bytes, KB, MB, GB, TB | ILoveJPG"
        description="Convert file sizes between bytes, kilobytes, megabytes, gigabytes, and terabytes. Fast and accurate file size conversion."
        keywords="file size converter, bytes to mb, mb to gb, kb converter, file size calculator"
      />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>File Size Converter</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <div className="flex items-center gap-3">
                <HardDrive className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">File Size Converter</CardTitle>
                  <p className="text-sm opacity-90">Convert between different file size units</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Value</label>
                  <Input
                    type="number"
                    value={value}
                    onChange={(e) => {
                      setValue(e.target.value);
                      convert();
                    }}
                    placeholder="Enter value"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">From</label>
                  <Select value={fromUnit} onValueChange={(val) => {
                    setFromUnit(val);
                    convert();
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B">Bytes (B)</SelectItem>
                      <SelectItem value="KB">Kilobytes (KB)</SelectItem>
                      <SelectItem value="MB">Megabytes (MB)</SelectItem>
                      <SelectItem value="GB">Gigabytes (GB)</SelectItem>
                      <SelectItem value="TB">Terabytes (TB)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">To</label>
                  <Select value={toUnit} onValueChange={(val) => {
                    setToUnit(val);
                    convert();
                  }}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="B">Bytes (B)</SelectItem>
                      <SelectItem value="KB">Kilobytes (KB)</SelectItem>
                      <SelectItem value="MB">Megabytes (MB)</SelectItem>
                      <SelectItem value="GB">Gigabytes (GB)</SelectItem>
                      <SelectItem value="TB">Terabytes (TB)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex items-center justify-center py-4">
                <ArrowRight className="w-6 h-6 text-muted-foreground" />
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground mb-2">Result</p>
                <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                  {result ? `${result} ${toUnit}` : '0 ' + toUnit}
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 pt-4">
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
                  <p className="text-xs text-muted-foreground">Bytes</p>
                  <p className="font-semibold">{(parseFloat(value) * units[fromUnit as keyof typeof units]).toFixed(0)}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
                  <p className="text-xs text-muted-foreground">KB</p>
                  <p className="font-semibold">{((parseFloat(value) * units[fromUnit as keyof typeof units]) / units.KB).toFixed(2)}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
                  <p className="text-xs text-muted-foreground">MB</p>
                  <p className="font-semibold">{((parseFloat(value) * units[fromUnit as keyof typeof units]) / units.MB).toFixed(2)}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
                  <p className="text-xs text-muted-foreground">GB</p>
                  <p className="font-semibold">{((parseFloat(value) * units[fromUnit as keyof typeof units]) / units.GB).toFixed(4)}</p>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded text-center">
                  <p className="text-xs text-muted-foreground">TB</p>
                  <p className="font-semibold">{((parseFloat(value) * units[fromUnit as keyof typeof units]) / units.TB).toFixed(6)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About File Size Converter">
            <p className="text-muted-foreground">
              Convert file sizes between bytes, kilobytes (KB), megabytes (MB), gigabytes (GB), and terabytes (TB).
              Perfect for understanding storage requirements and file sizes. Conversion happens automatically as you type.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
