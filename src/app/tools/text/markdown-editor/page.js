'use client';
import { useState } from 'react';
import ToolLayout from '../../../../components/ToolLayout';
import { getToolById } from '../../../../lib/tools';

function parseMarkdown(md) {
  let html = md
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^\> (.*$)/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/^---$/gm, '<hr>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br>');
  return '<p>' + html + '</p>';
}

export default function MarkdownEditorPage() {
  const tool = getToolById('markdown-editor');
  const [md, setMd] = useState('# Hello World\n\nThis is a **Markdown** editor with *live preview*.\n\n## Features\n\n- Real-time preview\n- Supports basic Markdown\n- Clean and simple\n\n> This is a blockquote\n\n`inline code` works too!\n\n---\n\n[Link example](https://example.com)');

  return (
    <ToolLayout tool={tool} category="text">
      <div className="tool-workspace-split">
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Markdown</span><span className="tool-panel-badge">Editor</span></div>
          <div className="tool-panel-body">
            <textarea className="form-textarea" value={md} onChange={(e) => setMd(e.target.value)} rows={20} style={{ minHeight: 400 }} />
          </div>
        </div>
        <div className="tool-panel">
          <div className="tool-panel-header"><span>Preview</span><span className="tool-panel-badge">HTML</span></div>
          <div className="tool-panel-body">
            <div className="markdown-preview" dangerouslySetInnerHTML={{ __html: parseMarkdown(md) }} style={{ minHeight: 400 }} />
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
