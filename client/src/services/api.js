const API_URL = 'http://localhost:5000/api';

export const emailService = {
  generateEmail: async () => {
    try {
      const response = await fetch(`${API_URL}/email/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Failed to generate email');
      return await response.json();
    } catch (error) {
      console.error('Error generating email:', error);
      throw error;
    }
  },

  getEmails: async (email) => {
    try {
      const response = await fetch(`${API_URL}/email/${email}`);
      if (!response.ok) throw new Error('Failed to fetch emails');
      return await response.json();
    } catch (error) {
      console.error('Error fetching emails:', error);
      throw error;
    }
  },

  deleteEmail: async (email) => {
    try {
      const response = await fetch(`${API_URL}/email/${email}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete email');
      return await response.json();
    } catch (error) {
      console.error('Error deleting email:', error);
      throw error;
    }
  },
};
