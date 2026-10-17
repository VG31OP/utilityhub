'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function NumberBasePage() {
  const tool = getToolById('number-base');
  const [decimalVal, setDecimalVal] = useState('255');
  const [copiedKey, setCopiedKey] = useState('');

  let decNum = parseInt(decimalVal, 10);
  const isValid = !isNaN(decNum);

  const binVal = isValid ? (decNum >>> 0).toString(2) : '';
  const octVal = isValid ? (decNum >>> 0).toString(8) : '';
  const hexVal = isValid ? (decNum >>> 0).toString(16).toUpperCase() : '';

  const handleUpdate = (val, radix) => {
    try {
      const parsed = parseInt(val, radix);
      if (!isNaN(parsed)) {
        setDecimalVal(parsed.toString(10));
      } else if (val === '') {
        setDecimalVal('');
      }
    } catch (e) {}
  };

  const copy = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  return (
    <ToolLayout tool={tool} category="math">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Number Bases</span></div>
        <div className="tool-panel-body" style={{ display: 'grid', gap: 16 }}>
          {[
            ['Decimal (Base 10)', decimalVal, 10, '0-9'],
            ['Binary (Base 2)', binVal, 2, '0, 1'],
            ['Hexadecimal (Base 16)', hexVal, 16, '0-9, A-F'],
            ['Octal (Base 8)', octVal, 8, '0-7'],
          ].map(([label, val, radix, allowed]) => (
            <div key={label}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{label}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Allowed: {allowed}</span>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  className="form-input"
                  style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem' }}
                  value={val}
                  onChange={(e) => handleUpdate(e.target.value, radix)}
                />
                <button
                  className={`btn btn-sm ${copiedKey === label ? 'btn-copy copied' : 'btn-secondary'}`}
                  onClick={() => copy(val, label)}
                >
                  {copiedKey === label ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
