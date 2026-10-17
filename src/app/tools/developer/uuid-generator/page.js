'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, RefreshCw, Download } from 'lucide-react';

export default function UuidGeneratorPage() {
  const tool = getToolById('uuid-generator');
  const [uuids, setUuids] = useState([]);
  const [count, setCount] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphens, setHyphens] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateUuidV4 = () => {
    let u = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    if (!hyphens) u = u.replace(/-/g, '');
    if (uppercase) u = u.toUpperCase();
    return u;
  };

  const handleGenerate = () => {
    const list = [];
    for (let i = 0; i < count; i++) {
      list.push(generateUuidV4());
    }
    setUuids(list);
  };

  useEffect(() => {
    handleGenerate();
  }, [count, uppercase, hyphens]);

  const copyOne = (val, idx) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  const downloadTxt = () => {
    const element = document.createElement('a');
    const file = new Blob([uuids.join('\n')], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'uuids.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Configuration</span>
          <button className="btn btn-primary btn-sm" onClick={handleGenerate}>
            <RefreshCw size={14} /> Regenerate
          </button>
        </div>
        <div className="tool-panel-body">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <label className="form-label">Quantity: {count}</label>
              <input
                type="range"
                min="1"
                max="50"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                style={{ width: 140 }}
              />
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={uppercase}
                onChange={(e) => setUppercase(e.target.checked)}
              />
              Uppercase
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={hyphens}
                onChange={(e) => setHyphens(e.target.checked)}
              />
              Include Hyphens
            </label>
          </div>
        </div>
      </div>

      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Generated UUIDs ({uuids.length})</span>
          <div style={{ display: 'flex', gap: 8 }}>
            <button className={`btn btn-sm ${copiedAll ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copyAll}>
              {copiedAll ? <Check size={14} /> : <Copy size={14} />}
              {copiedAll ? 'Copied All' : 'Copy All'}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={downloadTxt}>
              <Download size={14} /> Download .txt
            </button>
          </div>
        </div>
        <div className="tool-panel-body" style={{ padding: '8px 12px' }}>
          {uuids.map((uuid, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                borderBottom: i === uuids.length - 1 ? 'none' : '1px solid var(--border-color)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
              }}
            >
              <span style={{ color: 'var(--primary)' }}>{uuid}</span>
              <button
                className={`btn btn-sm ${copiedIndex === i ? 'btn-copy copied' : 'btn-ghost'}`}
                onClick={() => copyOne(uuid, i)}
              >
                {copiedIndex === i ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
