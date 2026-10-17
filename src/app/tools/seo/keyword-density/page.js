'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Scroll } from 'lucide-react';

const STOP_WORDS = new Set([
  'a', 'about', 'above', 'after', 'again', 'against', 'all', 'am', 'an', 'and', 'any', 'are', 'as', 'at',
  'be', 'because', 'been', 'before', 'being', 'below', 'between', 'both', 'but', 'by',
  'could', 'did', 'do', 'does', 'doing', 'down', 'during', 'each', 'few', 'for', 'from', 'further',
  'had', 'has', 'have', 'having', 'he', 'her', 'here', 'hers', 'herself', 'him', 'himself', 'his', 'how',
  'i', 'if', 'in', 'into', 'is', 'it', 'its', 'itself', 'just', 'me', 'more', 'most', 'my', 'myself',
  'no', 'nor', 'not', 'now', 'of', 'off', 'on', 'once', 'only', 'or', 'other', 'our', 'ours', 'ourselves', 'out', 'over', 'own',
  'same', 'she', 'should', 'so', 'some', 'such', 'than', 'that', 'the', 'their', 'theirs', 'them', 'themselves', 'then', 'there', 'these', 'they', 'this', 'those', 'through', 'to', 'too',
  'under', 'until', 'up', 'very', 'was', 'we', 'were', 'what', 'when', 'where', 'which', 'while', 'who', 'whom', 'why', 'with', 'would', 'you', 'your', 'yours', 'yourself', 'yourselves'
]);

export default function KeywordDensityPage() {
  const tool = getToolById('keyword-density');
  const [text, setText] = useState(`Search engine optimization (SEO) is the process of improving the quality and quantity of website traffic to a website or a web page from search engines. SEO targets unpaid traffic rather than direct traffic or paid traffic. Unpaid traffic may originate from different kinds of searches, including image search, video search, academic search, news search, and industry-specific vertical search engines.`);
  const [filterStopWords, setFilterStopWords] = useState(true);

  // Analysis
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(Boolean);

  const totalWords = words.length;

  const wordCounts = {};
  words.forEach((w) => {
    if (filterStopWords && STOP_WORDS.has(w)) return;
    if (w.length < 2) return;
    wordCounts[w] = (wordCounts[w] || 0) + 1;
  });

  const sortedKeywords = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([word, count]) => {
      const density = totalWords > 0 ? ((count / totalWords) * 100).toFixed(2) : 0;
      return { word, count, density };
    });

  return (
    <ToolLayout tool={tool} category="seo">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Content Analyzer</span>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.82rem' }}>
            <input
              type="checkbox"
              checked={filterStopWords}
              onChange={(e) => setFilterStopWords(e.target.checked)}
            />
            Filter common stop words
          </label>
        </div>
        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste text here to analyze keyword density..."
          />
          <div style={{ marginTop: 10, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Total Word Count: <strong>{totalWords}</strong> words
          </div>
        </div>
      </div>

      {/* Density Table */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Top Keywords & Densities</span></div>
        <div className="tool-panel-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)', textAlign: 'left' }}>
                <th style={{ padding: '10px 16px' }}>Keyword</th>
                <th style={{ padding: '10px 16px' }}>Count</th>
                <th style={{ padding: '10px 16px' }}>Density</th>
                <th style={{ padding: '10px 16px' }}>SEO Evaluation</th>
              </tr>
            </thead>
            <tbody>
              {sortedKeywords.map((item) => {
                const dNum = Number(item.density);
                let badge = { text: 'Optimal (1-3%)', color: 'var(--accent-teal)' };
                if (dNum > 4) badge = { text: 'High (Warning: Stuffing)', color: 'var(--danger)' };
                else if (dNum < 1) badge = { text: 'Low (< 1%)', color: 'var(--text-muted)' };

                return (
                  <tr key={item.word} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '10px 16px', fontWeight: 600 }}>{item.word}</td>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)' }}>{item.count}</td>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
                      {item.density}%
                    </td>
                    <td style={{ padding: '10px 16px', color: badge.color, fontSize: '0.8rem', fontWeight: 600 }}>
                      {badge.text}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
}
