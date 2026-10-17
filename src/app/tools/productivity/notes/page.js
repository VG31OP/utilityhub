'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, Trash2, StickyNote } from 'lucide-react';

export default function NotesPage() {
  const tool = getToolById('notes');
  const [content, setContent] = useState('Welcome to Quick Notes! Auto-saved right to your browser local storage.');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('utilityhub_quick_notes');
      if (saved !== null) setContent(saved);
    } catch (e) {}
  }, []);

  const handleChange = (e) => {
    const val = e.target.value;
    setContent(val);
    try {
      localStorage.setItem('utilityhub_quick_notes', val);
    } catch (e) {}
  };

  const copy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadTxt = () => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'quick-notes.md';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearNotes = () => {
    if (window.confirm('Are you sure you want to clear your notes?')) {
      setContent('');
      try {
        localStorage.removeItem('utilityhub_quick_notes');
      } catch (e) {}
    }
  };

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const charCount = content.length;

  return (
    <ToolLayout tool={tool} category="productivity">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Auto-Saved Scratchpad</span>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              {wordCount} words • {charCount} chars
            </span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button className="btn btn-secondary btn-sm" onClick={downloadTxt}>
              <Download size={14} /> Download .md
            </button>
            <button className="btn btn-ghost btn-sm" onClick={clearNotes} style={{ color: 'var(--danger)' }}>
              <Trash2 size={14} />
            </button>
          </div>
        </div>

        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            style={{ fontSize: '0.95rem', lineHeight: 1.6, minHeight: 350 }}
            value={content}
            onChange={handleChange}
            placeholder="Type your notes, ideas, or meeting snippets here..."
          />
        </div>
      </div>
    </ToolLayout>
  );
}
