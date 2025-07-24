
import React, { useState, useRef, useEffect } from "react";
import { Camera, Copy, CameraOff, Maximize, Download, Monitor, Mic, MicOff, Volume2, VolumeX } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
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


export const WebcamTest = () => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioStream, setAudioStream] = useState<MediaStream | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [selectedMicrophone, setSelectedMicrophone] = useState<string>("");
  const [availableCameras, setAvailableCameras] = useState<MediaDeviceInfo[]>([]);
  const [availableMicrophones, setAvailableMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [speakerTesting, setSpeakerTesting] = useState(false);
  const [fullScreen, setFullScreen] = useState(false);
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const testToneRef = useRef<OscillatorNode | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Get available devices
    getMediaDevices();
    
    // Add fullscreen change listener
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    
    return () => {
      // Cleanup
      stopVideo();
      stopAudio();
      stopSpeakerTest();
      
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const getMediaDevices = async () => {
    try {
      // First request permission for video
      const tempVideoStream = await navigator.mediaDevices.getUserMedia({ video: true });
      tempVideoStream.getTracks().forEach(track => track.stop());
      
      // And for audio
      const tempAudioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      tempAudioStream.getTracks().forEach(track => track.stop());
      
      // Then enumerate all devices
      const devices = await navigator.mediaDevices.enumerateDevices();
      
      // Filter video devices
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setAvailableCameras(videoDevices);
      
      // Filter audio input devices
      const audioDevices = devices.filter(device => device.kind === 'audioinput');
      setAvailableMicrophones(audioDevices);
      
      // Set default devices
      if (videoDevices.length > 0) {
        setSelectedCamera(videoDevices[0].deviceId);
      }
      
      if (audioDevices.length > 0) {
        setSelectedMicrophone(audioDevices[0].deviceId);
      }
      
      // Start the video stream with the default device
      startVideo();
      
      if (microphoneEnabled) {
        startAudio();
      }
    } catch (error) {
      console.error('Error getting media devices:', error);
      setPermissionError("Camera or microphone access denied. Please allow access in your browser settings.");
    }
  };

  const startVideo = async () => {
    try {
      // Stop any existing stream
      stopVideo();
      
      // Request video stream with selected device
      const videoConstraints: MediaStreamConstraints = {
        video: selectedCamera ? { deviceId: { exact: selectedCamera } } : true,
        audio: false
      };
      
      const videoStream = await navigator.mediaDevices.getUserMedia(videoConstraints);
      setStream(videoStream);
      
      // Connect to video element
      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }
      
      toast({
        title: "Camera connected",
        description: "Your webcam is now active",
      });
    } catch (error) {
      console.error('Error starting video:', error);
      setPermissionError("Could not access the camera. Please check your permissions.");
      
      toast({
        title: "Camera error",
        description: "Could not access the camera. Please check your permissions.",
        variant: "destructive",
      });
    }
  };

  const stopVideo = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  const startAudio = async () => {
    try {
      // Stop any existing audio
      stopAudio();
      
      // Request audio stream with selected device
      const audioConstraints: MediaStreamConstraints = {
        audio: selectedMicrophone ? { deviceId: { exact: selectedMicrophone } } : true,
        video: false
      };
      
      const micStream = await navigator.mediaDevices.getUserMedia(audioConstraints);
      setAudioStream(micStream);
      
      // Create audio context for volume metering
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      
      // Create analyzer
      const analyser = audioContext.createAnalyser();
      analyserRef.current = analyser;
      analyser.fftSize = 256;
      
      // Connect microphone to analyzer
      const microphone = audioContext.createMediaStreamSource(micStream);
      microphone.connect(analyser);
      
      // Start monitoring volume
      startVolumeMonitoring();
      
      setMicrophoneEnabled(true);
    } catch (error) {
      console.error('Error starting audio:', error);
      
      toast({
        title: "Microphone error",
        description: "Could not access the microphone. Please check your permissions.",
        variant: "destructive",
      });
    }
  };

  const stopAudio = () => {
    if (audioStream) {
      audioStream.getTracks().forEach(track => track.stop());
      setAudioStream(null);
    }
    
    if (analyserRef.current) {
      analyserRef.current = null;
    }
    
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setAudioLevel(0);
  };

  const startVolumeMonitoring = () => {
    if (!analyserRef.current) return;
    
    const analyser = analyserRef.current;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    
    const updateVolume = () => {
      if (!analyserRef.current) return;
      
      // Get volume data
      analyser.getByteFrequencyData(dataArray);
      
      // Calculate average volume level (0-100)
      let sum = 0;
      for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
      }
      const average = sum / dataArray.length;
      const volumePercentage = (average / 255) * 100;
      
      setAudioLevel(volumePercentage);
      
      // Continue monitoring
      animationFrameRef.current = requestAnimationFrame(updateVolume);
    };
    
    updateVolume();
  };

  const toggleMicrophone = () => {
    if (microphoneEnabled) {
      stopAudio();
      setMicrophoneEnabled(false);
      
      toast({
        title: "Microphone disabled",
        description: "Your microphone has been turned off",
      });
    } else {
      startAudio();
      
      toast({
        title: "Microphone enabled",
        description: "Your microphone has been turned on",
      });
    }
  };

  const handleCameraChange = (deviceId: string) => {
    setSelectedCamera(deviceId);
    
    // Restart video with new device
    if (deviceId !== selectedCamera) {
      stopVideo();
      setTimeout(() => {
        startVideo();
      }, 300);
    }
  };

  const handleMicrophoneChange = (deviceId: string) => {
    setSelectedMicrophone(deviceId);
    
    // Restart audio with new device
    if (deviceId !== selectedMicrophone && microphoneEnabled) {
      stopAudio();
      setTimeout(() => {
        startAudio();
      }, 300);
    }
  };

  const toggleSpeakerTest = () => {
    if (speakerTesting) {
      stopSpeakerTest();
    } else {
      startSpeakerTest();
    }
  };

  const startSpeakerTest = () => {
    try {
      if (!audioContextRef.current) {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        audioContextRef.current = new AudioContext();
      }
      
      // Create oscillator
      const oscillator = audioContextRef.current.createOscillator();
      oscillator.type = 'sine';
      oscillator.frequency.setValueAtTime(440, audioContextRef.current.currentTime);
      
      oscillator.connect(audioContextRef.current.destination);
      oscillator.start();
      
      testToneRef.current = oscillator;
      setSpeakerTesting(true);
      
      toast({
        title: "Speaker test started",
        description: "You should hear a test tone if your speakers are working",
      });
    } catch (error) {
      console.error('Error testing speakers:', error);
      
      toast({
        title: "Speaker test failed",
        description: "Could not test speakers. Please try again.",
        variant: "destructive",
      });
    }
  };

  const stopSpeakerTest = () => {
    if (testToneRef.current) {
      testToneRef.current.stop();
      testToneRef.current.disconnect();
      testToneRef.current = null;
    }
    
    setSpeakerTesting(false);
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current) {
        containerRef.current.requestFullscreen();
      }
    } else {
      document.exitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    setFullScreen(!!document.fullscreenElement);
  };

  const captureScreenshot = () => {
    if (!videoRef.current) return;
    
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0);
      
      try {
        // Download image
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = `webcam-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.png`;
        link.click();
        
        toast({
          title: "Screenshot captured",
          description: "Your webcam screenshot has been downloaded",
        });
      } catch (e) {
        console.error('Error saving screenshot:', e);
        
        toast({
          title: "Screenshot failed",
          description: "Could not capture or download screenshot",
          variant: "destructive",
        });
      }
    }
  };

  // Apply video filters
  const getVideoStyle = () => {
    return {
      filter: `brightness(${brightness}%) contrast(${contrast}%)`,
    };
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
                       <BreadcrumbPage>Webcam Test</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Camera className="mr-2 text-primary" size={24} />
            <CardTitle>Webcam Test</CardTitle>
          </div>
          <CardDescription>
            Test your webcam, microphone, and speakers
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          {permissionError ? (
            <div className="p-6 text-center">
              <CameraOff className="mx-auto mb-4 text-muted-foreground" size={48} />
              <h3 className="text-lg font-medium mb-2">Permission Error</h3>
              <p className="text-muted-foreground mb-4">{permissionError}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div
                ref={containerRef}
                className={`relative ${fullScreen ? 'w-screen h-screen' : 'aspect-video w-full'} bg-black rounded-md overflow-hidden`}
              >
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain"
                  style={getVideoStyle()}
                />
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 bg-black/50 text-white rounded-full px-2 py-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleFullScreen}
                    className="h-8 w-8 p-0 text-white"
                  >
                    <Maximize size={16} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={captureScreenshot}
                    className="h-8 w-8 p-0 text-white"
                  >
                    <Copy size={16} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMicrophone}
                    className="h-8 w-8 p-0 text-white"
                  >
                    {microphoneEnabled ? <Mic size={16} /> : <MicOff size={16} />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleSpeakerTest}
                    className="h-8 w-8 p-0 text-white"
                  >
                    {speakerTesting ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-3">Camera Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="camera-select">Select Camera</Label>
                      <Select value={selectedCamera} onValueChange={handleCameraChange}>
                        <SelectTrigger id="camera-select">
                          <SelectValue placeholder="Select camera" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableCameras.map(camera => (
                            <SelectItem key={camera.deviceId} value={camera.deviceId}>
                              {camera.label || `Camera ${availableCameras.indexOf(camera) + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="brightness">Brightness: {brightness}%</Label>
                      </div>
                      <Slider
                        id="brightness"
                        min={0}
                        max={200}
                        step={5}
                        value={[brightness]}
                        onValueChange={(values) => setBrightness(values[0])}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="contrast">Contrast: {contrast}%</Label>
                      </div>
                      <Slider
                        id="contrast"
                        min={0}
                        max={200}
                        step={5}
                        value={[contrast]}
                        onValueChange={(values) => setContrast(values[0])}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Audio Settings</h3>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="microphone-select">Select Microphone</Label>
                      <Select 
                        value={selectedMicrophone} 
                        onValueChange={handleMicrophoneChange}
                        disabled={!microphoneEnabled}
                      >
                        <SelectTrigger id="microphone-select">
                          <SelectValue placeholder="Select microphone" />
                        </SelectTrigger>
                        <SelectContent>
                          {availableMicrophones.map(mic => (
                            <SelectItem key={mic.deviceId} value={mic.deviceId}>
                              {mic.label || `Microphone ${availableMicrophones.indexOf(mic) + 1}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Microphone Volume</Label>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={microphoneEnabled}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                startAudio();
                              } else {
                                stopAudio();
                                setMicrophoneEnabled(false);
                              }
                            }}
                          />
                          {microphoneEnabled ? "Enabled" : "Disabled"}
                        </div>
                      </div>
                      
                      <div className="h-4 w-full bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary transition-all duration-300"
                          style={{ width: `${audioLevel}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Speaker Test</Label>
                      <Button
                        variant={speakerTesting ? "destructive" : "outline"}
                        onClick={toggleSpeakerTest}
                        className="w-full flex items-center justify-center gap-2"
                      >
                        {speakerTesting ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        {speakerTesting ? "Stop Test Tone" : "Play Test Tone"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground">
                <p>Tip: Click the camera icon to take a screenshot, or the fullscreen icon for a larger view.</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Webcam Test">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Webcam Test</h4>
      <p>The Webcam Test allows you to check your camera, microphone, and speakers directly in your browser.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Ensure your browser has access to your camera and microphone.</li>
        <li>Click "Start Test" to begin checking your webcam.</li>
        <li>If prompted, grant permission for camera and microphone access.</li>
        <li>Check the preview window to see if your webcam is working properly.</li>
        <li>Use the microphone and speaker test options to ensure audio functionality.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Permission Issues</h4>
      <p>If you see a permission error:</p>
      <ul className="list-disc pl-5">
        <li>Go to your browser settings and allow access to the camera and microphone.</li>
        <li>Refresh the page and try again.</li>
        <li>Ensure no other applications are using the camera or microphone.</li>
        <li>Try a different browser if the issue persists.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
