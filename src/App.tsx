// src/App.tsx

import React from "react";
import { decompressFrames, parseGIF } from "gifuct-js";
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
import { JPGtoPDF } from "./components/tools/JPGtoPDF";
import { JPGtoSVG } from "./pages/image/jpg/JPGtoSVG";
import { SVGtoPNG } from "./pages/image/svg/SVGtoPNG";
import { SVGtoJPG } from "./pages/image/svg/SVGtoJPG";
import { SVGtoPDF } from "./pages/image/svg/SVGtoPDF";
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
import { PNGtoPDF } from "./components/tools/PNGtoPDF";
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
{/*svg*/}
import { SVGtoPNG } from "./pages/image/svg/SVGtoPNG";
import { SVGtoJPG } from "./pages/image/svg/SVGtoJPG";
import { SVGtoPDF } from "./pages/image/svg/SVGtoPDF";
{/*heic*/}
import { HEICtoJPG } from "./pages/image/heic/HEICtoJPG";
import { HEICtoPNG } from "./pages/image/heic/HEICtoPNG";
import { HEICtoWEBP } from "./pages/image/heic/HEICtoWEBP";


{/*pdf*/ }
import { PDFtoWord } from "./pages/pdf/PDFtoWord";
import { BackgroundGenerator } from "./pages/tools/BackgroundGenerator";
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
            


            


            


            <Route path="/gif-to-jpg-frame" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/gif-to-png" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/gif-to-webp" element={<Layout><JPGtoPNG /></Layout>} />

            <Route path="/svg-to-png" element={<Layout><SVGtoPNG /></Layout>} />
            <Route path="/svg-to-jpg" element={<Layout><SVGtoJPG /></Layout>} />
            <Route path="/svg-to-pdf" element={<Layout><SVGtoPDF /></Layout>} />

            <Route path="/heic-to-jpg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/heic-to-png" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/heic-to-webp" element={<Layout><JPGtoPNG /></Layout>} />

            <Route path="/doc-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/doc-to-txt" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/doc-to-html" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/doc-to-jpg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/docx-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/docx-to-txt" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/docx-to-html" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/docx-to-jpg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/pdf-to-docx" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/pdf-to-jpg" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/pdf-to-png" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/pdf-to-txt" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/pdf-to-pptx" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/txt-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/txt-to-docx" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/txt-to-html" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/rtf-to-docx" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/rtf-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/rtf-to-txt" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/html-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/html-to-docx" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/html-to-txt" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/odt-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/odt-to-docx" element={<Layout><JPGtoPNG /></Layout>} />

            <Route path="/xls-to-csv" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/xls-to-ods" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/xls-to-json" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/xls-to-xml" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/xlsx-to-csv" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/xlsx-to-ods" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/xlsx-to-json" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/xlsx-to-xml" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/csv-to-xlsx" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/csv-to-json" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/csv-to-xml" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/ods-to-xlsx" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/ods-to-csv" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/json-to-csv" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/json-to-xlsx" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/json-to-pdf" element={<Layout><JPGtoPNG /></Layout>} />

            <Route path="/mp4-to-avi" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mp4-to-mov" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mp4-to-mkv" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mp4-to-webm" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mp4-to-gif" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/avi-to-mp4" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/avi-to-mov" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/avi-to-mkv" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/avi-to-webm" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mov-to-mp4" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mov-to-avi" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mov-to-webm" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mkv-to-mp4" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mkv-to-avi" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/mkv-to-mov" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/webm-to-mp4" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/webm-to-avi" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/webm-to-gif" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/gif-to-mp4" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/gif-to-webm" element={<Layout><JPGtoPNG /></Layout>} />

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
            <Route path="/background-generator" element={<Layout><BackgroundGenerator /></Layout>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
