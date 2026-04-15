import React from 'react';
import { 
  imageTools, 
  pdfTools, 
  spreadsheetTools, 
  videoTools, 
  audioTools, 
  archiveTools, 
  designTools, 
  ebookTools,
  utilityTools 
} from '@/data/tools-data';

interface SitemapEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export const generateSitemap = (): string => {
  const baseUrl = 'https://ilovejpg.in';
  const today = new Date().toISOString().split('T')[0];
  
  const entries: SitemapEntry[] = [
    {
      loc: baseUrl,
      lastmod: today,
      changefreq: 'daily',
      priority: '1.0'
    }
  ];

  // Add all tool pages
  const allTools = [
    ...imageTools,
    ...pdfTools,
    ...spreadsheetTools,
    ...videoTools,
    ...audioTools,
    ...archiveTools,
    ...designTools,
    ...ebookTools,
    ...utilityTools
  ];

  allTools.forEach(tool => {
    entries.push({
      loc: `${baseUrl}/${tool.slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.8'
    });
  });

  // Add category pages
  const categories = ['image', 'pdf', 'spreadsheet', 'video', 'audio', 'archive', 'design', 'ebook', 'utility'];
  categories.forEach(category => {
    entries.push({
      loc: `${baseUrl}/tools/${category}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.7'
    });
  });

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${entries.map(entry => `  <url>
    <loc>${entry.loc}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return xml;
};

// Function to download sitemap
export const downloadSitemap = () => {
  const xml = generateSitemap();
  const blob = new Blob([xml], { type: 'application/xml' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'sitemap.xml';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// Generate sitemap on build (you would run this in a build script)
if (typeof window === 'undefined') {
  // Node.js environment
  console.log(generateSitemap());
}
