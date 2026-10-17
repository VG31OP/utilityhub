'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, ArrowRightLeft } from 'lucide-react';

export default function HtmlToMdPage() {
  const tool = getToolById('html-to-md');
  const [htmlInput, setHtmlInput] = useState(`<h1>Heading 1</h1>
<p>This is a paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
<p>Check out <a href="https://utilityhub.dev">UtilityHub</a> for more tools.</p>
<ul>
  <li>First item</li>
  <li>Second item</li>
</ul>
<blockquote>Knowledge is power.</blockquote>`);
  const [mdOutput, setMdOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertHtmlToMd = (html) => {
    return html
      .replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
      .replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
      .replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
      .replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
      .replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
      .replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
      .replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
      .replace(/<a[^>]*href="(.*?)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
      .replace(/<img[^>]*src="(.*?)"[^>]*alt="(.*?)"[^>]*>/gi, '![$2]($1)')
      .replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
      .replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
      .replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
      .replace(/<p[^>]*>(.*?)<\/p>/gi, '$1\n\n')
      .replace(/<br\s*[\/]?>/gi, '\n')
      .replace(/<[^>]+>/g, '') // remove remaining tags
      .replace(/\n{3,}/g, '\n\n')
      .trim();
  };

  const handleConvert = () => {
    setMdOutput(convertHtmlToMd(htmlInput));
  };

  const copy = () => {
    navigator.clipboard.writeText(mdOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadMd = () => {
    const blob = new Blob([mdOutput], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="file">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>HTML Input</span></div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={htmlInput}
              onChange={(e) => setHtmlInput(e.target.value)}
              placeholder="Paste HTML..."
            />
            <div style={{ marginTop: 14 }}>
              <button className="btn btn-primary btn-sm" onClick={handleConvert}>
                <ArrowRightLeft size={14} /> Convert to Markdown
              </button>
            </div>
          </div>
        </div>

        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Markdown Output</span>
            {mdOutput && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={downloadMd}>
                  <Download size={14} /> Download .md
                </button>
              </div>
            )}
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={mdOutput}
              readOnly
              placeholder="Click Convert to see Markdown..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
