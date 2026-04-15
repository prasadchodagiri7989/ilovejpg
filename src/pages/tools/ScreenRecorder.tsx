
import React, { useState, useRef, useEffect } from "react";
import { Film, Play, Square, Download, Monitor, Settings, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom"; // Or use `next/link` for Next.js


export const ScreenRecorder = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const [recordedVideoURL, setRecordedVideoURL] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoQuality, setVideoQuality] = useState<string>("default");
  const [recordingTime, setRecordingTime] = useState(0);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const videoPreviewRef = useRef<HTMLVideoElement | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    return () => {
      // Clean up on component unmount
      stopRecording();
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      if (recordedVideoURL) {
        URL.revokeObjectURL(recordedVideoURL);
      }
    };
  }, []);

  const startRecording = async () => {
    // Reset any previous recordings
    if (recordedVideoURL) {
      URL.revokeObjectURL(recordedVideoURL);
      setRecordedVideoURL(null);
      setRecordedBlob(null);
    }
    
    try {
      setPermissionError(null);
      
      // Request screen capture with audio if enabled
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          // Set video constraints based on selected quality
          width: { ideal: videoQuality === 'high' ? 1920 : videoQuality === 'medium' ? 1280 : 854 },
          height: { ideal: videoQuality === 'high' ? 1080 : videoQuality === 'medium' ? 720 : 480 },
          frameRate: { ideal: videoQuality === 'high' ? 30 : videoQuality === 'medium' ? 24 : 15 }
        },
        audio: audioEnabled,
      });
      
      // If audio is enabled but not captured in screen stream, try to get system audio
      let combinedStream = screenStream;
      if (audioEnabled && !screenStream.getAudioTracks().length) {
        try {
          const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
          const audioTrack = audioStream.getAudioTracks()[0];
          if (audioTrack) {
            // Combine screen video and microphone audio
            combinedStream = new MediaStream([
              ...screenStream.getVideoTracks(),
              audioTrack
            ]);
          }
        } catch (audioError) {
          console.error('Error capturing audio:', audioError);
          // Continue with just screen capture if audio fails
        }
      }
      
      streamRef.current = combinedStream;
      
      // Handle stream ending (user cancels sharing)
      screenStream.getVideoTracks()[0].onended = () => {
        stopRecording();
      };
      
      // Initialize MediaRecorder
      const options = { mimeType: 'video/webm; codecs=vp9' };
      const recorder = new MediaRecorder(combinedStream, options);
      mediaRecorderRef.current = recorder;
      
      // Set up data handling
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          chunksRef.current.push(e.data);
        }
      };
      
      // Handle recording stop
      recorder.onstop = () => {
        // Create a blob from all chunks
        const recordedBlob = new Blob(chunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedBlob(recordedBlob);
        setRecordedVideoURL(url);
        
        // Stop all tracks
        streamRef.current?.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      };
      
      // Start recording
      recorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      toast({
        title: "Recording started",
        description: "Your screen is now being recorded",
      });
    } catch (error) {
      console.error('Error starting recording:', error);
      setPermissionError("Screen capture permission denied or not supported in this browser.");
      
      toast({
        title: "Recording failed",
        description: "Failed to start screen recording. Please ensure you grant the necessary permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      
      toast({
        title: "Recording stopped",
        description: "Your screen recording has been saved",
      });
    }
  };

  const downloadRecording = () => {
    if (recordedBlob && recordedVideoURL) {
      const a = document.createElement('a');
      a.href = recordedVideoURL;
      const filename = `screen-recording-${new Date().toISOString().replace(/[:.]/g, '-')}.webm`;
      a.download = filename;
      a.click();
      
      toast({
        title: "Download started",
        description: `Your recording is being downloaded as "${filename}"`,
      });
    } else {
      toast({
        title: "No recording available",
        description: "Please record your screen first before downloading",
        variant: "destructive",
      });
    }
  };

  // Format recording time (MM:SS)
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
                       <BreadcrumbPage>Screen Recorder</BreadcrumbPage>
                        </BreadcrumbItem>
                  </BreadcrumbList>
               </Breadcrumb>
    <div className="max-w-2xl mx-auto">
      <Card className="shadow-md">
        <CardHeader className="bg-primary/5">
          <div className="flex items-center">
            <Film className="mr-2 text-primary" size={24} />
            <CardTitle>Screen Recorder</CardTitle>
          </div>
          <CardDescription>
            Record your screen with optional audio
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6 pb-4">
          {permissionError ? (
            <div className="p-6 text-center">
              <Monitor className="mx-auto mb-4 text-muted-foreground" size={48} />
              <h3 className="text-lg font-medium mb-2">Permission Error</h3>
              <p className="text-muted-foreground mb-4">{permissionError}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="aspect-video bg-black rounded-md overflow-hidden relative">
                {recordedVideoURL ? (
                  <video
                    ref={videoPreviewRef}
                    src={recordedVideoURL}
                    className="w-full h-full object-contain"
                    controls
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-white/70">
                    <Monitor size={48} className="mb-2" />
                    <p>{isRecording ? "Recording your screen..." : "Click 'Start Recording' to begin"}</p>
                    {isRecording && (
                      <div className="mt-2 flex items-center gap-2">
                        <span className="animate-pulse h-2 w-2 bg-red-500 rounded-full"></span>
                        <span className="font-mono">{formatTime(recordingTime)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="space-x-2">
                  {!isRecording && !recordedVideoURL && (
                    <Button
                      onClick={() => setShowSettings(!showSettings)}
                      variant="outline"
                      className="flex items-center gap-2"
                    >
                      <Settings size={16} />
                      {showSettings ? "Hide Settings" : "Show Settings"}
                    </Button>
                  )}
                </div>
                
                <div className="space-x-2">
                  {!isRecording ? (
                    recordedVideoURL ? (
                      <>
                        <Button
                          onClick={startRecording}
                          variant="outline"
                          className="flex items-center gap-2"
                        >
                          <Play size={16} />
                          Record Again
                        </Button>
                        <Button
                          onClick={downloadRecording}
                          className="flex items-center gap-2"
                        >
                          <Download size={16} />
                          Download Recording
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={startRecording}
                        className="flex items-center gap-2"
                      >
                        <Play size={16} />
                        Start Recording
                      </Button>
                    )
                  ) : (
                    <Button
                      onClick={stopRecording}
                      variant="destructive"
                      className="flex items-center gap-2"
                    >
                      <Square size={16} />
                      Stop Recording
                    </Button>
                  )}
                </div>
              </div>
              
              {showSettings && !isRecording && !recordedVideoURL && (
                <div className="border rounded-md p-4 space-y-4">
                  <h3 className="font-medium">Recording Settings</h3>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="audio-toggle" className="cursor-pointer">Record audio with screen</Label>
                    <Switch
                      id="audio-toggle"
                      checked={audioEnabled}
                      onCheckedChange={setAudioEnabled}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="video-quality">Video Quality</Label>
                    <Select value={videoQuality} onValueChange={setVideoQuality}>
                      <SelectTrigger id="video-quality" className="w-full">
                        <SelectValue placeholder="Select quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low (480p)</SelectItem>
                        <SelectItem value="medium">Medium (720p)</SelectItem>
                        <SelectItem value="high">High (1080p)</SelectItem>
                        <SelectItem value="default">Default</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="text-sm text-muted-foreground">
                    <p>Note: Higher quality settings require more processing power and storage space.</p>
                  </div>
                </div>
              )}
              
              <div className="text-sm text-muted-foreground">
                <h4 className="font-medium mb-1">How to use:</h4>
                <ol className="list-decimal ml-5 space-y-1">
                  <li>Click "Start Recording" and select which screen, window, or tab you want to share</li>
                  <li>If you enabled audio, also select your audio source</li>
                  <li>The recording will begin immediately after you confirm your selection</li>
                  <li>Click "Stop Recording" when you're finished</li>
                  <li>Preview your recording and click "Download Recording" to save it</li>
                </ol>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
    </>
  );
};
