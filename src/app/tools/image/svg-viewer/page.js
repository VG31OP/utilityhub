'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, Sparkles, Upload } from 'lucide-react';

const DEFAULT_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FF6B6B" />
      <stop offset="100%" stop-color="#4ECDC4" />
    </linearGradient>
  </defs>
  <circle cx="50" cy="50" r="45" fill="url(#grad)" />
  <path d="M35 50 L45 60 L65 40" stroke="#FFFFFF" stroke-width="6" stroke-linecap="round" stroke-linejoin="round" fill="none" />
</svg>`;

export default function SvgViewerPage() {
  const tool = getToolById('svg-viewer');
  const [svgCode, setSvgCode] = useState(DEFAULT_SVG);
  const [copied, setCopied] = useState(false);

  const optimizeSvg = (code) => {
    return code
      .replace(/<!--[\s\S]*?-->/g, '')               // remove comments
      .replace(/<\?xml[\s\S]*?\?>/g, '')             // remove xml decl
      .replace(/<!DOCTYPE[\s\S]*?>/g, '')            // remove doctype
      .replace(/\s+/g, ' ')                          // collapse spaces
      .replace(/\s*([<>="':;])\s*/g, '$1')           // remove spaces around delimiters
      .trim();
  };

  const handleOptimize = () => {
    setSvgCode(optimizeSvg(svgCode));
  };

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setSvgCode(event.target.result);
    };
    reader.readAsText(file);
  };

  const copy = () => {
    navigator.clipboard.writeText(svgCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadSvg = () => {
    const blob = new Blob([svgCode], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'graphic.svg';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="image">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {/* Editor */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>SVG Source Code</span>
            <label className="btn btn-ghost btn-sm" style={{ cursor: 'pointer', padding: '2px 8px' }}>
              <Upload size={12} /> Upload SVG
              <input type="file" accept=".svg" onChange={handleUpload} style={{ display: 'none' }} />
            </label>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={svgCode}
              onChange={(e) => setSvgCode(e.target.value)}
              placeholder="Paste SVG code..."
            />
            <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
              <button className="btn btn-primary btn-sm" onClick={handleOptimize}>
                <Sparkles size={14} /> Optimize / Minify SVG
              </button>
              <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy SVG'}
              </button>
              <button className="btn btn-secondary btn-sm" onClick={downloadSvg}>
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="tool-panel-header"><span>Live Visual Rendering</span></div>
          <div
            className="tool-panel-body"
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'repeating-conic-gradient(#202030 0% 25%, #151522 0% 50%) 50% / 20px 20px',
              borderRadius: 12,
              padding: 24,
              minHeight: 250,
            }}
            dangerouslySetInnerHTML={{ __html: svgCode }}
          />
        </div>
      </div>
    </ToolLayout>
  );
}
