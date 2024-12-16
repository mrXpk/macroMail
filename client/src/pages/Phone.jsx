import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import PhoneBox from '../components/PhoneBox';
import Security from '@mui/icons-material/Security';
import VpnLockIcon from '@mui/icons-material/VpnLock';
import PhoneIcon from '@mui/icons-material/Phone';
import TimerIcon from '@mui/icons-material/Timer';

const MotionBox = motion(Box);

const Phone = () => {
  const theme = useTheme();

  const features = [
    {
      icon: <PhoneIcon sx={{ fontSize: 40 }} />,
      title: 'Instant Numbers',
      description: 'Get temporary US phone numbers instantly'
    },
    {
      icon: <Security sx={{ fontSize: 40 }} />,
      title: 'Secure & Private',
      description: 'Your privacy is our top priority'
    },
    {
      icon: <VpnLockIcon sx={{ fontSize: 40 }} />,
      title: 'Anonymous',
      description: 'No registration required'
    },
    {
      icon: <TimerIcon sx={{ fontSize: 40 }} />,
      title: 'Auto-Delete',
      description: 'Numbers auto-delete after 24 hours'
    }
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: { xs: 4, md: 8 }, mb: { xs: 6, md: 10 } }}>
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
            Temporary Phone Numbers
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 6,
              textAlign: 'center',
              color: theme.palette.mode === 'dark' ? 'grey.400' : 'grey.700',
            }}
          >
            Get instant disposable phone numbers for your privacy needs
          </Typography>
        </MotionBox>

        {/* Phone Box Component */}
        <PhoneBox />

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mt: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Paper
                  elevation={3}
                  sx={{
                    p: 3,
                    height: '100%',
                    background: theme.palette.mode === 'dark' 
                      ? 'rgba(0, 0, 0, 0.2)' 
                      : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${theme.palette.divider}`,
                    textAlign: 'center',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      transition: 'transform 0.3s ease-in-out',
                    },
                  }}
                >
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontFamily: '"Share Tech Mono", monospace' }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
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

export default Phone;
