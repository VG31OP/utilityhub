'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, ShieldAlert } from 'lucide-react';

export default function CorsGeneratorPage() {
  const tool = getToolById('cors-generator');
  const [origin, setOrigin] = useState('*');
  const [methods, setMethods] = useState(['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']);
  const [headers, setHeaders] = useState('Content-Type, Authorization, X-Requested-With');
  const [credentials, setCredentials] = useState(true);
  const [maxAge, setMaxAge] = useState(86400);
  const [platform, setPlatform] = useState('nextjs');
  const [copied, setCopied] = useState(false);

  const toggleMethod = (m) => {
    if (methods.includes(m)) {
      setMethods(methods.filter((x) => x !== m));
    } else {
      setMethods([...methods, m]);
    }
  };

  const getSnippet = () => {
    const methodStr = methods.join(', ');

    if (platform === 'nextjs') {
      return `// app/api/example/route.js (Next.js App Router)
export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '${origin}',
      'Access-Control-Allow-Methods': '${methodStr}',
      'Access-Control-Allow-Headers': '${headers}',
      'Access-Control-Allow-Credentials': '${credentials}',
      'Access-Control-Max-Age': '${maxAge}',
    },
  });
}`;
    }

    if (platform === 'express') {
      return `// Express.js Middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '${origin}');
  res.header('Access-Control-Allow-Methods', '${methodStr}');
  res.header('Access-Control-Allow-Headers', '${headers}');
  res.header('Access-Control-Allow-Credentials', '${credentials}');
  res.header('Access-Control-Max-Age', '${maxAge}');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});`;
    }

    // Nginx
    return `# Nginx Configuration
location /api/ {
  add_header 'Access-Control-Allow-Origin' '${origin}' always;
  add_header 'Access-Control-Allow-Methods' '${methodStr}' always;
  add_header 'Access-Control-Allow-Headers' '${headers}' always;
  add_header 'Access-Control-Allow-Credentials' '${credentials}' always;
  add_header 'Access-Control-Max-Age' '${maxAge}' always;

  if ($request_method = 'OPTIONS') {
    return 204;
  }
}`;
  };

  const copy = () => {
    navigator.clipboard.writeText(getSnippet());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="security">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>CORS Rules</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Allowed Origin</label>
              <input
                type="text"
                className="form-input"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                placeholder="* or https://yourdomain.com"
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Allowed HTTP Methods</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'].map((m) => (
                  <button
                    key={m}
                    className={`btn btn-sm ${methods.includes(m) ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => toggleMethod(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Allowed Headers</label>
              <input
                type="text"
                className="form-input"
                value={headers}
                onChange={(e) => setHeaders(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.85rem' }}>
                <input
                  type="checkbox"
                  checked={credentials}
                  onChange={(e) => setCredentials(e.target.checked)}
                />
                Allow Credentials (Cookies / Authorization headers)
              </label>
            </div>
          </div>
        </div>

        {/* Code Snippet */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Server Implementation</span>
            <div style={{ display: 'flex', gap: 8 }}>
              {['nextjs', 'express', 'nginx'].map((p) => (
                <button
                  key={p}
                  className={`btn btn-sm ${platform === p ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setPlatform(p)}
                >
                  {p === 'nextjs' ? 'Next.js' : p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
              <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            </div>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}
              rows={14}
              value={getSnippet()}
              readOnly
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
