'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function SortLinesPage() {
  const tool = getToolById('sort-lines');
  const [text, setText] = useState('');
  const [mode, setMode] = useState('az');
  const [copied, setCopied] = useState(false);

  const sorted = (() => {
    const lines = text.split('\n');
    switch (mode) {
      case 'az': return lines.sort((a, b) => a.localeCompare(b)).join('\n');
      case 'za': return lines.sort((a, b) => b.localeCompare(a)).join('\n');
      case 'short': return lines.sort((a, b) => a.length - b.length).join('\n');
      case 'long': return lines.sort((a, b) => b.length - a.length).join('\n');
      case 'random': return lines.sort(() => Math.random() - 0.5).join('\n');
      case 'numeric': return lines.sort((a, b) => parseFloat(a) - parseFloat(b)).join('\n');
      default: return text;
    }
  })();

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-workspace-split">
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Input Lines</span></div>
          <div className="tool-panel-body">
            <textarea className="form-textarea" placeholder="Enter lines to sort..." value={text} onChange={(e) => setText(e.target.value)} rows={12} />
          </div>
        </div>
        <div className="tool-panel">
          <div className="tool-panel-header">
            <span>Sorted Output</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-copy'}`} onClick={() => { navigator.clipboard.writeText(sorted); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <div className="tool-panel-body">
            <div className="tabs">
              {[['az','A → Z'],['za','Z → A'],['short','Short first'],['long','Long first'],['numeric','Numeric'],['random','Random']].map(([v, l]) => (
                <button key={v} className={`tab ${mode === v ? 'active' : ''}`} onClick={() => setMode(v)}>{l}</button>
              ))}
            </div>
            <div className="output-box" style={{ minHeight: 220 }}>{sorted || 'Sorted lines will appear here...'}</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
