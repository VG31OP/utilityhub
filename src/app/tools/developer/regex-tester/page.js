'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';

export default function RegexTesterPage() {
  const tool = getToolById('regex-tester');
  const [pattern, setPattern] = useState('');
  const [flags, setFlags] = useState('g');
  const [text, setText] = useState('');

  let matches = [];
  let error = '';
  try {
    if (pattern) {
      const regex = new RegExp(pattern, flags);
      let match;
      while ((match = regex.exec(text)) !== null) {
        matches.push({ value: match[0], index: match.index, groups: match.slice(1) });
        if (!regex.global) break;
      }
    }
  } catch (e) { error = e.message; }

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Regex Pattern</span></div>
        <div className="tool-panel-body">
          <div className="flex gap-3" style={{ flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 250 }}>
              <input className="form-input" placeholder="Enter regex pattern..." value={pattern} onChange={(e) => setPattern(e.target.value)} style={{ fontFamily: 'var(--font-mono)' }} />
            </div>
            <div style={{ width: 120 }}>
              <input className="form-input" placeholder="Flags" value={flags} onChange={(e) => setFlags(e.target.value)} style={{ fontFamily: 'var(--font-mono)' }} />
            </div>
          </div>
          {error && <div style={{ color: '#EF4444', fontSize: '0.85rem', marginTop: 8 }}>❌ {error}</div>}
        </div>
      </div>

      <div className="tool-panel">
        <div className="tool-panel-header"><span>Test String</span><span className="tool-panel-badge">{matches.length} matches</span></div>
        <div className="tool-panel-body">
          <textarea className="form-textarea" placeholder="Enter text to test against..." value={text} onChange={(e) => setText(e.target.value)} rows={8} />
        </div>
      </div>

      {matches.length > 0 && (
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Matches</span></div>
          <div className="tool-panel-body">
            <div style={{ display: 'grid', gap: 8 }}>
              {matches.map((m, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <span style={{ color: 'var(--text-muted)', flexShrink: 0 }}>#{i+1}</span>
                  <span style={{ color: '#C084FC' }}>{m.value}</span>
                  <span style={{ color: 'var(--text-muted)', marginLeft: 'auto' }}>index: {m.index}</span>
                  {m.groups.length > 0 && <span style={{ color: '#4ECDC4' }}>groups: [{m.groups.join(', ')}]</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
