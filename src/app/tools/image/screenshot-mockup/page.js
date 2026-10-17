'use client';
import { useState, useRef } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Download, Upload, Monitor } from 'lucide-react';

export default function ScreenshotMockupPage() {
  const tool = getToolById('screenshot-mockup');
  const [device, setDevice] = useState('browser'); // 'browser' | 'phone'
  const [gradient, setGradient] = useState('linear-gradient(135deg, #667eea 0%, #764ba2 100%)');
  const [padding, setPadding] = useState(40);
  const [shadow, setShadow] = useState(true);
  const [urlText, setUrlText] = useState('https://myawesomeapp.com');
  const [imageSrc, setImageSrc] = useState(null);
  const frameRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImageSrc(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const gradients = [
    { name: 'Purple Night', val: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { name: 'Sunset Glow', val: 'linear-gradient(135deg, #FF6B6B 0%, #FFE66D 100%)' },
    { name: 'Teal Lagoon', val: 'linear-gradient(135deg, #0ba360 0%, #3cba92 100%)' },
    { name: 'Midnight Dark', val: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' },
    { name: 'Neon Cyber', val: 'linear-gradient(135deg, #f72585 0%, #7209b7 100%)' },
  ];

  return (
    <ToolLayout tool={tool} category="image">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Controls */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Mockup Settings</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Upload Screenshot</label>
              <label className="btn btn-primary btn-sm" style={{ cursor: 'pointer', display: 'inline-flex' }}>
                <Upload size={14} /> Select Screenshot Image
                <input type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
              </label>
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Frame Style</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  className={`btn btn-sm ${device === 'browser' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setDevice('browser')}
                >
                  Desktop Browser
                </button>
                <button
                  className={`btn btn-sm ${device === 'phone' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setDevice('phone')}
                >
                  Mobile Phone
                </button>
              </div>
            </div>

            {device === 'browser' && (
              <div style={{ marginTop: 16 }}>
                <label className="form-label">Browser URL Address</label>
                <input
                  type="text"
                  className="form-input"
                  value={urlText}
                  onChange={(e) => setUrlText(e.target.value)}
                />
              </div>
            )}

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Background Wallpaper</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {gradients.map((g) => (
                  <button
                    key={g.name}
                    onClick={() => setGradient(g.val)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: g.val,
                      border: gradient === g.val ? '2px solid #ffffff' : '2px solid transparent',
                      cursor: 'pointer',
                    }}
                    title={g.name}
                  />
                ))}
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Background Padding: {padding}px</label>
              <input
                type="range"
                min="10"
                max="80"
                value={padding}
                onChange={(e) => setPadding(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Live Mockup Display */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Live Mockup Preview</span></div>
          <div className="tool-panel-body" style={{ overflowX: 'auto', textAlign: 'center' }}>
            <div
              ref={frameRef}
              style={{
                background: gradient,
                padding: padding,
                borderRadius: 16,
                display: 'inline-block',
                maxWidth: '100%',
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              }}
            >
              {device === 'browser' ? (
                <div
                  style={{
                    width: 520,
                    maxWidth: '100%',
                    borderRadius: 10,
                    overflow: 'hidden',
                    background: '#1E293B',
                    boxShadow: shadow ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
                  }}
                >
                  {/* Browser Header */}
                  <div
                    style={{
                      height: 36,
                      background: '#0F172A',
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      gap: 8,
                    }}
                  >
                    <div style={{ display: 'flex', gap: 6 }}>
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#F59E0B', display: 'inline-block' }} />
                      <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
                    </div>
                    <div
                      style={{
                        flex: 1,
                        background: '#1E293B',
                        borderRadius: 4,
                        padding: '3px 10px',
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--text-muted)',
                        textAlign: 'center',
                      }}
                    >
                      {urlText}
                    </div>
                  </div>
                  {/* Content / Screenshot */}
                  <div style={{ minHeight: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#090D16' }}>
                    {imageSrc ? (
                      <img src={imageSrc} alt="Mockup" style={{ width: '100%', display: 'block' }} />
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Upload screenshot to preview</span>
                    )}
                  </div>
                </div>
              ) : (
                /* Mobile Phone Frame */
                <div
                  style={{
                    width: 260,
                    borderRadius: 36,
                    border: '8px solid #0F172A',
                    overflow: 'hidden',
                    background: '#090D16',
                    boxShadow: shadow ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
                    position: 'relative',
                  }}
                >
                  {/* Dynamic Island / Notch */}
                  <div
                    style={{
                      position: 'absolute',
                      top: 8,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 70,
                      height: 18,
                      background: '#000000',
                      borderRadius: 12,
                      zIndex: 10,
                    }}
                  />
                  <div style={{ minHeight: 440, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {imageSrc ? (
                      <img src={imageSrc} alt="Phone Mockup" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem', padding: 20 }}>Upload mobile screenshot</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
