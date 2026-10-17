'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Calendar, Plus, Trash2 } from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export default function SocialCalendarPage() {
  const tool = getToolById('social-calendar');
  const [entries, setEntries] = useState({
    Monday: [{ id: 1, platform: 'Twitter', title: 'Launch teaser announcement', time: '09:00 AM' }],
    Wednesday: [{ id: 2, platform: 'LinkedIn', title: 'Engineering deep-dive article', time: '11:00 AM' }],
    Friday: [{ id: 3, platform: 'Instagram', title: 'Feature carousel highlight', time: '04:00 PM' }],
  });
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [platform, setPlatform] = useState('Twitter');
  const [postTitle, setPostTitle] = useState('');
  const [postTime, setPostTime] = useState('10:00 AM');

  const addPost = () => {
    if (!postTitle.trim()) return;
    const newPost = {
      id: Date.now(),
      platform,
      title: postTitle,
      time: postTime,
    };
    setEntries((prev) => ({
      ...prev,
      [selectedDay]: [...(prev[selectedDay] || []), newPost],
    }));
    setPostTitle('');
  };

  const removePost = (day, id) => {
    setEntries((prev) => ({
      ...prev,
      [day]: (prev[day] || []).filter((p) => p.id !== id),
    }));
  };

  return (
    <ToolLayout tool={tool} category="social">
      {/* Create New Post Form */}
      <div className="tool-panel">
        <div className="tool-panel-header"><span>Schedule New Social Post</span></div>
        <div className="tool-panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            <div>
              <label className="form-label">Day</label>
              <select className="form-input" value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                {DAYS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Platform</label>
              <select className="form-input" value={platform} onChange={(e) => setPlatform(e.target.value)}>
                {['Twitter / X', 'LinkedIn', 'Instagram', 'YouTube', 'TikTok'].map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="form-label">Time</label>
              <input type="text" className="form-input" value={postTime} onChange={(e) => setPostTime(e.target.value)} />
            </div>

            <div style={{ gridColumn: 'span 2' }}>
              <label className="form-label">Post Topic / Hook</label>
              <div style={{ display: 'flex', gap: 10 }}>
                <input
                  type="text"
                  className="form-input"
                  placeholder="e.g. Behind the scenes video..."
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addPost}>
                  <Plus size={16} /> Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {DAYS.map((d) => {
          const list = entries[d] || [];
          return (
            <div key={d} className="tool-panel" style={{ padding: 14 }}>
              <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: 10, color: 'var(--primary)' }}>
                {d} ({list.length})
              </div>

              {list.length === 0 ? (
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>No scheduled content</div>
              ) : (
                <div style={{ display: 'grid', gap: 8 }}>
                  {list.map((post) => (
                    <div
                      key={post.id}
                      style={{
                        padding: 10,
                        background: 'var(--bg-secondary)',
                        borderRadius: 6,
                        border: '1px solid var(--border-color)',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                        <span style={{ fontSize: '0.7rem', color: 'var(--accent-teal)', fontWeight: 600 }}>
                          {post.platform} • {post.time}
                        </span>
                        <button
                          className="btn btn-ghost"
                          style={{ padding: 2, height: 'auto', color: 'var(--danger)' }}
                          onClick={() => removePost(d, post.id)}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 500 }}>{post.title}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </ToolLayout>
  );
}
