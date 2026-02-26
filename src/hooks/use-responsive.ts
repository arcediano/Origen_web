/**
 * @file use-responsive.ts
 * @description Hook para detectar el tamaño de pantalla y dispositivos
 */

'use client';

import { useState, useEffect } from 'react';

export function useResponsive() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 640; // sm
  const isTablet = windowSize.width >= 640 && windowSize.width < 1024; // sm to lg
  const isDesktop = windowSize.width >= 1024; // lg

  return {
    windowSize,
    isMobile,
    isTablet,
    isDesktop,
    isSm: windowSize.width >= 640,
    isMd: windowSize.width >= 768,
    isLg: windowSize.width >= 1024,
    isXl: windowSize.width >= 1280,
    is2xl: windowSize.width >= 1536,
  };
}