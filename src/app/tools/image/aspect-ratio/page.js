'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { ArrowLeftRight, Check, Copy } from 'lucide-react';

export default function AspectRatioPage() {
  const tool = getToolById('aspect-ratio');
  const [ratioW, setRatioW] = useState(16);
  const [ratioH, setRatioH] = useState(9);
  const [width, setWidth] = useState(1920);
  const [height, setHeight] = useState(1080);
  const [findW, setFindW] = useState(1280);
  const [findH, setFindH] = useState(720);

  // GCD
  const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));
  const calcGcd = gcd(findW || 1, findH || 1);
  const simplifiedRatio = `${findW / calcGcd}:${findH / calcGcd}`;

  const handleWidthChange = (val) => {
    const w = Number(val);
    setWidth(w);
    if (ratioW > 0) {
      setHeight(Math.round((w * ratioH) / ratioW));
    }
  };

  const handleHeightChange = (val) => {
    const h = Number(val);
    setHeight(h);
    if (ratioH > 0) {
      setWidth(Math.round((h * ratioW) / ratioH));
    }
  };

  const setRatioPreset = (rw, rh) => {
    setRatioW(rw);
    setRatioH(rh);
    setHeight(Math.round((width * rh) / rw));
  };

  return (
    <ToolLayout tool={tool} category="image">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Dimension Scaler */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Aspect Ratio Scaler</span></div>
          <div className="tool-panel-body">
            <div style={{ marginBottom: 16 }}>
              <label className="form-label">Presets</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[[16, 9], [4, 3], [1, 1], [9, 16], [21, 9], [3, 2]].map(([rw, rh]) => (
                  <button
                    key={`${rw}:${rh}`}
                    className={`btn btn-sm ${ratioW === rw && ratioH === rh ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setRatioPreset(rw, rh)}
                  >
                    {rw}:{rh}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className="form-label">Width (px)</label>
                <input
                  type="number"
                  className="form-input"
                  value={width}
                  onChange={(e) => handleWidthChange(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Height (px)</label>
                <input
                  type="number"
                  className="form-input"
                  value={height}
                  onChange={(e) => handleHeightChange(e.target.value)}
                />
              </div>
            </div>

            {/* Visual Box */}
            <div style={{ marginTop: 24, textAlign: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Proportional Shape Preview</span>
              <div
                style={{
                  margin: '12px auto 0',
                  maxWidth: 240,
                  height: 120,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <div
                  style={{
                    aspectRatio: `${ratioW} / ${ratioH}`,
                    maxWidth: '100%',
                    maxHeight: '100%',
                    border: '2px solid var(--primary)',
                    background: 'rgba(99, 102, 241, 0.15)',
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    color: 'var(--primary)',
                    padding: '8px 16px',
                  }}
                >
                  {ratioW}:{ratioH}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Find Ratio from Dimensions */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Calculate Ratio from Dimensions</span></div>
          <div className="tool-panel-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className="form-label">Given Width (px)</label>
                <input
                  type="number"
                  className="form-input"
                  value={findW}
                  onChange={(e) => setFindW(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="form-label">Given Height (px)</label>
                <input
                  type="number"
                  className="form-input"
                  value={findH}
                  onChange={(e) => setFindH(Number(e.target.value))}
                />
              </div>
            </div>

            <div style={{ marginTop: 24, textAlign: 'center', padding: '24px 16px', background: 'var(--bg-secondary)', borderRadius: 12 }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Simplified Aspect Ratio</div>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-teal)', margin: '6px 0' }}>
                {simplifiedRatio}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Decimal: {(findW / (findH || 1)).toFixed(3)}:1
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
