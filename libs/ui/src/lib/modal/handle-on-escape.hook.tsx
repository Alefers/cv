import React, { useEffect } from 'react';


interface HandleOnEscapeHookProps {
  useHook: boolean;
  onEscape: () => void;
}

export const useHandleOnEscapeHook = (
  {
    useHook,
    onEscape,
  }: HandleOnEscapeHookProps,
) => {
  const handleEscapePress = (event: KeyboardEvent) => {
    if (onEscape && event.key === 'Escape') {
      onEscape();
    }
  };

  useEffect(() => {
    if (useHook) {
      window.addEventListener('keydown', handleEscapePress);
    }
    return () => {
      window.removeEventListener('keydown', handleEscapePress);
    };
  }, [useHook]);
};
