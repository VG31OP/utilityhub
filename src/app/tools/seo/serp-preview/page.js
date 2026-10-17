'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { SearchCheck, Smartphone, Monitor } from 'lucide-react';

export default function SerpPreviewPage() {
  const tool = getToolById('serp-preview');
  const [title, setTitle] = useState('UtilityHub — 110+ Free Developer & Daily Tools Online');
  const [url, setUrl] = useState('https://utilityhub.dev/tools');
  const [desc, setDesc] = useState('Supercharge your productivity with 110+ free, instant tools. JSON formatters, QR code generators, calculators, regex testers, SEO tags, and more with zero signup.');
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'mobile'

  let parsedBreadcrumb = 'utilityhub.dev > tools';
  try {
    const u = new URL(url);
    parsedBreadcrumb = u.hostname + (u.pathname.length > 1 ? u.pathname.replace(/\//g, ' > ') : '');
  } catch (e) {}

  return (
    <ToolLayout tool={tool} category="seo">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Search Result Details</span></div>
          <div className="tool-panel-body">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">SEO Page Title</label>
                <span style={{ fontSize: '0.75rem', color: title.length > 60 ? 'var(--danger)' : 'var(--accent-teal)' }}>
                  {title.length}/60 chars
                </span>
              </div>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Destination URL</label>
              <input
                type="text"
                className="form-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Snippet Meta Description</label>
                <span style={{ fontSize: '0.75rem', color: desc.length > 160 ? 'var(--danger)' : 'var(--accent-teal)' }}>
                  {desc.length}/160 chars
                </span>
              </div>
              <textarea
                className="form-textarea"
                rows={4}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Live SERP Mockup */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Google SERP Preview</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className={`btn btn-sm ${device === 'desktop' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setDevice('desktop')}
              >
                <Monitor size={14} /> Desktop
              </button>
              <button
                className={`btn btn-sm ${device === 'mobile' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setDevice('mobile')}
              >
                <Smartphone size={14} /> Mobile
              </button>
            </div>
          </div>

          <div className="tool-panel-body" style={{ background: '#202124', borderRadius: 8, padding: '24px 20px' }}>
            <div style={{ maxWidth: device === 'mobile' ? 360 : 600 }}>
              {/* Breadcrumb / URL */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#4ECDC4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: '#000', fontWeight: 700 }}>
                  U
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#dadce0', lineHeight: 1.2 }}>UtilityHub</div>
                  <div style={{ fontSize: '0.72rem', color: '#bdc1c6', lineHeight: 1.2 }}>{url}</div>
                </div>
              </div>

              {/* Title Link */}
              <h3
                style={{
                  margin: '6px 0',
                  fontSize: device === 'mobile' ? '1.1rem' : '1.25rem',
                  fontWeight: 400,
                  color: '#8ab4f8',
                  lineHeight: 1.3,
                  cursor: 'pointer',
                }}
              >
                {title.length > 60 ? title.slice(0, 60) + '...' : title}
              </h3>

              {/* Description */}
              <p style={{ margin: 0, fontSize: '0.85rem', color: '#bdc1c6', lineHeight: 1.5 }}>
                {desc.length > 160 ? desc.slice(0, 160) + '...' : desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
