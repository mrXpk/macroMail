import { Box, IconButton, Typography, Paper, Dialog, CircularProgress } from '@mui/material';
import { ContentCopy, Mail, QrCode, Refresh } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { TextField, Button } from '@mui/material';
import { useEmail } from '../context/EmailContext';

const MotionPaper = motion(Paper);

export default function EmailBox() {
  const navigate = useNavigate();
  const theme = useTheme();
  const [qrOpen, setQrOpen] = useState(false);
  const { currentEmail, loading, generateEmail } = useEmail();

  const handleCopy = () => {
    navigator.clipboard.writeText(currentEmail);
    toast.success('Email copied!', {
      style: {
        background: theme.palette.mode === 'dark' ? '#1E293B' : '#F8FAFC',
        color: theme.palette.mode === 'dark' ? '#F1F5F9' : '#1E293B',
      },
    });
  };

  return (
    <>
      <MotionPaper
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
        }}
        elevation={0}
        sx={{
          p: 3,
          width: '100%',
          background: theme.palette.mode === 'dark'
            ? 'rgba(17, 25, 40, 0.75)'
            : 'rgba(255, 255, 255, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid',
          borderColor: theme.palette.mode === 'dark'
            ? 'rgba(255, 255, 255, 0.1)'
            : 'rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
        }}
      >
        {currentEmail ? (
          <>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                width: '100%',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  fontFamily: '"Share Tech Mono", monospace',
                  color: theme.palette.mode === 'dark' ? '#60A5FA' : '#2563EB',
                }}
              >
                {currentEmail}
              </Typography>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton
                  onClick={handleCopy}
                  disabled={loading}
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#60A5FA' : '#2563EB',
                  }}
                >
                  <ContentCopy />
                </IconButton>
                <IconButton
                  onClick={() => setQrOpen(true)}
                  disabled={loading}
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#60A5FA' : '#2563EB',
                  }}
                >
                  <QrCode />
                </IconButton>
                <IconButton
                  onClick={generateEmail}
                  disabled={loading}
                  sx={{
                    color: theme.palette.mode === 'dark' ? '#60A5FA' : '#2563EB',
                  }}
                >
                  {loading ? <CircularProgress size={24} /> : <Refresh />}
                </IconButton>
              </Box>
            </Box>
          </>
        ) : (
          <Button
            variant="contained"
            onClick={generateEmail}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} /> : <Mail />}
            sx={{
              background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
              color: '#fff',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontFamily: '"Share Tech Mono", monospace',
              '&:hover': {
                background: 'linear-gradient(45deg, #4338CA, #0891B2)',
              },
            }}
          >
            {loading ? 'Generating...' : 'Generate Email'}
          </Button>
        )}
      </MotionPaper>

      <Dialog
        open={qrOpen}
        onClose={() => setQrOpen(false)}
        PaperProps={{
          sx: {
            background: theme.palette.mode === 'dark'
              ? 'rgba(17, 25, 40, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(16px)',
            p: 3,
          }
        }}
      >
        <Box sx={{ p: 2 }}>
          <QRCodeSVG
            value={currentEmail || ''}
            size={200}
            level="H"
            includeMargin={true}
            style={{
              width: '100%',
              height: 'auto',
            }}
          />
        </Box>
      </Dialog>
    </>
  );
}
