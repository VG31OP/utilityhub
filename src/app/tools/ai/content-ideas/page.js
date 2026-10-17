'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Lightbulb, Copy, Check, Sparkles } from 'lucide-react';

const IDEA_PATTERNS = [
  (topic) => `The Ultimate Guide to ${topic} in 2026: Everything You Need to Know`,
  (topic) => `5 Critical Mistakes People Make with ${topic} (And How to Avoid Them)`,
  (topic) => `How I Mastered ${topic} in 30 Days Without Breaking the Bank`,
  (topic) => `Top 7 Tools & Frameworks That Will Revolutionize Your ${topic} Workflow`,
  (topic) => `Why Most People Fail at ${topic} — The Unspoken Truth`,
  (topic) => `${topic} vs Traditional Methods: An Honest Comparison`,
  (topic) => `Step-by-Step Blueprint: Automating Your Entire ${topic} Process`,
];

export default function ContentIdeasPage() {
  const tool = getToolById('content-ideas');
  const [topic, setTopic] = useState('Full-Stack Web Development');
  const [ideas, setIdeas] = useState([]);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const generateIdeas = () => {
    if (!topic.trim()) return;
    const generated = IDEA_PATTERNS.map((pattern) => pattern(topic.trim()));
    setIdeas(generated);
  };

  const copy = (text, idx) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  return (
    <ToolLayout tool={tool} category="ai">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Enter Your Niche or Subject</span></div>
        <div className="tool-panel-body">
          <div style={{ display: 'flex', gap: 10 }}>
            <input
              type="text"
              className="form-input"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Remote Work, Next.js, Financial Independence..."
            />
            <button className="btn btn-primary" onClick={generateIdeas}>
              <Sparkles size={16} /> Generate Ideas
            </button>
          </div>
        </div>
      </div>

      {/* Ideas List */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Generated Content Angles ({ideas.length})</span></div>
        <div className="tool-panel-body" style={{ display: 'grid', gap: 12 }}>
          {ideas.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32, fontSize: '0.85rem' }}>
              Click "Generate Ideas" to brainstorm angles for your topic.
            </div>
          ) : (
            ideas.map((idea, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  gap: 16,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-teal)' }}>
                    #{idx + 1}
                  </span>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{idea}</span>
                </div>

                <button
                  className={`btn btn-sm ${copiedIndex === idx ? 'btn-copy copied' : 'btn-ghost'}`}
                  onClick={() => copy(idea, idx)}
                >
                  {copiedIndex === idx ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
