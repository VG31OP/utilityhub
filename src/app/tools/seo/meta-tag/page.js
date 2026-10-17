'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Sparkles } from 'lucide-react';

export default function MetaTagPage() {
  const tool = getToolById('meta-tag');
  const [title, setTitle] = useState('UtilityHub — 110+ Free Online Developer & Daily Tools');
  const [description, setDescription] = useState('The ultimate toolkit for developers, creators, and everyday web users. Fast, free, client-side tools with zero data tracking.');
  const [keywords, setKeywords] = useState('developer tools, online utility, calculators, regex tester, converters');
  const [author, setAuthor] = useState('UtilityHub Team');
  const [robots, setRobots] = useState('index, follow');
  const [copied, setCopied] = useState(false);

  const generatedHtml = `<!-- Primary Meta Tags -->
<title>${title}</title>
<meta name="title" content="${title}" />
<meta name="description" content="${description}" />
<meta name="keywords" content="${keywords}" />
<meta name="author" content="${author}" />
<meta name="robots" content="${robots}" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta charset="UTF-8" />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="${title}" />
<meta property="og:description" content="${description}" />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:title" content="${title}" />
<meta property="twitter:description" content="${description}" />`;

  const copy = () => {
    navigator.clipboard.writeText(generatedHtml);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="seo">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Meta Details</span></div>
          <div className="tool-panel-body">
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Page Title</label>
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
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <label className="form-label">Meta Description</label>
                <span style={{ fontSize: '0.75rem', color: description.length > 160 ? 'var(--danger)' : 'var(--accent-teal)' }}>
                  {description.length}/160 chars
                </span>
              </div>
              <textarea
                className="form-textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Keywords (comma separated)</label>
              <input
                type="text"
                className="form-input"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div>
                <label className="form-label">Author</label>
                <input
                  type="text"
                  className="form-input"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                />
              </div>
              <div>
                <label className="form-label">Robots Directive</label>
                <select
                  className="form-input"
                  value={robots}
                  onChange={(e) => setRobots(e.target.value)}
                >
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Generated HTML Tags</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy HTML'}
            </button>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              rows={16}
              value={generatedHtml}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
