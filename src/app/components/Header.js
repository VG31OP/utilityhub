'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Command, Star, Sparkles, X, ChevronRight, Layers, Menu } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { searchTools, getCategoryById, categories, tools } from '../lib/tools';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [favCount, setFavCount] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const inputRef = useRef(null);

  // Update favorites count from localStorage
  useEffect(() => {
    function updateFavs() {
      try {
        const favs = JSON.parse(localStorage.getItem('utilityhub_favorites') || '[]');
        setFavCount(favs.length);
      } catch {
        setFavCount(0);
      }
    }
    updateFavs();
    window.addEventListener('storage', updateFavs);
    window.addEventListener('favorites-updated', updateFavs);
    return () => {
      window.removeEventListener('storage', updateFavs);
      window.removeEventListener('favorites-updated', updateFavs);
    };
  }, []);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    function handleKeyDown(e) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isCommandOpen) {
        setIsCommandOpen(false);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen]);

  // Focus input on open
  useEffect(() => {
    if (isCommandOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setSearchQuery('');
      setSelectedCategory('all');
    }
  }, [isCommandOpen]);

  // Filter tools
  const filteredTools = (() => {
    let list = tools;
    if (selectedCategory !== 'all') {
      list = list.filter((t) => t.category === selectedCategory);
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
    return list.slice(0, 8);
  })();

  // Handle keyboard navigation in command palette
  const handleKeyNavigation = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredTools.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredTools.length) % Math.max(1, filteredTools.length));
    } else if (e.key === 'Enter' && filteredTools[selectedIndex]) {
      e.preventDefault();
      const target = filteredTools[selectedIndex];
      setIsCommandOpen(false);
      router.push(`/tools/${target.category}/${target.id}`);
    }
  };

  return (
    <>
      <header className="header">
        <div className="header-inner">
          <Link href="/" className="header-logo">
            <div className="header-logo-icon">⚡</div>
            <span className="header-logo-text">UtilityHub</span>
          </Link>

          {/* Quick Search Trigger */}
          <button
            type="button"
            className="header-search-btn"
            onClick={() => setIsCommandOpen(true)}
            aria-label="Open Command Palette"
          >
            <Search size={16} />
            <span>Search 111+ tools...</span>
            <span className="header-search-kbd">⌘K</span>
          </button>

          {/* Navigation Links */}
          <nav className="header-nav">
            <Link href="/" className={`header-nav-link ${pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link href="/tools" className={`header-nav-link ${pathname === '/tools' ? 'active' : ''}`}>
              <Layers size={15} />
              <span>All Tools</span>
            </Link>
            <Link href="/#favorites" className="header-nav-link">
              <Star size={15} className="text-amber-400" />
              <span>Favorites</span>
              {favCount > 0 && (
                <span
                  style={{
                    background: 'rgba(245, 158, 11, 0.2)',
                    color: '#F59E0B',
                    padding: '2px 7px',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                  }}
                >
                  {favCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </header>

      {/* Spotlight Command Palette Modal */}
      {isCommandOpen && (
        <div
          className="command-backdrop"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsCommandOpen(false);
          }}
        >
          <div className="command-modal">
            <div className="command-input-row">
              <Search size={20} className="text-muted" />
              <input
                ref={inputRef}
                type="text"
                className="command-search-input"
                placeholder="Type to search all 111+ utilities (e.g. JSON, QR, Password, Regex)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyNavigation}
              />
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setIsCommandOpen(false)}
                aria-label="Close search"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Category Filters */}
            <div
              style={{
                display: 'flex',
                gap: 6,
                padding: '10px 18px',
                borderBottom: '1px solid var(--border-color)',
                overflowX: 'auto',
                background: 'rgba(7, 9, 19, 0.5)',
              }}
            >
              <button
                type="button"
                className={`filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('all')}
              >
                All
              </button>
              {categories.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  className={`filter-pill ${selectedCategory === c.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(c.id)}
                >
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </button>
              ))}
            </div>

            {/* Search Results */}
            <div className="command-results">
              <div className="command-section-title">
                {searchQuery ? `Matching Tools (${filteredTools.length})` : 'Popular & Recommended Tools'}
              </div>

              {filteredTools.length > 0 ? (
                filteredTools.map((tool, idx) => {
                  const cat = getCategoryById(tool.category) || {};
                  const Icon = tool.icon;
                  const isSelected = idx === selectedIndex;

                  return (
                    <Link
                      key={tool.id}
                      href={`/tools/${tool.category}/${tool.id}`}
                      className={`command-item ${isSelected ? 'selected' : ''}`}
                      onClick={() => setIsCommandOpen(false)}
                      onMouseEnter={() => setSelectedIndex(idx)}
                    >
                      <div
                        className="command-item-icon"
                        style={{ background: cat.bgColor || 'rgba(99, 102, 241, 0.15)', color: cat.color || '#818CF8' }}
                      >
                        {Icon && <Icon size={18} />}
                      </div>
                      <div className="command-item-content">
                        <div className="command-item-title">
                          <span>{tool.name}</span>
                          <span
                            style={{
                              fontSize: '0.72rem',
                              padding: '2px 8px',
                              borderRadius: '4px',
                              background: 'rgba(255, 255, 255, 0.06)',
                              color: 'var(--text-muted)',
                              fontWeight: 500,
                            }}
                          >
                            {cat.name || tool.category}
                          </span>
                        </div>
                        <div className="command-item-desc">{tool.description}</div>
                      </div>
                      <ChevronRight size={16} className="text-muted" />
                    </Link>
                  );
                })
              ) : (
                <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                  No tools found matching &quot;{searchQuery}&quot;
                </div>
              )}
            </div>

            {/* Command Footer */}
            <div className="command-footer">
              <div className="command-footer-hints">
                <span>
                  <span className="command-kbd-badge">↑</span>
                  <span className="command-kbd-badge">↓</span> Navigate
                </span>
                <span>
                  <span className="command-kbd-badge">↵</span> Select
                </span>
                <span>
                  <span className="command-kbd-badge">ESC</span> Close
                </span>
              </div>
              <div>⚡ 100% Client-Side Private</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
