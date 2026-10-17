'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Circle, Shuffle } from 'lucide-react';

export default function BorderRadiusPage() {
  const tool = getToolById('border-radius');
  const [tl, setTl] = useState(30);
  const [tr, setTr] = useState(70);
  const [br, setBr] = useState(70);
  const [bl, setBl] = useState(30);
  const [copied, setCopied] = useState(false);

  const radiusCss = `${tl}% ${100 - tl}% ${br}% ${100 - br}% / ${100 - bl}% ${tr}% ${100 - tr}% ${bl}%`;
  const simpleCss = `${tl}px ${tr}px ${br}px ${bl}px`;
  const [isBlob, setIsBlob] = useState(true);

  const activeCss = isBlob ? radiusCss : simpleCss;
  const fullCss = `border-radius: ${activeCss};`;

  const randomizeBlob = () => {
    setTl(Math.floor(Math.random() * 80) + 10);
    setTr(Math.floor(Math.random() * 80) + 10);
    setBr(Math.floor(Math.random() * 80) + 10);
    setBl(Math.floor(Math.random() * 80) + 10);
  };

  const copy = () => {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="color">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Shape Preview */}
        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: activeCss,
              background: 'linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 100%)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.3)',
              marginBottom: 28,
              transition: 'border-radius 0.2s ease',
            }}
          />

          <div style={{ display: 'flex', gap: 10 }}>
            <button className={`btn ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={16} /> : <Copy size={16} />}
              {copied ? 'Copied' : 'Copy CSS'}
            </button>
            <button className="btn btn-secondary" onClick={randomizeBlob}>
              <Shuffle size={16} /> Random Shape
            </button>
          </div>
        </div>

        {/* Sliders */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Corner Adjustments</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.8rem' }}>
              <input type="checkbox" checked={isBlob} onChange={(e) => setIsBlob(e.target.checked)} />
              Organic 8-Point Blob
            </label>
          </div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Top Left</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{tl}%</span>
              </div>
              <input type="range" min="0" max="100" value={tl} onChange={(e) => setTl(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Top Right</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{tr}%</span>
              </div>
              <input type="range" min="0" max="100" value={tr} onChange={(e) => setTr(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Bottom Right</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{br}%</span>
              </div>
              <input type="range" min="0" max="100" value={br} onChange={(e) => setBr(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Bottom Left</label>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>{bl}%</span>
              </div>
              <input type="range" min="0" max="100" value={bl} onChange={(e) => setBl(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
