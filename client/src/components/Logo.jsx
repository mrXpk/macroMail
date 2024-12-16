import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Mail } from '@mui/icons-material';

export default function Logo() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ cursor: 'pointer' }}
      onClick={() => navigate('/')}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 1, sm: 1.5 },
        }}
      >
        <Mail
          sx={{
            fontSize: { xs: '1.8rem', sm: '2rem' },
            color: theme.palette.primary.main,
          }}
        />
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Share Tech Mono", monospace',
            fontSize: { xs: '1.2rem', sm: '1.5rem' },
            fontWeight: 700,
            background: theme.palette.mode === 'dark'
              ? 'linear-gradient(45deg, #4F46E5, #06B6D4)'
              : 'linear-gradient(45deg, #3730A3, #0891B2)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          MacroMail
        </Typography>
      </Box>
    </motion.div>
  );
}
