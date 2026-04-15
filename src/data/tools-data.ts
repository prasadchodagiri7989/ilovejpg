import { 
  ImageIcon, 
  FileText, 
  Table, 
  Video, 
  Music, 
  Archive, 
  PenTool, 
  BookOpen,
  Code,
  Calculator,
  RefreshCw,
  Clock,
  Shield,
  Globe,
  Share2,
  FolderOpen,
  Sparkles,
  Gamepad2,
  Users,
  Heart,
  Zap,
  Lightbulb,
  MessageSquare,
  Target
} from 'lucide-react';

export interface Tool {
  label: string;
  slug: string;
  icon: typeof ImageIcon;
  comingSoon?: boolean;
}

export const imageTools: Tool[] = [
  { label: "JPG to PNG", slug: "jpg-to-png", icon: ImageIcon },
  { label: "JPG to WEBP", slug: "jpg-to-webp", icon: ImageIcon },
  { label: "JPG to BMP", slug: "jpg-to-bmp", icon: ImageIcon },
  { label: "JPG to GIF", slug: "jpg-to-gif", icon: ImageIcon },
  { label: "JPG to TIFF", slug: "jpg-to-tiff", icon: ImageIcon },
  { label: "JPG to PDF", slug: "jpg-to-pdf", icon: ImageIcon },
  { label: "JPG to SVG", slug: "jpg-to-svg", icon: ImageIcon },
  { label: "JPEG to PNG", slug: "jpeg-to-png", icon: ImageIcon },
  { label: "JPEG to WEBP", slug: "jpeg-to-webp", icon: ImageIcon },
  { label: "JPEG to BMP", slug: "jpeg-to-bmp", icon: ImageIcon },
  { label: "JPEG to GIF", slug: "jpeg-to-gif", icon: ImageIcon },
  { label: "JPEG to TIFF", slug: "jpeg-to-tiff", icon: ImageIcon },
  { label: "JPEG to PDF", slug: "jpeg-to-pdf", icon: ImageIcon },
  { label: "JPEG to SVG", slug: "jpeg-to-svg", icon: ImageIcon },
  { label: "PNG to JPG", slug: "png-to-jpg", icon: ImageIcon },
  { label: "PNG to WEBP", slug: "png-to-webp", icon: ImageIcon },
  { label: "PNG to BMP", slug: "png-to-bmp", icon: ImageIcon },
  { label: "PNG to GIF", slug: "png-to-gif", icon: ImageIcon },
  { label: "PNG to TIFF", slug: "png-to-tiff", icon: ImageIcon },
  { label: "PNG to PDF", slug: "png-to-pdf", icon: ImageIcon },
  { label: "PNG to SVG", slug: "png-to-svg", icon: ImageIcon },
  { label: "WEBP to JPG", slug: "webp-to-jpg", icon: ImageIcon },
  { label: "WEBP to PNG", slug: "webp-to-png", icon: ImageIcon },
  { label: "WEBP to GIF", slug: "webp-to-gif", icon: ImageIcon },
  { label: "BMP to JPG", slug: "bmp-to-jpg", icon: ImageIcon },
  { label: "BMP to PNG", slug: "bmp-to-png", icon: ImageIcon },
  { label: "BMP to PDF", slug: "bmp-to-pdf", icon: ImageIcon },
  { label: "GIF to JPG (frame)", slug: "gif-to-jpg-frame", icon: ImageIcon },
  { label: "GIF to PNG", slug: "gif-to-png", icon: ImageIcon },
  { label: "GIF to WEBP", slug: "gif-to-webp", icon: ImageIcon },
  { label: "SVG to PNG", slug: "svg-to-png", icon: ImageIcon },
  { label: "SVG to JPG", slug: "svg-to-jpg", icon: ImageIcon },
  { label: "SVG to PDF", slug: "svg-to-pdf", icon: ImageIcon },
  { label: "HEIC to JPG", slug: "heic-to-jpg", icon: ImageIcon },
  { label: "HEIC to PNG", slug: "heic-to-png", icon: ImageIcon },
  { label: "HEIC to WEBP", slug: "heic-to-webp", icon: ImageIcon }
];

