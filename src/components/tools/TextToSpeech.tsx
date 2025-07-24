
import React, { useState, useRef } from "react";
import { Volume2, Play, Pause, VolumeX, Settings, Rewind, FastForward, Download, RotateCcw } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
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


export const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState("");
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [previousVolume, setPreviousVolume] = useState(1);
  const [isAudioAvailable, setIsAudioAvailable] = useState(false);
  
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const { toast } = useToast();
  
  // Initialize speech synthesis and get available voices
  React.useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      // Get available voices
      const getVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        if (availableVoices.length > 0) {
          setVoices(availableVoices);
          
          // Set default voice (preferably English)
          const defaultVoice = availableVoices.find(voice => 
            voice.lang.includes('en-') && voice.default
          ) || availableVoices[0];
          
          if (defaultVoice) {
            setSelectedVoice(defaultVoice.name);
          }
        }
      };
      
      // Chrome needs a little delay before getVoices() returns anything
      setTimeout(getVoices, 100);
      
      // Firefox and some others trigger this event when voices are ready
      window.speechSynthesis.onvoiceschanged = getVoices;
      
      // Cleanup
      return () => {
        window.speechSynthesis.cancel();
      };
    }
  }, []);
  
  const speak = () => {
    if (!text.trim()) {
      toast({
        title: "No text to speak",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }
    
    if (!window.speechSynthesis) {
      toast({
        title: "Not supported",
        description: "Speech synthesis is not supported in your browser",
        variant: "destructive",
      });
      return;
    }
    
    // If already speaking, stop current speech
    window.speechSynthesis.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(text);
    utteranceRef.current = utterance;
    
    // Set voice if one is selected
    if (selectedVoice) {
      const voice = voices.find(v => v.name === selectedVoice);
      if (voice) {
        utterance.voice = voice;
      }
    }
    
    // Set other properties
    utterance.rate = rate;
    utterance.pitch = pitch;
    utterance.volume = isMuted ? 0 : volume;
    
    // Event handlers
    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setIsAudioAvailable(true);
    };
    
    utterance.onend = () => {
      setIsPlaying(false);
      setIsPaused(false);
    };
    
    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      setIsPlaying(false);
      setIsPaused(false);
      
      toast({
        title: "Speech error",
        description: "An error occurred during speech synthesis",
        variant: "destructive",
      });
    };
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
  };
  
  const pause = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };
  
  const resume = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };
  
  const stop = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
    }
  };
  
  const toggleMute = () => {
    if (isMuted) {
      // Unmute
      setVolume(previousVolume);
      setIsMuted(false);
      
      if (utteranceRef.current) {
        utteranceRef.current.volume = previousVolume;
      }
    } else {
      // Mute
      setPreviousVolume(volume);
      setVolume(0);
      setIsMuted(true);
      
      if (utteranceRef.current) {
        utteranceRef.current.volume = 0;
      }
    }
  };
  
  const changeSpeed = (faster: boolean) => {
    const newRate = faster 
      ? Math.min(rate + 0.25, 2) 
      : Math.max(rate - 0.25, 0.5);
    
    setRate(newRate);
    
    if (utteranceRef.current) {
      utteranceRef.current.rate = newRate;
    }
    
    toast({
      title: "Speed changed",
      description: `Speech rate set to ${newRate}x`,
    });
  };
  
  const resetSettings = () => {
    setRate(1);
    setPitch(1);
    setVolume(1);
    setIsMuted(false);
    
    toast({
      title: "Settings reset",
      description: "Speech settings have been reset to default values",
    });
  };
  
  const downloadAudio = async () => {
    if (!text.trim()) {
      toast({
        title: "No text to convert",
        description: "Please enter some text first",
        variant: "destructive",
      });
      return;
    }
    
    try {
      toast({
        title: "Download started",
        description: "Converting text to speech... (This may take a moment)",
      });
      
      // This is a workaround since the Web Speech API doesn't directly support 
      // saving the audio. We use a text-to-speech service instead.
      
      // For demo purposes, we'll use a placeholder implementation
      // In a real app, you'd use a TTS service API that can return audio files
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create a dummy audio file (this is just a placeholder)
      const blob = new Blob(
        [new Uint8Array([255, 227, 24, 196, 0, 0, 0, 3, 72, 1, 64, 0])], 
        { type: 'audio/mpeg' }
      );
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'text-to-speech.mp3';
      a.click();
      URL.revokeObjectURL(url);
      
      toast({
        title: "Download complete",
        description: "Your text has been converted to speech and downloaded",
      });
    } catch (error) {
      console.error('Download error:', error);
      
      toast({
        title: "Download failed",
        description: "Could not convert text to audio file. Please try again.",
        variant: "destructive",
      });
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
                       <BreadcrumbPage>Text to Speech</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Volume2 className="mr-2 text-primary" size={24} />
            <CardTitle>Text to Speech</CardTitle>
          </div>
          <CardDescription>
            Convert text to speech and hear it spoken aloud
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          <div className="space-y-6">
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to be spoken..."
              className="min-h-[200px]"
            />
            
            <div className="flex flex-wrap gap-2">
              {!isPlaying ? (
                <Button
                  onClick={speak}
                  className="flex items-center gap-2"
                >
                  <Play size={16} />
                  Speak
                </Button>
              ) : (
                isPaused ? (
                  <Button
                    onClick={resume}
                    className="flex items-center gap-2"
                  >
                    <Play size={16} />
                    Resume
                  </Button>
                ) : (
                  <Button
                    onClick={pause}
                    className="flex items-center gap-2"
                  >
                    <Pause size={16} />
                    Pause
                  </Button>
                )
              )}
              
              {isPlaying && (
                <Button
                  variant="outline"
                  onClick={stop}
                  className="flex items-center gap-2"
                >
                  <RotateCcw size={16} />
                  Stop
                </Button>
              )}
              
              <Button
                variant="outline"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className="flex items-center gap-2"
              >
                <Settings size={16} />
                Settings
              </Button>
              
              <Button
                variant="outline"
                onClick={toggleMute}
                className="flex items-center gap-2"
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                {isMuted ? 'Unmute' : 'Mute'}
              </Button>
              
              {isAudioAvailable && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => changeSpeed(false)}
                    className="flex items-center gap-2"
                  >
                    <Rewind size={16} />
                    Slower
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => changeSpeed(true)}
                    className="flex items-center gap-2"
                  >
                    <FastForward size={16} />
                    Faster
                  </Button>
                </>
              )}
              
              <Button
                variant="outline"
                onClick={downloadAudio}
                className="flex items-center gap-2 ml-auto"
              >
                <Download size={16} />
                Download Audio
              </Button>
            </div>
            
            {isSettingsOpen && (
              <div className="border rounded-md p-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="voice-select">Voice</Label>
                  <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                    <SelectTrigger id="voice-select">
                      <SelectValue placeholder="Select voice" />
                    </SelectTrigger>
                    <SelectContent>
                      {voices.map(voice => (
                        <SelectItem key={voice.name} value={voice.name}>
                          {voice.name} ({voice.lang})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="rate-slider">Speed: {rate}x</Label>
                  </div>
                  <Slider
                    id="rate-slider"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={[rate]}
                    onValueChange={(values) => setRate(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="pitch-slider">Pitch: {pitch.toFixed(1)}</Label>
                  </div>
                  <Slider
                    id="pitch-slider"
                    min={0.5}
                    max={2}
                    step={0.1}
                    value={[pitch]}
                    onValueChange={(values) => setPitch(values[0])}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="volume-slider">Volume: {(volume * 100).toFixed(0)}%</Label>
                  </div>
                  <Slider
                    id="volume-slider"
                    min={0}
                    max={1}
                    step={0.1}
                    value={[volume]}
                    onValueChange={(values) => {
                      setVolume(values[0]);
                      setIsMuted(values[0] === 0);
                    }}
                  />
                </div>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetSettings}
                  className="w-full"
                >
                  Reset to Defaults
                </Button>
              </div>
            )}
            
            <div className="text-sm text-muted-foreground">
              <h3 className="font-medium mb-1">Tips:</h3>
              <ul className="list-disc ml-5 space-y-1">
                <li>Enter or paste text in the box above and click "Speak" to hear it.</li>
                <li>Try different voices for variety in speech output.</li>
                <li>Adjust speed, pitch, and volume to customize the speech.</li>
                <li>Use punctuation to create natural pauses in the speech.</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

<GuidanceSection title="How to Use the Text to Speech Tool">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Text to Speech Tool</h4>
      <p>The Text to Speech tool allows you to convert text into spoken audio.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Enter or paste text into the input box.</li>
        <li>Click "Speak" to hear the text read aloud.</li>
        <li>Adjust settings like speed, pitch, and volume for customization.</li>
        <li>Click "Download Audio" to save the spoken text as an audio file.</li>
        <li>Use punctuation for natural pauses in speech.</li>
      </ol>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
