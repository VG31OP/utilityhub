'use client';
import { useState, useEffect } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function TodoListPage() {
  const tool = getToolById('todo-list');
  const [todos, setTodos] = useState([
    { id: 1, text: 'Complete quarterly report', completed: false, priority: 'high' },
    { id: 2, text: 'Review team pull requests', completed: true, priority: 'medium' },
    { id: 3, text: 'Prep presentation slides', completed: false, priority: 'low' },
  ]);
  const [newText, setNewText] = useState('');
  const [newPriority, setNewPriority] = useState('medium');
  const [filter, setFilter] = useState('all');

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('utilityhub_todos');
      if (saved) setTodos(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const saveTodos = (updated) => {
    setTodos(updated);
    try {
      localStorage.setItem('utilityhub_todos', JSON.stringify(updated));
    } catch (e) {}
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!newText.trim()) return;
    const item = {
      id: Date.now(),
      text: newText.trim(),
      completed: false,
      priority: newPriority,
    };
    saveTodos([item, ...todos]);
    setNewText('');
  };

  const toggleTodo = (id) => {
    const updated = todos.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t));
    saveTodos(updated);
  };

  const deleteTodo = (id) => {
    const updated = todos.filter((t) => t.id !== id);
    saveTodos(updated);
  };

  const clearCompleted = () => {
    saveTodos(todos.filter((t) => !t.completed));
  };

  const filtered = todos.filter((t) => {
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
    return true;
  });

  const priorityColors = {
    high: '#EF4444',
    medium: '#F59E0B',
    low: '#10B981',
  };

  return (
    <ToolLayout tool={tool} category="productivity">
      <div className="tool-panel" style={{ maxWidth: 640, margin: '0 auto' }}>
        {/* Input */}
        <form onSubmit={addTodo} style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
          <input
            type="text"
            className="form-input"
            placeholder="What needs to be done?"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <select
            className="form-input"
            style={{ width: 110 }}
            value={newPriority}
            onChange={(e) => setNewPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
            <Plus size={16} /> Add
          </button>
        </form>

        {/* Filter bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ display: 'flex', gap: 6 }}>
            {['all', 'active', 'completed'].map((f) => (
              <button
                key={f}
                className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          {todos.some((t) => t.completed) && (
            <button className="btn btn-ghost btn-sm" onClick={clearCompleted} style={{ color: 'var(--danger)' }}>
              Clear Completed
            </button>
          )}
        </div>

        {/* List */}
        <div style={{ display: 'grid', gap: 10 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: 32, fontSize: '0.85rem' }}>
              No tasks found.
            </div>
          ) : (
            filtered.map((t) => (
              <div
                key={t.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleTodo(t.id)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  {t.completed ? (
                    <CheckCircle2 size={20} style={{ color: 'var(--accent-teal)' }} />
                  ) : (
                    <Circle size={20} style={{ color: 'var(--text-muted)' }} />
                  )}
                </button>

                <div style={{ flex: 1, textDecoration: t.completed ? 'line-through' : 'none', color: t.completed ? 'var(--text-muted)' : 'inherit', fontSize: '0.9rem' }}>
                  {t.text}
                </div>

                <span
                  style={{
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    color: priorityColors[t.priority],
                    padding: '2px 8px',
                    borderRadius: 4,
                    background: 'rgba(255,255,255,0.05)',
                  }}
                >
                  {t.priority}
                </span>

                <button
                  type="button"
                  className="btn btn-ghost"
                  style={{ padding: 4, color: 'var(--danger)' }}
                  onClick={() => deleteTodo(t.id)}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </ToolLayout>
  );
}
