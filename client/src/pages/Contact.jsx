import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { Email, Phone, LocationOn, Send } from '@mui/icons-material';
import toast from 'react-hot-toast';

const MotionPaper = motion(Paper);
const MotionButton = motion(Button);

export default function Contact() {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: Email,
      title: 'Email Us',
      content: 'support@macromail.com',
      link: 'mailto:support@macromail.com',
    },
    {
      icon: Phone,
      title: 'Call Us',
      content: '+977 9826762023',
      link: 'tel:+9779826762023',
    },
    {
      icon: LocationOn,
      title: 'Location',
      content: 'Silicon Valley, CA',
      link: 'https://maps.google.com/?q=Silicon+Valley',
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Page Title */}
      <Typography
        variant="h2"
        component="h1"
        sx={{
          mb: 6,
          textAlign: 'center',
          fontFamily: '"Share Tech Mono", monospace',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #6366F1 30%, #EC4899 90%)'
            : 'linear-gradient(45deg, #4F46E5 30%, #DB2777 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: theme.palette.mode === 'dark'
            ? '0 0 20px rgba(99, 102, 241, 0.3)'
            : '0 0 20px rgba(79, 70, 229, 0.3)',
        }}
      >
        Get in Touch
      </Typography>

      <Grid container spacing={4}>
        {/* Contact Information Cards */}
        <Grid item xs={12} md={4}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {contactInfo.map((info, index) => (
              <MotionPaper
                key={info.title}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                component="a"
                href={info.link}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  p: 3,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(15, 23, 42, 0.6)'
                    : 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid',
                  borderColor: theme.palette.mode === 'dark'
                    ? 'rgba(99, 102, 241, 0.2)'
                    : 'rgba(79, 70, 229, 0.2)',
                  borderRadius: 2,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: theme.palette.mode === 'dark'
                      ? '0 10px 20px rgba(99, 102, 241, 0.1)'
                      : '0 10px 20px rgba(79, 70, 229, 0.1)',
                  },
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 1.5,
                    background: theme.palette.mode === 'dark'
                      ? 'rgba(99, 102, 241, 0.1)'
                      : 'rgba(79, 70, 229, 0.1)',
                  }}
                >
                  <info.icon
                    sx={{
                      fontSize: 24,
                      color: theme.palette.primary.main,
                    }}
                  />
                </Box>
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '1.1rem',
                      color: theme.palette.mode === 'dark'
                        ? theme.palette.primary.light
                        : theme.palette.primary.main,
                    }}
                  >
                    {info.title}
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                    <info.icon sx={{ color: 'primary.main' }} />
                    {info.content}
                  </Typography>
                </Box>
              </MotionPaper>
            ))}
          </Box>
        </Grid>

        {/* Contact Form */}
        <Grid item xs={12} md={8}>
          <MotionPaper
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            sx={{
              p: 4,
              background: theme.palette.mode === 'dark'
                ? 'rgba(15, 23, 42, 0.6)'
                : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              border: '1px solid',
              borderColor: theme.palette.mode === 'dark'
                ? 'rgba(99, 102, 241, 0.2)'
                : 'rgba(79, 70, 229, 0.2)',
              borderRadius: 2,
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(99, 102, 241, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(99, 102, 241, 0.3)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Your Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(99, 102, 241, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(99, 102, 241, 0.3)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(99, 102, 241, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(99, 102, 241, 0.3)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgba(99, 102, 241, 0.2)',
                        },
                        '&:hover fieldset': {
                          borderColor: 'rgba(99, 102, 241, 0.3)',
                        },
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <MotionButton
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    sx={{
                      mt: 2,
                      py: 1.5,
                      background: 'linear-gradient(45deg, #6366F1 30%, #EC4899 90%)',
                      boxShadow: '0 3px 5px 2px rgba(99, 102, 241, .3)',
                      color: 'white',
                      '&:hover': {
                        background: 'linear-gradient(45deg, #4F46E5 30%, #DB2777 90%)',
                      },
                    }}
                    endIcon={<Send />}
                  >
                    Send Message
                  </MotionButton>
                </Grid>
              </Grid>
            </form>
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
}
