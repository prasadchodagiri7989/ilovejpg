import React, { useState, useEffect, useRef } from "react";
import { Mic, StopCircle, Save, Copy, RotateCcw, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


interface SpeechRecognitionConstructor {
  new (): SpeechRecognition;
}

interface SpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: ((event: any) => void) | null;
  onerror: ((event: any) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition?: SpeechRecognitionConstructor;
    webkitSpeechRecognition?: SpeechRecognitionConstructor;
  }
}

export const SpeechToText = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [language, setLanguage] = useState("en-US");
  const [autoPunctuation, setAutoPunctuation] = useState(true);
  const [interimResults, setInterimResults] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setPermissionError("Speech recognition is not supported in your browser. Try Chrome, Edge, or Safari.");
      return;
    }
    
    checkMicrophonePermission();
    
    return () => {
      stopRecording();
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);
  
  const checkMicrophonePermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      stream.getTracks().forEach(track => track.stop());
      
      setPermissionGranted(true);
      setPermissionError(null);
    } catch (error) {
      console.error('Microphone permission error:', error);
      setPermissionGranted(false);
      setPermissionError("Microphone access denied. Please allow microphone access in your browser settings.");
    }
  };
  
  const startRecording = () => {
    if (!permissionGranted) {
      toast({
        title: "Permission required",
        description: "Please allow microphone access to use speech recognition",
        variant: "destructive",
      });
      return;
    }
    
    try {
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      
      if (!SpeechRecognitionAPI) {
        throw new Error("Speech recognition not supported");
      }
      
      const recognition = new SpeechRecognitionAPI();
      
      recognition.lang = language;
      recognition.continuous = true;
      recognition.interimResults = interimResults;
      
      let finalTranscript = transcript;
      
      recognition.onresult = (event: any) => {
        let interimTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const text = result[0].transcript;
          
          if (result.isFinal) {
            finalTranscript += text + ' ';
          } else {
            interimTranscript += text;
          }
        }
        
        if (autoPunctuation && finalTranscript) {
          finalTranscript = applyAutoPunctuation(finalTranscript);
        }
        
        setTranscript(finalTranscript + (interimTranscript ? ` (${interimTranscript})` : ''));
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        
        if (event.error === 'not-allowed') {
          setPermissionError("Microphone access denied. Please allow microphone access in your browser settings.");
          setPermissionGranted(false);
        }
        
        stopRecording();
        
        toast({
          title: "Speech recognition error",
          description: `Error: ${event.error}. Please try again.`,
          variant: "destructive",
        });
      };
      
      recognition.onend = () => {
        if (isRecording) {
          recognition.start();
        } else {
          setIsRecording(false);
        }
      };
      
      recognition.start();
      recognitionRef.current = recognition;
      setIsRecording(true);
      
      setRecordingTime(0);
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Speech recognition started",
        description: "Start speaking to convert your speech to text",
      });
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      
      toast({
        title: "Failed to start",
        description: "Could not start speech recognition. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setTranscript(transcript.replace(/\s?\(.*?\)$/, ''));
    
    if (isRecording) {
      toast({
        title: "Speech recognition stopped",
        description: "Your speech has been converted to text",
      });
    }
  };
  
  const resetTranscript = () => {
    setTranscript("");
    
    toast({
      title: "Transcript cleared",
      description: "The transcript has been cleared",
    });
  };
  
  const copyToClipboard = () => {
    if (!transcript) {
      toast({
        title: "Nothing to copy",
        description: "Record some speech first",
        variant: "destructive",
      });
      return;
    }
    
    navigator.clipboard.writeText(transcript.replace(/\s?\(.*?\)$/, ''));
    
    toast({
      title: "Copied to clipboard",
      description: "The transcript has been copied to your clipboard",
    });
  };
  
  const downloadTranscript = () => {
    if (!transcript) {
      toast({
        title: "Nothing to download",
        description: "Record some speech first",
        variant: "destructive",
      });
      return;
    }
    
    const cleanTranscript = transcript.replace(/\s?\(.*?\)$/, '');
    const blob = new Blob([cleanTranscript], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `transcript-${new Date().toISOString().slice(0, 10)}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your transcript is being downloaded",
    });
  };
  
  const applyAutoPunctuation = (text: string) => {
    text = text.trim();
    if (text.length > 0) {
      text = text.charAt(0).toUpperCase() + text.slice(1);
    }
    
    const pausePatterns = [
      /\b(but|and|or|so|because|however|therefore)\s+/gi,
      /\b(i mean|you know|actually|basically|honestly|literally)\s+/gi
    ];
    
    pausePatterns.forEach(pattern => {
      text = text.replace(pattern, (match) => {
        if (match.charAt(0).match(/[a-z]/i)) {
          return '. ' + match.charAt(0).toUpperCase() + match.slice(1);
        }
        return match;
      });
    });
    
    if (text.length > 0 && !text.endsWith('.') && !text.endsWith('!') && !text.endsWith('?')) {
      text += '.';
    }
    
    return text;
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
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
                       <BreadcrumbPage>Speech to Text</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Mic className="mr-2 text-primary" size={24} />
            <CardTitle>Speech to Text</CardTitle>
          </div>
          <CardDescription>
            Convert your speech into written text
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          {permissionError ? (
            <div className="p-6 text-center">
              <Mic className="mx-auto mb-4 text-muted-foreground" size={48} />
              <h3 className="text-lg font-medium mb-2">Microphone Access Required</h3>
              <p className="text-muted-foreground mb-4">{permissionError}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex flex-col">
                <div className="relative">
                  <Textarea
                    placeholder="Your speech will appear here..."
                    value={transcript}
                    onChange={(e) => setTranscript(e.target.value)}
                    className="min-h-[200px] font-sans text-base resize-y"
                  />
                  {isRecording && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
                      <span className="h-2 w-2 bg-white rounded-full"></span>
                      {formatTime(recordingTime)}
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap justify-between mt-2">
                  <div className="text-sm text-muted-foreground">
                    {transcript ? 
                      `${transcript.split(/\s+/).filter(Boolean).length} words` : 
                      "Start recording to convert speech to text"
                    }
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage} disabled={isRecording}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en-US">English (US)</SelectItem>
                      <SelectItem value="en-GB">English (UK)</SelectItem>
                      <SelectItem value="es-ES">Spanish</SelectItem>
                      <SelectItem value="fr-FR">French</SelectItem>
                      <SelectItem value="de-DE">German</SelectItem>
                      <SelectItem value="it-IT">Italian</SelectItem>
                      <SelectItem value="pt-BR">Portuguese</SelectItem>
                      <SelectItem value="zh-CN">Chinese (Simplified)</SelectItem>
                      <SelectItem value="ja-JP">Japanese</SelectItem>
                      <SelectItem value="ko-KR">Korean</SelectItem>
                      <SelectItem value="ru-RU">Russian</SelectItem>
                      <SelectItem value="hi-IN">Hindi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="auto-punctuation" className="cursor-pointer">Auto-punctuation</Label>
                    <Switch
                      id="auto-punctuation"
                      checked={autoPunctuation}
                      onCheckedChange={setAutoPunctuation}
                      disabled={isRecording}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="interim-results" className="cursor-pointer">Show interim results</Label>
                    <Switch
                      id="interim-results"
                      checked={interimResults}
                      onCheckedChange={setInterimResults}
                      disabled={isRecording}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {!isRecording ? (
                  <Button
                    onClick={startRecording}
                    className="flex items-center gap-2"
                  >
                    <Mic size={16} />
                    Start Recording
                  </Button>
                ) : (
                  <Button
                    onClick={stopRecording}
                    variant="destructive"
                    className="flex items-center gap-2"
                  >
                    <StopCircle size={16} />
                    Stop Recording
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={resetTranscript}
                  className="flex items-center gap-2"
                  disabled={!transcript || isRecording}
                >
                  <RotateCcw size={16} />
                  Clear
                </Button>
                
                <Button
                  variant="outline"
                  onClick={copyToClipboard}
                  className="flex items-center gap-2"
                  disabled={!transcript || isRecording}
                >
                  <Copy size={16} />
                  Copy
                </Button>
                
                <Button
                  variant="outline"
                  onClick={downloadTranscript}
                  className="flex items-center gap-2"
                  disabled={!transcript || isRecording}
                >
                  <Download size={16} />
                  Download
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <h4 className="font-medium mb-1">Tips for better results:</h4>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Speak clearly and at a moderate pace</li>
                  <li>Use a good quality microphone in a quiet environment</li>
                  <li>Say punctuation marks like "period" or "comma" if needed</li>
                  <li>For longer sessions, try breaking your speech into shorter segments</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use Speech-to-Text Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Speech-to-Text Tool</h4>
      <p>The Speech-to-Text Tool allows you to convert spoken words into written text effortlessly.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Ensure your microphone is connected and working.</li>
        <li>Allow microphone access when prompted by your browser.</li>
        <li>Start speaking clearly, and your words will be transcribed in real time.</li>
        <li>Copy or save the text as needed.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Real-time speech recognition and conversion.</li>
        <li>Supports multiple languages and accents.</li>
        <li>Easy-to-use interface with instant transcription.</li>
        <li>Privacy-focused—your speech is not stored or shared.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Helps in quickly transcribing notes, interviews, and meetings.</li>
        <li>Useful for accessibility and hands-free typing.</li>
        <li>Enhances productivity by eliminating the need for manual typing.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
