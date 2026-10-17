'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Eye, ExternalLink } from 'lucide-react';

export default function OgPreviewPage() {
  const tool = getToolById('og-preview');
  const [title, setTitle] = useState('UtilityHub — 110+ Free Web Tools');
  const [description, setDescription] = useState('Explore our comprehensive collection of 110+ fast, private, free developer and everyday productivity utilities.');
  const [domain, setDomain] = useState('utilityhub.dev');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80');
  const [platform, setPlatform] = useState('twitter');

  return (
    <ToolLayout tool={tool} category="seo">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Open Graph Data</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-input"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Domain Name</label>
              <input
                type="text"
                className="form-input"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Preview Image URL</label>
              <input
                type="text"
                className="form-input"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Live Social Card Preview */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Card Preview</span>
            <div style={{ display: 'flex', gap: 6 }}>
              {['twitter', 'facebook', 'linkedin'].map((p) => (
                <button
                  key={p}
                  className={`btn btn-sm ${platform === p ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setPlatform(p)}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="tool-panel-body" style={{ display: 'flex', justifyContent: 'center', padding: 20 }}>
            {/* Card Mockup */}
            <div
              style={{
                maxWidth: 480,
                width: '100%',
                borderRadius: 14,
                overflow: 'hidden',
                background: '#090D16',
                border: '1px solid var(--border-color)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
              }}
            >
              <div style={{ height: 200, width: '100%', overflow: 'hidden', background: '#1E293B' }}>
                <img
                  src={imageUrl}
                  alt="OG"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>

              <div style={{ padding: 16 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'lowercase', marginBottom: 6 }}>
                  {domain}
                </div>
                <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, lineHeight: 1.3 }}>
                  {title}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
