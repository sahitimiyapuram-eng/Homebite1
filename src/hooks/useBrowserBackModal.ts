import { useEffect, useRef } from 'react';

/**
 * Hook to automatically close an active modal when the browser's Back button is clicked,
 * preventing accidental page navigation or tab switching.
 */
export function useBrowserBackModal(
  isOpen: boolean,
  onClose: () => void,
  modalId: string = 'modal'
) {
  const isPushedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) return;

    // Push a modal history state
    window.history.pushState({ modalOpen: true, modalId }, '');
    isPushedRef.current = true;

    const handlePopState = () => {
      // If browser back button was pressed while modal was open
      if (isPushedRef.current) {
        isPushedRef.current = false;
        onClose();
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      // If modal closed via UI button (like 'X' or backdrop) instead of browser back,
      // pop the history entry we pushed so history isn't polluted
      if (isPushedRef.current) {
        isPushedRef.current = false;
        window.history.back();
      }
    };
  }, [isOpen, modalId, onClose]);
}
