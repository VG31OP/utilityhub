'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Sparkles, Copy, Check } from 'lucide-react';

export default function TextSummarizerPage() {
  const tool = getToolById('text-summarizer');
  const [inputText, setInputText] = useState(`Artificial intelligence (AI) is transforming software development and everyday life. By automating repetitive tasks, intelligent systems free up human beings to focus on creative and high-leverage problems. Today, tools can generate code, analyze legal documents, and synthesize data in seconds. However, responsible development requires thoughtful attention to data privacy, algorithmic transparency, and ethics. In the coming decade, human-agent collaboration will become the default operating model for productive knowledge workers across the globe.`);
  const [ratio, setRatio] = useState(50); // 25% or 50%
  const [summary, setSummary] = useState('');
  const [copied, setCopied] = useState(false);

  const summarize = () => {
    const sentences = inputText.split(/(?<=[.?!])\s+/).filter(Boolean);
    if (sentences.length <= 2) {
      setSummary(inputText);
      return;
    }

    // Word frequency ranking
    const words = inputText.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/);
    const freq = {};
    words.forEach((w) => {
      if (w.length > 3) freq[w] = (freq[w] || 0) + 1;
    });

    // Score sentences
    const scored = sentences.map((s, idx) => {
      const sWords = s.toLowerCase().split(/\s+/);
      const score = sWords.reduce((acc, w) => acc + (freq[w] || 0), 0);
      return { s, score, idx };
    });

    const targetCount = Math.max(1, Math.round(sentences.length * (ratio / 100)));
    const topSentences = scored
      .sort((a, b) => b.score - a.score)
      .slice(0, targetCount)
      .sort((a, b) => a.idx - b.idx)
      .map((item) => item.s);

    setSummary(topSentences.join(' '));
  };

  const copy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const originalWords = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;
  const summaryWords = summary.trim() ? summary.trim().split(/\s+/).length : 0;

  return (
    <ToolLayout tool={tool} category="ai">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Source Article / Text</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{originalWords} words</span>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              rows={10}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste article or notes to summarize..."
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {[30, 50, 70].map((pct) => (
                  <button
                    key={pct}
                    className={`btn btn-sm ${ratio === pct ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setRatio(pct)}
                  >
                    {pct}% Length
                  </button>
                ))}
              </div>

              <button className="btn btn-primary btn-sm" onClick={summarize}>
                <Sparkles size={14} /> Summarize Now
              </button>
            </div>
          </div>
        </div>

        {/* Summary Output */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Smart Summary</span>
            {summary && (
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span style={{ fontSize: '0.78rem', color: 'var(--accent-teal)' }}>
                  {summaryWords} words ({Math.round((summaryWords / originalWords) * 100)}% of original)
                </span>
                <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
            )}
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              rows={10}
              value={summary}
              readOnly
              placeholder="Click 'Summarize Now' to generate an intelligent summary..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
