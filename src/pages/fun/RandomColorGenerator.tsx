import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, RefreshCw, Copy } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function RandomColorGenerator() {
  const [color, setColor] = useState('#3B82F6');
  const [history, setHistory] = useState<string[]>([]);
  const { toast } = useToast();

  const generateColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    setColor(randomColor);
    setHistory(prev => [randomColor, ...prev].slice(0, 8));
  };

  const copyColor = (colorValue: string) => {
    navigator.clipboard.writeText(colorValue);
    toast({
      title: "Copied!",
      description: `${colorValue} copied to clipboard`,
    });
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgb = hexToRgb(color);

  return (
    <>
      <SEO 
        title="Random Color Generator - Generate Random Colors | ILoveJPG"
        description="Generate random colors with HEX and RGB values. Perfect for designers and developers."
        keywords="random color generator, color picker, hex color, rgb color, color palette"
      />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Random Color Generator</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
              <div className="flex items-center gap-3">
                <Palette className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">Random Color Generator</CardTitle>
                  <p className="text-sm opacity-90">Generate random colors instantly</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div 
                className="h-64 rounded-lg shadow-lg cursor-pointer transition-all hover:scale-105"
                style={{ backgroundColor: color }}
                onClick={() => copyColor(color)}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">HEX</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold font-mono">{color}</p>
                    <Button onClick={() => copyColor(color)} variant="ghost" size="icon">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">RGB</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold font-mono">
                      {rgb ? `${rgb.r}, ${rgb.g}, ${rgb.b}` : 'N/A'}
                    </p>
                    <Button 
                      onClick={() => rgb && copyColor(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)} 
                      variant="ghost" 
                      size="icon"
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button 
                onClick={generateColor} 
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-lg py-6"
              >
                <RefreshCw className="w-5 h-5 mr-2" />
                Generate New Color
              </Button>

              {history.length > 0 && (
                <div className="space-y-3">
                  <h3 className="font-semibold">Recent Colors</h3>
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
                    {history.map((historyColor, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg cursor-pointer hover:scale-110 transition-transform shadow-md"
                        style={{ backgroundColor: historyColor }}
                        onClick={() => {
                          setColor(historyColor);
                          copyColor(historyColor);
                        }}
                        title={historyColor}
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Random Color Generator">
            <p className="text-muted-foreground">
              Generate random colors with HEX and RGB values. Perfect for web design, graphic design, and creative projects.
              Click the color to copy it, or use the copy buttons for specific formats. Recent colors are saved for quick access.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
