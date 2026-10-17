'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, ArrowRightLeft } from 'lucide-react';

export default function JsonToCsvPage() {
  const tool = getToolById('json-to-csv');
  const [jsonInput, setJsonInput] = useState(`[
  { "id": 1, "name": "Alice Johnson", "role": "Lead Developer", "salary": 125000 },
  { "id": 2, "name": "Bob Smith", "role": "Product Manager", "salary": 115000 },
  { "id": 3, "name": "Charlie Brown", "role": "UI/UX Designer", "salary": 95000 }
]`);
  const [csvOutput, setCsvOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const convertJsonToCsv = (json) => {
    const data = JSON.parse(json);
    if (!Array.isArray(data) || data.length === 0) return '';
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers
        .map((h) => {
          let val = row[h] !== undefined ? String(row[h]) : '';
          if (val.includes(',') || val.includes('"') || val.includes('\n')) {
            val = `"${val.replace(/"/g, '""')}"`;
          }
          return val;
        })
        .join(',')
    );
    return [headers.join(','), ...rows].join('\n');
  };

  const handleConvert = () => {
    try {
      setCsvOutput(convertJsonToCsv(jsonInput));
    } catch (e) {
      setCsvOutput('Error: Please provide a valid JSON array of objects.');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(csvOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadCsv = () => {
    const blob = new Blob([csvOutput], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="file">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>JSON Input (Array of Objects)</span></div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder="Paste JSON array..."
            />
            <div style={{ marginTop: 14 }}>
              <button className="btn btn-primary btn-sm" onClick={handleConvert}>
                <ArrowRightLeft size={14} /> Convert to CSV
              </button>
            </div>
          </div>
        </div>

        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>CSV Output</span>
            {csvOutput && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={downloadCsv}>
                  <Download size={14} /> Download .csv
                </button>
              </div>
            )}
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={csvOutput}
              readOnly
              placeholder="Click Convert to see CSV result..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
