'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, FileJson } from 'lucide-react';

export default function SchemaMarkupPage() {
  const tool = getToolById('schema-markup');
  const [schemaType, setSchemaType] = useState('Organization');
  const [name, setName] = useState('Acme Corporation');
  const [url, setUrl] = useState('https://example.com');
  const [logo, setLogo] = useState('https://example.com/logo.png');
  const [desc, setDesc] = useState('Innovative software and developer tooling provider.');
  const [copied, setCopied] = useState(false);

  let schemaObj = {};
  if (schemaType === 'Organization') {
    schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: name,
      url: url,
      logo: logo,
      description: desc,
    };
  } else if (schemaType === 'Article') {
    schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: name,
      description: desc,
      author: { '@type': 'Person', name: 'Author Name' },
      publisher: { '@type': 'Organization', name: 'Publisher', logo: { '@type': 'ImageObject', url: logo } },
      url: url,
    };
  } else if (schemaType === 'Product') {
    schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: name,
      image: logo,
      description: desc,
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        price: '29.99',
        availability: 'https://schema.org/InStock',
        url: url,
      },
    };
  } else if (schemaType === 'FAQPage') {
    schemaObj = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What services do you offer?',
          acceptedAnswer: { '@type': 'Answer', text: desc },
        },
      ],
    };
  }

  const jsonLdString = `<script type="application/ld+json">\n${JSON.stringify(schemaObj, null, 2)}\n</script>`;

  const copy = () => {
    navigator.clipboard.writeText(jsonLdString);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="seo">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Schema Information</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Schema Type</label>
              <select
                className="form-input"
                value={schemaType}
                onChange={(e) => setSchemaType(e.target.value)}
              >
                <option value="Organization">Organization / Business</option>
                <option value="Article">Article / Blog Post</option>
                <option value="Product">Product / Service</option>
                <option value="FAQPage">FAQ Page</option>
              </select>
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Name / Title</label>
              <input
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Website URL</label>
              <input
                type="text"
                className="form-input"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Logo / Image URL</label>
              <input
                type="text"
                className="form-input"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Description</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>JSON-LD Output</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy JSON-LD'}
            </button>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              rows={16}
              value={jsonLdString}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
