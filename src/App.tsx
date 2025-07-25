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
            <Route path="/jpgtopng" element={<Layout><JPGtoPNG /></Layout>} />
            <Route path="/jpgtowebp" element={<Layout><JPGtoWEBP /></Layout>} />
            {/* Add more routes here like /pngtopdf, /imagetopdf, etc. */}
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
