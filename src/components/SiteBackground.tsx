import { useEffect, useRef } from 'react';
export function SiteBackground() {
  return (
    <div className="site-background" aria-hidden="true">
      <div className="site-grid" />
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
    </div>
  );
}
export function Particles() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current!;
    let context: CanvasRenderingContext2D | null;
    try {
      context = element.getContext('2d');
    } catch {
      return;
    }
    if (!context) return;
    const ctx = context,
      preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let width = 0,
      height = 0,
      frame = 0,
      visible = true,
      last = 0;
    const points = Array.from({ length: 45 }, (_, i) => ({
      x: ((i * 137 + 47) % 1000) / 1000,
      y: ((i * 239 + 71) % 1000) / 1000,
      vx: ((i % 5) - 2) * 0.000007,
      vy: ((i % 7) - 3) * 0.000005,
      r: i % 4 === 0 ? 2.5 : 1.4,
    }));
    const resize = () => {
      const rect = element.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      element.width = width * ratio;
      element.height = height * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = (time: number) => {
      const delta = Math.min(time - last, 40) || 16;
      last = time;
      ctx.clearRect(0, 0, width, height);
      const count = width < 640 ? 26 : 45;
      for (let i = 0; i < count; i++) {
        const p = points[i];
        if (!preference.matches) {
          p.x = (p.x + p.vx * delta + 1) % 1;
          p.y = (p.y + p.vy * delta + 1) % 1;
        }
        ctx.fillStyle = 'rgba(99,102,241,.48)';
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fill();
        for (let j = i + 1; j < count; j++) {
          const q = points[j];
          const d = Math.hypot((p.x - q.x) * width, (p.y - q.y) * height);
          if (d < 140) {
            ctx.strokeStyle = `rgba(99,102,241,${(1 - d / 140) * 0.11})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x * width, p.y * height);
            ctx.lineTo(q.x * width, q.y * height);
            ctx.stroke();
          }
        }
      }
      if (visible && !document.hidden && !preference.matches) frame = requestAnimationFrame(draw);
    };
    const restart = () => {
      cancelAnimationFrame(frame);
      last = 0;
      resize();
      draw(0);
    };
    const observer = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      restart();
    });
    observer.observe(element);
    window.addEventListener('resize', restart);
    document.addEventListener('visibilitychange', restart);
    preference.addEventListener('change', restart);
    restart();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', restart);
      document.removeEventListener('visibilitychange', restart);
      preference.removeEventListener('change', restart);
    };
  }, []);
  return <canvas ref={canvas} className="particle-canvas" aria-hidden="true" />;
}
