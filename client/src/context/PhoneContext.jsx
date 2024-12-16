import React, { createContext, useContext, useState, useEffect } from 'react';
import { phoneService } from '../services/phone-api';
import { toast } from 'react-hot-toast';

const PhoneContext = createContext();

export const usePhone = () => {
  const context = useContext(PhoneContext);
  if (!context) {
    throw new Error('usePhone must be used within a PhoneProvider');
  }
  return context;
};

export const PhoneProvider = ({ children }) => {
  const [currentPhone, setCurrentPhone] = useState(localStorage.getItem('currentPhone') || null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch messages periodically
  useEffect(() => {
    let intervalId;

    const fetchMessages = async () => {
      if (!currentPhone) return;
      
      try {
        const { messages: newMessages } = await phoneService.getMessages(currentPhone);
        setMessages(newMessages);
      } catch (error) {
        console.error('Error fetching messages:', error);
        setError('Failed to fetch messages');
      }
    };

    if (currentPhone) {
      // Initial fetch
      fetchMessages();
      
      // Set up polling interval
      intervalId = setInterval(fetchMessages, 30000); // Poll every 30 seconds
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [currentPhone]);

  const generatePhone = async () => {
    setLoading(true);
    setError(null);
    try {
      const { phone } = await phoneService.generatePhone();
      setCurrentPhone(phone);
      localStorage.setItem('currentPhone', phone);
      toast.success('Phone number generated successfully!');
    } catch (error) {
      console.error('Error generating phone:', error);
      setError('Failed to generate phone number. Please try again.');
      toast.error('Failed to generate phone number');
    } finally {
      setLoading(false);
    }
  };

  const deletePhone = async () => {
    if (!currentPhone) return;

    try {
      await phoneService.deletePhone(currentPhone);
      setCurrentPhone(null);
      setMessages([]);
      localStorage.removeItem('currentPhone');
      toast.success('Phone number deleted!');
    } catch (error) {
      console.error('Error deleting phone:', error);
      toast.error('Failed to delete phone number');
    }
  };

  return (
    <PhoneContext.Provider
      value={{
        currentPhone,
        messages,
        loading,
        error,
        generatePhone,
        deletePhone
      }}
    >
      {children}
    </PhoneContext.Provider>
  );
};
