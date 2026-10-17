'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { GitBranch, RefreshCw } from 'lucide-react';

export default function DiffCheckerPage() {
  const tool = getToolById('diff-checker');
  const [originalCode, setOriginalCode] = useState(`function calculateDiscount(price, isMember) {
  if (isMember) {
    return price * 0.9;
  }
  return price;
}`);
  const [modifiedCode, setModifiedCode] = useState(`function calculateDiscount(price, isMember, coupon) {
  let finalPrice = price;
  if (isMember) {
    finalPrice = price * 0.85;
  }
  if (coupon) {
    finalPrice -= coupon.value;
  }
  return Math.max(0, finalPrice);
}`);
  const [ignoreWhitespace, setIgnoreWhitespace] = useState(false);

  // Compute line-by-line diff
  const origLines = originalCode.split('\n');
  const modLines = modifiedCode.split('\n');
  const maxLines = Math.max(origLines.length, modLines.length);

  const diffRows = [];
  for (let i = 0; i < maxLines; i++) {
    const o = origLines[i] !== undefined ? origLines[i] : null;
    const m = modLines[i] !== undefined ? modLines[i] : null;

    const oNorm = o !== null && ignoreWhitespace ? o.trim() : o;
    const mNorm = m !== null && ignoreWhitespace ? m.trim() : m;

    let status = 'same';
    if (o === null) status = 'added';
    else if (m === null) status = 'removed';
    else if (oNorm !== mNorm) status = 'changed';

    diffRows.push({ lineNum: i + 1, o, m, status });
  }

  return (
    <ToolLayout tool={tool} category="developer">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Original Code</span></div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={8}
              value={originalCode}
              onChange={(e) => setOriginalCode(e.target.value)}
            />
          </div>
        </div>

        <div className="tool-panel">
          <div className="tool-panel-header"><span>Modified Code</span></div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={8}
              value={modifiedCode}
              onChange={(e) => setModifiedCode(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Diff Comparison</span>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.82rem' }}>
            <input
              type="checkbox"
              checked={ignoreWhitespace}
              onChange={(e) => setIgnoreWhitespace(e.target.checked)}
            />
            Ignore Whitespace
          </label>
        </div>
        <div className="tool-panel-body" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }}>
            <thead>
              <tr style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ width: 40, padding: '8px 12px', textAlign: 'right' }}>#</th>
                <th style={{ width: '50%', padding: '8px 12px', textAlign: 'left', borderRight: '1px solid var(--border-color)' }}>Original</th>
                <th style={{ width: 40, padding: '8px 12px', textAlign: 'right' }}>#</th>
                <th style={{ width: '50%', padding: '8px 12px', textAlign: 'left' }}>Modified</th>
              </tr>
            </thead>
            <tbody>
              {diffRows.map((row) => {
                const isChanged = row.status === 'changed';
                const isAdded = row.status === 'added';
                const isRemoved = row.status === 'removed';

                return (
                  <tr key={row.lineNum} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '6px 12px', color: 'var(--text-muted)', textAlign: 'right', userSelect: 'none' }}>
                      {row.o !== null ? row.lineNum : ''}
                    </td>
                    <td
                      style={{
                        padding: '6px 12px',
                        borderRight: '1px solid var(--border-color)',
                        background: isRemoved || isChanged ? 'rgba(239, 68, 68, 0.12)' : 'transparent',
                        color: isRemoved || isChanged ? '#F87171' : 'inherit',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                      }}
                    >
                      {row.o !== null ? row.o : ''}
                    </td>
                    <td style={{ padding: '6px 12px', color: 'var(--text-muted)', textAlign: 'right', userSelect: 'none' }}>
                      {row.m !== null ? row.lineNum : ''}
                    </td>
                    <td
                      style={{
                        padding: '6px 12px',
                        background: isAdded || isChanged ? 'rgba(16, 185, 129, 0.12)' : 'transparent',
                        color: isAdded || isChanged ? '#34D399' : 'inherit',
                        whiteSpace: 'pre-wrap',
                        wordBreak: 'break-all',
                      }}
                    >
                      {row.m !== null ? row.m : ''}
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