export const pdfTools: Tool[] = [
  { label: "DOC to PDF", slug: "doc-to-pdf", icon: FileText },
  { label: "DOC to TXT", slug: "doc-to-txt", icon: FileText },
  { label: "DOC to HTML", slug: "doc-to-html", icon: FileText },
  { label: "DOC to JPG", slug: "doc-to-jpg", icon: FileText },
  { label: "DOCX to PDF", slug: "docx-to-pdf", icon: FileText },
  { label: "DOCX to TXT", slug: "docx-to-txt", icon: FileText },
  { label: "DOCX to HTML", slug: "docx-to-html", icon: FileText },
  { label: "DOCX to JPG", slug: "docx-to-jpg", icon: FileText },
  { label: "PDF to DOCX", slug: "pdf-to-docx", icon: FileText },
  { label: "PDF to JPG", slug: "pdf-to-jpg", icon: FileText },
  { label: "PDF to PNG", slug: "pdf-to-png", icon: FileText },
  { label: "PDF to TXT", slug: "pdf-to-txt", icon: FileText },
  { label: "PDF to PPTX", slug: "pdf-to-pptx", icon: FileText },
  { label: "TXT to PDF", slug: "txt-to-pdf", icon: FileText },
  { label: "TXT to DOCX", slug: "txt-to-docx", icon: FileText },
  { label: "TXT to HTML", slug: "txt-to-html", icon: FileText },
  { label: "RTF to DOCX", slug: "rtf-to-docx", icon: FileText },
  { label: "RTF to PDF", slug: "rtf-to-pdf", icon: FileText },
  { label: "RTF to TXT", slug: "rtf-to-txt", icon: FileText },
  { label: "HTML to PDF", slug: "html-to-pdf", icon: FileText },
  { label: "HTML to DOCX", slug: "html-to-docx", icon: FileText },
  { label: "HTML to TXT", slug: "html-to-txt", icon: FileText },
  { label: "ODT to PDF", slug: "odt-to-pdf", icon: FileText },
  { label: "ODT to DOCX", slug: "odt-to-docx", icon: FileText }
];

export const spreadsheetTools: Tool[] = [
  { label: "XLS to CSV", slug: "xls-to-csv", icon: Table },
  { label: "XLS to ODS", slug: "xls-to-ods", icon: Table },
  { label: "XLS to JSON", slug: "xls-to-json", icon: Table },
  { label: "XLS to XML", slug: "xls-to-xml", icon: Table },
  { label: "XLSX to CSV", slug: "xlsx-to-csv", icon: Table },
  { label: "XLSX to ODS", slug: "xlsx-to-ods", icon: Table },
  { label: "XLSX to JSON", slug: "xlsx-to-json", icon: Table },
  { label: "XLSX to XML", slug: "xlsx-to-xml", icon: Table },
  { label: "CSV to XLSX", slug: "csv-to-xlsx", icon: Table },
  { label: "CSV to JSON", slug: "csv-to-json", icon: Table },
  { label: "CSV to XML", slug: "csv-to-xml", icon: Table },
  { label: "ODS to XLSX", slug: "ods-to-xlsx", icon: Table },
  { label: "ODS to CSV", slug: "ods-to-csv", icon: Table },
  { label: "JSON to CSV", slug: "json-to-csv", icon: Table },
  { label: "JSON to XLSX", slug: "json-to-xlsx", icon: Table },
  { label: "JSON to PDF", slug: "json-to-pdf", icon: Table },
  { label: "JSON to XML", slug: "json-to-xml", icon: Table }
];

