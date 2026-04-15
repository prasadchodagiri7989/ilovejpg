import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Shield, Check, X, AlertTriangle } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb,BreadcrumbItem,BreadcrumbLink,BreadcrumbList,BreadcrumbPage,BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [strength, setStrength] = useState({ score: 0, text: '', color: '' });

  const checkStrength = (pwd: string) => {
    let score = 0;
    if (pwd.length >= 8) score++;
    if (pwd.length >= 12) score++;
    if (/[a-z]/.test(pwd)) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^a-zA-Z0-9]/.test(pwd)) score++;

    let text = '', color = '';
    if (score <= 2) { text = 'Weak'; color = 'text-red-600'; }
    else if (score <= 4) { text = 'Medium'; color = 'text-yellow-600'; }
    else { text = 'Strong'; color = 'text-green-600'; }

    setStrength({ score, text, color });
  };

  return (
    <>
      <SEO title="Password Strength Checker - Test Password Security" description="Check password strength and get security recommendations. Free password strength analyzer." keywords="password strength, password checker, password security" />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4"><BreadcrumbList><BreadcrumbItem><BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Password Strength Checker</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>
          
          <Card className="max-w-2xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
              <div className="flex items-center gap-3">
                <Shield className="w-8 h-8" />
                <div><CardTitle className="text-2xl">Password Strength Checker</CardTitle><p className="text-sm text-blue-100">Test your password security</p></div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div><label className="text-sm font-medium">Enter Password</label><Input type="password" value={password} onChange={(e) => { setPassword(e.target.value); checkStrength(e.target.value); }} placeholder="Type password to check..." className="mt-1" /></div>

              {password && (
                <div className="space-y-4">
                  <div><div className="text-sm text-gray-600 dark:text-gray-400">Password Strength</div><div className={`text-2xl font-bold ${strength.color}`}>{strength.text}</div><div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-2"><div className={`h-2 rounded-full transition-all ${strength.score <= 2 ? 'bg-red-500' : strength.score <= 4 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${(strength.score / 6) * 100}%` }}></div></div></div>
                  
                  <div className="space-y-2">
                    <div className="text-sm font-medium">Requirements:</div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">{password.length >= 8 ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}<span className="text-sm">At least 8 characters</span></div>
                      <div className="flex items-center gap-2">{/[a-z]/.test(password) ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}<span className="text-sm">Lowercase letter</span></div>
                      <div className="flex items-center gap-2">{/[A-Z]/.test(password) ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}<span className="text-sm">Uppercase letter</span></div>
                      <div className="flex items-center gap-2">{/[0-9]/.test(password) ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}<span className="text-sm">Number</span></div>
                      <div className="flex items-center gap-2">{/[^a-zA-Z0-9]/.test(password) ? <Check className="w-4 h-4 text-green-600" /> : <X className="w-4 h-4 text-red-600" />}<span className="text-sm">Special character</span></div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          <GuidanceSection title="About Password Strength">
            <p>Strong passwords protect your accounts from unauthorized access. This tool analyzes your password and provides security recommendations.</p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
