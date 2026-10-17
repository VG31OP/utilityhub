'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';

export default function JwtDecoderPage() {
  const tool = getToolById('jwt-decoder');
  const [token, setToken] = useState('');

  const decode = () => {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return { error: 'Invalid JWT: must have 3 parts' };
      const header = JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/')));
      const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
      return { header, payload, signature: parts[2] };
    } catch { return { error: 'Failed to decode JWT' }; }
  };

  const result = token ? decode() : null;

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>JWT Token</span></div>
        <div className="tool-panel-body">
          <textarea className="form-textarea" placeholder="Paste JWT token here..." value={token} onChange={(e) => setToken(e.target.value)} rows={4} />
        </div>
      </div>

      {result && !result.error && (
        <>
          <div className="tool-panel">
            <div className="tool-panel-header"><span>Header</span><span className="tool-panel-badge">ALGORITHM & TOKEN TYPE</span></div>
            <div className="tool-panel-body">
              <div className="code-block">
                <div className="code-block-body" style={{ color: '#C084FC' }}>{JSON.stringify(result.header, null, 2)}</div>
              </div>
            </div>
          </div>
          <div className="tool-panel">
            <div className="tool-panel-header"><span>Payload</span><span className="tool-panel-badge">DATA</span></div>
            <div className="tool-panel-body">
              <div className="code-block">
                <div className="code-block-body" style={{ color: '#4ECDC4' }}>{JSON.stringify(result.payload, null, 2)}</div>
              </div>
              {result.payload.exp && (
                <div className="mt-3" style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  ⏰ Expires: {new Date(result.payload.exp * 1000).toLocaleString()}
                  {result.payload.exp * 1000 < Date.now() ? <span style={{ color: '#EF4444' }}> (EXPIRED)</span> : <span style={{ color: '#10B981' }}> (VALID)</span>}
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {result?.error && <div className="tool-panel" style={{ padding: 20, color: '#EF4444' }}>❌ {result.error}</div>}
    </ToolLayout>
  );
}
