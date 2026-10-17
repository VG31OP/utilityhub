'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function Base64Page() {
  const tool = getToolById('base64');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const encode = () => { try { setOutput(btoa(unescape(encodeURIComponent(input)))); } catch { setOutput('Error encoding'); } };
  const decode = () => { try { setOutput(decodeURIComponent(escape(atob(input)))); } catch { setOutput('Error decoding — invalid Base64'); } };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-workspace-split">
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Input</span></div>
          <div className="tool-panel-body">
            <textarea className="form-textarea" placeholder="Enter text or Base64..." value={input} onChange={(e) => setInput(e.target.value)} rows={10} />
            <div className="btn-group mt-3">
              <button className="btn btn-primary btn-sm" onClick={encode}>Encode →</button>
              <button className="btn btn-secondary btn-sm" onClick={decode}>← Decode</button>
            </div>
          </div>
        </div>
        <div className="tool-panel">
          <div className="tool-panel-header">
            <span>Output</span>
            {output && <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-copy'}`} onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 1500); }}>{copied ? <Check size={14} /> : <Copy size={14} />}</button>}
          </div>
          <div className="tool-panel-body">
            <div className="output-box" style={{ minHeight: 200 }}>{output || 'Result will appear here...'}</div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
