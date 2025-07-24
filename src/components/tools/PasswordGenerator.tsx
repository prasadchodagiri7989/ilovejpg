
import React, { useState, useEffect } from "react";
import { Lock, Copy, RefreshCw, Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const PasswordGenerator = () => {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const generatePassword = () => {
    const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercase = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    
    let chars = "";
    if (useUppercase) chars += uppercase;
    if (useLowercase) chars += lowercase;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;
    
    if (chars === "") {
      toast({
        title: "No character sets selected",
        description: "Please select at least one character set",
        variant: "destructive",
      });
      return;
    }
    
    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      newPassword += chars[randomIndex];
    }
    
    setPassword(newPassword);
    setCopied(false);
    
    toast({
      title: "Password generated",
      description: `A new ${length}-character password has been created`,
    });
  };

  const copyToClipboard = () => {
    if (!password) {
      toast({
        title: "No password to copy",
        description: "Generate a password first",
        variant: "destructive",
      });
      return;
    }
    
    navigator.clipboard.writeText(password);
    setCopied(true);
    
    toast({
      title: "Copied to clipboard",
      description: "Password has been copied to your clipboard",
    });
  };

  // Generate a password on component mount
  useEffect(() => {
    generatePassword();
  }, []);

  // Calculate password strength
  const calculateStrength = () => {
    if (!password) return 0;
    
    let strength = 0;
    
    // Length contribution (up to 33% of strength)
    strength += Math.min(password.length / 20, 0.33);
    
    // Character variety contribution (up to 67% of strength)
    let charTypes = 0;
    if (/[A-Z]/.test(password)) charTypes++;
    if (/[a-z]/.test(password)) charTypes++;
    if (/[0-9]/.test(password)) charTypes++;
    if (/[^A-Za-z0-9]/.test(password)) charTypes++;
    
    strength += (charTypes / 4) * 0.67;
    
    return Math.min(strength, 1);
  };

  const getStrengthLabel = () => {
    const strength = calculateStrength();
    if (strength < 0.25) return "Weak";
    if (strength < 0.5) return "Fair";
    if (strength < 0.75) return "Good";
    return "Strong";
  };

  const getStrengthColor = () => {
    const strength = calculateStrength();
    if (strength < 0.25) return "bg-red-500";
    if (strength < 0.5) return "bg-yellow-500";
    if (strength < 0.75) return "bg-green-500";
    return "bg-green-600";
  };

  return (
        <>
                          <Breadcrumb className="mb-4">
                          <BreadcrumbList>
                            <BreadcrumbItem>
                              <BreadcrumbLink asChild>
                                <Link to="/">Home</Link>
                              </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                              <BreadcrumbPage>Password Generator</BreadcrumbPage>
                            </BreadcrumbItem>
                          </BreadcrumbList>
                        </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Lock className="mr-2 text-primary" size={24} />
            <CardTitle>Password Generator</CardTitle>
          </div>
          <CardDescription>
            Generate secure, random passwords
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
            <div className="relative">
              <Input
                value={password}
                readOnly
                className="pr-24 font-mono text-lg"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={copyToClipboard}
                className="absolute right-1 top-1/2 -translate-y-1/2 flex items-center gap-1"
              >
                {copied ? <Check size={16} /> : <Copy size={16} />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label>Password Length: {length}</Label>
              </div>
              <Slider
                value={[length]}
                min={6}
                max={30}
                step={1}
                onValueChange={(value) => setLength(value[0])}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>6</span>
                <span>18</span>
                <span>30</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Label>Character Sets</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="uppercase"
                    checked={useUppercase}
                    onCheckedChange={(checked) => setUseUppercase(checked === true)}
                  />
                  <Label htmlFor="uppercase">
                    Uppercase (A-Z)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="lowercase"
                    checked={useLowercase}
                    onCheckedChange={(checked) => setUseLowercase(checked === true)}
                  />
                  <Label htmlFor="lowercase">
                    Lowercase (a-z)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="numbers"
                    checked={useNumbers}
                    onCheckedChange={(checked) => setUseNumbers(checked === true)}
                  />
                  <Label htmlFor="numbers">
                    Numbers (0-9)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="symbols"
                    checked={useSymbols}
                    onCheckedChange={(checked) => setUseSymbols(checked === true)}
                  />
                  <Label htmlFor="symbols">
                    Symbols (!@#$%^&*)
                  </Label>
                </div>
              </div>
            </div>
            
            <div>
              <Label>Password Strength</Label>
              <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className={`h-full ${getStrengthColor()}`}
                  style={{ width: `${calculateStrength() * 100}%` }}
                />
              </div>
              <p className="text-sm mt-1">{getStrengthLabel()}</p>
            </div>
            
            <Button 
              onClick={generatePassword} 
              className="w-full flex items-center gap-2"
              size="lg"
            >
              <RefreshCw size={16} />
              Generate New Password
            </Button>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use Password Generator">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Password Generator</h4>
      <p>The Password Generator helps you create secure, random passwords with customizable settings.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Adjust the password length using the slider.</li>
        <li>Select the character sets you want to include (uppercase, lowercase, numbers, symbols).</li>
        <li>Click "Generate New Password" to create a secure password.</li>
        <li>Click "Copy" to save the password to your clipboard.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Generate strong, random passwords instantly.</li>
        <li>Customize password length and character types.</li>
        <li>Indicates password strength based on complexity.</li>
        <li>Quick copy function for easy usage.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Enhance security with randomly generated passwords.</li>
        <li>Eliminate the need for manually creating passwords.</li>
        <li>Works instantly with no installation or login required.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
