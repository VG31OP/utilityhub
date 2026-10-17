'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function SlugGeneratorPage() {
  const tool = getToolById('slug-generator');
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  const slug = text.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Input Text</span></div>
        <div className="tool-panel-body">
          <input className="form-input" placeholder="Enter text to convert to a slug..." value={text} onChange={(e) => setText(e.target.value)} />
          {slug && (
            <div style={{ marginTop: 16 }}>
              <label className="form-label">Generated Slug</label>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <div className="output-box" style={{ flex: 1, minHeight: 'auto', padding: '12px 16px' }}>{slug}</div>
                <button className={`btn ${copied ? 'btn-copy copied' : 'btn-copy'}`} onClick={() => { navigator.clipboard.writeText(slug); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
