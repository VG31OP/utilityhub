'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Plus, Trash2, Crosshair } from 'lucide-react';

export default function EisenhowerPage() {
  const tool = getToolById('eisenhower');
  const [tasks, setTasks] = useState({
    q1: ['Fix production server bug', 'Client deadline deliverable'],
    q2: ['Design system architecture', 'Weekly gym workout routine'],
    q3: ['Answer non-urgent vendor emails', 'Book flight tickets'],
    q4: ['Endless social media scrolling', 'Reorganizing desk clutter'],
  });
  const [selectedQ, setSelectedQ] = useState('q1');
  const [text, setText] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('utilityhub_eisenhower');
      if (saved) setTasks(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const save = (updated) => {
    setTasks(updated);
    try {
      localStorage.setItem('utilityhub_eisenhower', JSON.stringify(updated));
    } catch (e) {}
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    const updated = {
      ...tasks,
      [selectedQ]: [...(tasks[selectedQ] || []), text.trim()],
    };
    save(updated);
    setText('');
  };

  const removeTask = (q, idx) => {
    const updated = {
      ...tasks,
      [q]: (tasks[q] || []).filter((_, i) => i !== idx),
    };
    save(updated);
  };

  const quadrants = [
    { key: 'q1', title: '1. Do First (Urgent & Important)', color: '#EF4444', desc: 'Crises, pressing problems, strict deadlines' },
    { key: 'q2', title: '2. Schedule (Not Urgent, Important)', color: '#3B82F6', desc: 'Strategy, long-term goals, exercise, learning' },
    { key: 'q3', title: '3. Delegate (Urgent, Not Important)', color: '#F59E0B', desc: 'Interruptions, some calls, busywork' },
    { key: 'q4', title: '4. Eliminate (Not Urgent, Not Important)', color: '#6B7280', desc: 'Time wasters, excessive mindless entertainment' },
  ];

  return (
    <ToolLayout tool={tool} category="productivity">
      {/* Quick Add Form */}
      <div className="tool-panel">
        <form onSubmit={addTask} style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <select
            className="form-input"
            style={{ width: 220 }}
            value={selectedQ}
            onChange={(e) => setSelectedQ(e.target.value)}
          >
            <option value="q1">Q1: Do First</option>
            <option value="q2">Q2: Schedule</option>
            <option value="q3">Q3: Delegate</option>
            <option value="q4">Q4: Eliminate</option>
          </select>
          <input
            type="text"
            className="form-input"
            style={{ flex: 1, minWidth: 200 }}
            placeholder="Add new task..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit" className="btn btn-primary">
            <Plus size={16} /> Add Task
          </button>
        </form>
      </div>

      {/* 2x2 Matrix Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
        {quadrants.map((q) => {
          const list = tasks[q.key] || [];
          return (
            <div
              key={q.key}
              className="tool-panel"
              style={{
                borderTop: `4px solid ${q.color}`,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: q.color, marginBottom: 4 }}>
                {q.title}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                {q.desc}
              </div>

              <div style={{ display: 'grid', gap: 8, flex: 1 }}>
                {list.length === 0 ? (
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'center', padding: 16 }}>
                    No tasks in this quadrant
                  </div>
                ) : (
                  list.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        background: 'var(--bg-secondary)',
                        borderRadius: 6,
                        fontSize: '0.85rem',
                      }}
                    >
                      <span>{item}</span>
                      <button
                        className="btn btn-ghost"
                        style={{ padding: 2, color: 'var(--danger)' }}
                        onClick={() => removeTask(q.key, idx)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </ToolLayout>
  );
}
