'use client';

import Link from 'next/link';
import { categories } from '../lib/tools';
import { ShieldCheck, Zap, Heart, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          {/* Brand Info */}
          <div>
            <div className="footer-brand-title">⚡ UtilityHub</div>
            <p className="footer-brand-desc">
              The premier all-in-one developer and everyday digital toolkit. 111+ client-side utilities engineered for maximum speed, security, and delightful usability.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 16, color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem' }}>
                <ShieldCheck size={16} className="text-emerald-400" />
                <span>100% Client-Side Safe</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.82rem' }}>
                <Zap size={16} className="text-amber-400" />
                <span>Instant Turbopack</span>
              </div>
            </div>
          </div>

          {/* Quick Categories Col 1 */}
          <div>
            <div className="footer-col-title">Popular Suites</div>
            <ul className="footer-col-links">
              <li><Link href="/tools/developer" className="footer-col-link">Developer Tools</Link></li>
              <li><Link href="/tools/text" className="footer-col-link">Text Processing</Link></li>
              <li><Link href="/tools/image" className="footer-col-link">Image & Media</Link></li>
              <li><Link href="/tools/security" className="footer-col-link">Security & Cryptography</Link></li>
              <li><Link href="/tools/math" className="footer-col-link">Math & Finance</Link></li>
            </ul>
          </div>

          {/* Quick Categories Col 2 */}
          <div>
            <div className="footer-col-title">More Categories</div>
            <ul className="footer-col-links">
              <li><Link href="/tools/color" className="footer-col-link">Color & CSS Design</Link></li>
              <li><Link href="/tools/productivity" className="footer-col-link">Productivity & Focus</Link></li>
              <li><Link href="/tools/file" className="footer-col-link">File & Data Converters</Link></li>
              <li><Link href="/tools/ai" className="footer-col-link">AI & Generation</Link></li>
              <li><Link href="/tools/seo" className="footer-col-link">SEO & Web Tools</Link></li>
            </ul>
          </div>

          {/* Navigation & Info */}
          <div>
            <div className="footer-col-title">Hub Navigation</div>
            <ul className="footer-col-links">
              <li><Link href="/" className="footer-col-link">Home Hub</Link></li>
              <li><Link href="/tools" className="footer-col-link">All 111+ Tools Catalog</Link></li>
              <li><Link href="/#popular" className="footer-col-link">Trending Utilities</Link></li>
              <li><Link href="/#categories" className="footer-col-link">All Categories</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © 2026 UtilityHub. Engineered for productivity, privacy, and zero bloat.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>Crafted with</span>
            <Heart size={14} className="text-rose-500 fill-rose-500" />
            <span>for developers & creators worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
