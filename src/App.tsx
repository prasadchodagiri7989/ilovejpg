// src/App.tsx

import React from "react";
import { SVGtoPNG } from "./pages/image/svg/SVGtoPNG";
import { SVGtoJPG } from "./pages/image/svg/SVGtoJPG";
import { SVGtoPDF } from "./pages/image/svg/SVGtoPDF";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import ScrollToTop from "./components/ScrollToTop";
import { Layout } from "./components/Layout";
import Index from "@/pages/Index";
import { JPGtoPNG } from "./pages/image/jpg/JPGtoPNG";
import { JPGtoWEBP } from "./pages/image/jpg/JPGtoWEBP";
import { JPGtoBMP } from "./pages/image/jpg/JPGtoBPM";
import { JPGtoGIF } from "./pages/image/jpg/JPGtoGIF";
import { JPGtoTIFF } from "./pages/image/jpg/JPGtoTIFF";
import { JPGtoPDF } from "./pages/tools/JPGtoPDF";
import { JPGtoSVG } from "./pages/image/jpg/JPGtoSVG";

{/*JPEG*/ }
import { JPEGtoPNG } from "./pages/image/jpeg/JPEGtoPNG";
import { JPEGtoWEBP } from "./pages/image/jpeg/JPEGtoWEBP";
import { JPEGtoBMP } from "./pages/image/jpeg/JPEGtoBMP";
import { JPEGtoGIF } from "./pages/image/jpeg/JPEGtoGIF";
import { JPEGtoTIFF } from "./pages/image/jpeg/JPEGtoTIFF";
import { JPEGtoPDF } from "./pages/image/jpeg/JPEGtoPDF";
import { JPEGtoSVG } from "./pages/image/jpeg/JPEGtoSVG";
{/*png*/ }
import { PNGtoJPG } from "./pages/image/png/PNGtoJPG";
import { PNGtoWEBP } from "./pages/image/png/PNGtoWEBP";
import { PNGtoBMP } from "./pages/image/png/PNGtoBMP";
import { PNGtoGIF } from "./pages/image/png/PNGtoGIF";
import { PNGtoTIFF } from "./pages/image/png/PNGtoTIFF";
import { PNGtoPDF } from "./pages/tools/PNGtoPDF";
import { PNGtoSVG } from "./pages/image/png/PNGtoSVG";
{/*webp*/ }
import { WEBPtoJPG } from "./pages/image/webp/WEBPtoJPG";
import { WEBPtoPNG } from "./pages/image/webp/WEBPtoPNG";
import { WEBPtoGIF } from "./pages/image/webp/WEBPtoGIF";
{/*bmp*/ }
import { BMPtoJPG } from "./pages/image/bmp/BMPtoJPG";
import { BMPtoPNG } from "./pages/image/bmp/BMPtoPNG";
import { BMPtoPDF } from "./pages/image/bmp/BMPtoPDF";
{/*gif*/}
import { GIFtoJPG } from "./pages/image/gif/GIFtoJPG";
import { GIFtoPNG } from "./pages/image/gif/GIFtoPNG";
import { GIFtoWebP } from "./pages/image/gif/GIFtoWebP";

{/*heic*/}
import { HEICtoJPG } from "./pages/image/heic/HEICtoJPG";
import { HEICtoPNG } from "./pages/image/heic/HEICtoPNG";
import { HEICtoWEBP } from "./pages/image/heic/HEICtoWEBP";


{/*pdf*/ }
import { PDFtoWord } from "./pages/pdf/PDFtoWord";
import { PDFtoJPG } from "./pages/pdf/PDFtoJPG";
import { PDFtoPNG } from "./pages/pdf/PDFtoPNG";
import { PDFtoTXT } from "./pages/pdf/PDFtoTXT";
import { HTMLtoPDF } from "./pages/pdf/HTMLtoPDF";
import { TXTtoPDF } from "./pages/pdf/TXTtoPDF";
import { HTMLtoTXT } from "./pages/pdf/HTMLtoTXT";
import { TXTtoHTML } from "./pages/pdf/TXTtoHTML";
import { DOCXtoPDF } from "./pages/pdf/DOCXtoPDF";
import { 
  DOCXtoTXT, 
  DOCXtoHTML, 
  DOCXtoJPG,
  RTFtoDOCX,
  RTFtoPDF,
  RTFtoTXT,
  ODTtoPDF,
  ODTtoDOCX,
  HTMLtoDOCX,
  TXTtoDOCX,
  PDFtoPPTX
} from "./pages/pdf/GenericConverter";

{/*spreadsheet*/ }
import { CSVtoJSON } from "./pages/csv/CSVtoJSON";
import { CSVtoXLSX } from "./pages/csv/CSVtoXLSX";
import { CSVtoXML } from "./pages/csv/CSVtoXML";
import { JSONtoCSV } from "./pages/csv/JSONtoCSV";
import { JSONtoXLSX } from "./pages/csv/JSONtoXLSX";
import { JSONtoPDF } from "./pages/csv/JSONtoPDF";
import { XLSXtoCSV } from "./pages/csv/XLSXtoCSV";
import { XLSXtoJSON } from "./pages/csv/XLSXtoJSON";
import { XLSXtoXML } from "./pages/csv/XLSXtoXML";
import { XLStoCSV } from "./pages/csv/XLStoCSV";
import { XLStoJSON } from "./pages/csv/XLStoJSON";
import { XLStoXML } from "./pages/csv/XLStoXML";
import { XLStoODS } from "./pages/csv/XLStoODS";
import { XLSXtoODS } from "./pages/csv/XLSXtoODS";
import { ODStoXLSX } from "./pages/csv/ODStoXLSX";
import { ODStoCSV } from "./pages/csv/ODStoCSV";

