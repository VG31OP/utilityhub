'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function TextReverserPage() {
  const tool = getToolById('text-reverser');
  const [text, setText] = useState('');
  const [mode, setMode] = useState('chars');
  const [copied, setCopied] = useState(false);

  const reversed = mode === 'chars' ? text.split('').reverse().join('')
    : mode === 'words' ? text.split(' ').reverse().join(' ')
    : text.split('\n').reverse().join('\n');

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Reverse Text</span></div>
        <div className="tool-panel-body">
          <div className="tabs">
            {[['chars', 'Characters'], ['words', 'Words'], ['lines', 'Lines']].map(([val, label]) => (
              <button key={val} className={`tab ${mode === val ? 'active' : ''}`} onClick={() => setMode(val)}>{label}</button>
            ))}
          </div>
          <textarea className="form-textarea" placeholder="Enter text to reverse..." value={text} onChange={(e) => setText(e.target.value)} rows={5} />
          {text && (
            <div style={{ marginTop: 16 }}>
              <div className="flex justify-between items-center mb-2">
                <label className="form-label" style={{ margin: 0 }}>Result</label>
                <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-copy'}`} onClick={() => { navigator.clipboard.writeText(reversed); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <div className="output-box">{reversed}</div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
