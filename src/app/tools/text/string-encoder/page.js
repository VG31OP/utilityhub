'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function StringEncoderPage() {
  const tool = getToolById('string-encoder');
  const [text, setText] = useState('');
  const [mode, setMode] = useState('encodeURL');
  const [copied, setCopied] = useState(false);

  const process = () => {
    try {
      switch (mode) {
        case 'encodeURL': return encodeURIComponent(text);
        case 'decodeURL': return decodeURIComponent(text);
        case 'encodeHTML': return text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;');
        case 'decodeHTML': return text.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&quot;/g,'"').replace(/&#039;/g,"'");
        case 'encodeBase64': return btoa(unescape(encodeURIComponent(text)));
        case 'decodeBase64': return decodeURIComponent(escape(atob(text)));
        default: return text;
      }
    } catch { return 'Error processing text'; }
  };

  const result = text ? process() : '';

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>String Encoder/Decoder</span></div>
        <div className="tool-panel-body">
          <div className="tabs">
            {[['encodeURL','URL Encode'],['decodeURL','URL Decode'],['encodeHTML','HTML Encode'],['decodeHTML','HTML Decode'],['encodeBase64','Base64 Encode'],['decodeBase64','Base64 Decode']].map(([v,l]) => (
              <button key={v} className={`tab ${mode === v ? 'active' : ''}`} onClick={() => setMode(v)}>{l}</button>
            ))}
          </div>
          <textarea className="form-textarea" placeholder="Enter text..." value={text} onChange={(e) => setText(e.target.value)} rows={5} />
          {result && (
            <div style={{ marginTop: 16 }}>
              <div className="flex justify-between items-center mb-2">
                <label className="form-label" style={{ margin: 0 }}>Result</label>
                <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-copy'}`} onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
              <div className="output-box">{result}</div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
