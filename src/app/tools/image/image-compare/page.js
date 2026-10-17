'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Columns, Upload } from 'lucide-react';

export default function ImageComparePage() {
  const tool = getToolById('image-compare');
  const [sliderPos, setSliderPos] = useState(50);
  const [beforeImage, setBeforeImage] = useState('https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80');
  const [afterImage, setAfterImage] = useState('https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80');

  const handleUploadBefore = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setBeforeImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadAfter = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAfterImage(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <ToolLayout tool={tool} category="image">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Image Comparison Slider</span>
          <div style={{ display: 'flex', gap: 10 }}>
            <label className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
              <Upload size={12} /> Change "Before"
              <input type="file" accept="image/*" onChange={handleUploadBefore} style={{ display: 'none' }} />
            </label>
            <label className="btn btn-ghost btn-sm" style={{ cursor: 'pointer' }}>
              <Upload size={12} /> Change "After"
              <input type="file" accept="image/*" onChange={handleUploadAfter} style={{ display: 'none' }} />
            </label>
          </div>
        </div>

        <div className="tool-panel-body" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          {/* Comparison Viewport */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 750,
              height: 420,
              overflow: 'hidden',
              borderRadius: 14,
              boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
              userSelect: 'none',
            }}
          >
            {/* After Image (Full background) */}
            <img
              src={afterImage}
              alt="After"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <span
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(4px)',
                padding: '4px 10px',
                borderRadius: 6,
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#fff',
                zIndex: 2,
              }}
            >
              AFTER
            </span>

            {/* Before Image (Clipped) */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: `${sliderPos}%`,
                height: '100%',
                overflow: 'hidden',
                zIndex: 3,
                borderRight: '2px solid #ffffff',
              }}
            >
              <img
                src={beforeImage}
                alt="Before"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '750px',
                  height: '100%',
                  objectFit: 'cover',
                  maxWidth: 'none',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  top: 14,
                  left: 14,
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(4px)',
                  padding: '4px 10px',
                  borderRadius: 6,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                BEFORE
              </span>
            </div>

            {/* Divider Handle */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: `${sliderPos}%`,
                transform: 'translate(-50%, -50%)',
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: '#ffffff',
                color: '#000000',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
                zIndex: 4,
                pointerEvents: 'none',
              }}
            >
              <Columns size={16} />
            </div>
          </div>

          {/* Slider control */}
          <div style={{ width: '100%', maxWidth: 750, marginTop: 24, textAlign: 'center' }}>
            <label className="form-label">Drag Slider to Compare: {sliderPos}%</label>
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
