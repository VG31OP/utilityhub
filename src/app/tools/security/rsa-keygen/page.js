'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { KeyRound, Copy, Check, Download, RefreshCw } from 'lucide-react';

export default function RsaKeygenPage() {
  const tool = getToolById('rsa-keygen');
  const [keySize, setKeySize] = useState(2048);
  const [publicKeyPem, setPublicKeyPem] = useState('');
  const [privateKeyPem, setPrivateKeyPem] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedKey, setCopiedKey] = useState('');

  const arrayBufferToPem = (buffer, type) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    const base64 = btoa(binary);
    const lines = base64.match(/.{1,64}/g) || [];
    return `-----BEGIN ${type}-----\n${lines.join('\n')}\n-----END ${type}-----`;
  };

  const generateKeys = async () => {
    try {
      setIsGenerating(true);
      const keyPair = await crypto.subtle.generateKey(
        {
          name: 'RSA-OAEP',
          modulusLength: keySize,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: 'SHA-256',
        },
        true,
        ['encrypt', 'decrypt']
      );

      const pubSpki = await crypto.subtle.exportKey('spki', keyPair.publicKey);
      const privPkcs8 = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

      setPublicKeyPem(arrayBufferToPem(pubSpki, 'PUBLIC KEY'));
      setPrivateKeyPem(arrayBufferToPem(privPkcs8, 'PRIVATE KEY'));
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const copy = (val, key) => {
    navigator.clipboard.writeText(val);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  const downloadKey = (content, filename) => {
    const blob = new Blob([content], { type: 'application/x-pem-file' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="security">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Key Parameters</span>
          <button className="btn btn-primary btn-sm" onClick={generateKeys} disabled={isGenerating}>
            <KeyRound size={14} /> {isGenerating ? 'Generating Keys...' : 'Generate RSA Key Pair'}
          </button>
        </div>
        <div className="tool-panel-body">
          <label className="form-label">Key Size</label>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              className={`btn btn-sm ${keySize === 2048 ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setKeySize(2048)}
            >
              2048-bit (Fast & Secure)
            </button>
            <button
              className={`btn btn-sm ${keySize === 4086 ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => setKeySize(4096)}
            >
              4096-bit (Maximum Security)
            </button>
          </div>
        </div>
      </div>

      {publicKeyPem && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {/* Public Key */}
          <div className="tool-panel">
            <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Public Key (SPKI)</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  className={`btn btn-sm ${copiedKey === 'public' ? 'btn-copy copied' : 'btn-secondary'}`}
                  onClick={() => copy(publicKeyPem, 'public')}
                >
                  {copiedKey === 'public' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedKey === 'public' ? 'Copied' : 'Copy'}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => downloadKey(publicKeyPem, 'public.pem')}>
                  <Download size={12} />
                </button>
              </div>
            </div>
            <div className="tool-panel-body">
              <textarea
                className="form-textarea"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
                rows={10}
                value={publicKeyPem}
                readOnly
              />
            </div>
          </div>

          {/* Private Key */}
          <div className="tool-panel">
            <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Private Key (PKCS#8)</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  className={`btn btn-sm ${copiedKey === 'private' ? 'btn-copy copied' : 'btn-secondary'}`}
                  onClick={() => copy(privateKeyPem, 'private')}
                >
                  {copiedKey === 'private' ? <Check size={12} /> : <Copy size={12} />}
                  {copiedKey === 'private' ? 'Copied' : 'Copy'}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => downloadKey(privateKeyPem, 'private.pem')}>
                  <Download size={12} />
                </button>
              </div>
            </div>
            <div className="tool-panel-body">
              <textarea
                className="form-textarea"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem' }}
                rows={10}
                value={privateKeyPem}
                readOnly
              />
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
