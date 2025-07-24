
import React, { useState, useEffect, useRef } from "react";
import { Mic, Volume2, Volume1, VolumeX, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const MicTest = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [volumeLevel, setVolumeLevel] = useState(0);
  const [testTone, setTestTone] = useState<boolean>(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const microphoneStreamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  const testToneSourceRef = useRef<OscillatorNode | null>(null);
  const { toast } = useToast();
  
  // Check for microphone permissions on mount
  useEffect(() => {
    const checkMicrophonePermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
        // Stop all tracks to release microphone until we need it
        stream.getTracks().forEach(track => track.stop());
        
        setPermissionGranted(true);
        setPermissionError(null);
      } catch (error) {
        console.error('Microphone permission error:', error);
        setPermissionGranted(false);
        setPermissionError("Microphone access denied. Please allow microphone access in your browser settings.");
      }
    };
    
    checkMicrophonePermission();
    
    return () => cleanupAudio();
  }, []);

  const startRecording = async () => {
    if (!permissionGranted) {
      toast({
        title: "Permission required",
        description: "Please allow microphone access to test your mic",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Create AudioContext if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Get microphone stream
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      microphoneStreamRef.current = stream;
      
      // Create analyzer
      const analyzer = audioContextRef.current.createAnalyser();
      analyserRef.current = analyzer;
      analyzer.fftSize = 256;
      
      // Connect microphone to analyzer
      const microphone = audioContextRef.current.createMediaStreamSource(stream);
      microphone.connect(analyzer);
      
      // Start monitoring volume
      setIsRecording(true);
      startVolumeMonitoring();
      
      toast({
        title: "Mic test started",
        description: "Speak into your microphone to test it",
      });
    } catch (error) {
      console.error('Error starting microphone:', error);
      toast({
        title: "Mic test failed",
        description: "Could not start microphone. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    
    // Stop volume monitoring
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Stop and release microphone
    if (microphoneStreamRef.current) {
      microphoneStreamRef.current.getTracks().forEach(track => track.stop());
      microphoneStreamRef.current = null;
    }
    
    toast({
      title: "Mic test stopped",
      description: "Microphone test has been stopped",
    });
  };

  const startVolumeMonitoring = () => {
    if (!analyserRef.current) return;
    
    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    const updateVolume = () => {
      if (!isRecording || !analyser) return;
      
      // Get volume data
      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average volume level (0-100)
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      const volumePercentage = (average / 255) * 100;
      
      setVolumeLevel(volumePercentage);
      
      // Continue monitoring
      animationRef.current = requestAnimationFrame(updateVolume);
    };
    
    updateVolume();
  };

  const playTestTone = () => {
    if (testTone) {
      stopTestTone();
      return;
    }
    
    try {
      // Create AudioContext if it doesn't exist
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      
      // Create oscillator for test tone
      const oscillator = audioContextRef.current.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime); // A4 note
      
      oscillator.connect(audioContextRef.current.destination);
      oscillator.start();
      
      testToneSourceRef.current = oscillator;
      setTestTone(true);
      
      toast({
        title: "Test tone playing",
        description: "If you can hear a tone, your speakers are working",
      });
    } catch (error) {
      console.error('Error playing test tone:', error);
      toast({
        title: "Test tone failed",
        description: "Could not play test tone. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stopTestTone = () => {
    if (testToneSourceRef.current) {
      testToneSourceRef.current.stop();
      testToneSourceRef.current = null;
    }
    
    setTestTone(false);
    
    toast({
      title: "Test tone stopped",
      description: "The test tone has been stopped",
    });
  };

  const cleanupAudio = () => {
    // Stop recording if active
    if (isRecording) {
      stopRecording();
    }
    
    // Stop test tone if playing
    if (testTone) {
      stopTestTone();
    }
    
    // Close audio context
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
  };

  const getVolumeIcon = () => {
    if (volumeLevel < 1) return <VolumeX />;
    if (volumeLevel < 50) return <Volume1 />;
    return <Volume2 />;
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
                      <BreadcrumbPage>Microphone Test</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Mic className="mr-2 text-primary" size={24} />
            <CardTitle>Microphone Test</CardTitle>
          </div>
          <CardDescription>
            Test your microphone and speakers
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
              <div className="flex flex-col items-center">
                <div className={`relative w-40 h-40 rounded-full bg-muted/30 flex items-center justify-center ${isRecording ? 'border-4 border-primary/60' : ''}`}>
                  <Mic 
                    size={64} 
                    className={isRecording ? 'text-primary animate-pulse' : 'text-muted-foreground'}
                  />
                  {isRecording && (
                    <div className="absolute -bottom-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                      RECORDING
                    </div>
                  )}
                </div>
                
                {isRecording && (
                  <div className="w-full mt-6 space-y-2">
                    <div className="flex items-center">
                      <span className="mr-2">{getVolumeIcon()}</span>
                      <Progress value={volumeLevel} className="h-6" />
                      <span className="ml-2 w-12 text-right">{Math.round(volumeLevel)}%</span>
                    </div>
                    <p className="text-center text-sm">
                      {volumeLevel < 1 ? (
                        "No sound detected. Try speaking louder."
                      ) : volumeLevel < 30 ? (
                        "Low volume detected. Try speaking louder or moving closer to the mic."
                      ) : volumeLevel < 70 ? (
                        "Good volume level detected."
                      ) : (
                        "Excellent volume level detected!"
                      )}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                <Button 
                  onClick={isRecording ? stopRecording : startRecording} 
                  className="flex items-center gap-2"
                  variant={isRecording ? "destructive" : "default"}
                >
                  <Mic size={16} />
                  {isRecording ? "Stop Mic Test" : "Start Mic Test"}
                </Button>
                
                <Button 
                  onClick={playTestTone} 
                  className="flex items-center gap-2"
                  variant={testTone ? "destructive" : "outline"}
                >
                  <Volume2 size={16} />
                  {testTone ? "Stop Test Tone" : "Play Test Tone"}
                </Button>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-md">
                <h3 className="font-medium mb-2">How to test your microphone:</h3>
                <ol className="list-decimal ml-5 space-y-1 text-sm">
                  <li>Click "Start Mic Test" to begin</li>
                  <li>Speak into your microphone at a normal volume</li>
                  <li>The volume meter should respond to your voice</li>
                  <li>Click "Play Test Tone" to verify your speakers are working</li>
                  <li>Click "Stop Mic Test" when you're done</li>
                </ol>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Microphone Test Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Testing Your Microphone</h4>
      <p>The Microphone Test tool helps you check if your microphone is working properly.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Ensure your microphone is connected to your device.</li>
        <li>Allow microphone access in your browser settings.</li>
        <li>Speak into your microphone and observe the audio feedback.</li>
        <li>If no sound is detected, check your device settings and try again.</li>
      </ol>
    </div>
    
    <div>
      <h4 className="font-medium mb-1">Troubleshooting Tips</h4>
      <ul className="list-disc pl-5">
        <li>Ensure your microphone is not muted.</li>
        <li>Check if another application is using the microphone.</li>
        <li>Try restarting your browser or computer.</li>
      </ul>
    </div>

    <div>
      <h4 className="font-medium mb-1">Why Use This Tool?</h4>
      <ul className="list-disc pl-5">
        <li>Quickly verify microphone functionality.</li>
        <li>Diagnose audio input issues.</li>
        <li>Ensure clear communication for calls and recordings.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
