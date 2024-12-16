import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { EmailProvider } from './context/EmailContext';
import { PhoneProvider } from './context/PhoneContext';
import { Toaster } from 'react-hot-toast';
import { Box, Container, CssBaseline } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact';
import About from './pages/About';
import Services from './pages/Services';
import FAQ from './pages/FAQ';
import Inbox from './pages/Inbox';
import Premium from './pages/Premium';
import Phone from './pages/Phone';
import ParticlesBackground from './components/ParticlesBackground';

export default function App() {
  return (
    <ThemeProvider>
      <EmailProvider>
        <PhoneProvider>
          <CssBaseline />
          <Router>
            <Box
              sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                backgroundColor: (theme) => 
                  theme.palette.mode === 'dark' ? '#0f172a' : '#ffffff',
              }}
            >
              <ParticlesBackground />
              <Navbar />
              <Box
                component="main"
                sx={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  zIndex: 2,
                }}
              >
                <Container
                  maxWidth="lg"
                  sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    py: 4,
                  }}
                >
                  <Toaster position="bottom-right" />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/inbox" element={<Inbox />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/premium" element={<Premium />} />
                    <Route path="/phone" element={<Phone />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </Container>
              </Box>
              <Footer />
            </Box>
          </Router>
        </PhoneProvider>
      </EmailProvider>
    </ThemeProvider>
  );
}
