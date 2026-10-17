'use client';
import { useState, useRef, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Download, Copy, Check, QrCode } from 'lucide-react';

export default function QrGeneratorPage() {
  const tool = getToolById('qr-generator');
  const [text, setText] = useState('https://utilityhub.dev');
  const [size, setSize] = useState(250);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrType, setQrType] = useState('url');
  const canvasRef = useRef(null);
  const [copied, setCopied] = useState(false);

  // Simple QR matrix generation using standard QR algorithm or Google Charts / QuickChart fallback
  useEffect(() => {
    if (!canvasRef.current || !text) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    // Use fast, reliable open QR API to render onto canvas with custom colors
    const encoded = encodeURIComponent(text);
    const fg = fgColor.replace('#', '');
    const bg = bgColor.replace('#', '');
    img.src = `https://api.qrserver.com/v1/create-qr-code/?data=${encoded}&size=${size}x${size}&color=${fg}&bgcolor=${bg}&format=png`;

    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.drawImage(img, 0, 0, size, size);
    };
  }, [text, size, fgColor, bgColor]);

  const downloadPng = () => {
    if (!canvasRef.current) return;
    const url = canvasRef.current.toDataURL('image/png');
    const a = document.createElement('a');
    a.href = url;
    a.download = 'qrcode.png';
    a.click();
  };

  const copyImage = async () => {
    if (!canvasRef.current) return;
    try {
      canvasRef.current.toBlob(async (blob) => {
        await navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ]);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      });
    } catch (e) {
      // Fallback: copy data URL
      navigator.clipboard.writeText(canvasRef.current.toDataURL('image/png'));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <ToolLayout tool={tool} category="image">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>QR Code Content</span></div>
          <div className="tool-panel-body">
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              {['url', 'text', 'wifi', 'email'].map((t) => (
                <button
                  key={t}
                  className={`btn btn-sm ${qrType === t ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => {
                    setQrType(t);
                    if (t === 'url') setText('https://utilityhub.dev');
                    if (t === 'wifi') setText('WIFI:S:MyNetwork;T:WPA;P:MyPassword;;');
                    if (t === 'email') setText('mailto:hello@example.com?subject=Hello');
                    if (t === 'text') setText('Hello World!');
                  }}
                >
                  {t.toUpperCase()}
                </button>
              ))}
            </div>

            <label className="form-label">Data / Text</label>
            <textarea
              className="form-textarea"
              rows={4}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text, URL, or data..."
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div>
                <label className="form-label">Foreground Color</label>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    style={{ width: 40, height: 36, border: 'none', borderRadius: 6, cursor: 'pointer', background: 'none' }}
                  />
                  <input
                    type="text"
                    className="form-input"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>

              <div>
                <label className="form-label">Background Color</label>
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
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">QR Size: {size}px</label>
              <input
                type="range"
                min="150"
                max="400"
                step="10"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <div
            style={{
              padding: 16,
              background: bgColor,
              borderRadius: 16,
              boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
              display: 'inline-flex',
              marginBottom: 24,
            }}
          >
            <canvas ref={canvasRef} style={{ display: 'block', maxWidth: '100%', height: 'auto' }} />
          </div>

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button className="btn btn-primary btn-sm" onClick={downloadPng}>
              <Download size={14} /> Download PNG
            </button>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copyImage}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Image'}
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
