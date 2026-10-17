'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

export default function PostFormatterPage() {
  const tool = getToolById('post-formatter');
  const [text, setText] = useState('UtilityHub makes web tools super simple.');
  const [copiedKey, setCopiedKey] = useState('');

  // Unicode font maps
  const transform = (str, style) => {
    let res = '';
    for (let char of str) {
      const code = char.charCodeAt(0);
      if (style === 'bold') {
        if (code >= 65 && code <= 90) res += String.fromCodePoint(0x1d400 + (code - 65));
        else if (code >= 97 && code <= 122) res += String.fromCodePoint(0x1d41a + (code - 97));
        else if (code >= 48 && code <= 57) res += String.fromCodePoint(0x1d7ce + (code - 48));
        else res += char;
      } else if (style === 'italic') {
        if (code >= 65 && code <= 90) res += String.fromCodePoint(0x1d434 + (code - 65));
        else if (code >= 97 && code <= 122) res += String.fromCodePoint(0x1d44e + (code - 97));
        else res += char;
      } else if (style === 'mono') {
        if (code >= 65 && code <= 90) res += String.fromCodePoint(0x1d670 + (code - 65));
        else if (code >= 97 && code <= 122) res += String.fromCodePoint(0x1d68a + (code - 97));
        else if (code >= 48 && code <= 57) res += String.fromCodePoint(0x1d7f6 + (code - 48));
        else res += char;
      } else if (style === 'script') {
        if (code >= 65 && code <= 90) res += String.fromCodePoint(0x1d49c + (code - 65));
        else if (code >= 97 && code <= 122) res += String.fromCodePoint(0x1d4b6 + (code - 97));
        else res += char;
      } else if (style === 'strike') {
        res += char + '\u0336';
      } else if (style === 'underline') {
        res += char + '\u0332';
      } else {
        res += char;
      }
    }
    return res;
  };

  const styles = [
    { name: 'Bold Sans', key: 'bold', val: transform(text, 'bold') },
    { name: 'Italic Serif', key: 'italic', val: transform(text, 'italic') },
    { name: 'Monospace Code', key: 'mono', val: transform(text, 'mono') },
    { name: 'Cursive Script', key: 'script', val: transform(text, 'script') },
    { name: 'Strikethrough', key: 'strike', val: transform(text, 'strike') },
    { name: 'Underline', key: 'underline', val: transform(text, 'underline') },
  ];

  const copy = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  return (
    <ToolLayout tool={tool} category="social">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Your Plain Text</span></div>
        <div className="tool-panel-body">
          <input
            type="text"
            className="form-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type text here..."
          />
        </div>
      </div>

      {/* Styled Versions */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Formatted Unicode Styles (Works on Twitter, IG, LinkedIn)</span></div>
        <div className="tool-panel-body" style={{ display: 'grid', gap: 12 }}>
          {styles.map((s) => (
            <div
              key={s.key}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                borderRadius: 8,
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                gap: 16,
              }}
            >
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{s.name}</span>
                <div style={{ fontSize: '1.05rem', marginTop: 4, wordBreak: 'break-all' }}>{s.val}</div>
              </div>
              <button
                className={`btn btn-sm ${copiedKey === s.key ? 'btn-copy copied' : 'btn-secondary'}`}
                onClick={() => copy(s.val, s.key)}
              >
                {copiedKey === s.key ? <Check size={14} /> : <Copy size={14} />}
                {copiedKey === s.key ? 'Copied' : 'Copy'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  );
}
