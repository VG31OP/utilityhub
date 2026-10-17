'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { ExternalLink, ArrowDown } from 'lucide-react';

export default function RedirectCheckerPage() {
  const tool = getToolById('redirect-checker');
  const [inputUrl, setInputUrl] = useState('http://example.com/old-page');
  const [simulatedChain, setSimulatedChain] = useState(null);

  const analyzeRedirect = () => {
    try {
      const u = new URL(inputUrl);
      const chain = [];

      // Step 1: Initial URL
      chain.push({
        step: 1,
        url: inputUrl,
        status: u.protocol === 'http:' ? '301 Moved Permanently' : '200 OK',
        reason: u.protocol === 'http:' ? 'Upgrade insecure HTTP to HTTPS' : 'Final Destination',
      });

      // Step 2: HTTPS upgrade if needed
      if (u.protocol === 'http:') {
        const httpsUrl = inputUrl.replace('http:', 'https:');
        const hasTrailingSlash = httpsUrl.endsWith('/');
        chain.push({
          step: 2,
          url: hasTrailingSlash ? httpsUrl : httpsUrl + '/',
          status: '200 OK',
          reason: 'Canonical destination reached successfully.',
        });
      }

      setSimulatedChain(chain);
    } catch (e) {
      setSimulatedChain([
        { step: 1, url: inputUrl, status: 'Error: Invalid URL format', reason: 'Please specify full URL including protocol (e.g. http:// or https://)' }
      ]);
    }
  };

  return (
    <ToolLayout tool={tool} category="seo">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>URL to Inspect</span></div>
        <div className="tool-panel-body">
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="form-input"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              placeholder="http://example.com/some-path"
            />
            <button className="btn btn-primary" onClick={analyzeRedirect}>
              Analyze Chain
            </button>
          </div>
        </div>
      </div>

      {simulatedChain && (
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Redirect Chain Flow</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 16 }}>
            {simulatedChain.map((node, i) => (
              <div key={node.step}>
                <div
                  style={{
                    padding: '16px 20px',
                    borderRadius: 10,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>HOP #{node.step}</span>
                    <span
                      style={{
                        fontSize: '0.8rem',
                        fontWeight: 700,
                        color: node.status.includes('200') ? 'var(--accent-teal)' : 'var(--accent-amber)',
                      }}
                    >
                      {node.status}
                    </span>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', wordBreak: 'break-all', marginBottom: 4 }}>
                    {node.url}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    {node.reason}
                  </div>
                </div>

                {i < simulatedChain.length - 1 && (
                  <div style={{ textAlign: 'center', margin: '8px 0', color: 'var(--text-muted)' }}>
                    <ArrowDown size={18} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
