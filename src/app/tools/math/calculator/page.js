'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';
import { Delete, RotateCcw } from 'lucide-react';

export default function CalculatorPage() {
  const tool = getToolById('calculator');
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [isRad, setIsRad] = useState(false);
  const [history, setHistory] = useState([]);

  const handleDigit = (d) => {
    setDisplay((prev) => (prev === '0' || prev === 'Error' ? d : prev + d));
  };

  const handleOperator = (op) => {
    setEquation(display + ' ' + op + ' ');
    setDisplay('0');
  };

  const handleClear = () => {
    setDisplay('0');
    setEquation('');
  };

  const handleBackspace = () => {
    setDisplay((prev) => {
      if (prev.length <= 1 || prev === 'Error') return '0';
      return prev.slice(0, -1);
    });
  };

  const handleScientific = (fn) => {
    try {
      const val = parseFloat(display);
      let res = 0;
      const angle = isRad ? val : (val * Math.PI) / 180;
      switch (fn) {
        case 'sin': res = Math.sin(angle); break;
        case 'cos': res = Math.cos(angle); break;
        case 'tan': res = Math.tan(angle); break;
        case 'sqrt': res = Math.sqrt(val); break;
        case 'sqr': res = Math.pow(val, 2); break;
        case 'log': res = Math.log10(val); break;
        case 'ln': res = Math.log(val); break;
        case 'inv': res = 1 / val; break;
        case 'pi': res = Math.PI; break;
        case 'e': res = Math.E; break;
        default: return;
      }
      const formatted = Number(res.toFixed(8)).toString();
      setDisplay(formatted);
      setHistory(prev => [`${fn}(${val}) = ${formatted}`, ...prev.slice(0, 7)]);
    } catch (e) {
      setDisplay('Error');
    }
  };

  const handleEqual = () => {
    try {
      const fullExpr = equation + display;
      // Sanitize equation: only allow numbers, spaces, and math operators
      const sanitized = fullExpr.replace(/[^0-9+\-*/().]/g, '');
      // Evaluate cleanly with Function constructor without eval
      const result = new Function(`return (${sanitized})`)();
      const formatted = Number(Number(result).toFixed(8)).toString();
      setDisplay(formatted);
      setHistory(prev => [`${fullExpr} = ${formatted}`, ...prev.slice(0, 7)]);
      setEquation('');
    } catch (e) {
      setDisplay('Error');
    }
  };

  return (
    <ToolLayout tool={tool} category="math">
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
        {/* Calculator Body */}
        <div className="tool-panel" style={{ maxWidth: 440, margin: '0 auto', width: '100%' }}>
          {/* Display */}
          <div
            style={{
              background: '#090D16',
              borderRadius: 12,
              padding: '16px 20px',
              textAlign: 'right',
              marginBottom: 16,
              boxShadow: 'inset 0 2px 8px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ minHeight: 20, fontSize: '0.85rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {equation || ''}
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: 'var(--text-primary)', wordBreak: 'break-all' }}>
              {display}
            </div>
          </div>

          {/* Mode bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <button
              className={`btn btn-sm ${isRad ? 'btn-primary' : 'btn-secondary'}`}
              style={{ padding: '2px 10px', fontSize: '0.75rem' }}
              onClick={() => setIsRad(!isRad)}
            >
              {isRad ? 'RAD' : 'DEG'}
            </button>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Scientific Mode</span>
          </div>

          {/* Keypad Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8 }}>
            {/* Row 1 */}
            <button className="btn btn-secondary btn-sm" onClick={() => handleScientific('sin')}>sin</button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleScientific('cos')}>cos</button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleScientific('tan')}>tan</button>
            <button className="btn btn-secondary btn-sm" onClick={handleClear} style={{ color: 'var(--danger)' }}>C</button>
            <button className="btn btn-secondary btn-sm" onClick={handleBackspace}><Delete size={16} /></button>

            {/* Row 2 */}
            <button className="btn btn-secondary btn-sm" onClick={() => handleScientific('sqrt')}>√</button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleScientific('sqr')}>x²</button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleScientific('pi')}>π</button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleOperator('/')}>÷</button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleOperator('*')}>×</button>

            {/* Row 3 */}
            <button className="btn btn-secondary btn-sm" onClick={() => handleScientific('ln')}>ln</button>
            <button className="btn btn-ghost" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('7')}>7</button>
            <button className="btn btn-ghost" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('8')}>8</button>
            <button className="btn btn-ghost" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('9')}>9</button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleOperator('-')}>−</button>

            {/* Row 4 */}
            <button className="btn btn-secondary btn-sm" onClick={() => handleScientific('log')}>log</button>
            <button className="btn btn-ghost" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('4')}>4</button>
            <button className="btn btn-ghost" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('5')}>5</button>
            <button className="btn btn-ghost" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('6')}>6</button>
            <button className="btn btn-secondary btn-sm" onClick={() => handleOperator('+')}>+</button>

            {/* Row 5 */}
            <button className="btn btn-secondary btn-sm" onClick={() => handleScientific('inv')}>1/x</button>
            <button className="btn btn-ghost" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('1')}>1</button>
            <button className="btn btn-ghost" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('2')}>2</button>
            <button className="btn btn-ghost" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('3')}>3</button>
            <button
              className="btn btn-primary"
              style={{ gridRow: 'span 2', fontSize: '1.3rem', fontWeight: 700 }}
              onClick={handleEqual}
            >
              =
            </button>

            {/* Row 6 */}
            <button className="btn btn-secondary btn-sm" onClick={() => handleScientific('e')}>e</button>
            <button className="btn btn-ghost" style={{ gridColumn: 'span 2', fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('0')}>0</button>
            <button className="btn btn-ghost" style={{ fontSize: '1.1rem', fontWeight: 600 }} onClick={() => handleDigit('.')}>.</button>
          </div>
        </div>

        {/* History */}
        <div className="tool-panel">
          <div className="tool-panel-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Calculation History</span>
            {history.length > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={() => setHistory([])}>
                <RotateCcw size={12} /> Clear History
              </button>
            )}
          </div>
          <div className="tool-panel-body">
            {history.length === 0 ? (
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center', padding: 24 }}>
                No recent calculations. Perform a calculation to see history here.
              </div>
            ) : (
              <div style={{ display: 'grid', gap: 10 }}>
                {history.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '10px 14px',
                      background: 'var(--bg-secondary)',
                      borderRadius: 8,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.85rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
