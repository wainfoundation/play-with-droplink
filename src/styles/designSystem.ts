
// Droplink Brand Design System
export const dropinkColors = {
  // Primary brand colors
  primary: {
    50: '#e6f7ff',
    100: '#bae7ff',
    200: '#91d5ff',
    300: '#69c0ff',
    400: '#40a9ff',
    500: '#1890ff', // Main brand blue
    600: '#096dd9',
    700: '#0050b3',
    800: '#003a8c',
    900: '#002766',
  },
  
  // Secondary colors
  secondary: {
    50: '#f6ffed',
    100: '#d9f7be',
    200: '#b7eb8f',
    300: '#95de64',
    400: '#73d13d',
    500: '#52c41a', // Success green
    600: '#389e0d',
    700: '#237804',
    800: '#135200',
    900: '#092b00',
  },
  
  // Accent colors for different moods/rooms
  accent: {
    pink: '#ff85c0',
    purple: '#b37feb',
    orange: '#ff9c6e',
    cyan: '#36cfc9',
    yellow: '#fadb14',
    red: '#ff4d4f',
  },
  
  // Neutral grays
  gray: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#e8e8e8',
    300: '#d9d9d9',
    400: '#bfbfbf',
    500: '#8c8c8c',
    600: '#595959',
    700: '#434343',
    800: '#262626',
    900: '#1f1f1f',
  },
  
  // Semantic colors
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
  info: '#1890ff',
};

export const roomThemes = {
  bedroom: {
    primary: dropinkColors.accent.purple,
    secondary: '#e6f4ff',
    gradient: 'from-purple-100 via-pink-50 to-blue-50',
    bgColor: 'bg-gradient-to-br from-purple-100 via-pink-50 to-blue-50',
  },
  kitchen: {
    primary: dropinkColors.accent.orange,
    secondary: '#fff7e6',
    gradient: 'from-orange-100 via-yellow-50 to-red-50',
    bgColor: 'bg-gradient-to-br from-orange-100 via-yellow-50 to-red-50',
  },
  bathroom: {
    primary: dropinkColors.accent.cyan,
    secondary: '#e6fffb',
    gradient: 'from-cyan-100 via-blue-50 to-teal-50',
    bgColor: 'bg-gradient-to-br from-cyan-100 via-blue-50 to-teal-50',
  },
  playroom: {
    primary: dropinkColors.accent.pink,
    secondary: '#fff0f6',
    gradient: 'from-pink-100 via-purple-50 to-red-50',
    bgColor: 'bg-gradient-to-br from-pink-100 via-purple-50 to-red-50',
  },
  nature: {
    primary: dropinkColors.secondary[500],
    secondary: '#f6ffed',
    gradient: 'from-green-100 via-emerald-50 to-lime-50',
    bgColor: 'bg-gradient-to-br from-green-100 via-emerald-50 to-lime-50',
  },
  health: {
    primary: dropinkColors.info,
    secondary: '#e6f7ff',
    gradient: 'from-blue-100 via-cyan-50 to-teal-50',
    bgColor: 'bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-50',
  },
};

export const typography = {
  fontFamily: {
    display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
    body: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Space Grotesk', 'ui-monospace', 'monospace'],
  },
  fontSize: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  },
  spacing: {
    xs: '0.5rem',
    sm: '0.75rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },
};

export const animations = {
  bounce: 'animate-bounce',
  pulse: 'animate-pulse',
  float: 'animate-float',
  fadeIn: 'animate-fade-in',
  scaleIn: 'animate-scale-in',
};
