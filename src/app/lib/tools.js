// Tool Registry — All tools organized by category
import {
  Type, CaseSensitive, TextCursorInput, GitCompareArrows, FileText, Search, Link2, ListFilter,
  RotateCcw, ArrowDownAZ, Code2, BookOpen,
  QrCode, Palette, Image, FileCode, Globe, LayoutGrid, Pipette, RulerIcon, Columns, Monitor,
  Braces, Binary, Regex, Paintbrush, Hash, KeyRound, Link, Info, Clock, Fingerprint,
  IdCard, FileCode2, Minimize2, Minimize, GitBranch,
  Calculator, ArrowLeftRight, Percent, Landmark, Receipt, CalendarDays, Heart, Tag,
  ToggleLeft, BarChart3, Divide, LetterText,
  Tags, Eye, Map, Bot, FileJson, Scroll, Gauge, ExternalLink, SearchCheck, Anchor,
  HashIcon, MessageCircle, Smartphone, ImageIcon, AlignLeft, TrendingUp, Calendar, AtSign,
  Timer, CheckSquare, StickyNote, Target, Hourglass, Watch, DollarSign, LayoutDashboard,
  Crosshair, Trophy,
  FileSpreadsheet, ArrowRightLeft, HardDrive, FileType, FileUp, FileDown, FileOutput, Rows,
  Database, Shuffle,
  Lock, Shield, KeySquare, ServerCrash, ShieldCheck, ShieldAlert, FolderLock, Blocks,
  PaintBucket, Blend, BoxSelect, Circle, LayoutIcon, Grid3x3, Glasses, Layers, Contrast, Droplets,
  Sparkles, PenTool, MessageSquare, Lightbulb, Wand2
} from 'lucide-react';

export const categories = [
  {
    id: 'text',
    name: 'Text Tools',
    description: 'Transform, analyze, and manipulate text effortlessly',
    icon: '📝',
    gradient: 'coral',
    color: '#FF6B6B',
    bgColor: 'rgba(255, 107, 107, 0.15)',
  },
  {
    id: 'image',
    name: 'Image Tools',
    description: 'Generate QR codes, pick colors, and work with images',
    icon: '🖼️',
    gradient: 'teal',
    color: '#4ECDC4',
    bgColor: 'rgba(78, 205, 196, 0.15)',
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'JSON, regex, encoding, hashing, and more for devs',
    icon: '👨‍💻',
    gradient: 'purple',
    color: '#A855F7',
    bgColor: 'rgba(168, 85, 247, 0.15)',
  },
  {
    id: 'math',
    name: 'Math & Finance',
    description: 'Calculators, converters, and financial tools',
    icon: '🔢',
    gradient: 'blue',
    color: '#3B82F6',
    bgColor: 'rgba(59, 130, 246, 0.15)',
  },
  {
    id: 'seo',
    name: 'SEO & Web Tools',
    description: 'Optimize your website for search engines',
    icon: '🌐',
    gradient: 'pink',
    color: '#EC4899',
    bgColor: 'rgba(236, 72, 153, 0.15)',
  },
  {
    id: 'social',
    name: 'Social Media Tools',
    description: 'Create content and grow your social presence',
    icon: '📱',
    gradient: 'amber',
    color: '#F59E0B',
    bgColor: 'rgba(245, 158, 11, 0.15)',
  },
  {
    id: 'productivity',
    name: 'Productivity Tools',
    description: 'Stay focused and organized with powerful tools',
    icon: '⏱️',
    gradient: 'emerald',
    color: '#10B981',
    bgColor: 'rgba(16, 185, 129, 0.15)',
  },
  {
    id: 'file',
    name: 'File & Data Tools',
    description: 'Convert, transform, and process your data files',
    icon: '📄',
    gradient: 'rose',
    color: '#F43F5E',
    bgColor: 'rgba(244, 63, 94, 0.15)',
  },
  {
    id: 'security',
    name: 'Security Tools',
    description: 'Passwords, encryption, and security utilities',
    icon: '🔒',
    gradient: 'sky',
    color: '#0EA5E9',
    bgColor: 'rgba(14, 165, 233, 0.15)',
  },
  {
    id: 'color',
    name: 'Color & Design',
    description: 'CSS generators, palettes, and design utilities',
    icon: '🎨',
    gradient: 'lime',
    color: '#84CC16',
    bgColor: 'rgba(132, 204, 22, 0.15)',
  },
  {
    id: 'ai',
    name: 'AI-Powered Tools',
    description: 'Smart tools powered by artificial intelligence',
    icon: '🤖',
    gradient: 'hero',
    color: '#C084FC',
    bgColor: 'rgba(168, 85, 247, 0.15)',
  },
];

