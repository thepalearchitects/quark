// styles/tokens.ts
// design tokens — keep this in sync with globals.css @theme

export const colors = {
  void: '#0A0A0A',
  surface: '#1A1A1A',
  surface2: '#141414',
  ink: '#FFFFFF',
  inkDim: '#8A8A8F',
  inkFaint: '#55555A',
  line: '#2A2A2E',
  quarkBlue: '#4D8DFF',
  quarkGreen: '#3ECF8E',
  quarkRed: '#FF4545',
} as const

export type ColorToken = keyof typeof colors

export const spacing = {
  1: '4px',
  2: '8px',
  3: '12px',
  4: '16px',
  6: '24px',
  8: '32px',
  12: '48px',
  16: '64px',
  24: '96px',
} as const

export type SpacingToken = keyof typeof spacing

export const fontSize = {
  xs: '12px',
  sm: '13px',
  md: '14px',
  base: '16px',
  lg: '18px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '28px',
  '4xl': '40px',
  '5xl': '56px',
  '6xl': '72px',
} as const

export const fontWeight = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

export const fonts = {
  ui: 'Space Grotesk, system-ui, -apple-system, sans-serif',
  mono: 'JetBrains Mono, ui-monospace, SFMono-Regular, monospace',
} as const

export const radius = {
  none: '0px',
} as const

export const shadows = {
  snap: (color: string) => `3px 3px 0 ${color}`,
  snapHover: (color: string) => `4px 4px 0 ${color}`,
} as const

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const

export type Breakpoint = keyof typeof breakpoints