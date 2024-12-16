const API_URL = 'http://localhost:5000/api';

export const phoneService = {
  generatePhone: async () => {
    try {
      const response = await fetch(`${API_URL}/phone/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to generate phone number');
      return await response.json();
    } catch (error) {
      console.error('Error generating phone number:', error);
      throw error;
    }
  },

  getMessages: async (phone) => {
    try {
      const response = await fetch(`${API_URL}/phone/${phone}`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      return await response.json();
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  deletePhone: async (phone) => {
    try {
      const response = await fetch(`${API_URL}/phone/${phone}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete phone number');
      return await response.json();
    } catch (error) {
      console.error('Error deleting phone number:', error);
      throw error;
    }
  },
};
