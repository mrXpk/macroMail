import { Box, Container, Grid, IconButton, Typography, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, LinkedIn, Email, Phone, GitHub } from '@mui/icons-material';
import XIcon from './icons/XIcon';

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
        backgroundColor: theme.palette.mode === 'dark' 
          ? 'rgba(15, 23, 42, 0.9)'
          : 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderTop: '1px solid',
        borderColor: theme.palette.mode === 'dark'
          ? 'rgba(99, 102, 241, 0.2)'
          : 'rgba(79, 70, 229, 0.2)',
        pt: 6,
        pb: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontFamily: '"Share Tech Mono", monospace',
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              }}
            >
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              {quickLinks.map((link) => (
                <Box
                  key={link.name}
                  component={motion.div}
                  whileHover={{ x: 5 }}
                  onClick={() => handleNavigation(link.href)}
                  sx={{
                    cursor: 'pointer',
                    color: theme.palette.mode === 'dark' ? '#94a3b8' : '#475569',
                    '&:hover': {
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  {link.name}
                </Box>
              ))}
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontFamily: '"Share Tech Mono", monospace',
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              }}
            >
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box
                component={motion.div}
                whileHover={{ x: 5 }}
                onClick={() => handleNavigation('/contact')}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  cursor: 'pointer',
                  color: theme.palette.mode === 'dark' ? '#94a3b8' : '#475569',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Email fontSize="small" color="primary" />
                <span>support@macromail.com</span>
              </Box>
              <Box
                component={motion.div}
                whileHover={{ x: 5 }}
                onClick={() => handleNavigation('/contact')}
                sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  cursor: 'pointer',
                  color: theme.palette.mode === 'dark' ? '#94a3b8' : '#475569',
                  '&:hover': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Phone fontSize="small" color="primary" />
                <span>+977 9826762023</span>
              </Box>
            </Box>
          </Grid>

          {/* Social Links */}
          <Grid item xs={12} md={4}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontFamily: '"Share Tech Mono", monospace',
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              }}
            >
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {socialLinks.map((social) => (
                <MotionIconButton
                  key={social.label}
                  onClick={() => handleNavigation(social.href)}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  sx={{
                    color: theme.palette.primary.main,
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(79, 70, 229, 0.1)',
                    '&:hover': {
                      background: theme.palette.mode === 'dark'
                        ? 'rgba(99, 102, 241, 0.2)'
                        : 'rgba(79, 70, 229, 0.2)',
                    },
                  }}
                >
                  <social.icon />
                </MotionIconButton>
              ))}
            </Box>
          </Grid>
        </Grid>

        {/* Copyright */}
        <Box
          sx={{
            mt: 6,
            pt: 3,
            borderTop: '1px solid',
            borderColor: theme.palette.mode === 'dark'
              ? 'rgba(99, 102, 241, 0.2)'
              : 'rgba(79, 70, 229, 0.2)',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: 'text.secondary',
              '& span': {
                color: theme.palette.error.main,
              },
            }}
          >
            Made with <span>❤️</span> by MacroMail &copy; {new Date().getFullYear()}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
