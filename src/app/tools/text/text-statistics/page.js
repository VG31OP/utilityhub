'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';

export default function TextStatisticsPage() {
  const tool = getToolById('text-statistics');
  const [text, setText] = useState('');

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const charsNoSpaces = text.replace(/\s/g, '').length;
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0;
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0;
  const lines = text.trim() ? text.split('\n').length : 0;
  const avgWordLen = words > 0 ? (charsNoSpaces / words).toFixed(1) : 0;
  const avgSentLen = sentences > 0 ? (words / sentences).toFixed(1) : 0;
  const readTime = Math.ceil(words / 200);
  const speakTime = Math.ceil(words / 130);

  // Flesch-Kincaid approximation
  const syllables = text.toLowerCase().split(/\s+/).reduce((acc, word) => {
    const matches = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '').match(/[aeiouy]{1,2}/g);
    return acc + (matches ? matches.length : 1);
  }, 0);
  const fleschScore = sentences > 0 ? Math.round(206.835 - 1.015 * (words / sentences) - 84.6 * (syllables / words)) : 0;

  const readability = fleschScore >= 80 ? 'Very Easy' : fleschScore >= 60 ? 'Easy' : fleschScore >= 40 ? 'Moderate' : fleschScore >= 20 ? 'Difficult' : 'Very Difficult';

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Enter Text</span></div>
        <div className="tool-panel-body">
          <textarea className="form-textarea" placeholder="Paste your text to analyze..." value={text} onChange={(e) => setText(e.target.value)} rows={10} />
        </div>
      </div>

      <div className="result-stats">
        {Object.entries({ Words: words, Characters: chars, 'No Spaces': charsNoSpaces, Sentences: sentences, Paragraphs: paragraphs, Lines: lines, 'Avg Word Len': avgWordLen, 'Avg Sent Len': avgSentLen, 'Read Time': `${readTime}m`, 'Speak Time': `${speakTime}m`, 'Flesch Score': fleschScore, Readability: readability }).map(([label, value]) => (
          <div key={label} className="result-stat">
            <div className="result-stat-value">{value}</div>
            <div className="result-stat-label">{label}</div>
          </div>
        ))}
      </div>
    </ToolLayout>
  );
}
