import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';
import { Shield, Copy, RefreshCw } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function PasswordGenerator() {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const { toast } = useToast();

  const generatePassword = () => {
    let chars = '';
    if (useLowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
    if (useUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useNumbers) chars += '0123456789';
    if (useSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    if (!chars) {
      toast({ title: "Error", description: "Select at least one character type", variant: "destructive" });
      return;
    }

    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(result);
    toast({ title: "Success", description: "Password generated!" });
  };

  const copyPassword = () => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    toast({ title: "Copied!", description: "Password copied to clipboard" });
  };

  return (
    <>
      <SEO title="Password Generator - Generate Secure Passwords Online" description="Generate strong, random passwords with customizable options. Free secure password generator tool." keywords="password generator, random password, secure password, strong password" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Password Generator</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8" />
                <div><CardTitle className="text-2xl">Password Generator</CardTitle><p className="text-sm text-green-100">Generate secure random passwords</p></div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div><label className="text-sm font-medium">Password Length: {length}</label><Slider value={[length]} onValueChange={(v) => setLength(v[0])} min={6} max={64} step={1} className="mt-2" /></div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-2"><Checkbox checked={useUppercase} onCheckedChange={(c) => setUseUppercase(c as boolean)} id="uppercase" /><label htmlFor="uppercase" className="text-sm">Uppercase Letters (A-Z)</label></div>
                  <div className="flex items-center space-x-2"><Checkbox checked={useLowercase} onCheckedChange={(c) => setUseLowercase(c as boolean)} id="lowercase" /><label htmlFor="lowercase" className="text-sm">Lowercase Letters (a-z)</label></div>
                  <div className="flex items-center space-x-2"><Checkbox checked={useNumbers} onCheckedChange={(c) => setUseNumbers(c as boolean)} id="numbers" /><label htmlFor="numbers" className="text-sm">Numbers (0-9)</label></div>
                  <div className="flex items-center space-x-2"><Checkbox checked={useSymbols} onCheckedChange={(c) => setUseSymbols(c as boolean)} id="symbols" /><label htmlFor="symbols" className="text-sm">Symbols (!@#$%^&*)</label></div>
                </div>

                <Button onClick={generatePassword} className="bg-gradient-to-r from-green-500 to-teal-500 w-full"><RefreshCw className="w-4 h-4 mr-2" />Generate Password</Button>
              </div>

              {password && (
                <div className="space-y-3">
                  <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg border"><div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Generated Password</div><div className="text-lg font-mono font-bold break-all">{password}</div></div>
                  <Button onClick={copyPassword} variant="outline" className="w-full"><Copy className="w-4 h-4 mr-2" />Copy Password</Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Password Generator">
            <p>Generate strong, random passwords to protect your accounts. Use different passwords for each service and store them securely.</p>
            <p className="mt-2"><strong>Password Security Tips:</strong></p>
            <ul className="mt-2 list-disc pl-5">
              <li>Use at least 12-16 characters</li>
              <li>Include uppercase, lowercase, numbers, and symbols</li>
              <li>Don't reuse passwords across sites</li>
              <li>Use a password manager</li>
            </ul>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
