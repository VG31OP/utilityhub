'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Shield, ShieldAlert, ShieldCheck, Eye, EyeOff } from 'lucide-react';

export default function PasswordStrengthPage() {
  const tool = getToolById('password-strength');
  const [password, setPassword] = useState('My$ecureP@ssw0rd!2026');
  const [showPass, setShowPass] = useState(false);

  // Strength calculations
  let score = 0;
  let checks = {
    length: password.length >= 12,
    lower: /[a-z]/.test(password),
    upper: /[A-Z]/.test(password),
    digits: /[0-9]/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  };

  if (checks.length) score += 25;
  if (checks.lower && checks.upper) score += 25;
  if (checks.digits) score += 25;
  if (checks.special) score += 25;

  let crackTime = 'Instantly';
  let rating = 'Very Weak';
  let ratingColor = '#EF4444';

  if (password.length > 14 && checks.lower && checks.upper && checks.digits && checks.special) {
    crackTime = 'Centuries';
    rating = 'Extremely Strong';
    ratingColor = 'var(--accent-teal)';
  } else if (score >= 75) {
    crackTime = 'Several Years';
    rating = 'Strong';
    ratingColor = 'var(--accent-teal)';
  } else if (score >= 50) {
    crackTime = 'A Few Weeks';
    rating = 'Moderate';
    ratingColor = 'var(--accent-amber)';
  } else if (score >= 25) {
    crackTime = 'A Few Minutes';
    rating = 'Weak';
    ratingColor = 'var(--danger)';
  }

  return (
    <ToolLayout tool={tool} category="security">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Enter Password to Test</span></div>
          <div className="tool-panel-body">
            <div style={{ position: 'relative', marginBottom: 20 }}>
              <input
                type={showPass ? 'text' : 'password'}
                className="form-input"
                style={{ paddingRight: 42, fontFamily: 'var(--font-mono)' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type password..."
              />
              <button
                type="button"
                className="btn btn-ghost"
                style={{ position: 'absolute', right: 4, top: 4, padding: '4px 8px' }}
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {/* Checklist */}
            <div style={{ display: 'grid', gap: 8, fontSize: '0.85rem' }}>
              {[
                [checks.length, `At least 12 characters (current: ${password.length})`],
                [checks.lower, 'Contains lowercase letters (a-z)'],
                [checks.upper, 'Contains uppercase letters (A-Z)'],
                [checks.digits, 'Contains numbers (0-9)'],
                [checks.special, 'Contains special characters (!@#$%...)'],
              ].map(([met, label], idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: met ? 'var(--accent-teal)' : 'var(--text-muted)', fontWeight: 700 }}>
                    {met ? '✓' : '✗'}
                  </span>
                  <span style={{ color: met ? 'var(--text-primary)' : 'var(--text-muted)' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Strength Rating Card */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Strength Assessment</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center', padding: 24 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Estimated Brute-force Crack Time</span>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: ratingColor, margin: '8px 0', fontFamily: 'var(--font-mono)' }}>
              {crackTime}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: ratingColor, marginBottom: 16 }}>
              {rating}
            </div>

            {/* Progress meter */}
            <div style={{ height: 8, width: '100%', background: 'var(--border-color)', borderRadius: 4, overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${score}%`,
                  background: ratingColor,
                  transition: 'width 0.2s ease',
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