export const videoTools: Tool[] = [
  { label: "MP4 to AVI", slug: "mp4-to-avi", icon: Video, comingSoon: true },
  { label: "MP4 to MOV", slug: "mp4-to-mov", icon: Video, comingSoon: true },
  { label: "MP4 to MKV", slug: "mp4-to-mkv", icon: Video, comingSoon: true },
  { label: "MP4 to WEBM", slug: "mp4-to-webm", icon: Video, comingSoon: true },
  { label: "MP4 to GIF", slug: "mp4-to-gif", icon: Video, comingSoon: true },
  { label: "AVI to MP4", slug: "avi-to-mp4", icon: Video, comingSoon: true },
  { label: "AVI to MOV", slug: "avi-to-mov", icon: Video, comingSoon: true },
  { label: "AVI to MKV", slug: "avi-to-mkv", icon: Video, comingSoon: true },
  { label: "AVI to WEBM", slug: "avi-to-webm", icon: Video, comingSoon: true },
  { label: "MOV to MP4", slug: "mov-to-mp4", icon: Video, comingSoon: true },
  { label: "MOV to AVI", slug: "mov-to-avi", icon: Video, comingSoon: true },
  { label: "MOV to WEBM", slug: "mov-to-webm", icon: Video, comingSoon: true },
  { label: "MKV to MP4", slug: "mkv-to-mp4", icon: Video, comingSoon: true },
  { label: "MKV to AVI", slug: "mkv-to-avi", icon: Video, comingSoon: true },
  { label: "MKV to MOV", slug: "mkv-to-mov", icon: Video, comingSoon: true },
  { label: "WEBM to MP4", slug: "webm-to-mp4", icon: Video, comingSoon: true },
  { label: "WEBM to AVI", slug: "webm-to-avi", icon: Video, comingSoon: true },
  { label: "WEBM to GIF", slug: "webm-to-gif", icon: Video, comingSoon: true },
  { label: "GIF to MP4", slug: "gif-to-mp4", icon: Video, comingSoon: true },
  { label: "GIF to WEBM", slug: "gif-to-webm", icon: Video, comingSoon: true }
];

export const audioTools: Tool[] = [
  { label: "MP3 to WAV", slug: "mp3-to-wav", icon: Music, comingSoon: true },
  { label: "MP3 to AAC", slug: "mp3-to-aac", icon: Music, comingSoon: true },
  { label: "MP3 to FLAC", slug: "mp3-to-flac", icon: Music, comingSoon: true },
  { label: "MP3 to OGG", slug: "mp3-to-ogg", icon: Music, comingSoon: true },
  { label: "MP3 to M4A", slug: "mp3-to-m4a", icon: Music, comingSoon: true },
  { label: "WAV to MP3", slug: "wav-to-mp3", icon: Music, comingSoon: true },
  { label: "WAV to AAC", slug: "wav-to-aac", icon: Music, comingSoon: true },
  { label: "WAV to FLAC", slug: "wav-to-flac", icon: Music, comingSoon: true },
  { label: "WAV to OGG", slug: "wav-to-ogg", icon: Music, comingSoon: true },
  { label: "AAC to MP3", slug: "aac-to-mp3", icon: Music, comingSoon: true },
  { label: "AAC to WAV", slug: "aac-to-wav", icon: Music, comingSoon: true },
  { label: "AAC to FLAC", slug: "aac-to-flac", icon: Music, comingSoon: true },
  { label: "FLAC to MP3", slug: "flac-to-mp3", icon: Music, comingSoon: true },
  { label: "FLAC to WAV", slug: "flac-to-wav", icon: Music, comingSoon: true },
  { label: "M4A to MP3", slug: "m4a-to-mp3", icon: Music, comingSoon: true },
  { label: "M4A to WAV", slug: "m4a-to-wav", icon: Music, comingSoon: true },
  { label: "OGG to MP3", slug: "ogg-to-mp3", icon: Music, comingSoon: true },
  { label: "OGG to WAV", slug: "ogg-to-wav", icon: Music, comingSoon: true }
];

