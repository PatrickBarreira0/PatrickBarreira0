'use client';

import { useEffect, useState } from 'react';
import { getFonts } from '../actions';

export function useFonts() {
  const [fonts, setFonts] = useState<string[]>([]);

  useEffect(() => {
    let isActive = true;
    getFonts().then((loadedFonts) => {
      if (isActive) {
        setFonts(loadedFonts);
      }
    });
    return () => {
      isActive = false;
    };
  }, []);

  return fonts;
}

