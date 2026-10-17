'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Anchor } from 'lucide-react';

export default function CanonicalUrlPage() {
  const tool = getToolById('canonical-url');
  const [rawUrl, setRawUrl] = useState('https://example.com/blog/article/?utm_source=twitter&session=123#comments');
  const [stripParams, setStripParams] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [trailingSlash, setTrailingSlash] = useState('preserve'); // 'add' | 'remove' | 'preserve'
  const [copied, setCopied] = useState(false);

  let cleanUrl = rawUrl;
  try {
    const u = new URL(rawUrl.trim());
    if (stripParams) {
      u.search = '';
    }
    u.hash = '';

    cleanUrl = u.toString();
    if (lowercase) {
      cleanUrl = cleanUrl.toLowerCase();
    }
    if (trailingSlash === 'add' && !cleanUrl.endsWith('/')) {
      cleanUrl += '/';
    } else if (trailingSlash === 'remove' && cleanUrl.endsWith('/')) {
      cleanUrl = cleanUrl.slice(0, -1);
    }
  } catch (e) {}

  const canonicalTag = `<link rel="canonical" href="${cleanUrl}" />`;

  const copy = () => {
    navigator.clipboard.writeText(canonicalTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="seo">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>URL & Canonical Rules</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Current Page URL (including parameters/hash)</label>
              <input
                type="text"
                className="form-input"
                value={rawUrl}
                onChange={(e) => setRawUrl(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16, display: 'grid', gap: 10 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={stripParams}
                  onChange={(e) => setStripParams(e.target.checked)}
                />
                Strip query parameters (UTM tags, tracking, session IDs)
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => setLowercase(e.target.checked)}
                />
                Force all lowercase characters
              </label>
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Trailing Slash Preference</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['preserve', 'add', 'remove'].map((mode) => (
                  <button
                    key={mode}
                    className={`btn btn-sm ${trailingSlash === mode ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setTrailingSlash(mode)}
                  >
                    {mode.charAt(0).toUpperCase() + mode.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Canonical Link Tag</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy HTML'}
            </button>
          </div>
          <div className="tool-panel-body">
            <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 8, marginBottom: 16, fontFamily: 'var(--font-mono)', fontSize: '0.85rem', wordBreak: 'break-all' }}>
              <span style={{ color: 'var(--text-muted)' }}>Normalized URL: </span>
              <strong style={{ color: 'var(--accent-teal)' }}>{cleanUrl}</strong>
            </div>

            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={4}
              value={canonicalTag}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