export const archiveTools: Tool[] = [
  { label: "ZIP to RAR", slug: "zip-to-rar", icon: Archive, comingSoon: true },
  { label: "ZIP to 7Z", slug: "zip-to-7z", icon: Archive, comingSoon: true },
  { label: "ZIP to TAR", slug: "zip-to-tar", icon: Archive, comingSoon: true },
  { label: "ZIP to TAR.GZ", slug: "zip-to-tar.gz", icon: Archive, comingSoon: true },
  { label: "RAR to ZIP", slug: "rar-to-zip", icon: Archive, comingSoon: true },
  { label: "RAR to 7Z", slug: "rar-to-7z", icon: Archive, comingSoon: true },
  { label: "RAR to TAR", slug: "rar-to-tar", icon: Archive, comingSoon: true },
  { label: "7Z to ZIP", slug: "7z-to-zip", icon: Archive, comingSoon: true },
  { label: "7Z to RAR", slug: "7z-to-rar", icon: Archive, comingSoon: true },
  { label: "7Z to TAR", slug: "7z-to-tar", icon: Archive, comingSoon: true },
  { label: "TAR to ZIP", slug: "tar-to-zip", icon: Archive, comingSoon: true },
  { label: "TAR to RAR", slug: "tar-to-rar", icon: Archive, comingSoon: true },
  { label: "TAR to 7Z", slug: "tar-to-7z", icon: Archive, comingSoon: true },
  { label: "TAR.GZ to ZIP", slug: "tar.gz-to-zip", icon: Archive, comingSoon: true },
  { label: "TAR.GZ to RAR", slug: "tar.gz-to-rar", icon: Archive, comingSoon: true },
  { label: "TAR.GZ to 7Z", slug: "tar.gz-to-7z", icon: Archive, comingSoon: true }
];

export const designTools: Tool[] = [
  { label: "AI to PDF", slug: "ai-to-pdf", icon: PenTool, comingSoon: true },
  { label: "AI to SVG", slug: "ai-to-svg", icon: PenTool, comingSoon: true },
  { label: "AI to PNG", slug: "ai-to-png", icon: PenTool, comingSoon: true },
  { label: "AI to JPG", slug: "ai-to-jpg", icon: PenTool, comingSoon: true },
  { label: "EPS to PDF", slug: "eps-to-pdf", icon: PenTool, comingSoon: true },
  { label: "EPS to SVG", slug: "eps-to-svg", icon: PenTool, comingSoon: true },
  { label: "EPS to PNG", slug: "eps-to-png", icon: PenTool, comingSoon: true },
  { label: "EPS to JPG", slug: "eps-to-jpg", icon: PenTool, comingSoon: true },
  { label: "PSD to JPG", slug: "psd-to-jpg", icon: PenTool, comingSoon: true },
  { label: "PSD to PNG", slug: "psd-to-png", icon: PenTool, comingSoon: true },
  { label: "PSD to PDF", slug: "psd-to-pdf", icon: PenTool, comingSoon: true },
  { label: "INDD to PDF", slug: "indd-to-pdf", icon: PenTool, comingSoon: true },
  { label: "INDD to JPG", slug: "indd-to-jpg", icon: PenTool, comingSoon: true },
  { label: "Figma to PNG", slug: "figma-to-png", icon: PenTool, comingSoon: true },
  { label: "Figma to SVG", slug: "figma-to-svg", icon: PenTool, comingSoon: true },
  { label: "Figma to PDF", slug: "figma-to-pdf", icon: PenTool, comingSoon: true }
];

export const ebookTools: Tool[] = [
  { label: "EPUB to PDF", slug: "epub-to-pdf", icon: BookOpen, comingSoon: true },
  { label: "EPUB to MOBI", slug: "epub-to-mobi", icon: BookOpen, comingSoon: true },
  { label: "EPUB to AZW3", slug: "epub-to-azw3", icon: BookOpen, comingSoon: true },
  { label: "MOBI to PDF", slug: "mobi-to-pdf", icon: BookOpen, comingSoon: true },
  { label: "MOBI to EPUB", slug: "mobi-to-epub", icon: BookOpen, comingSoon: true },
  { label: "AZW3 to PDF", slug: "azw3-to-pdf", icon: BookOpen, comingSoon: true },
  { label: "AZW3 to EPUB", slug: "azw3-to-epub", icon: BookOpen, comingSoon: true },
  { label: "PDF to EPUB", slug: "pdf-to-epub", icon: BookOpen, comingSoon: true },
  { label: "PDF to MOBI", slug: "pdf-to-mobi", icon: BookOpen, comingSoon: true }
];

