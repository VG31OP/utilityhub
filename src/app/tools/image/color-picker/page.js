'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Pipette } from 'lucide-react';

export default function ColorPickerPage() {
  const tool = getToolById('color-picker');
  const [hex, setHex] = useState('#6366F1');
  const [copiedKey, setCopiedKey] = useState('');

  // Conversions
  const hexToRgb = (h) => {
    let clean = h.replace('#', '');
    if (clean.length === 3) clean = clean.split('').map(c => c + c).join('');
    const num = parseInt(clean, 16);
    if (isNaN(num)) return { r: 0, g: 0, b: 0 };
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgb = hexToRgb(hex);

  const rgbToHsl = ({ r, g, b }) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const hsl = rgbToHsl(rgb);

  // Luminance and Contrast
  const getLuminance = ({ r, g, b }) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const lum = getLuminance(rgb);
  const contrastWhite = ((1.05) / (lum + 0.05)).toFixed(2);
  const contrastBlack = ((lum + 0.05) / 0.05).toFixed(2);

  const copy = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  // Harmonies
  const complementaryHsl = `hsl(${(hsl.h + 180) % 360}, ${hsl.s}%, ${hsl.l}%)`;
  const analogous1 = `hsl(${(hsl.h + 30) % 360}, ${hsl.s}%, ${hsl.l}%)`;
  const analogous2 = `hsl(${(hsl.h + 330) % 360}, ${hsl.s}%, ${hsl.l}%)`;
  const triadic1 = `hsl(${(hsl.h + 120) % 360}, ${hsl.s}%, ${hsl.l}%)`;
  const triadic2 = `hsl(${(hsl.h + 240) % 360}, ${hsl.s}%, ${hsl.l}%)`;

  return (
    <ToolLayout tool={tool} category="image">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Color Visualizer</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 180,
                borderRadius: 16,
                backgroundColor: hex,
                marginBottom: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.2)',
                transition: 'background-color 0.15s ease',
              }}
            >
              <span
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  fontFamily: 'var(--font-mono)',
                  color: lum > 0.5 ? '#000000' : '#ffffff',
                }}
              >
                {hex.toUpperCase()}
              </span>
            </div>

            <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center' }}>
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                style={{ width: 56, height: 42, border: 'none', borderRadius: 8, cursor: 'pointer', background: 'none' }}
              />
              <input
                type="text"
                className="form-input"
                style={{ maxWidth: 140, fontFamily: 'var(--font-mono)', textAlign: 'center' }}
                value={hex}
                onChange={(e) => setHex(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="tool-panel">
          <div className="tool-panel-header"><span>Color Values</span></div>
          <div className="tool-panel-body" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <tbody>
                {[
                  ['HEX', hex.toUpperCase()],
                  ['RGB', `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`],
                  ['HSL', `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`],
                  ['CSS Variable', `--color-custom: ${hex};`],
                ].map(([label, val]) => (
                  <tr key={label} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--text-muted)', width: 120 }}>{label}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)' }}>{val}</td>
                    <td style={{ padding: '12px 16px', width: 60, textAlign: 'right' }}>
                      <button
                        className={`btn btn-sm ${copiedKey === label ? 'btn-copy copied' : 'btn-ghost'}`}
                        onClick={() => copy(val, label)}
                      >
                        {copiedKey === label ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ padding: '16px 20px', borderTop: '1px solid var(--border-color)', display: 'flex', gap: 16 }}>
              <div style={{ flex: 1, padding: 12, borderRadius: 8, background: 'var(--bg-secondary)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Contrast vs White</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: Number(contrastWhite) >= 4.5 ? 'var(--accent-teal)' : 'var(--danger)' }}>
                  {contrastWhite}:1
                </div>
              </div>
              <div style={{ flex: 1, padding: 12, borderRadius: 8, background: 'var(--bg-secondary)', textAlign: 'center' }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Contrast vs Black</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: Number(contrastBlack) >= 4.5 ? 'var(--accent-teal)' : 'var(--danger)' }}>
                  {contrastBlack}:1
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tool-panel">
        <div className="tool-panel-header"><span>Color Harmonies</span></div>
        <div className="tool-panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16 }}>
            {[
              { name: 'Original', color: hex },
              { name: 'Complementary', color: complementaryHsl },
              { name: 'Analogous 1', color: analogous1 },
              { name: 'Analogous 2', color: analogous2 },
              { name: 'Triadic 1', color: triadic1 },
              { name: 'Triadic 2', color: triadic2 },
            ].map((harm) => (
              <div key={harm.name} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    height: 70,
                    borderRadius: 10,
                    backgroundColor: harm.color,
                    marginBottom: 8,
                    cursor: 'pointer',
                    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
                  }}
                  onClick={() => copy(harm.color, harm.name)}
                  title="Click to copy color"
                />
                <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>{harm.name}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {copiedKey === harm.name ? 'Copied!' : harm.color}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
