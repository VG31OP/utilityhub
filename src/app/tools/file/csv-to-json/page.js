'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, ArrowRightLeft } from 'lucide-react';

export default function CsvToJsonPage() {
  const tool = getToolById('csv-to-json');
  const [csvInput, setCsvInput] = useState(`id,name,role,department,salary
1,Alice Johnson,Lead Developer,Engineering,125000
2,Bob Smith,Product Manager,Product,115000
3,Charlie Brown,UI/UX Designer,Design,95000`);
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const parseCsv = (csv) => {
    const lines = csv.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split(',').map((h) => h.trim().replace(/^"|"$/g, ''));
    const result = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''));
      const obj = {};
      headers.forEach((header, index) => {
        let val = values[index] !== undefined ? values[index] : '';
        // auto-cast numbers
        if (!isNaN(Number(val)) && val !== '') {
          obj[header] = Number(val);
        } else {
          obj[header] = val;
        }
      });
      result.push(obj);
    }
    return result;
  };

  const handleConvert = () => {
    try {
      const parsed = parseCsv(csvInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setJsonOutput('Error parsing CSV');
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(jsonOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadJson = () => {
    const blob = new Blob([jsonOutput], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="file">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Input CSV</span></div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={csvInput}
              onChange={(e) => setCsvInput(e.target.value)}
              placeholder="Paste comma-separated CSV..."
            />
            <div style={{ marginTop: 14 }}>
              <button className="btn btn-primary btn-sm" onClick={handleConvert}>
                <ArrowRightLeft size={14} /> Convert to JSON
              </button>
            </div>
          </div>
        </div>

        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>JSON Output</span>
            {jsonOutput && (
              <div style={{ display: 'flex', gap: 8 }}>
                <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
                <button className="btn btn-secondary btn-sm" onClick={downloadJson}>
                  <Download size={14} /> Download
                </button>
              </div>
            )}
          </div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={jsonOutput}
              readOnly
              placeholder="Click Convert to see JSON result..."
            />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