export const tools = [
  // ============ TEXT TOOLS ============
  { id: 'word-counter', name: 'Word & Character Counter', description: 'Count words, characters, sentences, and paragraphs', category: 'text', icon: Type },
  { id: 'case-converter', name: 'Case Converter', description: 'Convert text between upper, lower, title, and more', category: 'text', icon: CaseSensitive },
  { id: 'lorem-ipsum', name: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your designs', category: 'text', icon: TextCursorInput },
  { id: 'text-diff', name: 'Text Diff Checker', description: 'Compare two texts and find the differences', category: 'text', icon: GitCompareArrows },
  { id: 'markdown-editor', name: 'Markdown Editor', description: 'Write and preview Markdown in real-time', category: 'text', icon: FileText },
  { id: 'find-replace', name: 'Find & Replace', description: 'Find and replace text with regex support', category: 'text', icon: Search },
  { id: 'slug-generator', name: 'Text to Slug', description: 'Convert text into URL-friendly slugs', category: 'text', icon: Link2 },
  { id: 'remove-duplicates', name: 'Remove Duplicate Lines', description: 'Remove duplicate lines from your text', category: 'text', icon: ListFilter },
  { id: 'text-reverser', name: 'Text Reverser', description: 'Reverse text, words, or lines', category: 'text', icon: RotateCcw },
  { id: 'sort-lines', name: 'Sort Lines', description: 'Sort lines alphabetically, numerically, or by length', category: 'text', icon: ArrowDownAZ },
  { id: 'string-encoder', name: 'String Encoder/Decoder', description: 'Encode/decode URL, HTML entities, and more', category: 'text', icon: Code2 },
  { id: 'text-statistics', name: 'Text Statistics', description: 'Reading time, sentence count, and readability', category: 'text', icon: BookOpen },

  // ============ IMAGE TOOLS ============
  { id: 'qr-generator', name: 'QR Code Generator', description: 'Generate QR codes for any text or URL', category: 'image', icon: QrCode },
  { id: 'color-picker', name: 'Color Picker', description: 'Pick colors in HEX, RGB, and HSL formats', category: 'image', icon: Palette },
  { id: 'image-to-base64', name: 'Image to Base64', description: 'Convert images to Base64 encoded strings', category: 'image', icon: Image },
  { id: 'svg-viewer', name: 'SVG Viewer & Optimizer', description: 'View, edit, and optimize SVG files', category: 'image', icon: FileCode },
  { id: 'favicon-generator', name: 'Favicon Generator', description: 'Create favicons from text or emoji', category: 'image', icon: Globe },
  { id: 'placeholder-image', name: 'Placeholder Image', description: 'Generate placeholder images with custom sizes', category: 'image', icon: LayoutGrid },
  { id: 'color-extractor', name: 'Image Color Extractor', description: 'Extract dominant colors from images', category: 'image', icon: Pipette },
  { id: 'aspect-ratio', name: 'Aspect Ratio Calculator', description: 'Calculate and convert aspect ratios', category: 'image', icon: RulerIcon },
  { id: 'image-compare', name: 'Image Comparison Slider', description: 'Compare two images side by side', category: 'image', icon: Columns },
  { id: 'screenshot-mockup', name: 'Screenshot Mockup', description: 'Create device mockups for your screenshots', category: 'image', icon: Monitor },

  // ============ DEVELOPER TOOLS ============
  { id: 'json-formatter', name: 'JSON Formatter', description: 'Format, validate, and beautify JSON data', category: 'developer', icon: Braces },
  { id: 'base64', name: 'Base64 Encoder/Decoder', description: 'Encode and decode Base64 strings', category: 'developer', icon: Binary },
  { id: 'regex-tester', name: 'Regex Tester', description: 'Test regular expressions with live matching', category: 'developer', icon: Regex },
  { id: 'code-beautifier', name: 'Code Beautifier', description: 'Beautify JavaScript, CSS, HTML, and SQL', category: 'developer', icon: Paintbrush },
  { id: 'hash-generator', name: 'Hash Generator', description: 'Generate MD5, SHA-1, SHA-256, SHA-512 hashes', category: 'developer', icon: Hash },
  { id: 'jwt-decoder', name: 'JWT Decoder', description: 'Decode and inspect JSON Web Tokens', category: 'developer', icon: KeyRound },
  { id: 'url-parser', name: 'URL Parser', description: 'Parse and analyze URL components', category: 'developer', icon: Link },
  { id: 'http-status', name: 'HTTP Status Codes', description: 'Reference for all HTTP status codes', category: 'developer', icon: Info },
  { id: 'cron-generator', name: 'Cron Expression Generator', description: 'Build and explain cron expressions', category: 'developer', icon: Clock },
  { id: 'unix-timestamp', name: 'Unix Timestamp Converter', description: 'Convert between Unix timestamps and dates', category: 'developer', icon: Clock },
  { id: 'uuid-generator', name: 'UUID Generator', description: 'Generate random UUIDs v4', category: 'developer', icon: Fingerprint },
  { id: 'html-entities', name: 'HTML Entity Encoder', description: 'Encode and decode HTML entities', category: 'developer', icon: Code2 },
  { id: 'css-minifier', name: 'CSS Minifier', description: 'Minify CSS code to reduce file size', category: 'developer', icon: Minimize2 },
  { id: 'js-minifier', name: 'JavaScript Minifier', description: 'Minify JavaScript code', category: 'developer', icon: Minimize },
  { id: 'diff-checker', name: 'Code Diff Checker', description: 'Compare two code snippets and show differences', category: 'developer', icon: GitBranch },

  // ============ MATH & FINANCE ============
  { id: 'calculator', name: 'Scientific Calculator', description: 'Full-featured scientific calculator', category: 'math', icon: Calculator },
  { id: 'unit-converter', name: 'Unit Converter', description: 'Convert between units of length, weight, temperature, and more', category: 'math', icon: ArrowLeftRight },
  { id: 'percentage-calc', name: 'Percentage Calculator', description: 'Calculate percentages quickly', category: 'math', icon: Percent },
  { id: 'loan-calculator', name: 'Loan/EMI Calculator', description: 'Calculate loan EMIs and interest', category: 'math', icon: Landmark },
  { id: 'tip-calculator', name: 'Tip Calculator', description: 'Calculate tips and split bills', category: 'math', icon: Receipt },
  { id: 'age-calculator', name: 'Age Calculator', description: 'Calculate exact age from birth date', category: 'math', icon: CalendarDays },
  { id: 'bmi-calculator', name: 'BMI Calculator', description: 'Calculate Body Mass Index', category: 'math', icon: Heart },
  { id: 'discount-calculator', name: 'Discount Calculator', description: 'Calculate discount amounts and final prices', category: 'math', icon: Tag },
  { id: 'number-base', name: 'Number Base Converter', description: 'Convert between binary, octal, decimal, hex', category: 'math', icon: ToggleLeft },
  { id: 'statistics-calc', name: 'Statistics Calculator', description: 'Calculate mean, median, mode, and standard deviation', category: 'math', icon: BarChart3 },
  { id: 'fraction-calc', name: 'Fraction Calculator', description: 'Add, subtract, multiply, and divide fractions', category: 'math', icon: Divide },
  { id: 'roman-numeral', name: 'Roman Numeral Converter', description: 'Convert between Roman and decimal numbers', category: 'math', icon: LetterText },

  // ============ SEO & WEB TOOLS ============
  { id: 'meta-tag', name: 'Meta Tag Generator', description: 'Generate meta tags for SEO', category: 'seo', icon: Tags },
  { id: 'og-preview', name: 'Open Graph Preview', description: 'Preview Open Graph social sharing cards', category: 'seo', icon: Eye },
  { id: 'sitemap-generator', name: 'Sitemap Generator', description: 'Generate XML sitemaps for your website', category: 'seo', icon: Map },
  { id: 'robots-txt', name: 'Robots.txt Generator', description: 'Create robots.txt files easily', category: 'seo', icon: Bot },
  { id: 'schema-markup', name: 'Schema Markup Generator', description: 'Generate structured data JSON-LD', category: 'seo', icon: FileJson },
  { id: 'keyword-density', name: 'Keyword Density Checker', description: 'Analyze keyword frequency in text', category: 'seo', icon: Scroll },
  { id: 'page-speed', name: 'Page Speed Checklist', description: 'Optimization checklist for page speed', category: 'seo', icon: Gauge },
  { id: 'redirect-checker', name: 'Redirect Chain Checker', description: 'Check URL redirect chains', category: 'seo', icon: ExternalLink },
  { id: 'serp-preview', name: 'Google SERP Preview', description: 'Preview how your page looks in Google', category: 'seo', icon: SearchCheck },
  { id: 'canonical-url', name: 'Canonical URL Generator', description: 'Generate canonical URL tags', category: 'seo', icon: Anchor },

  // ============ SOCIAL MEDIA TOOLS ============
  { id: 'hashtag-generator', name: 'Hashtag Generator', description: 'Generate relevant hashtags for your posts', category: 'social', icon: HashIcon },
  { id: 'bio-generator', name: 'Social Bio Generator', description: 'Create engaging social media bios', category: 'social', icon: MessageCircle },
  { id: 'char-counter', name: 'Post Character Counter', description: 'Count characters for Twitter, LinkedIn, IG', category: 'social', icon: Smartphone },
  { id: 'image-size-guide', name: 'Social Image Sizes', description: 'Image size guide for all platforms', category: 'social', icon: ImageIcon },
  { id: 'post-formatter', name: 'Post Formatter', description: 'Format posts with Unicode styles', category: 'social', icon: AlignLeft },
  { id: 'engagement-calc', name: 'Engagement Rate Calculator', description: 'Calculate your engagement rate', category: 'social', icon: TrendingUp },
  { id: 'social-calendar', name: 'Content Calendar', description: 'Plan your social media content', category: 'social', icon: Calendar },
  { id: 'username-checker', name: 'Username Checker', description: 'Check username availability across platforms', category: 'social', icon: AtSign },

  // ============ PRODUCTIVITY TOOLS ============
  { id: 'pomodoro', name: 'Pomodoro Timer', description: '25/5 minute work-break timer', category: 'productivity', icon: Timer },
  { id: 'todo-list', name: 'Todo List', description: 'Simple and effective todo list', category: 'productivity', icon: CheckSquare },
  { id: 'notes', name: 'Quick Notes', description: 'Take notes with auto-save', category: 'productivity', icon: StickyNote },
  { id: 'habit-tracker', name: 'Habit Tracker', description: 'Track your daily habits', category: 'productivity', icon: Target },
  { id: 'countdown', name: 'Countdown Timer', description: 'Countdown to any date or event', category: 'productivity', icon: Hourglass },
  { id: 'stopwatch', name: 'Stopwatch', description: 'Precise stopwatch with laps', category: 'productivity', icon: Watch },
  { id: 'meeting-cost', name: 'Meeting Cost Calculator', description: 'Calculate the cost of your meetings', category: 'productivity', icon: DollarSign },
  { id: 'daily-planner', name: 'Daily Planner', description: 'Plan your day hour by hour', category: 'productivity', icon: LayoutDashboard },
  { id: 'eisenhower', name: 'Eisenhower Matrix', description: 'Prioritize tasks by urgency and importance', category: 'productivity', icon: Crosshair },
  { id: 'smart-goals', name: 'SMART Goal Setter', description: 'Create Specific, Measurable, Achievable goals', category: 'productivity', icon: Trophy },

  // ============ FILE & DATA TOOLS ============
  { id: 'csv-to-json', name: 'CSV to JSON', description: 'Convert CSV data to JSON format', category: 'file', icon: FileSpreadsheet },
  { id: 'json-to-csv', name: 'JSON to CSV', description: 'Convert JSON data to CSV format', category: 'file', icon: ArrowRightLeft },
  { id: 'file-size', name: 'File Size Converter', description: 'Convert between bytes, KB, MB, GB, TB', category: 'file', icon: HardDrive },
  { id: 'xml-to-json', name: 'XML to JSON', description: 'Convert XML data to JSON format', category: 'file', icon: FileType },
  { id: 'yaml-to-json', name: 'YAML to JSON', description: 'Convert between YAML and JSON', category: 'file', icon: FileUp },
  { id: 'md-to-html', name: 'Markdown to HTML', description: 'Convert Markdown to HTML', category: 'file', icon: FileDown },
  { id: 'html-to-md', name: 'HTML to Markdown', description: 'Convert HTML to Markdown', category: 'file', icon: FileOutput },
  { id: 'tsv-to-json', name: 'TSV to JSON', description: 'Convert TSV data to JSON format', category: 'file', icon: Rows },
  { id: 'sql-formatter', name: 'SQL Formatter', description: 'Format and beautify SQL queries', category: 'file', icon: Database },
  { id: 'mock-data', name: 'Mock Data Generator', description: 'Generate fake data for testing', category: 'file', icon: Shuffle },

  // ============ SECURITY TOOLS ============
  { id: 'password-generator', name: 'Password Generator', description: 'Generate strong, secure passwords', category: 'security', icon: Lock },
  { id: 'password-strength', name: 'Password Strength Checker', description: 'Check how strong your password is', category: 'security', icon: Shield },
  { id: 'encryption', name: 'Text Encryption', description: 'Encrypt and decrypt text with AES', category: 'security', icon: KeySquare },
  { id: 'rsa-keygen', name: 'RSA Key Generator', description: 'Generate RSA key pairs', category: 'security', icon: ServerCrash },
  { id: 'ssl-decoder', name: 'SSL Certificate Decoder', description: 'Decode and inspect SSL certificates', category: 'security', icon: ShieldCheck },
  { id: 'cors-generator', name: 'CORS Header Generator', description: 'Generate CORS headers for your API', category: 'security', icon: ShieldAlert },
  { id: 'csp-generator', name: 'CSP Generator', description: 'Generate Content Security Policy headers', category: 'security', icon: FolderLock },
  { id: 'bcrypt-generator', name: 'Bcrypt Hash Generator', description: 'Generate bcrypt password hashes', category: 'security', icon: Blocks },

  // ============ COLOR & DESIGN ============
  { id: 'palette-generator', name: 'Palette Generator', description: 'Generate beautiful color palettes', category: 'color', icon: PaintBucket },
  { id: 'gradient-maker', name: 'Gradient Maker', description: 'Create CSS gradients visually', category: 'color', icon: Blend },
  { id: 'box-shadow', name: 'Box Shadow Generator', description: 'Generate CSS box shadows visually', category: 'color', icon: BoxSelect },
  { id: 'border-radius', name: 'Border Radius Generator', description: 'Generate border-radius CSS', category: 'color', icon: Circle },
  { id: 'flexbox-generator', name: 'Flexbox Generator', description: 'Visual CSS flexbox playground', category: 'color', icon: LayoutIcon },
  { id: 'grid-generator', name: 'CSS Grid Generator', description: 'Visual CSS grid layout builder', category: 'color', icon: Grid3x3 },
  { id: 'glassmorphism', name: 'Glassmorphism Generator', description: 'Generate glassmorphism CSS effects', category: 'color', icon: Glasses },
  { id: 'neumorphism', name: 'Neumorphism Generator', description: 'Generate neumorphic design CSS', category: 'color', icon: Layers },
  { id: 'contrast-checker', name: 'Color Contrast Checker', description: 'Check WCAG color contrast ratios', category: 'color', icon: Contrast },
  { id: 'tailwind-colors', name: 'Tailwind Color Converter', description: 'Convert colors to Tailwind classes', category: 'color', icon: Droplets },

  // ============ AI-POWERED TOOLS ============
  { id: 'text-summarizer', name: 'Text Summarizer', description: 'Summarize long texts automatically', category: 'ai', icon: Sparkles },
  { id: 'paraphraser', name: 'Paraphraser', description: 'Rewrite text in different styles', category: 'ai', icon: PenTool },
  { id: 'grammar-checker', name: 'Grammar Checker', description: 'Check grammar and spelling', category: 'ai', icon: MessageSquare },
  { id: 'content-ideas', name: 'Content Idea Generator', description: 'Generate content ideas for any topic', category: 'ai', icon: Lightbulb },
  { id: 'ai-writer', name: 'AI Writing Assistant', description: 'AI-powered writing help', category: 'ai', icon: Wand2 },
];

export function getToolsByCategory(categoryId) {
  return tools.filter(t => t.category === categoryId);
}

export function getCategoryById(categoryId) {
  return categories.find(c => c.id === categoryId);
}

export function getToolById(toolId) {
  return tools.find(t => t.id === toolId);
}

export function searchTools(query) {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return tools.filter(t =>
    t.name.toLowerCase().includes(q) ||
    t.description.toLowerCase().includes(q) ||
    t.category.toLowerCase().includes(q)
  );
}