export const utilityTools: Tool[] = [
  { label: "Alarm Clock", slug: "alarm-clock", icon: PenTool },
  { label: "Background Generator", slug: "background-generator", icon: PenTool },
  { label: "Bar Graph Maker", slug: "bar-graph-maker", icon: PenTool },
  { label: "Base64 Decode", slug: "base64-decode", icon: PenTool },
  { label: "Base64 Encode", slug: "base64-encode", icon: PenTool },
  { label: "Base64 to Image", slug: "base64-to-image", icon: PenTool },
  { label: "Calendar", slug: "calendar", icon: PenTool },
  { label: "Call Recorder", slug: "call-recorder", icon: PenTool },
  { label: "Camera Online", slug: "camera-online", icon: PenTool },
  { label: "Character Counter", slug: "character-counter", icon: PenTool },
  { label: "Chart Maker", slug: "chart-maker", icon: PenTool },
  { label: "Click Counter", slug: "click-counter", icon: PenTool },
  { label: "Color Picker", slug: "color-picker-from-image", icon: PenTool },
  { label: "Color Tester", slug: "color-tester", icon: PenTool },
  { label: "Countdown Timer", slug: "countdown-timer", icon: PenTool },
  { label: "CPS Test", slug: "cps-test", icon: PenTool },
  { label: "Current Time", slug: "current-time", icon: PenTool },
  { label: "Grocery List", slug: "grocery-list", icon: PenTool },
  { label: "HTML Editor", slug: "html-editor", icon: PenTool },
  { label: "HTML Link Generator", slug: "html-link-generator", icon: PenTool },
  { label: "HTML Table Generator", slug: "html-table-generator", icon: PenTool },
  { label: "HTTP Header Checker", slug: "http-header-checker", icon: PenTool },
  { label: "HTTP Status Checker", slug: "http-status-checker", icon: PenTool },
  { label: "Image to Base64", slug: "image-to-base64", icon: PenTool },
  { label: "Image to PDF", slug: "image-to-pdf", icon: PenTool },
  { label: "Image to Text", slug: "image-to-text", icon: PenTool },
  { label: "Line Counter", slug: "line-counter", icon: PenTool },
  { label: "Line Graph Maker", slug: "line-graph-maker", icon: PenTool },
  { label: "Mic Test", slug: "mic-test", icon: PenTool },
  { label: "Online Clock", slug: "online-clock", icon: PenTool },
  { label: "Online Mirror", slug: "online-mirror", icon: PenTool },
  { label: "Online Notepad", slug: "online-notepad", icon: PenTool },
  { label: "Online Notes", slug: "online-notes", icon: PenTool },
  { label: "Password Generator", slug: "password-generator", icon: PenTool },
  { label: "PDF Reader", slug: "pdf-reader", icon: PenTool },
  { label: "PDF Viewer", slug: "pdf-viewer", icon: PenTool },
  { label: "Pie Chart Maker", slug: "pie-chart-maker", icon: PenTool },
  { label: "Pixel Ruler", slug: "pixel-ruler", icon: PenTool },
  { label: "Random Number Generator", slug: "random-number-generator", icon: PenTool },
  { label: "Redirect Generator", slug: "redirect-generator", icon: PenTool },
  { label: "Ruler (cm)", slug: "ruler-cm", icon: PenTool },
  { label: "Ruler (inch)", slug: "ruler-inch", icon: PenTool },
  { label: "Scatter Plot", slug: "scatter-plot", icon: PenTool },
  { label: "Scoreboard", slug: "scoreboard", icon: PenTool },
  { label: "Screen Recorder", slug: "screen-recorder", icon: PenTool },
  { label: "Screen Resolution", slug: "screen-resolution", icon: PenTool },
  { label: "Screenshot", slug: "screenshot", icon: PenTool },
  { label: "Speech to Text", slug: "speech-to-text", icon: PenTool },
  { label: "Stopwatch", slug: "stopwatch", icon: PenTool },
  { label: "SVG Viewer", slug: "svg-viewer", icon: PenTool },
  { label: "Table Chart Maker", slug: "table-chart-maker", icon: PenTool },
  { label: "Text Editor", slug: "text-editor", icon: PenTool },
  { label: "Text to Speech", slug: "text-to-speech", icon: PenTool },
  { label: "Todo List", slug: "todo-list", icon: PenTool },
  { label: "Tone Generator", slug: "tone-generator", icon: PenTool },
  { label: "URL Decode", slug: "url-decode", icon: PenTool },
  { label: "URL Encode", slug: "url-encode", icon: PenTool },
  { label: "Voice Recorder", slug: "voice-recorder", icon: PenTool },
  { label: "Webcam Test", slug: "webcam-test", icon: PenTool },
  { label: "Window Size", slug: "window-size", icon: PenTool },
  { label: "Word Counter", slug: "word-counter", icon: PenTool },
  { label: "Word Frequency", slug: "word-frequency", icon: PenTool }
];

