import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let observer: IntersectionObserver | undefined;
    const configure = () => {
      observer?.disconnect();
      document.documentElement.classList.remove('motion-ready');
      if (preference.matches || !('IntersectionObserver' in window)) return;
      document.documentElement.classList.add('motion-ready');
      observer = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-visible');
            observer?.unobserve(entry.target);
          }),
        { threshold: 0.08, rootMargin: '0px 0px -25px 0px' },
      );
      document.querySelectorAll('.reveal').forEach((element) => observer?.observe(element));
    };
    configure();
    preference.addEventListener('change', configure);
    return () => {
      observer?.disconnect();
      preference.removeEventListener('change', configure);
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);
}
