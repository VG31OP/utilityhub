'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Wand2, Copy, Check, Sparkles } from 'lucide-react';

export default function AiWriterPage() {
  const tool = getToolById('ai-writer');
  const [docType, setDocType] = useState('email'); // email, blog, product, faq
  const [subject, setSubject] = useState('Product launch update');
  const [audience, setAudience] = useState('Early adopters & beta testers');
  const [keyPoints, setKeyPoints] = useState('New dashboard is live, 50% faster loading, free tier available');
  const [generatedOutput, setGeneratedOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generateContent = () => {
    if (docType === 'email') {
      setGeneratedOutput(`Subject: Exciting Update: ${subject}!

Hi there,

We are thrilled to share some exciting news with you regarding ${subject}. As one of our valued ${audience}, you're getting first access to what we've been working on.

Here is what's new:
${keyPoints.split(',').map((p) => `• ${p.trim()}`).join('\n')}

We'd love to hear your thoughts and feedback. Feel free to reply directly to this email!

Best regards,
The Product Team`);
    } else if (docType === 'blog') {
      setGeneratedOutput(`# The Future of ${subject}

In today's fast-paced digital ecosystem, staying ahead requires relentless focus on efficiency and continuous iteration. For ${audience}, navigating ${subject} has never been more vital.

## Why This Matters
${keyPoints}

As we look toward the future, these shifts represent a fundamental evolution in how we work and build.`);
    } else {
      setGeneratedOutput(`### ${subject}
Designed specifically for ${audience}, this release brings together state-of-the-art reliability and sleek aesthetics.

Key Highlights:
${keyPoints.split(',').map((p) => `- ${p.trim()}`).join('\n')}

Get started today and elevate your productivity.`);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(generatedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="ai">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Writing Prompt</span></div>
          <div className="tool-panel-body" style={{ display: 'grid', gap: 14 }}>
            <div>
              <label className="form-label">Format Type</label>
              <div style={{ display: 'flex', gap: 8 }}>
                {['email', 'blog', 'product'].map((t) => (
                  <button
                    key={t}
                    className={`btn btn-sm ${docType === t ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setDocType(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="form-label">Subject / Title</label>
              <input
                type="text"
                className="form-input"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Target Audience</label>
              <input
                type="text"
                className="form-input"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Key Points (comma separated)</label>
              <textarea
                className="form-textarea"
                rows={3}
                value={keyPoints}
                onChange={(e) => setKeyPoints(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" onClick={generateContent}>
              <Wand2 size={16} /> Draft Content
            </button>
          </div>
        </div>

        {/* Generated Text */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Drafted Output</span>
            {generatedOutput && (
              <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy Draft'}
              </button>
            )}
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontSize: '0.85rem', lineHeight: 1.6 }}
              rows={14}
              value={generatedOutput}
              readOnly
              placeholder="Click 'Draft Content' to produce draft..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
