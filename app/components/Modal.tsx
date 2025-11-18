// components/Modal.tsx
'use client';

import React from 'react';

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose?: ()=>void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 w-full max-w-2xl">
        {children}
      </div>
    </div>
  );
}
