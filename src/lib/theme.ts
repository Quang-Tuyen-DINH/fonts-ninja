export type ThemeMode = 'light' | 'dark';

export const THEME_COOKIE = 'fonts_app_theme';
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 365 days

export function coerceMode(value?: string | null): ThemeMode {
  return value === 'dark' ? 'dark' : 'light';
}
