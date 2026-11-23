import { useEffect, useState } from 'react';
const roles = ['Full-Stack Developer', 'Big Data Engineer', 'UI/UX Designer'];
export function useTypewriter() {
  const [text, setText] = useState(roles[0]);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let timer: ReturnType<typeof setTimeout>;
    let index = 0,
      position = 0,
      removing = false;
    const step = () => {
      const role = roles[index];
      if (preference.matches) {
        setText(roles[0]);
        return;
      }
      position += removing ? -1 : 1;
      setText(role.slice(0, position));
      if (!removing && position === role.length) {
        removing = true;
        timer = setTimeout(step, 1700);
      } else if (removing && position === 0) {
        removing = false;
        index = (index + 1) % roles.length;
        timer = setTimeout(step, 250);
      } else timer = setTimeout(step, removing ? 40 : 75);
    };
    const restart = () => {
      clearTimeout(timer);
      if (preference.matches) setText(roles[0]);
      else {
        position = 0;
        removing = false;
        index = 0;
        timer = setTimeout(step, 200);
      }
    };
    restart();
    preference.addEventListener('change', restart);
    return () => {
      clearTimeout(timer);
      preference.removeEventListener('change', restart);
    };
  }, []);
  return text;
}
