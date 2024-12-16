import { createTheme } from '@mui/material/styles';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            main: '#3730a3',
            light: '#4f46e5',
            dark: '#312e81',
          },
          secondary: {
            main: '#be185d',
            light: '#db2777',
            dark: '#9d174d',
          },
          background: {
            default: '#f8fafc',
            paper: 'rgba(255, 255, 255, 0.95)',
          },
          text: {
            primary: '#1e293b',
            secondary: '#475569',
          },
          gradients: {
            primary: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
            secondary: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
            background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.08) 0%, rgba(219, 39, 119, 0.08) 100%)',
          },
        }
      : {
          primary: {
            main: '#6366f1',
            light: '#818cf8',
            dark: '#4f46e5',
          },
          secondary: {
            main: '#ec4899',
            light: '#f472b6',
            dark: '#db2777',
          },
          background: {
            default: '#0f172a',
            paper: 'rgba(15, 23, 42, 0.95)',
          },
          text: {
            primary: '#f1f5f9',
            secondary: '#cbd5e1',
          },
          gradients: {
            primary: 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
            secondary: 'linear-gradient(135deg, #f472b6 0%, #ec4899 100%)',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(236, 72, 153, 0.08) 100%)',
          },
        }),
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Segoe UI", "Roboto", sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
    },
    body1: {
      fontSize: '1rem',
      letterSpacing: '0.00938em',
      lineHeight: 1.75,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.02em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundImage: mode === 'light'
            ? 'radial-gradient(at 50% 0%, rgba(79, 70, 229, 0.12) 0%, rgba(219, 39, 119, 0.12) 50%, rgba(79, 70, 229, 0.12) 100%)'
            : 'radial-gradient(at 50% 0%, rgba(99, 102, 241, 0.12) 0%, rgba(236, 72, 153, 0.12) 50%, rgba(99, 102, 241, 0.12) 100%)',
          minHeight: '100vh',
          scrollbarColor: mode === 'light' ? "#94a3b8 #f1f5f9" : "#475569 #1e293b",
          "&::-webkit-scrollbar": {
            width: 12,
          },
          "&::-webkit-scrollbar-track": {
            background: mode === 'light' ? "#f1f5f9" : "#1e293b",
          },
          "&::-webkit-scrollbar-thumb": {
            background: mode === 'light' ? "#94a3b8" : "#475569",
            borderRadius: 6,
            border: `3px solid ${mode === 'light' ? "#f1f5f9" : "#1e293b"}`,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'transparent',
          boxShadow: 'none',
          borderBottom: 'none',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          padding: '8px 20px',
          fontSize: '0.875rem',
          backdropFilter: 'blur(8px)',
          background: mode === 'light'
            ? 'rgba(79, 70, 229, 0.08)'
            : 'rgba(99, 102, 241, 0.08)',
          border: '1px solid',
          borderColor: mode === 'light'
            ? 'rgba(79, 70, 229, 0.2)'
            : 'rgba(99, 102, 241, 0.2)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-1px)',
            background: mode === 'light'
              ? 'rgba(79, 70, 229, 0.12)'
              : 'rgba(99, 102, 241, 0.12)',
          },
        },
        contained: {
          background: mode === 'light'
            ? 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)'
            : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
          color: '#fff',
          border: 'none',
          '&:hover': {
            background: mode === 'light'
              ? 'linear-gradient(135deg, #3730a3 0%, #312e81 100%)'
              : 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: mode === 'light'
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(12px)',
          borderRadius: 12,
          border: '1px solid',
          borderColor: mode === 'light'
            ? 'rgba(79, 70, 229, 0.1)'
            : 'rgba(99, 102, 241, 0.1)',
          boxShadow: mode === 'light'
            ? '0 4px 20px rgba(79, 70, 229, 0.1)'
            : '0 4px 20px rgba(15, 23, 42, 0.2)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: mode === 'light'
            ? 'rgba(255, 255, 255, 0.9)'
            : 'rgba(15, 23, 42, 0.9)',
          backdropFilter: 'blur(12px)',
          borderRadius: 12,
          border: '1px solid',
          borderColor: mode === 'light'
            ? 'rgba(79, 70, 229, 0.1)'
            : 'rgba(99, 102, 241, 0.1)',
        },
      },
    },
  },
});

export const createCustomTheme = (mode) => createTheme(getDesignTokens(mode));
