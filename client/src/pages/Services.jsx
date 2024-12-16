import { Box, Container, Typography, Grid, Card, CardContent, IconButton, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import {
  Email,
  PhoneEnabled,
  Security,
  Speed,
  Code,
  CloudQueue,
  Timer,
  Block,
  VpnLock,
} from '@mui/icons-material';

const MotionCard = motion(Card);

const services = [
  {
    title: 'Disposable Email',
    description: 'Generate unlimited temporary email addresses instantly',
    icon: Email,
    gradient: 'linear-gradient(135deg, #FF6B6B, #FFE66D)',
    features: [
      'Instant email generation',
      'No registration required',
      'Auto-delete after 24 hours',
    ],
  },
  {
    title: 'Temp Phone Numbers',
    description: 'Virtual phone numbers for SMS verification',
    icon: PhoneEnabled,
    gradient: 'linear-gradient(135deg, #4834D4, #686DE0)',
    features: [
      'Multiple countries available',
      'Receive SMS instantly',
      'Secure verification',
    ],
    comingSoon: true,
  },
  {
    title: 'Enhanced Security',
    description: 'Advanced encryption and privacy protection',
    icon: Security,
    gradient: 'linear-gradient(135deg, #6AB04C, #BADC58)',
    features: [
      'End-to-end encryption',
      'No data logging',
      'Privacy guaranteed',
    ],
    comingSoon: true,
  },
  {
    title: 'Secure VPN',
    description: 'Browse securely and privately with our VPN service',
    icon: VpnLock,
    gradient: 'linear-gradient(135deg, #6C63FF, #4834D4)',
    features: [
      'Global server network',
      'No bandwidth limits',
      'Military-grade encryption',
    ],
    comingSoon: true,
  },
  {
    title: 'API Access',
    description: 'Integrate our services into your applications',
    icon: Code,
    gradient: 'linear-gradient(135deg, #30336B, #130F40)',
    features: [
      'RESTful API',
      'Comprehensive documentation',
      'High rate limits',
    ],
    comingSoon: true,
  },
  {
    title: 'Cloud Storage',
    description: 'Secure temporary file storage and sharing',
    icon: CloudQueue,
    gradient: 'linear-gradient(135deg, #C4E538, #009432)',
    features: [
      'End-to-end encryption',
      'Automatic deletion',
      'Secure sharing',
    ],
    comingSoon: true,
  },
  {
    title: 'Auto Cleanup',
    description: 'Automatic data purging for enhanced privacy',
    icon: Timer,
    gradient: 'linear-gradient(135deg, #FD7272, #B33771)',
    features: [
      'Customizable timers',
      'Secure deletion',
      'Data privacy',
    ],
    comingSoon: true,
  },
  {
    title: 'Spam Protection',
    description: 'Advanced filters to block unwanted content',
    icon: Block,
    gradient: 'linear-gradient(135deg, #F97F51, #EE5A24)',
    features: [
      'AI-powered filtering',
      'Custom rules',
      'Real-time protection',
    ],
    comingSoon: true,
  },
];

export default function Services() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: { xs: 4, md: 8 } }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              fontFamily: '"Share Tech Mono", monospace',
              fontWeight: 700,
              textAlign: 'center',
              mb: 2,
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #4F46E5, #06B6D4)'
                : 'linear-gradient(45deg, #3730A3, #0891B2)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            sx={{
              textAlign: 'center',
              mb: 6,
              color: 'text.secondary',
              maxWidth: '800px',
              mx: 'auto',
              px: 2,
              fontFamily: '"Share Tech Mono", monospace',
            }}
          >
            Cutting-edge privacy solutions for your digital communications
          </Typography>
        </motion.div>

        {/* Services Grid */}
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={service.title}>
              <MotionCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                sx={{
                  height: '100%',
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(17, 25, 40, 0.75)'
                    : 'rgba(255, 255, 255, 0.75)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                }}
              >
                {service.comingSoon && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 20,
                      right: -30,
                      transform: 'rotate(45deg)',
                      width: 150,
                      textAlign: 'center',
                      background: 'linear-gradient(45deg, #FF4B2B, #FF416C)',
                      padding: '8px',
                      color: '#fff',
                      fontFamily: '"Share Tech Mono", monospace',
                      fontSize: '0.85rem',
                      fontWeight: 'bold',
                      textShadow: '0 0 10px rgba(255, 75, 43, 0.5)',
                      boxShadow: '0 3px 10px rgba(0, 0, 0, 0.2)',
                      zIndex: 1,
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)',
                        zIndex: -1,
                      }
                    }}
                  >
                    COMING SOON
                  </Box>
                )}
                <CardContent
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3,
                  }}
                >
                  <Box
                    sx={{
                      mb: 2,
                      p: 1.5,
                      borderRadius: '12px',
                      background: service.gradient,
                    }}
                  >
                    <IconButton
                      sx={{
                        color: '#fff',
                        '&:hover': { backgroundColor: 'transparent' },
                        cursor: 'default',
                      }}
                      disableRipple
                    >
                      <service.icon sx={{ fontSize: '2rem' }} />
                    </IconButton>
                  </Box>
                  <Typography
                    variant="h6"
                    component="h3"
                    sx={{
                      mb: 1,
                      fontWeight: 600,
                      fontFamily: '"Share Tech Mono", monospace',
                    }}
                  >
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {service.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    {service.features.map((feature, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6,
                          display: 'flex',
                          alignItems: 'center',
                          '&::before': {
                            content: '"•"',
                            mr: 1,
                          },
                        }}
                      >
                        {feature}
                      </Typography>
                    ))}
                  </Box>
                </CardContent>
              </MotionCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
