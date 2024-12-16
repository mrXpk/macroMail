import { Box, Button, Card, CardActions, CardContent, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@mui/material/styles';
import { Check, Star, PhoneEnabled } from '@mui/icons-material';

const MotionCard = motion(Card);

const tiers = [
  {
    title: 'Free',
    price: '0',
    description: 'Basic features with ads',
    features: [
      'Unlimited Email Generation',
      'Basic Email Storage',
      'Standard Support',
      'Basic QR Code Generation',
      'Ad-Supported Experience',
    ],
    buttonText: 'Current Plan',
    buttonVariant: 'outlined',
  },
  {
    title: 'Pro',
    price: '5',
    description: 'Advanced features with temp phone numbers',
    features: [
      'Everything in Free',
      'No Advertisements',
      'Custom Domain Names',
      'Priority Support',
      'Advanced Analytics',
      '1 Temporary Phone Number',
      'SMS Receiving Capability',
    ],
    buttonText: 'Get Pro',
    buttonVariant: 'contained',
    highlighted: true,
  },
  {
    title: 'Enterprise',
    price: '20',
    description: 'Maximum features for business needs',
    features: [
      'Everything in Pro',
      'Multiple Custom Domains',
      '24/7 Premium Support',
      'Team Management',
      'API Access',
      'Advanced Security',
      '5 Temporary Phone Numbers',
      'SMS & Voice Call Support',
      'Number Country Selection',
    ],
    buttonText: 'Get Enterprise',
    buttonVariant: 'contained',
  },
];

export default function Premium() {
  const theme = useTheme();

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          py: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 6,
        }}
      >
        {/* Header Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
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
                background: theme.palette.mode === 'dark'
                  ? 'linear-gradient(45deg, #4F46E5, #06B6D4)'
                  : 'linear-gradient(45deg, #3730A3, #0891B2)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 2,
              }}
            >
              Upgrade Your Privacy
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                maxWidth: 600,
                mx: 'auto',
              }}
            >
              Get temporary email & phone numbers for maximum privacy
            </Typography>
          </motion.div>
        </Box>

        {/* Feature Highlight */}
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            justifyContent: 'center',
            mb: 4,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
                px: 3,
                py: 1.5,
                borderRadius: 2,
              }}
            >
              <PhoneEnabled />
              <Typography
                sx={{
                  fontFamily: '"Share Tech Mono", monospace',
                }}
              >
                Now with Temp Phone Numbers!
              </Typography>
            </Box>
          </motion.div>
        </Box>

        {/* Pricing Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 4,
            width: '100%',
          }}
        >
          {tiers.map((tier, index) => (
            <MotionCard
              key={tier.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                background: theme.palette.mode === 'dark'
                  ? 'rgba(17, 25, 40, 0.75)'
                  : 'rgba(255, 255, 255, 0.75)',
                backdropFilter: 'blur(16px)',
                border: '1px solid',
                borderColor: tier.highlighted
                  ? theme.palette.primary.main
                  : theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                boxShadow: tier.highlighted
                  ? `0 0 20px ${theme.palette.primary.main}40`
                  : 'none',
                transform: tier.highlighted ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              {tier.highlighted && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 12,
                    right: 12,
                    color: theme.palette.primary.main,
                  }}
                >
                  <Star />
                </Box>
              )}
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    fontFamily: '"Share Tech Mono", monospace',
                    fontSize: '2rem',
                    mb: 2,
                    color: tier.highlighted
                      ? theme.palette.primary.main
                      : 'inherit',
                  }}
                >
                  {tier.title}
                </Typography>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    component="span"
                    variant="h4"
                    sx={{
                      fontFamily: '"Share Tech Mono", monospace',
                      verticalAlign: 'baseline',
                    }}
                  >
                    ${tier.price}
                  </Typography>
                  <Typography
                    component="span"
                    variant="h6"
                    sx={{ color: 'text.secondary' }}
                  >
                    /month
                  </Typography>
                </Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    mb: 3,
                    color: 'text.secondary',
                    minHeight: '4rem',
                  }}
                >
                  {tier.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {tier.features.map((feature) => (
                    <Box
                      key={feature}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Check
                        sx={{
                          color: theme.palette.primary.main,
                          fontSize: '1.2rem',
                        }}
                      />
                      <Typography>{feature}</Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
              <CardActions sx={{ p: 4, pt: 0 }}>
                <Button
                  fullWidth
                  variant={tier.buttonVariant}
                  sx={{
                    py: 1.5,
                    fontFamily: '"Share Tech Mono", monospace',
                    background: tier.buttonVariant === 'contained'
                      ? 'linear-gradient(45deg, #4F46E5, #06B6D4)'
                      : 'transparent',
                    '&:hover': {
                      background: tier.buttonVariant === 'contained'
                        ? 'linear-gradient(45deg, #4338CA, #0891B2)'
                        : 'rgba(79, 70, 229, 0.1)',
                    },
                  }}
                >
                  {tier.buttonText}
                </Button>
              </CardActions>
            </MotionCard>
          ))}
        </Box>
      </Box>
    </Container>
  );
}
