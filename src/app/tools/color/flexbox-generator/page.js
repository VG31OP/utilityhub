'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, LayoutIcon, Plus, Minus } from 'lucide-react';

export default function FlexboxGeneratorPage() {
  const tool = getToolById('flexbox-generator');
  const [direction, setDirection] = useState('row');
  const [justify, setJustify] = useState('center');
  const [align, setAlign] = useState('center');
  const [wrap, setWrap] = useState('wrap');
  const [gap, setGap] = useState(16);
  const [itemCount, setItemCount] = useState(4);
  const [copied, setCopied] = useState(false);

  const fullCss = `display: flex;
flex-direction: ${direction};
justify-content: ${justify};
align-items: ${align};
flex-wrap: ${wrap};
gap: ${gap}px;`;

  const copy = () => {
    navigator.clipboard.writeText(fullCss);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="color">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {/* Controls */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Flexbox Properties</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 14 }}>
            <div>
              <label className="form-label">flex-direction</label>
              <select className="form-input" value={direction} onChange={(e) => setDirection(e.target.value)}>
                <option value="row">row</option>
                <option value="column">column</option>
                <option value="row-reverse">row-reverse</option>
                <option value="column-reverse">column-reverse</option>
              </select>
            </div>

            <div>
              <label className="form-label">justify-content</label>
              <select className="form-input" value={justify} onChange={(e) => setJustify(e.target.value)}>
                <option value="flex-start">flex-start</option>
                <option value="center">center</option>
                <option value="flex-end">flex-end</option>
                <option value="space-between">space-between</option>
                <option value="space-around">space-around</option>
                <option value="space-evenly">space-evenly</option>
              </select>
            </div>

            <div>
              <label className="form-label">align-items</label>
              <select className="form-input" value={align} onChange={(e) => setAlign(e.target.value)}>
                <option value="stretch">stretch</option>
                <option value="center">center</option>
                <option value="flex-start">flex-start</option>
                <option value="flex-end">flex-end</option>
              </select>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">gap: {gap}px</label>
              </div>
              <input type="range" min="0" max="48" value={gap} onChange={(e) => setGap(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.85rem' }}>Items: {itemCount}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button className="btn btn-secondary btn-sm" onClick={() => setItemCount(Math.max(1, itemCount - 1))}><Minus size={14} /></button>
                <button className="btn btn-secondary btn-sm" onClick={() => setItemCount(Math.min(12, itemCount + 1))}><Plus size={14} /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Visual Sandbox */}
        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Visual Sandbox</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy CSS'}
            </button>
          </div>
          <div className="tool-panel-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                flex: 1,
                minHeight: 280,
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                border: '2px dashed var(--border-color)',
                padding: 16,
                display: 'flex',
                flexDirection: direction,
                justifyContent: justify,
                alignItems: align,
                flexWrap: wrap,
                gap: `${gap}px`,
                marginBottom: 16,
              }}
            >
              {Array.from({ length: itemCount }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    padding: '16px 24px',
                    borderRadius: 8,
                    background: 'var(--primary)',
                    color: '#ffffff',
                    fontWeight: 700,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                  }}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              rows={5}
              value={fullCss}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
