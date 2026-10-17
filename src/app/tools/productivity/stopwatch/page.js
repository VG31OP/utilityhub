'use client';
import { useState, useEffect, useRef } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Play, Pause, RotateCcw, Flag } from 'lucide-react';

export default function StopwatchPage() {
  const tool = getToolById('stopwatch');
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isRunning]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  const handleLap = () => {
    setLaps((prev) => [time, ...prev]);
  };

  const formatTime = (ms) => {
    const mins = Math.floor(ms / 60000);
    const secs = Math.floor((ms % 60000) / 1000);
    const centis = Math.floor((ms % 1000) / 10);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}.${centis.toString().padStart(2, '0')}`;
  };

  return (
    <ToolLayout tool={tool} category="productivity">
      <div className="tool-panel" style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center', padding: '36px 20px' }}>
        {/* Big Stopwatch Display */}
        <div
          style={{
            fontSize: '4.5rem',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: 'var(--primary)',
            letterSpacing: 2,
            marginBottom: 28,
          }}
        >
          {formatTime(time)}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 28 }}>
          <button
            className={`btn ${isRunning ? 'btn-secondary' : 'btn-primary'}`}
            style={{ padding: '12px 28px', fontSize: '1rem', fontWeight: 600 }}
            onClick={handleStartStop}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? 'Pause' : 'Start'}
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleLap}
            disabled={!isRunning}
          >
            <Flag size={18} /> Lap
          </button>

          <button
            className="btn btn-secondary"
            onClick={handleReset}
            disabled={time === 0}
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>

        {/* Laps List */}
        {laps.length > 0 && (
          <div style={{ textAlign: 'left', borderTop: '1px solid var(--border-color)', paddingTop: 20 }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 12 }}>
              Recorded Laps ({laps.length})
            </div>
            <div style={{ maxHeight: 220, overflowY: 'auto', display: 'grid', gap: 6 }}>
              {laps.map((lapTime, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '8px 14px',
                    borderRadius: 6,
                    background: 'var(--bg-secondary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.85rem',
                  }}
                >
                  <span style={{ color: 'var(--text-muted)' }}>Lap #{laps.length - i}</span>
                  <span style={{ fontWeight: 700 }}>{formatTime(lapTime)}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  );
}
