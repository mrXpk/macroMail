import twilio from 'twilio';
import { createLogger, format, transports } from 'winston';

// Logger configuration
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'phone-error.log', level: 'error' }),
    new transports.File({ filename: 'phone-combined.log' })
  ]
});

// Initialize Twilio client
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// In-memory storage for phone numbers and messages
const phoneStorage = new Map();

// Generate a phone number from Twilio
export const generatePhone = async (req, res) => {
  try {
    // Get available phone number from Twilio
    const numbers = await client.availablePhoneNumbers('US')
      .local
      .list({ limit: 1 });

    if (numbers.length === 0) {
      throw new Error('No phone numbers available');
    }

    // Purchase the phone number
    const phoneNumber = await client.incomingPhoneNumbers
      .create({ phoneNumber: numbers[0].phoneNumber });

    // Store the phone number with empty messages array
    phoneStorage.set(phoneNumber.phoneNumber, []);
    
    logger.info(`Generated new phone number: ${phoneNumber.phoneNumber}`);
    res.json({ phone: phoneNumber.phoneNumber });
  } catch (error) {
    logger.error('Error generating phone number:', error);
    res.status(500).json({ 
      error: 'Error generating phone number',
      details: error.message 
    });
  }
};

// Get messages for a phone number
export const getMessages = async (req, res) => {
  try {
    const { phone } = req.params;
    const messages = phoneStorage.get(phone) || [];
    
    logger.info(`Retrieved messages for: ${phone}`);
    res.json({ messages });
  } catch (error) {
    logger.error('Error retrieving messages:', error);
    res.status(500).json({ error: 'Error retrieving messages' });
  }
};

// Delete a phone number
export const deletePhone = async (req, res) => {
  try {
    const { phone } = req.params;
    
    // Release the number from Twilio
    const numbers = await client.incomingPhoneNumbers
      .list({ phoneNumber: phone });
    
    if (numbers.length > 0) {
      await client.incomingPhoneNumbers(numbers[0].sid)
        .remove();
    }

    // Remove from local storage
    phoneStorage.delete(phone);
    
    logger.info(`Deleted phone number: ${phone}`);
    res.json({ message: 'Phone number deleted successfully' });
  } catch (error) {
    logger.error('Error deleting phone number:', error);
    res.status(500).json({ error: 'Error deleting phone number' });
  }
};

// Webhook for receiving SMS
export const receiveSMS = async (req, res) => {
  try {
    const { To: to, From: from, Body: text } = req.body;
    
    if (phoneStorage.has(to)) {
      const messages = phoneStorage.get(to);
      messages.push({
        id: Date.now().toString(),
        from,
        text,
        date: new Date()
      });
      phoneStorage.set(to, messages);
      
      logger.info(`New message received for ${to} from ${from}`);
    }

    // Respond to Twilio
    const twiml = new twilio.twiml.MessagingResponse();
    res.type('text/xml').send(twiml.toString());
  } catch (error) {
    logger.error('Error receiving SMS:', error);
    res.status(500).json({ error: 'Error processing incoming message' });
  }
};
