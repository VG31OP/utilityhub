'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';

export default function WordCounterPage() {
  const tool = getToolById('word-counter');
  const [text, setText] = useState('');

  const stats = {
    characters: text.length,
    charactersNoSpaces: text.replace(/\s/g, '').length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0,
    paragraphs: text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0,
    lines: text.trim() ? text.split(/\n/).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200),
    speakingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 130),
  };

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-panel">
        <div className="tool-panel-header">
          <span>Input Text</span>
          <button className="btn btn-ghost btn-sm" onClick={() => setText('')}>Clear</button>
        </div>
        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            placeholder="Type or paste your text here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={10}
            style={{ minHeight: 200 }}
          />
        </div>
      </div>

      <div className="result-stats">
        {Object.entries({
          Words: stats.words,
          Characters: stats.characters,
          'No Spaces': stats.charactersNoSpaces,
          Sentences: stats.sentences,
          Paragraphs: stats.paragraphs,
          Lines: stats.lines,
          'Read Time': `${stats.readingTime}m`,
          'Speak Time': `${stats.speakingTime}m`,
        }).map(([label, value]) => (
          <div key={label} className="result-stat">
            <div className="result-stat-value">{value}</div>
            <div className="result-stat-label">{label}</div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
