'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Tag } from 'lucide-react';

export default function DiscountCalculatorPage() {
  const tool = getToolById('discount-calculator');
  const [originalPrice, setOriginalPrice] = useState(120);
  const [discountPercent, setDiscountPercent] = useState(25);
  const [taxPercent, setTaxPercent] = useState(7);

  const price = Number(originalPrice) || 0;
  const discount = (price * (Number(discountPercent) || 0)) / 100;
  const discountedPrice = price - discount;
  const tax = (discountedPrice * (Number(taxPercent) || 0)) / 100;
  const finalPrice = discountedPrice + tax;

  return (
    <ToolLayout tool={tool} category="math">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Price & Discounts</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Original Price ($)</label>
              <input
                type="number"
                step="0.01"
                className="form-input"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(Number(e.target.value))}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Discount: {discountPercent}%</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {[10, 15, 20, 25, 30, 50, 70].map((pct) => (
                  <button
                    key={pct}
                    className={`btn btn-sm ${discountPercent === pct ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setDiscountPercent(pct)}
                  >
                    {pct}% Off
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="0"
                max="90"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Sales Tax (optional): {taxPercent}%</label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={taxPercent}
                onChange={(e) => setTaxPercent(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Breakdown */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Final Price Breakdown</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center', padding: 24 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>You Pay (After Discount & Tax)</span>
            <div style={{ fontSize: '2.8rem', fontWeight: 800, color: 'var(--accent-teal)', margin: '8px 0 20px', fontFamily: 'var(--font-mono)' }}>
              ${finalPrice.toFixed(2)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}>
              <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>You Save</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
                  ${discount.toFixed(2)}
                </div>
              </div>
              <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tax Amount</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  ${tax.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
