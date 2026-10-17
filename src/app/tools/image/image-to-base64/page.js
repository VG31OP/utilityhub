'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Upload, Copy, Check, Image as ImageIcon } from 'lucide-react';

export default function ImageToBase64Page() {
  const tool = getToolById('image-to-base64');
  const [base64, setBase64] = useState('');
  const [imageInfo, setImageInfo] = useState(null);
  const [copiedKey, setCopiedKey] = useState('');

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target.result;
      setBase64(result);

      const img = new window.Image();
      img.onload = () => {
        setImageInfo({
          name: file.name,
          size: file.size,
          type: file.type,
          width: img.naturalWidth,
          height: img.naturalHeight,
        });
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  };

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  const rawBase64 = base64 ? base64.split(',')[1] || '' : '';
  const htmlTag = base64 ? `<img src="${base64}" alt="${imageInfo?.name || 'image'}" />` : '';
  const cssBackground = base64 ? `background-image: url('${base64}');` : '';

  return (
    <ToolLayout tool={tool} category="image">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Upload Image</span></div>
        <div className="tool-panel-body">
          <label
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '40px 20px',
              border: '2px dashed var(--border-color)',
              borderRadius: 12,
              cursor: 'pointer',
              background: 'var(--bg-secondary)',
              transition: 'border-color 0.2s ease',
            }}
          >
            <Upload size={32} style={{ color: 'var(--primary)', marginBottom: 12 }} />
            <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Click or Drag & Drop an image file here</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>Supports PNG, JPG, GIF, WebP, SVG</span>
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      {base64 && imageInfo && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
          {/* Preview & Info */}
          <div className="tool-panel">
            <div className="tool-panel-header"><span>Image Preview</span></div>
            <div className="tool-panel-body" style={{ textAlign: 'center' }}>
              <div
                style={{
                  maxHeight: 250,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'repeating-conic-gradient(#202030 0% 25%, #151522 0% 50%) 50% / 20px 20px',
                  borderRadius: 12,
                  padding: 16,
                  marginBottom: 16,
                }}
              >
                <img src={base64} alt="Preview" style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, fontSize: '0.82rem', textAlign: 'left' }}>
                <div style={{ color: 'var(--text-muted)' }}>Dimensions:</div>
                <div style={{ fontWeight: 600 }}>{imageInfo.width} x {imageInfo.height} px</div>
                <div style={{ color: 'var(--text-muted)' }}>Original Size:</div>
                <div style={{ fontWeight: 600 }}>{(imageInfo.size / 1024).toFixed(1)} KB</div>
                <div style={{ color: 'var(--text-muted)' }}>MIME Type:</div>
                <div style={{ fontWeight: 600 }}>{imageInfo.type}</div>
              </div>
            </div>
          </div>

          {/* Formats & Copy */}
          <div className="tool-panel">
            <div className="tool-panel-header"><span>Base64 Formats</span></div>
            <div className="tool-panel-body" style={{ display: 'grid', gap: 14 }}>
              {[
                ['Data URL', base64, 'data-url'],
                ['Raw Base64', rawBase64, 'raw'],
                ['HTML <img> Tag', htmlTag, 'html'],
                ['CSS Background', cssBackground, 'css'],
              ].map(([label, val, key]) => (
                <div key={key}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-muted)' }}>{label}</span>
                    <button
                      className={`btn btn-sm ${copiedKey === key ? 'btn-copy copied' : 'btn-secondary'}`}
                      style={{ padding: '3px 10px', fontSize: '0.75rem' }}
                      onClick={() => copy(val, key)}
                    >
                      {copiedKey === key ? <Check size={12} /> : <Copy size={12} />}
                      {copiedKey === key ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                  <input
                    type="text"
                    readOnly
                    className="form-input"
                    value={val}
                    style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
