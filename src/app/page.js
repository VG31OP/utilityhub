'use client';

import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { categories, tools, getToolsByCategory, getCategoryById } from './lib/tools';
import Ticker from './components/motion/Ticker';
import {
  Search,
  Sparkles,
  ArrowRight,
  Star,
  Clock,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  Flame,
  LayoutGrid,
  CheckCircle2,
  Lock,
  Cpu,
} from 'lucide-react';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeView, setActiveView] = useState('categories'); // 'categories' | 'popular' | 'all'
  const [favorites, setFavorites] = useState([]);
  const [recents, setRecents] = useState([]);

  // Load favorites & recents on client mount
  useEffect(() => {
    function loadSaved() {
      try {
        const favIds = JSON.parse(localStorage.getItem('utilityhub_favorites') || '[]');
        const recentIds = JSON.parse(localStorage.getItem('utilityhub_recents') || '[]');
        setFavorites(tools.filter((t) => favIds.includes(t.id)));
        setRecents(tools.filter((t) => recentIds.includes(t.id)).slice(0, 6));
      } catch {
        // Ignore in private browsing
      }
    }
    loadSaved();
    window.addEventListener('favorites-updated', loadSaved);
    return () => window.removeEventListener('favorites-updated', loadSaved);
  }, []);

  // Top featured tools for the Bento Showcase
  const popularToolIds = [
    'json-formatter',
    'qr-generator',
    'password-generator',
    'markdown-editor',
    'unix-timestamp',
    'base64',
    'color-picker',
    'regex-tester',
    'text-diff',
    'unit-converter',
    'aspect-ratio',
    'hash-generator',
  ];

  const popularTools = useMemo(() => {
    return popularToolIds
      .map((id) => tools.find((t) => t.id === id))
      .filter(Boolean);
  }, []);

  // Dynamic filter based on search and category
  const filteredTools = useMemo(() => {
    let list = tools;
    if (activeCategory !== 'all') {
      list = list.filter((t) => t.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [searchQuery, activeCategory]);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            className="hero-pill-badge"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="hero-status-dot"></span>
            <span>111+ High-Performance Online Utilities • 100% Client-Side & Private</span>
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Every Tool You Need,<br />
            <span className="hero-title-gradient">Engineered With Precision</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            The world-class developer & everyday digital toolkit. Text manipulation, image utilities,
            developer tooling, cryptography, calculators, and AI assistance — lightning-fast, zero-ads, and 100% private.
          </motion.p>

          {/* Interactive Hero Search */}
          <motion.div
            className="hero-search-box"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div className="hero-search-input-wrap">
              <Search size={20} className="text-muted" />
              <input
                type="text"
                className="hero-search-input"
                placeholder="Search across all 111+ tools (e.g. JSON, QR, Password, Regex)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => setSearchQuery('')}
                  style={{ color: 'var(--text-muted)' }}
                >
                  Clear
                </button>
              )}
            </div>
          </motion.div>

          {/* Category Filter Pills */}
          <motion.div
            className="filter-pills-bar"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <button
              type="button"
              className={`filter-pill ${activeCategory === 'all' ? 'active' : ''}`}
              onClick={() => setActiveCategory('all')}
            >
              All Utilities ({tools.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </motion.div>

          {/* Trust Highlights */}
          <div className="hero-trust-row">
            <div className="hero-trust-item">
              <div className="hero-trust-icon">
                <ShieldCheck size={16} />
              </div>
              <span>100% Private (No data leaves your device)</span>
            </div>
            <div className="hero-trust-item">
              <div className="hero-trust-icon">
                <Zap size={16} />
              </div>
              <span>Instant Turbopack Engine</span>
            </div>
            <div className="hero-trust-item">
              <div className="hero-trust-icon">
                <CheckCircle2 size={16} />
              </div>
              <span>Zero Registration & Zero Ads</span>
            </div>
          </div>

          {/* Motion UI Infinite Marquee Ticker */}
          <Ticker />
        </div>
      </section>

      {/* Main Content Area */}
      <div className="container" style={{ paddingBottom: 80 }}>
        {/* If user is actively searching, display search results grid directly */}
        {searchQuery.trim() !== '' ? (
          <section style={{ marginBottom: 48 }}>
            <div className="section-header">
              <h2 className="section-title">
                <Search size={22} className="text-sky-400" />
                <span>Search Results for &quot;{searchQuery}&quot;</span>
              </h2>
              <span className="section-count">{filteredTools.length} tools found</span>
            </div>

            {filteredTools.length > 0 ? (
              <div className="tools-grid">
                {filteredTools.map((tool) => {
                  const cat = getCategoryById(tool.category) || {};
                  const Icon = tool.icon;
                  return (
                    <motion.div
                      key={tool.id}
                      whileHover={{ y: -4, scale: 1.015 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      <Link
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
                    </motion.div>
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
                  No utilities found matching &quot;{searchQuery}&quot;
                </div>
                <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
                  Try a different keyword or browse by category.
                </p>
                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => setSearchQuery('')}
                >
                  Clear Search
                </button>
              </div>
            )}
          </section>
        ) : (
          <>
            {/* Quick Access Tray: Favorites & Recently Used (if present) */}
            {(favorites.length > 0 || recents.length > 0) && (
              <motion.div
                className="quick-tray"
                id="favorites"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="quick-tray-header">
                  <div className="quick-tray-title">
                    <Star size={18} className="text-amber-400 fill-amber-400" />
                    <span>Your Quick Access Dashboard</span>
                  </div>
                  <span className="text-muted" style={{ fontSize: '0.82rem' }}>
                    Personalized in your browser
                  </span>
                </div>

                {favorites.length > 0 && (
                  <div style={{ marginBottom: recents.length > 0 ? 16 : 0 }}>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase' }}>
                      Starred Utilities ({favorites.length})
                    </div>
                    <div className="quick-tray-chips">
                      {favorites.map((t) => {
                        const Icon = t.icon;
                        return (
                          <Link
                            key={t.id}
                            href={`/tools/${t.category}/${t.id}`}
                            className="quick-tray-chip"
                          >
                            <Star size={13} className="text-amber-400 fill-amber-400" />
                            {Icon && <Icon size={14} className="text-sky-400" />}
                            <span>{t.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}

                {recents.length > 0 && (
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 8, fontWeight: 600, textTransform: 'uppercase' }}>
                      Recently Visited
                    </div>
                    <div className="quick-tray-chips">
                      {recents.map((t) => {
                        const Icon = t.icon;
                        return (
                          <Link
                            key={t.id}
                            href={`/tools/${t.category}/${t.id}`}
                            className="quick-tray-chip"
                          >
                            <Clock size={13} className="text-muted" />
                            {Icon && <Icon size={14} className="text-indigo-400" />}
                            <span>{t.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* Dribbble Style Sliding View Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 28, flexWrap: 'wrap', gap: 14 }}>
              <div className="motion-tab-wrap">
                <button
                  type="button"
                  className={`motion-tab-btn ${activeView === 'categories' ? 'active' : ''}`}
                  onClick={() => setActiveView('categories')}
                >
                  <LayoutGrid size={15} />
                  <span>Categories Suite ({categories.length})</span>
                  {activeView === 'categories' && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="motion-tab-slider"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      style={{ inset: 0 }}
                    />
                  )}
                </button>

                <button
                  type="button"
                  className={`motion-tab-btn ${activeView === 'popular' ? 'active' : ''}`}
                  onClick={() => setActiveView('popular')}
                >
                  <Flame size={15} style={{ color: '#F97316' }} />
                  <span>Popular Bento Tools</span>
                  {activeView === 'popular' && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="motion-tab-slider"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      style={{ inset: 0 }}
                    />
                  )}
                </button>

                <button
                  type="button"
                  className={`motion-tab-btn ${activeView === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveView('all')}
                >
                  <SlidersHorizontal size={15} />
                  <span>All 111+ Tools</span>
                  {activeView === 'all' && (
                    <motion.div
                      layoutId="activeTabPill"
                      className="motion-tab-slider"
                      transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                      style={{ inset: 0 }}
                    />
                  )}
                </button>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Press <span className="command-kbd-badge">⌘K</span> anywhere to open Spotlight
              </div>
            </div>

            {/* VIEW 1: Categories View */}
            {activeView === 'categories' && (
              <motion.section
                className="categories-section"
                style={{ padding: 0 }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="categories-grid">
                  {categories.map((cat, i) => {
                    const catTools = getToolsByCategory(cat.id);
                    const topPreviewTools = catTools.slice(0, 3);

                    return (
                      <motion.div
                        key={cat.id}
                        whileHover={{ y: -5, scale: 1.012 }}
                        whileTap={{ scale: 0.985 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                      >
                        <Link
                          href={`/tools/${cat.id}`}
                          className="category-card"
                          data-gradient={cat.gradient}
                        >
                          <div
                            className="category-card-icon"
                            style={{
                              background: cat.bgColor,
                              color: cat.color,
                            }}
                          >
                            {cat.icon}
                          </div>
                          <div className="category-card-title">{cat.name}</div>
                          <div className="category-card-desc">{cat.description}</div>

                          {/* Top Tools Preview Chips */}
                          <div className="category-preview-chips">
                            {topPreviewTools.map((t) => (
                              <span key={t.id} className="category-preview-chip">
                                {t.name}
                              </span>
                            ))}
                          </div>

                          <div className="category-card-count">
                            <span>{catTools.length} utilities</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: cat.color, fontWeight: 600 }}>
                              Explore suite <ArrowRight size={14} className="category-card-arrow" />
                            </span>
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            )}

            {/* VIEW 2: Popular Bento Tools */}
            {activeView === 'popular' && (
              <motion.section
                className="bento-section"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bento-grid">
                  {popularTools.map((tool) => {
                    const cat = getCategoryById(tool.category) || {};
                    const Icon = tool.icon;
                    return (
                      <motion.div
                        key={tool.id}
                        whileHover={{ y: -5, scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      >
                        <Link
                          href={`/tools/${tool.category}/${tool.id}`}
                          className="bento-card"
                        >
                          <div className="bento-card-top">
                            <div
                              className="bento-card-icon"
                              style={{
                                background: cat.bgColor || 'rgba(99, 102, 241, 0.15)',
                                color: cat.color || '#818CF8',
                              }}
                            >
                              {Icon && <Icon size={24} />}
                            </div>
                            <span className="bento-tag">{cat.name || tool.category}</span>
                          </div>

                          <div className="bento-card-title">{tool.name}</div>
                          <div className="bento-card-desc">{tool.description}</div>

                          <div className="bento-card-footer">
                            <span>Launch utility</span>
                            <ArrowRight size={15} className="bento-card-arrow" />
                          </div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            )}

            {/* VIEW 3: All 111+ Tools Grid */}
            {activeView === 'all' && (
              <motion.section
                style={{ padding: '10px 0' }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="tools-grid">
                  {filteredTools.map((tool) => {
                    const cat = getCategoryById(tool.category) || {};
                    const Icon = tool.icon;
                    return (
                      <motion.div
                        key={tool.id}
                        whileHover={{ y: -4, scale: 1.015 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                      >
                        <Link
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
                      </motion.div>
                    );
                  })}
                </div>
              </motion.section>
            )}
          </>
        )}

        {/* Feature & Architecture Section */}
        <section
          style={{
            marginTop: 70,
            padding: '40px 32px',
            background: 'rgba(19, 27, 51, 0.4)',
            backdropFilter: 'blur(20px)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-xl)',
          }}
        >
          <div style={{ textAlign: 'center', maxWidth: 650, margin: '0 auto 36px' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>
              Why Engineers & Creators Choose UtilityHub
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Designed from first principles to be the cleanest, fastest, and most privacy-focused tool repository on the web.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 24,
            }}
          >
            <div
              style={{
                padding: 24,
                background: 'rgba(13, 18, 36, 0.6)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(16, 185, 129, 0.15)',
                  color: '#10B981',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <Lock size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>
                100% Client-Side Private
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Your data never touches a remote server. Cryptography, formatting, decoding, and parsing all execute securely inside your local browser runtime.
              </p>
            </div>

            <div
              style={{
                padding: 24,
                background: 'rgba(13, 18, 36, 0.6)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(99, 102, 241, 0.15)',
                  color: '#818CF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <Cpu size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>
                Zero Bloat & Peak Speed
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Powered by Next.js 16 and React 19. Instant sub-millisecond computations with zero unnecessary heavy dependencies.
              </p>
            </div>

            <div
              style={{
                padding: 24,
                background: 'rgba(13, 18, 36, 0.6)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(56, 189, 248, 0.15)',
                  color: '#38BDF8',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 16,
                }}
              >
                <Sparkles size={22} />
              </div>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 8 }}>
                Spotlight Command Center
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                Seamless keyboard navigation with <code>⌘K</code> or <code>Ctrl+K</code>. Switch between any of the 111+ utilities instantly without reaching for your mouse.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
