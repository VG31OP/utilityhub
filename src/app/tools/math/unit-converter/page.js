'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { ArrowLeftRight, Copy, Check } from 'lucide-react';

const UNIT_CATEGORIES = {
  length: {
    name: 'Length',
    base: 'meters',
    units: {
      meters: { name: 'Meters (m)', toBase: 1 },
      kilometers: { name: 'Kilometers (km)', toBase: 1000 },
      centimeters: { name: 'Centimeters (cm)', toBase: 0.01 },
      millimeters: { name: 'Millimeters (mm)', toBase: 0.001 },
      miles: { name: 'Miles (mi)', toBase: 1609.344 },
      yards: { name: 'Yards (yd)', toBase: 0.9144 },
      feet: { name: 'Feet (ft)', toBase: 0.3048 },
      inches: { name: 'Inches (in)', toBase: 0.0254 },
    },
  },
  weight: {
    name: 'Weight / Mass',
    base: 'kilograms',
    units: {
      kilograms: { name: 'Kilograms (kg)', toBase: 1 },
      grams: { name: 'Grams (g)', toBase: 0.001 },
      milligrams: { name: 'Milligrams (mg)', toBase: 0.000001 },
      pounds: { name: 'Pounds (lb)', toBase: 0.45359237 },
      ounces: { name: 'Ounces (oz)', toBase: 0.02834952 },
      tonnes: { name: 'Metric Tonnes (t)', toBase: 1000 },
    },
  },
  temperature: {
    name: 'Temperature',
    base: 'celsius',
    units: {
      celsius: { name: 'Celsius (°C)' },
      fahrenheit: { name: 'Fahrenheit (°F)' },
      kelvin: { name: 'Kelvin (K)' },
    },
  },
  digital: {
    name: 'Digital Storage',
    base: 'bytes',
    units: {
      bytes: { name: 'Bytes (B)', toBase: 1 },
      kilobytes: { name: 'Kilobytes (KB)', toBase: 1024 },
      megabytes: { name: 'Megabytes (MB)', toBase: 1024 * 1024 },
      gigabytes: { name: 'Gigabytes (GB)', toBase: 1024 * 1024 * 1024 },
      terabytes: { name: 'Terabytes (TB)', toBase: 1024 * 1024 * 1024 * 1024 },
    },
  },
  speed: {
    name: 'Speed',
    base: 'mps',
    units: {
      mps: { name: 'Meters per second (m/s)', toBase: 1 },
      kph: { name: 'Kilometers per hour (km/h)', toBase: 1 / 3.6 },
      mph: { name: 'Miles per hour (mph)', toBase: 0.44704 },
      knot: { name: 'Knots (kn)', toBase: 0.514444 },
    },
  },
};

export default function UnitConverterPage() {
  const tool = getToolById('unit-converter');
  const [activeCategory, setActiveCategory] = useState('length');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('feet');
  const [inputValue, setInputValue] = useState(1);
  const [copied, setCopied] = useState(false);

  const catData = UNIT_CATEGORIES[activeCategory];

  const convert = (val, from, to, cat) => {
    const num = Number(val);
    if (isNaN(num)) return 0;

    if (cat === 'temperature') {
      let c = num;
      if (from === 'fahrenheit') c = (num - 32) * (5 / 9);
      if (from === 'kelvin') c = num - 273.15;

      if (to === 'celsius') return c;
      if (to === 'fahrenheit') return c * (9 / 5) + 32;
      if (to === 'kelvin') return c + 273.15;
      return c;
    }

    const units = catData.units;
    const fromBase = units[from]?.toBase || 1;
    const toBase = units[to]?.toBase || 1;
    const baseValue = num * fromBase;
    return baseValue / toBase;
  };

  const outputValue = convert(inputValue, fromUnit, toUnit, activeCategory);
  const formattedOutput = Number(Number(outputValue).toFixed(6)).toString();

  const handleCategoryChange = (newCat) => {
    setActiveCategory(newCat);
    const keys = Object.keys(UNIT_CATEGORIES[newCat].units);
    setFromUnit(keys[0]);
    setToUnit(keys[1] || keys[0]);
  };

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const copy = () => {
    navigator.clipboard.writeText(formattedOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <ToolLayout tool={tool} category="math">
      {/* Category Pills */}
      <div className="tool-panel">
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {Object.entries(UNIT_CATEGORIES).map(([key, item]) => (
            <button
              key={key}
              className={`btn btn-sm ${activeCategory === key ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => handleCategoryChange(key)}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>

      {/* Converter Panel */}
      <div className="tool-panel">
        <div className="tool-panel-body">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 16, alignItems: 'center' }}>
            {/* From */}
            <div>
              <label className="form-label">From</label>
              <select
                className="form-input"
                style={{ marginBottom: 12 }}
                value={fromUnit}
                onChange={(e) => setFromUnit(e.target.value)}
              >
                {Object.entries(catData.units).map(([uKey, uData]) => (
                  <option key={uKey} value={uKey}>{uData.name}</option>
                ))}
              </select>
              <input
                type="number"
                className="form-input"
                style={{ fontSize: '1.2rem', fontWeight: 600 }}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
            </div>

            {/* Swap Button */}
            <div style={{ paddingTop: 26 }}>
              <button className="btn btn-secondary" onClick={swapUnits} title="Swap units">
                <ArrowLeftRight size={18} />
              </button>
            </div>

            {/* To */}
            <div>
              <label className="form-label">To</label>
              <select
                className="form-input"
                style={{ marginBottom: 12 }}
                value={toUnit}
                onChange={(e) => setToUnit(e.target.value)}
              >
                {Object.entries(catData.units).map(([uKey, uData]) => (
                  <option key={uKey} value={uKey}>{uData.name}</option>
                ))}
              </select>
              <div
                style={{
                  height: 46,
                  borderRadius: 8,
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 14px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--accent-teal)',
                }}
              >
                <span>{formattedOutput}</span>
                <button
                  className={`btn btn-sm ${copied ? 'btn-copy copied' : 'btn-ghost'}`}
                  style={{ padding: '2px 8px' }}
                  onClick={copy}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
