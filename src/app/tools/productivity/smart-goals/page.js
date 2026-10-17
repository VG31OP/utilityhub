'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Trophy, Copy, Check } from 'lucide-react';

export default function SmartGoalsPage() {
  const tool = getToolById('smart-goals');
  const [specific, setSpecific] = useState('Launch MVP of SaaS product with 5 core tools');
  const [measurable, setMeasurable] = useState('Acquire 500 active weekly users and 5 paid subscribers');
  const [achievable, setAchievable] = useState('Dedicate 15 hours every week and utilize Next.js framework');
  const [relevant, setRelevant] = useState('Validates product-market fit before building further features');
  const [timeBound, setTimeBound] = useState('By December 31, 2026');
  const [copied, setCopied] = useState(false);

  const goalSummary = `🎯 SMART GOAL STATEMENT:
I will ${specific.toLowerCase()}, measured by ${measurable.toLowerCase()}. This is achievable because ${achievable.toLowerCase()}, which is relevant to my vision because ${relevant.toLowerCase()}. Target completion deadline: ${timeBound}.`;

  const copy = () => {
    navigator.clipboard.writeText(goalSummary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="productivity">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>SMART Framework Prompts</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 16 }}>
            <div>
              <label className="form-label">S — Specific (What exactly do you want to accomplish?)</label>
              <input
                type="text"
                className="form-input"
                value={specific}
                onChange={(e) => setSpecific(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">M — Measurable (How will you measure progress & success?)</label>
              <input
                type="text"
                className="form-input"
                value={measurable}
                onChange={(e) => setMeasurable(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">A — Achievable (Is this realistic with available resources?)</label>
              <input
                type="text"
                className="form-input"
                value={achievable}
                onChange={(e) => setAchievable(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">R — Relevant (Why does this matter to your long-term goals?)</label>
              <input
                type="text"
                className="form-input"
                value={relevant}
                onChange={(e) => setRelevant(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">T — Time-Bound (What is your target deadline?)</label>
              <input
                type="text"
                className="form-input"
                value={timeBound}
                onChange={(e) => setTimeBound(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Goal Manifesto Output */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Generated Goal Manifesto</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy Statement'}
            </button>
          </div>
          <div className="tool-panel-body">
            <div
              style={{
                padding: 20,
                background: 'var(--bg-secondary)',
                borderRadius: 12,
                fontSize: '0.95rem',
                lineHeight: 1.6,
                border: '1px solid var(--border-color)',
                fontFamily: 'inherit',
                whiteSpace: 'pre-wrap',
              }}
            >
              {goalSummary}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
