import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import { motion } from 'framer-motion';
import { ExpandMore } from '@mui/icons-material';

const faqs = [
  {
    question: 'What is MacroMail?',
    answer: 'MacroMail is a disposable email service that provides temporary email addresses for users who want to protect their privacy online. Our service allows you to receive emails without revealing your personal email address.',
  },
  {
    question: 'How long do temporary email addresses last?',
    answer: 'By default, temporary email addresses are active for 10 minutes. Premium users can extend this duration up to 30 days. After the specified time, the email address and all associated messages are permanently deleted.',
  },
  {
    question: 'Is MacroMail free to use?',
    answer: 'Yes! MacroMail offers a free tier with basic features including temporary email generation and real-time email reception. We also offer premium plans with advanced features like extended retention periods and custom domains.',
  },
  {
    question: 'How secure is MacroMail?',
    answer: 'MacroMail employs industry-standard encryption and security measures to protect your data. We never store permanent copies of your emails, and all data is automatically deleted after the specified retention period.',
  },
  {
    question: 'Can I send emails using MacroMail?',
    answer: 'Currently, MacroMail is designed for receiving emails only. This helps maintain security and prevent abuse of our service. Sending capabilities may be added in future premium tiers.',
  },
  {
    question: 'What happens to my emails after they expire?',
    answer: 'Once your temporary email address expires, all associated emails and data are permanently deleted from our servers. This ensures your privacy and helps maintain our service\'s security.',
  },
  {
    question: 'Can I access MacroMail on mobile devices?',
    answer: 'Yes! MacroMail is fully responsive and works on all modern devices including smartphones and tablets. We\'re also working on dedicated mobile apps for iOS and Android.',
  },
  {
    question: 'Do you offer API access?',
    answer: 'API access is currently in development and will be available soon for premium users. This will allow developers to integrate MacroMail\'s services into their own applications.',
  },
  {
    question: 'How do I report abuse or spam?',
    answer: 'You can report abuse or spam by clicking the "Report" button next to any email you receive. Our team reviews all reports and takes appropriate action to maintain service quality.',
  },
  {
    question: 'What are the limitations of the free tier?',
    answer: 'Free tier users can generate unlimited temporary email addresses with a 10-minute retention period. Some features like extended retention, custom domains, and priority support are reserved for premium users.',
  },
];

export default function FAQ() {
  const theme = useTheme();
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Hero Section */}
      <Box sx={{ mb: 8, textAlign: 'center' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 2,
              fontFamily: '"Share Tech Mono", monospace',
              background: theme.palette.mode === 'dark'
                ? 'linear-gradient(45deg, #6366F1 30%, #EC4899 90%)'
                : 'linear-gradient(45deg, #4F46E5 30%, #DB2777 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(0, 0, 0, 0.6)',
            }}
          >
            Everything you need to know about MacroMail
          </Typography>
        </motion.div>
      </Box>

      {/* FAQ Accordions */}
      <Box sx={{ maxWidth: 800, mx: 'auto' }}>
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Accordion
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
              sx={{
                mb: 2,
                background: theme.palette.mode === 'dark'
                  ? 'rgba(15, 23, 42, 0.6)'
                  : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                borderRadius: '8px !important',
                border: '1px solid',
                borderColor: theme.palette.mode === 'dark'
                  ? 'rgba(99, 102, 241, 0.2)'
                  : 'rgba(79, 70, 229, 0.2)',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '0 0 16px 0',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMore />}
                sx={{
                  '& .MuiAccordionSummary-expandIconWrapper': {
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: '"Share Tech Mono", monospace',
                    color: theme.palette.mode === 'dark'
                      ? theme.palette.primary.light
                      : theme.palette.primary.main,
                  }}
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography
                  sx={{
                    color: theme.palette.mode === 'dark'
                      ? 'rgba(255, 255, 255, 0.7)'
                      : 'rgba(0, 0, 0, 0.6)',
                  }}
                >
                  {faq.answer}
                </Typography>
              </AccordionDetails>
            </Accordion>
          </motion.div>
        ))}
      </Box>

      {/* Contact Support Section */}
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            fontFamily: '"Share Tech Mono", monospace',
            color: theme.palette.primary.main,
          }}
        >
          Still have questions?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(0, 0, 0, 0.6)',
          }}
        >
          Contact our support team for more detailed information about our services.
        </Typography>
      </Box>
    </Container>
  );
}
