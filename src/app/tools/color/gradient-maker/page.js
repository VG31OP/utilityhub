'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Blend } from 'lucide-react';

export default function GradientMakerPage() {
  const tool = getToolById('gradient-maker');
  const [color1, setColor1] = useState('#FF6B6B');
  const [color2, setColor2] = useState('#4ECDC4');
  const [color3, setColor3] = useState('#6366F1');
  const [useThreeColors, setUseThreeColors] = useState(false);
  const [angle, setAngle] = useState(135);
  const [type, setType] = useState('linear'); // 'linear' | 'radial'
  const [copied, setCopied] = useState(false);

  const gradientCss = type === 'linear'
    ? (useThreeColors
        ? `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 50%, ${color3} 100%)`
        : `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 100%)`)
    : (useThreeColors
        ? `radial-gradient(circle, ${color1} 0%, ${color2} 50%, ${color3} 100%)`
        : `radial-gradient(circle, ${color1} 0%, ${color2} 100%)`);

  const fullCss = `background: ${color1};\nbackground: ${gradientCss};`;

  const copy = () => {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="color">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Preview Viewport */}
        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="tool-panel-header" style={{ width: '100%' }}><span>Visual Canvas</span></div>
          <div className="tool-panel-body" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                width: '100%',
                height: 240,
                borderRadius: 14,
                background: gradientCss,
                boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
                marginBottom: 20,
              }}
            />

            <button className={`btn ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied CSS' : 'Copy CSS Gradient'}
            </button>
          </div>
        </div>

        {/* Controls */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Gradient Parameters</span></div>
          <div className="tool-panel-body">
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <button
                className={`btn btn-sm ${type === 'linear' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setType('linear')}
              >
                Linear Gradient
              </button>
              <button
                className={`btn btn-sm ${type === 'radial' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setType('radial')}
              >
                Radial Gradient
              </button>
            </div>

            {type === 'linear' && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                  <label className="form-label">Angle: {angle}°</label>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={angle}
                  onChange={(e) => setAngle(Number(e.target.value))}
                  style={{ width: '100%' }}
                />
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label className="form-label">Color 1 (Start)</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={color1}
                    onChange={(e) => setColor1(e.target.value)}
                    style={{ width: 40, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', background: 'none' }}
                  />
                  <input type="text" className="form-input" value={color1} onChange={(e) => setColor1(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="form-label">Color 2 (End)</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={color2}
                    onChange={(e) => setColor2(e.target.value)}
                    style={{ width: 40, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', background: 'none' }}
                  />
                  <input type="text" className="form-input" value={color2} onChange={(e) => setColor2(e.target.value)} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={useThreeColors}
                  onChange={(e) => setUseThreeColors(e.target.checked)}
                />
                Add 3rd Center Stop
              </label>
            </div>

            {useThreeColors && (
              <div style={{ marginTop: 12 }}>
                <label className="form-label">Color 3 (Center)</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={color3}
                    onChange={(e) => setColor3(e.target.value)}
                    style={{ width: 40, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', background: 'none' }}
                  />
                  <input type="text" className="form-input" value={color3} onChange={(e) => setColor3(e.target.value)} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
