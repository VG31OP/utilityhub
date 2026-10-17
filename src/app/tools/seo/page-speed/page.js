'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Gauge, CheckCircle2, Circle } from 'lucide-react';

const INITIAL_CHECKS = [
  { id: 1, title: 'Serve Next-Gen Image Formats (WebP / AVIF)', cat: 'Images', checked: true, points: 15 },
  { id: 2, title: 'Explicit width & height on all <img> tags to avoid CLS', cat: 'Images', checked: true, points: 10 },
  { id: 3, title: 'Enable Gzip or Brotli compression on HTTP headers', cat: 'Server', checked: true, points: 15 },
  { id: 4, title: 'Minify CSS and JavaScript bundles in production', cat: 'Code', checked: true, points: 15 },
  { id: 5, title: 'Use font-display: swap for custom web fonts', cat: 'Fonts', checked: false, points: 10 },
  { id: 6, title: 'Preconnect / dns-prefetch to critical external domains', cat: 'Network', checked: false, points: 10 },
  { id: 7, title: 'Defer or async non-critical third-party scripts', cat: 'Code', checked: true, points: 15 },
  { id: 8, title: 'Set long-lived Cache-Control headers for static assets', cat: 'Server', checked: false, points: 10 },
];

export default function PageSpeedPage() {
  const tool = getToolById('page-speed');
  const [items, setItems] = useState(INITIAL_CHECKS);

  const toggle = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const totalScore = items.reduce((acc, item) => (item.checked ? acc + item.points : acc), 0);

  let scoreColor = 'var(--accent-teal)';
  let scoreGrade = 'Great Performance';
  if (totalScore < 60) {
    scoreColor = 'var(--danger)';
    scoreGrade = 'Needs Serious Optimization';
  } else if (totalScore < 85) {
    scoreColor = 'var(--accent-amber)';
    scoreGrade = 'Moderate Performance';
  }

  return (
    <ToolLayout tool={tool} category="seo">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Optimization Audit Checklist</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 12 }}>
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => toggle(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 14px',
                  borderRadius: 8,
                  background: item.checked ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  cursor: 'pointer',
                  transition: 'background 0.15s ease',
                }}
              >
                {item.checked ? (
                  <CheckCircle2 size={18} style={{ color: 'var(--accent-teal)', flexShrink: 0 }} />
                ) : (
                  <Circle size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
                )}
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, textDecoration: item.checked ? 'none' : 'none' }}>
                    {item.title}
                  </div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{item.cat} • +{item.points} pts</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Card */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Calculated Speed Score</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center', padding: 24 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Performance Readiness</span>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: scoreColor, margin: '10px 0', fontFamily: 'var(--font-mono)' }}>
              {totalScore}/100
            </div>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: scoreColor, marginBottom: 12 }}>
              {scoreGrade}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
              Check all best practices that apply to your web application to ensure minimal Time to First Byte (TTFB) and high Core Web Vitals rankings.
            </p>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