// Text & Developer Tools
export const textDevTools: Tool[] = [
  { label: "JSON Formatter", slug: "json-formatter", icon: Code },
  { label: "HTML Formatter", slug: "html-formatter", icon: Code },
  { label: "CSS Formatter", slug: "css-formatter", icon: Code },
  { label: "JavaScript Formatter", slug: "javascript-formatter", icon: Code },
  { label: "Regex Tester", slug: "regex-tester", icon: Code },
  { label: "Markdown Previewer", slug: "markdown-previewer", icon: Code },
  { label: "Base64 Encoder", slug: "base64-encoder", icon: Code },
  { label: "Base64 Decoder", slug: "base64-decoder", icon: Code },
  { label: "URL Encoder", slug: "url-encoder", icon: Code },
  { label: "URL Decoder", slug: "url-decoder", icon: Code },
  { label: "UUID Generator", slug: "uuid-generator", icon: Code }
];

// Calculator Tools
export const calculatorTools: Tool[] = [
  { label: "Percentage Calculator", slug: "percentage-calculator", icon: Calculator },
  { label: "Discount Calculator", slug: "discount-calculator", icon: Calculator },
  { label: "EMI Calculator", slug: "emi-calculator", icon: Calculator },
  { label: "GST Calculator", slug: "gst-calculator", icon: Calculator },
  { label: "Age Calculator", slug: "age-calculator", icon: Calculator },
  { label: "BMI Calculator", slug: "bmi-calculator", icon: Calculator },
  { label: "Loan Calculator", slug: "loan-calculator", icon: Calculator },
  { label: "Scientific Calculator", slug: "scientific-calculator", icon: Calculator }
];

// Data Converter Tools
export const dataConverterTools: Tool[] = [
  { label: "CSV to JSON", slug: "csv-to-json-converter", icon: RefreshCw },
  { label: "JSON to CSV", slug: "json-to-csv-converter", icon: RefreshCw },
  { label: "JSON to XML", slug: "json-to-xml-converter", icon: RefreshCw },
  { label: "XML to JSON", slug: "xml-to-json-converter", icon: RefreshCw },
  { label: "Text to Binary", slug: "text-to-binary", icon: RefreshCw },
  { label: "Binary to Text", slug: "binary-to-text", icon: RefreshCw },
  { label: "Text to Hex", slug: "text-to-hex", icon: RefreshCw },
  { label: "Hex to Text", slug: "hex-to-text", icon: RefreshCw }
];

// Time & Date Tools
export const timeDateTools: Tool[] = [
  { label: "Timestamp Converter", slug: "timestamp-converter", icon: Clock },
  { label: "Timezone Converter", slug: "timezone-converter", icon: Clock },
  { label: "Date Difference", slug: "date-difference-calculator", icon: Clock },
  { label: "Countdown Timer", slug: "countdown-timer-tool", icon: Clock },
  { label: "Time Calculator", slug: "time-calculator", icon: Clock },
  { label: "World Clock", slug: "world-clock", icon: Clock }
];

// Security Tools
export const securityTools: Tool[] = [
  { label: "Password Generator", slug: "password-generator-tool", icon: Shield },
  { label: "Password Strength Checker", slug: "password-strength-checker", icon: Shield },
  { label: "Hash Generator", slug: "hash-generator", icon: Shield },
  { label: "MD5 Generator", slug: "md5-generator", icon: Shield },
  { label: "SHA256 Generator", slug: "sha256-generator", icon: Shield },
  { label: "JWT Decoder", slug: "jwt-decoder", icon: Shield }
];

