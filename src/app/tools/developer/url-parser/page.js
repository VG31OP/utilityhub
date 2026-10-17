'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, ExternalLink } from 'lucide-react';

export default function UrlParserPage() {
  const tool = getToolById('url-parser');
  const [urlInput, setUrlInput] = useState('https://example.com:8080/path/to/page?utm_source=google&query=react+tools&theme=dark#section-heading');
  const [copiedKey, setCopiedKey] = useState('');

  let parsed = null;
  let paramsList = [];
  let parseError = '';

  try {
    if (urlInput.trim()) {
      const u = new URL(urlInput.trim());
      parsed = {
        href: u.href,
        protocol: u.protocol,
        origin: u.origin,
        host: u.host,
        hostname: u.hostname,
        port: u.port || '(default)',
        pathname: u.pathname,
        search: u.search,
        hash: u.hash,
        username: u.username || '(none)',
        password: u.password || '(none)',
      };
      u.searchParams.forEach((val, key) => {
        paramsList.push({ key, val });
      });
    }
  } catch (e) {
    parseError = 'Invalid URL format. Please ensure it includes the protocol (e.g. https://).';
  }

  const copyVal = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div className="tool-panel-header">
          <span>Target URL</span>
        </div>
        <div className="tool-panel-body">
          <input
            type="text"
            className="form-input"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com:8080/path?key=value#hash"
          />
        </div>
      </div>

      {parseError && (
        <div className="tool-panel" style={{ borderColor: 'var(--danger)', color: 'var(--danger)', padding: 16 }}>
          {parseError}
        </div>
      )}

      {parsed && (
        <>
          <div className="tool-panel">
            <div className="tool-panel-header">
              <span>URL Components</span>
            </div>
            <div className="tool-panel-body" style={{ padding: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                <tbody>
                  {[
                    ['Protocol', parsed.protocol],
                    ['Origin', parsed.origin],
                    ['Hostname', parsed.hostname],
                    ['Port', parsed.port],
                    ['Pathname', parsed.pathname],
                    ['Query String', parsed.search || '(none)'],
                    ['Hash / Fragment', parsed.hash || '(none)'],
                  ].map(([label, val]) => (
                    <tr key={label} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '10px 16px', fontWeight: 600, color: 'var(--text-muted)', width: 140 }}>{label}</td>
                      <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>{val}</td>
                      <td style={{ padding: '10px 16px', width: 60, textAlign: 'right' }}>
                        <button
                          className={`btn btn-sm ${copiedKey === label ? 'btn-copy copied' : 'btn-ghost'}`}
                          onClick={() => copyVal(val, label)}
                        >
                          {copiedKey === label ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="tool-panel">
            <div className="tool-panel-header">
              <span>Query Parameters ({paramsList.length})</span>
            </div>
            <div className="tool-panel-body" style={{ padding: 0 }}>
              {paramsList.length === 0 ? (
                <div style={{ padding: 16, color: 'var(--text-muted)', fontSize: '0.85rem' }}>No query parameters detected in this URL.</div>
              ) : (
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.85rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                      <th style={{ padding: '10px 16px' }}>Param Key</th>
                      <th style={{ padding: '10px 16px' }}>Decoded Value</th>
                      <th style={{ padding: '10px 16px', width: 60 }}>Copy</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paramsList.map((item, idx) => (
                      <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                        <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>{item.key}</td>
                        <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>{item.val}</td>
                        <td style={{ padding: '10px 16px', textAlign: 'right' }}>
                          <button
                            className={`btn btn-sm ${copiedKey === `param-${idx}` ? 'btn-copy copied' : 'btn-ghost'}`}
                            onClick={() => copyVal(item.val, `param-${idx}`)}
                          >
                            {copiedKey === `param-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </>
      )}
    </ToolLayout>
  );
}
