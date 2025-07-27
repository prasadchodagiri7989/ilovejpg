import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ImageIcon, FileText, Video, Music, Archive, PenTool, BookOpen, ArrowRightIcon } from "lucide-react";

const toolCategories = [
  {
    title: "Image Tools",
    description: "Convert JPG, PNG, GIF, SVG and more",
    icon: ImageIcon,
    link: "/tools/image"
  },
  {
    title: "PDF & Document Tools",
    description: "Convert PDF, DOCX, TXT, HTML and others",
    icon: FileText,
    link: "/tools/pdf"
  },
  {
    title: "Spreadsheet Tools",
    description: "Handle XLS, CSV, JSON, XML and more",
    icon: FileText,
    link: "/tools/spreadsheet"
  },
  {
    title: "Video Tools",
    description: "Convert MP4, MOV, AVI, WEBM formats",
    icon: Video,
    link: "/tools/video"
  },
  {
    title: "Audio Tools",
    description: "Convert MP3, WAV, AAC, FLAC, OGG",
    icon: Music,
    link: "/tools/audio"
  },
  {
    title: "Archive Tools",
    description: "Convert ZIP, RAR, TAR, 7Z formats",
    icon: Archive,
    link: "/tools/archive"
  },
  {
    title: "Design Tools",
    description: "Convert PSD, AI, EPS, Figma formats",
    icon: PenTool,
    link: "/tools/design"
  },
  {
    title: "Ebook Tools",
    description: "Convert EPUB, MOBI, AZW3, PDF and more",
    icon: BookOpen,
    link: "/tools/ebook"
  }
];

const Index = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">All-in-One File Converter Tools</h1>
      <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        Explore our comprehensive suite of file conversion tools. From image formats to documents, audio, video, and design files — everything is just one click away.
      </p>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {toolCategories.map((tool, index) => (
          <Link to={tool.link} key={index} className="hover:shadow-lg transition-shadow">
            <Card className="h-full">
              <CardHeader className="flex items-center gap-3">
                <tool.icon className="text-primary" size={24} />
                <div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex justify-end">
                <ArrowRightIcon size={16} className="text-muted-foreground" />
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Index;
