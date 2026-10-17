'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function HashGeneratorPage() {
  const tool = getToolById('hash-generator');
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({});
  const [copied, setCopied] = useState('');

  const generate = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(input);
    const results = {};
    for (const algo of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
      const hashBuffer = await crypto.subtle.digest(algo, data);
      results[algo] = Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }
    setHashes(results);
  };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Input</span></div>
        <div className="tool-panel-body">
          <textarea className="form-textarea" placeholder="Enter text to hash..." value={input} onChange={(e) => setInput(e.target.value)} rows={4} />
          <button className="btn btn-primary btn-sm mt-3" onClick={generate}>Generate Hashes</button>
        </div>
      </div>

      {Object.keys(hashes).length > 0 && (
        <div style={{ display: 'grid', gap: 12 }}>
          {Object.entries(hashes).map(([algo, hash]) => (
            <div key={algo} className="tool-panel" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, flexShrink: 0, width: 80 }}>{algo}</span>
              <span style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.8rem', wordBreak: 'break-all' }}>{hash}</span>
              <button className={`btn btn-sm ${copied === algo ? 'btn-copy copied' : 'btn-copy'}`} onClick={() => { navigator.clipboard.writeText(hash); setCopied(algo); setTimeout(() => setCopied(''), 1500); }}>
                {copied === algo ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
