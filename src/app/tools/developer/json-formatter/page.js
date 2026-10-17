'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function JsonFormatterPage() {
  const tool = getToolById('json-formatter');
  const [input, setInput] = useState('');
  const [indent, setIndent] = useState(2);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, indent));
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const minify = () => {
    try {
      setOutput(JSON.stringify(JSON.parse(input)));
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-workspace-split">
        <div className="tool-panel">
          <div className="tool-panel-header">
            <span>Input JSON</span>
            <div className="flex gap-2">
              <select className="form-select" style={{ width: 'auto', padding: '4px 28px 4px 8px', fontSize: '0.8rem' }} value={indent} onChange={(e) => setIndent(Number(e.target.value))}>
                <option value={2}>2 spaces</option>
                <option value={4}>4 spaces</option>
                <option value={1}>1 tab</option>
              </select>
            </div>
          </div>
          <div className="tool-panel-body">
            <textarea className="form-textarea" placeholder='{"key": "value"}' value={input} onChange={(e) => setInput(e.target.value)} rows={15} />
            <div className="btn-group mt-3">
              <button className="btn btn-primary btn-sm" onClick={format}>Format</button>
              <button className="btn btn-secondary btn-sm" onClick={minify}>Minify</button>
            </div>
          </div>
        </div>
        <div className="tool-panel">
          <div className="tool-panel-header">
            <span>Output</span>
            {output && <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-copy'}`} onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </button>}
          </div>
          <div className="tool-panel-body">
            {error ? <div style={{ color: '#EF4444', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>❌ {error}</div> : <div className="output-box" style={{ minHeight: 300 }}>{output || 'Formatted JSON will appear here...'}</div>}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
