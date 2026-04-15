import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CircleDot, Plus, X } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function EnhancedDecisionWheel() {
  const [options, setOptions] = useState<string[]>(['Option 1', 'Option 2', 'Option 3']);
  const [newOption, setNewOption] = useState('');
  const [spinning, setSpinning] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [rotation, setRotation] = useState(0);

  const addOption = () => {
    if (newOption.trim() && options.length < 12) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (index: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index));
    }
  };

  const spin = () => {
    setSpinning(true);
    setSelected(null);
    const spins = 5 + Math.random() * 5;
    const newRotation = rotation + (360 * spins) + Math.random() * 360;
    setRotation(newRotation);
    
    setTimeout(() => {
      const selectedIndex = Math.floor(Math.random() * options.length);
      setSelected(options[selectedIndex]);
      setSpinning(false);
    }, 3000);
  };

  const colors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4', '#14b8a6'];

  return (
    <>
      <SEO title="Decision Wheel - Random Choice Picker | ILoveJPG" description="Can't decide? Spin the wheel and let fate choose! Add your options and spin." keywords="decision wheel, random picker, wheel spinner, choice maker" />
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-amber-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Decision Wheel</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                <div className="flex items-center gap-3">
                  <CircleDot className="w-8 h-8" />
                  <div>
                    <CardTitle className="text-2xl">Decision Wheel</CardTitle>
                    <p className="text-sm opacity-90">Let the wheel decide!</p>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-2">
                  <Input value={newOption} onChange={(e) => setNewOption(e.target.value)} placeholder="Add new option..." onKeyPress={(e) => e.key === 'Enter' && addOption()} />
                  <Button onClick={addOption} disabled={options.length >= 12}><Plus className="h-4 w-4" /></Button>
                </div>
                
                <div className="space-y-2">
                  {options.map((opt, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div className="w-4 h-4 rounded-full" style={{backgroundColor: colors[idx % colors.length]}} />
                      <div className="flex-1">{opt}</div>
                      {options.length > 2 && (
                        <button onClick={() => removeOption(idx)} className="text-red-500 hover:text-red-700">
                          <X className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <Button onClick={spin} disabled={spinning} className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white h-14 text-lg">
                  {spinning ? 'Spinning...' : 'Spin the Wheel!'}
                </Button>

                {selected && (
                  <div className="bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 p-6 rounded-xl border-2 border-orange-300 dark:border-orange-700 text-center">
                    <div className="text-4xl mb-2">🎯</div>
                    <div className="text-xl font-bold text-gray-800 dark:text-gray-100">{selected}</div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="shadow-lg">
              <CardContent className="p-6 flex items-center justify-center min-h-[600px]">
                <div className="relative w-96 h-96">
                  <svg className="w-full h-full" style={{transform: `rotate(${rotation}deg)`, transition: spinning ? 'transform 3s cubic-bezier(0.17, 0.67, 0.12, 0.99)' : 'none'}}>
                    {options.map((_, idx) => {
                      const angle = (360 / options.length) * idx;
                      const nextAngle = (360 / options.length) * (idx + 1);
                      return (
                        <path key={idx} d={`M 200 200 L ${200 + 180 * Math.cos((angle * Math.PI) / 180)} ${200 + 180 * Math.sin((angle * Math.PI) / 180)} A 180 180 0 0 1 ${200 + 180 * Math.cos((nextAngle * Math.PI) / 180)} ${200 + 180 * Math.sin((nextAngle * Math.PI) / 180)} Z`} fill={colors[idx % colors.length]} stroke="white" strokeWidth="3" />
                      );
                    })}
                    <circle cx="200" cy="200" r="30" fill="white" stroke="#333" strokeWidth="4" />
                  </svg>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
                    <div className="w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-t-[40px] border-t-red-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <GuidanceSection title="How to Use">
            <div className="space-y-2">
              <p>• Add your options (2-12 items)</p>
              <p>• Click "Spin the Wheel"</p>
              <p>• Wait for the result!</p>
              <p>• Perfect for making tough decisions</p>
            </div>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
