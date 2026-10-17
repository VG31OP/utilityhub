'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Info, Star, Copy } from 'lucide-react';

let toastTimeout = null;

export function showToast(message, type = 'success') {
  if (typeof window !== 'undefined') {
    const event = new CustomEvent('show-utility-toast', {
      detail: { message, type, id: Date.now() },
    });
    window.dispatchEvent(event);
  }
}

export default function Toast() {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    function handleToast(e) {
      if (toastTimeout) clearTimeout(toastTimeout);
      setToast(e.detail);
      toastTimeout = setTimeout(() => {
        setToast(null);
      }, 3000);
    }

    window.addEventListener('show-utility-toast', handleToast);
    return () => {
      window.removeEventListener('show-utility-toast', handleToast);
      if (toastTimeout) clearTimeout(toastTimeout);
    };
  }, []);

  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'star':
        return <Star size={18} className="text-amber-400 fill-amber-400" />;
      case 'copy':
        return <Copy size={18} className="text-cyan-400" />;
      case 'info':
        return <Info size={18} className="text-sky-400" />;
      default:
        return <CheckCircle2 size={18} className="text-emerald-400" />;
    }
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      <div className="toast-pill">
        <span className="toast-icon">{getIcon()}</span>
        <span className="toast-text">{toast.message}</span>
      </div>
    </div>
  );
}
