'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Clock, RefreshCw } from 'lucide-react';

export default function UnixTimestampPage() {
  const tool = getToolById('unix-timestamp');
  const [currentTs, setCurrentTs] = useState(0);
  const [inputTs, setInputTs] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [copiedKey, setCopiedKey] = useState('');

  useEffect(() => {
    const update = () => {
      const now = Math.floor(Date.now() / 1000);
      setCurrentTs(now);
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentTs && !inputTs) {
      setInputTs(currentTs.toString());
      const d = new Date(currentTs * 1000);
      setInputDate(d.toISOString().slice(0, 16));
    }
  }, [currentTs, inputTs]);

  const copyVal = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(''), 1500);
  };

  let parsedDateFromTs = null;
  let parsedError = '';
  try {
    if (inputTs) {
      const num = Number(inputTs);
      const ms = inputTs.length > 11 ? num : num * 1000;
      const d = new Date(ms);
      if (isNaN(d.getTime())) {
        parsedError = 'Invalid timestamp value';
      } else {
        parsedDateFromTs = {
          iso: d.toISOString(),
          utc: d.toUTCString(),
          local: d.toLocaleString(),
          seconds: Math.floor(d.getTime() / 1000),
          milliseconds: d.getTime(),
        };
      }
    }
  } catch (e) {
    parsedError = 'Invalid timestamp format';
  }

  const handleDateChange = (val) => {
    setInputDate(val);
    const d = new Date(val);
    if (!isNaN(d.getTime())) {
      setInputTs(Math.floor(d.getTime() / 1000).toString());
    }
  };

  return (
    <ToolLayout tool={tool} category="developer">
      {/* Current live epoch */}
      <div className="tool-panel" style={{ textAlign: 'center', padding: '28px 20px' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 600 }}>
          Current Unix Epoch Time
        </span>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)', margin: '10px 0' }}>
          {currentTs || '...'}
        </div>
        <button
          className={`btn btn-sm ${copiedKey === 'current' ? 'btn-copy copied' : 'btn-secondary'}`}
          onClick={() => copyVal(currentTs.toString(), 'current')}
        >
          {copiedKey === 'current' ? <Check size={14} /> : <Copy size={14} />}
          {copiedKey === 'current' ? 'Copied' : 'Copy Current Timestamp'}
        </button>
      </div>

      {/* Converter Input Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Timestamp to Date</span></div>
          <div className="tool-panel-body">
            <label className="form-label">Unix Timestamp (seconds or ms)</label>
            <input
              type="text"
              className="form-input"
              value={inputTs}
              onChange={(e) => setInputTs(e.target.value)}
              placeholder="e.g. 1700000000"
            />
          </div>
        </div>

        <div className="tool-panel">
          <div className="tool-panel-header"><span>Date to Timestamp</span></div>
          <div className="tool-panel-body">
            <label className="form-label">Pick Date & Time</label>
            <input
              type="datetime-local"
              className="form-input"
              value={inputDate}
              onChange={(e) => handleDateChange(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Conversion Output */}
      {parsedDateFromTs && (
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Formatted Date & Time</span></div>
          <div className="tool-panel-body" style={{ padding: 0 }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
              <tbody>
                {[
                  ['Local Time', parsedDateFromTs.local],
                  ['UTC / GMT', parsedDateFromTs.utc],
                  ['ISO 8601', parsedDateFromTs.iso],
                  ['Seconds (Epoch)', parsedDateFromTs.seconds.toString()],
                  ['Milliseconds', parsedDateFromTs.milliseconds.toString()],
                ].map(([label, val]) => (
                  <tr key={label} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '10px 16px', fontWeight: 600, color: 'var(--text-muted)', width: 160 }}>{label}</td>
                    <td style={{ padding: '10px 16px', fontFamily: 'var(--font-mono)', wordBreak: 'break-all' }}>{val}</td>
                    <td style={{ padding: '10px 16px', width: 60, textAlign: 'right' }}>
                      <button
                        className={`btn btn-sm ${copiedKey === label ? 'btn-copy copied' : 'btn-ghost'}`}
                        onClick={() => copyVal(val, label)}
                      >
                        {copiedKey === label ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
