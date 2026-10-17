'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Glasses } from 'lucide-react';

export default function GlassmorphismPage() {
  const tool = getToolById('glassmorphism');
  const [blur, setBlur] = useState(16);
  const [opacity, setOpacity] = useState(0.25);
  const [borderOpacity, setBorderOpacity] = useState(0.2);
  const [copied, setCopied] = useState(false);

  const glassCss = `background: rgba(255, 255, 255, ${opacity});
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border-radius: 16px;
border: 1px solid rgba(255, 255, 255, ${borderOpacity});
box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);`;

  const copy = () => {
    navigator.clipboard.writeText(glassCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="color">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Visual Canvas with Colorful Background */}
        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="tool-panel-header" style={{ width: '100%' }}><span>Frosted Glass Viewport</span></div>
          <div
            className="tool-panel-body"
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'radial-gradient(circle at 20% 20%, #FF6B6B 0%, #4ECDC4 50%, #6366F1 100%)',
              borderRadius: 14,
              padding: 40,
              minHeight: 300,
            }}
          >
            {/* Glass Card */}
            <div
              style={{
                width: 240,
                padding: '24px 20px',
                borderRadius: 16,
                background: `rgba(255, 255, 255, ${opacity})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                border: `1px solid rgba(255, 255, 255, ${borderOpacity})`,
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                color: '#ffffff',
                textAlign: 'center',
              }}
            >
              <div style={{ fontWeight: 800, fontSize: '1.2rem', marginBottom: 6 }}>Glassmorphism</div>
              <p style={{ fontSize: '0.8rem', opacity: 0.9, margin: 0 }}>
                Frosted glass effect with blur and translucency.
              </p>
            </div>
          </div>
        </div>

        {/* Controls & CSS */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Glass Attributes</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy CSS'}
            </button>
          </div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Blur Radius</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{blur}px</span>
              </div>
              <input type="range" min="0" max="30" value={blur} onChange={(e) => setBlur(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Background Opacity</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{Math.round(opacity * 100)}%</span>
              </div>
              <input type="range" min="0.05" max="0.8" step="0.05" value={opacity} onChange={(e) => setOpacity(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Border Opacity</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{Math.round(borderOpacity * 100)}%</span>
              </div>
              <input type="range" min="0" max="0.8" step="0.05" value={borderOpacity} onChange={(e) => setBorderOpacity(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginTop: 10 }}
              rows={6}
              value={glassCss}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
