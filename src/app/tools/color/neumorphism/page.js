'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Layers } from 'lucide-react';

export default function NeumorphismPage() {
  const tool = getToolById('neumorphism');
  const [size, setSize] = useState(180);
  const [radius, setRadius] = useState(30);
  const [distance, setDistance] = useState(12);
  const [blur, setBlur] = useState(24);
  const [shape, setShape] = useState('flat'); // 'flat' | 'concave' | 'convex' | 'pressed'
  const [copied, setCopied] = useState(false);

  const bgColor = '#242735';
  const lightShadow = '#2d3143';
  const darkShadow = '#1b1d27';

  let shadowCss = '';
  if (shape === 'flat') {
    shadowCss = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
  } else if (shape === 'pressed') {
    shadowCss = `inset ${distance}px ${distance}px ${blur}px ${darkShadow}, inset -${distance}px -${distance}px ${blur}px ${lightShadow}`;
  } else {
    shadowCss = `${distance}px ${distance}px ${blur}px ${darkShadow}, -${distance}px -${distance}px ${blur}px ${lightShadow}`;
  }

  const fullCss = `border-radius: ${radius}px;
background: ${bgColor};
box-shadow: ${shadowCss};`;

  const copy = () => {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="color">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Soft UI Canvas */}
        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="tool-panel-header" style={{ width: '100%' }}><span>Neumorphic Canvas</span></div>
          <div
            className="tool-panel-body"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: bgColor,
              borderRadius: 14,
              padding: 40,
              minHeight: 300,
            }}
          >
            <div
              style={{
                width: size,
                height: size,
                borderRadius: radius,
                background: bgColor,
                boxShadow: shadowCss,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#A0AEC0',
                fontWeight: 600,
                fontSize: '0.9rem',
                transition: 'all 0.15s ease',
              }}
            >
              Soft UI
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Shape & Shadow Properties</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy CSS'}
            </button>
          </div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 14 }}>
            <div>
              <label className="form-label">Effect Style</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['flat', 'pressed'].map((s) => (
                  <button
                    key={s}
                    className={`btn btn-sm ${shape === s ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setShape(s)}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Distance</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{distance}px</span>
              </div>
              <input type="range" min="4" max="30" value={distance} onChange={(e) => setDistance(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Blur Radius</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{blur}px</span>
              </div>
              <input type="range" min="8" max="50" value={blur} onChange={(e) => setBlur(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Border Radius</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{radius}px</span>
              </div>
              <input type="range" min="0" max="90" value={radius} onChange={(e) => setRadius(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginTop: 10 }}
              rows={4}
              value={fullCss}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
