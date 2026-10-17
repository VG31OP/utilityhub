'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function FindReplacePage() {
  const tool = getToolById('find-replace');
  const [text, setText] = useState('');
  const [find, setFind] = useState('');
  const [replace, setReplace] = useState('');
  const [useRegex, setUseRegex] = useState(false);
  const [caseSensitive, setCaseSensitive] = useState(false);
  const [result, setResult] = useState('');
  const [copied, setCopied] = useState(false);

  const doReplace = () => {
    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const pattern = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      setResult(text.replace(pattern, replace));
    } catch {
      setResult('Invalid regex pattern');
    }
  };

  const matchCount = () => {
    if (!find || !text) return 0;
    try {
      const flags = caseSensitive ? 'g' : 'gi';
      const pattern = useRegex ? new RegExp(find, flags) : new RegExp(find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), flags);
      return (text.match(pattern) || []).length;
    } catch { return 0; }
  };

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Input Text</span></div>
        <div className="tool-panel-body">
          <textarea className="form-textarea" placeholder="Enter your text..." value={text} onChange={(e) => setText(e.target.value)} rows={8} />
        </div>
      </div>

      <div className="tool-panel">
        <div className="tool-panel-header"><span>Find & Replace</span><span className="tool-panel-badge">{matchCount()} matches</span></div>
        <div className="tool-panel-body">
          <div className="flex gap-3" style={{ flexWrap: 'wrap' }}>
            <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">Find</label>
              <input className="form-input" value={find} onChange={(e) => setFind(e.target.value)} placeholder="Text to find..." />
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 200 }}>
              <label className="form-label">Replace with</label>
              <input className="form-input" value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replacement text..." />
            </div>
          </div>
          <div className="flex gap-3 items-center" style={{ marginTop: 8 }}>
            <label className={`form-checkbox-label ${useRegex ? 'active' : ''}`} onClick={() => setUseRegex(!useRegex)}>
              <input type="checkbox" checked={useRegex} readOnly style={{ display: 'none' }} /> <span>Regex</span>
            </label>
            <label className={`form-checkbox-label ${caseSensitive ? 'active' : ''}`} onClick={() => setCaseSensitive(!caseSensitive)}>
              <input type="checkbox" checked={caseSensitive} readOnly style={{ display: 'none' }} /> <span>Case Sensitive</span>
            </label>
            <button className="btn btn-primary btn-sm" onClick={doReplace}>Replace All</button>
          </div>
        </div>
      </div>

      {result && (
        <div className="tool-panel">
          <div className="tool-panel-header">
            <span>Result</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-copy'}`} onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
              {copied ? <Check size={14} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="tool-panel-body">
            <div className="output-box">{result}</div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
