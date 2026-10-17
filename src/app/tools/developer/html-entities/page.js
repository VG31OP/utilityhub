'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, ArrowRightLeft } from 'lucide-react';

export default function HtmlEntitiesPage() {
  const tool = getToolById('html-entities');
  const [input, setInput] = useState('<h1>Hello & Welcome to "UtilityHub" & <World>!</h1>');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);

  const encodeEntities = (str) => {
    return str.replace(/[\u00A0-\u9999<>\&"']/g, function (i) {
      return '&#' + i.charCodeAt(0) + ';';
    });
  };

  const decodeEntities = (str) => {
    const txt = document.createElement('textarea');
    txt.innerHTML = str;
    return txt.value;
  };

  const handleProcess = () => {
    if (mode === 'encode') {
      setOutput(encodeEntities(input));
    } else {
      setOutput(decodeEntities(input));
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    if (output) {
      setInput(output);
      setOutput('');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Input ({mode.toUpperCase()})</span>
          <button className="btn btn-secondary btn-sm" onClick={toggleMode}>
            <ArrowRightLeft size={14} /> Switch to {mode === 'encode' ? 'Decode' : 'Encode'}
          </button>
        </div>
        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            rows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type or paste text..."
          />
          <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary btn-sm" onClick={handleProcess}>
              {mode === 'encode' ? 'Encode to HTML Entities' : 'Decode HTML Entities'}
            </button>
          </div>
        </div>
      </div>

      {output && (
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Result</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Result'}
            </button>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)' }}
              rows={6}
              value={output}
              readOnly
            />
          </div>
        </div>
      )}

      {/* Cheatsheet */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Quick Reference Cheatsheet</span></div>
        <div className="tool-panel-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '8px 16px' }}>Character</th>
                <th style={{ padding: '8px 16px' }}>Entity Name</th>
                <th style={{ padding: '8px 16px' }}>Entity Number</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['&', '&amp;', '&#38;'],
                ['<', '&lt;', '&#60;'],
                ['>', '&gt;', '&#62;'],
                ['"', '&quot;', '&#34;'],
                ["'", '&apos;', '&#39;'],
                ['©', '&copy;', '&#169;'],
                ['®', '&reg;', '&#174;'],
                ['™', '&trade;', '&#8482;'],
                ['€', '&euro;', '&#8364;'],
                ['£', '&pound;', '&#163;'],
              ].map(([c, n, num]) => (
                <tr key={c} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '8px 16px', fontWeight: 700 }}>{c}</td>
                  <td style={{ padding: '8px 16px', fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>{n}</td>
                  <td style={{ padding: '8px 16px', fontFamily: 'var(--font-mono)' }}>{num}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
}
