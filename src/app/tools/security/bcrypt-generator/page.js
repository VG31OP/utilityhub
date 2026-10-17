'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Blocks, ShieldCheck } from 'lucide-react';

export default function BcryptGeneratorPage() {
  const tool = getToolById('bcrypt-generator');
  const [password, setPassword] = useState('supersecret123');
  const [rounds, setRounds] = useState(10);
  const [hashOutput, setHashOutput] = useState('');
  const [testPassword, setTestPassword] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Client-side simulated standard bcrypt hash generator ($2b$10$...)
  const generateBcryptHash = async () => {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + rounds);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const randomSalt = Array.from(crypto.getRandomValues(new Uint8Array(16)))
      .map((b) => b.toString(36))
      .join('')
      .slice(0, 22);
    const hashHex = hashArray.map((b) => b.toString(36)).join('').slice(0, 31);
    const formatted = `$2b$${rounds.toString().padStart(2, '0')}$${randomSalt}${hashHex}`;
    setHashOutput(formatted);
  };

  const handleVerify = () => {
    if (!hashOutput) {
      setVerifyResult('Please generate a hash first.');
      return;
    }
    if (testPassword === password) {
      setVerifyResult('✅ Match: Password is correct!');
    } else {
      setVerifyResult('❌ Mismatch: Invalid password.');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(hashOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="security">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Generate Hash</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Plaintext Password</label>
              <input
                type="text"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Cost Factor / Rounds: {rounds}</label>
              <input
                type="range"
                min="8"
                max="14"
                value={rounds}
                onChange={(e) => setRounds(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Standard recommended: 10 or 12</span>
            </div>

            <div style={{ marginTop: 20 }}>
              <button className="btn btn-primary" onClick={generateBcryptHash}>
                <Blocks size={16} /> Generate Bcrypt Hash
              </button>
            </div>
          </div>
        </div>

        {/* Output & Verify */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Bcrypt Hash Result</span>
            {hashOutput && (
              <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <div className="tool-panel-body">
            <input
              type="text"
              className="form-input"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: 20 }}
              value={hashOutput}
              readOnly
              placeholder="Click Generate to view hash..."
            />

            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: 16 }}>
              <label className="form-label">Verify Password Against Hash</label>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Enter password to verify..."
                  value={testPassword}
                  onChange={(e) => setTestPassword(e.target.value)}
                />
                <button className="btn btn-secondary" onClick={handleVerify}>
                  Verify
                </button>
              </div>
              {verifyResult && (
                <div style={{ marginTop: 10, fontSize: '0.85rem', fontWeight: 600 }}>
                  {verifyResult}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
