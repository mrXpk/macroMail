import { simpleParser } from 'mailparser';
import { createLogger, format, transports } from 'winston';
import crypto from 'crypto';
import { google } from 'googleapis';
import { ImapFlow } from 'imapflow';

// Logger configuration
const logger = createLogger({
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'email-error.log', level: 'error' }),
    new transports.File({ filename: 'email-combined.log' })
  ]
});

// In-memory storage for emails (replace with Redis in production)
const emailStorage = new Map();

// IMAP configuration for Gmail
const imapConfig = {
  host: 'imap.gmail.com',
  port: 993,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD // Use Gmail App Password here
  },
  logger: logger
};

// Initialize IMAP client
const client = new ImapFlow(imapConfig);

// Connect to IMAP server and start listening for new emails
const startEmailListener = async () => {
  try {
    // Connect to Gmail
    await client.connect();
    logger.info('Connected to Gmail IMAP server');

    // Start email polling
    setInterval(async () => {
      try {
        await fetchNewEmails();
      } catch (error) {
        logger.error('Error in email polling:', error);
      }
    }, 30000); // Poll every 30 seconds

  } catch (error) {
    logger.error('Error connecting to Gmail:', error);
  }
};

// Fetch new emails
const fetchNewEmails = async () => {
  try {
    // Select and lock INBOX
    const lock = await client.getMailboxLock('INBOX');
    
    try {
      // Search for unseen messages
      const messages = await client.fetch({ unseen: true }, {
        source: true,
        envelope: true
      });

      for await (const message of messages) {
        const parsed = await simpleParser(message.source);
        const recipientEmail = parsed.to.value[0].address;

        // Check if this email belongs to one of our temporary addresses
        if (emailStorage.has(recipientEmail)) {
          const emails = emailStorage.get(recipientEmail);
          emails.push({
            id: crypto.randomBytes(16).toString('hex'),
            from: parsed.from.value[0].address,
            subject: parsed.subject,
            text: parsed.text,
            html: parsed.html,
            date: parsed.date,
            attachments: parsed.attachments
          });
          emailStorage.set(recipientEmail, emails);
          logger.info(`New email received for ${recipientEmail}`);
        }
      }
    } finally {
      // Always release the lock
      lock.release();
    }
  } catch (error) {
    logger.error('Error fetching new emails:', error);
  }
};

// Generate random email address
const generateRandomEmail = () => {
  try {
    // Generate a random string using allowed characters (a-z0-9)
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const email = `temp.${result}@${process.env.EMAIL_DOMAIN}`;
    logger.info(`Generated email: ${email}`);
    return email;
  } catch (error) {
    logger.error('Error generating email:', error);
    throw new Error('Failed to generate email address');
  }
};

// Controller methods
export const generateEmail = async (req, res) => {
  try {
    const email = generateRandomEmail();
    if (!email) {
      throw new Error('Email generation failed');
    }
    
    // Initialize empty inbox for this email
    emailStorage.set(email, []);
    
    logger.info(`Generated new email: ${email}`);
    res.json({ email });
  } catch (error) {
    logger.error('Error in generateEmail controller:', error);
    res.status(500).json({ 
      error: 'Error generating email address',
      details: error.message 
    });
  }
};

export const getEmails = async (req, res) => {
  try {
    const { email } = req.params;
    const emails = emailStorage.get(email) || [];
    
    logger.info(`Retrieved emails for: ${email}`);
    res.json({ emails });
  } catch (error) {
    logger.error('Error retrieving emails:', error);
    res.status(500).json({ error: 'Error retrieving emails' });
  }
};

export const deleteEmail = async (req, res) => {
  try {
    const { email } = req.params;
    emailStorage.delete(email);
    
    logger.info(`Deleted email: ${email}`);
    res.json({ message: 'Email deleted successfully' });
  } catch (error) {
    logger.error('Error deleting email:', error);
    res.status(500).json({ error: 'Error deleting email' });
  }
};

// Start email listener when the server starts
startEmailListener();
