'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Minimize2, Download } from 'lucide-react';

export default function CssMinifierPage() {
  const tool = getToolById('css-minifier');
  const [input, setInput] = useState(`/* Main navigation bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  background-color: #0f172a;
  color: #ffffff;
}

/* Links */
.navbar a {
  text-decoration: none;
  color: inherit;
  transition: opacity 0.2s ease-in-out;
}

.navbar a:hover {
  opacity: 0.8;
}`);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const minifyCss = (css) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // strip comments
      .replace(/\s+/g, ' ')             // collapse whitespace
      .replace(/\s*([\{\}\:\;\,])\s*/g, '$1') // remove space around separators
      .replace(/;}/g, '}')             // remove trailing semicolon
      .trim();
  };

  const handleMinify = () => {
    setOutput(minifyCss(input));
  };

  const originalSize = new Blob([input]).size;
  const minifiedSize = new Blob([output]).size;
  const savings = originalSize > 0 && output ? Math.round(((originalSize - minifiedSize) / originalSize) * 100) : 0;

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadFile = () => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'style.min.css';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Input CSS</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{originalSize} bytes</span>
        </div>
        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unminified CSS here..."
          />
          <div style={{ marginTop: 14 }}>
            <button className="btn btn-primary btn-sm" onClick={handleMinify}>
              <Minimize2 size={14} /> Minify CSS
            </button>
          </div>
        </div>
      </div>

      {output && (
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Minified Output</span>
            <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--accent-teal)', fontWeight: 600 }}>
                {minifiedSize} bytes ({savings}% reduction)
              </span>
              <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button className="btn btn-secondary btn-sm" onClick={downloadFile}>
                <Download size={14} /> Download
              </button>
            </div>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={6}
              value={output}
              readOnly
            />
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
