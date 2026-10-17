'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, Map } from 'lucide-react';

export default function SitemapGeneratorPage() {
  const tool = getToolById('sitemap-generator');
  const [urls, setUrls] = useState(`https://example.com/
https://example.com/about
https://example.com/blog
https://example.com/contact`);
  const [changefreq, setChangefreq] = useState('weekly');
  const [priority, setPriority] = useState('0.8');
  const [todayDate, setTodayDate] = useState('2026-10-17');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setTodayDate(new Date().toISOString().slice(0, 10));
  }, []);

  const urlList = urls
    .split('\n')
    .map((u) => u.trim())
    .filter(Boolean);

  const xmlOutput = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlList
  .map(
    (u) => `  <url>
    <loc>${u}</loc>
    <lastmod>${todayDate}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  const copy = () => {
    navigator.clipboard.writeText(xmlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadXml = () => {
    const blob = new Blob([xmlOutput], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="seo">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>URL List & Config</span></div>
          <div className="tool-panel-body">
            <label className="form-label">Enter URLs (one per line)</label>
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={8}
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 16 }}>
              <div>
                <label className="form-label">Change Frequency</label>
                <select
                  className="form-input"
                  value={changefreq}
                  onChange={(e) => setChangefreq(e.target.value)}
                >
                  <option value="always">always</option>
                  <option value="hourly">hourly</option>
                  <option value="daily">daily</option>
                  <option value="weekly">weekly</option>
                  <option value="monthly">monthly</option>
                  <option value="yearly">yearly</option>
                  <option value="never">never</option>
                </select>
              </div>

              <div>
                <label className="form-label">Priority: {priority}</label>
                <select
                  className="form-input"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="1.0">1.0 (Highest)</option>
                  <option value="0.8">0.8</option>
                  <option value="0.6">0.6</option>
                  <option value="0.5">0.5</option>
                  <option value="0.3">0.3</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* XML Output */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Generated sitemap.xml</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button className="btn btn-primary btn-sm" onClick={downloadXml}>
                <Download size={14} /> Download XML
              </button>
            </div>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              rows={14}
              value={xmlOutput}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
