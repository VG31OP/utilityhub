'use client';
import { useState, useRef } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Upload, Copy, Check, Pipette } from 'lucide-react';

export default function ColorExtractorPage() {
  const tool = getToolById('color-extractor');
  const [imageSrc, setImageSrc] = useState(null);
  const [palette, setPalette] = useState([]);
  const [copiedColor, setCopiedColor] = useState('');
  const imgRef = useRef(null);

  const extractColors = (imageElement) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = 100;
    const height = 100;
    canvas.width = width;
    canvas.height = height;

    ctx.drawImage(imageElement, 0, 0, width, height);
    const imageData = ctx.getImageData(0, 0, width, height).data;

    // Simple color bucket quantization
    const colorCounts = {};
    for (let i = 0; i < imageData.length; i += 16) { // sample every 4th pixel
      const r = Math.round(imageData[i] / 32) * 32;
      const g = Math.round(imageData[i + 1] / 32) * 32;
      const b = Math.round(imageData[i + 2] / 32) * 32;
      const a = imageData[i + 3];

      if (a > 128) {
        const key = `${Math.min(255, r)},${Math.min(255, g)},${Math.min(255, b)}`;
        colorCounts[key] = (colorCounts[key] || 0) + 1;
      }
    }

    const sorted = Object.entries(colorCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8)
      .map(([rgbStr]) => {
        const [r, g, b] = rgbStr.split(',').map(Number);
        const hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
        return { hex, rgb: `rgb(${r}, ${g}, ${b})` };
      });

    setPalette(sorted);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setImageSrc(event.target.result);
      const img = new Image();
      img.onload = () => extractColors(img);
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const copy = (hex) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(''), 1500);
  };

  return (
    <ToolLayout tool={tool} category="image">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Upload Photo</span></div>
        <div className="tool-panel-body">
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '36px 20px',
              border: '2px dashed var(--border-color)',
              borderRadius: 12,
              cursor: 'pointer',
              background: 'var(--bg-secondary)',
            }}
          >
            <Upload size={32} style={{ color: 'var(--primary)', marginBottom: 12 }} />
            <span style={{ fontWeight: 600 }}>Choose an image to extract colors</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>JPEG, PNG, WebP supported</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {imageSrc && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
          <div className="tool-panel">
            <div className="tool-panel-header"><span>Image Source</span></div>
            <div className="tool-panel-body" style={{ textAlign: 'center' }}>
              <img
                src={imageSrc}
                alt="Uploaded"
                style={{ maxWidth: '100%', maxHeight: 280, borderRadius: 10, objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className="tool-panel">
            <div className="tool-panel-header"><span>Dominant Palette ({palette.length} Colors)</span></div>
            <div className="tool-panel-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))', gap: 14 }}>
                {palette.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => copy(item.hex)}
                    style={{
                      cursor: 'pointer',
                      borderRadius: 10,
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-color)',
                      overflow: 'hidden',
                      textAlign: 'center',
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <div style={{ height: 65, backgroundColor: item.hex }} />
                    <div style={{ padding: '8px 4px', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
                      <div style={{ fontWeight: 700 }}>{item.hex}</div>
                      <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                        {copiedColor === item.hex ? 'Copied!' : 'Click to copy'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
