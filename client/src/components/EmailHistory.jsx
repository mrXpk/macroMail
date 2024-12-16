import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  useTheme,
  Divider,
} from '@mui/material';
import {
  Delete,
  ExpandMore,
  ExpandLess,
  Email,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { useEmail } from '../context/EmailContext';
import { formatDistanceToNow } from 'date-fns';

export default function EmailHistory() {
  const theme = useTheme();
  const { emailHistory, deleteEmail } = useEmail();
  const [expandedEmail, setExpandedEmail] = React.useState(null);

  const handleExpandClick = (email) => {
    setExpandedEmail(expandedEmail === email ? null : email);
  };

  if (emailHistory.length === 0) {
    return (
      <Box
        sx={{
          p: 3,
          textAlign: 'center',
          color: 'text.secondary',
        }}
      >
        <Email sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
        <Typography variant="body1">
          No email history yet.
        </Typography>
      </Box>
    );
  }

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      {emailHistory.map((item) => (
        <React.Fragment key={item.email}>
          <ListItem
            component={motion.div}
            whileHover={{ backgroundColor: theme.palette.action.hover }}
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteEmail(item.email)}
                sx={{ color: 'error.main' }}
              >
                <Delete />
              </IconButton>
            }
            sx={{
              cursor: 'pointer',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton
                    size="small"
                    onClick={() => handleExpandClick(item.email)}
                  >
                    {expandedEmail === item.email ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                  <Typography variant="body1" sx={{ fontFamily: 'monospace' }}>
                    {item.email}
                  </Typography>
                </Box>
              }
              secondary={
                <Typography variant="caption" color="text.secondary">
                  Created {formatDistanceToNow(new Date(item.createdAt))} ago
                </Typography>
              }
            />
          </ListItem>
          <Collapse in={expandedEmail === item.email} timeout="auto" unmountOnExit>
            <Box sx={{ pl: 4, pr: 2, pb: 2 }}>
              {item.messages.length === 0 ? (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  No messages received yet
                </Typography>
              ) : (
                item.messages.map((message) => (
                  <Box
                    key={message.id}
                    sx={{
                      mb: 2,
                      p: 2,
                      borderRadius: 1,
                      bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    }}
                  >
                    <Typography variant="subtitle2" gutterBottom>
                      From: {message.from}
                    </Typography>
                    <Typography variant="subtitle2" gutterBottom>
                      Subject: {message.subject}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {message.preview}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                      Received {formatDistanceToNow(new Date(message.receivedAt))} ago
                    </Typography>
                  </Box>
                ))
              )}
            </Box>
          </Collapse>
          <Divider />
        </React.Fragment>
      ))}
    </List>
  );
}
