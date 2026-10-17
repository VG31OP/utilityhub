'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, ArrowRightLeft } from 'lucide-react';

export default function TsvToJsonPage() {
  const tool = getToolById('tsv-to-json');
  const [tsvInput, setTsvInput] = useState(`id\tname\tcity\tscore
101\tDavid\tNew York\t92.5
102\tElena\tLondon\t88.0
103\tFrank\tTokyo\t95.5`);
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const parseTsv = (tsv) => {
    const lines = tsv.trim().split('\n');
    if (lines.length < 2) return [];
    const headers = lines[0].split('\t').map((h) => h.trim());
    const list = [];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;
      const values = line.split('\t').map((v) => v.trim());
      const obj = {};
      headers.forEach((h, idx) => {
        const val = values[idx] !== undefined ? values[idx] : '';
        obj[h] = !isNaN(Number(val)) && val !== '' ? Number(val) : val;
      });
      list.push(obj);
    }
    return list;
  };

  const handleConvert = () => {
    try {
      const parsed = parseTsv(tsvInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setJsonOutput('Error parsing TSV.');
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
          <div className="tool-panel-header"><span>Tab-Separated Values (TSV) Input</span></div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={tsvInput}
              onChange={(e) => setTsvInput(e.target.value)}
              placeholder="Paste tab-separated values..."
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
