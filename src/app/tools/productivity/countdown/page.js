'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Hourglass, Calendar } from 'lucide-react';

export default function CountdownPage() {
  const tool = getToolById('countdown');
  const [eventName, setEventName] = useState('New Year 2027');
  const [targetDateStr, setTargetDateStr] = useState('2027-01-01T00:00');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: false });

  useEffect(() => {
    const updateCountdown = () => {
      const target = new Date(targetDateStr).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isPassed: false });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDateStr]);

  return (
    <ToolLayout tool={tool} category="productivity">
      {/* Event Configuration */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Event Target</span></div>
        <div className="tool-panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            <div>
              <label className="form-label">Event Name</label>
              <input
                type="text"
                className="form-input"
                value={eventName}
                onChange={(e) => setEventName(e.target.value)}
              />
            </div>

            <div>
              <label className="form-label">Target Date & Time</label>
              <input
                type="datetime-local"
                className="form-input"
                value={targetDateStr}
                onChange={(e) => setTargetDateStr(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Countdown Digits Hero */}
      <div className="tool-panel" style={{ textAlign: 'center', padding: '40px 20px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 24, color: 'var(--text-primary)' }}>
          {eventName}
        </h2>

        {timeLeft.isPassed ? (
          <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent-teal)' }}>
            🎉 Event has arrived!
          </div>
        ) : (
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              ['Days', timeLeft.days],
              ['Hours', timeLeft.hours],
              ['Minutes', timeLeft.minutes],
              ['Seconds', timeLeft.seconds],
            ].map(([label, val]) => (
              <div
                key={label}
                style={{
                  minWidth: 100,
                  padding: '20px 16px',
                  borderRadius: 14,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                }}
              >
                <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                  {val.toString().padStart(2, '0')}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: 1 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
