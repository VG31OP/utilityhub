'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Smartphone } from 'lucide-react';

const PLATFORM_LIMITS = [
  { name: 'Twitter / X', max: 280, color: '#1DA1F2' },
  { name: 'Instagram Caption', max: 2200, color: '#E1306C' },
  { name: 'LinkedIn Post', max: 3000, color: '#0A66C2' },
  { name: 'Pinterest Description', max: 500, color: '#E60023' },
  { name: 'TikTok Caption', max: 2200, color: '#00F2FE' },
  { name: 'Facebook Post', max: 5000, color: '#1877F2' },
];

export default function CharCounterPage() {
  const tool = getToolById('char-counter');
  const [text, setText] = useState('Excited to announce the launch of our brand new free web toolkit! 🚀 Check it out and let us know what you think.');

  const charCount = text.length;
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const hashtagCount = (text.match(/#[a-zA-Z0-9_]+/g) || []).length;

  return (
    <ToolLayout tool={tool} category="social">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Post Editor</span>
            <div style={{ display: 'flex', gap: 12, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              <span>Words: <strong>{wordCount}</strong></span>
              <span>Hashtags: <strong>{hashtagCount}</strong></span>
            </div>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              rows={8}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your social media post here..."
            />
          </div>
        </div>

        {/* Platform Limits Meters */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Platform Character Limits</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 14 }}>
            {PLATFORM_LIMITS.map((p) => {
              const remaining = p.max - charCount;
              const pct = Math.min(100, Math.round((charCount / p.max) * 100));
              const isOver = remaining < 0;

              return (
                <div key={p.name} style={{ background: 'var(--bg-secondary)', padding: 12, borderRadius: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{p.name}</span>
                    <span
                      style={{
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        fontFamily: 'var(--font-mono)',
                        color: isOver ? 'var(--danger)' : 'var(--text-muted)',
                      }}
                    >
                      {isOver ? `${Math.abs(remaining)} over limit` : `${remaining} left (${charCount}/${p.max})`}
                    </span>
                  </div>

                  <div style={{ height: 6, width: '100%', background: 'var(--border-color)', borderRadius: 3, overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        width: `${pct}%`,
                        background: isOver ? 'var(--danger)' : p.color,
                        transition: 'width 0.15s ease',
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
