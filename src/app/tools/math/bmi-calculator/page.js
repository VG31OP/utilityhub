'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Heart } from 'lucide-react';

export default function BmiCalculatorPage() {
  const tool = getToolById('bmi-calculator');
  const [unit, setUnit] = useState('metric'); // 'metric' | 'imperial'
  const [weightKg, setWeightKg] = useState(70);
  const [heightCm, setHeightCm] = useState(175);
  const [weightLb, setWeightLb] = useState(154);
  const [heightFeet, setHeightFeet] = useState(5);
  const [heightInches, setHeightInches] = useState(9);

  let bmi = 0;
  if (unit === 'metric') {
    const hM = heightCm / 100;
    if (hM > 0) bmi = weightKg / (hM * hM);
  } else {
    const totalInches = heightFeet * 12 + heightInches;
    if (totalInches > 0) bmi = (weightLb / (totalInches * totalInches)) * 703;
  }

  const getBmiCategory = (score) => {
    if (score < 18.5) return { name: 'Underweight', color: '#60A5FA', advice: 'Below normal range.' };
    if (score < 25) return { name: 'Normal weight', color: '#34D399', advice: 'Healthy weight range.' };
    if (score < 30) return { name: 'Overweight', color: '#FBBF24', advice: 'Slightly above normal range.' };
    return { name: 'Obesity', color: '#F87171', advice: 'Significantly above normal range.' };
  };

  const category = getBmiCategory(bmi);

  return (
    <ToolLayout tool={tool} category="math">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Your Measurements</span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                className={`btn btn-sm ${unit === 'metric' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setUnit('metric')}
              >
                Metric
              </button>
              <button
                className={`btn btn-sm ${unit === 'imperial' ? 'btn-primary' : 'btn-secondary'}`}
                onClick={() => setUnit('imperial')}
              >
                Imperial
              </button>
            </div>
          </div>

          <div className="tool-panel-body">
            {unit === 'metric' ? (
              <>
                <div>
                  <label className="form-label">Weight (kg): {weightKg} kg</label>
                  <input
                    type="range"
                    min="30"
                    max="180"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                  <input
                    type="number"
                    className="form-input mt-2"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                  />
                </div>

                <div style={{ marginTop: 20 }}>
                  <label className="form-label">Height (cm): {heightCm} cm</label>
                  <input
                    type="range"
                    min="100"
                    max="220"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    style={{ width: '100%' }}
                  />
                  <input
                    type="number"
                    className="form-input mt-2"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="form-label">Weight (lbs): {weightLb} lbs</label>
                  <input
                    type="number"
                    className="form-input"
                    value={weightLb}
                    onChange={(e) => setWeightLb(Number(e.target.value))}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
                  <div>
                    <label className="form-label">Height (Feet)</label>
                    <input
                      type="number"
                      className="form-input"
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className="form-label">Inches</label>
                    <input
                      type="number"
                      className="form-input"
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Results */}
        <div className="tool-panel">
          <div className="tool-panel-header"><span>BMI Score</span></div>
          <div className="tool-panel-body" style={{ textAlign: 'center', padding: 24 }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Body Mass Index</span>
            <div style={{ fontSize: '3rem', fontWeight: 800, color: category.color, margin: '8px 0', fontFamily: 'var(--font-mono)' }}>
              {bmi.toFixed(1)}
            </div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, color: category.color, marginBottom: 8 }}>
              {category.name}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: 20 }}>
              {category.advice}
            </p>

            {/* Gauge bar */}
            <div style={{ height: 12, borderRadius: 6, display: 'flex', overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ flex: 18.5, background: '#60A5FA' }} title="Underweight (< 18.5)" />
              <div style={{ flex: 6.5, background: '#34D399' }} title="Normal (18.5 - 24.9)" />
              <div style={{ flex: 5, background: '#FBBF24' }} title="Overweight (25 - 29.9)" />
              <div style={{ flex: 10, background: '#F87171' }} title="Obese (30+)" />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
              <span>Underweight</span>
              <span>Normal</span>
              <span>Overweight</span>
              <span>Obese</span>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
