'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, ArrowRightLeft } from 'lucide-react';

export default function YamlToJsonPage() {
  const tool = getToolById('yaml-to-json');
  const [yamlInput, setYamlInput] = useState(`name: UtilityHub
version: 1.0.0
private: true
features:
  - Fast
  - Client-side
  - Free`);
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Client-side YAML parser for standard key-value & lists
  const parseYaml = (yaml) => {
    const lines = yaml.split('\n');
    const root = {};
    let currentKey = null;
    let inList = false;

    for (let raw of lines) {
      const line = raw.trim();
      if (!line || line.startsWith('#')) continue;

      if (line.startsWith('- ')) {
        const item = line.slice(2).trim();
        if (currentKey) {
          if (!Array.isArray(root[currentKey])) root[currentKey] = [];
          root[currentKey].push(isNaN(Number(item)) ? item : Number(item));
        }
      } else if (line.includes(':')) {
        const parts = line.split(':');
        const key = parts[0].trim();
        let val = parts.slice(1).join(':').trim();

        if (val === '') {
          currentKey = key;
          root[key] = [];
        } else {
          currentKey = null;
          if (val === 'true') root[key] = true;
          else if (val === 'false') root[key] = false;
          else if (!isNaN(Number(val))) root[key] = Number(val);
          else root[key] = val.replace(/^['"]|['"]$/g, '');
        }
      }
    }
    return root;
  };

  const handleConvert = () => {
    try {
      const parsed = parseYaml(yamlInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setJsonOutput('Error parsing YAML');
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
    a.download = 'converted.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="file">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>YAML Input</span></div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={yamlInput}
              onChange={(e) => setYamlInput(e.target.value)}
              placeholder="Paste YAML content..."
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
