'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, ArrowRightLeft } from 'lucide-react';

export default function MdToHtmlPage() {
  const tool = getToolById('md-to-html');
  const [md, setMd] = useState(`# Welcome to UtilityHub

This is a **live Markdown to HTML** converter.

### Key Highlights:
- *Instant* rendering
- 100% Client-side
- [Visit GitHub](https://github.com)

> "Simplicity is the ultimate sophistication."

\`\`\`javascript
console.log("Hello World");
\`\`\`
`);
  const [htmlOutput, setHtmlOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertMdToHtml = (src) => {
    let out = src
      // Headers
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // Blockquote
      .replace(/^\> (.*$)/gim, '<blockquote>$1</blockquote>')
      // Code blocks
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      // Inline code
      .replace(/`([^`]+)`/gim, '<code>$1</code>')
      // Bold & Italic
      .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/gim, '<em>$1</em>')
      // Links & Images
      .replace(/!\[(.*?)\]\((.*?)\)/gim, '<img alt="$1" src="$2" />')
      .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2">$1</a>')
      // Unordered lists
      .replace(/^\s*\-\s(.*$)/gim, '<li>$1</li>')
      // Paragraphs
      .replace(/\n\n+/g, '</p>\n<p>');

    return `<p>${out.trim()}</p>`;
  };

  const handleConvert = () => {
    setHtmlOutput(convertMdToHtml(md));
  };

  const copy = () => {
    navigator.clipboard.writeText(htmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadHtml = () => {
    const blob = new Blob([htmlOutput], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="file">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Markdown Input</span></div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={md}
              onChange={(e) => setMd(e.target.value)}
              placeholder="Type Markdown..."
            />
            <div style={{ marginTop: 14 }}>
              <button className="btn btn-primary btn-sm" onClick={handleConvert}>
                <ArrowRightLeft size={14} /> Convert to HTML
              </button>
            </div>
          </div>
        </div>

        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>HTML Markup</span>
            {htmlOutput && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={downloadHtml}>
                  <Download size={14} /> Download .html
                </button>
              </div>
            )}
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={htmlOutput}
              readOnly
              placeholder="Click Convert to see HTML..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
