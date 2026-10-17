'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function RemoveDuplicatesPage() {
  const tool = getToolById('remove-duplicates');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const lines = text.split('\n');
  const unique = [...new Set(lines)].join('\n');
  const removed = lines.length - unique.split('\n').length;

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-workspace-split">
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Input</span><span className="tool-panel-badge">{lines.length} lines</span></div>
          <div className="tool-panel-body">
            <textarea className="form-textarea" placeholder="Paste lines here..." value={text} onChange={(e) => setText(e.target.value)} rows={12} />
          </div>
        </div>
        <div className="tool-panel">
          <div className="tool-panel-header">
            <span>Output {removed > 0 && `(${removed} duplicates removed)`}</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-copy'}`} onClick={() => { navigator.clipboard.writeText(unique); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
          <div className="tool-panel-body">
            <div className="output-box" style={{ minHeight: 250 }}>{unique || 'Results will appear here...'}</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
