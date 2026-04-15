import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, useParams } from "react-router-dom";
import { ImageIcon, FileText, Video, Music, Archive, PenTool, BookOpen, ArrowRightIcon, Table } from "lucide-react";
import { 
  imageTools, 
  pdfTools, 
  spreadsheetTools, 
  videoTools, 
  audioTools, 
  archiveTools, 
  designTools, 
  ebookTools 
} from "@/data/tools-data";

interface Tool {
  label: string;
  slug: string;
  icon: any;
}

interface CategoryData {
  title: string;
  description: string;
  icon: any;
  tools: Tool[];
}

const categoryData: Record<string, CategoryData> = {
  image: {
    title: "Image Tools",
    description: "Convert JPG, PNG, GIF, SVG and more",
    icon: ImageIcon,
    tools: imageTools
  },
  pdf: {
    title: "PDF & Document Tools",
    description: "Convert PDF, DOCX, TXT, HTML and others",
    icon: FileText,
    tools: pdfTools
  },
  spreadsheet: {
    title: "Spreadsheet Tools",
    description: "Handle XLS, CSV, JSON, XML and more",
    icon: Table,
    tools: spreadsheetTools
  },
  video: {
    title: "Video Tools",
    description: "Convert MP4, MOV, AVI, WEBM formats",
    icon: Video,
    tools: videoTools
  },
  audio: {
    title: "Audio Tools",
    description: "Convert MP3, WAV, AAC, FLAC, OGG",
    icon: Music,
    tools: audioTools
  },
  archive: {
    title: "Archive Tools",
    description: "Convert ZIP, RAR, TAR, 7Z formats",
    icon: Archive,
    tools: archiveTools
  },
  design: {
    title: "Design Tools",
    description: "Convert PSD, AI, EPS, Figma formats",
    icon: PenTool,
    tools: designTools
  },
  ebook: {
    title: "Ebook Tools",
    description: "Convert EPUB, MOBI, AZW3, PDF and more",
    icon: BookOpen,
    tools: ebookTools
  }
};

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  
  if (!category || !categoryData[category]) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Category Not Found</h1>
        <p className="text-center text-muted-foreground">
          The category you're looking for doesn't exist.
        </p>
        <div className="text-center mt-8">
          <Link to="/" className="text-primary hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const data = categoryData[category];
  const Icon = data.icon;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Icon className="text-primary" size={32} />
          <h1 className="text-3xl font-bold">{data.title}</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          {data.description}
        </p>
      </div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.tools.map((tool) => (
          <Link 
            to={`/${tool.slug}`} 
            key={tool.slug} 
            className="hover:shadow-lg transition-shadow"
          >
            <Card className="h-full hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <CardTitle className="text-base font-medium flex items-center justify-between">
                  <span>{tool.label}</span>
                  <ArrowRightIcon size={16} className="text-muted-foreground" />
                </CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Link to="/" className="text-primary hover:underline">
          ← Back to all categories
        </Link>
      </div>
    </div>
  );
};

export default CategoryPage;
