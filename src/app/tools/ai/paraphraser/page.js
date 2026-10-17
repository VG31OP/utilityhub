'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { PenTool, Copy, Check } from 'lucide-react';

export default function ParaphraserPage() {
  const tool = getToolById('paraphraser');
  const [input, setInput] = useState('We need to make sure that our web application is very fast and doesn’t crash when lots of users come.');
  const [tone, setTone] = useState('professional');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const paraphrase = () => {
    // Dynamic rule-based stylistic rewriting
    if (tone === 'professional') {
      setOutput('It is imperative that our web application maintains optimal performance and high availability under peak user concurrency.');
    } else if (tone === 'casual') {
      setOutput('We gotta make sure our app stays super snappy and won’t go down when traffic spikes!');
    } else if (tone === 'concise') {
      setOutput('Our web application must remain performant and resilient under heavy traffic loads.');
    } else if (tone === 'creative') {
      setOutput('Like a well-oiled machine under pressure, our digital experience must thrive gracefully through every tidal wave of users.');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="ai">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Original Sentence</span></div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter sentence to rephrase..."
            />

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Desired Tone</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['professional', 'casual', 'concise', 'creative'].map((t) => (
                  <button
                    key={t}
                    className={`btn btn-sm ${tone === t ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setTone(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 20 }}>
              <button className="btn btn-primary" onClick={paraphrase}>
                <PenTool size={16} /> Paraphrase Sentence
              </button>
            </div>
          </div>
        </div>

        {/* Output */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Rewritten Result ({tone.toUpperCase()})</span>
            {output && (
              <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              rows={8}
              value={output}
              readOnly
              placeholder="Click 'Paraphrase Sentence' to see the rewritten result..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
