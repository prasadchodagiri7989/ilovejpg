import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Youtube, Upload } from 'lucide-react';
import { SEO } from '@/components/SEO';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Link } from 'react-router-dom';
import { GuidanceSection } from '@/components/GuidanceSection';
import { useToast } from '@/hooks/use-toast';

export default function YouTubeThumbnailPreview() {
  const [title, setTitle] = useState('How to Create Amazing Content');
  const [thumbnail, setThumbnail] = useState('https://via.placeholder.com/1280x720/FF0000/ffffff?text=YouTube+Thumbnail');
  const [channel, setChannel] = useState('My Channel');
  const [views, setViews] = useState('1.2M views');
  const { toast } = useToast();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setThumbnail(e.target?.result as string);
        toast({
          title: "Uploaded!",
          description: "Thumbnail image uploaded successfully",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <SEO 
        title="YouTube Thumbnail Preview - Test Video Thumbnails | ILoveJPG"
        description="Preview how your YouTube video thumbnail will look. Test different thumbnail designs before uploading to YouTube."
        keywords="youtube thumbnail preview, thumbnail tester, youtube thumbnail, video thumbnail"
      />
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild><Link to="/">Home</Link></BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>YouTube Thumbnail Preview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <Card className="max-w-4xl mx-auto shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
              <div className="flex items-center gap-3">
                <Youtube className="w-8 h-8" />
                <div>
                  <CardTitle className="text-2xl">YouTube Thumbnail Preview</CardTitle>
                  <p className="text-sm opacity-90">Preview your video thumbnail before uploading</p>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Video Title</label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter video title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Channel Name</label>
                  <Input
                    value={channel}
                    onChange={(e) => setChannel(e.target.value)}
                    placeholder="Your channel name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Views Text</label>
                  <Input
                    value={views}
                    onChange={(e) => setViews(e.target.value)}
                    placeholder="e.g., 1.2M views"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Thumbnail Image URL</label>
                  <Input
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                  <p className="text-xs text-muted-foreground">Recommended: 1280x720 pixels (16:9 ratio)</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Or Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-gradient-to-r file:from-red-500 file:to-pink-500 file:text-white hover:file:opacity-90"
                  />
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold mb-4">Preview</h3>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  {/* YouTube-style preview */}
                  <div className="cursor-pointer group">
                    <div className="relative rounded-lg overflow-hidden mb-3">
                      <img
                        src={thumbnail}
                        alt="Thumbnail preview"
                        className="w-full aspect-video object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/1280x720/FF0000/ffffff?text=Invalid+Image';
                        }}
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                        12:34
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center text-white font-bold">
                        {channel.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold line-clamp-2 mb-1">{title}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{channel}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{views} • 2 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <GuidanceSection title="About YouTube Thumbnail Preview">
            <p className="text-muted-foreground">
              Preview how your YouTube video thumbnail will appear in search results and recommendations.
              Upload your thumbnail image or paste a URL to see exactly how it will look with your title and channel name.
            </p>
          </GuidanceSection>
        </div>
      </div>
    </>
  );
}
