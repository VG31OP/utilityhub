'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Plus, Trash2, CheckCircle2, Circle, Target } from 'lucide-react';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function HabitTrackerPage() {
  const tool = getToolById('habit-tracker');
  const [habits, setHabits] = useState([
    { id: 1, name: 'Drink 2L Water', completed: [true, true, true, false, false, false, false] },
    { id: 2, name: 'Read 20 mins', completed: [true, true, false, true, false, false, false] },
    { id: 3, name: '30m Workout / Gym', completed: [true, false, true, false, false, false, false] },
  ]);
  const [newHabitName, setNewHabitName] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('utilityhub_habits');
      if (saved) setHabits(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveHabits = (updated) => {
    setHabits(updated);
    try {
      localStorage.setItem('utilityhub_habits', JSON.stringify(updated));
    } catch (e) {}
  };

  const addHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;
    const h = {
      id: Date.now(),
      name: newHabitName.trim(),
      completed: [false, false, false, false, false, false, false],
    };
    saveHabits([...habits, h]);
    setNewHabitName('');
  };

  const toggleDay = (habitId, dayIndex) => {
    const updated = habits.map((h) => {
      if (h.id !== habitId) return h;
      const nextDays = [...h.completed];
      nextDays[dayIndex] = !nextDays[dayIndex];
      return { ...h, completed: nextDays };
    });
    saveHabits(updated);
  };

  const deleteHabit = (id) => {
    saveHabits(habits.filter((h) => h.id !== id));
  };

  const totalPossible = habits.length * 7;
  const totalCompleted = habits.reduce(
    (acc, h) => acc + h.completed.filter(Boolean).length,
    0
  );
  const completionRate = totalPossible > 0 ? Math.round((totalCompleted / totalPossible) * 100) : 0;

  return (
    <ToolLayout tool={tool} category="productivity">
      {/* Overview Stat */}
      <div className="tool-panel" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 20px' }}>
        <div>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>This Week's Completion Rate</span>
          <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-teal)', fontFamily: 'var(--font-mono)' }}>
            {completionRate}% ({totalCompleted}/{totalPossible} checks)
          </div>
        </div>

        <form onSubmit={addHabit} style={{ display: 'flex', gap: 10 }}>
          <input
            type="text"
            className="form-input"
            style={{ width: 220 }}
            placeholder="New habit name..."
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
          />
          <button type="submit" className="btn btn-primary btn-sm">
            <Plus size={14} /> Add
          </button>
        </form>
      </div>

      {/* Habit Matrix Table */}
      <div className="tool-panel">
        <div className="tool-panel-body" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-muted)' }}>
                <th style={{ textAlign: 'left', padding: '12px 16px', minWidth: 180 }}>Habit</th>
                {DAYS.map((d) => (
                  <th key={d} style={{ padding: '12px 8px', width: 50 }}>{d}</th>
                ))}
                <th style={{ padding: '12px 16px', width: 70 }}>Streak</th>
                <th style={{ padding: '12px 16px', width: 50 }}></th>
              </tr>
            </thead>
            <tbody>
              {habits.map((h) => {
                const count = h.completed.filter(Boolean).length;
                return (
                  <tr key={h.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ textAlign: 'left', padding: '12px 16px', fontWeight: 600 }}>
                      {h.name}
                    </td>
                    {h.completed.map((done, dayIdx) => (
                      <td key={dayIdx} style={{ padding: '8px' }}>
                        <button
                          type="button"
                          onClick={() => toggleDay(h.id, dayIdx)}
                          style={{
                            background: done ? 'var(--accent-teal)' : 'var(--bg-secondary)',
                            color: done ? '#000000' : 'transparent',
                            border: '1px solid var(--border-color)',
                            width: 30,
                            height: 30,
                            borderRadius: 6,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          ✓
                        </button>
                      </td>
                    ))}
                    <td style={{ padding: '12px 16px', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--primary)' }}>
                      {count}/7
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        style={{ padding: 4, color: 'var(--danger)' }}
                        onClick={() => deleteHabit(h.id)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  );
}
