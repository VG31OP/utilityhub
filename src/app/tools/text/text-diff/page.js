'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';

export default function TextDiffPage() {
  const tool = getToolById('text-diff');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  const getDiff = () => {
    const lines1 = text1.split('\n');
    const lines2 = text2.split('\n');
    const maxLen = Math.max(lines1.length, lines2.length);
    const result = [];
    for (let i = 0; i < maxLen; i++) {
      const l1 = lines1[i] ?? null;
      const l2 = lines2[i] ?? null;
      if (l1 === l2) result.push({ type: 'same', text: l1 });
      else {
        if (l1 !== null) result.push({ type: 'removed', text: l1 });
        if (l2 !== null) result.push({ type: 'added', text: l2 });
      }
    }
    return result;
  };

  const diff = (text1 || text2) ? getDiff() : [];

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-workspace-split">
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Original Text</span></div>
          <div className="tool-panel-body">
            <textarea className="form-textarea" placeholder="Paste original text..." value={text1} onChange={(e) => setText1(e.target.value)} rows={12} />
          </div>
        </div>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Modified Text</span></div>
          <div className="tool-panel-body">
            <textarea className="form-textarea" placeholder="Paste modified text..." value={text2} onChange={(e) => setText2(e.target.value)} rows={12} />
          </div>
        </div>
      </div>

      {diff.length > 0 && (
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Differences</span></div>
          <div style={{ padding: '8px 0' }}>
            {diff.map((line, i) => (
              <div key={i} className={`diff-line ${line.type === 'added' ? 'diff-added' : line.type === 'removed' ? 'diff-removed' : 'diff-unchanged'}`}>
                {line.type === 'added' ? '+ ' : line.type === 'removed' ? '- ' : '  '}{line.text}
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
