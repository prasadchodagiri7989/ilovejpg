// Script to generate sitemap.xml during build
import { writeFileSync } from 'fs';
import { resolve } from 'path';

const baseUrl = 'https://ilovejpg.in';
const today = new Date().toISOString().split('T')[0];

// All tool categories and their tools
const imageTools = [
  'jpg-to-png', 'jpg-to-webp', 'jpg-to-bmp', 'jpg-to-gif', 'jpg-to-tiff', 'jpg-to-pdf', 'jpg-to-svg',
  'jpeg-to-png', 'jpeg-to-webp', 'jpeg-to-bmp', 'jpeg-to-gif', 'jpeg-to-tiff', 'jpeg-to-pdf', 'jpeg-to-svg',
  'png-to-jpg', 'png-to-webp', 'png-to-bmp', 'png-to-gif', 'png-to-tiff', 'png-to-pdf', 'png-to-svg',
  'webp-to-jpg', 'webp-to-png', 'webp-to-gif',
  'bmp-to-jpg', 'bmp-to-png', 'bmp-to-pdf',
  'gif-to-jpg-frame', 'gif-to-png', 'gif-to-webp',
  'svg-to-png', 'svg-to-jpg', 'svg-to-pdf',
  'heic-to-jpg', 'heic-to-png', 'heic-to-webp'
];

const pdfTools = [
  'doc-to-pdf', 'doc-to-txt', 'doc-to-html', 'doc-to-jpg',
  'docx-to-pdf', 'docx-to-txt', 'docx-to-html', 'docx-to-jpg',
  'pdf-to-docx', 'pdf-to-jpg', 'pdf-to-png', 'pdf-to-txt', 'pdf-to-pptx',
  'txt-to-pdf', 'txt-to-docx', 'txt-to-html',
  'rtf-to-docx', 'rtf-to-pdf', 'rtf-to-txt',
  'html-to-pdf', 'html-to-docx', 'html-to-txt',
  'odt-to-pdf', 'odt-to-docx'
];

const spreadsheetTools = [
  'xls-to-csv', 'xls-to-ods', 'xls-to-json', 'xls-to-xml',
  'xlsx-to-csv', 'xlsx-to-ods', 'xlsx-to-json', 'xlsx-to-xml',
  'csv-to-xlsx', 'csv-to-json', 'csv-to-xml',
  'ods-to-xlsx', 'ods-to-csv',
  'json-to-csv', 'json-to-xlsx', 'json-to-pdf', 'json-to-xml'
];

const utilityTools = [
  'alarm-clock', 'background-generator', 'bar-graph-maker', 'base64-decode', 'base64-encode',
  'base64-to-image', 'calendar', 'call-recorder', 'camera-online', 'character-counter',
  'chart-maker', 'click-counter', 'color-picker-from-image', 'color-tester', 'countdown-timer',
  'cps-test', 'current-time', 'grocery-list', 'html-editor', 'html-link-generator',
  'html-table-generator', 'http-header-checker', 'http-status-checker', 'image-to-base64',
  'image-to-pdf', 'image-to-text', 'line-counter', 'line-graph-maker', 'mic-test',
  'online-clock', 'online-mirror', 'online-notepad', 'online-notes', 'password-generator',
  'pdf-reader', 'pdf-viewer', 'pie-chart-maker', 'pixel-ruler', 'random-number-generator',
  'redirect-generator', 'ruler-cm', 'ruler-inch', 'scatter-plot', 'scoreboard',
  'screen-recorder', 'screen-resolution', 'screenshot', 'speech-to-text', 'stopwatch',
  'svg-viewer', 'table-chart-maker', 'text-editor', 'text-to-speech', 'todo-list',
  'tone-generator', 'url-decode', 'url-encode', 'voice-recorder', 'webcam-test',
  'window-size', 'word-counter', 'word-frequency'
];

const allTools = [
  ...imageTools,
  ...pdfTools,
  ...spreadsheetTools,
  ...utilityTools
];

const categories = ['image', 'pdf', 'spreadsheet', 'video', 'audio', 'archive', 'design', 'ebook', 'utility'];

const urls = [
  { loc: baseUrl, priority: '1.0', changefreq: 'daily' },
  ...categories.map(cat => ({
    loc: `${baseUrl}/tools/${cat}`,
    priority: '0.9',
    changefreq: 'weekly'
  })),
  ...allTools.map(tool => ({
    loc: `${baseUrl}/${tool}`,
    priority: '0.8',
    changefreq: 'weekly'
  }))
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

// Write to public directory
writeFileSync(resolve(process.cwd(), 'public/sitemap.xml'), sitemap);
console.log('✅ Sitemap generated successfully!');
