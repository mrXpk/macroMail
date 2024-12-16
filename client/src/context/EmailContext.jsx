import React, { createContext, useContext, useState, useEffect } from 'react';
import { emailService } from '../services/api';
import { toast } from 'react-hot-toast';

const EmailContext = createContext();

export const useEmail = () => {
  const context = useContext(EmailContext);
  if (!context) {
    throw new Error('useEmail must be used within an EmailProvider');
  }
  return context;
};

export const EmailProvider = ({ children }) => {
  const [currentEmail, setCurrentEmail] = useState(localStorage.getItem('currentEmail') || null);
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch emails periodically
  useEffect(() => {
    let intervalId;

    const fetchEmails = async () => {
      if (!currentEmail) return;
      
      try {
        setLoading(true);
        const { emails: newEmails } = await emailService.getEmails(currentEmail);
        setEmails(newEmails);
        setError(null);
      } catch (error) {
        console.error('Error fetching emails:', error);
        setError('Failed to fetch emails. Please try again later.');
        toast.error('Failed to fetch emails');
      } finally {
        setLoading(false);
      }
    };

    if (currentEmail) {
      // Initial fetch
      fetchEmails();
      
      // Set up polling interval
      intervalId = setInterval(fetchEmails, 30000); // Poll every 30 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentEmail]);

  const generateEmail = async () => {
    setLoading(true);
    setError(null);
    try {
      const { email } = await emailService.generateEmail();
      setCurrentEmail(email);
      // Save to localStorage
      localStorage.setItem('currentEmail', email);
      toast.success('Email generated successfully!');
    } catch (error) {
      console.error('Error generating email:', error);
      setError('Failed to generate email. Please try again.');
      toast.error('Failed to generate email');
    } finally {
      setLoading(false);
    }
  };

  const deleteCurrentEmail = async () => {
    if (!currentEmail) return;

    setLoading(true);
    setError(null);
    
    try {
      await emailService.deleteEmail(currentEmail);
      setCurrentEmail(null);
      setEmails([]);
      localStorage.removeItem('currentEmail');
      toast.success('Email address deleted!');
    } catch (error) {
      console.error('Error deleting email:', error);
      setError('Failed to delete email');
      toast.error('Failed to delete email address');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentEmail,
    emails,
    loading,
    error,
    generateEmail,
    deleteCurrentEmail,
  };

  return (
    <EmailContext.Provider value={value}>
      {children}
    </EmailContext.Provider>
  );
};
