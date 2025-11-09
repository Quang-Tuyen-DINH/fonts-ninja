"use client";

import React from 'react';
import styles from './page.module.scss';

export type PreviewSwitcherProps = {
  familyName: string;
  alphabetSvg: string;
  pangramSvg?: string | null;
};

export default function PreviewSwitcher({ familyName, alphabetSvg, pangramSvg }: PreviewSwitcherProps) {
  const hasPangram = !!(pangramSvg && pangramSvg.trim().length > 0);
  const [mode, setMode] = React.useState<'pangram' | 'alphabet'>(hasPangram ? 'pangram' : 'alphabet');
  // Sync mode after mount in case pangram only exists client-side or hydration differs
  React.useEffect(() => {
    if (hasPangram) setMode('pangram');
  }, [hasPangram]);
  const current = mode === 'pangram' ? (pangramSvg || alphabetSvg) : alphabetSvg;

  return (
    <div className={styles.previewCard}>
      <div
        className={styles.svgHolder}
        aria-label={`${familyName} ${mode} preview`}
        dangerouslySetInnerHTML={{ __html: current }}
      />
      <div className={styles.switchRow} role="tablist" aria-label="Preview selector">
        {pangramSvg && (
          <button
            type="button"
            className={styles.switchBtn + ' ' + (mode === 'pangram' ? styles.switchBtnActive : '')}
            onClick={() => setMode('pangram')}
            role="tab"
            aria-selected={mode === 'pangram'}
          >Pangram</button>
        )}
        <button
          type="button"
          className={styles.switchBtn + ' ' + (mode === 'alphabet' ? styles.switchBtnActive : '')}
          onClick={() => setMode('alphabet')}
          role="tab"
          aria-selected={mode === 'alphabet'}
        >Alphabet</button>
      </div>
    </div>
  );
}
