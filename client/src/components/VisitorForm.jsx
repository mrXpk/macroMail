import { useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  useTheme,
  Paper
} from '@mui/material';
import { motion } from 'framer-motion';
import { PersonAdd } from '@mui/icons-material';

const VisitorForm = () => {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const theme = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim()) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/visitors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name.trim() })
        });

        if (response.ok) {
          setSubmitted(true);
          localStorage.setItem('visitorName', name.trim());
          setName('');
        }
      } catch (error) {
        console.error('Error saving visitor:', error);
      }
    }
  };

  if (submitted) {
    return (
      <Paper
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        sx={{
          p: 2,
          background: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)',
        }}
      >
        <Typography variant="body1" color="primary" align="center">
          Thanks for joining our community! 🎉
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      component={motion.form}
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      sx={{
        p: 2,
        background: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        borderRadius: 2,
        border: '1px solid',
        borderColor: theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)',
      }}
    >
      <Typography variant="subtitle1" gutterBottom>
        Join our community 🌟
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          size="small"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
            }
          }}
        />
        <Button
          type="submit"
          variant="contained"
          disabled={!name.trim()}
          startIcon={<PersonAdd />}
          sx={{
            textTransform: 'none',
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            }
          }}
        >
          Join
        </Button>
      </Box>
    </Paper>
  );
};

export default VisitorForm;
