'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Percent } from 'lucide-react';

export default function PercentageCalcPage() {
  const tool = getToolById('percentage-calc');

  // Case 1: What is X% of Y?
  const [c1X, setC1X] = useState(15);
  const [c1Y, setC1Y] = useState(250);
  const r1 = ((c1X / 100) * c1Y).toFixed(2);

  // Case 2: X is what percent of Y?
  const [c2X, setC2X] = useState(45);
  const [c2Y, setC2Y] = useState(200);
  const r2 = c2Y !== 0 ? ((c2X / c2Y) * 100).toFixed(2) : 0;

  // Case 3: Percentage change from X to Y?
  const [c3X, setC3X] = useState(80);
  const [c3Y, setC3Y] = useState(120);
  const diff3 = c3Y - c3X;
  const r3 = c3X !== 0 ? (((c3Y - c3X) / c3X) * 100).toFixed(2) : 0;

  return (
    <ToolLayout tool={tool} category="math">
      <div style={{ display: 'grid', gap: 20 }}>
        {/* Case 1 */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>What is X% of Y?</span></div>
          <div className="tool-panel-body">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span>What is</span>
              <input
                type="number"
                className="form-input"
                style={{ width: 100 }}
                value={c1X}
                onChange={(e) => setC1X(Number(e.target.value))}
              />
              <span>% of</span>
              <input
                type="number"
                className="form-input"
                style={{ width: 120 }}
                value={c1Y}
                onChange={(e) => setC1Y(Number(e.target.value))}
              />
              <span>=</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
                {r1}
              </span>
            </div>
          </div>
        </div>

        {/* Case 2 */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>X is what percentage of Y?</span></div>
          <div className="tool-panel-body">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <input
                type="number"
                className="form-input"
                style={{ width: 100 }}
                value={c2X}
                onChange={(e) => setC2X(Number(e.target.value))}
              />
              <span>is what % of</span>
              <input
                type="number"
                className="form-input"
                style={{ width: 120 }}
                value={c2Y}
                onChange={(e) => setC2Y(Number(e.target.value))}
              />
              <span>=</span>
              <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                {r2}%
              </span>
            </div>
          </div>
        </div>

        {/* Case 3 */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Percentage Increase / Decrease</span></div>
          <div className="tool-panel-body">
            <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
              <span>From</span>
              <input
                type="number"
                className="form-input"
                style={{ width: 110 }}
                value={c3X}
                onChange={(e) => setC3X(Number(e.target.value))}
              />
              <span>to</span>
              <input
                type="number"
                className="form-input"
                style={{ width: 110 }}
                value={c3Y}
                onChange={(e) => setC3Y(Number(e.target.value))}
              />
              <span>=</span>
              <span
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 700,
                  color: Number(r3) >= 0 ? 'var(--accent-teal)' : 'var(--danger)',
                  fontFamily: 'var(--font-mono)',
                }}
              >
                {Number(r3) >= 0 ? `+${r3}% (Increase)` : `${r3}% (Decrease)`}
              </span>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
