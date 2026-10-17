'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { DollarSign } from 'lucide-react';

export default function MeetingCostPage() {
  const tool = getToolById('meeting-cost');
  const [attendees, setAttendees] = useState(6);
  const [hourlyRate, setHourlyRate] = useState(65);
  const [durationMinutes, setDurationMinutes] = useState(45);

  const totalHours = (Number(durationMinutes) || 0) / 60;
  const totalCost = Number(attendees) * Number(hourlyRate) * totalHours;
  const costPerMinute = (Number(attendees) * Number(hourlyRate)) / 60;

  return (
    <ToolLayout tool={tool} category="productivity">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Meeting Parameters</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Number of Attendees: {attendees}</label>
              <input
                type="range"
                min="1"
                max="50"
                value={attendees}
                onChange={(e) => setAttendees(Number(e.target.value))}
                style={{ width: '100%' }}
              />
              <input
                type="number"
                className="form-input mt-2"
                value={attendees}
                onChange={(e) => setAttendees(Number(e.target.value))}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Average Hourly Rate ($/hr)</label>
              <input
                type="number"
                className="form-input"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
              />
            </div>

            <div style={{ marginTop: 16 }}>
              <label className="form-label">Meeting Duration: {durationMinutes} minutes</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                {[15, 30, 45, 60, 90].map((m) => (
                  <button
                    key={m}
                    className={`btn btn-sm ${durationMinutes === m ? 'btn-primary' : 'btn-secondary'}`}
                    onClick={() => setDurationMinutes(m)}
                  >
                    {m} min
                  </button>
                ))}
              </div>
              <input
                type="range"
                min="5"
                max="180"
                step="5"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                style={{ width: '100%' }}
              />
            </div>
          </div>
        </div>

        {/* Total Cost Display */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Estimated Meeting Expense</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center', padding: 24 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>This Meeting Costs Your Company</span>
            <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--danger)', margin: '8px 0 20px', fontFamily: 'var(--font-mono)' }}>
              ${totalCost.toFixed(2)}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, textAlign: 'left' }}>
              <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cost Per Minute</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  ${costPerMinute.toFixed(2)}/min
                </div>
              </div>

              <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 10 }}>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Person-Hours</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                  {(attendees * totalHours).toFixed(1)} hrs
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
