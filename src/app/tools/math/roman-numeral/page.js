'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { LetterText, ArrowLeftRight } from 'lucide-react';

const ROMAN_MAP = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
];

export default function RomanNumeralPage() {
  const tool = getToolById('roman-numeral');
  const [decimalInput, setDecimalInput] = useState('2026');
  const [romanInput, setRomanInput] = useState('MMXXVI');

  const toRoman = (num) => {
    let n = parseInt(num, 10);
    if (isNaN(n) || n < 1 || n > 3999) return '';
    let result = '';
    for (const [val, sym] of ROMAN_MAP) {
      while (n >= val) {
        result += sym;
        n -= val;
      }
    }
    return result;
  };

  const toDecimal = (roman) => {
    const r = roman.toUpperCase().trim();
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let total = 0;
    for (let i = 0; i < r.length; i++) {
      const current = map[r[i]];
      const next = map[r[i + 1]];
      if (!current) return '';
      if (next && current < next) {
        total -= current;
      } else {
        total += current;
      }
    }
    return total > 0 && total <= 3999 ? total.toString() : '';
  };

  const handleDecimalChange = (val) => {
    setDecimalInput(val);
    setRomanInput(toRoman(val));
  };

  const handleRomanChange = (val) => {
    setRomanInput(val.toUpperCase());
    const dec = toDecimal(val);
    if (dec) setDecimalInput(dec);
  };

  return (
    <ToolLayout tool={tool} category="math">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Decimal to Roman</span></div>
          <div className="tool-panel-body">
            <label className="form-label">Decimal Number (1 - 3999)</label>
            <input
              type="number"
              className="form-input"
              style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}
              value={decimalInput}
              onChange={(e) => handleDecimalChange(e.target.value)}
            />
          </div>
        </div>

        <div className="tool-panel">
          <div className="tool-panel-header"><span>Roman to Decimal</span></div>
          <div className="tool-panel-body">
            <label className="form-label">Roman Numeral</label>
            <input
              type="text"
              className="form-input"
              style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)' }}
              value={romanInput}
              onChange={(e) => handleRomanChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Cheatsheet */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Roman Numerals Cheatsheet</span></div>
        <div className="tool-panel-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                {ROMAN_MAP.slice(0, 7).map(([v, s]) => (
                  <th key={s} style={{ padding: '10px 14px' }}>{s}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {ROMAN_MAP.slice(0, 7).map(([v, s]) => (
                  <td key={s} style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontWeight: 600 }}>{v}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
}