// Web Utilities
export const webUtilities: Tool[] = [
  { label: "User Agent Parser", slug: "user-agent-parser", icon: Globe },
  { label: "Meta Tag Generator", slug: "meta-tag-generator", icon: Globe },
  { label: "Open Graph Preview", slug: "og-preview", icon: Globe },
  { label: "HTML Preview", slug: "html-preview", icon: Globe },
  { label: "IP Address Lookup", slug: "ip-lookup", icon: Globe },
  { label: "DNS Lookup", slug: "dns-lookup", icon: Globe }
];

// Social Media Tools
export const socialMediaTools: Tool[] = [
  { label: "Hashtag Generator", slug: "hashtag-generator", icon: Share2 },
  { label: "Caption Generator", slug: "caption-generator", icon: Share2 },
  { label: "YouTube Thumbnail Preview", slug: "youtube-thumbnail-preview", icon: Share2 },
  { label: "Social Post Formatter", slug: "social-post-formatter", icon: Share2 },
  { label: "Bio Generator", slug: "bio-generator", icon: Share2 }
];

// File Tools
export const fileTools: Tool[] = [
  { label: "File Size Converter", slug: "file-size-converter", icon: FolderOpen },
  { label: "File Renamer", slug: "file-renamer", icon: FolderOpen },
  { label: "File Metadata Viewer", slug: "file-metadata-viewer", icon: FolderOpen },
  { label: "File Analyzer", slug: "file-analyzer", icon: FolderOpen }
];

// Fun Tools
export const funTools: Tool[] = [
  { label: "Typing Speed Test", slug: "typing-speed-test", icon: Sparkles },
  { label: "Random Name Picker", slug: "random-name-picker", icon: Sparkles },
  { label: "Dice Roller", slug: "dice-roller", icon: Sparkles },
  { label: "Yes/No Generator", slug: "yes-no-generator", icon: Sparkles },
  { label: "Spin Wheel", slug: "spin-wheel", icon: Sparkles },
  { label: "Random Color Generator", slug: "random-color-generator", icon: Sparkles }
];

// Fun Games
export const funGames: Tool[] = [
  { label: "Tic Tac Toe", slug: "tic-tac-toe", icon: Gamepad2 },
  { label: "Memory Game", slug: "memory-game", icon: Gamepad2 },
  { label: "2048 Game", slug: "2048-game", icon: Gamepad2 },
  { label: "Snake Game", slug: "snake-game", icon: Gamepad2 },
  { label: "Simon Says", slug: "simon-says", icon: Gamepad2 }
];

// Interactive Party Games
export const interactiveGames: Tool[] = [
  { label: "Truth or Dare", slug: "truth-or-dare", icon: Users },
  { label: "Would You Rather", slug: "would-you-rather", icon: Users },
  { label: "Never Have I Ever", slug: "never-have-i-ever", icon: Users },
  { label: "Reaction Time Test", slug: "reaction-time-test", icon: Zap },
  { label: "Emoji Guess Game", slug: "emoji-guess-game", icon: Sparkles },
  { label: "Number Memory Challenge", slug: "number-memory-challenge", icon: Sparkles },
  { label: "Lie Detector Test", slug: "lie-detector-simulator", icon: Zap },
  { label: "Personality Quiz", slug: "personality-quiz", icon: Users },
  { label: "Decision Wheel", slug: "decision-wheel", icon: Target }
];

// Fun Generators
export const funGenerators: Tool[] = [
  { label: "Fake Chat Generator", slug: "fake-chat-generator", icon: MessageSquare },
  { label: "Love Calculator", slug: "love-calculator", icon: Heart },
  { label: "Excuse Generator", slug: "excuse-generator", icon: Lightbulb },
  { label: "Pickup Line Generator", slug: "pickup-line-generator", icon: Heart },
  { label: "Daily Luck Meter", slug: "daily-luck-meter", icon: Sparkles },
  { label: "Random Challenge", slug: "random-challenge-generator", icon: Target },
  { label: "Random Story", slug: "random-story-generator", icon: Sparkles },
  { label: "Fake Notification", slug: "fake-notification-generator", icon: MessageSquare },
  { label: "Mood Suggestion", slug: "mood-suggestion", icon: Lightbulb },
  { label: "Future Prediction", slug: "future-prediction", icon: Sparkles }
];

export const otherTools = [];
