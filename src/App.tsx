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
{/*JPEG*/}
import { JPEGtoPNG } from "./pages/image/jpeg/JPEGtoPNG";
import { JPEGtoWEBP } from "./pages/image/jpeg/JPEGtoWEBP";
import { JPEGtoBMP } from "./pages/image/jpeg/JPEGtoBMP";
import { JPEGtoGIF } from "./pages/image/jpeg/JPEGtoGIF";
import { JPEGtoTIFF } from "./pages/image/jpeg/JPEGtoTIFF";
import { JPEGtoPDF } from "./pages/image/jpeg/JPEGtoPDF";
import { JPEGtoSVG } from "./pages/image/jpeg/JPEGtoSVG";
{/*png*/}
import { PNGtoJPG } from "./pages/image/png/PNGtoJPG";
import { PNGtoWEBP } from "./pages/image/png/PNGtoWEBP";
import { PNGtoBMP } from "./pages/image/png/PNGtoBMP";
import { PNGtoGIF } from "./pages/image/png/PNGtoGIF";
import { PNGtoTIFF } from "./pages/image/png/PNGtoTIFF";
import { PNGtoPDF } from "./components/tools/PNGtoPDF";
import { PNGtoSVG } from "./pages/image/png/PNGtoSVG";
{/*webp*/}
import { WEBPtoJPG } from "./pages/image/webp/WEBPtoJPG";
import { WEBPtoPNG } from "./pages/image/webp/WEBPtoPNG";
import { WEBPtoGIF } from "./pages/image/webp/WEBPtoGIF";
{/*bmp*/}
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
            


            


            








             





            



            {/* Add more routes here like /pngtopdf, /imagetopdf, etc. */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
