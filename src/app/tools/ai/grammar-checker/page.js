'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { MessageSquare, Check, Sparkles, AlertCircle } from 'lucide-react';

const COMMON_MISTAKES = [
  { match: /\bteh\b/gi, fix: 'the', msg: 'Typo: "teh" -> "the"' },
  { match: /\brecieve\b/gi, fix: 'receive', msg: 'Spelling: "recieve" -> "receive"' },
  { match: /\bseperate\b/gi, fix: 'separate', msg: 'Spelling: "seperate" -> "separate"' },
  { match: /\buntill\b/gi, fix: 'until', msg: 'Spelling: "untill" -> "until"' },
  { match: /\bdefinately\b/gi, fix: 'definitely', msg: 'Spelling: "definately" -> "definitely"' },
  { match: /\boccured\b/gi, fix: 'occurred', msg: 'Spelling: "occured" -> "occurred"' },
  { match: /\bi\b/g, fix: 'I', msg: 'Capitalization: standalone "i" should be capitalized' },
  { match: /\s{2,}/g, fix: ' ', msg: 'Spacing: Multiple consecutive spaces found' },
  { match: /\b(\w+)\s+\1\b/gi, fix: '$1', msg: 'Repeated word detected' },
];

export default function GrammarCheckerPage() {
  const tool = getToolById('grammar-checker');
  const [text, setText] = useState('i will definately recieve teh package untill seperate orders are processed.');
  const [issues, setIssues] = useState([]);
  const [isClean, setIsClean] = useState(false);

  const checkGrammar = () => {
    const found = [];
    COMMON_MISTAKES.forEach((rule) => {
      if (rule.match.test(text)) {
        found.push(rule);
      }
    });
    setIssues(found);
    setIsClean(found.length === 0);
  };

  const autoFixAll = () => {
    let corrected = text;
    COMMON_MISTAKES.forEach((rule) => {
      corrected = corrected.replace(rule.match, rule.fix);
    });
    setText(corrected);
    setIssues([]);
    setIsClean(true);
  };

  return (
    <ToolLayout tool={tool} category="ai">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Text Editor</span>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="btn btn-primary btn-sm" onClick={checkGrammar}>
                <Sparkles size={14} /> Check Grammar
              </button>
              {issues.length > 0 && (
                <button className="btn btn-secondary btn-sm" onClick={autoFixAll}>
                  Auto-Fix All
                </button>
              )}
            </div>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              rows={8}
              value={text}
              onChange={(e) => { setText(e.target.value); setIsClean(false); }}
              placeholder="Enter text to check for spelling and grammar errors..."
            />
          </div>
        </div>

        {/* Audit Results */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Audit Feedback</span></div>
          <div className="tool-panel-body">
            {isClean && (
              <div style={{ textAlign: 'center', padding: 24, color: 'var(--accent-teal)' }}>
                <Check size={32} style={{ margin: '0 auto 10px' }} />
                <div style={{ fontWeight: 700 }}>No issues found!</div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Text looks clean and free of common typos.</p>
              </div>
            )}

            {issues.length > 0 && (
              <div style={{ display: 'grid', gap: 10 }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--danger)' }}>
                  Found {issues.length} potential issue{issues.length > 1 ? 's' : ''}:
                </div>
                {issues.map((issue, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 14px',
                      borderRadius: 8,
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                    }}
                  >
                    <AlertCircle size={16} style={{ color: 'var(--danger)', flexShrink: 0 }} />
                    <span>{issue.msg}</span>
                  </div>
                ))}
              </div>
            )}

            {!isClean && issues.length === 0 && (
              <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem', padding: 24 }}>
                Click "Check Grammar" to analyze your writing.
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
