'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { CalendarDays } from 'lucide-react';

export default function AgeCalculatorPage() {
  const tool = getToolById('age-calculator');
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [ageData, setAgeData] = useState(null);

  useEffect(() => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();
    if (isNaN(birth.getTime())) return;

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const lastMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const diffMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    // Next birthday
    let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < now) {
      nextBday.setFullYear(now.getFullYear() + 1);
    }
    const daysUntilNext = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const bornDayName = daysOfWeek[birth.getDay()];

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      daysUntilNext,
      bornDayName,
    });
  }, [birthDate]);

  return (
    <ToolLayout tool={tool} category="math">
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Date of Birth</span></div>
        <div className="tool-panel-body">
          <input
            type="date"
            className="form-input"
            style={{ maxWidth: 300 }}
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </div>
      </div>

      {ageData && (
        <div style={{ display: 'grid', gap: 20 }}>
          {/* Main Hero Age Display */}
          <div className="tool-panel" style={{ textAlign: 'center', padding: '32px 20px' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Exact Age</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)', margin: '12px 0' }}>
              {ageData.years} <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>Years,</span> {ageData.months} <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>Months,</span> {ageData.days} <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>Days</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              You were born on a <strong>{ageData.bornDayName}</strong>. Next birthday in <strong>{ageData.daysUntilNext} days</strong>!
            </p>
          </div>

          {/* Life Statistics */}
          <div className="tool-panel">
            <div className="tool-panel-header"><span>Total Time Alive</span></div>
            <div className="tool-panel-body">
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                <div style={{ padding: 16, background: 'var(--bg-secondary)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Days</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {ageData.totalDays.toLocaleString()}
                  </div>
                </div>
                <div style={{ padding: 16, background: 'var(--bg-secondary)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Hours</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {ageData.totalHours.toLocaleString()}
                  </div>
                </div>
                <div style={{ padding: 16, background: 'var(--bg-secondary)', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Minutes</div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                    {ageData.totalMinutes.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolLayout>
  );
}
