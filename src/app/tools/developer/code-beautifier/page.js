'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Sparkles, RefreshCw } from 'lucide-react';

export default function CodeBeautifierPage() {
  const tool = getToolById('code-beautifier');
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [indentSize, setIndentSize] = useState(2);
  const [copied, setCopied] = useState(false);

  const formatCode = (src, lang, spaces) => {
    if (!src.trim()) return '';
    const pad = ' '.repeat(spaces);

    if (lang === 'json') {
      try {
        return JSON.stringify(JSON.parse(src), null, spaces);
      } catch (err) {
        return src;
      }
    }

    if (lang === 'css') {
      let cleaned = src.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\s+/g, ' ');
      let formatted = '';
      let indentLevel = 0;
      for (let i = 0; i < cleaned.length; i++) {
        const char = cleaned[i];
        if (char === '{') {
          formatted += ' {\n' + pad.repeat(++indentLevel);
        } else if (char === '}') {
          indentLevel = Math.max(0, indentLevel - 1);
          formatted += '\n' + pad.repeat(indentLevel) + '}\n' + pad.repeat(indentLevel);
        } else if (char === ';') {
          formatted += ';\n' + pad.repeat(indentLevel);
        } else {
          formatted += char;
        }
      }
      return formatted.trim();
    }

    if (lang === 'html') {
      let formatted = '';
      let indentLevel = 0;
      const tokens = src.replace(/>\s*</g, '><').split(/(?=<)|(?<=>)/);
      for (let token of tokens) {
        token = token.trim();
        if (!token) continue;
        if (token.startsWith('</')) {
          indentLevel = Math.max(0, indentLevel - 1);
          formatted += pad.repeat(indentLevel) + token + '\n';
        } else if (token.startsWith('<') && !token.endsWith('/>') && !token.startsWith('<!') && !token.startsWith('<?')) {
          formatted += pad.repeat(indentLevel) + token + '\n';
          if (!/^(<input|<img|<br|<hr|<meta|<link)/i.test(token)) {
            indentLevel++;
          }
        } else {
          formatted += pad.repeat(indentLevel) + token + '\n';
        }
      }
      return formatted.trim();
    }

    if (lang === 'sql') {
      const keywords = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING', 'JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'INNER JOIN', 'OUTER JOIN', 'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'LIMIT'];
      let formatted = src;
      keywords.forEach(kw => {
        const reg = new RegExp(`\\b${kw}\\b`, 'gi');
        formatted = formatted.replace(reg, '\n' + kw.toUpperCase());
      });
      return formatted.trim();
    }

    // Default JS basic beautifier
    let formatted = '';
    let indentLevel = 0;
    const lines = src.split('\n');
    for (let rawLine of lines) {
      let line = rawLine.trim();
      if (!line) continue;
      if (line.startsWith('}') || line.startsWith(']')) {
        indentLevel = Math.max(0, indentLevel - 1);
      }
      formatted += pad.repeat(indentLevel) + line + '\n';
      if (line.endsWith('{') || line.endsWith('[')) {
        indentLevel++;
      }
    }
    return formatted.trim();
  };

  const handleBeautify = () => {
    setCode(formatCode(code, language, indentSize));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Code Editor & Formatter</span>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <select
              className="form-input"
              style={{ width: 'auto', padding: '4px 10px', height: 32 }}
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript / TypeScript</option>
              <option value="json">JSON</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="sql">SQL</option>
            </select>
            <select
              className="form-input"
              style={{ width: 'auto', padding: '4px 10px', height: 32 }}
              value={indentSize}
              onChange={(e) => setIndentSize(Number(e.target.value))}
            >
              <option value={2}>2 Spaces</option>
              <option value={4}>4 Spaces</option>
            </select>
          </div>
        </div>

        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
            placeholder={`Paste your ${language.toUpperCase()} code here...`}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            rows={14}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 14 }}>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary btn-sm" onClick={handleBeautify}>
                <Sparkles size={14} /> Beautify Code
              </button>
              <button className="btn btn-secondary btn-sm" onClick={() => setCode('')}>
                <RefreshCw size={14} /> Clear
              </button>
            </div>
            <button
              className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`}
              onClick={handleCopy}
              disabled={!code}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
