import { useEffect, useRef } from 'react';
let locks = 0,
  originalOverflow = '';
export function useDialog(onClose: () => void) {
  const dialog = useRef<HTMLDialogElement>(null),
    closeButton = useRef<HTMLButtonElement>(null);
  const callback = useRef(onClose);
  callback.current = onClose;
  useEffect(() => {
    const element = dialog.current!,
      previous = document.activeElement as HTMLElement | null;
    if (locks === 0) {
      originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    locks++;
    element.showModal();
    closeButton.current?.focus();
    return () => {
      element.close();
      locks--;
      if (locks === 0) document.body.style.overflow = originalOverflow;
      if (previous?.isConnected && previous !== document.body)
        previous.focus({ preventScroll: true });
    };
  }, []);
  return { dialog, closeButton, close: () => callback.current() };
}
