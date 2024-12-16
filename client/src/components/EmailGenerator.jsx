import { useState } from 'react';
import { Paper, Button, Typography, Box, IconButton, Tooltip } from '@mui/material';
import { ContentCopy, Refresh, QrCode2 } from '@mui/icons-material';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import toast from 'react-hot-toast';

const MotionPaper = motion(Paper);

export default function EmailGenerator({ email, onGenerate, loading }) {
  const [showQR, setShowQR] = useState(false);

  const handleCopy = () => {
    toast.success('Email copied to clipboard!');
  };

  return (
    <MotionPaper
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      sx={{
        p: 3,
        mb: 4,
        background: 'rgba(16, 16, 24, 0.8)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
        <Typography variant="h5" component="h2" sx={{ mb: 2 }}>
          Your Temporary Email Address
        </Typography>

        {email ? (
          <>
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                background: 'rgba(0,255,255,0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                width: '100%',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  flex: 1,
                  fontFamily: 'monospace',
                  color: '#00ffff',
                }}
              >
                {email}
              </Typography>
              <CopyToClipboard text={email} onCopy={handleCopy}>
                <Tooltip title="Copy to clipboard">
                  <IconButton color="primary">
                    <ContentCopy />
                  </IconButton>
                </Tooltip>
              </CopyToClipboard>
              <Tooltip title="Show QR Code">
                <IconButton color="primary" onClick={() => setShowQR(!showQR)}>
                  <QrCode2 />
                </IconButton>
              </Tooltip>
            </Box>

            {showQR && (
              <Box sx={{ p: 2, background: 'white', borderRadius: 1 }}>
                <QRCode value={email} size={128} />
              </Box>
            )}

            <Button
              startIcon={<Refresh />}
              onClick={onGenerate}
              disabled={loading}
              variant="contained"
              sx={{ mt: 2 }}
            >
              Generate New Address
            </Button>
          </>
        ) : (
          <Button
            onClick={onGenerate}
            disabled={loading}
            variant="contained"
            size="large"
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.2rem',
            }}
          >
            {loading ? 'Generating...' : 'Generate Email Address'}
          </Button>
        )}
      </Box>
    </MotionPaper>
  );
}
