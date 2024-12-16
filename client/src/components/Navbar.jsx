import { AppBar, Toolbar, Box, IconButton, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { DarkMode, LightMode, Star } from '@mui/icons-material';
import { useTheme, useThemeMode } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function Navbar() {
  const theme = useTheme();
  const { toggleColorMode } = useThemeMode();
  const navigate = useNavigate();

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Logo />
        <Box sx={{ flexGrow: 1 }} />
        
        {/* Premium Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ marginRight: '16px' }}
        >
          <Button
            variant="contained"
            startIcon={<Star />}
            onClick={() => navigate('/premium')}
            sx={{
              background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
              fontFamily: '"Share Tech Mono", monospace',
              textTransform: 'none',
              px: 2,
              py: 1,
              '&:hover': {
                background: 'linear-gradient(45deg, #4338CA, #0891B2)',
              },
            }}
          >
            Premium
          </Button>
        </motion.div>

        {/* Theme Toggle */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconButton
            onClick={toggleColorMode}
            sx={{
              p: 1.5,
              background: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.1)'
                : 'rgba(0, 0, 0, 0.05)',
              '&:hover': {
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.15)'
                  : 'rgba(0, 0, 0, 0.08)',
              },
            }}
          >
            {theme.palette.mode === 'dark' ? (
              <LightMode sx={{ color: '#FFD700' }} />
            ) : (
              <DarkMode sx={{ color: 'primary.main' }} />
            )}
          </IconButton>
        </motion.div>
      </Toolbar>
    </AppBar>
  );
}
