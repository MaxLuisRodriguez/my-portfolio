/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // WAW Energy Brand Palette - Black, Gold, Green
        primary: {
          50: '#f0fdf4',   // Lightest green
          100: '#dcfce7',  // Very light green
          200: '#bbf7d0',  // Light green
          300: '#86efac',  // Medium light green
          400: '#4ade80',  // Medium green
          500: '#22c55e',  // Main brand green (from roses)
          600: '#16a34a',  // Darker green
          700: '#15803d',  // Dark green
          800: '#166534',  // Very dark green
          900: '#14532d',  // Darkest green
          950: '#052e16',  // Nearly black green
        },
        gold: {
          50: '#fffbeb',   // Lightest gold
          100: '#fef3c7',  // Very light gold
          200: '#fde68a',  // Light gold
          300: '#fcd34d',  // Medium light gold
          400: '#fbbf24',  // Medium gold
          500: '#f59e0b',  // Main brand gold (from text/triangle)
          600: '#d97706',  // Darker gold
          700: '#b45309',  // Dark gold
          800: '#92400e',  // Very dark gold
          900: '#78350f',  // Darkest gold
          950: '#451a03',  // Nearly black gold
        },
        black: {
          50: '#f8fafc',   // Lightest (almost white)
          100: '#f1f5f9',  // Very light gray
          200: '#e2e8f0',  // Light gray
          300: '#cbd5e1',  // Medium light gray
          400: '#94a3b8',  // Medium gray
          500: '#64748b',  // Gray
          600: '#475569',  // Dark gray
          700: '#334155',  // Very dark gray
          800: '#1e293b',  // Nearly black
          900: '#0f172a',  // Very dark (main black)
          950: '#020617',  // Pure black (from can background)
        },
        // Dark theme surfaces
        surface: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',  // Main dark surface
          900: '#18181b',
          950: '#09090b',
        },
        // Status colors
        success: '#22c55e',
        warning: '#f59e0b',
        error: '#ef4444',
        info: '#3b82f6',
      },
      fontFamily: {
        // WAW Energy Typography - Mostra Nuova inspired
        sans: [
          'Mostra Nuova',
          'Inter Variable',
          'Inter',
          'ui-sans-serif', 
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'sans-serif',
        ],
        display: [
          'Mostra Nuova',
          'Oswald Variable',
          'Oswald',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
        cursive: [
          'Dancing Script',
          'Brush Script MT',
          'cursive',
        ],
        mono: [
          'JetBrains Mono',
          'SF Mono',
          'Monaco',
          'Inconsolata',
          'Roboto Mono',
          'monospace',
        ],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      scale: {
        '101': '1.01',
        '102': '1.02',
        '103': '1.03',
        '105': '1.05',
      },
      boxShadow: {
        // Futuristic glow effects
        'glow': '0 0 20px rgb(34 197 94 / 0.3)',
        'glow-lg': '0 0 40px rgb(34 197 94 / 0.4)',
        'glow-xl': '0 0 60px rgb(34 197 94 / 0.5)',
        'glow-gold': '0 0 30px rgb(245 158 11 / 0.4)',
        'glow-gold-lg': '0 0 50px rgb(245 158 11 / 0.6)',
        'glow-botanical': '0 0 40px rgb(34 197 94 / 0.3), 0 0 80px rgb(245 158 11 / 0.2)',
        'neon-green': '0 0 5px #22c55e, 0 0 10px #22c55e, 0 0 15px #22c55e, 0 0 20px #22c55e',
        'neon-gold': '0 0 5px #f59e0b, 0 0 10px #f59e0b, 0 0 15px #f59e0b, 0 0 20px #f59e0b',
        'cyber': '0 0 20px rgba(34, 197, 94, 0.5), inset 0 0 20px rgba(245, 158, 11, 0.1)',
        'card': '0 8px 32px rgb(0 0 0 / 0.3), 0 0 20px rgb(34 197 94 / 0.1)',
        'card-hover': '0 16px 64px rgb(0 0 0 / 0.4), 0 0 40px rgb(34 197 94 / 0.2)',
        'floating': '0 20px 40px rgb(0 0 0 / 0.3), 0 0 30px rgb(245 158 11 / 0.2)',
      },
      animation: {
        // Futuristic animations
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'pulse-gold': 'pulseGold 2.5s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'botanical-sway': 'botanicalSway 4s ease-in-out infinite',
        'neon-flicker': 'neonFlicker 1.5s ease-in-out infinite alternate',
        'cyber-scan': 'cyberScan 3s linear infinite',
        'hologram': 'hologram 4s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgb(34 197 94 / 0.3)' },
          '50%': { boxShadow: '0 0 60px rgb(34 197 94 / 0.8), 0 0 100px rgb(34 197 94 / 0.3)' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 20px rgb(245 158 11 / 0.3)' },
          '50%': { boxShadow: '0 0 60px rgb(245 158 11 / 0.8), 0 0 100px rgb(245 158 11 / 0.3)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '33%': { transform: 'translateY(-10px) rotate(1deg)' },
          '66%': { transform: 'translateY(5px) rotate(-1deg)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        botanicalSway: {
          '0%, 100%': { transform: 'rotate(0deg) scale(1)' },
          '25%': { transform: 'rotate(2deg) scale(1.02)' },
          '75%': { transform: 'rotate(-2deg) scale(0.98)' },
        },
        neonFlicker: {
          '0%, 100%': { opacity: '1', textShadow: '0 0 10px currentColor' },
          '50%': { opacity: '0.8', textShadow: '0 0 20px currentColor, 0 0 30px currentColor' },
        },
        cyberScan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        hologram: {
          '0%, 100%': { opacity: '0.9', filter: 'hue-rotate(0deg)' },
          '50%': { opacity: '1', filter: 'hue-rotate(90deg)' },
        },
      },
    },
  },
  plugins: [],
} 