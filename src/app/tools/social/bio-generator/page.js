'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Sparkles, Copy, Check, RefreshCw } from 'lucide-react';

const BIO_TEMPLATES = {
  professional: [
    (r, s, l) => `Helping teams build better ${s}. ${r} based in ${l}. Let's connect! 🚀`,
    (r, s, l) => `${r} passionate about ${s} & scalable systems. Currently exploring the future of tech. 📍 ${l}`,
    (r, s, l) => `Driven ${r} specializing in ${s}. Turning complex challenges into simple solutions.`,
  ],
  minimalist: [
    (r, s, l) => `${r} • ${s} • ${l}`,
    (r, s, l) => `Building things in ${s}. Based in ${l}.`,
    (r, s, l) => `${r} // Coffee & ${s}`,
  ],
  creative: [
    (r, s, l) => `Crafting digital experiences in ${s} ✨ | ${r} by day, dreamer by night 🌙 | ${l}`,
    (r, s, l) => `Where curiosity meets code ⚡ | ${r} exploring ${s} | Saying hi from ${l} 👋`,
  ],
  witty: [
    (r, s, l) => `Professional over-thinker and ${r}. I convert caffeine into ${s}. ☕`,
    (r, s, l) => `404: Bio not found. Just an average human doing ${s} in ${l}. 🤖`,
  ],
};

export default function BioGeneratorPage() {
  const tool = getToolById('bio-generator');
  const [role, setRole] = useState('Full-Stack Engineer');
  const [skills, setSkills] = useState('Web Applications & AI');
  const [location, setLocation] = useState('San Francisco, CA');
  const [style, setStyle] = useState('professional');
  const [bios, setBios] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generateBios = () => {
    const templates = BIO_TEMPLATES[style] || BIO_TEMPLATES.professional;
    const list = templates.map((fn) => fn(role, skills, location));
    setBios(list);
  };

  const copy = (val, idx) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <ToolLayout tool={tool} category="social">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Your Details</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Role / Headline</label>
              <input
                type="text"
                className="form-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Key Skills / Interests</label>
              <input
                type="text"
                className="form-input"
                value={skills}
                onChange={(e) => setSkills(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Style</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['professional', 'minimalist', 'creative', 'witty'].map((s) => (
                  <button
                    key={s}
                    className={`btn btn-sm ${style === s ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setStyle(s)}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <button className="btn btn-primary btn-sm" onClick={generateBios}>
                <Sparkles size={14} /> Generate Bios
              </button>
            </div>
          </div>
        </div>

        {/* Bio Options */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Generated Social Bios</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 14 }}>
            {bios.length === 0 ? (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32, fontSize: '0.85rem' }}>
                Click "Generate Bios" to create personalized bio suggestions.
              </div>
            ) : (
              bios.map((b, i) => (
                <div
                  key={i}
                  style={{
                    padding: 16,
                    borderRadius: 10,
                    background: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div style={{ fontSize: '0.9rem', lineHeight: 1.5, marginBottom: 12 }}>{b}</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', color: b.length <= 160 ? 'var(--accent-teal)' : 'var(--danger)' }}>
                      {b.length}/160 characters (Twitter & IG compatible)
                    </span>
                    <button
                      className={`btn btn-sm ${copiedIndex === i ? 'btn-copy copied' : 'btn-ghost'}`}
                      onClick={() => copy(b, i)}
                    >
                      {copiedIndex === i ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
