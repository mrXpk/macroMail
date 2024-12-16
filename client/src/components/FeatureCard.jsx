import { Paper, Typography, Box } from '@mui/material';
import { motion } from 'framer-motion';

const MotionPaper = motion(Paper);

export default function FeatureCard({ title, description, icon: Icon }) {
  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
      }}
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        background: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(15, 23, 42, 0.6)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderRadius: 2,
        border: '1px solid',
        borderColor: (theme) => theme.palette.mode === 'dark'
          ? 'rgba(99, 102, 241, 0.2)'
          : 'rgba(79, 70, 229, 0.2)',
        transition: 'all 0.3s ease-in-out',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {Icon && (
          <Box
            component={motion.div}
            whileHover={{ rotate: 5 }}
            sx={{
              p: 1.5,
              borderRadius: 1.5,
              background: (theme) => theme.palette.mode === 'dark'
                ? 'rgba(99, 102, 241, 0.1)'
                : 'rgba(79, 70, 229, 0.1)',
              mr: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Icon
              sx={{
                fontSize: 24,
                color: (theme) => theme.palette.mode === 'dark'
                  ? theme.palette.primary.light
                  : theme.palette.primary.main,
              }}
            />
          </Box>
        )}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            fontSize: '1.1rem',
            color: (theme) => theme.palette.mode === 'dark'
              ? theme.palette.primary.light
              : theme.palette.primary.main,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: 'text.secondary',
          lineHeight: 1.6,
          flex: 1,
        }}
      >
        {description}
      </Typography>
    </MotionPaper>
  );
}
