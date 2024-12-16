import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
  useTheme,
  Fade,
  Slide
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

const VisitorDialog = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    // Check if user has visited before
    const hasVisited = localStorage.getItem('visitorName');
    if (!hasVisited) {
      setOpen(true);
    }
  }, []);

  const handleSubmit = async () => {
    if (name.trim() && !isSubmitting) {
      setIsSubmitting(true);
      try {
        // Save to backend
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/visitors`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: name.trim() })
        });

        if (response.ok) {
          // Save to localStorage to prevent showing dialog again
          localStorage.setItem('visitorName', name.trim());
          // Animate out
          setOpen(false);
        }
      } catch (error) {
        console.error('Error saving visitor:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          TransitionComponent={Slide}
          TransitionProps={{
            direction: "up",
            timeout: {
              enter: 500,
              exit: 500
            }
          }}
          PaperProps={{
            sx: {
              background: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              borderRadius: 2,
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)',
            }
          }}
        >
          <Fade in={open} timeout={500}>
            <div>
              <DialogTitle>
                <Typography 
                  variant="h5" 
                  sx={{ 
                    fontFamily: '"Share Tech Mono", monospace',
                    color: theme.palette.primary.main 
                  }}
                >
                  Bro, what's ur Name? 🤝
                </Typography>
              </DialogTitle>
              <DialogContent>
                <Box sx={{ p: 2 }}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Type your name here..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)',
                        },
                      },
                    }}
                  />
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={handleSubmit}
                      disabled={isSubmitting}
                      sx={{
                        fontFamily: '"Share Tech Mono", monospace',
                        textTransform: 'none',
                        fontSize: '1.1rem'
                      }}
                    >
                      {isSubmitting ? 'Saving... 🚀' : 'Let\'s Go! 🚀'}
                    </Button>
                  </motion.div>
                </Box>
              </DialogContent>
            </div>
          </Fade>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default VisitorDialog;