{/*video*/ }
import {
  MP4toAVI,
  MP4toMOV,
  MP4toMKV,
  MP4toWEBM,
  MP4toGIF,
  AVItoMP4,
  AVItoMOV,
  AVItoMKV,
  AVItoWEBM,
  MOVtoMP4,
  MOVtoAVI,
  MOVtoWEBM,
  MKVtoMP4,
  MKVtoAVI,
  MKVtoMOV,
  WEBMtoMP4,
  WEBMtoAVI,
  WEBMtoGIF,
  GIFtoMP4,
  GIFtoWEBM
} from "./pages/video/GenericVideoConverter";

import { BackgroundGenerator } from "./pages/tools/BackgroundGenerator";
import { AlarmClock } from "./pages/tools/AlarmClock";
import { BarGraphMaker } from "./pages/tools/BarGraphMaker";
import Base64Decode from "./pages/tools/Base64Decode";
import Base64Encode from "./pages/tools/Base64Encode";
import Base64ToImage from "./pages/tools/Base64ToImage";
import { Calendar } from "./pages/tools/Calendar";
import { CallRecorder } from "./pages/tools/CallRecorder";
import { CameraOnline } from "./pages/tools/CameraOnline";
import { CharacterCounter } from "./pages/tools/CharacterCounter";
import { ChartMaker } from "./pages/tools/ChartMaker";
import { ClickCounter } from "./pages/tools/ClickCounter";
import ColorPickerFromImage from "./pages/tools/ColorPickerFromImage";
import ColorTester from "./pages/tools/ColorTester";
import { CountdownTimer } from "./pages/tools/CountdownTimer";
import { CPSTest } from "./pages/tools/CPSTest";
import { CurrentTime } from "./pages/tools/CurrentTime";
import { GroceryList } from "./pages/tools/GroceryList";
import HtmlEditor from "./pages/tools/HtmlEditor";
import HtmlLinkGenerator from "./pages/tools/HtmlLinkGenerator";
import HtmlTableGenerator from "./pages/tools/HtmlTableGenerator";
import HttpHeaderChecker from "./pages/tools/HttpHeaderChecker";
import HttpStatusChecker from "./pages/tools/HttpStatusChecker";
import ImageToBase64 from "./pages/tools/ImageToBase64";
import { ImageToPDF } from "./pages/tools/ImageToPDF";
import { ImageToText } from "./pages/tools/ImageToText";
import { LineCounter } from "./pages/tools/LineCounter";
import { LineGraphMaker } from "./pages/tools/LineGraphMaker";
import { MicTest } from "./pages/tools/MicTest";
import { OnlineClock } from "./pages/tools/OnlineClock";
import { OnlineMirror } from "./pages/tools/OnlineMirror";
import { OnlineNotepad } from "./pages/tools/OnlineNotepad";
import { OnlineNotes } from "./pages/tools/OnlineNotes";
import { PDFReader } from "./pages/tools/PDFReader";
import { PDFViewer } from "./pages/tools/PDFViewer";
import { PieChartMaker } from "./pages/tools/PieChartMaker";
import PixelRuler from "./pages/tools/PixelRuler";
import { RandomNumberGenerator } from "./pages/tools/RandomNumberGenerator";
import RedirectGenerator from "./pages/tools/RedirectGenerator";
import { RulerCm } from "./pages/tools/RulerCm";
import { RulerInch } from "./pages/tools/RulerInch";
import { ScatterPlot } from "./pages/tools/ScatterPlot";
import { Scoreboard } from "./pages/tools/Scoreboard";
import { ScreenRecorder } from "./pages/tools/ScreenRecorder";
import ScreenResolution from "./pages/tools/ScreenResolution";
import { Screenshot } from "./pages/tools/Screenshot";
import { SpeechToText } from "./pages/tools/SpeechToText";
import { Stopwatch } from "./pages/tools/Stopwatch";
import SvgViewer from "./pages/tools/SvgViewer";
import { TableChartMaker } from "./pages/tools/TableChartMaker";
import { TextEditor } from "./pages/tools/TextEditor";
import { TextToSpeech } from "./pages/tools/TextToSpeech";
import { TodoList } from "./pages/tools/TodoList";
import { ToneGenerator } from "./pages/tools/ToneGenerator";
import UrlDecode from "./pages/tools/UrlDecode";
import UrlEncode from "./pages/tools/UrlEncode";
import { VoiceRecorder } from "./pages/tools/VoiceRecorder";
import { WebcamTest } from "./pages/tools/WebcamTest";
import WindowSize from "./pages/tools/WindowSize";
import { WordCounter } from "./pages/tools/WordCounter";
import { WordFrequency } from "./pages/tools/WordFrequency";
import CategoryPage from "./pages/CategoryPage";

