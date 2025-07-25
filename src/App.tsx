// src/App.tsx

import React from "react";
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
import { JPGtoBMP } from "./pages/image/JPGtoBPM";

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
            <Route path="/jpg_to_png" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/jpg_to_webp" element={<Layout><JPGtoWEBP /></Layout>} />
            <Route path="/jpg_to_bmp" element={<Layout><JPGtoBMP /></Layout>} />

            {/* Add more routes here like /pngtopdf, /imagetopdf, etc. */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
