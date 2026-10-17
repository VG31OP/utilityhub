'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Landmark } from 'lucide-react';

export default function LoanCalculatorPage() {
  const tool = getToolById('loan-calculator');
  const [loanAmount, setLoanAmount] = useState(100000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenureYears, setTenureYears] = useState(5);

  // EMI calculation: P * r * (1 + r)^n / ((1 + r)^n - 1)
  const P = Number(loanAmount);
  const r = Number(interestRate) / 12 / 100;
  const n = Number(tenureYears) * 12;

  let emi = 0;
  let totalPayment = 0;
  let totalInterest = 0;

  if (P > 0 && r > 0 && n > 0) {
    emi = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    totalPayment = emi * n;
    totalInterest = totalPayment - P;
  }

  return (
    <ToolLayout tool={tool} category="math">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Loan Parameters</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Loan Amount ($)</label>
              <input
                type="number"
                className="form-input"
                value={loanAmount}
                onChange={(e) => setLoanAmount(Number(e.target.value))}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Annual Interest Rate (%): {interestRate}%</label>
              <input
                type="number"
                step="0.1"
                className="form-input"
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Loan Tenure: {tenureYears} Years ({tenureYears * 12} Months)</label>
              <input
                type="range"
                min="1"
                max="30"
                value={tenureYears}
                onChange={(e) => setTenureYears(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Payment Summary</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center', padding: 24 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Monthly Payment (EMI)</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', margin: '8px 0 20px', fontFamily: 'var(--font-mono)' }}>
              ${emi.toFixed(2)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}>
              <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Principal Amount</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>${P.toLocaleString()}</div>
              </div>
              <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Interest</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--danger)', fontFamily: 'var(--font-mono)' }}>
                  ${totalInterest.toFixed(2)}
                </div>
              </div>
              <div style={{ gridColumn: 'span 2', padding: 14, background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Amount Payable (Principal + Interest)</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
                  ${totalPayment.toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
