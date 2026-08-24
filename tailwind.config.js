/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agency: {
          950: '#020617', // deepest void
          900: '#060d1f', // deep navy dark
          850: '#0b152d', // surface deep
          800: '#0f1f42', // surface card
          750: '#152957', // surface card hover
          700: '#1e3a8a', // navy accent
          600: '#2563eb', // blue
          500: '#3b82f6',
        },
        cyber: {
          cyan: '#06b6d4',
          'cyan-bright': '#22d3ee',
          'cyan-glow': 'rgba(6, 182, 212, 0.3)',
          purple: '#8b5cf6',
          'purple-bright': '#a78bfa',
          'purple-glow': 'rgba(139, 92, 246, 0.3)',
          amber: '#f59e0b',
          crimson: '#ef4444',
          emerald: '#10b981',
          rose: '#f43f5e',
        },
        glass: {
          light: 'rgba(255, 255, 255, 0.05)',
          medium: 'rgba(15, 23, 42, 0.75)',
          heavy: 'rgba(6, 13, 31, 0.90)',
          border: 'rgba(148, 163, 184, 0.12)',
          'border-highlight': 'rgba(6, 182, 212, 0.35)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'neon-cyan': '0 0 15px -2px rgba(6, 182, 212, 0.45)',
        'neon-purple': '0 0 15px -2px rgba(139, 92, 246, 0.45)',
        'neon-crimson': '0 0 15px -2px rgba(239, 68, 68, 0.45)',
        'neon-amber': '0 0 15px -2px rgba(245, 158, 11, 0.45)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(1000%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
