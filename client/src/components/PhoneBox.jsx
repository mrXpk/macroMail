import React from 'react';
import {
  Box,
  Button,
  Typography,
  Paper,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import PhoneIcon from '@mui/icons-material/Phone';
import { motion } from 'framer-motion';
import { usePhone } from '../context/PhoneContext';
import { toast } from 'react-hot-toast';

const MotionPaper = motion(Paper);

const PhoneBox = () => {
  const theme = useTheme();
  const { currentPhone, messages, loading, error, generatePhone, deletePhone } = usePhone();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentPhone);
      toast.success('Phone number copied to clipboard!');
    } catch (error) {
      console.error('Failed to copy:', error);
      toast.error('Failed to copy phone number');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      elevation={3}
      sx={{
        p: 3,
        mt: 3,
        background: theme.palette.mode === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        border: `1px solid ${theme.palette.divider}`,
      }}
    >
      {!currentPhone ? (
        <Box textAlign="center">
          <Button
            variant="contained"
            onClick={generatePhone}
            startIcon={<PhoneIcon />}
            sx={{
              background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
              '&:hover': {
                background: 'linear-gradient(45deg, #4338CA, #0891B2)',
              },
            }}
          >
            Generate Phone Number
          </Button>
        </Box>
      ) : (
        <>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
            <Typography variant="h6" component="div" fontFamily="'Share Tech Mono', monospace">
              Your Temporary Phone:
            </Typography>
            <Box>
              <IconButton onClick={copyToClipboard} size="small" color="primary">
                <ContentCopyIcon />
              </IconButton>
              <IconButton onClick={deletePhone} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
          
          <Typography
            variant="h5"
            gutterBottom
            fontFamily="'Share Tech Mono', monospace"
            sx={{
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #4F46E5, #06B6D4)'
                : 'linear-gradient(45deg, #3730A3, #0891B2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {currentPhone}
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            Messages:
          </Typography>

          {messages.length === 0 ? (
            <Typography color="text.secondary" textAlign="center" py={2}>
              No messages yet. They will appear here when received.
            </Typography>
          ) : (
            <List>
              {messages.map((message, index) => (
                <ListItem key={message.id || index} divider={index !== messages.length - 1}>
                  <ListItemText
                    primary={message.from}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {new Date(message.date).toLocaleString()}
                        </Typography>
                        <br />
                        {message.text}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          )}
        </>
      )}
    </MotionPaper>
  );
};

export default PhoneBox;
