'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { LayoutDashboard, Clock } from 'lucide-react';

const HOURS = [
  '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM',
  '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
  '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
];

export default function DailyPlannerPage() {
  const tool = getToolById('daily-planner');
  const [schedule, setSchedule] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem('utilityhub_daily_planner');
      if (saved) setSchedule(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const handleUpdate = (hour, text) => {
    const updated = { ...schedule, [hour]: text };
    setSchedule(updated);
    try {
      localStorage.setItem('utilityhub_daily_planner', JSON.stringify(updated));
    } catch (e) {}
  };

  return (
    <ToolLayout tool={tool} category="productivity">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Hour-by-Hour Time Blocking</span></div>
        <div className="tool-panel-body" style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <tbody>
              {HOURS.map((hr) => (
                <tr key={hr} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600, color: 'var(--primary)', width: 120, fontFamily: 'var(--font-mono)' }}>
                    {hr}
                  </td>
                  <td style={{ padding: '6px 16px' }}>
                    <input
                      type="text"
                      className="form-input"
                      style={{ border: 'none', background: 'transparent' }}
                      placeholder="Add event or task..."
                      value={schedule[hr] || ''}
                      onChange={(e) => handleUpdate(hr, e.target.value)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
}
