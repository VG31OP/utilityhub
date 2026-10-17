'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { KeyRound, Lock, Unlock, Copy, Check } from 'lucide-react';

export default function EncryptionPage() {
  const tool = getToolById('encryption');
  const [text, setText] = useState('Secret message for your eyes only.');
  const [password, setPassword] = useState('my-super-secret-key');
  const [result, setResult] = useState('');
  const [mode, setMode] = useState('encrypt');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Derive AES-GCM Key using Web Crypto API
  const deriveKey = async (pass, salt) => {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(pass),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    );
    return crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  };

  const handleEncrypt = async () => {
    try {
      setError('');
      const enc = new TextEncoder();
      const salt = crypto.getRandomValues(new Uint8Array(16));
      const iv = crypto.getRandomValues(new Uint8Array(12));
      const key = await deriveKey(password, salt);

      const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        enc.encode(text)
      );

      // Pack salt + iv + ciphertext as Base64
      const combined = new Uint8Array(salt.length + iv.length + encrypted.byteLength);
      combined.set(salt, 0);
      combined.set(iv, salt.length);
      combined.set(new Uint8Array(encrypted), salt.length + iv.length);

      let binary = '';
      for (let i = 0; i < combined.byteLength; i++) {
        binary += String.fromCharCode(combined[i]);
      }
      setResult(btoa(binary));
    } catch (e) {
      setError('Encryption failed: ' + e.message);
    }
  };

  const handleDecrypt = async () => {
    try {
      setError('');
      const raw = atob(text.trim());
      const bytes = new Uint8Array(raw.length);
      for (let i = 0; i < raw.length; i++) {
        bytes[i] = raw.charCodeAt(i);
      }

      const salt = bytes.slice(0, 16);
      const iv = bytes.slice(16, 28);
      const ciphertext = bytes.slice(28);

      const key = await deriveKey(password, salt);
      const decrypted = await crypto.subtle.decrypt(
        { name: 'AES-GCM', iv: iv },
        key,
        ciphertext
      );

      const dec = new TextDecoder();
      setResult(dec.decode(decrypted));
    } catch (e) {
      setError('Decryption failed: Incorrect password or corrupted ciphertext.');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="security">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Input ({mode.toUpperCase()})</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className={`btn btn-sm ${mode === 'encrypt' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setMode('encrypt'); setResult(''); setError(''); }}
              >
                Encrypt
              </button>
              <button
                className={`btn btn-sm ${mode === 'decrypt' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => { setMode('decrypt'); setResult(''); setError(''); }}
              >
                Decrypt
              </button>
            </div>
          </div>

          <div className="tool-panel-body">
            <div>
              <label className="form-label">{mode === 'encrypt' ? 'Plaintext Message' : 'Encrypted Base64 Payload'}</label>
              <textarea
                className="form-textarea"
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={mode === 'encrypt' ? 'Enter text to encrypt...' : 'Paste ciphertext...'}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Secret Passphrase</label>
              <input
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter secret key..."
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <button
                className="btn btn-primary"
                onClick={mode === 'encrypt' ? handleEncrypt : handleDecrypt}
              >
                {mode === 'encrypt' ? <Lock size={16} /> : <Unlock size={16} />}
                {mode === 'encrypt' ? 'Encrypt with AES-256' : 'Decrypt Payload'}
              </button>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Output</span>
            {result && (
              <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy Result'}
              </button>
            )}
          </div>
          <div className="tool-panel-body">
            {error && (
              <div style={{ color: 'var(--danger)', fontSize: '0.85rem', marginBottom: 12 }}>
                {error}
              </div>
            )}
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={8}
              value={result}
              readOnly
              placeholder="Result will appear here..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
