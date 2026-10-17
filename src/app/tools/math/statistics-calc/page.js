'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { BarChart3 } from 'lucide-react';

export default function StatisticsCalcPage() {
  const tool = getToolById('statistics-calc');
  const [input, setInput] = useState('12, 18, 25, 30, 30, 42, 55, 68, 75, 90');

  // Compute statistics
  const numbers = input
    .split(/[\s,]+/)
    .map(Number)
    .filter((n) => !isNaN(n));

  let stats = null;
  if (numbers.length > 0) {
    const count = numbers.length;
    const sorted = [...numbers].sort((a, b) => a - b);
    const sum = numbers.reduce((acc, v) => acc + v, 0);
    const mean = sum / count;

    // Median
    const mid = Math.floor(count / 2);
    const median = count % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;

    // Mode
    const freq = {};
    let maxFreq = 0;
    numbers.forEach((n) => {
      freq[n] = (freq[n] || 0) + 1;
      if (freq[n] > maxFreq) maxFreq = freq[n];
    });
    const modes = Object.keys(freq).filter((k) => freq[k] === maxFreq && maxFreq > 1);
    const modeStr = modes.length > 0 ? modes.join(', ') : 'None (all unique)';

    // Variance & Std Dev
    const variance = numbers.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / count;
    const stdDev = Math.sqrt(variance);

    const min = sorted[0];
    const max = sorted[count - 1];
    const range = max - min;

    stats = {
      count,
      sum,
      mean: mean.toFixed(4),
      median: median.toString(),
      mode: modeStr,
      min,
      max,
      range,
      variance: variance.toFixed(4),
      stdDev: stdDev.toFixed(4),
    };
  }

  return (
    <ToolLayout tool={tool} category="math">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Input Numbers Dataset</span></div>
        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            rows={4}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter numbers separated by commas, spaces, or newlines..."
          />
        </div>
      </div>

      {stats && (
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Statistical Calculations</span></div>
          <div className="tool-panel-body" style={{ padding: 0 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1px', background: 'var(--border-color)' }}>
              {[
                ['Count (N)', stats.count],
                ['Sum (Σ)', stats.sum],
                ['Mean / Average (μ)', stats.mean],
                ['Median', stats.median],
                ['Mode', stats.mode],
                ['Standard Deviation (σ)', stats.stdDev],
                ['Variance (σ²)', stats.variance],
                ['Minimum', stats.min],
                ['Maximum', stats.max],
                ['Range', stats.range],
              ].map(([label, val]) => (
                <div key={label} style={{ background: 'var(--bg-card)', padding: '16px 20px', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--accent-teal)' }}>
                    {val}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
