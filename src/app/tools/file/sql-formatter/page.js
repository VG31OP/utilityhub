'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Sparkles, Database } from 'lucide-react';

export default function SqlFormatterPage() {
  const tool = getToolById('sql-formatter');
  const [sqlInput, setSqlInput] = useState(`select u.id, u.name, u.email, o.total_amount, o.created_at from users u inner join orders o on u.id = o.user_id where o.status = 'completed' and o.total_amount > 100 group by u.id, u.name, u.email, o.total_amount, o.created_at order by o.total_amount desc limit 50;`);
  const [sqlOutput, setSqlOutput] = useState('');
  const [uppercaseKw, setUppercaseKw] = useState(true);
  const [copied, setCopied] = useState(false);

  const formatSql = (sql) => {
    const keywords = [
      'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'ORDER BY', 'GROUP BY', 'HAVING',
      'JOIN', 'INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'CROSS JOIN', 'OUTER JOIN',
      'INSERT INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE FROM', 'LIMIT', 'OFFSET',
      'UNION', 'UNION ALL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
    ];

    let formatted = sql.replace(/\s+/g, ' ').trim();

    keywords.forEach((kw) => {
      const reg = new RegExp(`\\b${kw}\\b`, 'gi');
      formatted = formatted.replace(reg, `\n${uppercaseKw ? kw.toUpperCase() : kw.toLowerCase()}`);
    });

    // Indent sub-clauses
    formatted = formatted
      .split('\n')
      .map((line) => {
        const trimmed = line.trim();
        if (/^(AND|OR|LEFT JOIN|RIGHT JOIN|INNER JOIN|JOIN|ON)\b/i.test(trimmed)) {
          return '  ' + trimmed;
        }
        return trimmed;
      })
      .filter(Boolean)
      .join('\n');

    return formatted;
  };

  const handleFormat = () => {
    setSqlOutput(formatSql(sqlInput));
  };

  const copy = () => {
    navigator.clipboard.writeText(sqlOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="file">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Input SQL Query</span>
            <label style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', fontSize: '0.8rem' }}>
              <input
                type="checkbox"
                checked={uppercaseKw}
                onChange={(e) => setUppercaseKw(e.target.checked)}
              />
              Uppercase Keywords
            </label>
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={sqlInput}
              onChange={(e) => setSqlInput(e.target.value)}
              placeholder="Paste raw SQL query..."
            />
            <div style={{ marginTop: 14 }}>
              <button className="btn btn-primary btn-sm" onClick={handleFormat}>
                <Sparkles size={14} /> Format SQL
              </button>
            </div>
          </div>
        </div>

        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Formatted SQL</span>
            {sqlOutput && (
              <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
            )}
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={sqlOutput}
              readOnly
              placeholder="Click Format SQL to see structured query..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
