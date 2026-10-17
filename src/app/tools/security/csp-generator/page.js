'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, FolderLock } from 'lucide-react';

export default function CspGeneratorPage() {
  const tool = getToolById('csp-generator');
  const [defaultSrc, setDefaultSrc] = useState("'self'");
  const [scriptSrc, setScriptSrc] = useState("'self' https://trustedscripts.com");
  const [styleSrc, setStyleSrc] = useState("'self' 'unsafe-inline' https://fonts.googleapis.com");
  const [imgSrc, setImgSrc] = useState("'self' data: https:");
  const [connectSrc, setConnectSrc] = useState("'self' https://api.example.com");
  const [fontSrc, setFontSrc] = useState("'self' https://fonts.gstatic.com");
  const [frameSrc, setFrameSrc] = useState("'none'");
  const [copied, setCopied] = useState(false);

  const policy = `default-src ${defaultSrc}; script-src ${scriptSrc}; style-src ${styleSrc}; img-src ${imgSrc}; connect-src ${connectSrc}; font-src ${fontSrc}; frame-src ${frameSrc};`;
  const metaTag = `<meta http-equiv="Content-Security-Policy" content="${policy}">`;

  const copy = () => {
    navigator.clipboard.writeText(policy);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="security">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Directives</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 14 }}>
            <div>
              <label className="form-label">default-src</label>
              <input type="text" className="form-input" value={defaultSrc} onChange={(e) => setDefaultSrc(e.target.value)} />
            </div>
            <div>
              <label className="form-label">script-src</label>
              <input type="text" className="form-input" value={scriptSrc} onChange={(e) => setScriptSrc(e.target.value)} />
            </div>
            <div>
              <label className="form-label">style-src</label>
              <input type="text" className="form-input" value={styleSrc} onChange={(e) => setStyleSrc(e.target.value)} />
            </div>
            <div>
              <label className="form-label">img-src</label>
              <input type="text" className="form-input" value={imgSrc} onChange={(e) => setImgSrc(e.target.value)} />
            </div>
            <div>
              <label className="form-label">connect-src</label>
              <input type="text" className="form-input" value={connectSrc} onChange={(e) => setConnectSrc(e.target.value)} />
            </div>
            <div>
              <label className="form-label">font-src</label>
              <input type="text" className="form-input" value={fontSrc} onChange={(e) => setFontSrc(e.target.value)} />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Policy Output</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Header'}
            </button>
          </div>
          <div className="tool-panel-body">
            <label className="form-label">HTTP Header Value</label>
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', marginBottom: 16 }}
              rows={5}
              value={policy}
              readOnly
            />

            <label className="form-label">HTML Meta Tag</label>
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              rows={4}
              value={metaTag}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
