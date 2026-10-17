'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, BoxSelect } from 'lucide-react';

export default function BoxShadowPage() {
  const tool = getToolById('box-shadow');
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(15);
  const [blur, setBlur] = useState(30);
  const [spread, setSpread] = useState(0);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [opacity, setOpacity] = useState(0.4);
  const [isInset, setIsInset] = useState(false);
  const [copied, setCopied] = useState(false);

  // Convert hex to rgba
  const hex = shadowColor.replace('#', '');
  const r = parseInt(hex.substring(0, 2), 16) || 0;
  const g = parseInt(hex.substring(2, 4), 16) || 0;
  const b = parseInt(hex.substring(4, 6), 16) || 0;
  const rgbaStr = `rgba(${r}, ${g}, ${b}, ${opacity})`;

  const shadowCss = `${isInset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px ${rgbaStr}`;
  const fullCss = `box-shadow: ${shadowCss};`;

  const copy = () => {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="color">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Visual Box */}
        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 16,
              background: 'var(--bg-secondary)',
              border: '1px solid var(--border-color)',
              boxShadow: shadowCss,
              marginBottom: 28,
              transition: 'box-shadow 0.15s ease',
            }}
          />

          <button className={`btn ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied CSS' : 'Copy box-shadow CSS'}
          </button>
        </div>

        {/* Controls */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Shadow Parameters</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Horizontal Offset (X)</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{offsetX}px</span>
              </div>
              <input type="range" min="-50" max="50" value={offsetX} onChange={(e) => setOffsetX(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Vertical Offset (Y)</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{offsetY}px</span>
              </div>
              <input type="range" min="-50" max="50" value={offsetY} onChange={(e) => setOffsetY(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Blur Radius</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{blur}px</span>
              </div>
              <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Spread Radius</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{spread}px</span>
              </div>
              <input type="range" min="-30" max="50" value={spread} onChange={(e) => setSpread(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Shadow Opacity</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{Math.round(opacity * 100)}%</span>
              </div>
              <input type="range" min="0" max="1" step="0.05" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
              <input type="checkbox" checked={isInset} onChange={(e) => setIsInset(e.target.checked)} />
              Inset Shadow
            </label>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
