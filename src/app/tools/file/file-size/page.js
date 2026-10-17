'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { HardDrive, Copy, Check } from 'lucide-react';

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];

export default function FileSizePage() {
  const tool = getToolById('file-size');
  const [val, setVal] = useState(1024);
  const [unit, setUnit] = useState('MB');
  const [isBinary, setIsBinary] = useState(true); // 1024 vs 1000
  const [copiedKey, setCopiedKey] = useState('');

  const base = isBinary ? 1024 : 1000;
  const unitPower = UNITS.indexOf(unit);
  const bytes = Number(val) * Math.pow(base, unitPower);

  const copy = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  return (
    <ToolLayout tool={tool} category="file">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Input File Size</span>
          <div style={{ display: 'flex', gap: 6 }}>
            <button
              className={`btn btn-sm ${isBinary ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setIsBinary(true)}
            >
              Binary (1024 / KiB)
            </button>
            <button
              className={`btn btn-sm ${!isBinary ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setIsBinary(false)}
            >
              Decimal / SI (1000 / KB)
            </button>
          </div>
        </div>
        <div className="tool-panel-body">
          <div style={{ display: 'flex', gap: 12 }}>
            <input
              type="number"
              className="form-input"
              style={{ fontSize: '1.2rem', fontWeight: 600 }}
              value={val}
              onChange={(e) => setVal(Number(e.target.value))}
            />
            <select
              className="form-input"
              style={{ width: 100, fontSize: '1.1rem', fontWeight: 700 }}
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              {UNITS.map((u) => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Conversion Table */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>All Equivalent Units</span></div>
        <div className="tool-panel-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Unit</th>
                <th style={{ padding: '12px 16px' }}>Calculated Value</th>
                <th style={{ padding: '12px 16px', width: 60 }}>Copy</th>
              </tr>
            </thead>
            <tbody>
              {UNITS.map((u, i) => {
                const converted = bytes / Math.pow(base, i);
                const formatted = converted < 0.0001 && converted > 0 ? converted.toExponential(4) : Number(converted.toFixed(6)).toString();

                return (
                  <tr key={u} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary)' }}>{u}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}>
                      {formatted} {u}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        className={`btn btn-sm ${copiedKey === u ? 'btn-copy copied' : 'btn-ghost'}`}
                        onClick={() => copy(`${formatted} ${u}`, u)}
                      >
                        {copiedKey === u ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
}