// New Tool Imports - Developer Tools
import JSONFormatter from "./pages/developer/JSONFormatter";
import HTMLFormatter from "./pages/developer/HTMLFormatter";
import CSSFormatter from "./pages/developer/CSSFormatter";
import JavaScriptFormatter from "./pages/developer/JavaScriptFormatter";
import RegexTester from "./pages/developer/RegexTester";
import MarkdownPreviewer from "./pages/developer/MarkdownPreviewer";
import Base64Encoder from "./pages/developer/Base64Encoder";
import Base64Decoder from "./pages/developer/Base64Decoder";
import URLEncoder from "./pages/developer/URLEncoder";
import URLDecoder from "./pages/developer/URLDecoder";
import UUIDGenerator from "./pages/developer/UUIDGenerator";

// New Tool Imports - Calculators
import PercentageCalculator from "./pages/calculators/PercentageCalculator";
import DiscountCalculator from "./pages/calculators/DiscountCalculator";
import EMICalculator from "./pages/calculators/EMICalculator";
import GSTCalculator from "./pages/calculators/GSTCalculator";
import AgeCalculator from "./pages/calculators/AgeCalculator";
import BMICalculator from "./pages/calculators/BMICalculator";
import LoanCalculator from "./pages/calculators/LoanCalculator";
import ScientificCalculator from "./pages/calculators/ScientificCalculator";

// New Tool Imports - Time & Date
import TimestampConverter from "./pages/timedate/TimestampConverter";
import TimezoneConverter from "./pages/timedate/TimezoneConverter";
import DateDifference from "./pages/timedate/DateDifference";
import CountdownTimerTool from "./pages/timedate/CountdownTimer";
import TimeCalculator from "./pages/timedate/TimeCalculator";
import WorldClock from "./pages/timedate/WorldClock";

// New Tool Imports - Security
import PasswordGenerator from "./pages/security/PasswordGenerator";
import PasswordStrengthChecker from "./pages/security/PasswordStrengthChecker";
import HashGenerator from "./pages/security/HashGenerator";
import MD5Generator from "./pages/security/MD5Generator";
import SHA256Generator from "./pages/security/SHA256Generator";
import JWTDecoder from "./pages/security/JWTDecoder";

// New Tool Imports - Web Utilities
import UserAgentParser from "./pages/web/UserAgentParser";
import MetaTagGenerator from "./pages/web/MetaTagGenerator";
import OGPreview from "./pages/web/OGPreview";
import HTMLPreview from "./pages/web/HTMLPreview";
import IPLookup from "./pages/web/IPLookup";
import DNSLookup from "./pages/web/DNSLookup";

// New Tool Imports - Data Converters
import JSONtoXML from "./pages/dataconverter/JSONtoXML";
import XMLtoJSON from "./pages/dataconverter/XMLtoJSON";
import TextToBinary from "./pages/dataconverter/TextToBinary";
import BinaryToText from "./pages/dataconverter/BinaryToText";
import TextToHex from "./pages/dataconverter/TextToHex";
import HexToText from "./pages/dataconverter/HexToText";

// Social Media Tools
import HashtagGenerator from "./pages/social/HashtagGenerator";
import CaptionGenerator from "./pages/social/CaptionGenerator";
import YouTubeThumbnailPreview from "./pages/social/YouTubeThumbnailPreview";
import SocialPostFormatter from "./pages/social/SocialPostFormatter";
import BioGenerator from "./pages/social/BioGenerator";

// File Tools
import FileSizeConverter from "./pages/file/FileSizeConverter";
import FileRenamer from "./pages/file/FileRenamer";
import FileMetadataViewer from "./pages/file/FileMetadataViewer";
import FileAnalyzer from "./pages/file/FileAnalyzer";

// Fun Tools
import TypingSpeedTest from "./pages/fun/TypingSpeedTest";
import RandomNamePicker from "./pages/fun/RandomNamePicker";
import DiceRoller from "./pages/fun/DiceRoller";
import YesNoGenerator from "./pages/fun/YesNoGenerator";
import SpinWheel from "./pages/fun/SpinWheel";
import RandomColorGenerator from "./pages/fun/RandomColorGenerator";

// Fun Games
import TicTacToe from "./pages/games/TicTacToe";
import MemoryGame from "./pages/games/MemoryGame";
import Game2048 from "./pages/games/Game2048";
import SnakeGame from "./pages/games/SnakeGame";
import SimonSays from "./pages/games/SimonSays";

// New Interactive Tools & Games
import TruthOrDare from "./pages/interactive/TruthOrDare";
import WouldYouRather from "./pages/interactive/WouldYouRather";
import NeverHaveIEver from "./pages/interactive/NeverHaveIEver";
import ReactionTimeTest from "./pages/interactive/ReactionTimeTest";
import EmojiGuessGame from "./pages/interactive/EmojiGuessGame";
import NumberMemoryChallenge from "./pages/interactive/NumberMemoryChallenge";
import LieDetectorSimulator from "./pages/interactive/LieDetectorSimulator";
import PersonalityQuiz from "./pages/interactive/PersonalityQuiz";
import EnhancedDecisionWheel from "./pages/interactive/EnhancedDecisionWheel";

