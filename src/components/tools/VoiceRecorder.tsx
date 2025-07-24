import React, { useState, useEffect, useRef } from "react";
import { Mic, StopCircle, Pause, Play, Save, Trash2, Rewind, FastForward, Download } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import { Label } from "@/components/ui/label";
import { GuidanceSection } from "../GuidanceSection";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const VoiceRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlobUrl, setAudioBlobUrl] = useState<string | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [volume, setVolume] = useState(1);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkMicrophonePermission();
    
    const audio = new Audio();
    audioRef.current = audio;
    
    audio.addEventListener('timeupdate', updatePlaybackProgress);
    audio.addEventListener('ended', handlePlaybackEnded);
    audio.addEventListener('loadedmetadata', () => {
      if (audio.duration !== Infinity) {
        setDuration(audio.duration);
      }
    });
    
    return () => {
      cleanupRecording();
      cleanupPlayback();
      
      audio.removeEventListener('timeupdate', updatePlaybackProgress);
      audio.removeEventListener('ended', handlePlaybackEnded);
      
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
      }
    };
  }, []);
  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

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

  const startRecording = async () => {
    try {
      if (audioBlobUrl) {
        URL.revokeObjectURL(audioBlobUrl);
        setAudioBlobUrl(null);
        setAudioBlob(null);
      }
      setRecordingTime(0);
      audioChunksRef.current = [];
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          audioChunksRef.current.push(e.data);
        }
      };
      
      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioBlobUrl(url);
        setAudioBlob(audioBlob);
        
        if (audioRef.current) {
          audioRef.current.src = url;
          audioRef.current.load();
        }
        
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = null;
        }
      };
      
      mediaRecorder.start();
      setIsRecording(true);
      
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prevTime => prevTime + 1);
      }, 1000);
      
      toast({
        title: "Recording started",
        description: "Your voice is now being recorded",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      
      toast({
        title: "Recording failed",
        description: "Could not start recording. Please ensure microphone access is granted.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    setIsRecording(false);
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    toast({
      title: "Recording stopped",
      description: "Your recording is ready to play or download",
    });
  };

  const playRecording = () => {
    if (!audioRef.current || !audioBlobUrl) return;
    
    audioRef.current.play();
    setIsPlaying(true);
    
    updatePlaybackProgress();
  };

  const pausePlayback = () => {
    if (!audioRef.current) return;
    
    audioRef.current.pause();
    setIsPlaying(false);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const updatePlaybackProgress = () => {
    if (!audioRef.current) return;
    
    setCurrentTime(audioRef.current.currentTime);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    if (isPlaying) {
      animationFrameRef.current = requestAnimationFrame(updatePlaybackProgress);
    }
  };

  const handlePlaybackEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };

  const seek = (value: number[]) => {
    if (!audioRef.current) return;
    
    const seekTime = value[0];
    audioRef.current.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const seekBackward = () => {
    if (!audioRef.current) return;
    
    const newTime = Math.max(0, audioRef.current.currentTime - 5);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const seekForward = () => {
    if (!audioRef.current) return;
    
    const newTime = Math.min(audioRef.current.duration, audioRef.current.currentTime + 5);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const downloadRecording = () => {
    if (!audioBlob) return;
    
    const filename = `voice-recording-${new Date().toISOString().slice(0, 10)}.webm`;
    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: `Your recording is being downloaded as "${filename}"`,
    });
  };

  const deleteRecording = () => {
    if (isPlaying) {
      pausePlayback();
    }
    
    if (audioBlobUrl) {
      URL.revokeObjectURL(audioBlobUrl);
    }
    
    setAudioBlobUrl(null);
    setAudioBlob(null);
    setCurrentTime(0);
    setDuration(0);
    
    if (audioRef.current) {
      audioRef.current.src = '';
    }
    
    toast({
      title: "Recording deleted",
      description: "Your recording has been deleted",
    });
  };

  const cleanupRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    
    setIsRecording(false);
  };

  const cleanupPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    
    setIsPlaying(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
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
                       <BreadcrumbPage>Voice Recorder</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Mic className="mr-2 text-primary" size={24} />
            <CardTitle>Voice Recorder</CardTitle>
          </div>
          <CardDescription>
            Record, play, and save your voice recordings
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
              <div className="flex justify-center">
                <div className="relative w-40 h-40 rounded-full bg-muted/30 flex items-center justify-center">
                  {isRecording ? (
                    <div className="animate-pulse">
                      <Mic size={64} className="text-primary" />
                      <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                        REC {formatTime(recordingTime)}
                      </div>
                    </div>
                  ) : audioBlobUrl ? (
                    isPlaying ? (
                      <StopCircle 
                        size={64} 
                        className="text-primary cursor-pointer" 
                        onClick={pausePlayback}
                      />
                    ) : (
                      <Play 
                        size={64} 
                        className="text-primary cursor-pointer" 
                        onClick={playRecording}
                      />
                    )
                  ) : (
                    <Mic size={64} className="text-muted-foreground" />
                  )}
                </div>
              </div>
              
              <div className="flex flex-wrap justify-center gap-2">
                {!audioBlobUrl ? (
                  isRecording ? (
                    <Button
                      variant="destructive"
                      size="lg"
                      onClick={stopRecording}
                      className="flex items-center gap-2"
                    >
                      <StopCircle size={16} />
                      Stop Recording
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      onClick={startRecording}
                      className="flex items-center gap-2"
                    >
                      <Mic size={16} />
                      Start Recording
                    </Button>
                  )
                ) : (
                  <div className="w-full space-y-4">
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-muted-foreground">
                        {formatTime(currentTime)}
                      </div>
                      <div className="flex-1">
                        <Slider
                          value={[currentTime]}
                          min={0}
                          max={duration || 100}
                          step={0.1}
                          onValueChange={seek}
                        />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(duration)}
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-2">
                      <Button
                        variant="outline"
                        onClick={seekBackward}
                        disabled={!audioBlobUrl}
                        className="flex items-center gap-1"
                      >
                        <Rewind size={16} />
                        -5s
                      </Button>
                      
                      {isPlaying ? (
                        <Button
                          onClick={pausePlayback}
                          className="flex items-center gap-2"
                        >
                          <Pause size={16} />
                          Pause
                        </Button>
                      ) : (
                        <Button
                          onClick={playRecording}
                          className="flex items-center gap-2"
                        >
                          <Play size={16} />
                          Play
                        </Button>
                      )}
                      
                      <Button
                        variant="outline"
                        onClick={seekForward}
                        disabled={!audioBlobUrl}
                        className="flex items-center gap-1"
                      >
                        <FastForward size={16} />
                        +5s
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={downloadRecording}
                        className="flex items-center gap-2"
                      >
                        <Download size={16} />
                        Download
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={deleteRecording}
                        className="flex items-center gap-2"
                      >
                        <Trash2 size={16} />
                        Delete
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="volume-slider" className="text-sm">Volume</Label>
                      <Slider
                        id="volume-slider"
                        min={0}
                        max={1}
                        step={0.01}
                        value={[volume]}
                        onValueChange={(values) => setVolume(values[0])}
                      />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="text-sm text-muted-foreground">
                <h3 className="font-medium mb-1">How to use:</h3>
                <ul className="list-disc ml-5 space-y-1">
                  <li>Click "Start Recording" to begin capturing your voice</li>
                  <li>Click "Stop Recording" when you're finished</li>
                  <li>Use the playback controls to listen to your recording</li>
                  <li>Click "Download" to save your recording as an audio file</li>
                  <li>Click "Delete" to discard the recording and start over</li>
                </ul>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <GuidanceSection title="How to Use the Voice Recorder">
  <div className="space-y-4">
    <div>
      <h4 className="font-medium mb-1">Using the Voice Recorder</h4>
      <p>The Voice Recorder allows you to record, play, and save your voice recordings directly in your browser.</p>
      <p className="mt-2"><strong>How to Use:</strong></p>
      <ol className="list-decimal pl-5">
        <li>Ensure your browser has microphone access enabled.</li>
        <li>Click the "Record" button to start recording your voice.</li>
        <li>Click "Stop" to end the recording.</li>
        <li>Use the "Play" button to listen to your recorded audio.</li>
        <li>Click "Save" to download your recording for offline use.</li>
      </ol>
    </div>

    <div>
      <h4 className="font-medium mb-1">Microphone Access</h4>
      <p>Microphone access is required for recording. If access is denied:</p>
      <ul className="list-disc pl-5">
        <li>Check your browser settings to allow microphone permissions.</li>
        <li>Reload the page and grant access when prompted.</li>
        <li>Try using a different browser if issues persist.</li>
      </ul>
    </div>
  </div>
</GuidanceSection>

    </div>
    </>
  );
};
