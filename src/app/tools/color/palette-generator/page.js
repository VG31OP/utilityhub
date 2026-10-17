'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Lock, Unlock, RefreshCw, Copy, Check, Download } from 'lucide-react';

export default function PaletteGeneratorPage() {
  const tool = getToolById('palette-generator');
  const [colors, setColors] = useState([
    { hex: '#FF6B6B', locked: false },
    { hex: '#4ECDC4', locked: false },
    { hex: '#45B7D1', locked: false },
    { hex: '#96CEB4', locked: false },
    { hex: '#FFEEAD', locked: false },
  ]);
  const [copiedKey, setCopiedKey] = useState('');

  const randomHex = () => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0').toUpperCase();
  };

  const generateNewPalette = () => {
    setColors((prev) =>
      prev.map((c) => (c.locked ? c : { ...c, hex: randomHex() }))
    );
  };

  const toggleLock = (index) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  const cssVariables = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c.hex};`).join('\n')}\n}`;

  return (
    <ToolLayout tool={tool} category="color">
      {/* Action Header */}
      <div className="tool-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Press "Generate Palette" to create new combinations</span>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-primary" onClick={generateNewPalette}>
            <RefreshCw size={16} /> Generate Palette
          </button>
          <button className="btn btn-secondary" onClick={() => copy(cssVariables, 'css')}>
            {copiedKey === 'css' ? <Check size={16} /> : <Copy size={16} />}
            {copiedKey === 'css' ? 'Copied CSS' : 'Copy CSS Variables'}
          </button>
        </div>
      </div>

      {/* 5 Column Swatches */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 14 }}>
        {colors.map((c, i) => (
          <div
            key={i}
            className="tool-panel"
            style={{
              padding: 0,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: 14,
            }}
          >
            <div
              style={{
                height: 220,
                backgroundColor: c.hex,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onClick={() => copy(c.hex, `hex-${i}`)}
              title="Click to copy HEX"
            >
              <span
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  backdropFilter: 'blur(4px)',
                  color: '#ffffff',
                  padding: '4px 8px',
                  borderRadius: 6,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  opacity: copiedKey === `hex-${i}` ? 1 : 0.8,
                }}
              >
                {copiedKey === `hex-${i}` ? 'Copied!' : 'Click to copy'}
              </span>
            </div>

            <div style={{ padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 700, fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>{c.hex}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Color {i + 1}</div>
              </div>

              <button
                className="btn btn-ghost"
                style={{ padding: 6, color: c.locked ? 'var(--accent-teal)' : 'var(--text-muted)' }}
                onClick={() => toggleLock(i)}
                title={c.locked ? 'Unlock Color' : 'Lock Color'}
              >
                {c.locked ? <Lock size={16} /> : <Unlock size={16} />}
              </button>
            </div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