// New Generators
import FakeChatGenerator from "./pages/generators/FakeChatGenerator";
import LoveCalculator from "./pages/generators/LoveCalculator";
import ExcuseGenerator from "./pages/generators/ExcuseGenerator";
import PickupLineGenerator from "./pages/generators/PickupLineGenerator";
import DailyLuckMeter from "./pages/generators/DailyLuckMeter";
import RandomChallengeGenerator from "./pages/generators/RandomChallengeGenerator";
import RandomStoryGenerator from "./pages/generators/RandomStoryGenerator";
import FakeNotificationGenerator from "./pages/generators/FakeNotificationGenerator";
import MoodBasedSuggestion from "./pages/generators/MoodBasedSuggestion";
import FuturePredictionGenerator from "./pages/generators/FuturePredictionGenerator";

// Create a QueryClient instance
const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Layout><Index /></Layout>} />
            
            {/* Category Pages */}
            <Route path="/tools/:category" element={<Layout><CategoryPage /></Layout>} />
            
            <Route path="/jpg-to-png" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/jpg-to-webp" element={<Layout><JPGtoWEBP /></Layout>} />
            <Route path="/jpg-to-bmp" element={<Layout><JPGtoBMP /></Layout>} />
            <Route path="/jpg-to-gif" element={<Layout><JPGtoGIF /></Layout>} />
            <Route path="/jpg-to-tiff" element={<Layout><JPGtoTIFF /></Layout>} />
            <Route path="/jpg-to-pdf" element={<Layout><JPGtoPDF /></Layout>} />
            <Route path="/jpg-to-svg" element={<Layout><JPGtoSVG /></Layout>} />
            {/*JPEG */}
            <Route path="/jpeg-to-png" element={<Layout><JPEGtoPNG /></Layout>} />
            <Route path="/jpeg-to-webp" element={<Layout><JPEGtoWEBP /></Layout>} />
            <Route path="/jpeg-to-bmp" element={<Layout><JPEGtoBMP /></Layout>} />
            <Route path="/jpeg-to-gif" element={<Layout><JPEGtoGIF /></Layout>} />
            <Route path="/jpeg-to-tiff" element={<Layout><JPEGtoTIFF /></Layout>} />
            <Route path="/jpeg-to-pdf" element={<Layout><JPEGtoPDF /></Layout>} />
            <Route path="/jpeg-to-svg" element={<Layout><JPEGtoSVG /></Layout>} />
            {/*png*/}
            <Route path="/png-to-jpg" element={<Layout><PNGtoJPG /></Layout>} />
            <Route path="/png-to-webp" element={<Layout><PNGtoWEBP /></Layout>} />
            <Route path="/png-to-bmp" element={<Layout><PNGtoBMP /></Layout>} />
            <Route path="/png-to-gif" element={<Layout><PNGtoGIF /></Layout>} />
            <Route path="/png-to-tiff" element={<Layout><PNGtoTIFF /></Layout>} />
            <Route path="/png-to-pdf" element={<Layout><PNGtoPDF /></Layout>} />
            <Route path="/png-to-svg" element={<Layout><PNGtoSVG /></Layout>} />
            {/*webp*/}
            <Route path="/webp-to-jpg" element={<Layout><WEBPtoJPG /></Layout>} />
            <Route path="/webp-to-png" element={<Layout><WEBPtoPNG /></Layout>} />
            <Route path="/webp-to-gif" element={<Layout><WEBPtoGIF /></Layout>} />
            {/*bmp*/}
            <Route path="/bmp-to-jpg" element={<Layout><BMPtoJPG /></Layout>} />
            <Route path="/bmp-to-png" element={<Layout><BMPtoPNG /></Layout>} />
            <Route path="/bmp-to-pdf" element={<Layout><BMPtoPDF /></Layout>} />
          {/*gif*/}
            <Route path="/gif-to-jpg-frame" element={<Layout><GIFtoJPG /></Layout>} />
            <Route path="/gif-to-png" element={<Layout><GIFtoPNG /></Layout>} />
            <Route path="/gif-to-webp" element={<Layout><GIFtoWebP /></Layout>} />
          {/*svg*/}  
            <Route path="/svg-to-png" element={<Layout><SVGtoPNG /></Layout>} />
            <Route path="/svg-to-jpg" element={<Layout><SVGtoJPG /></Layout>} />
            <Route path="/svg-to-pdf" element={<Layout><SVGtoPDF /></Layout>} />
            {/*heic*/}
            <Route path="/heic-to-jpg" element={<Layout><HEICtoJPG /></Layout>} />
            <Route path="/heic-to-png" element={<Layout><HEICtoPNG /></Layout>} />
            <Route path="/heic-to-webp" element={<Layout><HEICtoWEBP /></Layout>} />

            <Route path="/doc-to-pdf" element={<Layout><DOCXtoPDF /></Layout>} />
            <Route path="/doc-to-txt" element={<Layout><DOCXtoTXT /></Layout>} />
            <Route path="/doc-to-html" element={<Layout><DOCXtoHTML /></Layout>} />
            <Route path="/doc-to-jpg" element={<Layout><DOCXtoJPG /></Layout>} />
            <Route path="/docx-to-pdf" element={<Layout><DOCXtoPDF /></Layout>} />
            <Route path="/docx-to-txt" element={<Layout><DOCXtoTXT /></Layout>} />
            <Route path="/docx-to-html" element={<Layout><DOCXtoHTML /></Layout>} />
            <Route path="/docx-to-jpg" element={<Layout><DOCXtoJPG /></Layout>} />
            <Route path="/pdf-to-docx" element={<Layout><PDFtoWord /></Layout>} />
            <Route path="/pdf-to-jpg" element={<Layout><PDFtoJPG /></Layout>} />
            <Route path="/pdf-to-png" element={<Layout><PDFtoPNG /></Layout>} />
            <Route path="/pdf-to-txt" element={<Layout><PDFtoTXT /></Layout>} />
            <Route path="/pdf-to-pptx" element={<Layout><PDFtoPPTX /></Layout>} />
            <Route path="/txt-to-pdf" element={<Layout><TXTtoPDF /></Layout>} />
            <Route path="/txt-to-docx" element={<Layout><TXTtoDOCX /></Layout>} />
            <Route path="/txt-to-html" element={<Layout><TXTtoHTML /></Layout>} />
            <Route path="/rtf-to-docx" element={<Layout><RTFtoDOCX /></Layout>} />
            <Route path="/rtf-to-pdf" element={<Layout><RTFtoPDF /></Layout>} />
            <Route path="/rtf-to-txt" element={<Layout><RTFtoTXT /></Layout>} />
            <Route path="/html-to-pdf" element={<Layout><HTMLtoPDF /></Layout>} />
            <Route path="/html-to-docx" element={<Layout><HTMLtoDOCX /></Layout>} />
            <Route path="/html-to-txt" element={<Layout><HTMLtoTXT /></Layout>} />
            <Route path="/odt-to-pdf" element={<Layout><ODTtoPDF /></Layout>} />
            <Route path="/odt-to-docx" element={<Layout><ODTtoDOCX /></Layout>} />

            <Route path="/xls-to-csv" element={<Layout><XLStoCSV /></Layout>} />
            <Route path="/xls-to-ods" element={<Layout><XLStoODS /></Layout>} />
            <Route path="/xls-to-json" element={<Layout><XLStoJSON /></Layout>} />
            <Route path="/xls-to-xml" element={<Layout><XLStoXML /></Layout>} />
            <Route path="/xlsx-to-csv" element={<Layout><XLSXtoCSV /></Layout>} />
            <Route path="/xlsx-to-ods" element={<Layout><XLSXtoODS /></Layout>} />
            <Route path="/xlsx-to-json" element={<Layout><XLSXtoJSON /></Layout>} />
            <Route path="/xlsx-to-xml" element={<Layout><XLSXtoXML /></Layout>} />
            <Route path="/csv-to-xlsx" element={<Layout><CSVtoXLSX /></Layout>} />
            <Route path="/csv-to-json" element={<Layout><CSVtoJSON /></Layout>} />
            <Route path="/csv-to-xml" element={<Layout><CSVtoXML /></Layout>} />
            <Route path="/ods-to-xlsx" element={<Layout><ODStoXLSX /></Layout>} />
            <Route path="/ods-to-csv" element={<Layout><ODStoCSV /></Layout>} />
            <Route path="/json-to-csv" element={<Layout><JSONtoCSV /></Layout>} />
            <Route path="/json-to-xlsx" element={<Layout><JSONtoXLSX /></Layout>} />
            <Route path="/json-to-pdf" element={<Layout><JSONtoPDF /></Layout>} />
            <Route path="/json-to-xml" element={<Layout><JSONtoXML /></Layout>} />

            <Route path="/mp4-to-avi" element={<Layout><MP4toAVI /></Layout>} />
            <Route path="/mp4-to-mov" element={<Layout><MP4toMOV /></Layout>} />
            <Route path="/mp4-to-mkv" element={<Layout><MP4toMKV /></Layout>} />
            <Route path="/mp4-to-webm" element={<Layout><MP4toWEBM /></Layout>} />
            <Route path="/mp4-to-gif" element={<Layout><MP4toGIF /></Layout>} />
            <Route path="/avi-to-mp4" element={<Layout><AVItoMP4 /></Layout>} />
            <Route path="/avi-to-mov" element={<Layout><AVItoMOV /></Layout>} />
            <Route path="/avi-to-mkv" element={<Layout><AVItoMKV /></Layout>} />
            <Route path="/avi-to-webm" element={<Layout><AVItoWEBM /></Layout>} />
            <Route path="/mov-to-mp4" element={<Layout><MOVtoMP4 /></Layout>} />
            <Route path="/mov-to-avi" element={<Layout><MOVtoAVI /></Layout>} />
            <Route path="/mov-to-webm" element={<Layout><MOVtoWEBM /></Layout>} />
            <Route path="/mkv-to-mp4" element={<Layout><MKVtoMP4 /></Layout>} />
            <Route path="/mkv-to-avi" element={<Layout><MKVtoAVI /></Layout>} />
            <Route path="/mkv-to-mov" element={<Layout><MKVtoMOV /></Layout>} />
            <Route path="/webm-to-mp4" element={<Layout><WEBMtoMP4 /></Layout>} />
            <Route path="/webm-to-avi" element={<Layout><WEBMtoAVI /></Layout>} />
            <Route path="/webm-to-gif" element={<Layout><WEBMtoGIF /></Layout>} />
            <Route path="/gif-to-mp4" element={<Layout><GIFtoMP4 /></Layout>} />
            <Route path="/gif-to-webm" element={<Layout><GIFtoWEBM /></Layout>} />

            <Route path="/mp3-to-wav" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mp3-to-aac" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mp3-to-flac" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mp3-to-ogg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mp3-to-m4a" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/wav-to-mp3" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/wav-to-aac" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/wav-to-flac" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/wav-to-ogg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/aac-to-mp3" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/aac-to-wav" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/aac-to-flac" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/flac-to-mp3" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/flac-to-wav" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/m4a-to-mp3" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/m4a-to-wav" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/ogg-to-mp3" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/ogg-to-wav" element={<Layout><JPGtoPNG /></Layout>} />

            <Route path="/zip-to-rar" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/zip-to-7z" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/zip-to-tar" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/zip-to-tar.gz" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/rar-to-zip" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/rar-to-7z" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/rar-to-tar" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/7z-to-zip" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/7z-to-rar" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/7z-to-tar" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/tar-to-zip" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/tar-to-rar" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/tar-to-7z" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/tar.gz-to-zip" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/tar.gz-to-rar" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/tar.gz-to-7z" element={<Layout><JPGtoPNG /></Layout>} />

            <Route path="/ai-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/ai-to-svg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/ai-to-png" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/ai-to-jpg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/eps-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/eps-to-svg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/eps-to-png" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/eps-to-jpg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/psd-to-jpg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/psd-to-png" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/psd-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/indd-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/indd-to-jpg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/figma-to-png" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/figma-to-svg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/figma-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />

            <Route path="/epub-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/epub-to-mobi" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/epub-to-azw3" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mobi-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mobi-to-epub" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/azw3-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/azw3-to-epub" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/pdf-to-epub" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/pdf-to-mobi" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/pdf-to-word" element={<Layout><PDFtoWord /></Layout>} />

            {/* Add more routes here like /pngtopdf, /imagetopdf, etc. */}
            
            {/* Utility Tools Routes */}
            <Route path="/alarm-clock" element={<Layout><AlarmClock /></Layout>} />
            <Route path="/background-generator" element={<Layout><BackgroundGenerator /></Layout>} />
            <Route path="/bar-graph-maker" element={<Layout><BarGraphMaker /></Layout>} />
            <Route path="/base64-decode" element={<Layout><Base64Decode /></Layout>} />
            <Route path="/base64-encode" element={<Layout><Base64Encode /></Layout>} />
            <Route path="/base64-to-image" element={<Layout><Base64ToImage /></Layout>} />
            <Route path="/calendar" element={<Layout><Calendar /></Layout>} />
            <Route path="/call-recorder" element={<Layout><CallRecorder /></Layout>} />
            <Route path="/camera-online" element={<Layout><CameraOnline /></Layout>} />
            <Route path="/character-counter" element={<Layout><CharacterCounter /></Layout>} />
            <Route path="/chart-maker" element={<Layout><ChartMaker /></Layout>} />
            <Route path="/click-counter" element={<Layout><ClickCounter /></Layout>} />
            <Route path="/color-picker-from-image" element={<Layout><ColorPickerFromImage /></Layout>} />
            <Route path="/color-tester" element={<Layout><ColorTester /></Layout>} />
            <Route path="/countdown-timer" element={<Layout><CountdownTimer /></Layout>} />
            <Route path="/cps-test" element={<Layout><CPSTest /></Layout>} />
            <Route path="/current-time" element={<Layout><CurrentTime /></Layout>} />
            <Route path="/grocery-list" element={<Layout><GroceryList /></Layout>} />
            <Route path="/html-editor" element={<Layout><HtmlEditor /></Layout>} />
            <Route path="/html-link-generator" element={<Layout><HtmlLinkGenerator /></Layout>} />
            <Route path="/html-table-generator" element={<Layout><HtmlTableGenerator /></Layout>} />
            <Route path="/http-header-checker" element={<Layout><HttpHeaderChecker /></Layout>} />
            <Route path="/http-status-checker" element={<Layout><HttpStatusChecker /></Layout>} />
            <Route path="/image-to-base64" element={<Layout><ImageToBase64 /></Layout>} />
            <Route path="/image-to-pdf" element={<Layout><ImageToPDF /></Layout>} />
            <Route path="/image-to-text" element={<Layout><ImageToText /></Layout>} />
            <Route path="/line-counter" element={<Layout><LineCounter /></Layout>} />
            <Route path="/line-graph-maker" element={<Layout><LineGraphMaker /></Layout>} />
            <Route path="/mic-test" element={<Layout><MicTest /></Layout>} />
            <Route path="/online-clock" element={<Layout><OnlineClock /></Layout>} />
            <Route path="/online-mirror" element={<Layout><OnlineMirror /></Layout>} />
            <Route path="/online-notepad" element={<Layout><OnlineNotepad /></Layout>} />
            <Route path="/online-notes" element={<Layout><OnlineNotes /></Layout>} />
            {/* Removed duplicate: /password-generator route now uses /password-generator-tool */}
            <Route path="/pdf-reader" element={<Layout><PDFReader /></Layout>} />
            <Route path="/pdf-viewer" element={<Layout><PDFViewer /></Layout>} />
            <Route path="/pie-chart-maker" element={<Layout><PieChartMaker /></Layout>} />
            <Route path="/pixel-ruler" element={<Layout><PixelRuler /></Layout>} />
            <Route path="/random-number-generator" element={<Layout><RandomNumberGenerator /></Layout>} />
            <Route path="/redirect-generator" element={<Layout><RedirectGenerator /></Layout>} />
            <Route path="/ruler-cm" element={<Layout><RulerCm /></Layout>} />
            <Route path="/ruler-inch" element={<Layout><RulerInch /></Layout>} />
            <Route path="/scatter-plot" element={<Layout><ScatterPlot /></Layout>} />
            <Route path="/scoreboard" element={<Layout><Scoreboard /></Layout>} />
            <Route path="/screen-recorder" element={<Layout><ScreenRecorder /></Layout>} />
            <Route path="/screen-resolution" element={<Layout><ScreenResolution /></Layout>} />
            <Route path="/screenshot" element={<Layout><Screenshot /></Layout>} />
            <Route path="/speech-to-text" element={<Layout><SpeechToText /></Layout>} />
            <Route path="/stopwatch" element={<Layout><Stopwatch /></Layout>} />
            <Route path="/svg-viewer" element={<Layout><SvgViewer /></Layout>} />
            <Route path="/table-chart-maker" element={<Layout><TableChartMaker /></Layout>} />
            <Route path="/text-editor" element={<Layout><TextEditor /></Layout>} />
            <Route path="/text-to-speech" element={<Layout><TextToSpeech /></Layout>} />
            <Route path="/todo-list" element={<Layout><TodoList /></Layout>} />
            <Route path="/tone-generator" element={<Layout><ToneGenerator /></Layout>} />
            <Route path="/url-decode" element={<Layout><UrlDecode /></Layout>} />
            <Route path="/url-encode" element={<Layout><UrlEncode /></Layout>} />
            <Route path="/voice-recorder" element={<Layout><VoiceRecorder /></Layout>} />
            <Route path="/webcam-test" element={<Layout><WebcamTest /></Layout>} />
            <Route path="/window-size" element={<Layout><WindowSize /></Layout>} />
            <Route path="/word-counter" element={<Layout><WordCounter /></Layout>} />
            <Route path="/word-frequency" element={<Layout><WordFrequency /></Layout>} />
            
            {/* Text & Developer Tools Routes */}
            <Route path="/json-formatter" element={<Layout><JSONFormatter /></Layout>} />
            <Route path="/html-formatter" element={<Layout><HTMLFormatter /></Layout>} />
            <Route path="/css-formatter" element={<Layout><CSSFormatter /></Layout>} />
            <Route path="/javascript-formatter" element={<Layout><JavaScriptFormatter /></Layout>} />
            <Route path="/regex-tester" element={<Layout><RegexTester /></Layout>} />
            <Route path="/markdown-previewer" element={<Layout><MarkdownPreviewer /></Layout>} />
            <Route path="/base64-encoder" element={<Layout><Base64Encoder /></Layout>} />
            <Route path="/base64-decoder" element={<Layout><Base64Decoder /></Layout>} />
            <Route path="/url-encoder" element={<Layout><URLEncoder /></Layout>} />
            <Route path="/url-decoder" element={<Layout><URLDecoder /></Layout>} />
            <Route path="/uuid-generator" element={<Layout><UUIDGenerator /></Layout>} />
            
            {/* Calculator Tools Routes */}
            <Route path="/percentage-calculator" element={<Layout><PercentageCalculator /></Layout>} />
            <Route path="/discount-calculator" element={<Layout><DiscountCalculator /></Layout>} />
            <Route path="/emi-calculator" element={<Layout><EMICalculator /></Layout>} />
            <Route path="/gst-calculator" element={<Layout><GSTCalculator /></Layout>} />
            <Route path="/age-calculator" element={<Layout><AgeCalculator /></Layout>} />
            <Route path="/bmi-calculator" element={<Layout><BMICalculator /></Layout>} />
            <Route path="/loan-calculator" element={<Layout><LoanCalculator /></Layout>} />
            <Route path="/scientific-calculator" element={<Layout><ScientificCalculator /></Layout>} />
            
            {/* Data Converter Tools Routes */}
            <Route path="/csv-to-json-converter" element={<Layout><CSVtoJSON /></Layout>} />
            <Route path="/json-to-csv-converter" element={<Layout><JSONtoCSV /></Layout>} />
            <Route path="/json-to-xml-converter" element={<Layout><JSONtoXML /></Layout>} />
            <Route path="/xml-to-json-converter" element={<Layout><XMLtoJSON /></Layout>} />
            <Route path="/text-to-binary" element={<Layout><TextToBinary /></Layout>} />
            <Route path="/binary-to-text" element={<Layout><BinaryToText /></Layout>} />
            <Route path="/text-to-hex" element={<Layout><TextToHex /></Layout>} />
            <Route path="/hex-to-text" element={<Layout><HexToText /></Layout>} />
            
            {/* Time & Date Tools Routes */}
            <Route path="/timestamp-converter" element={<Layout><TimestampConverter /></Layout>} />
            <Route path="/timezone-converter" element={<Layout><TimezoneConverter /></Layout>} />
            <Route path="/date-difference-calculator" element={<Layout><DateDifference /></Layout>} />
            <Route path="/countdown-timer-tool" element={<Layout><CountdownTimerTool /></Layout>} />
            <Route path="/time-calculator" element={<Layout><TimeCalculator /></Layout>} />
            <Route path="/world-clock" element={<Layout><WorldClock /></Layout>} />
            
            {/* Security Tools Routes */}
            <Route path="/password-generator-tool" element={<Layout><PasswordGenerator /></Layout>} />
            <Route path="/password-strength-checker" element={<Layout><PasswordStrengthChecker /></Layout>} />
            <Route path="/hash-generator" element={<Layout><HashGenerator /></Layout>} />
            <Route path="/md5-generator" element={<Layout><MD5Generator /></Layout>} />
            <Route path="/sha256-generator" element={<Layout><SHA256Generator /></Layout>} />
            <Route path="/jwt-decoder" element={<Layout><JWTDecoder /></Layout>} />
            
            {/* Web Utilities Routes */}
            <Route path="/user-agent-parser" element={<Layout><UserAgentParser /></Layout>} />
            <Route path="/meta-tag-generator" element={<Layout><MetaTagGenerator /></Layout>} />
            <Route path="/og-preview" element={<Layout><OGPreview /></Layout>} />
            <Route path="/html-preview" element={<Layout><HTMLPreview /></Layout>} />
            <Route path="/ip-lookup" element={<Layout><IPLookup /></Layout>} />
            <Route path="/dns-lookup" element={<Layout><DNSLookup /></Layout>} />
            
            {/* Social Media Tools Routes */}
            <Route path="/hashtag-generator" element={<Layout><HashtagGenerator /></Layout>} />
            <Route path="/caption-generator" element={<Layout><CaptionGenerator /></Layout>} />
            <Route path="/youtube-thumbnail-preview" element={<Layout><YouTubeThumbnailPreview /></Layout>} />
            <Route path="/social-post-formatter" element={<Layout><SocialPostFormatter /></Layout>} />
            <Route path="/bio-generator" element={<Layout><BioGenerator /></Layout>} />
            
            {/* File Tools Routes */}
            <Route path="/file-size-converter" element={<Layout><FileSizeConverter /></Layout>} />
            <Route path="/file-renamer" element={<Layout><FileRenamer /></Layout>} />
            <Route path="/file-metadata-viewer" element={<Layout><FileMetadataViewer /></Layout>} />
            <Route path="/file-analyzer" element={<Layout><FileAnalyzer /></Layout>} />
            
            {/* Fun Tools Routes */}
            <Route path="/typing-speed-test" element={<Layout><TypingSpeedTest /></Layout>} />
            <Route path="/random-name-picker" element={<Layout><RandomNamePicker /></Layout>} />
            <Route path="/dice-roller" element={<Layout><DiceRoller /></Layout>} />
            <Route path="/yes-no-generator" element={<Layout><YesNoGenerator /></Layout>} />
            <Route path="/spin-wheel" element={<Layout><SpinWheel /></Layout>} />
            <Route path="/random-color-generator" element={<Layout><RandomColorGenerator /></Layout>} />
            
            {/* Fun Games Routes */}
            <Route path="/tic-tac-toe" element={<Layout><TicTacToe /></Layout>} />
            <Route path="/memory-game" element={<Layout><MemoryGame /></Layout>} />
            <Route path="/2048-game" element={<Layout><Game2048 /></Layout>} />
            <Route path="/snake-game" element={<Layout><SnakeGame /></Layout>} />
            <Route path="/simon-says" element={<Layout><SimonSays /></Layout>} />
            
            {/* New Interactive Games Routes */}
            <Route path="/truth-or-dare" element={<Layout><TruthOrDare /></Layout>} />
            <Route path="/would-you-rather" element={<Layout><WouldYouRather /></Layout>} />
            <Route path="/never-have-i-ever" element={<Layout><NeverHaveIEver /></Layout>} />
            <Route path="/reaction-time-test" element={<Layout><ReactionTimeTest /></Layout>} />
            <Route path="/emoji-guess-game" element={<Layout><EmojiGuessGame /></Layout>} />
            <Route path="/number-memory-challenge" element={<Layout><NumberMemoryChallenge /></Layout>} />
            <Route path="/lie-detector-simulator" element={<Layout><LieDetectorSimulator /></Layout>} />
            <Route path="/personality-quiz" element={<Layout><PersonalityQuiz /></Layout>} />
            <Route path="/decision-wheel" element={<Layout><EnhancedDecisionWheel /></Layout>} />
            
            {/* New Generators Routes */}
            <Route path="/fake-chat-generator" element={<Layout><FakeChatGenerator /></Layout>} />
            <Route path="/love-calculator" element={<Layout><LoveCalculator /></Layout>} />
            <Route path="/excuse-generator" element={<Layout><ExcuseGenerator /></Layout>} />
            <Route path="/pickup-line-generator" element={<Layout><PickupLineGenerator /></Layout>} />
            <Route path="/daily-luck-meter" element={<Layout><DailyLuckMeter /></Layout>} />
            <Route path="/random-challenge-generator" element={<Layout><RandomChallengeGenerator /></Layout>} />
            <Route path="/random-story-generator" element={<Layout><RandomStoryGenerator /></Layout>} />
            <Route path="/fake-notification-generator" element={<Layout><FakeNotificationGenerator /></Layout>} />
            <Route path="/mood-suggestion" element={<Layout><MoodBasedSuggestion /></Layout>} />
            <Route path="/future-prediction" element={<Layout><FuturePredictionGenerator /></Layout>} />
            
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
