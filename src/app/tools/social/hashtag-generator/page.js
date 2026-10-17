'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Hash, Copy, Check, Sparkles } from 'lucide-react';

const HASHTAG_DATABASE = {
  tech: ['#tech', '#technology', '#developer', '#coding', '#software', '#webdev', '#programming', '#javascript', '#reactjs', '#nextjs', '#ai', '#machinelearning', '#innovation', '#gadgets', '#futuretech'],
  business: ['#business', '#entrepreneur', '#startup', '#success', '#marketing', '#leadership', '#smallbusiness', '#hustle', '#businessowner', '#growth', '#investing', '#sales', '#strategy'],
  design: ['#design', '#uiux', '#graphicdesign', '#webdesign', '#designer', '#uidesign', '#uxdesign', '#figma', '#branding', '#creative', '#typography', '#illustration', '#minimalism'],
  fitness: ['#fitness', '#workout', '#gym', '#fit', '#fitnessmotivation', '#health', '#training', '#bodybuilding', '#lifestyle', '#healthy', '#exercise', '#fitfam', '#weightloss'],
  travel: ['#travel', '#wanderlust', '#adventure', '#travelphotography', '#explore', '#vacation', '#nature', '#travelgram', '#trip', '#landscape', '#beautifuldestinations', '#tourism'],
};

export default function HashtagGeneratorPage() {
  const tool = getToolById('hashtag-generator');
  const [topic, setTopic] = useState('tech');
  const [customKeyword, setCustomKeyword] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);
  const [copiedTag, setCopiedTag] = useState('');

  let tags = HASHTAG_DATABASE[topic] || HASHTAG_DATABASE.tech;
  if (customKeyword.trim()) {
    const clean = customKeyword.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    if (clean) {
      const generated = [
        `#${clean}`,
        `#${clean}life`,
        `#${clean}community`,
        `#${clean}tips`,
        `#${clean}daily`,
        `#${clean}lover`,
        `#best${clean}`,
        `#${clean}inspiration`,
      ];
      tags = [...new Set([...generated, ...tags])];
    }
  }

  const copyAll = () => {
    navigator.clipboard.writeText(tags.join(' '));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 1500);
  };

  const copyOne = (t) => {
    navigator.clipboard.writeText(t);
    setCopiedTag(t);
    setTimeout(() => setCopiedTag(''), 1500);
  };

  return (
    <ToolLayout tool={tool} category="social">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Topic & Keywords</span></div>
        <div className="tool-panel-body">
          <label className="form-label">Niche Category</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
            {Object.keys(HASHTAG_DATABASE).map((k) => (
              <button
                key={k}
                className={`btn btn-sm ${topic === k ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setTopic(k)}
              >
                {k.charAt(0).toUpperCase() + k.slice(1)}
              </button>
            ))}
          </div>

          <label className="form-label">Custom Keyword (optional)</label>
          <input
            type="text"
            className="form-input"
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            placeholder="e.g. productivity, nextjs, coffee..."
          />
        </div>
      </div>

      {/* Generated Tags */}
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Generated Hashtags ({tags.length})</span>
          <button className={`btn btn-sm ${copiedAll ? 'btn-copy copied' : 'btn-primary'}`} onClick={copyAll}>
            {copiedAll ? <Check size={14} /> : <Copy size={14} />}
            {copiedAll ? 'Copied All' : 'Copy All Hashtags'}
          </button>
        </div>
        <div className="tool-panel-body">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => copyOne(t)}
                className={`btn btn-sm ${copiedTag === t ? 'btn-copy copied' : 'btn-secondary'}`}
                style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
