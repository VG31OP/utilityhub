'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { categories, tools, getCategoryById } from '../lib/tools';
import { Search, ArrowRight, Layers, Sparkles } from 'lucide-react';

export default function ToolsCatalog() {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  const filtered = useMemo(() => {
    let list = tools;
    if (selectedCat !== 'all') {
      list = list.filter((t) => t.category === selectedCat);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, selectedCat]);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ padding: '48px 24px 80px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>
          <div className="hero-pill-badge" style={{ marginBottom: 16 }}>
            <Layers size={14} />
            <span>Complete Suite Catalog</span>
          </div>
          <h1 className="section-title" style={{ fontSize: '2.5rem', justifyContent: 'center', marginBottom: 12 }}>
            All 111+ Utilities
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem' }}>
            Instant, zero-latency utilities designed to replace bloated websites and apps.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div style={{ maxWidth: 720, margin: '0 auto 28px' }}>
          <div className="hero-search-input-wrap">
            <Search size={18} className="text-muted" />
            <input
              type="text"
              className="hero-search-input"
              placeholder="Search by name, description, or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setSearch('')}
                style={{ color: 'var(--text-muted)' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Pills */}
        <div className="filter-pills-bar" style={{ marginBottom: 40 }}>
          <button
            type="button"
            className={`filter-pill ${selectedCat === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCat('all')}
          >
            All Categories ({tools.length})
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={`filter-pill ${selectedCat === c.id ? 'active' : ''}`}
              onClick={() => setSelectedCat(c.id)}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            Showing {filtered.length} of {tools.length} utilities
          </div>
          {selectedCat !== 'all' && (
            <Link href={`/tools/${selectedCat}`} className="btn btn-ghost btn-sm" style={{ color: '#818CF8' }}>
              View {getCategoryById(selectedCat)?.name} Overview <ArrowRight size={14} />
            </Link>
          )}
        </div>

        {/* Tools Grid */}
        {filtered.length > 0 ? (
          <div className="tools-grid">
            {filtered.map((tool) => {
              const cat = getCategoryById(tool.category) || {};
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.id}
                  href={`/tools/${tool.category}/${tool.id}`}
                  className="tool-card"
                >
                  <div
                    className="tool-card-icon"
                    style={{
                      background: cat.bgColor || 'rgba(99, 102, 241, 0.15)',
                      color: cat.color || '#818CF8',
                    }}
                  >
                    {Icon && <Icon size={20} />}
                  </div>
                  <div className="tool-card-info">
                    <div className="tool-card-name">{tool.name}</div>
                    <div className="tool-card-desc">{tool.description}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div
            style={{
              padding: 48,
              textAlign: 'center',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div style={{ fontSize: '2rem', marginBottom: 12 }}>🔍</div>
            <div style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 8 }}>
              No utilities match your search
            </div>
            <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
              Try searching with broader terms or choose &quot;All Categories&quot;.
            </p>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => {
                setSearch('');
                setSelectedCat('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
