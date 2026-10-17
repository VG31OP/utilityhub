'use client';
import { useState, useRef, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Download, Sparkles } from 'lucide-react';

export default function FaviconGeneratorPage() {
  const tool = getToolById('favicon-generator');
  const [text, setText] = useState('⚡');
  const [shape, setShape] = useState('rounded'); // square, rounded, circle
  const [bgColor, setBgColor] = useState('#6366F1');
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [fontSize, setFontSize] = useState(70);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const size = 128;
    canvas.width = size;
    canvas.height = size;

    ctx.clearRect(0, 0, size, size);

    // Draw Background shape
    ctx.fillStyle = bgColor;
    if (shape === 'circle') {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else if (shape === 'rounded') {
      const radius = 28;
      ctx.beginPath();
      ctx.roundRect(0, 0, size, size, radius);
      ctx.fill();
    } else {
      ctx.fillRect(0, 0, size, size);
    }

    // Draw Text/Emoji
    ctx.fillStyle = textColor;
    ctx.font = `${fontSize}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, size / 2, size / 2 + 4);
  }, [text, shape, bgColor, textColor, fontSize]);

  const downloadFavicon = (pixelSize) => {
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = pixelSize;
    tempCanvas.height = pixelSize;
    const tCtx = tempCanvas.getContext('2d');
    if (canvasRef.current) {
      tCtx.drawImage(canvasRef.current, 0, 0, pixelSize, pixelSize);
    }
    const a = document.createElement('a');
    a.href = tempCanvas.toDataURL('image/png');
    a.download = `favicon-${pixelSize}x${pixelSize}.png`;
    a.click();
  };

  return (
    <ToolLayout tool={tool} category="image">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Customize Favicon</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Character or Emoji</label>
              <input
                type="text"
                className="form-input"
                maxLength={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Shape</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['rounded', 'circle', 'square'].map((s) => (
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
                  <input
                    type="text"
                    className="form-input"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                  />
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
                  <input
                    type="text"
                    className="form-input"
                    value={textColor}
                    onChange={(e) => setTextColor(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Font Size: {fontSize}px</label>
              <input
                type="range"
                min="30"
                max="90"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Preview and Downloads */}
        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <canvas
            ref={canvasRef}
            style={{
              width: 128,
              height: 128,
              boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              marginBottom: 24,
            }}
          />

          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 16 }}>Download Sizes:</span>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary btn-sm" onClick={() => downloadFavicon(32)}>
              <Download size={14} /> 32x32 PNG
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => downloadFavicon(64)}>
              <Download size={14} /> 64x64 PNG
            </button>
            <button className="btn btn-secondary btn-sm" onClick={() => downloadFavicon(180)}>
              <Download size={14} /> 180x180 Apple Touch
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
