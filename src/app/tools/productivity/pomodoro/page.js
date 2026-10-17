'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Play, Pause, RotateCcw, Timer } from 'lucide-react';

export default function PomodoroPage() {
  const tool = getToolById('pomodoro');
  const [mode, setMode] = useState('work'); // 'work' (25m) | 'short' (5m) | 'long' (15m)
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      if (mode === 'work') {
        setSessionsCompleted((s) => s + 1);
        setMode('short');
        setTimeLeft(5 * 60);
      } else {
        setMode('work');
        setTimeLeft(25 * 60);
      }
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, mode]);

  const switchMode = (newMode, minutes) => {
    setMode(newMode);
    setTimeLeft(minutes * 60);
    setIsRunning(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <ToolLayout tool={tool} category="productivity">
      <div className="tool-panel" style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', padding: '36px 24px' }}>
        {/* Mode selector */}
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 28 }}>
          <button
            className={`btn btn-sm ${mode === 'work' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => switchMode('work', 25)}
          >
            Focus Work (25m)
          </button>
          <button
            className={`btn btn-sm ${mode === 'short' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => switchMode('short', 5)}
          >
            Short Break (5m)
          </button>
          <button
            className={`btn btn-sm ${mode === 'long' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => switchMode('long', 15)}
          >
            Long Break (15m)
          </button>
        </div>

        {/* Big Timer Display */}
        <div
          style={{
            fontSize: '5rem',
            fontWeight: 800,
            fontFamily: 'var(--font-mono)',
            color: mode === 'work' ? 'var(--primary)' : 'var(--accent-teal)',
            letterSpacing: 2,
            marginBottom: 28,
          }}
        >
          {timeFormatted}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginBottom: 24 }}>
          <button
            className="btn btn-primary"
            style={{ padding: '12px 28px', fontSize: '1rem', fontWeight: 600 }}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Pause size={18} /> : <Play size={18} />}
            {isRunning ? 'Pause' : 'Start Focus'}
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setIsRunning(false);
              setTimeLeft(mode === 'work' ? 25 * 60 : mode === 'short' ? 5 * 60 : 15 * 60);
            }}
          >
            <RotateCcw size={18} /> Reset
          </button>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Pomodoro Sessions Completed Today: <strong style={{ color: 'var(--text-primary)' }}>{sessionsCompleted}</strong> 🍅
        </div>
      </div>
    </ToolLayout>
  );
}
