'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Download, RefreshCw, Shuffle } from 'lucide-react';

const FIRST_NAMES = ['Liam', 'Olivia', 'Noah', 'Emma', 'Oliver', 'Charlotte', 'Elijah', 'Amelia', 'James', 'Ava'];
const LAST_NAMES = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const CITIES = ['New York', 'London', 'Tokyo', 'Berlin', 'Paris', 'Sydney', 'Toronto', 'Singapore', 'Amsterdam', 'San Francisco'];
const ROLES = ['Developer', 'Designer', 'Product Manager', 'Data Analyst', 'Marketing Specialist'];

export default function MockDataPage() {
  const tool = getToolById('mock-data');
  const [count, setCount] = useState(10);
  const [format, setFormat] = useState('json'); // 'json' | 'csv'
  const [dataOutput, setDataOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const generateData = () => {
    const rows = [];
    for (let i = 1; i <= count; i++) {
      const fn = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const ln = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      const city = CITIES[Math.floor(Math.random() * CITIES.length)];
      const role = ROLES[Math.floor(Math.random() * ROLES.length)];
      const email = `${fn.toLowerCase()}.${ln.toLowerCase()}@example.com`;
      const salary = Math.floor(Math.random() * 80000) + 60000;
      const isActive = Math.random() > 0.3;

      rows.push({
        id: i,
        firstName: fn,
        lastName: ln,
        email,
        role,
        city,
        salary,
        isActive,
      });
    }

    if (format === 'json') {
      setDataOutput(JSON.stringify(rows, null, 2));
    } else {
      const headers = ['id', 'firstName', 'lastName', 'email', 'role', 'city', 'salary', 'isActive'];
      const csvLines = [
        headers.join(','),
        ...rows.map(r => `${r.id},"${r.firstName}","${r.lastName}","${r.email}","${r.role}","${r.city}",${r.salary},${r.isActive}`)
      ];
      setDataOutput(csvLines.join('\n'));
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(dataOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadFile = () => {
    const ext = format === 'json' ? 'json' : 'csv';
    const type = format === 'json' ? 'application/json' : 'text/csv';
    const blob = new Blob([dataOutput], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mock-data.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <ToolLayout tool={tool} category="file">
      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Mock Data Settings</span>
          <button className="btn btn-primary btn-sm" onClick={generateData}>
            <Shuffle size={14} /> Generate Data
          </button>
        </div>
        <div className="tool-panel-body">
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', alignItems: 'center' }}>
            <div>
              <label className="form-label">Number of Rows: {count}</label>
              <input
                type="range"
                min="5"
                max="100"
                step="5"
                value={count}
                onChange={(e) => setCount(Number(e.target.value))}
                style={{ width: 160 }}
              />
            </div>

            <div>
              <label className="form-label">Export Format</label>
              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  className={`btn btn-sm ${format === 'json' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFormat('json')}
                >
                  JSON
                </button>
                <button
                  className={`btn btn-sm ${format === 'csv' ? 'btn-primary' : 'btn-secondary'}`}
                  onClick={() => setFormat('csv')}
                >
                  CSV
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tool-panel">
        <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>Generated Dataset Output</span>
          {dataOutput && (
            <div style={{ display: 'flex', gap: 8 }}>
              <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-secondary'}`} onClick={copy}>
                {copied ? <Check size={14} /> : <Copy size={14} />}
                {copied ? 'Copied' : 'Copy'}
              </button>
              <button className="btn btn-secondary btn-sm" onClick={downloadFile}>
                <Download size={14} /> Download .{format}
              </button>
            </div>
          )}
        </div>
        <div className="tool-panel-body">
          <textarea
            className="form-textarea"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
            rows={14}
            value={dataOutput}
            readOnly
            placeholder="Click 'Generate Data' to create mock users..."
          />
        </div>
      </div>
    </ToolLayout>
  );
}
