import React, { useState, useRef, useEffect } from "react";
import { Music, Play, Square, Volume2, VolumeX, Waves } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


type WaveType = 'sine' | 'square' | 'sawtooth' | 'triangle';

export const ToneGenerator = () => {
  const [playing, setPlaying] = useState(false);
  const [frequency, setFrequency] = useState(440); // A4
  const [volume, setVolume] = useState(0.5);
  const [waveType, setWaveType] = useState<WaveType>('sine');
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [presets, setPresets] = useState<{ name: string; freq: number }[]>([
    { name: 'A4 - 440 Hz', freq: 440 },
    { name: 'C4 - 261.63 Hz', freq: 261.63 },
    { name: 'F4 - 349.23 Hz', freq: 349.23 },
    { name: 'G4 - 392 Hz', freq: 392 },
  ]);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);
  
  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    return audioContextRef.current;
  };

  const startTone = () => {
    try {
      const audioContext = initAudio();
      
      if (oscillatorRef.current) {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      }
      
      const oscillator = audioContext.createOscillator();
      oscillatorRef.current = oscillator;
      oscillator.type = waveType;
      oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
      
      const gainNode = audioContext.createGain();
      gainNodeRef.current = gainNode;
      
      const actualVolume = isMuted ? 0 : volume;
      gainNode.gain.setValueAtTime(actualVolume, audioContext.currentTime);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.start();
      setPlaying(true);
      
      toast({
        title: "Tone started",
        description: `Playing ${frequency} Hz ${waveType} wave`,
      });
    } catch (error) {
      console.error('Error starting tone:', error);
      
      toast({
        title: "Could not start tone",
        description: "There was an error starting the audio",
        variant: "destructive",
      });
    }
  };

  const stopTone = () => {
    if (oscillatorRef.current) {
      if (gainNodeRef.current && audioContextRef.current) {
        const now = audioContextRef.current.currentTime;
        gainNodeRef.current.gain.linearRampToValueAtTime(0, now + 0.02);
        
        setTimeout(() => {
          if (oscillatorRef.current) {
            oscillatorRef.current.stop();
            oscillatorRef.current.disconnect();
            oscillatorRef.current = null;
          }
        }, 30);
      } else {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
        oscillatorRef.current = null;
      }
    }
    
    setPlaying(false);
    
    toast({
      title: "Tone stopped",
      description: "The tone has been stopped",
    });
  };

  const toggleMute = () => {
    if (isMuted) {
      setVolume(previousVolume);
      setIsMuted(false);
      
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setValueAtTime(previousVolume, audioContextRef.current.currentTime);
      }
    } else {
      setPreviousVolume(volume);
      setIsMuted(true);
      
      if (gainNodeRef.current && audioContextRef.current) {
        gainNodeRef.current.gain.setValueAtTime(0, audioContextRef.current.currentTime);
      }
    }
  };

  const changeFrequency = (newFreq: number) => {
    setFrequency(newFreq);
    
    if (oscillatorRef.current && audioContextRef.current) {
      oscillatorRef.current.frequency.setValueAtTime(newFreq, audioContextRef.current.currentTime);
    }
  };

  const changeWaveType = (newType: WaveType) => {
    setWaveType(newType);
    
    if (oscillatorRef.current) {
      oscillatorRef.current.type = newType;
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0];
    setVolume(volumeValue);
    setIsMuted(volumeValue === 0);
    
    if (gainNodeRef.current && audioContextRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volumeValue, audioContextRef.current.currentTime);
    }
  };

  const handleFrequencyInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value >= 20 && value <= 20000) {
      changeFrequency(value);
    }
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
                       <BreadcrumbPage>Tone Generator</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Music className="mr-2 text-primary" size={24} />
            <CardTitle>Tone Generator</CardTitle>
          </div>
          <CardDescription>
            Generate audio tones at different frequencies
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
            <div className="relative flex flex-col items-center justify-center h-40 border rounded-md bg-muted/30">
              <div className="text-5xl font-mono font-bold">
                {frequency.toFixed(2)} <span className="text-2xl">Hz</span>
              </div>
              
              <div className="mt-4 flex gap-2">
                {playing ? (
                  <Button
                    onClick={stopTone}
                    variant="destructive"
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <Square size={16} />
                    Stop
                  </Button>
                ) : (
                  <Button
                    onClick={startTone}
                    size="lg"
                    className="flex items-center gap-2"
                  >
                    <Play size={16} />
                    Play Tone
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  onClick={toggleMute}
                  className="flex items-center gap-2"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  {isMuted ? 'Unmute' : 'Mute'}
                </Button>
              </div>
              
              {playing && (
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
                  <Waves 
                    size={80} 
                    className={`text-primary ${
                      waveType === 'sine' ? 'animate-pulse' : 'animate-bounce'
                    }`} 
                  />
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency (20 Hz - 20,000 Hz)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="frequency"
                      type="number"
                      min={20}
                      max={20000}
                      step={0.01}
                      value={frequency}
                      onChange={handleFrequencyInputChange}
                    />
                    <Button
                      variant="outline"
                      className="shrink-0"
                      onClick={() => changeFrequency(440)}
                    >
                      Reset
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Frequency Range</Label>
                  <Slider
                    min={20}
                    max={20000}
                    step={1}
                    value={[frequency]}
                    onValueChange={(values) => changeFrequency(values[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>20 Hz</span>
                    <span>1 kHz</span>
                    <span>20 kHz</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Presets</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {presets.map((preset) => (
                      <Button 
                        key={preset.freq} 
                        variant="outline" 
                        onClick={() => changeFrequency(preset.freq)}
                        className={frequency === preset.freq ? 'border-primary' : ''}
                      >
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Wave Type</Label>
                  <RadioGroup
                    value={waveType}
                    onValueChange={(value) => changeWaveType(value as WaveType)}
                    className="grid grid-cols-2 gap-2"
                  >
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <RadioGroupItem value="sine" id="sine" />
                      <Label htmlFor="sine" className="cursor-pointer">Sine Wave</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <RadioGroupItem value="square" id="square" />
                      <Label htmlFor="square" className="cursor-pointer">Square Wave</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <RadioGroupItem value="sawtooth" id="sawtooth" />
                      <Label htmlFor="sawtooth" className="cursor-pointer">Sawtooth Wave</Label>
                    </div>
                    <div className="flex items-center space-x-2 border rounded-md p-2">
                      <RadioGroupItem value="triangle" id="triangle" />
                      <Label htmlFor="triangle" className="cursor-pointer">Triangle Wave</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="volume-slider">Volume: {Math.round(volume * 100)}%</Label>
                  </div>
                  <Slider
                    id="volume-slider"
                    min={0}
                    max={1}
                    step={0.01}
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Common Musical Notes</Label>
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <Button variant="outline" size="sm" onClick={() => changeFrequency(261.63)}>C4</Button>
                    <Button variant="outline" size="sm" onClick={() => changeFrequency(293.66)}>D4</Button>
                    <Button variant="outline" size="sm" onClick={() => changeFrequency(329.63)}>E4</Button>
                    <Button variant="outline" size="sm" onClick={() => changeFrequency(349.23)}>F4</Button>
                    <Button variant="outline" size="sm" onClick={() => changeFrequency(392.00)}>G4</Button>
                    <Button variant="outline" size="sm" onClick={() => changeFrequency(440.00)}>A4</Button>
                    <Button variant="outline" size="sm" onClick={() => changeFrequency(493.88)}>B4</Button>
                    <Button variant="outline" size="sm" onClick={() => changeFrequency(523.25)}>C5</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Warning: Please be careful with high volume and frequencies. Start at a low volume and increase gradually to prevent hearing damage.</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Tone Generator">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Tone Generator</h4>
      <p>The Tone Generator allows you to generate and listen to audio tones at different frequencies.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Enter a frequency value (between 20 Hz and 20,000 Hz).</li>
        <li>Click "Play Tone" to hear the generated sound.</li>
        <li>Adjust the volume slider to control sound intensity.</li>
        <li>Select different wave types (Sine, Square, Sawtooth, Triangle) for various sound effects.</li>
        <li>Use preset musical notes for common frequencies.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Features</h4>
      <ul className="list-disc pl-5">
        <li>Generates tones within a wide frequency range (20 Hz - 20 kHz).</li>
        <li>Supports multiple waveforms for different sound effects.</li>
        <li>Volume control for precise sound adjustments.</li>
        <li>Preset musical notes for quick access.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>
    </div>
    </>
  );
};
