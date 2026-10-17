'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Receipt } from 'lucide-react';

export default function TipCalculatorPage() {
  const tool = getToolById('tip-calculator');
  const [bill, setBill] = useState(85.50);
  const [tipPercent, setTipPercent] = useState(18);
  const [people, setPeople] = useState(2);

  const billNum = Number(bill) || 0;
  const tipAmount = (billNum * (Number(tipPercent) || 0)) / 100;
  const totalAmount = billNum + tipAmount;
  const numPeople = Math.max(1, Number(people) || 1);
  const perPersonTotal = totalAmount / numPeople;
  const perPersonTip = tipAmount / numPeople;

  return (
    <ToolLayout tool={tool} category="math">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Bill & Tip Details</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Bill Amount ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={bill}
                onChange={(e) => setBill(Number(e.target.value))}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Select Tip Percentage ({tipPercent}%)</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {[10, 15, 18, 20, 25].map((pct) => (
                  <button
                    key={pct}
                    className={`btn btn-sm ${tipPercent === pct ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setTipPercent(pct)}
                  >
                    {pct}%
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={tipPercent}
                onChange={(e) => setTipPercent(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Split Bill Between ({people} {people === 1 ? 'person' : 'people'})</label>
              <input
                type="range"
                min="1"
                max="20"
                value={people}
                onChange={(e) => setPeople(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Per-Person Breakdown</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center', padding: 24 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Each Person Pays</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-teal)', margin: '8px 0 20px', fontFamily: 'var(--font-mono)' }}>
              ${perPersonTotal.toFixed(2)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}>
              <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tip per person</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>${perPersonTip.toFixed(2)}</div>
              </div>
              <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Tip</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
                  ${tipAmount.toFixed(2)}
                </div>
              </div>
              <div style={{ gridColumn: 'span 2', padding: 14, background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Bill With Tip</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)', fontFamily: 'var(--font-mono)' }}>
                  ${totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
