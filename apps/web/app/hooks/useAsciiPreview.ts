'use client';

import { useCallback, useEffect, useState } from 'react';
import type { Config } from '@github-readme-stylist/core';
import { generateAsciiArt } from '../actions';

export function useAsciiPreview(asciiConfig: Config['sections']['ascii']) {
  const [asciiPreview, setAsciiPreview] = useState('');
  const [isAsciiLoading, setIsAsciiLoading] = useState(false);

  const updateAsciiPreview = useCallback(async () => {
    if (!asciiConfig.enabled) {
      setAsciiPreview('');
      return;
    }
    setIsAsciiLoading(true);
    try {
      const art = await generateAsciiArt(asciiConfig.text, asciiConfig.font);
      setAsciiPreview(art);
    } catch {
      setAsciiPreview('');
    } finally {
      setIsAsciiLoading(false);
    }
  }, [asciiConfig.enabled, asciiConfig.font, asciiConfig.text]);

  useEffect(() => {
    const timer = setTimeout(updateAsciiPreview, 500);
    return () => clearTimeout(timer);
  }, [updateAsciiPreview]);

  return { asciiPreview, isAsciiLoading };
}

