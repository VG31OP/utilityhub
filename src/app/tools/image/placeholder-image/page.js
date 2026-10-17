'use client';
import { useState, useRef, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Download, Copy, Check } from 'lucide-react';

export default function PlaceholderImagePage() {
  const tool = getToolById('placeholder-image');
  const [width, setWidth] = useState(600);
  const [height, setHeight] = useState(400);
  const [text, setText] = useState('600x400');
  const [bgColor, setBgColor] = useState('#1E293B');
  const [textColor, setTextColor] = useState('#94A3B8');
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, width, height);

    // Text
    const label = text || `${width}x${height}`;
    const fontSize = Math.max(16, Math.min(width, height) / 10);
    ctx.fillStyle = textColor;
    ctx.font = `600 ${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(label, width / 2, height / 2);
  }, [width, height, text, bgColor, textColor]);

  const downloadPng = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = `placeholder-${width}x${height}.png`;
    a.click();
  };

  const copyDataUrl = () => {
    if (!canvasRef.current) return;
    navigator.clipboard.writeText(canvasRef.current.toDataURL('image/png'));
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="image">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Dimensions & Appearance</span></div>
          <div className="tool-panel-body">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div>
                <label className="form-label">Width (px)</label>
                <input
                  type="number"
                  className="form-input"
                  min="50"
                  max="2000"
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="form-label">Height (px)</label>
                <input
                  type="number"
                  className="form-input"
                  min="50"
                  max="2000"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Custom Text (optional)</label>
              <input
                type="text"
                className="form-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Leave blank for Dimensions"
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div>
                <label className="form-label">Background</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    style={{ width: 40, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', background: 'none' }}
                  />
                  <input type="text" className="form-input" value={bgColor} onChange={(e) => setBgColor(e.target.value)} />
                </div>
              </div>

              <div>
                <label className="form-label">Text Color</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                    style={{ width: 40, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', background: 'none' }}
                  />
                  <input type="text" className="form-input" value={textColor} onChange={(e) => setTextColor(e.target.value)} />
                </div>
              </div>
            </div>

            {/* Presets */}
            <div style={{ marginTop: 20 }}>
              <label className="form-label">Common Presets</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {[[1200, 630, 'OG Social'], [800, 600, '4:3 Standard'], [1920, 1080, '16:9 Full HD'], [300, 250, 'Banner Ad'], [150, 150, 'Square Thumbnail']].map(([w, h, name]) => (
                  <button
                    key={name}
                    className="btn btn-secondary btn-sm"
                    onClick={() => { setWidth(w); setHeight(h); setText(`${w}x${h}`); }}
                  >
                    {name} ({w}x{h})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Live Rendering & Actions */}
        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ maxWidth: '100%', overflow: 'hidden', borderRadius: 12, boxShadow: '0 8px 30px rgba(0,0,0,0.3)', marginBottom: 20 }}>
            <canvas ref={canvasRef} style={{ maxWidth: '100%', height: 'auto', display: 'block' }} />
          </div>

          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn btn-primary btn-sm" onClick={downloadPng}>
              <Download size={14} /> Download PNG
            </button>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copyDataUrl}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Data URL'}
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
