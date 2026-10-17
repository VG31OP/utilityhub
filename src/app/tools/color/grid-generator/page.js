'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Grid3x3 } from 'lucide-react';

export default function GridGeneratorPage() {
  const tool = getToolById('grid-generator');
  const [cols, setCols] = useState(3);
  const [rows, setRows] = useState(3);
  const [colGap, setColGap] = useState(16);
  const [rowGap, setRowGap] = useState(16);
  const [copied, setCopied] = useState(false);

  const fullCss = `display: grid;
grid-template-columns: repeat(${cols}, 1fr);
grid-template-rows: repeat(${rows}, 1fr);
column-gap: ${colGap}px;
row-gap: ${rowGap}px;`;

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
          <div className="tool-panel-header"><span>Grid Configuration</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 14 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Columns: {cols}</label>
              </div>
              <input type="range" min="1" max="6" value={cols} onChange={(e) => setCols(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Rows: {rows}</label>
              </div>
              <input type="range" min="1" max="6" value={rows} onChange={(e) => setRows(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Column Gap: {colGap}px</label>
              </div>
              <input type="range" min="0" max="40" value={colGap} onChange={(e) => setColGap(Number(e.target.value))} style={{ width: '100%' }} />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                <label className="form-label">Row Gap: {rowGap}px</label>
              </div>
              <input type="range" min="0" max="40" value={rowGap} onChange={(e) => setRowGap(Number(e.target.value))} style={{ width: '100%' }} />
            </div>
          </div>
        </div>

        {/* Live Grid */}
        <div className="tool-panel" style={{ display: 'flex', flexDirection: 'column' }}>
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Visual Grid Canvas</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy CSS'}
            </button>
          </div>
          <div className="tool-panel-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div
              style={{
                flex: 1,
                minHeight: 260,
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                padding: 16,
                display: 'grid',
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                gridTemplateRows: `repeat(${rows}, 1fr)`,
                columnGap: `${colGap}px`,
                rowGap: `${rowGap}px`,
                marginBottom: 16,
              }}
            >
              {Array.from({ length: cols * rows }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 8,
                    background: 'rgba(99, 102, 241, 0.2)',
                    border: '1px solid var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    color: 'var(--primary)',
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
