import { Box, Container, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, LinkedIn, Email, Phone, GitHub } from '@mui/icons-material';
import XIcon from './icons/XIcon';
import VisitorForm from './VisitorForm';

const MotionIconButton = motion(IconButton);

export default function Footer() {
  const theme = useTheme();
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Facebook, href: 'https://www.facebook.com/profile.php?id=100090131172400', label: 'Facebook' },
    { icon: XIcon, href: 'https://x.com/PratapMukhiya5', label: 'X (formerly Twitter)' },
    { icon: LinkedIn, href: 'https://www.linkedin.com/in/pratap-mukhiya-655a7325a/', label: 'LinkedIn' },
    { icon: GitHub, href: 'https://github.com/mrXpk', label: 'GitHub' }
  ];

  const handleNavigation = (href) => {
    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      navigate(href);
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        position: 'relative',
        zIndex: 10,
        mt: 8,
        pb: 3,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                mb: 2,
              }}
            >
              Quick Links
            </Typography>
            <Grid container spacing={2}>
              {quickLinks.map((link) => (
                <Grid item xs={6} key={link.name}>
                  <Typography
                    onClick={() => handleNavigation(link.href)}
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    {link.name}
                  </Typography>
                </Grid>
              ))}
            </Grid>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                mb: 2,
              }}
            >
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => (
                <MotionIconButton
                  key={social.label}
                  onClick={() => handleNavigation(social.href)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  sx={{
                    color: theme.palette.mode === 'dark' ? theme.palette.primary.light : theme.palette.primary.main,
                  }}
                >
                  <social.icon />
                </MotionIconButton>
              ))}
            </Box>
          </Grid>

          <Grid item xs={12} md={4}>
            <VisitorForm />
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 4,
            opacity: 0.7,
          }}
        >
          {new Date().getFullYear()} MacroMail. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
