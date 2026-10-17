'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { ExternalLink, Check, Search } from 'lucide-react';

const NETWORKS = [
  { name: 'GitHub', url: (u) => `https://github.com/${u}`, domain: 'github.com' },
  { name: 'Twitter / X', url: (u) => `https://x.com/${u}`, domain: 'x.com' },
  { name: 'Instagram', url: (u) => `https://instagram.com/${u}`, domain: 'instagram.com' },
  { name: 'YouTube', url: (u) => `https://youtube.com/@${u}`, domain: 'youtube.com' },
  { name: 'Reddit', url: (u) => `https://reddit.com/user/${u}`, domain: 'reddit.com' },
  { name: 'TikTok', url: (u) => `https://tiktok.com/@${u}`, domain: 'tiktok.com' },
  { name: 'Twitch', url: (u) => `https://twitch.tv/${u}`, domain: 'twitch.tv' },
  { name: 'Telegram', url: (u) => `https://t.me/${u}`, domain: 't.me' },
  { name: 'Medium', url: (u) => `https://medium.com/@${u}`, domain: 'medium.com' },
];

export default function UsernameCheckerPage() {
  const tool = getToolById('username-checker');
  const [username, setUsername] = useState('antigravity');

  const cleanHandle = username.replace(/[^a-zA-Z0-9._-]/g, '');

  return (
    <ToolLayout tool={tool} category="social">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Check Handle</span></div>
        <div className="tool-panel-body">
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <span style={{ position: 'absolute', left: 14, top: 12, color: 'var(--text-muted)', fontWeight: 600 }}>@</span>
              <input
                type="text"
                className="form-input"
                style={{ paddingLeft: 32 }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter handle to check..."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Network Links Grid */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Profile Links for @{cleanHandle}</span></div>
        <div className="tool-panel-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Platform</th>
                <th style={{ padding: '12px 16px' }}>Direct Link</th>
                <th style={{ padding: '12px 16px', width: 120 }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {NETWORKS.map((net) => {
                const targetUrl = net.url(cleanHandle);
                return (
                  <tr key={net.name} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{net.name}</td>
                    <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                      {net.domain}/{cleanHandle}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <a
                        href={targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary btn-sm"
                        style={{ display: 'inline-flex', gap: 6, alignItems: 'center' }}
                      >
                        Check <ExternalLink size={12} />
                      </a>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
}
