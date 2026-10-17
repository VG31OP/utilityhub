'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Droplets } from 'lucide-react';

const TAILWIND_PALETTE = [
  { name: 'slate-500', hex: '#64748B' },
  { name: 'gray-500', hex: '#6B7280' },
  { name: 'red-500', hex: '#EF4444' },
  { name: 'orange-500', hex: '#F97316' },
  { name: 'amber-500', hex: '#F59E0B' },
  { name: 'yellow-500', hex: '#EAB308' },
  { name: 'lime-500', hex: '#84CC16' },
  { name: 'green-500', hex: '#22C55E' },
  { name: 'emerald-500', hex: '#10B981' },
  { name: 'teal-500', hex: '#14B8A6' },
  { name: 'cyan-500', hex: '#06B6D4' },
  { name: 'sky-500', hex: '#0EA5E9' },
  { name: 'blue-500', hex: '#3B82F6' },
  { name: 'indigo-500', hex: '#6366F1' },
  { name: 'violet-500', hex: '#8B5CF6' },
  { name: 'purple-500', hex: '#A855F7' },
  { name: 'fuchsia-500', hex: '#D946EF' },
  { name: 'pink-500', hex: '#EC4899' },
  { name: 'rose-500', hex: '#F43F5E' },
];

export default function TailwindColorsPage() {
  const tool = getToolById('tailwind-colors');
  const [colorInput, setColorInput] = useState('#6366F1');
  const [copiedKey, setCopiedKey] = useState('');

  // Euclidean distance in RGB color space
  const hexToRgb = (h) => {
    let clean = h.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const num = parseInt(clean, 16);
    if (isNaN(num)) return { r: 0, g: 0, b: 0 };
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  };

  const findNearest = (targetHex) => {
    const target = hexToRgb(targetHex);
    let nearest = TAILWIND_PALETTE[0];
    let minDistance = Infinity;

    for (const c of TAILWIND_PALETTE) {
      const rgb = hexToRgb(c.hex);
      const d = Math.sqrt(
        Math.pow(target.r - rgb.r, 2) +
        Math.pow(target.g - rgb.g, 2) +
        Math.pow(target.b - rgb.b, 2)
      );
      if (d < minDistance) {
        minDistance = d;
        nearest = c;
      }
    }
    return nearest;
  };

  const nearest = findNearest(colorInput);

  const copy = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  return (
    <ToolLayout tool={tool} category="color">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Color Input */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Pick Any Color</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 180,
                borderRadius: 14,
                backgroundColor: colorInput,
                marginBottom: 20,
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
                transition: 'background-color 0.15s ease',
              }}
            />
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center', alignItems: 'center' }}>
              <input
                type="color"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                style={{ width: 48, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'none' }}
              />
              <input
                type="text"
                className="form-input"
                style={{ maxWidth: 140, fontFamily: 'var(--font-mono)' }}
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Nearest Tailwind Match */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Closest Tailwind Match</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, padding: 16, borderRadius: 10, background: 'var(--bg-secondary)' }}>
              <div style={{ width: 60, height: 60, borderRadius: 10, backgroundColor: nearest.hex, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{nearest.name}</div>
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{nearest.hex}</div>
              </div>
            </div>

            <div style={{ display: 'grid', gap: 10 }}>
              {[
                ['Background Class', `bg-${nearest.name}`],
                ['Text Class', `text-${nearest.name}`],
                ['Border Class', `border-${nearest.name}`],
                ['Ring Focus Class', `ring-${nearest.name}`],
              ].map(([label, val]) => (
                <div
                  key={label}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'var(--bg-secondary)',
                  }}
                >
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{label}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <code style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>{val}</code>
                    <button
                      className={`btn btn-sm ${copiedKey === val ? 'btn-copy copied' : 'btn-ghost'}`}
                      style={{ padding: '2px 8px' }}
                      onClick={() => copy(val, val)}
                    >
                      {copiedKey === val ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
