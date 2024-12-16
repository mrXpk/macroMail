import { useState } from 'react';
import { useEmail } from '../context/EmailContext';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  CircularProgress,
  Divider,
} from '@mui/material';
import {
  Refresh,
  Delete,
  Mail,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';

// Simple email card component
const EmailCard = ({ message, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <Paper
      sx={{
        p: 2,
        mb: 2,
        background: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(17, 25, 40, 0.75)'
          : 'rgba(255, 255, 255, 0.75)',
        backdropFilter: 'blur(16px)',
        border: '1px solid',
        borderColor: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(255, 255, 255, 0.1)'
          : 'rgba(0, 0, 0, 0.1)',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-2px)',
          transition: 'transform 0.2s',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
          {message.subject || '(No Subject)'}
        </Typography>
        <IconButton
          size="small"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(message.id);
          }}
        >
          <Delete />
        </IconButton>
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        From: {message.from}
      </Typography>
      <Typography variant="body2" noWrap>
        {message.preview}
      </Typography>
    </Paper>
  </motion.div>
);

export default function Inbox() {
  const theme = useTheme();
  const { currentEmail } = useEmail();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleRefresh = () => {
    setLoading(true);
    // Simulate loading
    setTimeout(() => {
      // Mock data for demonstration
      setMessages([
        {
          id: 1,
          subject: 'Welcome to MacroMail',
          from: 'support@macromail.dev',
          preview: 'Thank you for using MacroMail. Your temporary email is ready to use.',
          timestamp: new Date(),
        },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleDelete = (id) => {
    setMessages(messages.filter(m => m.id !== id));
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Share Tech Mono", monospace',
              color: theme.palette.primary.main,
            }}
          >
            Inbox
          </Typography>
          <IconButton onClick={handleRefresh} disabled={loading}>
            <Refresh />
          </IconButton>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 3,
            background: theme.palette.mode === 'dark'
              ? 'rgba(17, 25, 40, 0.75)'
              : 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(16px)',
            border: '1px solid',
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.1)'
              : 'rgba(0, 0, 0, 0.1)',
          }}
        >
          <Box sx={{ mb: 3 }}>
            <Typography
              variant="subtitle1"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: 'text.secondary',
              }}
            >
              Active Email:
            </Typography>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                wordBreak: 'break-all',
              }}
            >
              {currentEmail || 'No active email'}
            </Typography>
          </Box>

          <Divider sx={{ my: 3 }} />

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
              <CircularProgress />
            </Box>
          ) : messages.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Mail sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
              <Typography color="text.secondary">
                No messages yet
              </Typography>
            </Box>
          ) : (
            <AnimatePresence>
              {messages.map((message) => (
                <EmailCard
                  key={message.id}
                  message={message}
                  onDelete={handleDelete}
                />
              ))}
            </AnimatePresence>
          )}
        </Paper>
      </Box>
    </Container>
  );
}
