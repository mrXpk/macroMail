import { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  useTheme,
  Skeleton
} from '@mui/material';
import { motion } from 'framer-motion';
import { format } from 'date-fns';

const VisitorCard = ({ name, timestamp }) => {
  const theme = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          background: theme.palette.mode === 'dark' ? 'rgba(15, 23, 42, 0.6)' : 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2,
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark' ? 'rgba(99, 102, 241, 0.2)' : 'rgba(79, 70, 229, 0.2)',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-5px)',
          },
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: '"Share Tech Mono", monospace',
            color: theme.palette.primary.main,
            mb: 1
          }}
        >
          {name} 👋
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: theme.palette.text.secondary,
            fontFamily: '"Share Tech Mono", monospace',
          }}
        >
          Visited on {format(new Date(timestamp), 'MMM dd, yyyy')}
        </Typography>
      </Paper>
    </motion.div>
  );
};

const Visitors = () => {
  const [visitors, setVisitors] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();

  useEffect(() => {
    const fetchVisitors = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/visitors`);
        if (response.ok) {
          const data = await response.json();
          setVisitors(data);
        }
      } catch (error) {
        console.error('Error fetching visitors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVisitors();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography
        variant="h3"
        align="center"
        gutterBottom
        sx={{
          fontFamily: '"Share Tech Mono", monospace',
          color: theme.palette.primary.main,
          mb: 6
        }}
      >
        Our Amazing Visitors 🌟
      </Typography>

      <Grid container spacing={3}>
        {loading ? (
          // Loading skeletons
          [...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton 
                variant="rectangular" 
                height={100} 
                sx={{ 
                  borderRadius: 2,
                  bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                }} 
              />
            </Grid>
          ))
        ) : (
          visitors.map((visitor, index) => (
            <Grid item xs={12} sm={6} md={4} key={visitor._id || index}>
              <VisitorCard name={visitor.name} timestamp={visitor.timestamp} />
            </Grid>
          ))
        )}
      </Grid>

      {!loading && visitors.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Share Tech Mono", monospace',
              color: theme.palette.text.secondary
            }}
          >
            No visitors yet. Be the first one! 🎉
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Visitors;
