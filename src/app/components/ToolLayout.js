'use client';

import Link from 'next/link';
import { getCategoryById, getToolsByCategory } from '../lib/tools';
import { ChevronRight, ArrowLeft, Star, Share2, Sparkles, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { showToast } from './Toast';
import { fireCelebrationConfetti, fireStarConfetti } from './motion/Confetti';

export default function ToolLayout({ tool, category, children }) {
  const cat = getCategoryById(category) || {};
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check favorite status
  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem('utilityhub_favorites') || '[]');
      setIsFavorite(favs.includes(tool.id));
    } catch {
      setIsFavorite(false);
    }
  }, [tool.id]);

  // Track recently used tools
  useEffect(() => {
    try {
      const recents = JSON.parse(localStorage.getItem('utilityhub_recents') || '[]');
      const filtered = recents.filter((id) => id !== tool.id);
      const updated = [tool.id, ...filtered].slice(0, 8);
      localStorage.setItem('utilityhub_recents', JSON.stringify(updated));
    } catch {
      // Ignore in private browsing
    }
  }, [tool.id]);

  const toggleFavorite = () => {
    try {
      const favs = JSON.parse(localStorage.getItem('utilityhub_favorites') || '[]');
      let updated;
      if (favs.includes(tool.id)) {
        updated = favs.filter((id) => id !== tool.id);
        setIsFavorite(false);
        showToast(`Removed "${tool.name}" from favorites`, 'info');
      } else {
        updated = [...favs, tool.id];
        setIsFavorite(true);
        showToast(`Added "${tool.name}" to favorites! ⭐`, 'star');
        fireStarConfetti();
      }
      localStorage.setItem('utilityhub_favorites', JSON.stringify(updated));
      window.dispatchEvent(new Event('favorites-updated'));
    } catch {
      // Ignore
    }
  };

  const shareTool = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      showToast(`Link to ${tool.name} copied! 📋`, 'copy');
      fireCelebrationConfetti();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Get sibling tools from this category
  const siblingTools = getToolsByCategory(category)
    .filter((t) => t.id !== tool.id)
    .slice(0, 3);

  return (
    <div className="tool-page">
      <div className="container">
        {/* Top Bar with Breadcrumbs & Action Buttons */}
        <div className="tool-top-bar">
          <div className="tool-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={14} className="tool-breadcrumb-sep" />
            <Link href={`/tools/${category}`}>{cat.name || category}</Link>
            <ChevronRight size={14} className="tool-breadcrumb-sep" />
            <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{tool.name}</span>
          </div>

          <div className="tool-action-btn-group">
            <button
              type="button"
              className={`tool-action-btn ${isFavorite ? 'active' : ''}`}
              onClick={toggleFavorite}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <Star size={15} className={isFavorite ? 'fill-amber-400 text-amber-400' : ''} />
              <span>{isFavorite ? 'Favorited' : 'Favorite'}</span>
            </button>

            <button
              type="button"
              className="tool-action-btn"
              onClick={shareTool}
              title="Copy share link"
            >
              {copied ? <Check size={15} className="text-emerald-400" /> : <Share2 size={15} />}
              <span>{copied ? 'Copied!' : 'Share'}</span>
            </button>
          </div>
        </div>

        {/* Tool Header Card */}
        <div className="tool-header">
          <div className="tool-header-row">
            <div
              className="tool-header-icon"
              style={{
                background: cat.bgColor || 'rgba(99, 102, 241, 0.15)',
                color: cat.color || '#818CF8',
              }}
            >
              {tool.icon && <tool.icon size={26} />}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <h1 className="tool-title">{tool.name}</h1>
                <span
                  style={{
                    fontSize: '0.74rem',
                    padding: '3px 10px',
                    borderRadius: '999px',
                    background: cat.bgColor || 'rgba(99, 102, 241, 0.15)',
                    color: cat.color || '#818CF8',
                    fontWeight: 600,
                  }}
                >
                  {cat.name || category}
                </span>
              </div>
              <p className="tool-description">{tool.description}</p>
            </div>
          </div>
        </div>

        {/* Workspace */}
        <div className="tool-workspace">{children}</div>

        {/* Related Tools Recommendation Grid */}
        {siblingTools.length > 0 && (
          <div className="related-tools-box">
            <div className="related-tools-header">
              <div className="related-tools-title">
                <Sparkles size={18} style={{ color: cat.color || '#818CF8' }} />
                <span>More {cat.name} Utilities</span>
              </div>
              <Link href={`/tools/${category}`} className="btn btn-ghost btn-sm">
                View all {cat.name} tools <ChevronRight size={14} />
              </Link>
            </div>
            <div className="related-tools-grid">
              {siblingTools.map((st) => {
                const SIcon = st.icon;
                return (
                  <Link
                    key={st.id}
                    href={`/tools/${category}/${st.id}`}
                    className="tool-card"
                  >
                    <div
                      className="tool-card-icon"
                      style={{ background: cat.bgColor, color: cat.color }}
                    >
                      {SIcon && <SIcon size={18} />}
                    </div>
                    <div className="tool-card-info">
                      <div className="tool-card-name">{st.name}</div>
                      <div className="tool-card-desc">{st.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        <div style={{ marginTop: 32 }}>
          <Link href={`/tools/${category}`} className="btn btn-secondary btn-sm">
            <ArrowLeft size={16} />
            Back to {cat.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
