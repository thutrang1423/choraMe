/**
 * Font utilities for Vite React application
 *
 * This module provides utilities for managing Google Fonts in a Vite React application.
 * Since Vite doesn't have Next.js's built-in font optimization, we use CSS imports and custom properties.
 */

// Font weights enum for type safety
export enum FontWeights {
  Light = '300',
  Regular = '400',
  Medium = '500',
  SemiBold = '600',
  Bold = '700',
  ExtraBold = '800'
}

// Font configuration
export const fontConfig = {
  family: 'Be Vietnam Pro',
  weights: [
    FontWeights.Light,
    FontWeights.Regular,
    FontWeights.Medium,
    FontWeights.SemiBold,
    FontWeights.Bold,
    FontWeights.ExtraBold
  ],
  variable: '--vif-font-family',
  subsets: ['latin', 'vietnamese']
};

/**
 * Generates the Google Fonts URL for Be Vietnam Pro
 *
 * @returns The Google Fonts URL with all specified weights
 */
export function getBeVietnamProUrl(): string {
  const weights = fontConfig.weights.join(';');
  const family = fontConfig.family.replace(/\s+/g, '+');
  return `https://fonts.googleapis.com/css2?family=${family}:wght@${weights}&display=swap`;
}

/**
 * Generates CSS custom properties for the font
 *
 * @returns CSS custom properties object
 */
export function getFontCssProperties(): Record<string, string> {
  return {
    [fontConfig.variable]: `"${fontConfig.family}", sans-serif`
  };
}

/**
 * Loads Be Vietnam Pro font dynamically
 * This function creates a link element and adds it to the document head
 *
 * @returns Promise that resolves when the font is loaded
 */
export function loadBeVietnamProFont(): Promise<void> {
  return new Promise((resolve, reject) => {
    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href*="Be+Vietnam+Pro"]`);

    if (existingLink) {
      resolve();
      return;
    }

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = getBeVietnamProUrl();
    link.onload = () => resolve();
    link.onerror = () => reject(new Error('Failed to load Be Vietnam Pro font'));

    document.head.appendChild(link);
  });
}

/**
 * Hook for using Be Vietnam Pro font in React components
 *
 * @returns Font family CSS value
 */
export function useBeVietnamProFont(): string {
  return `var(${fontConfig.variable})`;
}

/**
 * CSS class name for Be Vietnam Pro font
 */
export const beVietnamProClass = 'be-vietnam-pro';

/**
 * Generates CSS string for Be Vietnam Pro font
 *
 * @returns CSS string that can be injected into stylesheets
 */
export function generateBeVietnamProCSS(): string {
  return `
@import url('${getBeVietnamProUrl()}');

:root {
  ${fontConfig.variable}: "${fontConfig.family}", sans-serif;
}

.${beVietnamProClass} {
  font-family: var(${fontConfig.variable});
}

/* Utility classes for different font weights */
.font-light { font-weight: ${FontWeights.Light}; }
.font-regular { font-weight: ${FontWeights.Regular}; }
.font-medium { font-weight: ${FontWeights.Medium}; }
.font-semibold { font-weight: ${FontWeights.SemiBold}; }
.font-bold { font-weight: ${FontWeights.Bold}; }
.font-extrabold { font-weight: ${FontWeights.ExtraBold}; }
`;
}

/**
 * Object containing font utilities for easy import
 */
export const beVietnamPro = {
  family: fontConfig.family,
  variable: fontConfig.variable,
  weights: fontConfig.weights,
  className: beVietnamProClass,
  url: getBeVietnamProUrl(),
  cssProperties: getFontCssProperties(),
  load: loadBeVietnamProFont,
  useFont: useBeVietnamProFont
};
