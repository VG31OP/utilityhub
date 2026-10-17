'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Minimize, Download } from 'lucide-react';

export default function JsMinifierPage() {
  const tool = getToolById('js-minifier');
  const [input, setInput] = useState(`// Calculate user total discount
function calculateTotal(items, discountRate) {
  /* sum up all items */
  let subtotal = 0;
  for (let i = 0; i < items.length; i++) {
    subtotal += items[i].price * items[i].quantity;
  }

  // apply discount
  const finalPrice = subtotal - (subtotal * discountRate);
  return finalPrice;
}`);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const minifyJs = (src) => {
    return src
      .replace(/\/\*[\s\S]*?\*\//g, '')     // remove multi-line comments
      .replace(/\/\/[^\n\r]*/g, '')          // remove single-line comments
      .replace(/\r\n/g, '\n')
      .split('\n')
      .map(line => line.trim())
      .filter(Boolean)
      .join(' ')
      .replace(/\s*([=+\-*\/%&|^!~?:;,<>{}()[\]])\s*/g, '$1') // remove spaces around operators/delimiters
      .trim();
  };

  const handleMinify = () => {
    setOutput(minifyJs(input));
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
    const blob = new Blob([output], { type: 'application/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'script.min.js';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Input JavaScript</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{originalSize} bytes</span>
        </div>
        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
            rows={10}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your unminified JavaScript here..."
          />
          <div style={{ marginTop: 14 }}>
            <button className="btn btn-primary btn-sm" onClick={handleMinify}>
              <Minimize size={14} /> Minify JavaScript
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
