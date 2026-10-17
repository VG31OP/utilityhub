import Link from 'next/link';
import { categories, getToolsByCategory, getCategoryById } from '../../lib/tools';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }));
}

export const instant = false;

export async function generateMetadata({ params }) {
  const { category } = await params;
  const cat = getCategoryById(category);
  if (!cat) return {};
  return {
    title: `${cat.name} — UtilityHub`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const cat = getCategoryById(category);
  if (!cat) notFound();

  const catTools = getToolsByCategory(category);

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="container" style={{ padding: '36px 24px 80px' }}>
        {/* Back Link */}
        <div style={{ marginBottom: 20 }}>
          <Link href="/" className="btn btn-ghost btn-sm">
            <ArrowLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Category Hero Header Card */}
        <div
          style={{
            padding: '36px 32px',
            background: 'rgba(19, 27, 51, 0.45)',
            backdropFilter: 'blur(20px)',
            borderRadius: 'var(--radius-xl)',
            border: '1px solid var(--border-color)',
            marginBottom: 36,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 3,
              background: `var(--gradient-${cat.gradient || 'hero'})`,
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <div
              className="category-page-icon"
              style={{
                background: cat.bgColor,
                color: cat.color,
                margin: 0,
              }}
            >
              {cat.icon}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                <h1 className="category-page-title" style={{ margin: 0 }}>
                  {cat.name}
                </h1>
                <span
                  style={{
                    fontSize: '0.8rem',
                    padding: '4px 12px',
                    borderRadius: '999px',
                    background: cat.bgColor,
                    color: cat.color,
                    fontWeight: 700,
                  }}
                >
                  {catTools.length} tools
                </span>
              </div>
              <p className="category-page-desc" style={{ marginTop: 6, margin: 0 }}>
                {cat.description}
              </p>
            </div>
          </div>
        </div>

        {/* Other Categories Quick Pills */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 10, fontWeight: 600, textTransform: 'uppercase' }}>
            Jump to other suites
          </div>
          <div style={{ display: 'flex', gap: 8, overflowX: 'auto', paddingBottom: 6 }}>
            {categories
              .filter((c) => c.id !== category)
              .map((c) => (
                <Link
                  key={c.id}
                  href={`/tools/${c.id}`}
                  className="filter-pill"
                >
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </Link>
              ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="tools-grid">
          {catTools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.id}
                href={`/tools/${category}/${tool.id}`}
                className={`tool-card animate-in animate-in-delay-${Math.min(i + 1, 5)}`}
              >
                <div className="tool-card-icon" style={{ background: cat.bgColor, color: cat.color }}>
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
      </div>
    </div>
  );
}
