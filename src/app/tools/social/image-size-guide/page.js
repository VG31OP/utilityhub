'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { ImageIcon, Search } from 'lucide-react';

const SIZE_GUIDES = [
  { platform: 'Instagram', item: 'Square Feed Post', w: 1080, h: 1080, ratio: '1:1' },
  { platform: 'Instagram', item: 'Portrait Feed Post', w: 1080, h: 1350, ratio: '4:5' },
  { platform: 'Instagram', item: 'Story / Reel', w: 1080, h: 1920, ratio: '9:16' },
  { platform: 'Instagram', item: 'Profile Picture', w: 320, h: 320, ratio: '1:1' },
  { platform: 'YouTube', item: 'Video Thumbnail', w: 1280, h: 720, ratio: '16:9' },
  { platform: 'YouTube', item: 'Channel Banner', w: 2560, h: 1440, ratio: '16:9' },
  { platform: 'YouTube', item: 'Profile Avatar', w: 800, h: 800, ratio: '1:1' },
  { platform: 'Twitter / X', item: 'Header Banner', w: 1500, h: 500, ratio: '3:1' },
  { platform: 'Twitter / X', item: 'Feed Image', w: 1600, h: 900, ratio: '16:9' },
  { platform: 'Twitter / X', item: 'Profile Photo', w: 400, h: 400, ratio: '1:1' },
  { platform: 'LinkedIn', item: 'Company Banner', w: 1128, h: 191, ratio: '5.9:1' },
  { platform: 'LinkedIn', item: 'Feed Post Image', w: 1200, h: 627, ratio: '1.91:1' },
  { platform: 'LinkedIn', item: 'Profile Picture', w: 400, h: 400, ratio: '1:1' },
  { platform: 'TikTok', item: 'Full Video / Story', w: 1080, h: 1920, ratio: '9:16' },
  { platform: 'TikTok', item: 'Profile Photo', w: 200, h: 200, ratio: '1:1' },
];

export default function ImageSizeGuidePage() {
  const tool = getToolById('image-size-guide');
  const [activePlatform, setActivePlatform] = useState('All');
  const [query, setQuery] = useState('');

  const platforms = ['All', 'Instagram', 'YouTube', 'Twitter / X', 'LinkedIn', 'TikTok'];

  const filtered = SIZE_GUIDES.filter((item) => {
    const matchPlat = activePlatform === 'All' || item.platform === activePlatform;
    const matchQ =
      item.item.toLowerCase().includes(query.toLowerCase()) ||
      item.platform.toLowerCase().includes(query.toLowerCase());
    return matchPlat && matchQ;
  });

  return (
    <ToolLayout tool={tool} category="social">
      <div className="tool-panel">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: 38 }}
              placeholder="Search format (e.g. thumbnail, banner, story)..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {platforms.map((p) => (
              <button
                key={p}
                className={`btn btn-sm ${activePlatform === p ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setActivePlatform(p)}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="tool-panel">
        <div className="tool-panel-header"><span>Recommended Dimensions (2026 Standards)</span></div>
        <div className="tool-panel-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '12px 16px' }}>Platform</th>
                <th style={{ padding: '12px 16px' }}>Asset Type</th>
                <th style={{ padding: '12px 16px' }}>Resolution (Width x Height)</th>
                <th style={{ padding: '12px 16px' }}>Aspect Ratio</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '12px 16px', fontWeight: 600, color: 'var(--primary)' }}>{item.platform}</td>
                  <td style={{ padding: '12px 16px' }}>{item.item}</td>
                  <td style={{ padding: '12px 16px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                    {item.w} × {item.h} px
                  </td>
                  <td style={{ padding: '12px 16px', color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
                    {item.ratio}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
}
