'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, RefreshCw, ShieldCheck } from 'lucide-react';

export default function PasswordGeneratorPage() {
  const tool = getToolById('password-generator');
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = '';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (excludeAmbiguous) {
      charset = charset.replace(/[1lI0O]/g, '');
    }

    if (!charset) {
      setPassword('');
      return;
    }

    let res = '';
    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      res += charset[array[i] % charset.length];
    }
    setPassword(res);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeAmbiguous]);

  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="security">
      {/* Generated Password Hero */}
      <div className="tool-panel" style={{ textAlign: 'center', padding: '32px 20px' }}>
        <div
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '1.8rem',
            fontWeight: 700,
            wordBreak: 'break-all',
            padding: '16px 20px',
            background: 'var(--bg-secondary)',
            borderRadius: 12,
            border: '1px solid var(--border-color)',
            marginBottom: 20,
            color: 'var(--accent-teal)',
            letterSpacing: 1.5,
          }}
        >
          {password || 'Select at least one option'}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
          <button className={`btn ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? 'Copied to Clipboard' : 'Copy Password'}
          </button>
          <button className="btn btn-secondary" onClick={generatePassword}>
            <RefreshCw size={16} /> Regenerate
          </button>
        </div>
      </div>

      {/* Options Panel */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Password Settings</span></div>
        <div className="tool-panel-body">
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <label className="form-label">Password Length</label>
              <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>{length} characters</strong>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
              />
              Uppercase Letters (A-Z)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
              />
              Lowercase Letters (a-z)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
              />
              Numbers (0-9)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
              />
              Symbols (!@#$%^&*)
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
              <input
                type="checkbox"
                checked={excludeAmbiguous}
                onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              />
              Exclude Ambiguous (1, l, I, 0, O)
            </label>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
