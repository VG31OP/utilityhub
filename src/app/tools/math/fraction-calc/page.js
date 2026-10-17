'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Divide } from 'lucide-react';

export default function FractionCalcPage() {
  const tool = getToolById('fraction-calc');
  const [num1, setNum1] = useState(3);
  const [den1, setDen1] = useState(4);
  const [op, setOp] = useState('+');
  const [num2, setNum2] = useState(2);
  const [den2, setDen2] = useState(5);

  const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

  let resNum = 0;
  let resDen = 1;

  if (den1 !== 0 && den2 !== 0) {
    if (op === '+') {
      resNum = num1 * den2 + num2 * den1;
      resDen = den1 * den2;
    } else if (op === '-') {
      resNum = num1 * den2 - num2 * den1;
      resDen = den1 * den2;
    } else if (op === '*') {
      resNum = num1 * num2;
      resDen = den1 * den2;
    } else if (op === '/') {
      resNum = num1 * den2;
      resDen = den1 * num2;
    }

    const g = gcd(resNum, resDen);
    if (g !== 0) {
      resNum /= g;
      resDen /= g;
    }
    if (resDen < 0) {
      resNum = -resNum;
      resDen = -resDen;
    }
  }

  const decimalVal = resDen !== 0 ? (resNum / resDen).toFixed(4) : 'Undefined';

  // Mixed number
  let mixed = '';
  if (Math.abs(resNum) >= resDen && resDen !== 0) {
    const whole = Math.floor(Math.abs(resNum) / resDen) * (resNum < 0 ? -1 : 1);
    const remainder = Math.abs(resNum) % resDen;
    if (remainder !== 0) {
      mixed = `${whole} ${remainder}/${resDen}`;
    }
  }

  return (
    <ToolLayout tool={tool} category="math">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Fraction Expression</span></div>
        <div className="tool-panel-body">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
            {/* Fraction 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', width: 90, gap: 6 }}>
              <input
                type="number"
                className="form-input"
                style={{ textAlign: 'center', fontWeight: 600 }}
                value={num1}
                onChange={(e) => setNum1(Number(e.target.value))}
              />
              <div style={{ height: 2, background: 'var(--border-color)', margin: '2px 0' }} />
              <input
                type="number"
                className="form-input"
                style={{ textAlign: 'center', fontWeight: 600 }}
                value={den1}
                onChange={(e) => setDen1(Number(e.target.value))}
              />
            </div>

            {/* Operator selector */}
            <select
              className="form-input"
              style={{ width: 70, textAlign: 'center', fontSize: '1.2rem', fontWeight: 700 }}
              value={op}
              onChange={(e) => setOp(e.target.value)}
            >
              <option value="+">+</option>
              <option value="-">−</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </select>

            {/* Fraction 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', width: 90, gap: 6 }}>
              <input
                type="number"
                className="form-input"
                style={{ textAlign: 'center', fontWeight: 600 }}
                value={num2}
                onChange={(e) => setNum2(Number(e.target.value))}
              />
              <div style={{ height: 2, background: 'var(--border-color)', margin: '2px 0' }} />
              <input
                type="number"
                className="form-input"
                style={{ textAlign: 'center', fontWeight: 600 }}
                value={den2}
                onChange={(e) => setDen2(Number(e.target.value))}
              />
            </div>

            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>=</span>

            {/* Result */}
            <div style={{ display: 'flex', flexDirection: 'column', width: 90, gap: 6, alignItems: 'center' }}>
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-teal)' }}>{resNum}</span>
              <div style={{ height: 2, width: '100%', background: 'var(--accent-teal)', margin: '2px 0' }} />
              <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-teal)' }}>{resDen}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Representations */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Equivalent Formats</span></div>
        <div className="tool-panel-body" style={{ display: 'flex', gap: 20, justifyContent: 'space-around', textAlign: 'center' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Decimal Form</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', marginTop: 4 }}>
              {decimalVal}
            </div>
          </div>

          {mixed && (
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Mixed Number</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, fontFamily: 'var(--font-mono)', marginTop: 4 }}>
                {mixed}
              </div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
