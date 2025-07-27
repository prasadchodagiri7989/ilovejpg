import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  CommandDialog, 
  CommandEmpty, 
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";

type SearchResult = {
  id: string;
  title: string;
  path: string;
  description?: string;
};

const staticRoutes: SearchResult[] = [
  { id: "jpg-to-png", title: "Jpg To Png", path: "/jpg-to-png" },
  { id: "jpg-to-webp", title: "Jpg To Webp", path: "/jpg-to-webp" },
  { id: "jpg-to-bmp", title: "Jpg To Bmp", path: "/jpg-to-bmp" },
  { id: "jpg-to-gif", title: "Jpg To Gif", path: "/jpg-to-gif" },
  { id: "jpg-to-tiff", title: "Jpg To Tiff", path: "/jpg-to-tiff" },
  { id: "jpg-to-pdf", title: "Jpg To Pdf", path: "/jpg-to-pdf" },
  { id: "jpg-to-svg", title: "Jpg To Svg", path: "/jpg-to-svg" },
  { id: "jpeg-to-png", title: "Jpeg To Png", path: "/jpeg-to-png" },
  { id: "jpeg-to-webp", title: "Jpeg To Webp", path: "/jpeg-to-webp" },
  { id: "jpeg-to-bmp", title: "Jpeg To Bmp", path: "/jpeg-to-bmp" },
  { id: "jpeg-to-gif", title: "Jpeg To Gif", path: "/jpeg-to-gif" },
  { id: "jpeg-to-tiff", title: "Jpeg To Tiff", path: "/jpeg-to-tiff" },
  { id: "jpeg-to-pdf", title: "Jpeg To Pdf", path: "/jpeg-to-pdf" },
  { id: "jpeg-to-svg", title: "Jpeg To Svg", path: "/jpeg-to-svg" },
  { id: "png-to-jpg", title: "Png To Jpg", path: "/png-to-jpg" },
  { id: "png-to-webp", title: "Png To Webp", path: "/png-to-webp" },
  { id: "png-to-bmp", title: "Png To Bmp", path: "/png-to-bmp" },
  { id: "png-to-gif", title: "Png To Gif", path: "/png-to-gif" },
  { id: "png-to-tiff", title: "Png To Tiff", path: "/png-to-tiff" },
  { id: "png-to-pdf", title: "Png To Pdf", path: "/png-to-pdf" },
  { id: "png-to-svg", title: "Png To Svg", path: "/png-to-svg" },
  { id: "webp-to-jpg", title: "Webp To Jpg", path: "/webp-to-jpg" },
  { id: "webp-to-png", title: "Webp To Png", path: "/webp-to-png" },
  { id: "webp-to-gif", title: "Webp To Gif", path: "/webp-to-gif" },
  { id: "bmp-to-jpg", title: "Bmp To Jpg", path: "/bmp-to-jpg" },
  { id: "bmp-to-png", title: "Bmp To Png", path: "/bmp-to-png" },
  { id: "bmp-to-pdf", title: "Bmp To Pdf", path: "/bmp-to-pdf" },
  { id: "gif-to-jpg-frame", title: "Gif To Jpg Frame", path: "/gif-to-jpg-frame" },
  { id: "gif-to-png", title: "Gif To Png", path: "/gif-to-png" },
  { id: "gif-to-webp", title: "Gif To Webp", path: "/gif-to-webp" },
  { id: "svg-to-png", title: "Svg To Png", path: "/svg-to-png" },
  { id: "svg-to-jpg", title: "Svg To Jpg", path: "/svg-to-jpg" },
  { id: "svg-to-pdf", title: "Svg To Pdf", path: "/svg-to-pdf" },
  { id: "heic-to-jpg", title: "Heic To Jpg", path: "/heic-to-jpg" },
  { id: "heic-to-png", title: "Heic To Png", path: "/heic-to-png" },
  { id: "heic-to-webp", title: "Heic To Webp", path: "/heic-to-webp" },
  { id: "doc-to-pdf", title: "Doc To Pdf", path: "/doc-to-pdf" },
  { id: "doc-to-txt", title: "Doc To Txt", path: "/doc-to-txt" },
  { id: "doc-to-html", title: "Doc To Html", path: "/doc-to-html" },
  { id: "doc-to-jpg", title: "Doc To Jpg", path: "/doc-to-jpg" },
  { id: "docx-to-pdf", title: "Docx To Pdf", path: "/docx-to-pdf" },
  { id: "docx-to-txt", title: "Docx To Txt", path: "/docx-to-txt" },
  { id: "docx-to-html", title: "Docx To Html", path: "/docx-to-html" },
  { id: "docx-to-jpg", title: "Docx To Jpg", path: "/docx-to-jpg" },
  { id: "pdf-to-docx", title: "Pdf To Docx", path: "/pdf-to-docx" },
  { id: "pdf-to-jpg", title: "Pdf To Jpg", path: "/pdf-to-jpg" },
  { id: "pdf-to-png", title: "Pdf To Png", path: "/pdf-to-png" },
  { id: "pdf-to-txt", title: "Pdf To Txt", path: "/pdf-to-txt" },
  { id: "pdf-to-pptx", title: "Pdf To Pptx", path: "/pdf-to-pptx" },
  { id: "txt-to-pdf", title: "Txt To Pdf", path: "/txt-to-pdf" },
  { id: "txt-to-docx", title: "Txt To Docx", path: "/txt-to-docx" },
  { id: "txt-to-html", title: "Txt To Html", path: "/txt-to-html" },
  { id: "rtf-to-docx", title: "Rtf To Docx", path: "/rtf-to-docx" },
  { id: "rtf-to-pdf", title: "Rtf To Pdf", path: "/rtf-to-pdf" },
  { id: "rtf-to-txt", title: "Rtf To Txt", path: "/rtf-to-txt" },
  { id: "html-to-pdf", title: "Html To Pdf", path: "/html-to-pdf" },
  { id: "html-to-docx", title: "Html To Docx", path: "/html-to-docx" },
  { id: "html-to-txt", title: "Html To Txt", path: "/html-to-txt" },
  { id: "odt-to-pdf", title: "Odt To Pdf", path: "/odt-to-pdf" },
  { id: "odt-to-docx", title: "Odt To Docx", path: "/odt-to-docx" },
  { id: "xls-to-csv", title: "Xls To Csv", path: "/xls-to-csv" },
  { id: "xls-to-ods", title: "Xls To Ods", path: "/xls-to-ods" },
  { id: "xls-to-json", title: "Xls To Json", path: "/xls-to-json" },
  { id: "xls-to-xml", title: "Xls To Xml", path: "/xls-to-xml" },
  { id: "xlsx-to-csv", title: "Xlsx To Csv", path: "/xlsx-to-csv" },
  { id: "xlsx-to-ods", title: "Xlsx To Ods", path: "/xlsx-to-ods" },
  { id: "xlsx-to-json", title: "Xlsx To Json", path: "/xlsx-to-json" },
  { id: "xlsx-to-xml", title: "Xlsx To Xml", path: "/xlsx-to-xml" },
  { id: "csv-to-xlsx", title: "Csv To Xlsx", path: "/csv-to-xlsx" },
  { id: "csv-to-json", title: "Csv To Json", path: "/csv-to-json" },
  { id: "csv-to-xml", title: "Csv To Xml", path: "/csv-to-xml" },
  { id: "ods-to-xlsx", title: "Ods To Xlsx", path: "/ods-to-xlsx" },
  { id: "ods-to-csv", title: "Ods To Csv", path: "/ods-to-csv" },
  { id: "json-to-csv", title: "Json To Csv", path: "/json-to-csv" },
  { id: "json-to-xlsx", title: "Json To Xlsx", path: "/json-to-xlsx" },
  { id: "json-to-pdf", title: "Json To Pdf", path: "/json-to-pdf" },
  { id: "mp4-to-avi", title: "Mp4 To Avi", path: "/mp4-to-avi" },
  { id: "mp4-to-mov", title: "Mp4 To Mov", path: "/mp4-to-mov" },
  { id: "mp4-to-mkv", title: "Mp4 To Mkv", path: "/mp4-to-mkv" },
  { id: "mp4-to-webm", title: "Mp4 To Webm", path: "/mp4-to-webm" },
  { id: "mp4-to-gif", title: "Mp4 To Gif", path: "/mp4-to-gif" },
  { id: "avi-to-mp4", title: "Avi To Mp4", path: "/avi-to-mp4" },
  { id: "avi-to-mov", title: "Avi To Mov", path: "/avi-to-mov" },
  { id: "avi-to-mkv", title: "Avi To Mkv", path: "/avi-to-mkv" },
  { id: "avi-to-webm", title: "Avi To Webm", path: "/avi-to-webm" },
  { id: "mov-to-mp4", title: "Mov To Mp4", path: "/mov-to-mp4" },
  { id: "mov-to-avi", title: "Mov To Avi", path: "/mov-to-avi" },
  { id: "mov-to-webm", title: "Mov To Webm", path: "/mov-to-webm" },
  { id: "mkv-to-mp4", title: "Mkv To Mp4", path: "/mkv-to-mp4" },
  { id: "mkv-to-avi", title: "Mkv To Avi", path: "/mkv-to-avi" },
  { id: "mkv-to-mov", title: "Mkv To Mov", path: "/mkv-to-mov" },
  { id: "webm-to-mp4", title: "Webm To Mp4", path: "/webm-to-mp4" },
  { id: "webm-to-avi", title: "Webm To Avi", path: "/webm-to-avi" },
  { id: "webm-to-gif", title: "Webm To Gif", path: "/webm-to-gif" },
  { id: "gif-to-mp4", title: "Gif To Mp4", path: "/gif-to-mp4" },
  { id: "gif-to-webm", title: "Gif To Webm", path: "/gif-to-webm" },
  { id: "mp3-to-wav", title: "Mp3 To Wav", path: "/mp3-to-wav" },
  { id: "mp3-to-aac", title: "Mp3 To Aac", path: "/mp3-to-aac" },
  { id: "mp3-to-flac", title: "Mp3 To Flac", path: "/mp3-to-flac" },
  { id: "mp3-to-ogg", title: "Mp3 To Ogg", path: "/mp3-to-ogg" },
  { id: "mp3-to-m4a", title: "Mp3 To M4A", path: "/mp3-to-m4a" },
  { id: "wav-to-mp3", title: "Wav To Mp3", path: "/wav-to-mp3" },
  { id: "wav-to-aac", title: "Wav To Aac", path: "/wav-to-aac" },
  { id: "wav-to-flac", title: "Wav To Flac", path: "/wav-to-flac" },
  { id: "wav-to-ogg", title: "Wav To Ogg", path: "/wav-to-ogg" },
  { id: "aac-to-mp3", title: "Aac To Mp3", path: "/aac-to-mp3" },
  { id: "aac-to-wav", title: "Aac To Wav", path: "/aac-to-wav" },
  { id: "aac-to-flac", title: "Aac To Flac", path: "/aac-to-flac" },
  { id: "flac-to-mp3", title: "Flac To Mp3", path: "/flac-to-mp3" },
  { id: "flac-to-wav", title: "Flac To Wav", path: "/flac-to-wav" },
  { id: "m4a-to-mp3", title: "M4A To Mp3", path: "/m4a-to-mp3" },
  { id: "m4a-to-wav", title: "M4A To Wav", path: "/m4a-to-wav" },
  { id: "ogg-to-mp3", title: "Ogg To Mp3", path: "/ogg-to-mp3" },
  { id: "ogg-to-wav", title: "Ogg To Wav", path: "/ogg-to-wav" },
  { id: "zip-to-rar", title: "Zip To Rar", path: "/zip-to-rar" },
  { id: "zip-to-7z", title: "Zip To 7Z", path: "/zip-to-7z" },
  { id: "zip-to-tar", title: "Zip To Tar", path: "/zip-to-tar" },
  { id: "zip-to-tar.gz", title: "Zip To Tar.Gz", path: "/zip-to-tar.gz" },
  { id: "rar-to-zip", title: "Rar To Zip", path: "/rar-to-zip" },
  { id: "rar-to-7z", title: "Rar To 7Z", path: "/rar-to-7z" },
  { id: "rar-to-tar", title: "Rar To Tar", path: "/rar-to-tar" },
  { id: "7z-to-zip", title: "7Z To Zip", path: "/7z-to-zip" },
  { id: "7z-to-rar", title: "7Z To Rar", path: "/7z-to-rar" },
  { id: "7z-to-tar", title: "7Z To Tar", path: "/7z-to-tar" },
  { id: "tar-to-zip", title: "Tar To Zip", path: "/tar-to-zip" },
  { id: "tar-to-rar", title: "Tar To Rar", path: "/tar-to-rar" },
  { id: "tar-to-7z", title: "Tar To 7Z", path: "/tar-to-7z" },
  { id: "tar.gz-to-zip", title: "Tar.Gz To Zip", path: "/tar.gz-to-zip" },
  { id: "tar.gz-to-rar", title: "Tar.Gz To Rar", path: "/tar.gz-to-rar" },
  { id: "tar.gz-to-7z", title: "Tar.Gz To 7Z", path: "/tar.gz-to-7z" },
  { id: "ai-to-pdf", title: "Ai To Pdf", path: "/ai-to-pdf" },
  { id: "ai-to-svg", title: "Ai To Svg", path: "/ai-to-svg" },
  { id: "ai-to-png", title: "Ai To Png", path: "/ai-to-png" },
  { id: "ai-to-jpg", title: "Ai To Jpg", path: "/ai-to-jpg" },
  { id: "eps-to-pdf", title: "Eps To Pdf", path: "/eps-to-pdf" },
  { id: "eps-to-svg", title: "Eps To Svg", path: "/eps-to-svg" },
  { id: "eps-to-png", title: "Eps To Png", path: "/eps-to-png" },
  { id: "eps-to-jpg", title: "Eps To Jpg", path: "/eps-to-jpg" },
  { id: "psd-to-jpg", title: "Psd To Jpg", path: "/psd-to-jpg" },
  { id: "psd-to-png", title: "Psd To Png", path: "/psd-to-png" },
  { id: "psd-to-pdf", title: "Psd To Pdf", path: "/psd-to-pdf" },
  { id: "indd-to-pdf", title: "Indd To Pdf", path: "/indd-to-pdf" },
  { id: "indd-to-jpg", title: "Indd To Jpg", path: "/indd-to-jpg" },
  { id: "figma-to-png", title: "Figma To Png", path: "/figma-to-png" },
  { id: "figma-to-svg", title: "Figma To Svg", path: "/figma-to-svg" },
  { id: "figma-to-pdf", title: "Figma To Pdf", path: "/figma-to-pdf" },
  { id: "epub-to-pdf", title: "Epub To Pdf", path: "/epub-to-pdf" },
  { id: "epub-to-mobi", title: "Epub To Mobi", path: "/epub-to-mobi" },
  { id: "epub-to-azw3", title: "Epub To Azw3", path: "/epub-to-azw3" },
  { id: "mobi-to-pdf", title: "Mobi To Pdf", path: "/mobi-to-pdf" },
  { id: "mobi-to-epub", title: "Mobi To Epub", path: "/mobi-to-epub" },
  { id: "azw3-to-pdf", title: "Azw3 To Pdf", path: "/azw3-to-pdf" },
  { id: "azw3-to-epub", title: "Azw3 To Epub", path: "/azw3-to-epub" },
  { id: "pdf-to-epub", title: "Pdf To Epub", path: "/pdf-to-epub" },
  { id: "pdf-to-mobi", title: "Pdf To Mobi", path: "/pdf-to-mobi" }
];


export const SearchBar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  useEffect(() => {
    const query = searchQuery.toLowerCase();
    const filtered = staticRoutes.filter(route =>
      route.title.toLowerCase().includes(query)
    );
    setSearchResults(filtered.slice(0, 10));
  }, [searchQuery]);

  const handleResultClick = (result: SearchResult) => {
    setOpen(false);
    navigate(result.path);
  };

  return (
    <>
      <Button 
        variant="outline" 
        className="relative h-9 w-full justify-start rounded-md text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <span className="hidden lg:inline-flex">Search tools...</span>
        <span className="inline-flex lg:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="Search tools..." 
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <CommandList>
          <CommandEmpty>No results found</CommandEmpty>
          {searchResults.length > 0 && (
            <CommandGroup heading="Results">
              {searchResults.map((result) => (
                <CommandItem
                  key={result.id}
                  onSelect={() => handleResultClick(result)}
                >
                  {result.title}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};
