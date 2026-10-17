'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { TrendingUp } from 'lucide-react';

export default function EngagementCalcPage() {
  const tool = getToolById('engagement-calc');
  const [followers, setFollowers] = useState(10000);
  const [likes, setLikes] = useState(320);
  const [comments, setComments] = useState(45);
  const [shares, setShares] = useState(18);
  const [saves, setSaves] = useState(25);

  const totalEngagements = Number(likes) + Number(comments) + Number(shares) + Number(saves);
  const fCount = Number(followers) || 1;
  const rate = ((totalEngagements / fCount) * 100).toFixed(2);

  let benchmark = { status: 'Good Engagement', color: 'var(--accent-teal)', desc: '1% - 3.5% is the sweet spot for average social creators.' };
  if (Number(rate) < 1) {
    benchmark = { status: 'Low Engagement', color: 'var(--danger)', desc: 'Below 1%. Consider optimizing your hooks and CTA.' };
  } else if (Number(rate) > 3.5) {
    benchmark = { status: 'Viral / Outstanding', color: 'var(--accent-amber)', desc: 'Over 3.5% is top tier viral community interaction.' };
  }

  return (
    <ToolLayout tool={tool} category="social">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Post Metrics</span></div>
          <div className="tool-panel-body">
            <div>
              <label className="form-label">Total Followers / Audience</label>
              <input
                type="number"
                className="form-input"
                value={followers}
                onChange={(e) => setFollowers(Number(e.target.value))}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginTop: 16 }}>
              <div>
                <label className="form-label">Likes</label>
                <input
                  type="number"
                  className="form-input"
                  value={likes}
                  onChange={(e) => setLikes(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="form-label">Comments</label>
                <input
                  type="number"
                  className="form-input"
                  value={comments}
                  onChange={(e) => setComments(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="form-label">Shares / Retweets</label>
                <input
                  type="number"
                  className="form-input"
                  value={shares}
                  onChange={(e) => setShares(Number(e.target.value))}
                />
              </div>
              <div>
                <label className="form-label">Saves / Bookmarks</label>
                <input
                  type="number"
                  className="form-input"
                  value={saves}
                  onChange={(e) => setSaves(Number(e.target.value))}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Engagement Rate</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center', padding: 24 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Calculated Rate</span>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: benchmark.color, margin: '8px 0', fontFamily: 'var(--font-mono)' }}>
              {rate}%
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: benchmark.color, marginBottom: 8 }}>
              {benchmark.status}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 20 }}>
              {benchmark.desc}
            </p>

            <div style={{ padding: 14, background: 'var(--bg-secondary)', borderRadius: 10, textAlign: 'left' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ color: 'var(--text-muted)' }}>Total Interactions:</span>
                <strong>{totalEngagements.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
