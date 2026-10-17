'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Search, Copy, Check } from 'lucide-react';

const STATUS_CODES = [
  { code: 100, phrase: 'Continue', category: '1xx', desc: 'The initial part of a request has been received and not yet rejected by the server.' },
  { code: 101, phrase: 'Switching Protocols', category: '1xx', desc: 'The server understands and is willing to comply with the client request to change protocol.' },
  { code: 200, phrase: 'OK', category: '2xx', desc: 'The request has succeeded. The meaning of the result depends on the HTTP method.' },
  { code: 201, phrase: 'Created', category: '2xx', desc: 'The request has been fulfilled, resulting in the creation of a new resource.' },
  { code: 202, phrase: 'Accepted', category: '2xx', desc: 'The request has been accepted for processing, but processing has not completed.' },
  { code: 204, phrase: 'No Content', category: '2xx', desc: 'There is no content to send for this request, but the headers may be useful.' },
  { code: 301, phrase: 'Moved Permanently', category: '3xx', desc: 'The URI of the requested resource has been changed permanently to a new location.' },
  { code: 302, phrase: 'Found', category: '3xx', desc: 'This response code means that the URI of requested resource has been changed temporarily.' },
  { code: 304, phrase: 'Not Modified', category: '3xx', desc: 'Tells the client that response has not been modified, so client can use cached version.' },
  { code: 307, phrase: 'Temporary Redirect', category: '3xx', desc: 'Server sends this to direct client to get requested resource at another URI with same method.' },
  { code: 308, phrase: 'Permanent Redirect', category: '3xx', desc: 'Resource is now permanently located at another URI, specified by Location response header.' },
  { code: 400, phrase: 'Bad Request', category: '4xx', desc: 'The server cannot or will not process the request due to something perceived to be a client error.' },
  { code: 401, phrase: 'Unauthorized', category: '4xx', desc: 'The client must authenticate itself to get the requested response.' },
  { code: 403, phrase: 'Forbidden', category: '4xx', desc: 'The client does not have access rights to the content; unlike 401, server knows the client identity.' },
  { code: 404, phrase: 'Not Found', category: '4xx', desc: 'The server can not find the requested resource.' },
  { code: 405, phrase: 'Method Not Allowed', category: '4xx', desc: 'The request method is recognized by the server but is not supported by the target resource.' },
  { code: 408, phrase: 'Request Timeout', category: '4xx', desc: 'This response is sent on an idle connection by some servers.' },
  { code: 409, phrase: 'Conflict', category: '4xx', desc: 'Sent when a request conflicts with the current state of the server.' },
  { code: 410, phrase: 'Gone', category: '4xx', desc: 'Sent when the requested content has been permanently deleted from server, with no forwarding address.' },
  { code: 413, phrase: 'Payload Too Large', category: '4xx', desc: 'Request entity is larger than limits defined by server.' },
  { code: 415, phrase: 'Unsupported Media Type', category: '4xx', desc: 'The media format of requested data is not supported by the server.' },
  { code: 422, phrase: 'Unprocessable Entity', category: '4xx', desc: 'The request was well-formed but was unable to be followed due to semantic errors.' },
  { code: 429, phrase: 'Too Many Requests', category: '4xx', desc: 'The user has sent too many requests in a given amount of time (rate limiting).' },
  { code: 500, phrase: 'Internal Server Error', category: '5xx', desc: 'The server has encountered a situation it does not know how to handle.' },
  { code: 501, phrase: 'Not Implemented', category: '5xx', desc: 'The request method is not supported by the server and cannot be handled.' },
  { code: 502, phrase: 'Bad Gateway', category: '5xx', desc: 'Server acting as a gateway or proxy got an invalid response from the inbound server.' },
  { code: 503, phrase: 'Service Unavailable', category: '5xx', desc: 'The server is not ready to handle the request (e.g. down for maintenance or overloaded).' },
  { code: 504, phrase: 'Gateway Timeout', category: '5xx', desc: 'Server acting as gateway did not get a response in time from upstream server.' },
];

const categoryColors = {
  '1xx': 'rgba(59, 130, 246, 0.2)',
  '2xx': 'rgba(16, 185, 129, 0.2)',
  '3xx': 'rgba(245, 158, 11, 0.2)',
  '4xx': 'rgba(239, 68, 68, 0.2)',
  '5xx': 'rgba(168, 85, 247, 0.2)',
};

const categoryText = {
  '1xx': '#60A5FA',
  '2xx': '#34D399',
  '3xx': '#FBBF24',
  '4xx': '#F87171',
  '5xx': '#C084FC',
};

export default function HttpStatusPage() {
  const tool = getToolById('http-status');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [copiedCode, setCopiedCode] = useState(null);

  const filtered = STATUS_CODES.filter((item) => {
    const matchCat = filter === 'all' || item.category === filter;
    const matchQ =
      item.code.toString().includes(query) ||
      item.phrase.toLowerCase().includes(query.toLowerCase()) ||
      item.desc.toLowerCase().includes(query.toLowerCase());
    return matchCat && matchQ;
  });

  const copy = (val) => {
    navigator.clipboard.writeText(val);
    setCopiedCode(val);
    setTimeout(() => setCopiedCode(null), 1500);
  };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
            <Search size={16} style={{ position: 'absolute', left: 12, top: 12, color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="form-input"
              style={{ paddingLeft: 38 }}
              placeholder="Search status code, e.g. 404, Not Found, timeout..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', gap: 6 }}>
            {['all', '1xx', '2xx', '3xx', '4xx', '5xx'].map((cat) => (
              <button
                key={cat}
                className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(cat)}
              >
                {cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gap: 12 }}>
        {filtered.map((item) => (
          <div
            key={item.code}
            className="tool-panel"
            style={{
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1 }}>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontWeight: 700,
                  fontSize: '1.1rem',
                  padding: '6px 12px',
                  borderRadius: 8,
                  background: categoryColors[item.category],
                  color: categoryText[item.category],
                }}
              >
                {item.code}
              </span>
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{item.phrase}</h4>
                <p style={{ margin: '4px 0 0', fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.desc}</p>
              </div>
            </div>

            <button
              className={`btn btn-sm ${copiedCode === item.code ? 'btn-copy copied' : 'btn-ghost'}`}
              onClick={() => copy(`${item.code} ${item.phrase}`)}
            >
              {copiedCode === item.code ? <Check size={14} /> : <Copy size={14} />}
            </button>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
