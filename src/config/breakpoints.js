import { useState, useEffect } from 'react';

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export function useBreakpoint() {
  const getCurrent = () => {
    if (typeof window === 'undefined') return 'default'; // SSR-safe
    const width = window.innerWidth;
    if (width >= breakpoints['2xl']) return '2xl';
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'default';
  };

  const [breakpoint, setBreakpoint] = useState(() =>
    typeof window === 'undefined' ? 'default' : getCurrent()
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => setBreakpoint(getCurrent());
    window.addEventListener('resize', handleResize);

    // Call once on mount
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoint;
}
