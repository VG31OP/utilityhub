'use client';

import Link from 'next/link';

const tickerItems = [
  { id: 'json-formatter', name: 'JSON Formatter', cat: 'developer', icon: '⚡', color: '#818CF8' },
  { id: 'qr-generator', name: 'QR Code Generator', cat: 'image', icon: '📱', color: '#38BDF8' },
  { id: 'password-generator', name: 'Password Vault', cat: 'security', icon: '🔒', color: '#10B981' },
  { id: 'markdown-editor', name: 'Live Markdown', cat: 'text', icon: '📝', color: '#F43F5E' },
  { id: 'unix-timestamp', name: 'Unix Epoch Time', cat: 'developer', icon: '⏱️', color: '#F59E0B' },
  { id: 'base64', name: 'Base64 Encoder', cat: 'developer', icon: '🔤', color: '#A855F7' },
  { id: 'color-picker', name: 'Color Palette Studio', cat: 'image', icon: '🎨', color: '#EC4899' },
  { id: 'regex-tester', name: 'Regex Visualizer', cat: 'developer', icon: '🧪', color: '#06B6D4' },
  { id: 'diff-checker', name: 'Code & Text Diff', cat: 'developer', icon: '🔍', color: '#3B82F6' },
  { id: 'unit-converter', name: 'Unit & Currency', cat: 'math', icon: '📐', color: '#10B981' },
  { id: 'aspect-ratio', name: 'Aspect Ratio Calculator', cat: 'image', icon: '🖼️', color: '#6366F1' },
  { id: 'jwt-decoder', name: 'JWT Token Inspector', cat: 'developer', icon: '🎫', color: '#F97316' },
];

export default function Ticker() {
  // Duplicate for seamless infinite loop
  const doubleItems = [...tickerItems, ...tickerItems];

  return (
    <div className="motion-ticker-container">
      <div className="motion-ticker-track">
        {doubleItems.map((item, idx) => (
          <Link
            key={`${item.id}-${idx}`}
            href={`/tools/${item.cat}/${item.id}`}
            className="motion-ticker-item"
          >
            <span className="motion-ticker-icon">{item.icon}</span>
            <span className="motion-ticker-name">{item.name}</span>
            <span
              className="motion-ticker-dot"
              style={{ background: item.color }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
