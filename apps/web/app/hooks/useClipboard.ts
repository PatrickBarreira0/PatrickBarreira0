'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export function useClipboard(timeoutMs = 2000) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<number | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const copy = useCallback(
    (text: string) => {
      if (!text) return;
      navigator.clipboard.writeText(text);
      setCopied(true);
      clearTimer();
      timerRef.current = window.setTimeout(() => setCopied(false), timeoutMs);
    },
    [clearTimer, timeoutMs],
  );

  return { copied, copy };
}

