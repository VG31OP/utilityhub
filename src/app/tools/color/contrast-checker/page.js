'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Contrast, ArrowLeftRight } from 'lucide-react';

export default function ContrastCheckerPage() {
  const tool = getToolById('contrast-checker');
  const [fgColor, setFgColor] = useState('#FFFFFF');
  const [bgColor, setBgColor] = useState('#4F46E5');

  const hexToRgb = (hex) => {
    let clean = hex.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
    const num = parseInt(clean, 16);
    if (isNaN(num)) return { r: 0, g: 0, b: 0 };
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const getLuminance = ({ r, g, b }) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lumFg = getLuminance(hexToRgb(fgColor));
  const lumBg = getLuminance(hexToRgb(bgColor));
  const ratio = (Math.max(lumFg, lumBg) + 0.05) / (Math.min(lumFg, lumBg) + 0.05);
  const ratioFormatted = ratio.toFixed(2);

  const passes = {
    normalAA: ratio >= 4.5,
    normalAAA: ratio >= 7.0,
    largeAA: ratio >= 3.0,
    largeAAA: ratio >= 4.5,
    uiComponents: ratio >= 3.0,
  };

  const swap = () => {
    const temp = fgColor;
    setFgColor(bgColor);
    setBgColor(temp);
  };

  return (
    <ToolLayout tool={tool} category="color">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Colors Selection */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Color Pair</span>
            <button className="btn btn-secondary btn-sm" onClick={swap} title="Swap foreground & background">
              <ArrowLeftRight size={14} /> Swap
            </button>
          </div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 16 }}>
            <div>
              <label className="form-label">Foreground / Text Color</label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  style={{ width: 44, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'none' }}
                />
                <input type="text" className="form-input" value={fgColor} onChange={(e) => setFgColor(e.target.value)} />
              </div>
            </div>

            <div>
              <label className="form-label">Background Color</label>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  style={{ width: 44, height: 40, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'none' }}
                />
                <input type="text" className="form-input" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
              </div>
            </div>

            {/* Live Text Preview Box */}
            <div
              style={{
                marginTop: 10,
                padding: '24px 20px',
                borderRadius: 12,
                backgroundColor: bgColor,
                color: fgColor,
                textAlign: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
                transition: 'all 0.15s ease',
              }}
            >
              <h3 style={{ margin: '0 0 6px', fontSize: '1.25rem', fontWeight: 700, color: fgColor }}>
                Large Text Sample (18pt+)
              </h3>
              <p style={{ margin: 0, fontSize: '0.9rem', color: fgColor }}>
                This is regular body text to test readability and accessibility contrast.
              </p>
            </div>
          </div>
        </div>

        {/* WCAG Compliance Results */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>WCAG 2.1 Accessibility Audit</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center', padding: 24 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Contrast Ratio</span>
            <div
              style={{
                fontSize: '3.5rem',
                fontWeight: 800,
                color: passes.normalAA ? 'var(--accent-teal)' : 'var(--danger)',
                margin: '8px 0 20px',
                fontFamily: 'var(--font-mono)',
              }}
            >
              {ratioFormatted}:1
            </div>

            <div style={{ display: 'grid', gap: 10, textAlign: 'left' }}>
              {[
                ['Normal Text (WCAG AA)', passes.normalAA, 'Requires ≥ 4.5:1'],
                ['Normal Text (WCAG AAA)', passes.normalAAA, 'Requires ≥ 7.0:1'],
                ['Large Text (18pt+ AA)', passes.largeAA, 'Requires ≥ 3.0:1'],
                ['Large Text (18pt+ AAA)', passes.largeAAA, 'Requires ≥ 4.5:1'],
                ['UI Components & Icons', passes.uiComponents, 'Requires ≥ 3.0:1'],
              ].map(([title, passesCheck, req]) => (
                <div
                  key={title}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '10px 14px',
                    borderRadius: 8,
                    background: 'var(--bg-secondary)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{title}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{req}</div>
                  </div>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 4,
                      background: passesCheck ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                      color: passesCheck ? 'var(--accent-teal)' : 'var(--danger)',
                    }}
                  >
                    {passesCheck ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
