'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function CaseConverterPage() {
  const tool = getToolById('case-converter');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState('');

  const conversions = {
    'UPPERCASE': text.toUpperCase(),
    'lowercase': text.toLowerCase(),
    'Title Case': text.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substr(1).toLowerCase()),
    'Sentence case': text.charAt(0).toUpperCase() + text.slice(1).toLowerCase(),
    'camelCase': text.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase()),
    'PascalCase': text.replace(/(?:^|\s|[-_])\w/g, m => m.toUpperCase()).replace(/[\s-_]+/g, ''),
    'snake_case': text.toLowerCase().replace(/[\s-]+/g, '_').replace(/[^a-z0-9_]/g, ''),
    'kebab-case': text.toLowerCase().replace(/[\s_]+/g, '-').replace(/[^a-z0-9-]/g, ''),
    'CONSTANT_CASE': text.toUpperCase().replace(/[\s-]+/g, '_').replace(/[^A-Z0-9_]/g, ''),
    'dot.case': text.toLowerCase().replace(/[\s_-]+/g, '.').replace(/[^a-z0-9.]/g, ''),
    'aLtErNaTiNg': text.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join(''),
    'InVeRsE': text.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''),
  };

  const copy = (key, val) => {
    navigator.clipboard.writeText(val);
    setCopied(key);
    setTimeout(() => setCopied(''), 1500);
  };

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-panel">
        <div className="tool-panel-header">
          <span>Input Text</span>
          <button className="btn btn-ghost btn-sm" onClick={() => setText('')}>Clear</button>
        </div>
        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            placeholder="Type or paste text to convert..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={4}
          />
        </div>
      </div>

      {text && (
        <div style={{ display: 'grid', gap: 12 }}>
          {Object.entries(conversions).map(([label, value]) => (
            <div key={label} className="tool-panel" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
              <div style={{ flex: '0 0 140px', fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>{label}</div>
              <div style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: '0.9rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</div>
              <button className={`btn btn-sm ${copied === label ? 'btn-copy copied' : 'btn-copy'}`} onClick={() => copy(label, value)}>
                {copied === label ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      )}
    </ToolLayout>
  );
}
