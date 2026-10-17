'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check } from 'lucide-react';

const WORDS = ['lorem','ipsum','dolor','sit','amet','consectetur','adipiscing','elit','sed','do','eiusmod','tempor','incididunt','ut','labore','et','dolore','magna','aliqua','enim','ad','minim','veniam','quis','nostrud','exercitation','ullamco','laboris','nisi','aliquip','ex','ea','commodo','consequat','duis','aute','irure','in','reprehenderit','voluptate','velit','esse','cillum','fugiat','nulla','pariatur','excepteur','sint','occaecat','cupidatat','non','proident','sunt','culpa','qui','officia','deserunt','mollit','anim','id','est','laborum'];

function generateWords(count) {
  let result = [];
  for (let i = 0; i < count; i++) result.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  result[0] = result[0].charAt(0).toUpperCase() + result[0].slice(1);
  return result.join(' ') + '.';
}

function generateSentences(count) {
  let sentences = [];
  for (let i = 0; i < count; i++) {
    const wordCount = Math.floor(Math.random() * 10) + 5;
    sentences.push(generateWords(wordCount));
  }
  return sentences.join(' ');
}

function generateParagraphs(count) {
  let paragraphs = [];
  for (let i = 0; i < count; i++) {
    const sentenceCount = Math.floor(Math.random() * 4) + 3;
    paragraphs.push(generateSentences(sentenceCount));
  }
  return paragraphs.join('\n\n');
}

export default function LoremIpsumPage() {
  const tool = getToolById('lorem-ipsum');
  const [type, setType] = useState('paragraphs');
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (type === 'words') setOutput(generateWords(count));
    else if (type === 'sentences') setOutput(generateSentences(count));
    else setOutput(generateParagraphs(count));
  };

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Options</span></div>
        <div className="tool-panel-body">
          <div className="flex gap-4" style={{ flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div className="form-group" style={{ flex: 1, minWidth: 150 }}>
              <label className="form-label">Type</label>
              <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="paragraphs">Paragraphs</option>
                <option value="sentences">Sentences</option>
                <option value="words">Words</option>
              </select>
            </div>
            <div className="form-group" style={{ flex: 1, minWidth: 150 }}>
              <label className="form-label">Count</label>
              <input type="number" className="form-input" min={1} max={100} value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} />
            </div>
            <button className="btn btn-primary" onClick={generate} style={{ marginBottom: 16 }}>Generate</button>
          </div>
        </div>
      </div>

      {output && (
        <div className="tool-panel">
          <div className="tool-panel-header">
            <span>Generated Text</span>
            <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-copy'}`} onClick={copy}>
              {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
            </button>
          </div>
          <div className="tool-panel-body">
            <div className="output-box" style={{ whiteSpace: 'pre-wrap' }}>{output}</div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
