import { Box, Button, Container, Typography, Grid, Chip, Paper, IconButton, List, ListItem, ListItemText, Alert, CircularProgress } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { useEmail } from '../context/EmailContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EmailBox from '../components/EmailBox';
import PhoneEnabled from '@mui/icons-material/PhoneEnabled';
import Security from '@mui/icons-material/Security';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import HistoryIcon from '@mui/icons-material/History';
import BlockIcon from '@mui/icons-material/Block';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import Visibility from '@mui/icons-material/Visibility';

const MotionBox = motion(Box);

const Home = () => {
  const { currentEmail, emails, loading, error } = useEmail();
  const theme = useTheme();
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  return (
    <Container maxWidth="lg">
      {/* Main Email Generation Section */}
      <Box
        sx={{
          mt: { xs: 4, md: 8 },
          mb: { xs: 6, md: 10 },
          textAlign: 'center',
        }}
      >
        <MotionBox
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontWeight: 700,
              mb: 2,
              fontFamily: '"Share Tech Mono", monospace',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #4F46E5, #06B6D4)'
                : 'linear-gradient(45deg, #3730A3, #0891B2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textAlign: 'center',
            }}
          >
            MacroMail
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: 'text.secondary',
              fontFamily: '"Share Tech Mono", monospace',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Your instant disposable email service
          </Typography>
        </MotionBox>

        {/* Email Box */}
        <MotionBox
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          sx={{
            maxWidth: '800px',
            mx: 'auto',
            transform: 'scale(1.05)',
            mb: 6,
          }}
        >
          <EmailBox />
        </MotionBox>

        {/* Error Message */}
        {error && (
          <Alert 
            severity="error" 
            sx={{ 
              maxWidth: '800px', 
              mx: 'auto', 
              mb: 4,
              background: 'rgba(211, 47, 47, 0.1)',
              border: '1px solid rgba(211, 47, 47, 0.3)',
            }}
          >
            {error}
          </Alert>
        )}

        {/* Inbox Section */}
        {currentEmail && (
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              mb: 6,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                p: 4,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(17, 25, 40, 0.75)'
                  : 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(10px)',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.1)'
                  : 'rgba(0, 0, 0, 0.1)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: '"Share Tech Mono", monospace',
                    color: theme.palette.mode === 'dark' ? '#60A5FA' : '#2563EB',
                  }}
                >
                  Inbox
                </Typography>
                {loading && (
                  <CircularProgress size={20} sx={{ color: theme.palette.mode === 'dark' ? '#60A5FA' : '#2563EB' }} />
                )}
              </Box>
              
              {emails.length > 0 ? (
                <List>
                  {emails.map((email, index) => (
                    <ListItem
                      key={index}
                      sx={{
                        mb: 2,
                        background: theme.palette.mode === 'dark'
                          ? 'rgba(0, 0, 0, 0.3)'
                          : 'rgba(0, 0, 0, 0.05)',
                        borderRadius: 1,
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                          transform: 'translateX(8px)'
                        }
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography
                            sx={{
                              fontFamily: '"Share Tech Mono", monospace',
                              color: theme.palette.mode === 'dark' ? '#60A5FA' : '#2563EB',
                            }}
                          >
                            {email.subject || '(No Subject)'}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            variant="body2"
                            sx={{ color: theme.palette.text.secondary }}
                          >
                            From: {email.from}
                            <br />
                            {new Date(email.date).toLocaleString()}
                          </Typography>
                        }
                      />
                      <IconButton
                        edge="end"
                        onClick={() => navigate(`/email/${email.id}`)}
                        sx={{
                          color: theme.palette.mode === 'dark' ? '#60A5FA' : '#2563EB',
                        }}
                      >
                        <Visibility />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Box
                  sx={{
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                    p: 4,
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(0, 0, 0, 0.2)'
                      : 'rgba(0, 0, 0, 0.05)',
                    borderRadius: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontStyle: 'italic',
                      fontFamily: '"Share Tech Mono", monospace',
                    }}
                  >
                    {loading ? 'Checking for new emails...' : 'No emails yet. They will appear here when received.'}
                  </Typography>
                </Box>
              )}
            </Paper>
          </MotionBox>
        )}

        {/* Features Grid */}
        <Grid
          container
          spacing={3}
          sx={{
            maxWidth: '900px',
            mx: 'auto',
            mt: 8,
            mb: 6,
          }}
        >
          {[
            {
              icon: <VpnLockIcon />,
              title: 'Secure & Private',
              description: 'End-to-end encryption and zero data retention',
            },
            {
              icon: <PhoneEnabled />,
              title: 'Instant Access',
              description: 'No registration or personal information required',
            },
            {
              icon: <Security />,
              title: 'Advanced Protection',
              description: 'Built-in spam filtering and threat detection',
            },
          ].map((feature, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    p: 3,
                    height: '100%',
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(17, 25, 40, 0.75)'
                      : 'rgba(255, 255, 255, 0.75)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid',
                    borderColor: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.1)'
                      : 'rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2,
                      color: theme.palette.mode === 'dark' ? '#60A5FA' : '#2563EB',
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      textAlign: 'center',
                      fontFamily: '"Share Tech Mono", monospace',
                      color: theme.palette.mode === 'dark' ? '#60A5FA' : '#2563EB',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      textAlign: 'center',
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </Paper>
              </MotionBox>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default Home;
