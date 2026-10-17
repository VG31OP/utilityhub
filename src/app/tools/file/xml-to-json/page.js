'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, ArrowRightLeft } from 'lucide-react';

export default function XmlToJsonPage() {
  const tool = getToolById('xml-to-json');
  const [xmlInput, setXmlInput] = useState(`<note>
  <to>Tove</to>
  <from>Jani</from>
  <heading>Reminder</heading>
  <body>Don't forget me this weekend!</body>
</note>`);
  const [jsonOutput, setJsonOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const xmlToJson = (xml) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');

    const parseNode = (node) => {
      // Text node
      if (node.nodeType === 3) {
        return node.nodeValue.trim();
      }

      const obj = {};

      // Attributes
      if (node.attributes && node.attributes.length > 0) {
        obj['@attributes'] = {};
        for (let i = 0; i < node.attributes.length; i++) {
          const attr = node.attributes.item(i);
          obj['@attributes'][attr.nodeName] = attr.nodeValue;
        }
      }

      // Children
      if (node.hasChildNodes()) {
        for (let i = 0; i < node.childNodes.length; i++) {
          const item = node.childNodes.item(i);
          const nodeName = item.nodeName;

          if (item.nodeType === 3) {
            const val = item.nodeValue.trim();
            if (val) return val;
            continue;
          }

          const parsedChild = parseNode(item);
          if (obj[nodeName] === undefined) {
            obj[nodeName] = parsedChild;
          } else {
            if (!Array.isArray(obj[nodeName])) {
              obj[nodeName] = [obj[nodeName]];
            }
            obj[nodeName].push(parsedChild);
          }
        }
      }

      return obj;
    };

    const root = doc.documentElement;
    if (!root || doc.getElementsByTagName('parsererror').length > 0) {
      throw new Error('Invalid XML syntax');
    }

    const res = {};
    res[root.nodeName] = parseNode(root);
    return res;
  };

  const handleConvert = () => {
    try {
      const parsed = xmlToJson(xmlInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
    } catch (e) {
      setJsonOutput('Error: Unable to parse XML. Please check for well-formed syntax.');
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
          <div className="tool-panel-header"><span>XML Source</span></div>
          <div className="tool-panel-body">
            <textarea
              className="form-textarea"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
              rows={12}
              value={xmlInput}
              onChange={(e) => setXmlInput(e.target.value)}
              placeholder="Paste XML markup..."
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
            <span>JSON Result</span>
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
