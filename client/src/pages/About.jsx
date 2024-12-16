import { Box, Container, Grid, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { Security, Speed, Code, Rocket } from '@mui/icons-material';

const teamMembers = [
  {
    name: 'Pratap Mukhiya',
    role: 'Full Stack Developer',
    description: 'Sole developer of macroMail. Passionate about creating efficient and secure web applications.',
    icon: Code,
    link: 'https://github.com/mrXpk'
  }
];

const AboutCard = ({ name, role, description, icon: Icon, index, link }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={() => link && window.open(link, '_blank')}
      style={{ cursor: link ? 'pointer' : 'default' }}
    >
      <Box
        sx={{
          p: 3,
          height: '100%',
          background: theme.palette.mode === 'dark'
            ? 'rgba(15, 23, 42, 0.6)'
            : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark'
            ? 'rgba(99, 102, 241, 0.2)'
            : 'rgba(79, 70, 229, 0.2)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              mr: 2,
              background: theme.palette.mode === 'dark'
                ? 'rgba(99, 102, 241, 0.2)'
                : 'rgba(79, 70, 229, 0.1)',
            }}
          >
            <Icon sx={{ color: theme.palette.primary.main }} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontFamily: '"Share Tech Mono", monospace',
                color: theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              }}
            >
              {name}
            </Typography>
            <Typography
              variant="subtitle2"
              sx={{
                color: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.7)'
                  : 'rgba(0, 0, 0, 0.6)',
              }}
            >
              {role}
            </Typography>
          </Box>
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.mode === 'dark'
              ? 'rgba(255, 255, 255, 0.7)'
              : 'rgba(0, 0, 0, 0.6)',
          }}
        >
          {description}
        </Typography>
      </Box>
    </motion.div>
  );
};

export default function About() {
  const theme = useTheme();

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
            About MacroMail
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
            Revolutionizing Email Privacy in the Digital Age
          </Typography>
        </motion.div>
      </Box>

      {/* Mission Section */}
      <Box sx={{ mb: 8 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontFamily: '"Share Tech Mono", monospace',
              color: theme.palette.primary.main,
            }}
          >
            Our Mission
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: theme.palette.mode === 'dark'
                ? 'rgba(255, 255, 255, 0.7)'
                : 'rgba(0, 0, 0, 0.6)',
              fontSize: '1.1rem',
              lineHeight: 1.8,
            }}
          >
            At MacroMail, we're committed to protecting your digital privacy through innovative email solutions. 
            Our mission is to provide secure, temporary email addresses that shield your personal information 
            from spam, data breaches, and unwanted surveillance. We believe in a future where digital 
            communication is both convenient and secure.
          </Typography>
        </motion.div>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography
          variant="h4"
          sx={{
            mb: 4,
            fontFamily: '"Share Tech Mono", monospace',
            color: theme.palette.primary.main,
          }}
        >
          Meet Our Team
        </Typography>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={3} key={member.name}>
              <AboutCard {...member} index={index} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Values Section */}
      <Box>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              fontFamily: '"Share Tech Mono", monospace',
              color: theme.palette.primary.main,
            }}
          >
            Our Values
          </Typography>
          <Grid container spacing={3}>
            {[
              {
                title: 'Privacy First',
                description: 'We prioritize user privacy in every decision we make.',
              },
              {
                title: 'Innovation',
                description: 'Constantly evolving our technology to stay ahead of threats.',
              },
              {
                title: 'Transparency',
                description: 'Clear communication about how we handle your data.',
              },
              {
                title: 'User Experience',
                description: 'Making privacy protection simple and accessible.',
              },
            ].map((value, index) => (
              <Grid item xs={12} sm={6} key={value.title}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 1,
                      color: theme.palette.mode === 'dark'
                        ? theme.palette.primary.light
                        : theme.palette.primary.main,
                    }}
                  >
                    {value.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: theme.palette.mode === 'dark'
                        ? 'rgba(255, 255, 255, 0.7)'
                        : 'rgba(0, 0, 0, 0.6)',
                    }}
                  >
                    {value.description}
                  </Typography>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Box>
    </Container>
  );
}
