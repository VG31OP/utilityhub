'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Copy, Check, Clock, Play } from 'lucide-react';

export default function CronGeneratorPage() {
  const tool = getToolById('cron-generator');
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayOfMonth, setDayOfMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayOfWeek, setDayOfWeek] = useState('*');
  const [copied, setCopied] = useState(false);

  const cronExpression = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const describeCron = (m, h, dom, mon, dow) => {
    let parts = [];
    if (m === '*' && h === '*' && dom === '*' && mon === '*' && dow === '*') {
      return 'Runs every minute of every day.';
    }
    if (m === '*/5' && h === '*') return 'Runs every 5 minutes.';
    if (m === '*/15' && h === '*') return 'Runs every 15 minutes.';
    if (m === '*/30' && h === '*') return 'Runs every 30 minutes.';
    if (m === '0' && h === '*') return 'Runs at minute 0 of every hour.';
    if (m === '0' && h === '0' && dom === '*' && mon === '*' && dow === '*') return 'Runs daily at midnight (00:00).';
    if (m === '0' && h === '12' && dom === '*' && mon === '*' && dow === '*') return 'Runs daily at noon (12:00 PM).';
    if (dow === '1-5' && m === '0' && h === '9') return 'Runs at 09:00 AM, Monday through Friday.';
    if (dom === '1' && m === '0' && h === '0') return 'Runs at midnight on the first day of every month.';
    if (dow === '0' && m === '0' && h === '0') return 'Runs at midnight on every Sunday.';

    return `Minute: ${m}, Hour: ${h}, Day: ${dom}, Month: ${mon}, Day of Week: ${dow}`;
  };

  const applyPreset = (m, h, dom, mon, dow) => {
    setMinute(m);
    setHour(h);
    setDayOfMonth(dom);
    setMonth(mon);
    setDayOfWeek(dow);
  };

  const copy = () => {
    navigator.clipboard.writeText(cronExpression);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="developer">
      <div className="tool-panel">
        <div className="tool-panel-header">
          <span>Cron Expression Result</span>
        </div>
        <div className="tool-panel-body" style={{ textAlign: 'center', padding: '32px 20px' }}>
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '2rem',
              fontWeight: 700,
              letterSpacing: 4,
              color: 'var(--primary)',
              marginBottom: 12,
            }}
          >
            {cronExpression}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: 20 }}>
            {describeCron(minute, hour, dayOfMonth, month, dayOfWeek)}
          </div>
          <button className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-primary'}`} onClick={copy}>
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copied' : 'Copy Expression'}
          </button>
        </div>
      </div>

      <div className="tool-panel">
        <div className="tool-panel-header">
          <span>Customize Cron Fields</span>
        </div>
        <div className="tool-panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 16 }}>
            <div>
              <label className="form-label">Minute (0-59)</label>
              <input type="text" className="form-input" value={minute} onChange={(e) => setMinute(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Hour (0-23)</label>
              <input type="text" className="form-input" value={hour} onChange={(e) => setHour(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Day of Month (1-31)</label>
              <input type="text" className="form-input" value={dayOfMonth} onChange={(e) => setDayOfMonth(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Month (1-12)</label>
              <input type="text" className="form-input" value={month} onChange={(e) => setMonth(e.target.value)} />
            </div>
            <div>
              <label className="form-label">Day of Week (0-6)</label>
              <input type="text" className="form-input" value={dayOfWeek} onChange={(e) => setDayOfWeek(e.target.value)} />
            </div>
          </div>
        </div>
      </div>

      <div className="tool-panel">
        <div className="tool-panel-header">
          <span>Common Presets</span>
        </div>
        <div className="tool-panel-body">
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <button className="btn btn-secondary btn-sm" onClick={() => applyPreset('*', '*', '*', '*', '*')}>Every Minute</button>
            <button className="btn btn-secondary btn-sm" onClick={() => applyPreset('*/5', '*', '*', '*', '*')}>Every 5 Mins</button>
            <button className="btn btn-secondary btn-sm" onClick={() => applyPreset('*/15', '*', '*', '*', '*')}>Every 15 Mins</button>
            <button className="btn btn-secondary btn-sm" onClick={() => applyPreset('0', '*', '*', '*', '*')}>Every Hour</button>
            <button className="btn btn-secondary btn-sm" onClick={() => applyPreset('0', '0', '*', '*', '*')}>Daily Midnight</button>
            <button className="btn btn-secondary btn-sm" onClick={() => applyPreset('0', '9', '*', '*', '1-5')}>Weekdays 9 AM</button>
            <button className="btn btn-secondary btn-sm" onClick={() => applyPreset('0', '0', '*', '*', '0')}>Weekly Sunday</button>
            <button className="btn btn-secondary btn-sm" onClick={() => applyPreset('0', '0', '1', '*', '*')}>Monthly 1st</button>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
